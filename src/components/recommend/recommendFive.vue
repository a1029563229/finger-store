<template>
	<ul class="recommendFive clear">
    <li class="recommendFive-item" v-for="item in recommendList" @click="toDetail(item.link_url)">
    
      <div class="recommendFive-img">
        <img :src="item.img_url">
      </div>

      <div class="recommendFive-desc">
      	<h1 class="recommendFive-desc-title">{{item.product_name}}</h1>
      	<p class="recommendFive-desc-desc">{{item.sell_title}}</p>
      	<h2 class="recommendFive-desc-price">{{item.sell_price | money }}</h2>
      </div>
    </li>
  </ul>
</template>
<script>

export default {
	name: "recommend-two",
	props: ['recommendList', 'token'],
	filters: {
    money(value) {
      let val = parseFloat(value).toFixed(2)
      return `￥${val}`
    }
  },
	methods: {
		toDetail(url) {
			window.location.href = url + "&token=" + this.token
		}
	}
}

</script>
<style scoped>

.recommendFive {
}

.recommendFive-item {
	display: flex;
	flex-direction: column;
	float: left;
	width: 33.3333%;
	/* border: 1px solid #EEE; */
	height: 6.6rem;
	border-radius: 0.06rem;
	background-color: #FFF;
}

/* img */
.recommendFive-img {
	position: relative;
	width: 80%;
	margin: 5% auto;
	padding-bottom: 80%;
	/* background-color: #DDD; */
}

.recommendFive-img img {
	/* display: none; */
	position: absolute;
	max-width: 100%;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%,-50%, 0);
}

/* desc */
.recommendFive-desc {
	flex: 1;
	padding: 0 4%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.recommendFive-desc-title {
	flex: 2;
	font-size: 0.4rem;
	color: #222;
	overflow: hidden;
}
.recommendFive-desc-desc {
	flex: 2;
	color: #999;
	overflow: hidden;
}
.recommendFive-desc-price {
	flex: 1;
	font-size: 0.36rem;
	color: #E52951;
}

</style>