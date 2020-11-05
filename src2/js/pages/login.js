import Vue from 'vue'
import { firebase } from '../firebase'

import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
    
export default Vue.component('page-login',{
  created() {

    const uiConfig = {
      signInFlow: 'popup',
      //signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true
        },
      ],
      callbacks: {
        signInSuccess: (currentUser, credentials) => {
          //console.log('currentUser!',currentUser,credentials)
          this.ui.stop()
          let nx = this.$store.state.returnToPage || '/account'
          if (nx === '/login')
            nx = '/account'
          this.$router.push(nx)
          return false
        }
      }
    }

    firebase.auth().onAuthStateChanged(user=>{
      if (user)
        this.$router.push('/account')
    })

    setTimeout(()=>{
      this.ui = new firebaseui.auth.AuthUI(firebase.auth())
      this.ui.start('#firebaseui', uiConfig)
    },0)

  },
  template: `<div id="login-page">
    <div class="login-welcome">
      <p>Access your saved books</p>
      <p>Modify your submission</p>
      <p>Update your books or curated lists</p>
    </div>
    <div class="login-ui">
      <div id="firebaseui"></div>
    </div>
  </div>`
})

