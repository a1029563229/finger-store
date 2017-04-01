/*
 * Created by YangYusheng on 2017-04-01
 */
const hello = r => require.ensure([], () => r(require('../page/hello')), 'hello');

export default {
	path: '/hello',
	name: 'hello',
	component: hello
}