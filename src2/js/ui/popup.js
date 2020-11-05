export const UiPopup = {
  data() {
    return {hidden:false}
  },
  props: ['type','msg','title'],
  template: `<div @click="hidden=true" :class="'alert alert-'+type" v-if="!hidden">
    <h5 v-if="!!title.length">{{title}}</h5>
    {{msg}}
  </div>`
}
