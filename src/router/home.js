/*
 * Created by YangYusheng on 2017-04-01
 */
// const home = r => require.ensure([], () => r(require('../page/home')), 'home');
// const resolve => require(['../page/home'], resolve);

export default {
	path: '/home',
	name: 'home',
	/*beforeEnter: (to, from, next) => {
    console.log('to:', to,'from',from);
    next({
    	to.query = {token: '123'}
    })
  },*/

	component: resolve => require(['../page/home'], resolve)
}