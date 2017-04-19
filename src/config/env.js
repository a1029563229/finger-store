
// export const token = Home.home.state.token
import * as Home from '../store/home/home'

const baseUrl = '';

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'https://dev-ydyd-app.vpclub.cn';
} else {
	baseUrl = 'https://dev-ydyd-app.vpclub.cn';
}

export {
baseUrl,
imgBaseUrl,
token
}


let token = '';
if( !!Home.home.state.token){
     token = Home.home.state.token
}else {
    token = readCookie('USERTOKEN');
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
	  var c = ca[i];
	  while (c.charAt(0)==' ') c = c.substring(1,c.length);
	  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

export const appkey = 100000029;



export const testUrl = 'http://218.17.39.178:7092';

export const BASE_URL = 'https://dev-ydyd-app.vpclub.cn/api/1.0';

export const GainOrderList = baseUrl + '/api/1.0' +  '/OrderServer/Order/GainOrderList'   //获取订单列表
export const GetContractStoreInfo = baseUrl + '/api/1.0' + '/YupinhuiServer/ZZDHandle/GetContractStoreInfo'  //获取店铺具体信息
export const GetStoreQrCode = baseUrl + '/api/1.0' + '/YupinhuiServer/ZZDHandle/GetStoreQrCode'  //获取店铺的二维码
// export const GainZZDOrderList = baseUrl + '/api/1.0' + '/OrderServer/Order/ GainZZDOrderList'  //用于店主获取订单列表
export const GainZZDOrderList = baseUrl + '/api/1.0' + '/YupinhuiServer/ZZDHandle/GainZZDOrderList'  //用于店主获取订单列表
export const GainZZDOrderDetail = baseUrl + '/api/1.0' + '/YupinhuiServer/ZZDHandle/GainZZDOrderDetail'  //获取订单详细
export const ZZDApplyDrawback = baseUrl + '/api/1.0' +'/YupinhuiServer/ZZDHandle/ZZDApplyDrawback'  //用于用户申请退款
export const AddStoreSuperb = baseUrl + '/api/1.0' + '/YupinhuiServer/ZZDHandle/AddStoreSuperb'  //店铺点赞
export const AddStoreCollect = baseUrl + '/api/1.0' + '/YupinhuiServer/ZZDHandle/AddStoreCollect' //店铺收藏
export const GetZZDTodayRecommed = baseUrl + '/api/1.0' + '/YupinhuiServer/ZZDHandle/GetZZDTodayRecommed' //获取今日推荐


export const  GainBindBankById = baseUrl + '/api/1.0' + '/FinanceServer/Verify/GainBindBankById'  //通过ID获取绑定银行卡信息
export const  GetCollectSotres = baseUrl + '/api/1.0' + '/YupinhuiServer/ZZDHandle/GetCollectSotres'  //查询我的收藏店铺列表
export const  ZZDDeleteOrderByNo = baseUrl + '/api/1.0' + '/YupinhuiServer/ZZDHandle/ZZDDeleteOrderByNo'  //根据订单号删除订单
