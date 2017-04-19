<template>
	<ul class="ct">
		<li class="list-wrap" v-for="(item,index) in listData">
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
          <button class="btn btn1" :data-orderNo="item.orderNo" @click="deletOrder($event.target)">取消订单</button>
          <button class="btn btn2" :data-payUrl="item.payurl" @click="forPay($event.target)">确认付款</button>
        </div>
        <div class="listFootBtn" v-show="(item.OrderStatus == 2) || (item.OrderStatus == 3) || (item.OrderStatus == 4)">
          <button class="btn btn1" :data-orderNo="item.orderNo"  :data-phone="item.phoneNumber" @click="refund($event.target)">申请退款</button>
          <button class="btn btn2" :data-orderStatusUrl="item.orderStatusUrl" @click="viewStatus($event.target)">查看物流</button>
        </div>
        <div class="listFootBtn" v-show="item.OrderStatus == 5">
          <button class="btn btn1" :data-orderNo="item.orderNo" :data-phone="item.phoneNumber" @click="refund($event.target)">申请退款</button>
          <button class="btn btn2" :data-orderStatusUrl="item.orderStatusUrl" @click="viewStatus($event.target)">查看物流</button>
        </div>
      </div>
		</li>
    <span class="list-amount" v-show="listLength > 0">共{{listLength}}件商品 合计: ¥ {{totalPrice}}</span>
	</ul>
</template>
<script>
  var filters ={
      tobePay(lists){  //待支付
          return lists.filter( (item) =>{
              return item.OrderStatus == 1
          })
      },
      deliver(lists){  //代发货
          return lists.filter( (item) =>{
            return item.OrderStatus == 2
          })
      },
      delivered(lists){  //已发货
         return lists.filter( (item) =>{
            return item.OrderStatus == 3
         })
      },
      done(lists){ //已完成
        return lists.filter( (item) =>{
          return item.OrderStatus == 4
        })
      },
      refund(lists){ //退款
        return lists.filter( (item) =>{
          return item.OrderStatus == 5
        })
      }
  }


  import { appkey, token, GainZZDOrderList,GainBindBankById,ZZDDeleteOrderByNo,GainZZDOrderDetail ,ZZDApplyDrawback} from '../../config/env'
	export default {
	    data(){
	        return{

          }
      },
      computed:{
        listData(){
            return this.$store.state.list.listData
        },
        listLength(){
            return this.listData.length
        },
        totalPrice(){
            let price = 0;
            this.listData.forEach( (item,idx) =>{
              price += (item.productPrice-0)
            })
          return price
        }


      },
    mounted(){

    },
    methods:{
      getOrder(){
        let obj = {
          appkey: appkey,
          token: token,
          pageindex: 1,
          pagesize: 10,
          orderStatus: 0
        }
        console.log(this.$store.state.list.isfromMyorder)
        if( this.$store.state.list.isfromMyorder ){
            return
        }
        this.$http.post(GainZZDOrderList, this.$qs.stringify(obj))
          .then( res =>{
          console.log(res.data.Data)
        if( res.data.ResultCode === 1000 ){
          this.$store.state.list.listData = res.data.Data
        }
      })
      },
      forPay(el){
          var payUrl = el.getAttribute('data-payurl')
           location.href = payUrl
      },
      viewStatus(el){
          let statusUrl = el.getAttribute('data-orderStatusUrl')
          location.href = statusUrl
      },
      deletOrder(el){
        let orderNo = el.getAttribute('data-orderNo')
        let obj = {
          appkey: appkey,
          token: token,
          orderno: orderNo
        }
        this.$http.post(ZZDDeleteOrderByNo, this.$qs.stringify(obj))
          .then( res =>{
              if( res.data.ResultCode === 1000 ){
                location.reload()
              }else {
                  alert(res.data.Message)
              }
          })
      },
      refund(el){
        let orderNo = el.getAttribute('data-orderNo')
        let mobile = el.getAttribute('data-phone')-0
        let obj = {
          appkey:appkey,
          token:token,
          orderNo: orderNo,
          mobile: mobile
        }
        console.log(obj)
        this.$http.post(ZZDApplyDrawback, this.$qs.stringify(obj))
          .then( res =>{
            if( res.data.ResultCode === 1000){
              alert(res.data.Message)
            }else {
              alert(res.data.Message)
            }
          })
      },
      toDetail(el){
        let orderNo = el.getAttribute('data-orderNo')
        this.$store.state.list.orderno = orderNo
        this.$router.push('/orderdetail')
        console.log(orderNo)
      }

    },
    created(){
      this.getOrder()
    }


	}
</script>
<style scoped>
  .toDetai{
    border: 1px solid;
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

  .list-title {
    background-color: #FFF;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    padding: 0 4%;
    font-size: 0.35rem;
    position: absolute;
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
	/* 商品列表 */

.list-wrap {
	display: flex;
	width: 100%;
	height: 5.5rem;
	align-items: center;
	justify-content: space-around;
	align-items: stretch;
	/*padding-right: 4%;*/
	border-bottom: 1px solid #EEE;
  position: relative;
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
