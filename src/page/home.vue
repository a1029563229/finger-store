<template>
	<div class="home">
		<!-- 轮播 -->
		<swiper swipeid="swipe" ref="swiper" class="home-swipe">
			<div class="swiper-slide home-slide" slot="swiper-item" v-for="top in slides" @click="bannerToDetail(top.activityUrl)">
				<img :src="top.activityImage">
			</div>
		</swiper>
		<!-- 顶部搜索栏 -->
		<div class="home-search" :class="{active: isScroll}">
			<router-link class="search-input" :to="{path:'search', query:{storeid: 0, token: token}}">
				请输入关键字
			</router-link>
			<router-link :to="{path: 'search',query:{storeid: 0,token: token}}" class="search-icon"></router-link>
		</div>
		<!-- 今日精品推荐 -->
		<section-item :title="require('../assets/icon/home_activity_recommended@3x.png')">
			<recommend-today :token="token" :show-type="showType" :recomend-data="recommendData" v-if="recommendData.length"></recommend-today>
		</section-item>
		<!-- 附近店铺 -->
		<section-item class="section-item-mask" :title="require('../assets/icon/home_activity_nearby@3x.png')">
			<sort-list @mask="changeMask" @reload="reloadNearbyStore" :data-search="searchStoreKey" :data-attr="dataAttr" :data-local="local"></sort-list>
			<nearby-list :list="nearbyListData" :local="location"></nearby-list>
			<div class="mask" v-show="isMask"></div>
		</section-item>
		<!-- 底部导航栏 -->
		<navigation></navigation>
		<watch-scroll :scroller="scroller" @overflow="overflow"></watch-scroll>
		<infinite-scroll :scroller="scroller" :loading="loading" @load="loadmore"></infinite-scroll>
	</div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
// 轮播
import swiper from '@/components/common/swiper/swipe'
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
// 改变搜索栏背景色
import watchScroll from '@/components/common/watchScroll'
// 加载更多
import infiniteScroll from '@/components/common/infiniteScroll'

import { 
	getSlides, getToken, getTodayRecommend, getBanner, searchProductList, searchStoreList, getSearchAttrList
} from '@/service/getData'

export default {
	name: 'home',
	data() {
		return {
			token: '',
			slides: [],
			isMask: false,
			isScroll: false,
			scroller: null,
			loading: false,				// 是否显示loading
			showType: 0,					// 今日推荐模式
			recommendData: [],		// 今日推荐
			nearbyListData: [],
			dataAttr: [],
			local: { lat: '', lng: '' },
			searchStoreKey: {
				appkey: 100000029, 
				lat: '', 					// String	纬度  120.14563
				lng: '', 					// String	经度  30.242523
				pageIndex: 1,  		// int	页码
				pageSize: 10,			// int	每页多少条数据
				sort: 1, 					// int 1.综合（销量+价格）2.销量 3.价格
				sequence: 0, 			// 顺序排列：1 倒序：0正序

				brandName: '',  // string	品牌名称
				maxPrice: '',		// string	价格区间最大值
				minPrice: '',   // string	价格区间最小值
				color: '', 			// string	颜色 
				memory: ''     // string	内存	
			},
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
			'loginToken', 
			]),
		location() {
			return {
				lat: this.searchStoreKey.lat,
				lng: this.searchStoreKey.lng
			}
		}
	},
	created() {
	},
	mounted() {
		let swiper = this.$refs.swiper;
		this.scroller = this.$el;
		if (swiper.dom) {
			this.swiper = swiper.dom;
		}
		console.info('searchStoreKey',this.searchStoreKey);
		this.init();
		
	},
	methods: {
		async init() {
			this.token = await getToken();
			console.warn('token::',this.token);
			// 获取今日推荐
			let todayData = await getTodayRecommend(this.token);
			this.showType = todayData[0].show_type;
			this.recommendData = todayData[0].list_floor_product;
			// console.log('todayRecommend',this.recommendData);
			// 获取banner 
			this.slides = await getBanner(this.token);
			// console.log('bannerData',this.slides);
			this.getNearbyStore();
			this.getAttrList();
			this.getlocalation();

		},
		// 监听滚动，设置搜索栏背景色
		overflow(state) {
			this.isScroll = state;
		},
		// 跳转到商品详情
		bannerToDetail(url) {
			window.location.href = url;
		},
		// 获取 附近商店列表
		async getNearbyStore() {
			// console.info(this.searchStoreKey);
			const data = await searchStoreList(this.searchStoreKey);
			data.forEach(item => {
				this.nearbyListData.push(item);
			});
			this.loading = false;
			// console.info('getNearbyStore:', this.nearbyListData);
		},
		// 重新加载 附近商店列表 
		async reloadNearbyStore(searchkey) {
			console.info('reloadNearbyStore' + JSON.stringify(searchkey));
			this.nearbyListData = await searchStoreList(this.searchStoreKey);
			// console.info('reloadNearbyStore:', this.nearbyListData);
		},
		// 获取筛选栏-属性列表
		async getAttrList() {
			this.loading = true;
			this.dataAttr = await getSearchAttrList();
			this.loading = false;
			// console.info('attrData', this.dataAttr);
		},
		loadmore() {
			let self = this;
			this.loading = true;
			setTimeout(() => {
				this.searchStoreKey.pageIndex++;
				console.log('reload - list');
				self.getNearbyStore();
			},500);
		},
		// 改变 遮罩层
		changeMask(mask) {
			this.isMask = mask;
		},
		// 获取用户地理位置
		getlocalation() {
			var options={
        enableHighAccuracy:true,
        maximumAge:1000
      }
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError,options);  //浏览器支持geolocation
      }else{
        alert('您的浏览器不支持地理位置定位');  //浏览器不支持geolocation
      }
		},
     onSuccess(position){
        this.searchStoreKey.lng =position.coords.longitude;  //返回用户位置  //经度
        this.searchStoreKey.lat = position.coords.latitude;   //纬度
         // alert('经度'+this.searchStoreKey.lng +'，纬度'+this.searchStoreKey.lat);   //根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
    },
 		onError(error){
      switch(error.code){
       /* case 1: alert("位置服务被拒绝"); break;
        case 2: alert("暂时获取不到位置信息"); break;
        case 3: alert("获取信息超时"); break;
        case 4: alert("未知错误"); break;*/
    }
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
	background-color: rgba(255, 255, 255, 0.1);
	z-index: 99;
	transition: background-color 0.3s linear;
}
.home-search.active {
	background-color: rgba(229, 41, 81, 0.9);
}
.home-search .search-input {
	float: left;
	display: block;
	width: 82%;
	height: 100%;
	line-height: 0.8rem;
	padding-left: 4%;
	background-color: rgba(255, 255, 255, 0.8);
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