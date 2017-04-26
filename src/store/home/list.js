
export const list = {
  state: {
    listData:[],
    isfromMyorder:false,
    selectIdx: 0,
    listDetail:[],
    expressno: '',
    orderno:'',
  },
  mutations: {
    SET_LISTDETAIL(state, params) {
      state.listDetail = params;
    },
    SET_LISTDATA(state, payload) {
      state.listData = payload;
    },
    SET_ORDERNO(state, payload) {
      state.orderno = payload;
    },
    SET_TABINDEX(state, payload) {
      state.selectIdx = payload;
    }


  },
  actions:{
    switchTab: ({commit,state},params) =>{
      commit('SET_SWITCHTAB',params)
    },
    setTabIndex: ({commit,state},params) =>{
      commit('SET_TABINDEX',params)
    },
    setListDetail: ({commit}, params) => {
      commit('SET_LISTDETAIL', params)
    },
    setListData: ({commit}, params) => {
      commit('SET_LISTDATA', params)
    },
    setOrderno: ({commit}, params) => {
      commit('SET_ORDERNO', params)
    }
  }
}
