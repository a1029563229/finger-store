<template>
	<ul>
		<li class="list-wrap" v-for="(item,index) in listData">
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
					<span class="list-price">{{item.productPrice}}</span>
					<i>X{{item.order_amount}}</i>
				</h2>
			</div>
		</li>
	</ul>
</template>
<script>
  import { appkey, token, GainOrderList } from '../../config/env'
	export default {
	    data(){
	        return{

          }
      },
      computed:{
          listData(){
              return this.$store.state.list.listData
          }
      },
    mounted(){
      this.getOrderList()
    },
    methods:{
      getOrderList(){
//          return new Promise( (resolve, reject) =>{
        let obj = {
          token: token,
          appkey: appkey,
          timestamp: Date.now(),
          pageindex: 1,
          pagesize: 10
        }

        this.$http.post(GainOrderList,obj)
          .then( res =>{
//                this.listData = res.data.Data
            console.log(this.listData)
            this.$store.state.list.listData = res.data.Data
//                resolve()
          })
//          })
      }
    },
      created(){

      }


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
