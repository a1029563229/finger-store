<template>
  <div class="shopDes">
    <header-top title="店铺描述"></header-top>
      
    <section class="store-info">
      <div class="info-img">
        <img :src="storeInfo.logo">
      </div>
      <h1 class="info-name ellipsis">{{ storeInfo.name }}</h1>
      <ul class="info-btn">
        <li @click="toLike">
          <i class="btn-praise" :class="{active: isLike}"></i>
          点赞
        </li>
        <li @click="toCollect">
          <i class="btn-collect" :class="{active: isCollect}"></i>
          收藏
        </li>
      </ul>
    </section>

    <section class="shop-desc">
      <header class="shop-desc-header">
        <i class="shop-desc-icon"></i>
        <span>卖家介绍</span>
      </header>
      <section class="shop-desc-content">
        {{totalInfo.Desc}}
      </section>
    </section>
  
    <section class="shopinfo">
      <header class="shopinfo-header">
        <i class="shopinfo-header-icon"></i>
        <span>卖家信息</span>
      </header>
      <section class="shopinfo-content">
        <div class="shopinfo-default shopinfo-address">
          <span>商家地址：</span>
          <span class="ellipsis shopinfo-addr-text">{{ totalInfo.Address }}</span>
          <span class="shopinfo-address-btn" @click="showMap">到这里去</span>
        </div>
        <div class="shopinfo-default">
          <span>营业时间：</span>
          <span>{{ totalInfo.BusinessHours }}</span>
        </div>
        <div class="shopinfo-default">
          <span>客服电话：</span>
          <span>{{ totalInfo.Telephone }}</span>
        </div>
      </section>
    </section>

    <section class="shop-qrcode">
      <div class="shop-qrcode-wrap">
        <img :src="`${baseUrl}/api/1.0/YupinhuiServer/ZZDHandle/GetStoreQrCode?appkey=${appkey}&storeId=${storeInfo.id}` ">
      </div>
      <span class="shop-qrcode-text">店铺二维码手机扫一扫</span>
    </section>
  </div>
</template>

<script>
import headerTop from '@/components/common/headerTop'
import { mapState } from 'vuex'
import { BASE_URL,appkey } from '../config/env'
import { getStoreQrcode, GetStoreTotalInfo ,GetContractStoreInfo,addStoreSuperb,addStoreCollect} from '../service/getData'

export default{
  name: 'shopdes',
  data(){
    return {
      qrCode: '',
      totalInfo:'',
      qrCode: '',
      zanImg: 'static/img/common_like_press@2x.png',
      collectImg: 'static/img/common_collection_press@2x.png',
      mapFlag: false,
      qrcodeImg: '',
      isLike: false,
      isCollect: false,
      appkey: '',
      baseUrl: '',
    }
  },
  components: {
    headerTop,
  },
  computed: {
    ...mapState({
      storeInfo: state => state.home.storeInfo,
      userLocal: state => state.home.userLocal,
      token: state => state.home.token
    })
  },
  created() {
    this.tokenInit();   // 获取token
    this.appkey = appkey;
    this.baseUrl = BASE_URL;
  },
  mounted(){
    this.getStoreDetailInfo();
  },
  methods: {
    tokenInit() {
      if (!this.token) {
        let tokenCookie = this.readCookie('USERTOKEN');
        this.$store.dispatch('recordToken', tokenCookie);
      }
      if (JSON.stringify(this.storeInfo).length < 3) {
        let storeInfoTemp = JSON.parse(this.readCookie('storeInfo'));
        this.$store.dispatch('recordStoreInfo',storeInfoTemp);
        this.storeInfo = storeInfoTemp;
      } 
    },
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
    showMap(){
      let local = {
        storename: this.storeInfo.name,
        userlat: this.userLocal.lat,
        userlng: this.userLocal.lng,
        storelat: this.storeInfo.lat, 
        storelng: this.storeInfo.lng
      };
      this.$store.dispatch('recordStoreLocal', local);
      this.$router.push({path: "map"});
    },
    async toLike() {
      if (this.isLike) return;
      let obj = {
        appkey: appkey,
        token: this.token,
        storeId: this.storeInfo.id
      };
      let res = await addStoreSuperb(obj);
      if (res.ResultCode === 1000) {
        this.isLike = true;
      }
      console.log('toLike:',res);
    },
    async toCollect() {
      if (this.isCollect) return;
      let obj = {
        appkey: appkey,
        token: this.token
      };
      let res = await addStoreCollect(obj);
      if (res.ResultCode === 1000) {
        this.isCollect = true;
      }
      console.log('toCollect:',res);
    },
    async getStoreDetailInfo() {
      let params = {
        appkey: appkey,
        token: this.token,
        storeId: this.storeInfo.id
      }
      let res = await GetContractStoreInfo(params);
      console.log('GetContractStoreInfo-res',res);
      this.totalInfo = res.Data;
    }
  }

}


</script>
<style scoped>

.shopDes {
  padding-top: 1.28rem;
  background-color: #F4F4F4;
}

.shop-desc-header {
  margin-top: 0.25rem;
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #EEE;
  padding: 0 2%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.4rem;
  background-color: #FFF;
  color: #222;
}

.shop-desc-icon {
  display: block;
  width: 1rem;
  height: 100%;
  background: url('../assets/icon/shop_description_introduce@2x.png') no-repeat center;
  background-size: 0.6rem;
}



.shop-desc-content {
  width: 100%;
  height: 2.9rem;
  padding: 2% 4%;
  font-size: 0.36rem;
  line-height: 1.4;
  background-color: #FFF;
  overflow: hidden;
}

.shopinfo {
  background-color: #FFF;
  margin-top: 0.25rem;
}

.shopinfo-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 1.2rem;
  padding: 0 2%;
  border-bottom: 1px solid #EEE;
  font-size: 0.36rem;
}

.shopinfo-header-icon {
  display: block;
  width: 1rem;
  height: 100%;
  background: url('../assets/icon/shop_description_information@2x.png') no-repeat center;
  background-size: 0.6rem;
}

.shopinfo-default {
  padding: 0 3% 0 6%;
  display: flex;
  width: 100%;
  height: 1.2rem;
  align-items: center;
  border-bottom: 1px solid #EEE;
  font-size: 0.35rem;
}

.shopinfo-address {
  justify-content: space-between;
}

.shopinfo-addr-text {
  flex: 1;
  flex-shrink: 1;
}
.shopinfo-address-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.9rem;
  height: 0.7rem;
  color: #E52951;
  border: 1px solid #E52951;
  border-radius: 0.06rem;
}

.shop-qrcode {
  margin-top: 0.4rem;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shop-qrcode-wrap {
  position: relative;
  width: 40%;
  padding-bottom: 40%;
  background-color: #fff;
}
.shop-qrcode-wrap img {
  position: absolute;
  top: 0;
  left: 0;
  /* display: none; */
}
.shop-qrcode-text {
  margin-top: 0.2rem;
  font-size: 0.35rem;
}



  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }

  /* store info */

.store-info {
  width: 100%;
  height: 1.6rem;
  border-bottom: 1px solid #EEE;
  overflow: hidden;
  background-color: #FFF;
}

.info-img {
  float: left;
  position: relative;
  width: 1rem;
  height: 1rem;
  border-radius: 0.05rem;
  margin: 0.3rem 0.3rem 0.3rem 0.4rem;
}
.info-img img {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0.05rem;
  max-width: 100%;
}

.info-name {
  float: left;
  line-height: 1.6rem;
  font-size: 0.45rem;
  font-weight: 600;
  color: #222;
  max-width: 50%;
}

.info-btn {
  height: 100%;
  float: right;
  margin-right: 2%;
}

.info-btn li {
  float: left;
  width: 1.4rem;
  height: 100%;
  text-align: center;
  font-size: 0.35rem;
  padding: 0.15rem 0.3rem 0;
}
.info-btn li i {
  display: block;
  width: 0.8rem;
  height: 0.8rem;
  margin-bottom: 0.05rem;
  transition: background 0.3s;
}

.btn-praise  {
  background: url('../assets/icon/common_like_press@2x.png') center no-repeat;
  background-size: 0.7rem;
}
.btn-praise.active {
  animation: tipMove 0.3s;
}
.btn-collect  {
  background: url('../assets/icon/common_collection_press@2x.png') center no-repeat;
  background-size: 0.7rem;
}
.btn-collect.active  {
  animation: tipMove 0.3s;
}

@keyframes tipMove{
   0%   { background-size: 0.7rem }
   35%  { background-size: 1rem }
   70%  { background-size: 0.85rem  }
   100% { background-size: 0.7rem }
}
/* store info end */

</style>
