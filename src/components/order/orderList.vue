<template>
	<ul class="order-list">
		<li class="order-item">
			<i class="item-icon"></i>
			我的收藏
			<div class="item-btn">
				查看收藏
				<i class="arrow-right"></i>
			</div>
		</li>
	</ul>
</template>
<script>
	export default {
		name: "order-list",
		data() {
			return {

			}
		}
	}
</script>
<style scoped>
	.order-list {
		margin-top: 0.28rem;
		border-top: 1px solid #EEE;
	}
	.order-item {
		width: 100%;
		height: 1.36rem;
		line-height: 1.36rem;
		border-bottom: 1px solid #EEE;
		background-color: #FFF;
		padding: 0 2%;
		font-size: 0.4rem;
	}
	.item-icon {
		float: left;
		margin-right: 0.1rem;
		width: 0.9rem;
		height: 100%;
		background: url('../../assets/icon/common_collection_press@2x.png') no-repeat center;
		background-size: 0.56rem;
	}
	.item-btn {
		float: right;
		color: #999;
		font-size: 0.35rem;
	}
	.arrow-right {
		float: right;
		margin-left: 0.3rem;
		display: block;
		width: 0.6rem;
		height: 1.36rem;
		background: url('../../assets/icon/arrow-right.png') no-repeat center;
		background-size: 0.4rem;
		opacity: 0.6;
	}

</style>