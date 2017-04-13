<template>
  <div class="alert-container">
    <section class="tip-text-wrap">
      <div class="tip-icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip-text">{{alertText}}</p>
      <div class="confirm">确认</div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      positionY: 0,
      timer: null,
    }
  },
  props: ['alertText'],
  methods: {
    closeTip() {
      this.$emit('closeTip');
    }
  }
}
</script>
<style scoped>
  
@keyframes tipMove{
  0%   { transform: scale(1) }
  35%  { transform: scale(.8) }
  70%  { transform: scale(1.1) }
  100% { transform: scale(1) }
}

.alert-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
}

.tip-text-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -3rem;
  margin-left: -3rem;
  width: 6rem;
  animation: tipMove .4s ;
  background-color: rgba(255,255,255,1);
  border: 1px;
  padding-top: .3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0.25rem;
}

.tip-text-wrap .tip_icon {
  border: 0.15rem solid #f8cb86;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tip-text-wrap span:nth-of-type(1) {
  width: 0.06rem;
  height: 0.8rem;
  background-color: #f8cb86;
}
.tip-text-wrap span:nth-of-type(2) {
  border: 1px;
  border-radius: 50%;
  margin-top: .1rem;
  width: 0.1rem;
  height: 0.1rem;
  background-color: #f8cb86;
}

.tip-text {
  font-size: 0.35rem;
  color: #333;
  line-height: .9rem;
  text-align: center;
  margin-top: .8rem;
  padding: 0 .4rem;
}

.confrim {
  font-size: 0.4rem;
  color: #fff;
  font-weight: bold;
  margin-top: .8rem;
  background-color: #4cd964;
  width: 100%;
  text-align: center;
  line-height: 1.8rem;
  border: 1px;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

</style>