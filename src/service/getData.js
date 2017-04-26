/*
 * Created by YangYusheng on 2017-04-10
 */
 import axios from 'axios'
 import { BASE_URL, appkey, testUrl ,token} from '../config/env'

 import { swiper } from './mock/home-swipe'
 import { nearbyList } from './mock/nearbyList'


 const setPromise = data => {
 	return new Promise((resolve, reject) => {
 		resolve(data.data.Data)
 	})
 };

// axios 全局配置
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = BASE_URL;
axios.defaults.transformRequest = [function(data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
    	ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }];

// 公共接口
const service = '/api/1.0/YupinhuiServer/ZZDHandle';


// 获取登录token值
/*let getToken = () => axios({
	url: testUrl + service + '/ZZDLogin',
	method: 'post',
	data: {
		mobilePhone: 13750025993,
		area: '郑州'
	}
});
*/
/**
 * 获取商品搜索属性列表
 */
 let getSearchAttrList = () => axios({
 	url: service + '/GetProductAttribute',
 	method: 'post',
 	data: {
 		appkey: appkey
 	},
 });

// 获取今日推荐
let getTodayRecommend = (token) => axios({
	url: service + '/GetZZDTodayRecommed',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// 获取Banner广告
let getBanner = (token) => axios({
	url: service + '/GetZZDBannerList',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// let getBanner = () => setPromise(swiper);


// 获取商品列表
let searchProductList = (searchData) => axios({
	url: service + '/SearchProductList',
	method: 'post',
	data: {
		...searchData
	}
});


// 获取附近店铺列表
let searchStoreList = (store) => axios({
    url: service + '/SearchStoreByGoodsParam',
    method: 'post',
    data: {
        ...store
    }
  });
 // let searchStoreList = (store) => setPromise(nearbyList);

// 获取热门搜索关键字
let getHotSearchWords = (token) => axios({
	url: service + '/GetHotSearchWords',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// 获取历史搜索关键字
let getHistoryWords = (token) => axios({
	url: service + '/GetHistorySearchWords',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// 清除历史搜索关键字
let deleteSearchWords = (token) => axios({
	url: service + '/DeleteSearchWords',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// 店铺点赞
let addStoreCollect = (params) => axios({
	url: service + '/AddStoreCollect',
	method: 'post',
	data: {
		...params
	}
});

// 店铺点赞
let addStoreSuperb = (params) => axios({
	url: service + '/AddStoreSuperb',
	method: 'post',
	data: {
		...params
	}
});


// 获取店铺的二维码
/*let GetStoreQrCode = (params) => axios({
	url: service + '/GetStoreQrCode?'+ params,
	method: 'get'
});*/

// 获取订单列表
let GainOrderList = (params) => axios({
	url: '/api/1.0/OrderServer/Order/GainOrderList',
	method: 'post',
	data: {
		...params
	}
});

// 获取店铺具体信息
let GetContractStoreInfo = (params) => axios({
	url: service + '/GetContractStoreInfo',
	method: 'post',
	data: {
		...params
	}
});


// 用于店主获取订单列表
let GainZZDOrderList = (params) => axios({
	url: service + '/GainZZDOrderList',
	method: 'post',
	data: {
		...params
	}
});

// 获取订单详细
let GainZZDOrderDetail = (params) => axios({
	url: service + '/GainZZDOrderDetail',
	method: 'post',
	data: {
		...params
	}
});

// 用于用户申请退款
let ZZDApplyDrawback = (params) => axios({
	url: service + '/ZZDApplyDrawback',
	method: 'post',
	data: {
		...params
	}
});

// 通过ID获取绑定银行卡信息
let GainBindBankById = (params) => axios({
	url: '/api/1.0/FinanceServer/Verify/GainBindBankById',
	method: 'post',
	data: {
		...params
	}
});

// 查询我的收藏店铺列表
let GetCollectSotres = (params) => axios({
	url: service + '/GetCollectSotres',
	method: 'post',
	data: {
		...params
	}
});

// 根据订单号删除订单
let ZZDDeleteOrderByNo = (params) => axios({
	url: service + '/ZZDDeleteOrderByNo',
	method: 'post',
	data: {
		...params
	}
});

// 根据订单号催发货
let ZZDExpedite = (params) => axios({
	url: service + '/ZZDExpedite',
	method: 'post',
	data: {
		...params
	}
});


// 响应拦截
axios.interceptors.response.use(function(response) {
    // 处理响应数据
    if (response.status === 200) {
    	if (response.data.ResultCode === 1000) {
    		// console.info(response.data);
    		return response.data;
    	} else if (response.data.ResultCode === 1009) {
    		console.warn('token失效，重新登录');
    	} else {
    		console.warn(response.data.ResultCode);
    	}
    } else {
    	console.warn('网络连接错误，请重试');
    }

  }, function(error) {
    // 处理响应失败
    return Promise.reject(error);
  });

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    // console.log('config', config);
    return config;
  }, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });



// 导出相关方法
export {
    // getToken, 							// 获取登录token值
    getSearchAttrList, 			// 获取商品搜索属性列表
    getTodayRecommend, 			// 获取今日推荐
    getBanner, 							// 获取Banner广告
    searchStoreList, 				// 获取附近店铺列表
    getHotSearchWords, 			// 获取热门搜索关键字
    getHistoryWords, 				// 获取历史搜索关键字
    searchProductList, 			// 获取商品列表
    deleteSearchWords, 			// 清除历史搜索关键字
    addStoreSuperb, 				// 店铺点赞
    addStoreCollect, 				// 店铺收藏
    getContractStoreInfo, 	// 获取店铺具体信息
    // GetStoreQrCode, 				// 获取店铺的二维码
    GainOrderList, 					// 获取订单列表
    GetContractStoreInfo, 	// 获取店铺具体信息
    GainZZDOrderList,				// 用于店主获取订单列表
    GainZZDOrderDetail,  		// 获取订单详细
    ZZDApplyDrawback, 			// 用于用户申请退款
    GainBindBankById,  			// 通过ID获取绑定银行卡信息
    GetCollectSotres,  			// 查询我的收藏店铺列表
    ZZDDeleteOrderByNo, 			// 根据订单号删除订单
    ZZDExpedite							// 根据订单号催发货
  }
