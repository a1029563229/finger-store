/*
 * Created by YangYusheng on 2017-04-07
 */
 const storeList = r => require.ensure([], () => r(require('../page/storeList')), 'storeList');
// const resolve => require(['../page/storeList'], resolve);

export default {
	path: '/productlist/storelist',
	name: 'storeList',
	component: storeList
}
