const NotFound = r => require.ensure([], () => r(require('../page/NotFound.vue')), 'NotFound');

export default {
  path: '/notfound',
  name: 'NotFound',
  component: NotFound
}
