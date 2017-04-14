import axios from 'axios'
import { appkey, token, GainOrderList } from '../../config/env'
import { Loading } from 'element-ui';

export const list = {
  state: {
    listData:[],
    // listTabIndex: 3
  },
  mutations: {
    switchTab(state,params){
      //1未支付 2待发货  3已发货 4已完成 5退款
      if( params ===  0){ //全部
        sendRequest(0).then( (data) =>{
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
      }
    }
  },
  actions:{
    switchTab: ({commit,state},params) =>{
      commit('switchTab',params)
    }
  }
}

function sendRequest( orderStatus ){
  return new Promise( (resolve, reject) =>{
    let obj = {
      token: token,
      appkey: appkey,
      timestamp: Date.now(),
      pageindex: 1,
      pagesize: 10,
      orderStatus: orderStatus
    }
    axios.post(GainOrderList,obj)
      .then( res =>{
        resolve(res.data.Data)
      })
  })
}
