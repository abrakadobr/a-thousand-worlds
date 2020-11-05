import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import FaComponent from './fa'

import Components from './components/'
import Routes from './routes'
import Store from './store'

Vue.use(Vuex)
Vue.use(VueRouter)
const store = new Vuex.Store(Store)

let router = new VueRouter({
  mode: 'history',
  routes: Routes
})

import { UiModule } from './ui/module'
import { FormsModule } from './forms/module'

let __can = function(role,strictCan=false)
{
  let u = store.state.user
  if (!u||!u.roles||!u.roles.length) return false
  if (!Array.isArray(role))
    role = [role]
  let ret = role.reduce((ret,rl)=>{
    if (ret) return ret
    let splt = rl.split('.')
    let mdl = splt[0]
    let cde = splt[1]
    return u.roles.reduce((acc,x)=>{
      if (acc) return acc
      if (x.role==='core.root'&&!strictCan) return true
      if (x.module!==mdl) return acc
      if (x.code==='root'&&!strictCan) return true
      //console.log(x.role,'=?=',role[0])
      return x.role === rl
    },false)
  },false)
  //console.log(['$can?',role,ret])
  return ret
}

Vue.use(UiModule,{store,router})
Vue.use(FormsModule)

Vue.mixin({
  methods: {
    $can: __can
  }
})

router.beforeEach(async (to,from,next)=>{
  if (to.path==='/login'&&!!store.state.user)
  {
    //console.log('?',store.state.user)
    return next('/account')
  }
  if (!to.meta||!Array.isArray(to.meta.access)||!to.meta.access.length)
    return next()
  if (__can(to.meta.access))
    return next()
  if (!store.state.user)
  {
    store.commit('setReturnToPage',to.path)
    //console.log('no user, return to',to.path)
    return next({name:'login'})
  }
  next('/404')
})

import { firebase } from './firebase'
firebase.auth().onAuthStateChanged(async user=>{
  await store.dispatch('setUser',user)
})

Vue.mixin({
  computed: {
    loading() { return this.$store.state.busy },
    isLoggedIn() { return !!this.$store.state.user }
  },
  methods: {
    $can: __can
  }
})


var app = new Vue({
  el: '#app',
  store: store,
  router: router,
  template: `<div id="app-wrapper">
    <app-topbar id="app-topbar"></app-topbar>
    <div id="main-wrapper">
        <app-leftbar id="app-leftbar"></app-leftbar>
        <main><router-view></router-view></main>
        <app-rightbar id="app-rightbar"></app-rightbar>
    </div>
    <app-footer id="app-footer"></app-footer>
  </div>`
})
