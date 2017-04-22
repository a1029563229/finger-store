<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <router-view class="app-view clear"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      transitionName: 'trans-opacity',
    }
  },
}
</script>

<style>
@import './assets/css/common.css';

.trans-opacity-enter-active, .trans-opacity-leave-active{
    transition: opacity 0.3s;
  }
.trans-opacity-enter, .trans-opacity-leave-active{
  opacity: 0;
}

#app {
  width: 100%;
  height: 100%;
}

.app-view {
  width: 100%;
  height: 100vh;
  overflow: auto;
}

</style>
