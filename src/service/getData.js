/*
 * Created by YangYusheng on 2017-04-10
 */

// import { baseURL, } from './config/'




/* transformRequest: [function (data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    console.log('ret', ret);
    return ret
  }],*/

 /* var instance = axios.create({
	  baseURL: 'https://dev-ydyd-app.vpclub.cn/api/1.0/',
	  timeout: 1000,
	  headers: {'Content-Type':'application/json; charset=utf-8'},
	});
	instance.post('YupinhuiServer/ZZDHandle/GetProductAttribute', {appkey: 100000029}).then(data => {
		console.log('axios-data:', data);
	})*/


/*axios({
  url: 'https://dev-ydyd-app.vpclub.cn/api/1.0/YupinhuiServer/ZZDHandle/GetProductAttribute',
  method: 'post',
  data: {
    appkey: '100000029'
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})*/


import axios from 'axios'
import { baseUrl, appkey, testUrl,GainOrderList } from '../config/env'

import slides from './mock/home-swipe'









const setPromise = data => {
	return new Promise((resolve, reject) => {
		resolve(data)
	})
};

// axios 全局配置
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = baseUrl;
axios.defaults.transformRequest = [function (data) {
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
var getToken = () =>  axios({
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
		searchData
	}
});


// 获取店铺列表
var searchStoreList = (token) => axios({
	url: service + '/SearchStoreByGoodsParam',
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

// 店铺收藏
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


/*const fetch = (url, data = {}) => {
	return axios({
		url: url,
		method: 'post',
		data: JSON.stringify(data)
	})
}
var deleteSearchWords = (token) => fetch(service + '/DeleteSearchWords', {
	appkey: appkey,
	token: token
})*/



/*

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('config', config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

*/

var getSlides = () => {
		return setPromise(slides);
	}


// 导出相关方法
export {
	getSearchAttrList, getSlides, getToken, getTodayRecommend, getBanner, getHotSearchWords, getHistoryWords, deleteSearchWords,
	addStoreCollect, addStoreSuperb, getContractStoreInfo, getStoreQrcode, searchProductList, searchStoreList,
}
