/*
 * Created by YangYusheng on 2017-04-18
 */
const productlist = r => require.ensure([], () => r(require('../page/productlist')), 'productlist');

export default {
	path: '/productlist',
	name: 'productlist',
	component: productlist
}