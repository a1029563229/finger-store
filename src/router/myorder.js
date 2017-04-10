/*
 * Created by YangYusheng on 2017-04-10
 */
 const myorder = r => require.ensure([], () => r(require('../page/myorder')), 'myorder');

export default {
	path: '/myorder',
	name: 'myorder',
	component: myorder
}