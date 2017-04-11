<template>
	<div class="order">
		<header-top title="我的" :goBack="false"></header-top>
		<div class="order-myall">
			<i class="myall-icon"></i>
			我的订单
			<div class="myall-right" @click="toMyorder">
				<span>全部订单</span>
				<i class="arrow-right"></i>
			</div>
		</div>
		<order-choice></order-choice>
		<order-list></order-list>
	</div>
</template>
<script>
import headerTop from '@/components/common/headerTop'
import orderChoice from '@/components/order/orderChoice'
import orderList from '@/components/order/orderList'
export default {
	name: 'order',
	components: {
		headerTop,
		orderChoice,
		orderList,
	},
	methods: {
		toMyorder() {
			this.$router.push('myorder');
		}
	}
}
</script>
<style scoped>
	
	.order {
		padding-top: 1.28rem;
		background-color: #F5F5F5;
	}

	/* .order-title {
		width: 100%;
		height: 1.28rem;
		line-height: 1.28rem;
		font-size: 0.45rem;
		color: #FFF;
		background: #E52A52;
		border-bottom: 1px solid #EEE;
		text-align: center;
	}
	 */
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

	.myall-icon {
		float: left;
		display: block;
		width: 1rem;
		height: 1rem;
		background: url('../assets/icon/common_collection_press@2x.png') no-repeat center;
		background-size: 0.48rem;
	}

	.myall-right {
		float: right;
		color: #999;
	}
	.arrow-right {
		float: right;
		display: block;
		width: 1rem;
		height: 1rem;
		background: url('../assets/icon/arrow-right.png') no-repeat center;
		background-size: 0.4rem;
		opacity: 0.6;
	}
</style>