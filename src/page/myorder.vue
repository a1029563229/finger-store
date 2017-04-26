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
			<li class="list-wrap" v-for="(item,index) in orderList">
				<header class="list-title">
					<div class="list-title-name">
						<i class="list-title-logo list-title-icon"></i>
		        <span>{{ item.StoreName }}</span>
		        <i class="list-title-arrow list-title-icon"></i>
					</div>
	        <span class="title-tip" v-show="item.OrderStatus == 1">待付款</span>
	        <span class="title-tip" v-show="item.OrderStatus == 2">待发货 </span>
	        <span class="title-tip" v-show="item.OrderStatus == 3">已发货 </span>
	        <span class="title-tip" v-show="item.OrderStatus == 4">已完成 </span>
	        <span class="title-tip" v-show="item.OrderStatus == 5">退款 </span>
				</header>
				<ol class="lists">
					<dd class="lists-item" @click="toDetail(item.orderNo)">
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
						</section>
					</dd>
				</ol>
				<section class="list-total">
					共 {{ item.quantity  }} 件商品&nbsp;&nbsp;合计:{{ item.order_amount | currency }}
				</section>
				<section class="list-func">
					<template v-if="item.OrderStatus == 1">
						<button class="list-btn-default" :class="{'list-btn-gray': true}" @click="deletOrder(item.orderNo_sub)">取消订单</button>
						<button class="list-btn-default list-btn-active">确认付款</button>
					</template>
					<template v-if="item.OrderStatus == 2">
						<button class="list-btn-default " @click="applyRefund(item.orderNo_sub, item.phoneNumber)">申请退款</button>
						<button class="list-btn-default list-btn-active" :class="{'list-btn-gray': true}" @click="applyTransport(item.orderNo_sub, item.phoneNumber)">催发货</button>
					</template>
					<template v-if="item.OrderStatus == 3">
						<button class="list-btn-default list-btn-gray" @click="applyRefund(item.orderNo_sub, item.phoneNumber)">申请退款</button>
						<button class="list-btn-default list-btn-active"  @click="viewTransport(item.orderStatusUrl)">查看物流</button>
					</template>
					<template v-if="item.OrderStatus == 4">
						<button class="list-btn-default list-btn-active"  @click="viewTransport(item.orderStatusUrl)">查看物流</button>
					</template>
				</section>
			</li>
		</ul>
		<section class="data-none" v-if="orderList.length">
			
		</section>
		<navigation></navigation>
		<infinite-scroll :scroller="scroller" :loading="loading" @load="loadmore" :loading-end="isLoadEnd"></infinite-scroll>
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
import { GainZZDOrderList, ZZDExpedite, ZZDDeleteOrderByNo, ZZDApplyDrawback } from '../service/getData'
// 加载更多
import infiniteScroll from '@/components/common/infiniteScroll'
export default {
	data() {
		return {
      showPay: false,
      tabList: ['全部', '待付款', '待发货', '待收货', '已完成', '退款'],
			itemNum: 0,
			scroller: null,
			isLoadEnd: false,
			orderList: [],
			loading: false,
			listKey: {
	      token: '',
	      appkey: '',
	      pageindex: 1,
	      pagesize: 10,
	      orderStatus: 0
		  }
		}
	},
	components: {
		headerTop,
		commodityItem,
		navigation,
    payModel,
    infiniteScroll
	},
	created() {
		this.tokenInit();
		this.itemNum = this.selectIdx;
		this.sendRequest(0);
	},
	mounted() {
		this.scroller = this.$el;
	},
	computed: {
		...mapState({
			token: state => state.home.token,
			selectIdx: state => state.list.selectIdx
		}),
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
    // 切换tab
		chooseItem(index) {
      this.sendRequest(index);
			this.itemNum = index;
		},
		// 获取订单数据
		async sendRequest( orderStatus ) {
			this.isLoadEnd = false;
		  this.loading = true;
			this.listKey.pageindex = 1;
			this.listKey.orderStatus = orderStatus;
			this.listKey.token = this.token;
			this.listKey.appkey = appkey;

		  let res = await GainZZDOrderList(this.listKey);
		  this.loading = false;
		  this.orderList = res.Data;
		  console.log(this.orderList);
		},
		async loadmore() {
			this.loading = true;
			this.listKey.pageindex++;
			this.listKey.orderStatus = this.itemNum;
			this.listKey.token = this.token;
			this.listKey.appkey = appkey;
		  let res = await GainZZDOrderList(this.listKey);
		  this.loading = false;
		  res.Data.forEach(item => {
		  	this.orderList.push(item);
		  })
		  if (res.TotalPage < res.PageIndex) this.isLoadEnd = true;
	  },
		// 查看物流
		viewTransport(url) {
			window.location.href = url + "&token=" + this.token;
		},
	 	async deletOrder(orderNo){
			let obj = {
			  appkey: appkey,
			  token: this.token,
			  orderno: orderNo
			}
			let res = await ZZDDeleteOrderByNo(obj);
		  if (res.ResultCode === 1000) {
		    window.location.reload()
		  } else {
		    alert(res.Message)
		  }
	  },

	  async applyRefund(orderNo, mobile){
      mobile -= 0;
      let data = {orderNo:orderNo, mobile: mobile, goodsPic:'|',city:0}
      let obj = {
        appkey:appkey,
        token: this.token,
        data:JSON.stringify(data)
      }
      console.log(obj)
      this.isRefund = true;
      let res = await ZZDApplyDrawback(obj);
      if (res.ResultCode === 1000) {
        // alert(res.Message)
      } else {
        // alert(res.Message)
      }
    },
    toDetail(orderNo){
      this.$store.dispatch('setOrderno', orderNo);
      this.$router.push('/orderdetail')
      console.log(orderNo)
    },
    async applyTransport(orderno) {
    	let params = {
    		appkey: appkey,
    		token: this.token,
    		suborderno: orderno
    	};
    	let res = await ZZDExpedite(params);
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
	height: 2.7rem;
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
	flex: 1;
	overflow: hidden;
	font-size: 0.32rem;
}
.lists-item-desc-desc {
	flex: 1;
	font-size: 0.32rem;
	color: #999;
	overflow: hidden;
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
