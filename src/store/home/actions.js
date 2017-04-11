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
		console.info(res.data.Data);
		commit(GET_USERINFO, res.data.Data);
	}
}