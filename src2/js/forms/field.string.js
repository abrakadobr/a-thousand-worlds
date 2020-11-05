import Vue from 'vue'
import { Field } from './field'

//import Ace from 'vue2-ace-editor'

//import 'brace'
//import 'brace/mode/liquid'
//import 'brace/mode/html'
//import 'brace/mode/javascript'
//import 'brace/theme/clouds'
//import 'brace/ext/beautify'


export default Vue.component('tjs-form-field-string',{
  extends: Field,
  /**
  created() {
    console.log('Text field created',this.finfo,this.value)
  },
  /**/
  computed: {
    isBig() {
      return this.confOp(0,'')==='big'
    },
    isSelect()
    {
      return Array.isArray(this.finfo.options)&&this.finfo.options.length
    }
  },
  methods: {
    editorInit() {}
  },
  //components: {
    //'ace-editor': Ace,
  //},
  /**/
  template: `<div>
    <input v-if="!isSelect&&!isBig" v-model="val" class="form-control" type="text">
    <select v-if="isSelect" v-model="val" class="form-control">
      <option v-for="opt in finfo.options" :key="opt.value" :value="opt.value">{{opt.label}}</option>
    </select>
  </div>`
})
