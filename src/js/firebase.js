//import firebase from 'firebase/app'
//import 'firebase/auth'

//import * as firebaseui from 'firebaseui'
//import 'firebaseui/dist/firebaseui.css'


const firebaseConfig = {
  apiKey: "AIzaSyCJSm_g2dQAAGYohn5G0YjN6yfyk_4biCY",
  authDomain: "fir-test-294020-8181c.firebaseapp.com",
  databaseURL: "https://fir-test-294020-8181c.firebaseio.com",
  projectId: "firebase-test-294020",
  storageBucket: "firebase-test-294020.appspot.com",
  messagingSenderId: "493454713346",
  appId: "1:493454713346:web:5714db14fe9577727ffd1b",
  measurementId: "G-Y89GWN2FCR"
}

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
    signInSuccess: function(currentUser, credentials) {
      //console.log('currentUser!',currentUser,credentials)
      return false
    }
  }
}

firebase.initializeApp(firebaseConfig)
let ui = new firebaseui.auth.AuthUI(firebase.auth())
firebase.ui = ui


module.exports = { firebase, uiConfig }
