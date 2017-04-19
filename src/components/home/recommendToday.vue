<template>
  <div>
    <!--1+2-->
    <div class="recommend-default recommend-three" v-if="showType==0">
      <div class="recommend-left" @click="toDetail(recomendData[0].link_url)">
        <div>
          <img :src="recomendData[0].img_url" >
        </div>
        <h1>{{recomendData[0].sell_title}}</h1>
        <p>{{recomendData[0].product_name}}</p>
        <h2>{{recomendData[0].sell_price}}</h2>
      </div>
      <div class="recommend-right" @click="toDetail(recomendData[1].link_url)">
        <div class="recommend-right-top">
          <div class="right-img">
            <img :src="recomendData[1].img_url">
          </div>
          <div class="right-desc">
            <h1>{{recomendData[1].sell_title}}</h1>
            <p>{{recomendData[1].product_name}}</p>
            <h2>{{recomendData[1].sell_price}}</h2>
          </div>
        </div>
        <div class="recommend-right-bottom" @click="toDetail(recomendData[2].link_url)">
          <div class="right-img">
            <img :src="recomendData[2].img_url">
          </div>
          <div class="right-desc">
            <h1>{{recomendData[2].sell_title}}</h1>
            <p>{{recomendData[2].product_name}}</p>
            <h2>{{recomendData[2].sell_price}}</h2>
          </div>
        </div>
      </div>
    </div>

    <!--1+1-->
    <div v-if="showType==1">
      <div class="recommend-one-one"  v-for="item in recomendData" @click="toDetail(item.link_url)">
        <img :src="item.img_url" >
        <div class="recommend-one-right">
          <h1>{{item.sell_title}}</h1>
          <p>{{item.product_name}}</p>
          <h2>{{item.sell_price}}</h2>
        </div>
      </div>
    </div>


    <!--1+3-->
    <div class="recommend-default recommend-three" v-if="showType==4">
      <div class="recommend-left" @click="toDetail(recomendData[0].link_url)">
        <div>
          <img :src="recomendData[0].img_url" >
        </div>
        <h1>{{recomendData[0].sell_title}}</h1>
        <p>{{recomendData[0].product_name}}</p>
        <h2>{{recomendData[0].sell_price}}</h2>
      </div>
      <div class="recommend-right">
        <div class="recommend-right-top recommend-right-top-one-three" @click="toDetail(recomendData[1].link_url)">
          <div class="right-img right-img-one-three">
            <img :src="recomendData[1].img_url">
          </div>
          <div class="right-desc right-desc-one-three">
            <h1>{{recomendData[1].sell_title}}</h1>
            <p>{{recomendData[1].product_name}}</p>
            <h2>{{recomendData[1].sell_price}}</h2>
          </div>
        </div>
        <div class="recommend-right-top recommend-right-top-one-three" @click="toDetail(recomendData[2].link_url)">
          <div class="right-img right-img-one-three">
            <img :src="recomendData[2].img_url">
          </div>
          <div class="right-desc right-desc-one-three">
            <h1>{{recomendData[2].sell_title}}</h1>
            <p>{{recomendData[2].product_name}}</p>
            <h2>{{recomendData[2].sell_price}}</h2>
          </div>
        </div>
        <!--<div class="recommend-right-top recommend-right-top-one-three">-->
          <!--<div class="right-img right-img-one-three">-->
            <!--<img :src="recomendData[3].img_url">-->
          <!--</div>-->
          <!--<div class="right-desc right-desc-one-three">-->
            <!--<h1>{{recomendData[3].sell_title}}</h1>-->
            <!--<p>{{recomendData[3].product_name}}</p>-->
            <!--<h2>{{recomendData[3].sell_price}}</h2>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>


    <!--2+1-->
    <div class="recommend-default recommend-three" v-if="showType==2">
      <div class="recommend-right recommend-right-two-one">
        <div class="recommend-right-top" @click="toDetail(recomendData[0].link_url)">
          <div class="right-img">
            <img :src="recomendData[0].img_url">
          </div>
          <div class="right-desc">
            <h1>{{recomendData[0].sell_title}}</h1>
            <p>{{recomendData[0].product_name}}</p>
            <h2>{{recomendData[0].sell_price}}</h2>
          </div>
        </div>
        <div class="recommend-right-bottom" @click="toDetail(recomendData[1].link_url)">
          <div class="right-img">
            <img :src="recomendData[1].img_url">
          </div>
          <div class="right-desc">
            <h1>{{recomendData[1].sell_title}}</h1>
            <p>{{recomendData[1].product_name}}</p>
            <h2>{{recomendData[1].sell_price}}</h2>
          </div>
        </div>
      </div>
      <div class="recommend-left" @click="toDetail(recomendData[2].link_url)">
        <div>
          <img :src="recomendData[2].img_url" >
        </div>
        <h1>{{recomendData[2].sell_title}}</h1>
        <p>{{recomendData[2].product_name}}</p>
        <h2>{{recomendData[2].sell_price}}</h2>
      </div>
    </div>

    <!--3+1-->
    <div class="recommend-default recommend-three" v-if="showType==5">
      <div class="recommend-right recommend-right-three-one">
        <div class="recommend-right-top recommend-right-top-one-three" @click="toDetail(recomendData[0].link_url)">
          <div class="right-img right-img-one-three">
            <img :src="recomendData[0].img_url">
          </div>
          <div class="right-desc right-desc-one-three">
            <h1>{{recomendData[0].sell_title}}</h1>
            <p>{{recomendData[0].product_name}}</p>
            <h2>{{recomendData[0].sell_price}}</h2>
          </div>
        </div>
        <div class="recommend-right-top recommend-right-top-one-three" @click="toDetail(recomendData[1].link_url)">
          <div class="right-img right-img-one-three">
            <img :src="recomendData[1].img_url">
          </div>
          <div class="right-desc right-desc-one-three">
            <h1>{{recomendData[1].sell_title}}</h1>
            <p>{{recomendData[1].product_name}}</p>
            <h2>{{recomendData[1].sell_price}}</h2>
          </div>
        </div>
        <div class="recommend-right-top recommend-right-top-one-three" @click="toDetail(recomendData[2].link_url)">
          <div class="right-img right-img-one-three">
            <img :src="recomendData[2].img_url">
          </div>
          <div class="right-desc right-desc-one-three">
            <h1>{{recomendData[2].sell_title}}</h1>
            <p>{{recomendData[2].product_name}}</p>
            <h2>{{recomendData[2].sell_price}}</h2>
          </div>
        </div>
      </div>
      <!--<div class="recommend-left">-->
        <!--<div>-->
          <!--<img :src="recomendData[3].img_url" >-->
        <!--</div>-->
        <!--<h1>{{recomendData[3].sell_title}}</h1>-->
        <!--<p>{{recomendData[3].product_name}}</p>-->
        <!--<h2>{{recomendData[3].sell_price}}</h2>-->
      <!--</div>-->
    </div>


    <!--2+2-->
    <div v-if="showType==3">
      <div class="two-two clear" >
        <li class="twoItem" v-for="item in recomendData" @click="toDetail(item.link_url)">
          <div class="twoItemImg">
            <img :src="item.img_url" >
          </div>
          <h1>{{item.sell_title}}</h1>
          <p>{{item.product_name}}</p>
          <h2>{{item.sell_price}}</h2>
        </li>
      </div>
    </div>

    <!--3+3-->
    <div v-if="showType==6">
      <div class="three-three clear" >
        <li class="twoItem threeItem" v-for="item in recomendData" @click="toDetail(item.link_url)">
          <div class="twoItemImg">
            <img :src="item.img_url">
          </div>
          <h1>{{item.sell_title}}</h1>
          <p>{{item.product_name}}</p>
          <h2>{{item.sell_price}}</h2>
        </li>
      </div>
    </div>

  </div>
</template>
<script>
  import {GetZZDTodayRecommed,appkey,token} from '../../config/env'
  import { getTodayRecommend } from '../../service/getData'
  import { mapState } from 'vuex'
  export default {
    name: 'recommend-today',
    props: ['showType', 'recomendData'],
    data(){
      return {}
    },
    computed: {
      ...mapState({
        token: state => state.home.token,
      })
    },
    methods:{
      toDetail(url) {
        window.location.href = url + "&token=" + this.token;
      }
    },
    mounted(){

    },
  }
</script>
<style scoped>
  .recommend-default {
    width: 100%;
    height: 5.96rem;
    /*line-height: 0.4rem;*/
  }
  .recommend-three > div {
    float: left;
    height: 100%;
  }
  .recommend-three .recommend-left {
    display: block;
    width: 40%;
    border-right: 1px solid #EEE;
  }
  .recommend-three .recommend-right {
    width: 60%;
  }
  .recommend-three .recommend-right > div {
    width: 100%;
    height: 50%;
  }
  .recommend-three .recommend-right-top {
    border-bottom: 1px solid #EEE;
  }
  .recommend-three .recommend-left > div {
    width: 100%;
    height: 0;
    padding: 6% 7% 90%;
    /* border-bottom: 1px solid #ddd; */
    /* background-color: #DDD; */
  }
  .recommend-three h1,
  .recommend-three h2,
  .recommend-three p {
    line-height: 0.65rem;
    padding: 0 5%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .recommend-three h1 {
    font-size: 0.4rem;
    color: #222;
  }
  .recommend-three h2 {
    color: #E52951;
    font-size: 0.35rem;
  }
  .recommend-three p {
    color: #999;
    font-size: 0.35rem;
  }
  .recommend-right .right-img {
    float: left;
    width: 45%;
    height: 0;
    padding: 5% 0 40% 5%;
    /* background: #DDD; */
  }
  .recommend-right .right-desc {
    padding-top: 8%;
  }
  .recommend-one-one{
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2%;
    border-bottom: 2px solid #F8F8F8;
  }
  .recommend-one-one>img{
    height: 2.8rem;
    width:2.8rem;
  }
  .recommend-one-right{
    height:100%;
    padding:2%;
    width: 70%;
    position: relative;
  }
  .recommend-one-right>h1{
    font-size: 0.4rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .recommend-one-right>p{
    margin-top: 3%;
  }
  .recommend-one-right>h2{
    color: #E52951;
    position: absolute;
    bottom: 8%;
  }
  .recommend-right-top-one-three{
    height: 33.33% !important;
  }
  .right-img-one-three{
    height: 100% !important;
    display: flex !important;
    padding: 2% !important;
    width: 35% !important;
  }
  .right-desc-one-three{
    padding-top: 0 !important;
  }
  .recommend-right-two-one{
    border-right: 1px solid #F8F8F8;
  }
  .recommend-right-three-one{
    border-right: 1px solid #F8F8F8;
  }

  .two-two{
    background: #EEEEEE;
    padding: 2%;
  }
  .twoItem{
    width: 49%;
    padding: 2%;
    background: #fff;
    float: left;
    margin-bottom: 2%;
  }
  .twoItem:nth-of-type(2n+1){
    margin-right: 2%;
  }
  .twoItemImg{
    height: 4rem;
    text-align: center;
  }
  .twoItemImg>img{
    height:100%;
  }
  .twoItem>h1{
    font-size: 0.35rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
    line-height: 0.7rem;
  }
  .twoItem>p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.3rem;
  }
  .twoItem>h2{
    color: #E52951;
    font-size: 0.4rem;
    margin-top: 3%;
  }

  .three-three{
    padding: 2% 0;
    background: #eee;
  }
  .threeItem{
    width:33.333% !important;
    margin-right: 0 !important;
    margin-bottom: 0;
    border-bottom: 1px solid #EEEEEE;
  }

</style>
