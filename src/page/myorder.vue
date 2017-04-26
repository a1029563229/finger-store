<template>
	<div class="myorder">
		<header-top title="我的订单"></header-top>
		<ul class="order-tab">
			<li class="tab-item" :class="{active: index === itemNum }" v-for="(item, index) in tabList" @click="chooseItem(index)">
				{{ item }}
			</li>
		</ul>
		<!-- header -->
		<ul class="myorder-list">
			<li class="list-wrap" v-for="(item,index) in orderList" :orderNo="item.orderNo">
				<header class="list-title">
					<div class="list-title-name">
						<i class="list-title-logo list-title-icon"></i>
		        <span>{{ item.storeName }}</span>
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
								{{ item.product }}
							</h1>
							<p class="lists-item-desc-desc">
								{{item.productAttrs}}
							</p>
							<p class="lists-item-desc-num">
								<span class="lists-item-desc-price">{{ item.productPrice | currency }}</span>
								<span>X{{ item.order_amount }}</span>
							</p>
						</section>
					</dd>
				</ol>
				<section class="list-total">
					共 {{ item.order_amount  }} 件商品&nbsp;合计:{{ 1555.041 | currency }}
				</section>
				<section class="list-func">
					<template v-show="item.OrderStatus == 1">
						<button class="list-btn-default" @click="deletOrder(item.orderNo)">取消订单</button>
						<button class="list-btn-default list-btn-gray">确认付款</button>
					</template>
					<template v-show="item.OrderStatus == 2">
						<button class="list-btn-default list-btn-active" @click="applyRefund(item.orderNo_sub, item.phoneNumber)">申请退款</button>
					</template>
					<template v-show="item.OrderStatus == 3">
						<button class="list-btn-default"  @click="toTransport(item.orderStatusUrl)">查看物流</button>
					</template>
					<template v-show="item.OrderStatus == 4">
						<button class="list-btn-default"  @click="toTransport(item.orderStatusUrl)">查看物流</button>
					</template>
					<template v-show="item.OrderStatus == 5">
						
					</template>
					
				</section>
			</li>
		</ul>
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
			orderKey: {
				appkey: appkey,
				token: '',
				pageindex: 1,
				pagesize: 10,
				orderStatus: 0
			},
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
		toTransport(url) {
			window.location.href = url + "&token=" + this.token;
		}
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
	padding: 0 2%;
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
	margin-right: 2%;
}
.list-btn-active {
	color: #E52951;
	border-color: #E52951;
}
.list-btn-gray {
	color: #999;
	border-color: #999;
}

	/* 商品列表 */
</style>
