
let baseUrl;
let imgBaseUrl;
const appkey = 100000029;
const testUrl = 'http://218.17.39.178:7092';

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'https://dev-ydyd-app.vpclub.cn';
} else {
	baseUrl = '';
}

export {
	baseUrl,
	imgBaseUrl,
	appkey,
	testUrl
}