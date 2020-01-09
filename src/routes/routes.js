import Home from '@/views/Home/Home.route';
import PageNotFound from '@/components/PageNotFound';
let routes = [].concat(
  Home,
  [{path: '*', component: PageNotFound}]
)

export default routes
