<template>
	<div class="home" :data-login="loginToken">
		<!-- 轮播 -->
		<swiper swipeid="swipe" ref="swiper" class="home-swipe">
			<div class="swiper-slide home-slide" slot="swiper-item" v-for="top in slides" @click="bannerToDetail(top.activityUrl)">
				<img :src="top.activityImage">
			</div>
		</swiper>
		<!-- 顶部搜索栏 -->
		<div class="home-search" :class="{active: isScroll}">
			<router-link class="search-input" href="javascript:;" :to="{path: 'search',query:{storeid:0}}">
				请输入关键字
			</router-link>
			<router-link :to="{path: 'search',query:{storeid:0}}" class="search-icon"></router-link>
		</div>
		<!-- 今日精品推荐 -->
		<section-item :title="require('../assets/icon/home_activity_recommended@3x.png')">
			<recommend-today></recommend-today>
		</section-item>
		<!-- 附近店铺 -->
		<section-item class="section-item-mask" :title="require('../assets/icon/home_activity_nearby@3x.png')">
			<sort-list @mask="isMask = !isMask" :isMask="isMask"></sort-list>
			<nearby-list :list="nearbyListData"></nearby-list>
			<div class="mask" v-show="isMask"></div>
		</section-item>
		<!-- 底部导航栏 -->
		<navigation></navigation>
		<watch-scroll :scroller="scroller" @overflow="overflow"></watch-scroll>
		<!-- <infinite-scroll :scroller="scroller" :loading="loading" @load="loadmore"></infinite-scroll> -->
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

import watchScroll from '@/components/common/watchScroll'
import infiniteScroll from '@/components/common/infiniteScroll'


import { 
	getSearchAttrList, getSlides, getToken, getTodayRecommend, getBanner, searchProductList, searchStoreList, 
} from '@/service/getData'

export default {
	name: 'home',
	data() {
		return {
			slides: [],
			isMask: false,
			isScroll: false,
			scroller: null,
			loading: false,
			nearbyListData: [],
		}
	},
	components: {
		swiper,
		sectionItem,
		recommendToday,
		sortList,
		nearbyList,
		navigation,
		watchScroll,
		infiniteScroll,
	},
	computed: {
		...mapState([
			'loginToken', 'searchProductKey', 'searchStoreKey'
			]),
	},
	created() {
		this.getUserInfo();
		this.initial();
	},
	mounted() {
		let swiper = this.$refs.swiper;
		this.scroller = this.$el;
		if (swiper.dom) {
			this.swiper = swiper.dom;
		}

		this.getNearbyStore();
	},
	methods: {
		...mapActions([
			'getUserInfo'
			]),
	  async initial() {
		/*let slideData = await getSlides();
	 	this.slides = slideData.data;*/
	 	let attrData = await getSearchAttrList();
		console.log('search-attr-list', attrData);

	 	let todayData = await getTodayRecommend(this.loginToken);
	 	console.log('todayRecommend',todayData);

	 	let bannerData = await getBanner(this.loginToken);
	 	this.slides = bannerData.data.Data;
	 	console.log('bannerData',bannerData);

		},
		// 监听滚动，设置搜索栏背景色
		overflow() {
			// console.log(1123);
			this.isScroll = true;
		},
		// 跳转到商品详情
		bannerToDetail(url) {
			window.location.href = url;
		},
		// 获取店铺数据
		async getNearbyStore() {
			let searchData = await searchStoreList(this.searchStoreKey);
			console.info('getNearbyStore:', searchData);
			this.nearbyListData = searchData.data.Data;
		},
		loadmore() {
			// console.info('loadmore');
		}
	}

}
</script>
<style scoped>

.home {
	padding-bottom: 1.4rem;
}

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
.home-search.active {
	background-color: rgba(128, 128, 128, 0.9);
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

/* 遮罩处理 */
.section-item-mask {
	position: relative;
}
.mask {
	position: absolute;
	display: block;
	top: 2.44rem;
	right: 0;
	bottom: 1.4rem;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 19;
	background-color: rgba(0,0,0,0.5);
}


</style>