/*
 * Created by YangYusheng on 2017-04-12
 */
 const map = r => require.ensure([], () => r(require('../page/map')), 'map');

export default {
	path: '/map',
	name: 'map',
	component: map
}