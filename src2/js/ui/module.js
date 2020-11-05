import { Ui } from './ui'
import { UiPopups } from './popups'
import { UiLoadBar } from './load.bar'
import { Store } from './store'

export const UiModule = {
  install(Vue,opts) {
    opts.store.registerModule('ui',Store)

    Vue.component('ui',Ui)
    Vue.component('ui-popups',UiPopups)
    Vue.component('ui-load-bar',UiLoadBar)
  }
}
