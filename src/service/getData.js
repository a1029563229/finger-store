/*
 * Created by YangYusheng on 2017-04-10
 */
 import axios from 'axios'
 import { baseUrl, appkey, testUrl, GainOrderList } from '../config/env'

 import slides from './mock/home-swipe'
 import { nearbyList } from './mock/nearbyList'


 const setPromise = data => {
 	return new Promise((resolve, reject) => {
 		resolve(data.data.Data)
 	})
 };

// axios 全局配置
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = baseUrl;
axios.defaults.transformRequest = [function(data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
    	ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    // console.log('param:', ret);
    return ret
  }];

// 公共接口
const service = '/api/1.0/YupinhuiServer/ZZDHandle';


// 获取登录token值
var getToken = () => axios({
	url: testUrl + service + '/ZZDLogin',
	method: 'post',
	data: {
		mobilePhone: 13750025993,
		area: '郑州'
	}
});

/**
 * 获取商品搜索属性列表
 */
 var getSearchAttrList = () => axios({
 	url: service + '/GetProductAttribute',
 	method: 'post',
 	data: {
 		appkey: appkey
 	},
 });

// 获取今日推荐
var getTodayRecommend = (token) => axios({
	url: service + '/GetZZDTodayRecommed',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// 获取Banner广告
var getBanner = (token) => axios({
	url: service + '/GetZZDBannerList',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});


// 获取商品列表
var searchProductList = (searchData) => axios({
	url: service + '/SearchProductList',
	method: 'post',
	data: {
		...searchData
	}
});


// 获取附近店铺列表
var searchStoreList = (store) => axios({
    url: service + '/SearchStoreByGoodsParam',
    method: 'post',
    data: {
        ...store
    }
  });  
 // var searchStoreList = (store) => setPromise(nearbyList);

// 获取热门搜索关键字
var getHotSearchWords = (token) => axios({
	url: service + '/GetHotSearchWords',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// 获取历史搜索关键字
var getHistoryWords = (token) => axios({
	url: service + '/GetHistorySearchWords',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// 清除历史搜索关键字
var deleteSearchWords = (token) => axios({
	url: service + '/DeleteSearchWords',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// 店铺点赞
var addStoreCollect = (token) => axios({
	url: service + '/AddStoreCollect',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// 店铺点赞
var addStoreSuperb = (token) => axios({
	url: service + '/AddStoreSuperb',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// 联系我们-获取店铺具体信息
var getContractStoreInfo = (token) => axios({
	url: service + '/GetContractStoreInfo',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// 获取店铺的二维码
var getStoreQrcode = (token) => axios({
	url: service + '/GetStoreQrCode',
	method: 'post',
	data: {
		appkey: appkey,
		token: token
	}
});

// 响应拦截
axios.interceptors.response.use(function(response) {
    // 处理响应数据
    if (response.status === 200) {
    	if (response.data.ResultCode === 1000) {
    		console.info(response.data);
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
    console.log('config', config);
    return config;
  }, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });



// 导出相关方法
export {
    getToken, // 获取登录token值
    getSearchAttrList, // 获取商品搜索属性列表
    getTodayRecommend, // 获取今日推荐
    getBanner, // 获取Banner广告
    searchStoreList, // 获取附近店铺列表
    getHotSearchWords, // 获取热门搜索关键字
    getHistoryWords, // 获取历史搜索关键字
    searchProductList, // 获取商品列表
    deleteSearchWords, // 清除历史搜索关键字
    addStoreSuperb, //店铺点赞
    addStoreCollect, // 店铺收藏
    getContractStoreInfo, // 获取店铺具体信息
    getStoreQrcode, // 获取店铺的二维码
  }
