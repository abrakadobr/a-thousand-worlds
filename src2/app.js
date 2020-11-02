import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


import Components from './js/components/'
import Routes from './js/routes'
import Store from './js/store'
//import * as $t from './i18n'

Vue.use(Vuex)
Vue.use(VueRouter)
const store = new Vuex.Store(Store)

let router = new VueRouter({
  mode: 'history',
  routes: Routes
})

/*
router.beforeEach(async (to,from,next)=>{
  if (!store.state.started)
  {
    store.commit('setStarted',true)
    await store.dispatch('loadJwt')
  }
  if ((to.matched[0].name==='login'||to.matched[0].name==='register')&&store.state.user)
    return next({name:'dashboard'})
  if (to.matched[0]&&Array.isArray(to.matched[0].meta.access))
  {
    const fail = {
      name: 'login',
      params: { goto: to.fullPath }
    }
    let user = store.state.user
    if (!user||!user.scope||typeof user.scope !== 'string')
      return next(fail)
    //test access
    if(!to.matched[0].meta.access.reduce((acc,role)=>{
      return user.scope.includes(role)?true:acc
    },false))
      return next(fail)
    next()
  } else {
    next()
  }
})
*/

// based on https://github.com/vue-bulma/click-outside
Vue.directive('click-outside',{
  bind: function (el, binding, vNode) {

    // Define Handler and cache it on the element
    function handler(e) {
      if (!vNode.context) return

      // some components may have related popup item, on which we shall prevent the click outside event handler.
      var elements = e.path || (e.composedPath && e.composedPath())
      elements && elements.length > 0 && elements.unshift(e.target)

      if (el.contains(e.target) /*|| isPopup(vNode.context.popupItem, elements)*/) return

      el.__vueClickOutside__.callback(e)
    }

    // add Event Listeners
    el.__vueClickOutside__ = {
      handler: handler,
      callback: binding.value
    }
    const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
    document.addEventListener(clickHandler, handler)
  },

  update: function (el, binding) {
    el.__vueClickOutside__.callback = binding.value
  },

  unbind: function (el, binding, vNode) {
    // Remove Event Listeners
    const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
    el.__vueClickOutside__ && document.removeEventListener(clickHandler, el.__vueClickOutside__.handler)
    delete el.__vueClickOutside__
  }
})

/*
Vue.mixin({
  computed: {
    loading() { return this.$store.state.busy },
    isLoggedIn() { return !!this.$store.state.user }
  },
  methods: {
    $can(role) {
      return this.$store.state.user
        &&typeof this.$store.state.user.scope === 'string'
        &&this.$store.state.user.scope.includes(role)
    },
    popupError(err) {
      let lst = [err]
      if (err&&Array.isArray(err.popups))
       lst = err.popups
      lst.forEach(e=>{
        this.$store.dispatch('popup',{
          type: 'danger',
          title: this.$t('error.default'),
          msg: typeof e === 'string'?e:(e&&typeof e.toString === 'function'?e.toString():JSON.stringify(e))
        })
      })
    }
  }
})
*/

var app = new Vue({
  el: '#app',
  store: store,
  router: router,
  template: `<div id="app-wrapper">
    <topbar></topbar>
    <router-view></router-view>
  </div>`
  /*
  created() {
    this.$store.dispatch('appStart').then(_=>{
      //console.log('app started')
    }).catch(e=>{
      //console.log('app start failed')
      this.popupError(e)
    })
  }
  */
})

//app.mount('#app')
