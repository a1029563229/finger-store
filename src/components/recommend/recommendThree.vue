<template>
	<ul class="recommendThree">
		<li class="recommendThree-left" @click="toDetail(listOne.link_url)">
			<div class="recommendThree-left-img">
        <img :src="listOne.img_url">
      </div>

      <div class="recommendThree-left-desc">
      	<h1 class="recommendThree-left-desc-title ellipsis">{{listOne.product_name}}</h1>
      	<p class="recommendThree-left-desc-desc">{{listOne.sell_title}}</p>
      	<h2 class="recommendThree-left-desc-price">{{listOne.sell_price | money }}</h2>
      </div>
		</li>
		<li class="recommendThree-item" @click="toDetail(listTwo.link_url)">
			<div class="recommendThree-img">
        <img :src="listTwo.img_url">
      </div>

      <div class="recommendThree-desc">
      	<h1 class="recommendThree-desc-title ellipsis">{{listTwo.product_name}}</h1>
      	<p class="recommendThree-desc-desc">{{listTwo.sell_title}}</p>
      	<h2 class="recommendThree-desc-price">{{listTwo.sell_price | money }}</h2>
      </div>
		</li>
		<li class="recommendThree-item" @click="toDetail(listThree.link_url)">
			<div class="recommendThree-img">
        <img :src="listThree.img_url">
      </div>

      <div class="recommendThree-desc">
      	<h1 class="recommendThree-desc-title ellipsis">{{listThree.product_name}}</h1>
      	<p class="recommendThree-desc-desc">{{listThree.sell_title}}</p>
      	<h2 class="recommendThree-desc-price">{{listThree.sell_price | money }}</h2>
      </div>
		</li>
	</ul>
</template>

<script>
export default {
	name: "recommend-three",  // 1 + 2
	props: {
		recommendList: {
			type: Array,
			default: []
		},
		token: {
			type: String,
			default: ''
		}
	},
	computed: {
		listOne() {
			return this.recommendList[0] 
		},
		listTwo() {
			if (!this.recommendList[1]) return []
			return this.recommendList[1] 
		},
		listThree() {
			if (!this.recommendList[2]) return []
			return this.recommendList[2] 
		},
	},
	filters: {
    money(value) {
    	if (!value) return ''
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

.recommendThree {
	width: 100%;
	height: 6rem;
}

.recommendThree-left {
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
.recommendThree-left-img {
	position: relative;
	width: 80%;
	margin: 5% auto;
	padding-bottom: 80%;
	/* background-color: #DDD; */
}

.recommendThree-left-img img {
	/* display: none; */
	position: absolute;
	max-width: 100%;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%,-50%, 0);
}

/* desc */
.recommendThree-left-desc {
	flex: 1;
	padding: 0 4%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.recommendThree-left-desc-title {
	flex: 1;
	font-size: 0.4rem;
	color: #222;
}
.recommendThree-left-desc-desc {
	flex: 2;
	color: #999;
	overflow: hidden;
}
.recommendThree-left-desc-price {
	flex: 1;
	font-size: 0.36rem;
	color: #E52951;
}

/* right */
.recommendThree-item {
	float: right;
	height: 3rem;
	display: flex;
	width: 60%;
	align-items: center;
	border-bottom: 1px solid #EEE;
	padding: 2%;
	background-color: #FFF;
}

/* image */
.recommendThree-img {
	/* background-color: #DDD; */
	position: relative;
	width: 45%;
	height: 0;
	padding-bottom: 37.24%;
	border-radius: 0.06rem;
	overflow: hidden;

}
.recommendThree-img img {
	/* display: none; */
	width: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%,-50%, 0);
}

/* desc */
.recommendThree-desc {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-self: stretch;
	width: 75%;
	padding: 1% 0 0 4%;
	overflow: hidden;
}

.recommendThree-desc-title {
	font-size: 0.4rem;
	color: #222;
	flex: 1;
}
.recommendThree-desc-desc {
	flex: 2;
	color: #999;
	overflow: hidden;
}
.recommendThree-desc-price {
	flex: 1;
	font-size: 0.35rem;
	color: #E52951;
}


</style>