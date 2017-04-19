
// export const token = Home.home.state.token

// if (process.env.NODE_ENV == 'development') {
// 	baseUrl = 'https://dev-ydyd-app.vpclub.cn';
// } else {
// 	baseUrl = '';
// }

// export {
// baseUrl,
// imgBaseUrl,
// appkey,
// token,
// testUrl
// }

import *as Home from '../store/home/home'
// let token;
// if( !!Home.home.state.token){
//      token = Home.home.state.token
// }else {
//   if(document.cookie.split(';')[3].substring(11) === 'null'){
//     console.log('无效token')
//   }else {
//     token = document.cookie.split(';')[3].substring(11)
//   }
//
// }
// export {
//   token
// }

export const token = '8b52046e55a448298ead1022caf7a256'
export const appkey = 100000029;



export const testUrl = 'http://218.17.39.178:7092';

export const BASE_URL = 'https://dev-ydyd-app.vpclub.cn/api/1.0';

export const GainOrderList = BASE_URL + '/OrderServer/Order/GainOrderList'   //获取订单列表
export const GetContractStoreInfo = BASE_URL + '/YupinhuiServer/ZZDHandle/GetContractStoreInfo'  //获取店铺具体信息
export const GetStoreQrCode = BASE_URL + '/YupinhuiServer/ZZDHandle/GetStoreQrCode'  //获取店铺的二维码
// export const GainZZDOrderList = BASE_URL + '/OrderServer/Order/ GainZZDOrderList'  //用于店主获取订单列表
export const GainZZDOrderList = BASE_URL + '/YupinhuiServer/ZZDHandle/GainZZDOrderList'  //用于店主获取订单列表
export const GainZZDOrderDetail = BASE_URL + '/YupinhuiServer/ZZDHandle/GainZZDOrderDetail'  //获取订单详细
export const ZZDApplyDrawback = BASE_URL +'/YupinhuiServer/ZZDHandle/ZZDApplyDrawback'  //用于用户申请退款
export const AddStoreSuperb = BASE_URL + '/YupinhuiServer/ZZDHandle/AddStoreSuperb'  //店铺点赞
export const AddStoreCollect = BASE_URL + '/YupinhuiServer/ZZDHandle/AddStoreCollect' //店铺收藏
export const GetZZDTodayRecommed = BASE_URL + '/YupinhuiServer/ZZDHandle/GetZZDTodayRecommed' //获取今日推荐


export const  GainBindBankById = BASE_URL + '/FinanceServer/Verify/GainBindBankById'  //通过ID获取绑定银行卡信息
export const  GetCollectSotres = BASE_URL + '/YupinhuiServer/ZZDHandle/GetCollectSotres'  //查询我的收藏店铺列表
export const  ZZDDeleteOrderByNo = BASE_URL + '/YupinhuiServer/ZZDHandle/ZZDDeleteOrderByNo'  //根据订单号删除订单
