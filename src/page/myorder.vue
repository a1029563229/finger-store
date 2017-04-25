<template>
	<div class="myorder">
		<header-top title="我的订单"></header-top>
		<ul class="order-tab">
			<li class="tab-item" :class="{active: index === itemNum }" v-for="(item, index) in tabList" @click="chooseItem(index)">
				{{ item }}
			</li>
		</ul>
		<!-- header -->
		<!-- <commodity-item class="myorder-list"></commodity-item> -->
		<ul class="myorder-list">
			<li class="list-wrap" v-for="(item,index) in orderList">
				<header class="list-title">
					<div class="list-title-name">
						<i class="list-title-logo list-title-icon"></i>
		        <span>订单状态</span>
		        <i class="list-title-arrow list-title-icon"></i>
					</div>
	        <span class="title-tip" v-show="item.OrderStatus == 1">待付款</span>
	        <span class="title-tip" v-show="item.OrderStatus == 2">待发货 </span>
	        <span class="title-tip" v-show="item.OrderStatus == 3">已发货 </span>
	        <span class="title-tip" v-show="item.OrderStatus == 4">已完成 </span>
	        <span class="title-tip" v-show="item.OrderStatus == 5">退款 </span>
				</header>
				<ol class="lists">
					<dd class="lists-item">
						<aside class="lists-item-img">
							<img :src="item.productImage">
						</aside>
						<section class="lists-item-desc">
							<h1 class="lists-item-desc-title">
								未发货哇哦
							</h1>
							<p class="lists-item-desc-desc">
								未发货哇哦IE很烦人我IE然后我IE然后问我偶尔回我内容和我我
							</p>
							<p class="lists-item-desc-num">
								<span class="lists-item-desc-price">{{ 1245 | currency }}</span>
								<span>X1231223</span>
							</p>
						</section>
					</dd>
					<dd class="lists-item">
						<aside class="lists-item-img">
							<img :src="item.productImage">
						</aside>
						<section class="lists-item-desc">
							<h1 class="lists-item-desc-title">
								未发货哇哦
							</h1>
							<p class="lists-item-desc-desc">
								未发货哇哦IE很烦人我IE然后我IE然后问我偶尔回我内容和我我
							</p>
							<p class="lists-item-desc-num">
								<span class="lists-item-desc-price">{{ 1245 | currency }}</span>
								<span>X1231223</span>
							</p>
						</section>
					</dd>
				</ol>
				<section class="list-total">
					共{{ 2 }}件商品&nbsp;合计:{{ 1555.041 | currency }}
				</section>
				<section class="list-func">
					<button class="list-btn-default">申请退款</button>
				</section>
			</li>
		</ul>

		<ul class="ct">
			<li class="list-wrap" v-for="(item,index) in orderList">
	      <div class="toDetai" :data-orderNo="item.orderNo" @click="toDetail($event.target)"></div>
	      <div class="list-title">
	        <i class="title-icon"></i>
	        <span class="title-text">订单状态</span>
	        <i class="arrow-right"></i>
	        <span class="title-tip" v-show="item.OrderStatus == 1">待付款</span>
	        <span class="title-tip" v-show="item.OrderStatus == 2">待发货 </span>
	        <span class="title-tip" v-show="item.OrderStatus == 3">已发货 </span>
	        <span class="title-tip" v-show="item.OrderStatus == 4">已完成 </span>
	        <span class="title-tip" v-show="item.OrderStatus == 5">退款 </span>
	      </div>
				<div class="list-img">
					<img :src="item.productImage_300_300" >
				</div>
				<div class="list-desc">
					<h1>
						{{item.product}}
					</h1>
					<p>
						{{item.consignee}}
					</p>
					<h2>
						<span class="list-price">¥{{item.productPrice}}</span>
						<i>X{{item.quantity}}</i>
					</h2>
				</div>
	      <div class="list-footer">
	        <div class="listFootBtn" v-show="item.OrderStatus == 1">
	          <button class="btn btn1" @click="deletOrder(item.orderNo)">取消订单</button>
	          <button class="btn btn2" @click="forPay(item.payurl)">确认付款</button>
	        </div>
	        <div class="listFootBtn" v-show="(item.OrderStatus == 2) || (item.OrderStatus == 3) || (item.OrderStatus == 4)">
	          <button class="btn btn1" :data-orderNo="item.orderNo_sub"  :data-phone="item.phoneNumber" @click="applyRefund($event.target)">申请退款</button>
	          <button class="btn btn2"  @click="viewStatus(item.orderStatusUrl)">查看物流</button>
	        </div>
	        <div class="listFootBtn" v-show="item.OrderStatus == 5">
	          <button class="btn btn1" @click="applyRefund(item.orderNo_sub, item.phoneNumber)">申请退款</button>
	          <button class="btn btn2" @click="viewStatus(item.orderStatusUrl)">查看物流</button>
	        </div>
	      </div>
			</li>
	    <span class="list-amount" v-show="orderList.length">共{{orderList.length}}件商品 合计: ¥ {{totalPrice}}</span>
		</ul>
		<!-- footer -->
		<navigation></navigation>
    <pay-model v-show="showPay"></pay-model>
	</div>
</template>
<script>
import headerTop from '@/components/common/headerTop'
import payModel from '@/components/common/payModel'
import commodityItem from '@/components/order/commodityItem'
import navigation from '@/components/common/navigation'
import { mapState } from 'vuex'
import { appkey } from '../config/env'
import { GainZZDOrderList } from '../service/getData'

export default {
	data() {
		return {
      showPay: false,
      tabList: ['全部', '待付款', '待发货', '待收货', '已完成', '退款'],
			itemNum: 0,
			orderList: [],
		}
	},
	components: {
		headerTop,
		commodityItem,
		navigation,
    payModel
	},
	created() {
		this.tokenInit();
	},
	mounted() {
		this.resetIdx();
	},
	computed: {
		...mapState({
			token: state => state.home.token,
		}),
		totalPrice() {
      /*let price = 0;
        this.orderList.forEach( (item,idx) =>{
          price += (item.productPrice-0)
        })
      for (let item of this.orderList) {
        price += (item.productPrice-0)
      }*/
      return 12
    }
	},
	filters: {
		currency(value) {
			if (!value) return ''
			return '￥' + parseFloat(value).toFixed(2);
		}
	},
	methods: {
		tokenInit() {                      // 获取token
      if (!this.token) {
        console.log('recordToken-USERTOKEN', this.token);
        this.$store.dispatch('recordToken',this.readCookie('USERTOKEN'));
      }
      console.log('recordToken-USERTOKEN', this.token);
    },
    readCookie(name) {                // 获取cookie
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return '';
    },
		resetIdx(){
      let isfromMyorder = this.$store.state.list.isfromMyorder
      if( isfromMyorder ){
          this.itemNum = this.$store.state.list.selectIdx
          this.$store.state.list.isfromMyorder = false
      }
    },
		chooseItem(index) {

      this.$store.dispatch('switchTab',index)
      this.sendRequest(index);
			this.itemNum = index;
		},
		async sendRequest( orderStatus ) {
		  let params = {
		      token: this.token,
		      appkey: appkey,
		      pageindex: 1,
		      pagesize: 10,
		      orderStatus: orderStatus
		    }
		  let res = await GainZZDOrderList(params);
		  this.orderList = res.Data;
		  console.log(this.orderList);
		},
	}
}
</script>
<style scoped>

.myorder {
	padding: 1.28rem 0 1.2rem;
	background-color: #F5F5F5;
}

.myorder-list {
	margin-top: 0.2rem;
}

/* tab栏 */
.order-tab {
	background-color: #FFF;
	width: 100%;
	height: 1.08rem;
	line-height: 1.08rem;
	justify-content: space-around;
	align-items: center;
	color: #222;
	text-align: center;
	border-bottom: 1px solid #EEE;
}
.tab-item {
	float: left;
	height: 100%;
  width: 16.666%;

}
.tab-item.active {
	color: #E52A52;
	border-bottom: 1px solid #E52A52;
}

/* 列表 */

.list-wrap {
	margin-top: 0.2rem;
	width: 100%;
	border-bottom: 1px solid #EEE;
  position: relative;
}

/* 订单标题 */
.list-title {
  display: flex;
	justify-content: space-between;
	align-items: center;
  background-color: #FFF;
  width: 100%;
  height: 1rem;
  padding: 0 3%;
  font-size: 0.35rem;
}
.list-title-name {
	display: flex;
	align-items: center;
}
.list-title-icon {
  display: block;
  width: 0.7rem;
  height: 1rem;
}
.list-title-logo {
  background: url('../assets/icon/store_icon_mini.png') no-repeat center;
  background-size: 0.5rem;
  margin-right: 0.1rem;
}
.list-title-arrow {
  background: url('../assets/icon/arrow-right.png') no-repeat center;
  background-size: 0.4rem;
  opacity: 0.6;
}

/* 商品列表 */
.lists-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	background-color: #F4F4F4;
	height: 2.8rem;
	padding: 0 3%;
	border-bottom: 1px solid #E8E8E8;
}

.lists dd:last-child {
	border-bottom: none;
}

.lists-item-img {
	position: relative;
	width: 24%;
	height: 0;
	padding-bottom: 24%;
	/* border: 1px solid red; */
	/* background-color: #FFF; */
}
.lists-item-img img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
}
.lists-item-desc {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 73%;
	height: 80%;
	/* border: 1px solid brown; */
}
.lists-item-desc-title {
	flex: 2;
	overflow: hidden;
	font-size: 0.32rem;
}
.lists-item-desc-desc {
	flex: 2;
	font-size: 0.32rem;
	color: #999;
	overflow: hidden;
}
.lists-item-desc-num {
	display: flex;
	justify-content: space-between;
	flex: 1;
	font-size: 0.32rem;
}
.lists-item-desc-price {
	color: #E52951;
}

/* 商品价格统计 */
.list-total {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 3%;
	width: 100%;
	height: 0.8rem;
	background-color: #FFF;
	border-bottom: 1px solid #EEE;
}

.list-func {
	width: 100%;
	height: 1.2rem;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	background-color: #FFF;
	padding: 0 3%;
}
.list-btn-default {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1.8rem;
	height: 0.7rem;
	font-size: 0.32rem;
	border: 1px solid #DDD;
	border-radius: 0.06rem;
	background-color: #FFF;
}


	/* 商品列表 */

/* 订单状态 */
.toDetai{
  position: absolute;
  width: 100%;
  height: 2.7rem;
  top: 1rem;
}
.ct{
  position: relative;
}
.list-amount{
  position: absolute;
  right: 3%;
  bottom: 1rem;
}

.list-img {
	flex: 1;
	padding: 0.3rem;
  height: 2.72rem;
  margin-top: 1rem;
}
.list-desc {
	display: flex;
	flex-direction: column;
	flex: 3;
	padding: 0.25rem 0;
	height: 2.72rem;
	justify-content: space-around;
	overflow: hidden;
  margin-top: 1rem;
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
.list-footer{
  height: 1.5rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  background: #fff;
}
  .list-footer{
    height: 1.5rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: #fff;
    padding-right: 3%;
  }
  .list-footer>span{
    text-align: right;
    width: 100%;
    display: inherit;
  }
  .listFootBtn{
    line-height: 1rem;
    text-align: right;
    margin-top: 0.5rem;
  }
  .btn{
    line-height: 0.7rem;
    width: 20%;
    background: none;
    font-size: 0.35rem;
    border-radius: 5px;
    color: #DEDEDE;
  }
  .btn1{
    border: 1px solid #DEDEDE;
    margin-right: 3%;
  }
  .btn2{
    color: #E8496B;
    border: 1px solid #E8496B;
  }
  .list-header{
    position: absolute;
    width: 100%;
    background: #fff;
    display: flex;
    line-height: 1rem;
    top: 0;
  }
  .list-header>h4{
    position: absolute;
    right: 3%;
  }

</style>
