/*
 * Created by YangYusheng on 2017-04-07
 */
 const shop = r => require.ensure([], () => r(require('../page/shop')), 'shop');
// const resolve => require(['../page/shop'], resolve);

export default {
	path: '/shop',
	name: 'shop',
	title: 'shop',
	component: shop
}