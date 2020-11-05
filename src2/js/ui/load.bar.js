export const UiLoadBar = {
  template: `<div :class="clsn" id="ui-load-bar"></div>`,
  computed: {
    clsn() {
      return this.$store.state.ui.busy ? 'loading' : ''
    }
  }
}
