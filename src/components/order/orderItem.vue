<template>
	<div class="orderitem">
		<div class="list-title">
			<i class="title-icon"></i>
			<span class="title-text">东莞市申宇贸易有限公司</span>
			<i class="arrow-right"></i>
			<span class="title-tip">待付款</span>
		</div>
		<commodity-item></commodity-item>

		<!-- <commodity-item></commodity-item> -->
    <div v-show="orderLength>0">
      <div class="item-total">
        共{{orderLength}}件商品&nbsp;&nbsp;&nbsp;合计:￥{{totalPrice}}
      </div>
      <div class="item-btn">
        <button>催发货</button>
        <button>取消订单</button>
        <button class="item-btn-confirm">确认付款</button>
      </div>
    </div>
  </div>
</template>
<script>
import commodityItem from '@/components/order/commodityItem'
export default {
	name: 'order-item',
	data() {
		return {

		}
	},
	components: {
		commodityItem,
	},
  computed: {
	    orderLength(){
	        return this.$store.state.list.listData.length
      },
      totalPrice(){
        let allPrice = 0;
        if( this.orderLength == 0 ){
          return 0
        }
        this.$store.state.list.listData.forEach( (item,idx) =>{
          allPrice += parseInt(item.productPrice)
        })
        return allPrice
      }
  }
}
</script>
<style scoped>

.list-title {
	background-color: #FFF;
	width: 100%;
	height: 1rem;
	line-height: 1rem;
	padding: 0 4%;
	font-size: 0.35rem;
}
.list-title i {
	display: block;
	float: left;
	width: 0.7rem;
	height: 1rem;
}
.title-icon {
	background: url('../../assets/icon/store_icon_mini.png') no-repeat center;
	background-size: 0.5rem;
	margin-right: 0.1rem;
}
.arrow-right {
	background: url('../../assets/icon/arrow-right.png') no-repeat center;
	background-size: 0.4rem;
	opacity: 0.6;
}
.title-text {
	float: left;
}
.title-tip {
	float: right;
	font-size: 0.3rem;
}


/* 价格 统计 */
.item-total {
	padding-right: 5%;
	text-align: right;
	width: 100%;
	height: 0.8rem;
	line-height: 0.8rem;
	background-color: #fff;
	border-bottom: 1px solid #EEE;
}

.item-btn {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 1.2rem;
	background-color: #fff;
}
.item-btn button {
	display: block;
	height: 0.68rem;
	width: 1.88rem;
	background-color: #fff;
	border: 1px solid #eee;
	margin-right: 4%;
	border-radius: 0.06rem;
}

.item-btn .item-btn-confirm {
	color: #E52951;
	border-color: #E52951;
}

</style>
