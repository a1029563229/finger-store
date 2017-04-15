/*
 * Created by YangYusheng on 2017-03-30
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {list} from './home/list'

// 模块数据
import { home} from './home/home'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
	  home,
	  list,
  }
})
