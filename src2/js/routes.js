import Pages from './pages/'

export default [{
  path: '/',
  name: 'home',
  components: {
    default: Pages.Home
  },
  //meta: { access: ['client','realtor','root'] }
},{
  path: '/curated',
  name: 'curated',
  components: {
    default: Pages.Curated
  },
  //meta: { access: ['root'] }
},{
  path: '/people',
  name: 'people',
  components: {
    default: Pages.People
  },
  //meta: { access: ['root'] }
},{
  path: '/donate',
  name: 'donate',
  components: {
    default: Pages.Donate
  },
  //meta: { access: ['root'] }
},{
  path: '/about',
  name: 'about',
  components: {
    default: Pages.About
  },
  //meta: { access: ['root'] }
},{
  path: '/login',
  name: 'login',
  components: {
    default: Pages.LogIn
  },
  //meta: { access: ['root','realtor'] }
},{
  path: '/logout',
  name: 'logout',
  components: {
    default: Pages.LogOut
  },
  meta: { access: ['user.login'] }
},{
  path: '/account',
  name: 'account',
  components: {
    default: Pages.Account
  },
  meta: { access: ['user.login'] }
},{
  path: '/submit-book',
  name: 'submit-book',
  components: {
    default: Pages.SubmitBook
  },
  meta: { access: ['user.login'] }
},{
  path: '*',
  name: '404',
  components: {
    default: Pages.NotFound
  }
}]

