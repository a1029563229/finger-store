import axios from 'axios'
import Qs from 'qs'
import { appkey, token, GainZZDOrderList } from '../../config/env'
import { Loading } from 'element-ui';
import router from '../../router'




export const list = {
  state: {
    listData:[],
    isfromMyorder:false,
    selectIdx: 0,
    listDetail:[],
    expressno: '',
    orderno:'',
    lat: 112, //经度
    lng: 130 //维度
  },
  mutations: {
    switchTab(state,params){
      //1未支付 2待发货  3已发货 4已完成 5退款
      if( params ===  0){ //全部
        sendRequest(0).then( (data) =>{
          console.log(data)
          state.listData = data
        })
      }else if(params ===  1){ //待付款
        sendRequest(1).then( (data) =>{
          state.listData = data
        })
      }else if(params ===  2){ //待发货
        sendRequest(2).then( (data) =>{
          state.listData = data
        })
      }else if(params ===  3){ //待收货
        sendRequest(3).then( (data) =>{
          state.listData = data
        })
      }else if(params ===  4){ //已完成
        sendRequest(4).then( (data) =>{
          state.listData = data
        })
      }else if(params ===  5){ //退款
        sendRequest(5).then( (data) =>{
          state.listData = data
        })
      }
    },
    setTabIndex(state,params){
      console.log(params)
      state.isfromMyorder = true
      // 0待付款 1待发货 2 待收货 3已完成 4退款
      if( params == 0 ){ //待付款
        sendRequest(1).then( (data) =>{
          state.listData = data
        })
        state.selectIdx = 1
        router.replace({path:'/myOrder'})
      }else if( params == 1 ){ //待发货
        sendRequest(2).then( (data) =>{
          state.listData = data
        })
        state.selectIdx = 2
        router.replace({path:'/myOrder'})
      }else if( params == 2 ){ //待收货
        sendRequest(3).then( (data) =>{
          state.listData = data
        })
        state.selectIdx = 3
        router.replace({path:'/myOrder'})
      }else if( params == 3 ){ //已完成
        sendRequest(4).then( (data) =>{
          state.listData = data
        })
        state.selectIdx = 4
        router.replace({path:'/myOrder'})
      }else if( params == 4 ){ //退款
        console.log('退款')
        sendRequest(5).then( (data) =>{
          state.listData = data
          console.log(state.listData)
          state.selectIdx = 5
          router.replace({path:'/myOrder'})
        })

      }
    }
  },
  actions:{
    switchTab: ({commit,state},params) =>{
      commit('switchTab',params)
    },
    setTabIndex: ({commit,state},params) =>{
      commit('setTabIndex',params)
    }
  }
}

function sendRequest( orderStatus ){
  return new Promise( (resolve, reject) =>{
    let obj = {
      token: token,
      appkey: appkey,
      pageindex: 1,
      pagesize: 10,
      orderStatus: orderStatus
    }
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post(GainZZDOrderList,Qs.stringify(obj))
      .then( res =>{
        if( res.data && res.data.ResultCode !== 1000 ){
          alert( res.data.Message )
        }else {
          console.log(res.data)
          resolve(res.data.Data)
        }
      })
  })
}
