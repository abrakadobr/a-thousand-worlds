import Pages from './pages/'

export default [{
  path: '/',
  name: 'dashboard',
  components: {
    default: Pages.Dashboard
  },
  meta: { access: ['client','realtor','root'] }
  /*
},{
  path: '/create/user',
  name: 'createuser',
  components: {
    default: Pages.UserForm
  },
  meta: { access: ['root'] }
},{
  path: '/user/:id',
  name: 'updateuser',
  components: {
    default: Pages.UserForm
  },
  meta: { access: ['root'] }
},{
  path: '/users',
  name: 'users',
  components: {
    default: Pages.Users
  },
  meta: { access: ['root'] }
},{
  path: '/apartments',
  name: 'apartments',
  components: {
    default: Pages.Apartments
  },
  meta: { access: ['root','realtor'] }
},{
  path: '/apartment/:id',
  name: 'updateapartment',
  components: {
    default: Pages.ApartmentForm
  },
  meta: { access: ['root','realtor'] }
},{
  path: '/create/apartment',
  name: 'createapartment',
  components: {
    default: Pages.ApartmentForm
  },
  meta: { access: ['root','realtor'] }
},{
  path: '/register',
  name: 'register',
  components: {
    default: Pages.Register
  }
},{
  path: '/profile',
  name: 'profile',
  components: {
    default: Pages.Profile
  },
  meta: { access: ['client','root','realtor'] }
},{
  path: '/login',
  name: 'login',
  components: {
    default: Pages.Login
  }
},{
  path: '/logout',
  name: 'logout',
  components: {
    default: Pages.Logout
  }
},{
  path: '*',
  name: '404',
  components: {
    default: Pages.NotFound
  }
*/
}]

