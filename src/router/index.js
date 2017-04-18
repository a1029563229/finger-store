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

Vue.use(Router)

export default new Router({
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
    {
      path: '*',
      redirect: '/home'
    }
  ]
})



