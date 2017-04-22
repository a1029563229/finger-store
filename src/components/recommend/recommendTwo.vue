<template>
	<ul class="recommendTwo clear">
    <li class="recommendTwo-item" v-for="item in recommendList" @click="toDetail(item.link_url)">
    
      <div class="recommmendTwo-img">
        <img :src="item.img_url">
      </div>

      <div class="recommendTwo-desc">
      	<h1 class="recommendTwo-desc-title ellipsis">{{item.product_name}}</h1>
      	<p class="recommendTwo-desc-desc">{{item.sell_title}}</p>
      	<h2 class="recommendTwo-desc-price">{{item.sell_price | money }}</h2>
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

.recommendTwo {
	padding-top: 2%;
}

.recommendTwo-item {
	display: flex;
	flex-direction: column;
	float: left;
	width: 47%;
	margin: 0 0 2% 2%;
	border: 1px solid #EEE;
	height: 6.6rem;
	border-radius: 0.06rem;
	background-color: #FFF;
}

/* img */
.recommmendTwo-img {
	position: relative;
	width: 80%;
	margin: 5% auto;
	padding-bottom: 80%;
	/* background-color: #DDD; */
}

.recommmendTwo-img img {
	/* display: none; */
	position: absolute;
	max-width: 100%;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%,-50%, 0);
}

/* desc */
.recommendTwo-desc {
	flex: 1;
	padding: 0 4%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.recommendTwo-desc-title {
	flex: 1;
	font-size: 0.4rem;
	color: #222;
}
.recommendTwo-desc-desc {
	flex: 2;
	color: #999;
	overflow: hidden;
}
.recommendTwo-desc-price {
	flex: 1;
	font-size: 0.36rem;
	color: #E52951;
}

</style>