import Vue from 'vue'
import { Field } from './field'

export default Vue.component('tjs-form-field-password',{
  extends: Field,
  /**
  created() {
    console.log('password field created',this.finfo,this.value)
  },
  /**/
  template: `<div>
    <input v-model="val" class="form-control" type="password">
  </div>`
})
