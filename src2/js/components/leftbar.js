import Vue from 'vue'
    
export default Vue.component('app-leftbar',{
  template: `<div>
    <div id="main-menu">
      <div class="menu-link"><router-link to="/">Books</router-link></div>
      <div class="menu-link"><router-link to="/curated">Curated Lists</router-link></div>
      <div class="menu-link"><router-link to="/people">People</router-link></div>
      <div class="menu-link"><router-link to="/donate">Donate</router-link></div>
      <div class="menu-link"><router-link to="/about">About</router-link></div>
    </div>
    <div id="auth-menu">
      <div v-if="!isLoggedIn" class="menu-link"><router-link to="/login">Log In</router-link></div>
      <div v-if="isLoggedIn" class="menu-link"><router-link to="/logout">Log Out</router-link></div>
      <div v-if="isLoggedIn" class="menu-link"><router-link to="/account">Profile</router-link></div>
    </div>
  </div>`
})
