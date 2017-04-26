<template>
	<div class="order">
		<header-top title="我的" :goBack="false"></header-top>
		<div class="order-myall">
			<i class="myall-icon"></i>
			<span class="order-myall-text">我的订单</span>
			<div class="myall-right" @click="toMyorder">
				<span>全部订单</span>
				<i class="myall-arrow-right"></i>
			</div>
		</div>
		<ul class="order-choice">
			<li class="choice-item" v-for="(item,index) in tablist" @click="selected(index)">
	      <img :src="item.url" alt="">
				<span>{{item.name}}</span>
			</li>
		</ul>
		<ul class="order-list">
			<li class="order-item" @click="toCollect">
				<i class="item-icon"></i>
				我的收藏
				<div class="item-btn">
					查看收藏
					<i class="list-arrow-right"></i>
				</div>
			</li>
		</ul>
		<navigation></navigation>
	</div>
</template>
<script>
import headerTop from '@/components/common/headerTop'
import navigation from '@/components/common/navigation'
export default {
	name: 'order',
	components: {
		headerTop,
		navigation
	},
	data() {
		return {
			tablist: [
          { name: '待付款', url: 'static/img/my_buy_toptabs_waitpay@2x.png' },
          { name: '待发货', url: 'static/img/my_buy_waitsend@2x.png' },
          { name: '待收货', url: 'static/img/my_buy_toptabs_waittake@2x.png' },
          { name: '已完成', url: 'static/img/my_buy_toptabs_completed@2x.png' },
          { name: '退款',  url: 'static/img/my_buy_toptabs_return@2x.png'}
        ]
		}
	},
	methods: {
		toMyorder() {
			this.$router.push('order/myorder');
		},
		selected(index) {
      this.$store.dispatch('setTabIndex',index)
      this.$router.push('order/myorder');
		},
		toCollect(){
      this.$router.push('order/collect');
    }
	}
}
</script>
<style scoped>

.order {
	padding-top: 1.28rem;
	background-color: #F5F5F5;
}

/* 栏目 - 我的订单 */
.order-myall {
	position: relative;
	width: 100%;
	height: 1.0rem;
	line-height: 1.0rem;
	padding: 0 3%;
	border-bottom: 1px solid #EEE;
	overflow: hidden;
	background-color: #FFF;
}
.order-myall-text {
	font-size: 0.4rem;
}
.myall-icon {
	float: left;
	display: block;
	width: 0.9rem;
	height: 1rem;
	background: url('../assets/icon/my_order@2x.png') no-repeat center;
	background-size: 0.55rem;
}
.myall-right {
	float: right;
	color: #999;
	font-size: 0.35rem;
}

.myall-arrow-right {
	float: right;
	display: block;
	width: 1rem;
	height: 1rem;
	background: url('../assets/icon/arrow-right.png') no-repeat center;
	background-size: 0.4rem;
	opacity: 0.6;
}

/* 栏 - tablist */
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
.choice-item > img{
  width: 0.8rem
}

/* order-list */
.order-list {
	margin-top: 0.28rem;
	border-top: 1px solid #EEE;
}
.order-item {
	width: 100%;
	height: 1.3rem;
	line-height: 1.3rem;
	border-bottom: 1px solid #EEE;
	background-color: #FFF;
	padding: 0 3%;
	font-size: 0.4rem;
}
.item-icon {
	float: left;
	width: 0.9rem;
	height: 100%;
	background: url('../assets/icon/common_collection_press@2x.png') no-repeat center;
	background-size: 0.6rem;
}
.item-btn {
	float: right;
	color: #999;
	font-size: 0.35rem;
}
.list-arrow-right {
	float: right;
	display: block;
	width: 1rem;
	height: 1.3rem;
	background: url('../assets/icon/arrow-right.png') no-repeat center;
	background-size: 0.4rem;
	opacity: 0.6;
}


</style>
