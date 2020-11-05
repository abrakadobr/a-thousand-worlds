import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faThLarge, faThList, faBookMedical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBookmark)
library.add(faThLarge)
library.add(faThList)
library.add(faBookMedical)

export default Vue.component('font-awesome-icon', FontAwesomeIcon)
