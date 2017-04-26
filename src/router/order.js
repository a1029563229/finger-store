/*
 * Created by YangYusheng on 2017-04-01
 */
const order = r => require.ensure([], () => r(require('../page/order')), 'order');

export default {
	path: '/order',
	name: 'order',
	component: order
}
