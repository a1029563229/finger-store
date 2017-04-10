<template>
	<div class="home">
		<!-- 轮播 -->
		<swiper swipeid="swipe" ref="swiper" class="home-swipe">
			<div class="swiper-slide home-slide" slot="swiper-item" v-for="top in slides">
				<img :src="top.image">
			</div>
		</swiper>
		<!-- 顶部搜索栏 -->
		<div class="home-search">
			<router-link class="search-input" href="javascript:;" to="search">
				请输入关键字
			</router-link>
			<router-link to="search" class="search-icon"></router-link>
		</div>
		<!-- 今日精品推荐 -->
		<section-item :title="require('../assets/icon/home_activity_recommended@3x.png')">
			<recommend-today></recommend-today>
		</section-item>
		<!-- 附近店铺 -->
		<section-item :title="require('../assets/icon/home_activity_nearby@3x.png')">
			<sort-list></sort-list>
			<nearby-list></nearby-list>
		</section-item>
		<!-- 底部导航栏 -->
		<navigation></navigation>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// 轮播图
import swiper from '@/components/common/swiper/swipe'
/* home */
// 分节
import sectionItem from '@/components/home/sectionItem'
// 今日精品推荐
import recommendToday from '@/components/home/recommendToday'
// 底部固定栏
import navigation from '@/components/common/navigation'
// 附近店铺-筛选
import sortList from '@/components/home/sortList'
// 附近店铺-列表
import nearbyList from '@/components/home/nearbyList'

import { getSearchAttrList, getSlides, getToken, getTodayRecommend } from '@/service/getData'

export default {
	name: 'home',
	data() {
		return {
			slides: [],
		}
	},
	components: {
		swiper,
		sectionItem,
		recommendToday,
		sortList,
		nearbyList,
		navigation,
	},
	computed: {
	},
	created() {
		this.initial();
	},
	mounted() {
		let swiper = this.$refs.swiper;
		if (swiper.dom) {
			this.swiper = swiper.dom;
		}
		// this.initial();
		// this.slides = slideData.data;
		// console.log('search-attr-list', attrData);
	},
	methods: {
	  async initial() {
			/*api.getSlides().then(data => {
				console.log('slides:',data);
				this.slides = data.data;
			});*/
		const tokenValue = await getToken(); 
		console.log('tokenValue',tokenValue.data.Data);
		let slideData = await getSlides();
	 	this.slides = slideData.data;
	 	let attrData = await getSearchAttrList();
		console.log('search-attr-list', attrData);
	 	let todayData = await getTodayRecommend(tokenValue.data.Data);
	 	console.log('todayRecommend',todayData);
	 	let bannerData = await getTodayRecommend(tokenValue.data.Data);
	 	console.log('bannerData',bannerData);
		}
	}

}
</script>
<style scoped>

	/* swiper */
.home-swipe {
	position: relative;
	width: 100%;
	height: 4.8rem;
}
.home-swipe {
	width: 100%;
	height: 6rem;
}
.home-swipe img {
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
}

/* search */
.home-search {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 1.28rem;
	padding: 0.2rem 0 0.2rem 5%;
	background: rgba(255, 255, 255, 0.1);
	z-index: 9;
}
.home-search .search-input {
	float: left;
	display: block;
	width: 82%;
	height: 100%;
	line-height: 0.8rem;
	padding-left: 4%;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 1.28rem;
	color: #999;
}
.home-search .search-icon {
	float: left;
	margin-left: 3%;
	display: block;
	width: 11%;
	height: 100%;
	background: url('../assets/icon/icon_search@2x.png') no-repeat center;
	background-size: 0.72rem;
}

</style>