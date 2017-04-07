/*
 * Created by YangYusheng on 2017-04-07
 */
 const store = r => require.ensure([], () => r(require('../page/store')), 'store');
// const resolve => require(['../page/store'], resolve);

export default {
	path: '/store',
	name: 'store',
	title: 'store',
	component: store
}