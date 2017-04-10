/*
 * Created by YangYusheng on 2017-04-01
 */
import Vue from 'vue'
import Router from 'vue-router'

import Home from './home'
import Order from './order'
import Search from './search'
import Store from './store'
import StoreList from './storeList'
import Myorder from './myorder'

Vue.use(Router)

export default new Router({
	 routes: [
	 	Home,
	 	Order,
	 	Search,
	 	Store,
	 	StoreList,
	 	Myorder,
	 	{
	 		path: '*',
	 		redirect: '/home'
	 	}
	 ]
})



