/*
 * Created by YangYusheng on 2017-04-01
 */
import Vue from 'vue'
import Router from 'vue-router'

import home from './home'
import order from './order'
import search from './search'
import store from './store'
import storeList from './storeList'
import myorder from './myorder'
import orderdetail from './orderdetail'

Vue.use(Router)

export default new Router({
	 routes: [
	 	home,
	 	order,
	 	search,
	 	store,
	 	storeList,
	 	myorder,
	 	orderdetail,
	 	{
	 		path: '*',
	 		redirect: '/home'
	 	}
	 ]
})



