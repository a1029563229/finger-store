<template>
	<ul class="order-tab">
		<li class="tab-item" :class="{active: index === itemNum }" v-for="(item, index) in tabList" @click="chooseItem(index+1)">
			{{ item }}
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'order-tab',
		data() {
			return {
				tabList: ['全部', '待付款', '待发货', '待收货', '已完成'],
				itemNum: 0
			}
		},
		methods: {
			chooseItem(index) {
				this.itemNum = index;
			}
		}
	}
</script>
<style scoped>
	.order-tab {
		display: flex;
		background-color: #FFF;
		width: 100%;
		height: 1.08rem;
		justify-content: center;
		color: #222;
		border-bottom: 1px solid #EEE;
	}
	.tab-item {
	}
</style>