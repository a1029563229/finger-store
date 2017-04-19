<template>
  <div class="payModel">
    <div class="payCt">
      <div class="payHead">选择支付方式</div>
      <div class="paytype">
        <li class="paytypeItem">
          <input type="radio">
          <img src="static/img/weixin.png">
          <span>微信支付</span>
        </li>
        <li class="paytypeItem">
          <input type="radio">
          <img src="static/img/icon_yinlian copy.png">
          <span>银联支付</span>
        </li>
        <li class="paytypeItem">
          <input type="radio">
          <img src="static/img/icon_zhifubao copy.png">
          <span>支付宝支付</span>
        </li>
      </div>
      <div class="payFooter">
        <button class="btn cancelBtn">取消</button>
        <button class="btn sureBtn">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'payModel',
    data(){
      return {

      }
    }
  }
</script>
<style scoped>
  .payModel{
    width: 100%;
    height:100%;
    position: fixed;
    z-index:1;
    top:0;
    background: rgba(0,0,0,0.3);
  }
  .payCt{
    width: 70%;
    background: #F7F7F7;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    height: 6rem;
    position: absolute;
    border-radius: 10px;
  }
  .payHead{
    line-height: 1rem;
    padding: 0 3%;
    font-size: 0.35rem;
  }
  .paytype{
    padding: 3%;
  }
  .paytypeItem{
    line-height: 0.9rem;
  }
  .paytypeItem>img{
    width: 0.8rem;
    margin: 0 2%;
  }
  .payFooter{
    text-align: center;
    line-height: 1rem;
  }
  .btn{
    border: 1px solid;
    line-height: 0.8rem;
    width: 30%;
    background: none;
    border-radius: 5px;
    font-size: 0.3rem;
  }
  .cancelBtn{
    border: 1px solid #C2C2C2;
    margin-right: 2%;
  }
  .sureBtn{
    background: #E52951;
    color: #fff;
    border: none;
  }
</style>
