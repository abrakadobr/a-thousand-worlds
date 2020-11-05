import Vue from 'vue'
import { firebase } from '../firebase'
    
export default Vue.component('page-logout',{
  created() {
    firebase.auth().signOut()
    setTimeout(()=>{
      this.$router.push('/')
    },2000)
  },
  template: `<div>
      <p>
        See you!
      </p>
    </div>`
})
