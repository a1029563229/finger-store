/*
 * Created by YangYusheng on 2017-04-05
 */

export const home = {
	state: {
		login: false,
		loginToken: '', //登录成功后的sessionkey
		storeInfo: {},
		token: '',
		storeLocal: {},
		userLocal: {},
	
	},
	mutations: {
	  RECORD_TOKEN(state, params) {
	  	console.warn('TOKEN',params);
	  	state.token = params;
	  },
		RECORD_STOREINFO(state,params) {
			console.log('RECORD_STOREINFO',params);
			state.storeInfo = params;
		},
		RECORD_STORELOCAL(state,params) {
			state.storeLocal = params;
		},
		RECORD_USERLOCAL(state,params) {
			state.userLocal = params;
		}
	},
	actions: {
		recordToken: ({commit, state}, params) => {
			commit('RECORD_TOKEN', params)
		},
		recordStoreInfo: ({commit,state}, params) =>{
      commit('RECORD_STOREINFO',params)
    },
    recordStoreLocal: ({commit,state}, params) => {
    	commit('RECORD_STORELOCAL', params)
    },
    recordUserLocal: ({commit,state}, params) => {
    	commit('RECORD_USERLOCAL', params)
    },

	}
}



