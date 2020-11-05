import Vue from 'vue'
import { Field } from './field'

export default Vue.component('tjs-form-field-boolean',{
  extends: Field,
  /**
  created() {
    console.log('password field created',this.finfo,this.value)
  },
  /**/
  methods: {
    tggl()
    {
      this.val = !this.val
    }
  },
  template: `<div>
    <button type="button" class="btn btn-light" @click="tggl()">
      <i v-if="!!val" class="fas fa-toggle-on text-primary"></i>
      <i v-if="!val" class="fas fa-toggle-off text-primary11"></i>
    </button>
  </div>`
})
