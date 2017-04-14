/*
 * Created by YangYusheng on 2017-04-11
 */

 import { getToken, } from '../../service/getData'

 import { GET_USERINFO } from './mutations_type'

export default {

	async getUserInfo({
		commit, state
	}) {
		let res = await getToken();
		console.warn('token:::',res);
		commit(GET_USERINFO, res);
	},
	switch_home_sort: ({commit}, param) => commit('CHANGE_HOME_SORT', {index: param}),
	// add_page_index: ({commit}, param) => commit('CHANGE_HOME_SORT', {index: param})
}