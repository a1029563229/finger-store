<template>
  <div id="shopDes">
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


    <div class="sellerPanel">
      <div class="sellerPanelHead">
        <img src="static/img/shop_description_introduce.png">
        <span>卖家介绍</span>
      </div>
      <div class="sellerCt">{{totalInfo.Desc}}</div>
    </div>
    <div class="sellerPanel sellerInfo">
      <div class="sellerPanelHead">
        <img src="static/img/shop_description_information.png">
        <span>卖家信息</span>
      </div>
      <li class="sellerinfoItem">
        <span>商家地址:</span>
        <span class="sellerinfoText">{{totalInfo.Address}}</span>
        <button class="goBtn" @click="showMap">到这里去</button>
      </li>
      <li class="sellerinfoItem">
        <span>营业时间:</span>
        <span class="sellerinfoText">9:00-21:00</span>
      </li>
      <li class="sellerinfoItem">
        <span>客服电话:</span>
        <span class="sellerinfoText">{{totalInfo.Telephone}}</span>
      </li>
    </div>
    <div class="qrCode">
      <img :src="`${baseUrl}/api/1.0/YupinhuiServer/ZZDHandle/GetStoreQrCode?appkey=${appkey}&storeId=${storeInfo.id}` "><br/>
      <span>店铺二维码手机扫一扫</span>
    </div>
  </div>
</template>

<script>
import headerTop from '@/components/common/headerTop'
import { mapState } from 'vuex'
import { BASE_URL,appkey } from '../config/env'
import { getStoreQrcode, GetStoreTotalInfo, GetStoreQrCode ,GetContractStoreInfo,addStoreSuperb,addStoreCollect} from '../service/getData'

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
    this.getshopInfo();
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
      let obj = {
        appkey: appkey,
        token: this.token,
        storeId: this.storeInfo.id
      };
      let res = await addStoreSuperb(obj);
      console.log('toLike:',res);
    },
    async toCollect() {
      let obj = {
        appkey: appkey,
        token: this.token
      };
      let res = await addStoreCollect(obj);
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
    }, 
    collect(el){
      let obj={
        appkey: appkey,
        token: token
      }
      this.$http.post(AddStoreSuperb,this.$qs.stringify(obj))
        .then( res =>{
          if( res.data.ResultCode == 1000 ){
              alert(res.data.Message)
          }else {
             alert(res.data.Message)
          }
        })
    },
    zan(el) {
      let obj={
        appkey: appkey,
        token: token
      }
      this.$http.post(AddStoreCollect,this.$qs.stringify(obj))
        .then( res =>{
          if( res.data.ResultCode == 1000 ){
              console.log(res)
            alert(res.data.Message)
          }else {
            alert(res.data.Message)
          }
        })
    }
  }

}


</script>
<style scoped>

  .mapHideIcon{
    position: fixed;
    top: 2%;
    border: 1px solid;
    background: rgba(0,0,0,0.7);
    padding: 5px 10px;
    z-index: 1000;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
  .mapHideIcon>i{
    color: #fff;
    font-weight: 700;
  }
  .mapView{
    width:100%;
    height:100%;
    left: 0;
    position: fixed !important;
    z-index:100 !important;
  }
  #shopDes{
    color: #222222;
    background: #eeeeee;
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 1.28rem;
  }
  .shopbar{
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    height: 1.4rem;
    margin-top: 1.29rem;
  }
  .shopbar>img{
    width: 33px;
    height: 33px;
    margin: 0 3%;
  }
  .shopbar>span{
    font-weight: 700;
    font-size: 15px;
    flex-grow: 1;
  }
  .shopBarRight{
    display: flex;
    position: relative;
    right: 4%;
  }
  .shopBarRightItem{
    flex-direction: column;
    display: flex;
    font-size: 12px;
  }
  .shopBarRightItem:nth-of-type(1){
    padding-right: 5px;
  }
  .shopBarRightItem>img{
    width:25px;
  }
  .sellerPanel{
    width: 100%;
    background: #fff;
    margin-top: 3%;
  }
  .sellerInfo{
    padding-bottom: 5px;
  }
  .sellerPanelHead{
    padding: 3%;
    font-weight: 700;
    font-size: 15px;
  }
  .sellerPanelHead>img{
    width: 20px;
    vertical-align: bottom;
  }
  .sellerCt{
    min-height: 71px;
    padding: 3% 0 4% 6%;
    font-weight: 700;
    font-size: 15px;
    text-indent: 10px;
  }
  .sellerinfoItem{
    list-style: none;
    padding: 3% 3% 3% 7%;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
  .sellerinfoItem:nth-of-type(1){
    padding-right: 26%;
  }
  .sellerinfoText{
    margin: 0 2%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 1;
  }
  .goBtn{
    border: 1px solid #E52E55;
    background: none;
    color: #E52E55;
    padding: 1% 3%;
    position: absolute;
    right: 3%;
  }
  .qrCode{
    width: 40%;
    text-align: center;
    margin: auto;
    margin-top: 5%;
  }
  .qrCode>span{
    font-size: 12px;
    font-weight: 700;
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
  background: url('../assets/icon/common_like_nor@2x.png') center no-repeat;
  background-size: 0.7rem;
}
.btn-praise.active {
  background-image: url('../assets/icon/common_like_press@2x.png');
  animation: tipMove 0.3s;
}
.btn-collect  {
  background: url('../assets/icon/common_collection_nor@2x.png') center no-repeat;
  background-size: 0.7rem;
}
.btn-collect.active  {
  background-image: url('../assets/icon/common_collection_press@2x.png');
  animation: tipMove 0.3s;
}

@keyframes tipMove{
   0%   { background-size: 0.7rem }
   35%  { background-size: 1rem }
   70%  { background-size: 0.8rem  }
   100% { background-size: 0.7rem }
}
/* store info end */

</style>
