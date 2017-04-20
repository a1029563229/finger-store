<template>
	<div class="myorder">
		<header-top title="我的订单"></header-top>
		<ul class="order-tab">
			<li class="tab-item" :class="{active: index === itemNum }" v-for="(item, index) in tabList" @click="chooseItem(index)">
				{{ item }}
			</li>
		</ul>
		<commodity-item class="myorder-list"></commodity-item>
		<navigation></navigation>
    <pay-model v-show="showPay"></pay-model>
	</div>
</template>
<script>
import headerTop from '@/components/common/headerTop'
import payModel from '@/components/common/payModel'
import commodityItem from '@/components/order/commodityItem'
import navigation from '@/components/common/navigation'

export default {
	data() {
		return {
      showPay: false,
      tabList: ['全部', '待付款', '待发货', '待收货', '已完成', '退款'],
			itemNum: 0,
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
	methods: {
		resetIdx(){
      let isfromMyorder = this.$store.state.list.isfromMyorder
      if( isfromMyorder ){
          this.itemNum = this.$store.state.list.selectIdx
          this.$store.state.list.isfromMyorder = false
      }
    },
		chooseItem(index) {
      this.$store.dispatch('switchTab',index)
			this.itemNum = index;
		},
		tokenInit() {  // 获取token
		 if (this.token) {
		 	console.warn('this.token:',this.token);
		 } else {
			this.$store.dispatch('recordToken',this.readCookie('USERTOKEN'));
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
		  return null;
		},
	}
}
</script>
<style scoped>

.myorder {
	padding-top: 1.28rem;
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

</style>
