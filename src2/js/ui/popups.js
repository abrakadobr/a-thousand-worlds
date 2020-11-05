import { UiPopup } from './popup'

export const UiPopups = {
  template: `<div :class="isEmpty?'d-none':''" id="ui-popups-wrapper">
    <ui-popup
      v-for="(pp,pi) in ppps"
      :key="pi"
      :title="pp.title"
      :msg="pp.msg"
      :type="pp.type"
    ></ui-popup>
  </div>`,
  components: {
    'ui-popup': UiPopup
  },
  computed: {
    isEmpty() {
      return !this.$store.state.ui.popups.length
    },
    ppps() {
      return this.$store.state.ui.popups
    }
  }
}
