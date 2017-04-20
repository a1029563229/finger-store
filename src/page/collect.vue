<template>
  <div class="myCollect">
    <header-top title="我的收藏"></header-top>
    <li class="item" v-for="(item,index) in collectData" v-show="collectData.length">
      <div class="img">
        <img :src="item.StoreLogo" >
      </div>
      <div class="desc">
        <h1 class="ellipsis"> {{item.StoreName}} </h1>
        <p class="desc-item">
          <span>月销量&nbsp; {{item.SellCount}} </span>
          <span class="item-distance">&lt;&nbsp;{{item.Distanct}} km</span>
        </p>
        <button class="btn" @click="toMap(item.StoreName ,item.lng, item.lat)">到这里</button>
      </div>
    </li>
    <span class="noTip" v-show="collectData.length">您还没有收藏呢</span>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import headerTop from '@/components/common/headerTop'
  import { appkey } from '../config/env'
  import { GetCollectSotres } from '../service/getData'
  export default{
    name: 'collect',
    data(){
      return {
        collectData: '',
        pageIndex: 1,
        pageSize: 10,
        lat: '',
        lng: '',
        loading: false,
      }
    },
    components:{
      headerTop
    },
    compouted: {
      ...mapState({
        token: state => state.home.token,
        userLocal: state => state.home.userLocal,
      })
    },
    created(){
      console.log('1aaa');
      this.getCollections();
      this.getlocalation();
      this.getCollections();
    },
    mounted() {
    },
    methods: {
    // 获取用户地理位置
    async getlocalation() {
      console.log('aaa');
      let options = {enableHighAccuracy:true, maximumAge:1000 }
      if(navigator.geolocation){
        await navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError,options);  //浏览器支持geolocation\
      }else{
        alert('您的浏览器不支持地理位置定位');  //浏览器不支持geolocation
      }
    },
    onSuccess(position){
      let latData = position.coords.latitude ? position.coords.latitude : '';
      let lngData = position.coords.longitude ? position.coords.longitude : '';
      this.lng = lngData;   //经度
      this.lat = latData;   //纬度
      let userLocal = {lat: latData, lng: lngData};
      this.loading = true;
      this.getCollections();
      this.$store.dispatch('recordUserLocal', userLocal);
      return // 根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
       
    },
    onError(error){
      this.loading = true;
      this.getCollections();
      return
    },
    async getCollections() {
      let params = {
        appkey: this.appkey,
        token: this.token,
        lat: this.lat,
        lng: this.lng,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      console.info(params);
      let collects = await GetCollectSotres(params);
      this.collectData = collects.Data;
      console.log('collectData:',this.collectData);
    },
    // 跳转到地图
    toMap(name, lng, lat) {
      let storeLocal = {
        storelat: lat,
        storelng: lng,
        storename: name,
        userlat: this.lat,
        userlng: this.lng
      };
      this.$store.dispatch('recordStoreLocal', storeLocal);
      this.$router.push('/map');
    },

    // 获取用户地理位置
    getlocalations() {
      var options = {
        enableHighAccuracy: true,
        maximumAge: 1000
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, options);  //浏览器支持geolocation
      } else {
        alert('您的浏览器不支持地理位置定位');  //浏览器不支持geolocation
      }
    },
    onSuccess(position){
      this.$store.state.home.storeLocal.userlat = position.coords.longitude
      this.$store.state.home.storeLocal.userlng = position.coords.latitude

      console.log(position)
      let obj = {
        token: token,
        appkey: appkey,
        lat: position.coords.longitude,
        lng: position.coords.latitude,
        pageIndex: 1,
        pageSize: 10
      }
      console.log(obj)
      this.$http.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      this.$http.post(GetCollectSotres, this.$qs.stringify(obj))
        .then( res =>{
            if( res.data.ResultCode === 1000 ){
                this.collectData = res.data.Data

            }else {
                alert(res.data.Message)
            }
        })
    },
    onError(error){
        console.log(error)
      switch (error.code) {
         case 1:
             alert("位置服务被拒绝");
             this.$router.push('/home')
             break;
         case 2:
             alert("暂时获取不到位置信息");
             this.$router.push('/home')
             break;
         case 3:
             alert("获取信息超时");
             this.$router.push('/home')
             break;
         case 4:
             alert("未知错误");
              this.$router.push('/home')
             break;
      }
    },
    toMap(el){
      let lng = el.getAttribute('data-lng')
      let lat = el.getAttribute('data-lat')
      let storename = el.getAttribute('data-storename')
      this.$store.state.home.storeLocal.storelng = lng
      this.$store.state.home.storeLocal.storelat = lat
      this.$store.state.home.storeLocal.storename = storename
      this.$router.push('/map')
    }
  },
    created(){

    }
  }

</script>


<style scoped>
  .noTip{
    margin-top: 23%;
    position: absolute;
    display: inline-block;
    text-align: center;
    width: 100%;
    font-size: 0.45rem;
    color: #c1c1c1;
  }
  .btn{
    line-height: 0.8rem;
    width: 43%;
    border: 1px solid;
    background: none;
    margin-top: 2%;
    color: #E73A5F;
  }
  .item {
    width: 100%;
    height: 3rem;
    padding: 0.3rem;
    border-bottom: 1px solid #eee;
    margin-top: 1.28rem;
  }

  .img {
    float: left;
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 0.5rem;
  }

  .desc {
    float: left;
    width: 68%;
  }

  .desc h1 {
    font-size: 0.4rem;
    line-height: 1rem;
  }

  .desc-item {
    color: #999;
  }
  .desc-item span {
    font-size: 0.35rem;
  }

  .item-distance {
    float: right;
  }

  .btn-map {
    float: right;
    margin-top: 0.25rem;
    display: block;
    width: 2.2rem;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    color: #E52951;
    border: 1px solid #E52951;
    border-radius: 0.06rem;
  }
</style>
