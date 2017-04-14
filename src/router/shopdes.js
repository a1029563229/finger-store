
const shopdes = r => require.ensure([], () => r(require('../page/shopdes.vue')), 'shopdes');

export default {
  path: '/shopdes',
  name: 'shopdes',
  component: shopdes
}
