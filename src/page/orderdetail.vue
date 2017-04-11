<template>
	<div class="order-detail">
		<header-top title="订单详情"></header-top>
		<section class="detail-head">
			<i class="head-icon"></i>
			卖家待发货
		</section>
		<section class="detail-user">
			<p class="clear user-phone">
				<i class="user-icon"></i>
				收货人：郝迎夏
				<span class="">
					13877662222
				</span>
			</p>
			<p class="clear user-detail">
				<i class="local-icon"></i>
				<!-- <span class="local-detail"> -->
					地址：广东省深圳市南山区科技园北6号金融基地1栋8楼地址：广东省北6号金融广东省北6号金融基地1栋8楼地址：广东省
				<!-- </span> -->
			</p>
		</section>
		<commodity-item class="commodity-item"></commodity-item>
		<section class="detail-price">
			<p>
				<i>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费</i> 
				<span>¥0.00</span>
			</p>
			<p>
				<i>积分抵用</i> 
				<span>¥0.00</span>
			</p>
			<p>
				<i>实  付  &nbsp;款</i> 
				<span class="detail-price-num">¥789.00</span>
			</p>
		</section>
		<section class="detail-info">
			<p>
				<i>订单编号</i>
				<span>B2000923233434</span>
			</p>
			<p>
				<i>订单返利</i>
				<span>B2000923233434</span>
			</p>
			<p>
				<i>下单时间</i>
				<span>2016/01/07  09:13:42</span>
			</p>
			<p>
				<i>付款时间</i>
				<span>B2000923233434</span>
			</p>
			<p>
				<i>订单备注</i>
				<span>2016/01/07  09:13:42</span>
			</p>
		</section>
	</div>
</template>
<script>

import headerTop from '@/components/common/headerTop'
import commodityItem from '@/components/order/commodityItem'

export default {
	name: 'order-detail',
	data() {
		return {

		}
	},
	components: {
		headerTop,
		commodityItem,
	}
}
</script>
<style scoped>

.order-detail {
	padding-top: 1.28rem;
	background-color: #F4F4F4;
}

.detail-head {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 2.52rem;
	color: #FFF;
	font-size: 0.4rem;
	background-image: linear-gradient(-153deg, #F53F36 4%, #E8146C 100%);
}
.head-icon {
	display: block;
	width: 1.28rem;
	height: 1.28rem;
	background: url('../assets/icon/common_like_press@3x.png') no-repeat center;
	background-size: 1.28rem;
	margin-right: 0.1rem;
}

/* 用户信息 */
.detail-user {
	width: 100%;
	height: 2.24rem;
	line-height: 1.2;
	background-color: #FFF;
	overflow: hidden;
	font-size: 0.4rem;
}

.detail-user p {
	padding: 0 4%;
	height: 1.12rem;
	overflow: hidden;
}

.detail-user i {
	display: block;
	float: left;
	width: 0.6rem;
	height: 1.12rem;
}

.user-phone {
	line-height: 1.12rem;
}

.user-icon {
	background: url('../assets/icon/common_like_press@2x.png') no-repeat center;
	background-size: 0.6rem;
}
.local-icon {
	background: url('../assets/icon/common_like_press@2x.png') no-repeat center;
	background-size: 0.6rem;
}

.user-detail {
	font-size: 0.35rem;
}

/* .local-detail {
	display: inline-block;
	line-height: 1.2;
	width: auto;
	font-size: 0.35rem;
	max-height: 1.12rem;
	overflow: hidden;
} */
/* commodity */
.commodity-item {
	margin-top: 0.25rem;
	background-color: #FFF;
}
/* price */
.detail-price {
	width: 100%;
	height: 2.24rem;
	background-color: #FFF;
	border-bottom: 1px solid #EEE;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.detail-price p {
	display: flex;
	justify-content: flex-start;
	padding-left: 4%;
}
.detail-price span {
	flex: 4;
}
.detail-price-num {
	color: #E52951;
}
.detail-price i {
	flex: 1;
}

/* time */
.detail-info {
	width: 100%;
	height: 4.64rem;
	background-color: #FFF;
	padding: 0.4rem 4% 0;
	line-height: 0.7rem;
}

.detail-info span {
	color: #999;
	margin-left: 2%;
}


</style>