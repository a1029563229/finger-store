<template>
  <div id="shopDes">
    <transition   name="slide-fade">
      <baidu-map :center="{lng: 116.404, lat: 39.915}" :zoom="16" class="mapView" v-show="mapFlag">
        <bm-label content="" :position="position"  title="Hover me"/>
      </baidu-map>
    </transition >
    <header-top title="店铺描述"></header-top>
    <div class="mapHideIcon" v-show="mapFlag">
      <i @click="mapHide"><</i>
    </div>
      <div class="shopbar">
        <img src="">
        <span class="shop-name">{{totalInfo.Name}}</span>
        <div class="shopBarRight">
          <div class="shopBarRightItem">
            <img src="static/img/common_like_press@2x.png" @click="collect($event.target)">
            <span>点赞</span>
          </div>
          <div class="shopBarRightItem">
            <img src="static/img/common_collection_press@2x.png" @click="zan($event.target)">
            <span>收藏</span>
          </div>
        </div>
      </div>
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
        <span>店铺名称:</span>
        <span class="sellerinfoText">{{totalInfo.Name}}</span>
      </li>
    </div>
    <div class="qrCode">
      <img :src="qrCode"><br/>
      <span>店铺二维码手机扫一扫</span>
    </div>
  </div>
</template>

<script>
  import headerTop from '@/components/common/headerTop'
  import { GetStoreTotalInfo, GetStoreQrCode ,appkey,token,GetContractStoreInfo,AddStoreSuperb,AddStoreCollect} from '../config/env'

  export default{
    name: 'shopdes',
    data(){
      return {
        qrCode: '',
        totalInfo:'',
        zanImg: 'static/img/common_like_press@2x.png',
        collectImg: 'static/img/common_collection_press@2x.png',
        position: {
                    lng: 116.404,
                    lat: 39.915
        },
        mapFlag: false
      }
    },
    components: {
      headerTop,
    },
    computed: {
      position(){
        return this.position = {
          lng: 116.404,
          lat: 39.915
        }
      }

    },
    methods: {
      init: async function(){
        await this.getshopInfo()
        await this.getQrcode()
      },
      showMap(){
        this.mapFlag = true
      },
      mapHide(){
        this.mapFlag = false
      },
      getQrcode(){
        return new Promise( (resolve, reject) =>{
          let obj = {
            appkey: appkey,
            token: token
          }
          this.$http.post(GetStoreQrCode, this.$qs.stringify(obj))
            .then( res =>{
              console.log(res)
              this.qrCode = res.data
              resolve()
            })
        })
      },
      getshopInfo(){
          return new Promise( (resolve,reject) =>{
            let obj = {
              appkey: appkey,
              token: token
            }
            this.$http.post(GetContractStoreInfo,this.$qs.stringify(obj))
              .then( res =>{
                this.totalInfo = res.data.Data
                resolve()
              })
          })

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
      zan(el){
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
    },
    created(){
      this.init()
    },
    watch:{

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

</style>
