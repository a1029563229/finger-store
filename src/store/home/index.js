/*
 * Created by YangYusheng on 2017-04-05
 */
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
	login: true,
	loginToken: '514004170e8f40c5a351bd0ecf685575', //登录成功后的sessionkey
	searchProductKey: {
		appkey: 100000029,
		sort: 1, 				// int 1.综合（销量+价格）2.销量 3.价格
		storeid: 0,			// int	店铺id（0 代表全站，不为0代表搜索店铺内商品）
		sequence: 0,		// 顺序排列：1 倒序：0正序
		pageindex: 1, 	// 页码
		pagesize: 10,  // int	每页多少条数据

		brandName: '',  // string	品牌名称
		maxPrice: '',		// string	价格区间最大值
		minPrice: '',   // string	价格区间最小值
		color: '', 			// string	颜色 
		memory: ''     // string	内存	
	},
	searchStoreKey: {
		appkey: 100000029, 
		lat: '120.14563', // String	纬度
		lng: '30.242523', // String	经度
		pageIndex: 1,  		// int	页码
		pageSize: 14,			// int	每页多少条数据
		sort: 1, 					// int 1.综合（销量+价格）2.销量 3.价格
		sequence: 0, 			// 顺序排列：1 倒序：0正序

		brandName: '',  // string	品牌名称
		maxPrice: '',		// string	价格区间最大值
		minPrice: '',   // string	价格区间最小值
		color: '', 			// string	颜色 
		memory: ''     // string	内存	
	}
}

export {
	state,
	mutations,
	actions,
	getters
}