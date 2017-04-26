/*
 * Created by YangYusheng on 2017-04-01
 */
import Vue from 'vue'
import Router from 'vue-router'

import home from './home'
import order from './order'
import search from './search'
import shop from './shop'
import storeList from './storeList'
import myorder from './myorder'
import orderdetail from './orderdetail'
import map from './map'
import shopdes from './shopdes'
import productlist from './productlist'
import collect from './collect'
import NotFound from './NotFound'
import { Loading } from 'element-ui';

Vue.use(Router);
const router = new Router({
  routes: [
    home,
    order,
    search,
    shop,
    storeList,
    myorder,
    orderdetail,
    map,
    shopdes,
    productlist,
    collect,
    NotFound,
    {
      path: '*',
      redirect: '/home'
    }
  ]
});
router.beforeEach((to, from, next) => {
  let loadingInstance = Loading.service({ fullscreen: true });
  next();
});
router.afterEach(route => {
  let loadingInstance = Loading.service({ fullscreen: true });
  setTimeout(()=>{
    loadingInstance.close();
  },50)
});
export default router;



