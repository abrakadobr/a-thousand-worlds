import Vue from 'vue'
import { Field } from './field'

export default Vue.component('tjs-form-field-datetime',{
  extends: Field,
  /**
  created() {
    console.log('password field created',this.finfo,this.value)
  },
  /**/
  template: `<div>
    <input v-model="val" class="form-control" type="datetime-local">
  </div>`
})
