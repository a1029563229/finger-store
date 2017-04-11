/*
 * Created by YangYusheng on 2017-04-11
 */

const orderdetail = r => require.ensure([], () => r(require('../page/orderdetail')), 'orderdetail');

export default {
	path: '/orderdetail',
	name: 'orderdetail',
	component: orderdetail
}