import Vue from 'vue'
import { Field } from './field'
import Kefir from 'kefir'

export default Vue.component('tjs-form-field-relation',{
  extends: Field,
  data() {
    return {
      isLoading: false,
      isOpenSearch: false,
      origNid: this.val,
      title: '',
      bcode: '?',
      binf: null,
      searchNodes: [],
      lastSearch: ''
    }
  },
  /**/
  created() {
    let bndl = this.confOp(0,null)
    if (!bndl)
    {
      console.log('bundle not found!!',{...this.finfo})
      return
    }
    this.bcode = bndl
    setTimeout(()=>{
      Kefir.fromEvents(this.$refs.inp,'input')
      .map(e=>this.$refs.inp.value)
      .filter(x=>x.length>2)
      .debounce(1000)
      .onValue(e=>{
        this.isLoading = true
        this.isOpenSearch = true
        this.searchNodes = []
        this.lastSearch = e
        //console.log('search ing',e)
        this.$socket.emit('nodes.titlesearch',{bundle:this.bcode,search:e},list=>{
          //console.log('search',e,list)
          this.isLoading = false
          this.searchNodes = list
          setTimeout(()=>{
            this.isOpenSearch = false
          },7000)
        })
      })
    },0)
    this.$socket.emit('bundle.info',this.bcode,binf=>{
      this.binf = binf
      this.$socket.emit('nodes.one',{bundle:this.bcode,nid:this.val},node=>{
        let ttl = this.nodeTitle(node)
        if (ttl!='') ttl += ' '
        this.title = ttl
      })
    })
  },
  /**/
  computed: {
    placeholder() {
      if (this.isOpenSearch)
        return this.lastSearch
      if (!this.val)
        return ''
      //if (!this.isLoading)
      return this.title+'('+this.bcode+'#'+this.val+')'
      //return this.val+'#'
    }
  },
  methods: {
    nodeTitle(node)
    {
      let ttl = ''
      if (!node||!this.binf||!Array.isArray(this.binf.fields))
        return ttl
      this.binf.fields.forEach(f=>{
        if (Array.isArray(f.flags)&&f.flags.includes('title'))
        {
          if (ttl!='') ttl += ' '
          ttl+= node[f.code]
        }
      })
      return ttl
    },
    setV(node)
    {
      //console.log('set v',node)
      let ttl = this.nodeTitle(node)
      if (ttl!='') ttl += ' '
      this.val = node.id
      this.title = ttl
      this.isOpenSearch = false
    }
  },
  template: `<div style="position:relative;">
    <input :value="placeholder" ref="inp" class="form-control" type="input">
    <div v-if="isOpenSearch" style="position:absolute;z-index:5;" class="relation-autocomplete-dropdown border rounded p-1 bg-white w-100">
      <div v-if="isLoading">
        searching
      </div>
      <div v-if="!isLoading&&!searchNodes.length">
        nothing found
      </div>
      <div v-if="!isLoading&&searchNodes.length">
        <div v-for="n in searchNodes">
          <button type="button" class="btn btn-link" @click.prevent="setV(n)">
            {{nodeTitle(n)}}
          </button>
        </div>
      </div>
    </div>
  </div>`
})
