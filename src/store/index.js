/*
 * Created by YangYusheng on 2017-03-30
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 模块数据
import { state,actions,mutations,getters } from './home'

Vue.use(Vuex)

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})