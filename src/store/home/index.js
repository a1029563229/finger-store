/*
 * Created by YangYusheng on 2017-04-05
 */
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
	login: true,
	loginToken: '', //登录成功后的sessionkey
	list: [],
	slides: [],
}

export {
	state,
	mutations,
	actions,
	getters
}