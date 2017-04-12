/*
 * Created by YangYusheng on 2017-04-05
 */
import * as type from './mutations_type'

export default {

	[type.GET_USERINFO](state, info) {
		if (state.loginToken) {
			return
		}
		/*if (!state.login) {
			return 
		}*/
		if (info) {
			state.loginToken = info;
		}
	},
	[type.CHANGE_HOME_SORT](state,info) {
		console.log('info', info.index);
		state.searchStoreKey.sort = info.index;
	}
}