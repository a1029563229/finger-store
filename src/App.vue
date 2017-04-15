<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <router-view class="app-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      transitionName: 'router-fade',
    }
  },
}
</script>

<style>
@import './assets/css/common.css';

.router-fade-enter-active, .router-fade-leave-active  {
  opacity: 0;
  transition: opacity .3s;
}

.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}

.app-view {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 1;
  transition: tranform 0.3s ease;
}

</style>
