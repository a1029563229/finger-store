<template>
	<ul class="nearby-list">
		<li v-for="item in list" class="item" :key="item.StoreID">
			<div class="img">
				<img :src="item.StoreLogo" >
			</div>
			<div class="desc">
				<h1 class="ellipsis">{{ item.StoreName }}</h1>
				<p class="desc-item">
					<span>月销量&nbsp;{{ item.SellCount }}</span>
					<span class="item-distance">&lt;&nbsp;{{ item.Distanct }}&nbsp;km</span>
				</p>
				<router-link :to="{path:'map', query:{name:item.StoreName}}" class="btn-map" @click="toMap(item.StoreName)">到这里去</router-link>
			</div>
		</li>
	</ul>
</template>

<script>

export default {
	name: 'nearby-list',
	props: ['list'],
	methods: {
		toMap(storeName) {
			// console.log('StoreID:',StoreID);
			// this.$router.push({path:'map', query: {name: storeName}});
		}
	}
}

</script>

<style scoped>

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