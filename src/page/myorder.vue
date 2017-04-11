<template>
	<div class="myorder">
		<header-top title="我的订单"></header-top>
		<order-tab></order-tab>
		<order-item class="myorder-list"></order-item>
		<navigation></navigation>
	</div>
</template>
<script>
import headerTop from '@/components/common/headerTop'
import orderTab from '@/components/order/orderTab'
import orderItem from '@/components/order/orderItem'
import navigation from '@/components/common/navigation'

export default {
	data() {
		return {

		}
	},
	components: {
		headerTop,
		orderTab,
		orderItem,
		navigation
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