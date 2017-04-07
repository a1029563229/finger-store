<template>
	<ul class="order-choice">
		<li class="choice-item" v-for="(item,index) in list" @click="selected(index)">
			<i></i>
			<span>{{item}}</span>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'order-choice',
		data() {
			return {
				list: ['待付款', '待发货', '待收货', '已完成', '退款'],
			}
		},
		methods: {
			selected(index) {
				console.log(index);
			}
		}
	}
</script>
<style scoped>
	.order-choice {
		width: 100%;
		height: 1.8rem;
		border-bottom: 1px solid #EEE;
	}
	.choice-item {
		float: left;
		width: 20%;
		height: 100%;
		font-size: 0.35rem;
		line-height: 0.65rem;
		text-align: center;
	}
	.choice-item i {
		display: block;
		width: 100%;
		height: 1.0rem;
		background: url('../../assets/icon/common_collection_press@2x.png') no-repeat center;
		background-size: 0.8rem;
	}
</style>