
import login from '../components/authentication/login'
import register from '../components/user/register'
import home from '../components/utils/home'
import menuComponent from '../components/utils/menuComponent'


//import racesComponent from './components/racesComponent'
import inventory from '../components/card/inventory'
import notFound from '../components/utils/notFound'





const routes = [
  { path: '/login', component: login, name: 'login' },
  { path: '/register', component: register, name: 'register' },
  { path: '/', component: home, name: 'home' },
  { path: '/notFound', component: notFound, name: 'notFound'},
  { path: '/menu', component: menuComponent, name: 'menu' },
  { path: '/inventory', component: inventory, name: 'inventory' }
]

export default routes