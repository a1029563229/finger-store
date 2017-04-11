<template>
	<ul>
		<li class="list-wrap">
			<div class="list-img">
				<img src="http://vpchina.vpclub.cn/images/201612/goods_img/121_G_1482906158633.jpg" >
			</div>
			<div class="list-desc">
				<h1>
					移动4G手机移动4G手机
				<!-- 双卡双待双卡双待双卡移动4G手机移动4G手机双卡双待双卡双待双卡 -->
				</h1>
				<p>
					颜色：黑色      机器型号：MX4 PRO    包邮
					<!-- 包邮包邮包包包邮包邮包邮包包邮包邮包邮包包邮包邮包邮包包邮 -->
				</p>
				<h2>
					<span class="list-price">¥779.00</span>
					<i>X 1</i>
				</h2>
			</div>
		</li>
	</ul>
</template>
<script>
	export default {

	}
</script>
<style scoped>
	/* 商品列表 */

.list-wrap {
	display: flex;
	width: 100%;
	height: 2.72rem;
	align-items: center;
	justify-content: space-around;
	align-items: stretch;
	padding-right: 4%;
	border-bottom: 1px solid #EEE;
}
.list-img {
	flex: 1;
	padding: 0.3rem;
}
.list-desc {
	display: flex;
	flex-direction: column;
	flex: 3;
	padding: 0.25rem 0;
	height: 2.72rem;
	justify-content: space-around;
	overflow: hidden;
}
.list-desc h1 {
	flex: 2;
	font-size: 0.32rem;
	overflow: hidden;
}
.list-desc p {
	flex: 2;
	font-size: 0.28rem;
	overflow: hidden;
}

.list-desc h2 {
	display: flex;
	font-size:  0.34rem;
	flex: 1;
	overflow: hidden;
	justify-content: space-between;
}

.list-price {
	color: #E52951;
}

</style>