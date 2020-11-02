const { firebase, uiConfig } = require('./firebase')
const { send } = require('./pubsub')

let currentUser = null

// auth buttons behavior
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    let u = {}
    u.displayName = user.displayName;
    u.email = user.email;
    u.emailVerified = user.emailVerified;
    u.photoURL = user.photoURL;
    u.isAnonymous = user.isAnonymous;
    u.uid = user.uid;
    u.providerData = user.providerData;
    firebase.database().ref(`profile/${u.uid}`).once('value').then(snap=>{
      u.profile = snap.toJSON()
      currentUser = u
      send('auth-user',currentUser)
    })

  } else {
    currentUser = null
    //console.log('send auth-user',currentUser)
    send('auth-user',currentUser)
  }
})


function getUser()
{
  return currentUser
}

function hasRole(role)
{
}

function signOut()
{
  firebase.auth().signOut()
}

function signIn(el)
{
  firebase.ui.start('#firebase-auth-window', uiConfig)
}

module.exports = {
  getUser,
  hasRole,
  signIn,
  signOut
}
