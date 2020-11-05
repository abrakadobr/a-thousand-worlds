import Vue from 'vue'
    
export default Vue.component('page-account',{
  data() {
    return {
      profile: {
        firstName: '',
        lastName: '',
        links: []
      },
      bookmarks: [],
      curatedLists: []
    }
  },
  computed: {
    title() {
    }
  },
  template: `<div>
    <h1>{{title}}</h1>
    <div class="email">{{$store.state.user.email}}</div>
  </div>`
})
