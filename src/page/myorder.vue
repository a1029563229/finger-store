<template>
	<div>
		<header-top title="我的订单"></header-top>
		<order-tab></order-tab>
	</div>
</template>
<script>
import headerTop from '@/components/common/headerTop'
import orderTab from '@/components/order/orderTab'
export default {
	data() {
		return {

		}
	},
	components: {
		headerTop,
		orderTab,
	}
}
</script>
<style scoped>
	
</style>