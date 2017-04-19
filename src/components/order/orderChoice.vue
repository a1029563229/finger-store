<template>
	<ul class="order-choice">
		<li class="choice-item" v-for="(item,index) in list" @click="selected(index)">
      <img :src="item.url" alt="">
			<span>{{item.name}}</span>
		</li>
	</ul>
</template>
<script>
  import router from '../../router'

	export default {
		name: 'order-choice',
		data() {
			return {
        list: [
          {
              name: '待付款',
              url: 'static/img/my_buy_toptabs_waitpay@2x.png'
          },
          {
            name: '待发货',
            url: 'static/img/my_buy_waitsend@2x.png'
          },
          {
            name: '待收货',
            url: 'static/img/my_buy_toptabs_waittake@2x.png'
          },
          {
            name: '已完成',
            url: 'static/img/my_buy_toptabs_completed@2x.png'
          },
          {
            name: '退款',
            url: 'static/img/my_buy_toptabs_return@2x.png'
          }
        ]
			}
		},
		methods: {
			selected(index) {
        this.$store.dispatch('setTabIndex',index)
			}
		}
	}
</script>
<style scoped>
	.order-choice {
		width: 100%;
		height: 1.8rem;
		border-bottom: 1px solid #EEE;
		background-color: #FFF;
	}
	.choice-item {
    float: left;
    width: 20%;
    height: 100%;
    font-size: 0.35rem;
    line-height: 0.65rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
	}
  .choice-item>img{
    width: 1rem
  }

</style>
