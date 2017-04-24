<template>
	<ul class="recommendFour">

		<li class="recommendFour-item" @click="toDetail(listOne.link_url)">
			<div class="recommendFour-img">
        <img :src="listOne.img_url">
      </div>

      <div class="recommendFour-desc">
      	<h1 class="recommendFour-desc-title ellipsis">{{listOne.product_name}}</h1>
      	<p class="recommendFour-desc-desc">{{listOne.sell_title}}</p>
      	<h2 class="recommendFour-desc-price">{{listOne.sell_price | money }}</h2>
      </div>
		</li>
		<li class="recommendFour-item" @click="toDetail(listTwo.link_url)">
			<div class="recommendFour-img">
        <img :src="listTwo.img_url">
      </div>

      <div class="recommendFour-desc">
      	<h1 class="recommendFour-desc-title ellipsis">{{listTwo.product_name}}</h1>
      	<p class="recommendFour-desc-desc">{{listTwo.sell_title}}</p>
      	<h2 class="recommendFour-desc-price">{{listTwo.sell_price | money }}</h2>
      </div>
		</li>

		<li class="recommendFour-left" @click="toDetail(listThree.link_url)">
			<div class="recommendFour-left-img">
        <img :src="listThree.img_url">
      </div>

      <div class="recommendFour-left-desc">
      	<h1 class="recommendFour-left-desc-title ellipsis">{{listThree.product_name}}</h1>
      	<p class="recommendFour-left-desc-desc">{{listThree.sell_title}}</p>
      	<h2 class="recommendFour-left-desc-price">{{listThree.sell_price | money }}</h2>
      </div>
		</li>
		
	</ul>
</template>

<script>
export default {
	name: "recommend-four", 					// 2 + 1 
	props: ['recommendList', 'token'],
	computed: {
		listOne() {
			return this.recommendList[0]
		},
		listTwo() {
			return this.recommendList[1]
		},
		listThree() {
			return this.recommendList[2]
		},
	},
	filters: {
    money(value) {
      let val = parseFloat(value).toFixed(2)
      return `￥${val}`
    }
  },
	methods: {
		toDetail(url) {
			console.log('url:',url);
			window.location.href = url + "&token=" + this.token
		}
	}
}
</script>
<style scoped>

.recommendFour {
	position: relative;
	width: 100%;
	height: 6rem;
}

.recommendFour-left {
	display: flex;
	flex-direction: column;
	position: absolute;
	right: 0;
	top: 0;
	width: 40%;
	height: 100%;
	overflow: hidden;
	border: 1px solid #EEE;
	border-radius: 0.06rem;
	background-color: #FFF;
}

/* img */
.recommendFour-left-img {
	position: relative;
	width: 80%;
	margin: 5% auto;
	padding-bottom: 80%;
	/* background-color: #DDD; */
}

.recommendFour-left-img img {
	/* display: none; */
	position: absolute;
	max-width: 100%;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%,-50%, 0);
}

/* desc */
.recommendFour-left-desc {
	flex: 1;
	padding: 0 4%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.recommendFour-left-desc-title {
	flex: 1;
	font-size: 0.4rem;
	color: #222;
}
.recommendFour-left-desc-desc {
	flex: 2;
	color: #999;
	overflow: hidden;
}
.recommendFour-left-desc-price {
	flex: 1;
	font-size: 0.36rem;
	color: #E52951;
}

/* right */
.recommendFour-item {
	float: left;
	height: 3rem;
	display: flex;
	width: 60%;
	align-items: center;
	border-bottom: 1px solid #EEE;
	padding: 2%;
	background-color: #FFF;
}

/* image */
.recommendFour-img {
	/* background-color: #DDD; */
	position: relative;
	width: 45%;
	height: 0;
	padding-bottom: 37.24%;
	border-radius: 0.06rem;
	overflow: hidden;

}
.recommendFour-img img {
	/* display: none; */
	width: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%,-50%, 0);
}

/* desc */
.recommendFour-desc {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-self: stretch;
	width: 75%;
	padding: 1% 0 0 4%;
	overflow: hidden;
}

.recommendFour-desc-title {
	font-size: 0.4rem;
	color: #222;
	flex: 1;
}
.recommendFour-desc-desc {
	flex: 2;
	color: #999;
	overflow: hidden;
}
.recommendFour-desc-price {
	flex: 1;
	font-size: 0.35rem;
	color: #E52951;
}


</style>