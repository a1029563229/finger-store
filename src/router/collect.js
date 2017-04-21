

 const collect = r => require.ensure([], () => r(require('../page/collect')), 'collect');

export default {
	path: '/collect',
	name: 'collect',
	component: collect
}