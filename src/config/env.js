
let baseUrl;
// let imgBaseUrl;
// const appkey = 100000029;


if (process.env.NODE_ENV == 'development') {
	baseUrl = 'https://dev-ydyd-app.vpclub.cn';
} else {
	baseUrl = '';
}

export {
	baseUrl,
	// imgBaseUrl,
	// appkey,
  // token,
	// testUrl
}


export const appkey = 100000029;
export const token = 'c36a7e4235e14f14af4aec18cc5188e8'
export const testUrl = 'http://218.17.39.178:7092';

export const BASE_URL = 'https://dev-ydyd-app.vpclub.cn/api/1.0';

export const GainOrderList = BASE_URL + '/OrderServer/Order/GainOrderList'   //获取订单列表
export const GetContractStoreInfo = BASE_URL + '/YupinhuiServer/ZZDHandle/GetContractStoreInfo'  //获取店铺具体信息
export const GetStoreQrCode = BASE_URL + '/YupinhuiServer/ZZDHandle/GetStoreQrCode'  //获取店铺的二维码
export const GainZZDOrderList = BASE_URL + '/OrderServer/Order/ GainZZDOrderList'  //用于店主获取订单列表
export const GainZZDOrderDetail = BASE_URL + '/OrderServer/Order/GainZZDOrderDetail'  //获取订单详细
export const ZZDApplyDrawback = BASE_URL +'/OrderServer/OrderFlow/ZZDApplyDrawback'  //用于用户申请退款
export const AddStoreSuperb = BASE_URL + '/YupinhuiServer/ZZDHandle/AddStoreSuperb'  //店铺点赞
export const AddStoreCollect = BASE_URL + '/YupinhuiServer/ZZDHandle/AddStoreCollect' //店铺收藏
export const GetZZDTodayRecommed = BASE_URL + '/YupinhuiServer/ZZDHandle/GetZZDTodayRecommed' //获取今日推荐
