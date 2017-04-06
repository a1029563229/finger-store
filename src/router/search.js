/*
 * Created by YangYusheng on 2017-04-05
 */
const search = r => require.ensure([], () => r(require('../page/search')), 'search');

export default {
	path: '/search',
	name: 'search',
	title: 'search',
	component: search
}