<template>
	<div class="page-header">
		<button class="header-back" @click="toBack()"></button>
		<h1 class="header-title">{{ title }}</h1>
	</div>
</template>
<script>
	export default {
		name: 'page-header',
		/*props: {
			title: {
				type: String,
				default: ''
			}
		},*/
		data() {
			return {
				title: '我的订单'
			}
		},
		methods: {
			toBack() {
				this.$router.go(-1);
			}
		}
	}
</script>
<style scoped>
	.page-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 1.28rem;
		line-height: 1.28rem;
		z-index: 9;
		text-align: center;
		background: #FFF;
		border-bottom: 1px solid #EEE;
	}
	.header-back {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		padding: 0.24rem;
		width: 1.28rem;
		height: 1.28rem;
		background: url('../../assets/icon/topbar_back@2x.png') no-repeat center;
		background-size: 0.6rem;
	}
	.header-title {
		font-size: 0.45rem;
	}
</style>