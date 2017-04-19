<template>
  <div class="myCollect">
    <header-top title="我的收藏"></header-top>
    <li class="item">
      <div class="img">
        <img :src="collectData.StoreLogo" >
      </div>
      <div class="desc">
        <h1 class="ellipsis"> {{collectData.StoreName}} </h1>
        <p class="desc-item">
          <span>月销量&nbsp; {{collectData.SellCount}} </span>
          <span class="item-distance">&lt;&nbsp;{{collectData.Distanct}} km</span>
        </p>
        <button class="btn" @click="toMap()">到这里</button>
      </div>
    </li>
  </div>
</template>

<script>
  import headerTop from '@/components/common/headerTop'
  import {appkey,token,GetCollectSotres} from '../config/env'
  export default{
    name: 'collect',
    data(){
      return {
        collectData: ''
      }
    },
    components:{
      headerTop
    },
    mounted(){
      this.getlocalation()
    },
    methods: {
      // 获取用户地理位置
      getlocalation() {
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
        this.$store.state.home.storeLocal.lat = position.coords.longitude
        this.$store.state.home.storeLocal.lng = position.coords.latitude

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
                  this.$store.state.home.storeLocal.storename = res.data.Data.StoreName
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
      toMap(){
          this.$router.push('/map')
      }
    },
    created(){
        console.log(777777)
    }
  }

</script>


<style scoped>
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
