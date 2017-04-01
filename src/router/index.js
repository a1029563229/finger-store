/*
 * Created by YangYusheng on 2017-04-01
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './home'
import Hello from './hello'

Vue.use(Router)

export default new Router({
	 routes: [
	 	Home,
	 	Hello,
	 ]
})



