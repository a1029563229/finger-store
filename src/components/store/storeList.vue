<template>
	<ul class="store-list clear">
		<li class="store-item" v-for="item in list">
			<div class="item-image">
				<img :src="item.image">
			</div>
			<h1 class="item-title">{{ item.name }}</h1>
			<p>
				<span class="item-price">
					{{ item.price | currency }}
				</span>
				<span class="item-num">
					销量&nbsp;{{ item.num }}
				</span>
			</p>
		</li>
	</ul>
</template>
<script>
	
	export default {
		name: 'store-list',
		/*props: {
			list: {
				type: Array,
				default: []
			}
		},*/
		data() {
			return {
				list: [
					{name: '苹果iPhone 6s全网通4G苹果iPhone 6s全网通4G', num: 18888, price: 5288, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
					{name: '苹果iPhone 6s全网通4G苹果iPhone 6s全网通4G', num: 18888, price: 5288, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
					{name: '苹果iPhone 6s全网通4G苹果iPhone 6s全网通4G', num: 18888, price: 5288, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
					{name: '苹果iPhone 6s全网通4G苹果iPhone 6s全网通4G', num: 18888, price: 5288, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
					{name: '苹果iPhone 6s全网通4G苹果iPhone 6s全网通4G', num: 18888, price: 5288, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
					{name: '苹果iPhone 6s全网通4G苹果iPhone 6s全网通4G', num: 18888, price: 5288, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
				]
			}
		},
		filters: {
			currency(value) {
				return '￥' + parseFloat(value).toFixed(2);
			}
		}
	}
</script>
<style scoped>
	.store-list {
		width: 100%;
		height: auto;
		margin: 0 0 1.4rem 1.5%;
		padding-top: 0.15rem;
	}
	.store-item {
		float: left;
		margin: 0.15rem 1.5%;
		width: 45.5%;
		height: 6.64rem;
		border: 1px solid #D8D8D8;
		padding: 0.15rem 1.5%;
		background: #FFF;
	}

	.item-image {
		position: relative;
		width: 100%;
		margin-bottom: 0.1rem;
		height: 0;
		padding-bottom: 100%;
		background: #DDD;
	}
	.item-image img {
		position: absolute;
		top: 0;
		left: 0;
		max-width: 100%;
	}
	
	.item-title {
		font-size: 0.4rem;
		max-height: 1.1rem;
		overflow: hidden;
		line-height: 0.6rem;
	}

	.item-price {
		line-height: 0.8rem;
		font-size: 0.4rem;
		color: #E52951;
	}
	.item-num {
		float: right;
		line-height: 0.8rem;
		color: #999;
		font-size: 0.3rem;
	}

</style>