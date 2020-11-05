import { firebase } from './firebase'

export default {
  state: {
    user: null,
    busy: false,
    returnToPage: '',
    viewMode: 'covers'
  },
  mutations: {
    setUser(ctx,user) {
      ctx.user = user
    },
    setBusy(ctx,busy) {
      ctx.busy = busy
    },
    setReturnToPage(ctx,page)
    {
      ctx.returnToPage = page
    },
    setViewMode(ctx,mode)
    {
      ctx.mode = mode === 'covers' ? mode : 'list'
    }
  },
  actions: {
    setUser(ctx,user)
    {
      return new Promise((acc,rej)=>{
        if (!user)
        {
          ctx.commit('setUser',null)
          return acc()
        }
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
          //currentUser = u
          if (!Array.isArray(u.roles))
            u.roles = [{
              module: 'user',
              code: 'login',
              role: 'user.login'
            }]
          ctx.commit('setUser',u)
          acc()
        })
      })
    }
  }
}
