<template>
	<ul class="nearby-list">
		<li v-for="item in list" class="item">
			<div class="img">
				<img :src="item.image" >
			</div>
			<div class="desc">
				<h1 class="ellipsis">{{ item.name }}</h1>
				<p class="desc-item">
					<span>月销量&nbsp;{{ item.num }}</span>
					<span class="item-distance">&lt;&nbsp;{{ item.distance }}&nbsp;km</span>
				</p>
				<router-link to="hello" class="btn-map" @click="toMap()">到这里去</router-link>
			</div>
		</li>
	</ul>
</template>

<script>

export default {
	name: 'nearby-list',
	data() {
		return {
			list: [
				{ name: '河南省郑州市苹果手机卖店', num: 90, distance: 10.9, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
				{ name: '河南省郑州市苹果手机卖店', num: 90, distance: 10.9, image: 'http://h9.86.cc/walls/20160108/1024x768_ec6f991dc0b233c.jpg'},
			],
		}
	}
}

</script>

<style scoped>

.nearby-list {
	margin-bottom: 1.39rem;
}

.item {
	width: 100%;
	height: 3rem;
	padding: 0.3rem;
	border-bottom: 1px solid #eee;
}

.img {
	float: left;
	position: relative;
	width: 2.4rem;
	height: 2.4rem;
	margin-right: 0.5rem;
}

.desc {
	float: left;
	width: 68%;
}

.desc h1 {
	font-size: 0.4rem;
	line-height: 1rem;
}

.desc-item {
	color: #999;
}
.desc-item span {
	font-size: 0.35rem;
}

.item-distance {
	float: right;
}

.btn-map {
	float: right;
	margin-top: 0.25rem;
	display: block;
	width: 2.2rem;
	height: 0.7rem;
	line-height: 0.7rem;
	text-align: center;
	color: #E52951;
	border: 1px solid #E52951;
	border-radius: 0.06rem;
}


</style>