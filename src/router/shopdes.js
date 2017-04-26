
const shopdes = r => require.ensure([], () => r(require('../page/shopdes.vue')), 'shopdes');

export default {
  path: '/home/shop/shopdes',
  name: 'shopdes',
  component: shopdes
}
