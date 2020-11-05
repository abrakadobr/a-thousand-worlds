import Vue from 'vue'
    
export default Vue.component('app-rightbar',{
  methods: {
    bookmarkClick() {
      if (!this.isLoggedIn)
        return this.$router.push('/login')
      console.log('bk!')
    }
  },
  computed: {
    coversClass()
    {
      return this.$store.state.viewMode === 'covers' ? 'disabled' : ''
    },
    listsClass()
    {
      return this.$store.state.viewMode === 'covers' ? '' : 'disabled'
    },
  },
  template: `<div>
    <div class="top icons">
      <font-awesome-icon @click.prevent="bookmarkClick()" :icon="['far','bookmark']"></font-awesome-icon>
      <router-link v-if="isLoggedIn" title="Submit Book" to="/submit-book">
        <font-awesome-icon :icon="['fas','book-medical']"></font-awesome-icon>
      </router-link>
    </div>
    <div class="bot icons">
      <font-awesome-icon :class="coversClass" :icon="['fas','th-large']"></font-awesome-icon>
      <font-awesome-icon :class="listsClass" :icon="['fas','th-list']"></font-awesome-icon>
    </div>
  </div>`
})
