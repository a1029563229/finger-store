<template>
	<ul class="recommendOne">
		<li class="recommendOne-item"  v-for="item in recommendList" @click="toDetail(item.link_url)">
			<div class="recommendOne-img">
				<img :src="item.img_url" >
			</div>
      
      <div class="recommendOne-desc">
        <h1 class="recommendOne-desc-title ellipsis">{{item.product_name}}</h1>
        <p class="recommendOne-desc-desc">{{item.sell_title}}</p>
        <h2 class="recommendOne-desc-price">{{item.sell_price | money }}</h2>
      </div>
    </li>
	</ul>
	
</template>
<script>
	export default {
		name: "recommend-one",	// 1 + 1
		props: ['recommendList','token'],
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


.recommendOne-item {
	height: 2.9rem;
	display: flex;
	border-bottom: 1px solid #EEE;
	padding: 2% 4%;
	background-color: #FFF;
}

/* image */
.recommendOne-img {
	position: relative;
	width: 25%;
	height: 0;
	padding-bottom: 26%;
	border-radius: 0.06rem;
	overflow: hidden;

}
.recommendOne-img img {
	display: block;
	width: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%,-50%, 0);
}

/* desc */
.recommendOne-desc {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 75%;
	padding: 1% 0 0 4%;
	overflow: hidden;
}

.recommendOne-desc-title {
	font-size: 0.4rem;
	color: #222;
	flex: 1;
}
.recommendOne-desc-desc {
	flex: 2;
	color: #999;
	overflow: hidden;
}
.recommendOne-desc-price {
	flex: 1;
	font-size: 0.35rem;
	color: #E52951;
}

</style>