//import { Ui } from './ui'
//import { UiPopups } from './popups'
import { TJSForm } from './form'
//import { Store } from './store'

export const FormsModule = {
  install(Vue,opts) {
    //opts.store.registerModule('ui',Store)

    Vue.component('tjs-form',TJSForm)
    //Vue.component('ui-popups',UiPopups)
    //Vue.component('ui-load-bar',UiLoadBar)
  }
}
