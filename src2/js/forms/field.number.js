import Vue from 'vue'
import { Field } from './field'

export default Vue.component('tjs-form-field-number',{
  extends: Field,
  data() {
    return {
      nval: this.val
    }
  },
  watch: {
    val(next)
    {
      this.nval = this.val
    },
    nval(next)
    {
      if (this.confOp(0,false))
        this.val = parseFloat(next)
      else
        this.val = parseInt(next)
      
      this.$emit('input',this.val)
    }
  },
 
  methods: {
    editorInit() {}
  },
  /**/
  template: `<div>
    <input v-model="nval" class="form-control" type="text">
  </div>`
})
