



/*if (process.env.NODE_ENV == 'development') {
	baseUrl = 'https://dev-ydyd-app.vpclub.cn';
} else {
	baseUrl = 'https://dev-ydyd-app.vpclub.cn';
}*/

import * as Home from '../store/home/home'

// const baseUrl = 'https://dev-ydyd-app.vpclub.cn';

const appkey = 100000029;

export {
	token,
	appkey
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


export const testUrl = 'http://218.17.39.178:7092';

export const BASE_URL = 'https://dev-ydyd-app.vpclub.cn';


