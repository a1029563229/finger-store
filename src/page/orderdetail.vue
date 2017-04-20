<template>
	<div class="order-detail">
		<header-top title="订单详情"></header-top>
		<section class="detail-head">
			<i class="head-icon"></i>
			{{orderDetail.Status | orderStateName }}
		</section>
		<section class="detail-user">
			<p class="clear user-phone">
				<i class="user-icon"></i>
				收货人：{{orderDetail.customer.consignee}}
				<span class="user-phone-num">
					{{orderDetail.customer.phoneNumber}}
				</span>
			</p>
			<p class="clear user-detail">
				<i class="local-icon"></i>
					地址：{{orderDetail.customer.deliveryAddress}}
			</p>
		</section>
  	<ul class="detail-order clear">
    	<li class="detail-order-list" v-for="item in orderDetail.productList">
    		<div class="order-img">
	        <img :src="item.productImage">
	      </div>
	      <div class="order-info">
	        <span class="order-info-title">{{item.productName}}</span>
	        <div class="order-bot">
	          <span class="order-price">{{item.productPrice | money }}</span>
	          <span class="order-mount">x{{item.quantity}}</span>
	        </div>
	      </div>
    	</li>
  	</ul>
		<section class="detail-price">
			<p>
				<i>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费</i>
				<span>{{orderDetail.shippingRates | money }}</span>
			</p>
			<p>
				<i>积分抵用</i>
				<span>{{orderDetail.ordersOffers | money }}</span>
			</p>
			<p>
				<i>实  付  &nbsp;款</i>
				<span class="detail-price-num">{{orderDetail.totalPrice | money}}</span>
			</p>
		</section>
		<section class="detail-info">
			<p>
				<i>订单编号</i>
				<span>{{orderDetail.orderNo}}</span>
			</p>
			<p>
				<i>下单时间</i>
				<span>{{orderDetail.orderedTime}}</span>
			</p>
			<p>
				<i>付款时间</i>
				<span>{{orderDetail.paymentTime}}</span>
			</p>
			<p>
				<i>订单备注</i>
				<span v-show="orderDetail.producttype == 1">主商品</span>
				<span v-show="orderDetail.producttype == 3">赠品</span>
			</p>
		</section>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import headerTop from '@/components/common/headerTop'
import { appkey } from '../config/env'
import { GainZZDOrderDetail } from '../service/getData'
export default {
	name: 'orderdetail',
	data() {
		return {
      orderDetail: [],
		}
	},
	components: {
		headerTop,
	},
	created() {
		this.tokenInit();
	},
  mounted(){
    this.getOrderDetail()
  },
  computed:{
    ...mapState({
    	token: state => state.home.token,
    	orderno: state => state.list.orderno
    })
  },
  filters: {
  	money(value) {
  		let val = parseFloat(value).toFixed(2)
  		return  `￥ ${val}`
  	},
  	orderStateName(state) {
  		switch(state) {
  			case 1: 
  				return '买家待付款'
  			case 2: 
  				return '卖家待发货'
  			case 3: 
  				return '买家待收货'
  			case 4: 
  				return '订单已完成'
  			case 5: 
  				return '商品已退款'
  		}
  	}
  },
  methods:{
		tokenInit() {  // 获取token
		 if (!this.token) {
			this.$store.dispatch('recordToken',this.readCookie('USERTOKEN'));
			console.warn('this.token:',this.token);
		 }
		},
		readCookie(name) { 	// 获取cookie
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
		  return '';
		},
    async getOrderDetail() {
    	let param = {
    		appkey: appkey,
    		token: this.token,
    		orderNo: this.orderno
    	};
    	let res = await GainZZDOrderDetail(param);
    	this.orderDetail = res.Data;
    	// this.$store.dispatch('setListDetail', res.Data);
    }
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
	font-size: 0.45rem;
	background-image: linear-gradient(-153deg, #F53F36 4%, #E8146C 100%);
}
.head-icon {
	display: block;
	width: 1.28rem;
	height: 1.28rem;
	background: url('../assets/icon/order_detail@3x.png') no-repeat center;
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
	display: flex;
	justify-content: flex-start;
	align-items: center;
	overflow: hidden;
}

.detail-user i {
	display: block;
	float: left;
	width: 1rem;
	height: 1rem;
}

.user-phone {
	position: relative;
	line-height: 1rem;
	font-size: 0.38rem;
	height: 1rem;
}
.user-phone-num {
	position: absolute;
	top: 0;
	right: 4%;
	font-size: 0.38rem;
}

.user-icon {
	background: url('../assets/icon/confirmorder_name@2x.png') no-repeat center;
	background-size: 0.6rem;
}
.local-icon {
	background: url('../assets/icon/confirmorder_address-green@2x.png') no-repeat center;
	background-size: 0.6rem;
}

.user-detail {
	font-size: 0.35rem;
}

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

.detail-order {
	margin-top: 3%;
}

.detail-order-list{
  width: 100%;
  height: 3rem;
  background: #FFF;
  border-bottom: 1px solid #EEE;
  padding: 3%;
}
.order-img{
	position: relative;
  width: 30%;
  height: 0;
  padding-bottom: 25%;
  float: left;
  overflow: hidden;
}
.order-img > img{
	position: absolute;
	left: 50%;
	top: 50%;
  width:100%;
  transform: translate(-50%, -50%);
}

.order-info {
  width: 70%;
  float: right;
  height: 100%;
  padding-left: 3%;
  position: relative;
}
.order-info-title {
	display: block;
	max-height: 1.55rem;
	overflow: hidden;
}

.order-bot{
  position: absolute;
  left: 3%;
  bottom: 0;
  line-height: 0.7rem;
  width: 90%;
}
.order-price{
  color: #E84567;
  font-size: 0.4rem;
}
.order-mount{
  position: absolute;
  right: 0;
  top: 0;
  font-size: 0.35rem;
}
</style>
