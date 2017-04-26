

 const collect = r => require.ensure([], () => r(require('../page/collect')), 'collect');

export default {
	path: '/order/collect',
	name: 'collect',
	component: collect
}
