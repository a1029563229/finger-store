<template>
  <div class="recommendToday clear">
    <!-- 1 + 1
    <template v-if="showType == 1">
      <h1></h1>
      <recommend-one :recommend-list="recommendData" :token="token"></recommend-one>
    </template>
    2 + 2
    <template v-if="showType == 2">
      <recommend-two :recommend-list="recommendData" :token="token"></recommend-two>
    </template>
    1 + 2
    <template v-if="showType == 3">
      <recommend-three :recommend-list="recommendData" :token="token"></recommend-three>
    </template>
    2 + 1
    <template v-if="showType == 4">
      <recommend-four :recommend-list="recommendData" :token="token"></recommend-four>
    </template>
    3 + 3
    <template v-if="showType == 5">
      <recommend-five :recommend-list="recommendData" :token="token"></recommend-five>
    </template>
    1 + 3
    <template v-if="showType == 6">
      <recommend-six :recommend-list="recommendData" :token="token"></recommend-six>
    </template>
    3 + 1
    <template v-if="showType == 7">
      <recommend-seven :recommend-list="recommendData" :token="token"></recommend-seven>
    </template> -->
    <section class="recommend" v-for="item in recommendRes" v-show="item.list_floor_product.length">
     <header class="recommend-title">
      <i class="recommend-title-icon"></i>
      <span>{{ item.floor_name }}</span>
     </header>
     <component :is="componentFloor[item.show_type]" :recommend-list="item.list_floor_product" :token="token"></component>
   </section>


  </div>
</template>
<script>
  import {GetZZDTodayRecommed,appkey,token} from '../../config/env'
  import { getTodayRecommend } from '../../service/getData'
  import { mapState } from 'vuex'
  import recommendOne from '@/components/recommend/recommendOne'
  import recommendTwo from '@/components/recommend/recommendTwo'
  import recommendThree from '@/components/recommend/recommendThree'
  import recommendFour from '@/components/recommend/recommendFour'
  import recommendFive from '@/components/recommend/recommendFive'
  import recommendSix from '@/components/recommend/recommendSix'
  import recommendSeven from '@/components/recommend/recommendSeven'
  export default {
    name: 'recommend-today',
    data(){
      return {
        recommendData: [],
        recommendRes: [],
        componentFloor: ['','recommend-one','recommend-two','recommend-three','recommend-four','recommend-five','recommend-six','recommend-seven'],
      }
    },
    components: {
      recommendOne,
      recommendTwo,
      recommendThree,
      recommendFour,
      recommendFive,
      recommendSix,
      recommendSeven
    },
    created() {
      this.tokenInit();
    },
    mounted(){
      this.recommendTodayInit();
    },
    computed: {
      ...mapState({
        token: state => state.home.token,
      })
    },
    methods:{
      // 获取token
      tokenInit() {
       if (!this.token) {
        this.$store.dispatch('recordToken',this.readCookie('USERTOKEN'));
       }
      },
      // 获取cookie
      readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return '';
      },
      toDetail(url) {
        window.location.href = url + "&token=" + this.token;
      },
      // 获取今日推荐
      async recommendTodayInit() {
        let todayData = await getTodayRecommend(this.token);
        this.recommendRes = todayData.Data;
        // this.recommendData = todayData.Data[1].list_floor_product;
        // console.log(JSON.stringify(this.recommendData.list_floor_product[]));

        // console.info('this.recommendData',this.recommendData);
        // console.info('this.recommendRes',this.recommendRes);
        // console.info('this.recommendData',JSON.stringify(this.recommendData));
      },
    },
   
    filters: {
      money(value) {
        let val = parseFloat(value).toFixed(2)
        return `￥${val}`
      }
    }
  }
</script>
<style scoped>

.recommendToday {
  background-color: #F4F4F4;
}

.recommend-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1rem;
  text-align: center;
  font-size: 0.4rem;
  color: #E52951;
  background: url('../../../static/img/home_section_title_bg@3x.png') no-repeat center;
  background-size: cover;
}


.recommend-title-icon {
  display: block;
  width: 0.6rem;
  height: 100%;
  margin-right: 2%;
  background: url('../../../static/img/home_icon_recommend@2x.png') no-repeat center;
  background-size: 0.6rem;
}



</style>
