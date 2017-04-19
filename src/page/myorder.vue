<template>
	<div class="myorder">
		<header-top title="我的订单"></header-top>
		<order-tab></order-tab>
		<order-item class="myorder-list"></order-item>
		<navigation></navigation>
    <pay-model v-show="showPay"></pay-model>
	</div>
</template>
<script>
import headerTop from '@/components/common/headerTop'
import payModel from '@/components/common/payModel'
import orderTab from '@/components/order/orderTab'
import orderItem from '@/components/order/orderItem'
import navigation from '@/components/common/navigation'

export default {
	data() {
		return {
      showPay: false
		}
	},
	components: {
		headerTop,
		orderTab,
		orderItem,
		navigation,
    payModel
	}
}
</script>
<style scoped>

.myorder {
	padding-top: 1.28rem;
	background-color: #F5F5F5;
}

.myorder-list {
	margin-top: 0.2rem;
}

</style>
