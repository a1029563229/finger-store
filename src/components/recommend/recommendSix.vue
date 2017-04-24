<template>
	<ul class="recommendSix">
		<li class="recommendSix-left" @click="toDetail(listOne.link_url)">
			<div class="recommendSix-left-img">
        <img :src="listOne.img_url">
      </div>

      <div class="recommendSix-left-desc">
      	<h1 class="recommendSix-left-desc-title ellipsis">{{listOne.product_name}}</h1>
      	<p class="recommendSix-left-desc-desc">{{listOne.sell_title}}</p>
      	<h2 class="recommendSix-left-desc-price">{{listOne.sell_price | money }}</h2>
      </div>
		</li>
		<li class="recommendSix-item" @click="toDetail(listTwo.link_url)">
			<div class="recommendSix-img">
        <img :src="listTwo.img_url">
      </div>

      <div class="recommendSix-desc">
      	<h1 class="recommendSix-desc-title ellipsis">{{listTwo.product_name}}</h1>
      	<p class="recommendSix-desc-desc">{{listTwo.sell_title}}</p>
      	<h2 class="recommendSix-desc-price">{{listTwo.sell_price | money }}</h2>
      </div>
		</li>
		<li class="recommendSix-item" @click="toDetail(listThree.link_url)">
			<div class="recommendSix-img">
        <img :src="listThree.img_url">
      </div>

      <div class="recommendSix-desc">
      	<h1 class="recommendSix-desc-title ellipsis">{{listThree.product_name}}</h1>
      	<p class="recommendSix-desc-desc">{{listThree.sell_title}}</p>
      	<h2 class="recommendSix-desc-price">{{listThree.sell_price | money }}</h2>
      </div>
		</li>
		<li class="recommendSix-item" @click="toDetail(listFour.link_url)">
			<div class="recommendSix-img">
        <img :src="listFour.img_url">
      </div>

      <div class="recommendSix-desc">
      	<h1 class="recommendSix-desc-title ellipsis">{{listFour.product_name}}</h1>
      	<p class="recommendSix-desc-desc">{{listFour.sell_title}}</p>
      	<h2 class="recommendSix-desc-price">{{listFour.sell_price | money }}</h2>
      </div>
		</li>
	</ul>
</template>

<script>
export default {
	name: "recommend-six",	// 1 + 3
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
		listFour() {
			return this.recommendList[3]
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
			window.location.href = url + "&token=" + this.token
		}
	}
}
</script>
<style scoped>

.recommendSix {
	width: 100%;
	height: 6.6rem;
}

.recommendSix-left {
	display: flex;
	flex-direction: column;
	float: left;
	width: 40%;
	height: 100%;
	overflow: hidden;
	border: 1px solid #EEE;
	border-radius: 0.06rem;
	background-color: #FFF;
}

/* img */
.recommendSix-left-img {
	position: relative;
	width: 80%;
	margin: 5% auto;
	padding-bottom: 80%;
	/* background-color: #DDD; */
}

.recommendSix-left-img img {
	/* display: none; */
	position: absolute;
	max-width: 100%;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%,-50%, 0);
}

/* desc */
.recommendSix-left-desc {
	flex: 1;
	padding: 0 4%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.recommendSix-left-desc-title {
	flex: 1;
	font-size: 0.4rem;
	color: #222;
}
.recommendSix-left-desc-desc {
	flex: 2;
	color: #999;
	overflow: hidden;
}
.recommendSix-left-desc-price {
	flex: 1;
	font-size: 0.36rem;
	color: #E52951;
}

/* right */
.recommendSix-item {
	float: left;
	height: 2.2rem;
	display: flex;
	width: 60%;
	align-items: center;
	border-bottom: 1px solid #EEE;
	padding: 2%;
	background-color: #FFF;
}

/* image */
.recommendSix-img {
	/* background-color: #DDD; */
	position: relative;
	width: 40%;
	height: 0;
	padding-bottom: 37.24%;
	border-radius: 0.06rem;
	overflow: hidden;

}
.recommendSix-img img {
	/* display: none; */
	width: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%,-50%, 0);
}

/* desc */
.recommendSix-desc {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-self: stretch;
	width: 75%;
	padding: 1% 0 0 4%;
	overflow: hidden;
}

.recommendSix-desc-title {
	font-size: 0.4rem;
	color: #222;
	flex: 1;
}
.recommendSix-desc-desc {
	flex: 2;
	color: #999;
	overflow: hidden;
}
.recommendSix-desc-price {
	flex: 1;
	font-size: 0.35rem;
	color: #E52951;
}


</style>