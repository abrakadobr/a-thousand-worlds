import { TJSWidget } from './widget'
import Vue from 'vue'

export const TJSForm = {
  props: ['fields','btnOk','btnCancel','routeCancel','value','noButtons'],
  data() {
    return {
      values: {},
      nob: this.noButtons || false
    }
  },
  watch: {
    value(next,old)
    {
      this.values = next || {}
      this.fields.forEach(fi=>{
        if (typeof this.values[fi.code] === 'undefined')
          this.values[fi.code] = this.value[fi.code]
      })
    }
  },
  methods: {
    updV(e,cd)
    {
      this.values[cd]=e
      this.$emit('input',this.values)
    },
    onSubmit() {
      this.$emit('submit',this.values)
    },
    onCancel() {
      this.$router.push(this.routeCancel)
    }
  },
  components: {
    'tjs-widget': TJSWidget
  },
  template: `<form @submit.prevent="onSubmit()">
    <tjs-widget
      v-for="finfo in fields"
      :key="finfo.code"
      :finfo="finfo"
      :value="values[finfo.code]"
      @input="updV($event,finfo.code)"
    ></tjs-widget>
    <div v-if="!nob">
      <button :disabled="$store.state.ui.busy" type="submit" class="btn btn-success">{{btnOk}}</button>
      <button v-if="btnCancel" @click="onCancel()" class="btn btn-secondary">{{btnCancel}}</button>
    </div>
  </form>`
}
