<script src="../../../project/yp/src/router.js"></script>
<template>
  <div id="app">
    <transition :enter-active-class="'animated ' + enterTransition"
                :leave-active-class="'animated ' + leaveTransition">
      <router-view class="app-view"></router-view>
    </transition>
  </div>
</template>

<script>
  import 'animate.css';
  export default {
    name: 'app',
    data() {
      return {
        enterTransition: '',
        leaveTransition:''
      }
    },

    mounted() {

    },

    watch: {
      '$route' (to, from) {
        if (to.name == 'search' || to.name == 'NotFound') {
            this.enterTransition = 'fadeIn';
            this.leaveTransition = 'fadeOut';
            return;
        }
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.enterTransition = toDepth <= fromDepth
          ? toDepth === fromDepth
              ? 'fadeIn'
              : 'slideInLeft'
          : 'slideInRight';
        this.leaveTransition = toDepth <= fromDepth
          ? toDepth === fromDepth
            ? 'fadeOut'
            : 'slideOutRight'
          : 'slideOutLeft';
      }
    }
  }
</script>

<style lang="less">
@import './assets/css/common.css';

  #app {
    width: 100%;
    height: 100%;
  }

  .app-view {
    width: 100%;
    height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    z-index:1;
  }

  .app-view{
    position: fixed;
    left:0;
    top:0;
  }
  .animated{
    animation-duration:.5s!important;
  }
</style>
