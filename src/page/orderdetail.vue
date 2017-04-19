<template>
	<div class="order-detail">
		<header-top title="订单详情"></header-top>
		<section class="detail-head">
			<i class="head-icon"></i>
			{{orderDetail.orderStatusName}}
		</section>
		<section class="detail-user">
			<p class="clear user-phone">
				<i class="user-icon"></i>
				收货人：{{orderDetail.customer['PayContactName']}}
				<span class="">
					{{orderDetail.customer['PayContactTel']}}
				</span>
			</p>
			<p class="clear user-detail">
				<i class="local-icon"></i>
					地址：{{orderDetail.customer['deliveryAddress']}}
			</p>
		</section>
    <section class="detail-order">
      <div class="order-img">
        <img :src="orderDetail.productList.productImage">
      </div>
      <div class="order-info">
        <span>{{orderDetail.productList.productName}}</span>
        <div class="order-bot">
          <span class="order-price">¥{{orderDetail.productList.productPrice}}</span>
          <span class="order-mount">x{{orderDetail.productList.quantity}}</span>
        </div>
      </div>
    </section>
		<section class="detail-price">
			<p>
				<i>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费</i>
				<span>¥{{orderDetail.shippingRates}}</span>
			</p>
			<p>
				<i>积分抵用</i>
				<span>¥{{orderDetail.ordersOffers}}</span>
			</p>
			<p>
				<i>实  付  &nbsp;款</i>
				<span class="detail-price-num">¥{{orderDetail.totalPrice}}</span>
			</p>
		</section>
		<section class="detail-info">
			<p>
				<i>订单编号</i>
				<span>{{orderDetail.orderNo}}</span>
			</p>
			<!--<p>-->
				<!--<i>订单返利</i>-->
				<!--<span>B2000923233434</span>-->
			<!--</p>-->
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

import headerTop from '@/components/common/headerTop'
import commodityItem from '@/components/order/commodityItem'
import { appkey, token, GainZZDOrderDetail } from '../config/env'
export default {
	name: 'orderdetail',
	data() {
		return {
      orderDetail: ''

		}
	},
	components: {
		headerTop,
		commodityItem,
	},
  mounted(){
    this.getOrderDetail()
  },
  computed:{
    orderno(){
        return this.$store.state.list.orderno
    }
  },
  methods:{
    getOrderDetail(){
      let obj ={
        appkey: appkey,
        token: token,
        orderNo: this.orderno
      }
      console.log(obj)
      this.$http.post(GainZZDOrderDetail, this.$qs.stringify(obj))
        .then( res =>{
        if( res.data.ResultCode === 1000 ){
        this.$store.state.list.listDetail = res.data.Data
        this.orderDetail = res.data.Data
      }
    })
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
  line-height: 1.12rem;
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
.detail-order{
  width: 100%;
  height: 3rem;
  background: #fff;
  margin-top: 3%;
  border-bottom: 1px solid #EEEEEE;
  padding: 3%;
}
.order-img{
  width: 30%;
  height: 100%;
  float: left;
}
.order-img>img{
  width:100%;
  height: 100%;
}
  .order-info{
    width: 70%;
    float: right;
    height: 100%;
    padding: 0 3%;
    position: relative;
  }
  .order-bot{
    position: absolute;
    bottom: 0;
    line-height: 1rem;
    width: 90%;
  }
  .order-price{
    color: #E84567;
    font-size: 0.4rem;
    font-weight:700;
  }
  .order-mount{
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
