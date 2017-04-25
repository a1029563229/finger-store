<template>
  <div class="myCollect">
    <header-top title="我的收藏"></header-top>
    <ul class="nearby-list" v-show="collectData.length">
      <li v-for="(item,index) in collectData" class="nearby-item" :key="item.StoreID" @click.stop="toStore(item.StoreName,item.StoreID,item.StoreLogo, item.CoordsX, item.CoordsY)">
        <div class="nearby-img">
          <img :src="item.StoreLogo">
        </div>
        <div class="nearby-desc">
          <h1 class="ellipsis">{{ item.StoreName }}</h1>
          <p class="nearby-desc-item">
            <span>销量&nbsp;{{ item.SellCount }}</span>
            <span class="item-distance" v-show="collectKey.lat && collectKey.lng">{{ item.Distanct | distance }}</span>
            <span class="item-distance" v-show="!(collectKey.lat && collectKey.lng)">&nbsp;0&nbsp;km</span>
          </p>
          <button class="btn-map" @click.stop="toMap(item.StoreName, item.CoordsX, item.CoordsY)">到这里去</button>
        </div>
      </li>
    </ul>
    <div class="data-none" v-show="dataNone || !collectData.length">您还没有收藏呢</div>
    <infinite-scroll :scroller="scroller" :loading="loading" @load="loadmore" :loading-end="isLoadEnd"></infinite-scroll>
    <navigation></navigation>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import headerTop from '@/components/common/headerTop'
import infiniteScroll from '@/components/common/infiniteScroll'
import { appkey } from '../config/env'
import { GetCollectSotres } from '../service/getData'
import navigation from '@/components/common/navigation'
export default {
  name: 'collect',
  data(){
    return {
      collectData: '',
      loading: false,
      isLoadEnd: false,
      scroller: null,
      dataNone: false,
      collectKey: {
        appkey: appkey, 
        lat: '0',          // String 纬度  
        lng: '0',          // String 经度  
        pageIndex: 1,     // int  页码
        pageSize: 10,     // int  每页多少条数据
        token: ''
      },
    }
  },
  components:{
    headerTop,
    infiniteScroll,
    navigation
  },
  computed: {
    ...mapState({
      token: state => state.home.token,
      userLocal: state => state.home.userLocal,
    })
  },
  created(){
    this.tokenInit();
    this.getlocation();
  },
  mounted() {
    this.scroller = this.$el;
  },
  filters: {
    distance(value) {
      let val = parseFloat(value).toFixed(2)
      if (val <= 0.1) {
        return '< 100 m'
      }
      else {
        return `< ${val} km`
      }
    }
  },
  methods: {
    // 获取token
    tokenInit() {  // 获取token
     if (this.token) {
      console.warn('this.token:',this.token);
     } else {
      this.$store.dispatch('recordToken',this.readCookie('USERTOKEN'));
     }
     this.collectKey.token = this.token;
    },

    readCookie(name) {  // 获取cookie
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return '';
    },
    
    async getlocation() {                                                                   // 获取用户地理位置
      let options = {enableHighAccuracy:true, maximumAge:1000 }
      if(navigator.geolocation){
        await navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError,options);  //浏览器支持geolocation
      }else{
        alert('您的浏览器不支持地理位置定位');  //浏览器不支持geolocation
      }
    },
    onSuccess(position){
      let latData = position.coords.latitude ? position.coords.latitude : '';
      let lngData = position.coords.longitude ? position.coords.longitude : '';
      this.collectKey.lng = lngData;   //经度
      this.collectKey.lat = latData;   //纬度
      let userLocal = {lat: latData, lng: lngData};
      console.warn('this.collectKey', this.collectKey);
      this.loading = true;
      this.reloadCollectionList();
      this.$store.dispatch('recordUserLocal', userLocal);
      return // 根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
       
    },
    onError(error){
      this.loading = true;
      this.reloadCollectionList();
      return
    },
    async getCollections() {
      console.info(this.collectKey);
      let collects = await GetCollectSotres(this.collectKey);
      this.collectData = collects.Data;
      console.log('collectData:',this.collectData);
    },
    // 跳转到 店铺列表页
    toStore(name, id, img, lat, lng) {
      let params = {
        name: name,
        id: id,
        logo: img,
        lat: lat,
        lng: lng,
      };
      this.$store.dispatch('recordStoreInfo',params);
      this.$router.push({ path:'/shop' });
    }, 
    // 加载更多
    loadmore() {
      let self = this;
      this.loading = true;
      setTimeout(() => {
        this.collectKey.pageIndex++;
        self.getCollectionList();
      },500);
    },
    // 获取 附近商店列表
    async getCollectionList() {
      let data = await GetCollectSotres(this.collectKey);
      data.Data.forEach(item => {
        this.collectData.push(item);
      });
      if (data.PageIndex > data.TotalPage) this.isLoadEnd = true;
      this.loading = false;
    },
    // 跳转到地图
    toMap(name, lng, lat) {
      let storeLocal = {
        storelat: lat,
        storelng: lng,
        storename: name,
        userlat: this.collectKey.lat,
        userlng: this.collectKey.lng
      };
      this.$store.dispatch('recordStoreLocal', storeLocal);
      this.$router.push('/map');
    },
    // 重新加载 附近商店列表 
    async reloadCollectionList() {
      let res = await GetCollectSotres(this.collectKey);
      console.warn('collectData',res);
      this.loading = false;
      this.collectData = res.Data;
      if (res.PageIndex >= res.totalPage ) this.isLoadEnd = true;
      this.dataNone = this.collectData.length ? false : true;
    },
  }
}

</script>


<style scoped>
  
.myCollect {
  padding-top: 1.28rem;
}

.nearby-list {
  background-color: #FFF;
}
/* nearbylist */
.nearby-item {
  width: 100%;
  height: 3rem;
  padding: 0.3rem;
  border-bottom: 1px solid #eee;
}

.nearby-img {
  float: left;
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 0.5rem;
}

.nearby-desc {
  float: left;
  width: 68%;
}

.nearby-desc h1 {
  font-size: 0.4rem;
  line-height: 0.8rem;
}

.nearby-desc-item {
  color: #999;
}
.nearby-nearby-desc-item span {
  font-size: 0.35rem;
}

.item-distance {
  float: right;
}

.btn-map {
  position: relative;
  z-index: 10;
  margin-top: 0.2rem;
  display: block;
  width: 2.2rem;
  height: 0.7rem;
  line-height: 0.65rem;
  text-align: center;
  color: #E52951;
  background-color: #FFF;
  border: 1px solid #E52951;
  border-radius: 0.06rem;
}

/* 匹配不到数据 */
.data-none {
  width: 100%;
  height: 1.28rem;
  line-height: 1.2rem;
  text-align: center;
  font-size: 0.4rem;
  background-color: #FFF;
}






</style>
