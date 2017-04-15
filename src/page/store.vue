<template>
	<div class="store">
		<div class="search-bar">
			<span class="searchBtnDefault btn-back" @click="toBack()"></span>
			<input class="search-input" type="text" placeholder="请输入关键字" @click="toSearch"/>
			<span class="searchBtnDefault btn-search" @click="toSearch"></span>
		</div>
		<div class="sort-filter">
			<sort-list @mask="changeMask" @reload="reloadCommodity" :data-init="dataSortInit" :data-select-init="dataSelectInit" :data-search="searchProductKey" :data-attr="dataAttr"></sort-list>
			<div class="mask" v-show="isMask"></div>
		
			<div class="store-info">
				<div class="info-img">
					<img :src="storeInfo.logo">
				</div>
				<h1 class="info-name ellipsis">{{ storeInfo.name }}</h1>
				<ul class="info-btn">
					<li @click="toPraise">
						<i class="btn-praise"></i>
						点赞
					</li>
					<li @click="toCollect">
						<i class="btn-collect"></i>
						收藏
					</li>
				</ul>
			</div>
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
						月销量&nbsp;{{ item.num }}
					</span>
				</p>
			</li>
		</ul>
	</div>

		<navigation></navigation>
	</div>
</template>
<script>
	import sortList from '@/components/home/sortList'
	import storeList from '@/components/store/storeList'
	import navigation from '@/components/common/navigation'
	import { mapState } from 'vuex'
	import { addStoreSuperb, addStoreCollect } from '../service/getData'
	export default {
		name: 'store',
		data() {
			return {
				list: [
					{name: '苹果iPhone 6s全网通4G苹果iPhone 6s全网通4G', num: 18888, price: 5288, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
					{name: '苹果iPhone 6s全网通4G苹果iPhone 6s全网通4G', num: 18888, price: 5288, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
					{name: '苹果iPhone 6s全网通4G苹果iPhone 6s全网通4G', num: 18888, price: 5288, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
					{name: '苹果iPhone 6s全网通4G苹果iPhone 6s全网通4G', num: 18888, price: 5288, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
					{name: '苹果iPhone 6s全网通4G苹果iPhone 6s全网通4G', num: 18888, price: 5288, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
					{name: '苹果iPhone 6s全网通4G苹果iPhone 6s全网通4G', num: 18888, price: 5288, image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg'},
				],
				dataSortInit: [		// 筛选数据初始化
					{name: '综合', class: 'total', up: false, active:true },
					{name: '距离', class: 'arrow-up', up: false, active:false },
					{name: '价格', class: 'arrow-up',  up: false, active:false },
					{name: '筛选', class: 'screen ',  up: false, active:false },
				],
				dataSelectInit: ['综合排序', '距离', '价格'],	//下拉框
				dataAttr: [],
				isMask: false,
				searchProductKey: {
					appkey: 100000029,
					sort: 1, 				// int 1.综合（销量+价格）2.销量 3.价格
					storeid: 0,			// int	店铺id（0 代表全站，不为0代表搜索店铺内商品）
					sequence: 0,		// 顺序排列：1 倒序：0正序
					pageindex: 1, 	// 页码
					pagesize: 10,  // int	每页多少条数据

					brandName: '',  // string	品牌名称
					maxPrice: '',		// string	价格区间最大值
					minPrice: '',   // string	价格区间最小值
					color: '', 			// string	颜色
					memory: ''     // string	内存
				},
			}
		},
		components: {
			sortList,
			storeList,
			navigation,
		},
		computed: {
			...mapState({
				storeInfo: state => state.home.storeInfo,
				token: state => state.home.token,
			})
		},
		mounted() {
			this.getAttrList();
			console.log(this.storeInfo);
		},
		filters: {
			currency(value) {
				return '￥' + parseFloat(value).toFixed(2);
			}
		},
		methods: {
			// 点赞
			async toPraise() {
				console.log('praiseResult');
				let praiseResult = await addStoreSuperb(this.token);
				console.log('praiseResult',praiseResult);
			},
			// 收藏
			async toCollect() {
				let collectResult = await addStoreCollect(this.token);
				console.log('collectResult',collectResult);
			},
			// 搜索
			toSearch() {
				this.$router.push({path:'search', query:{storeid:1}});
			},
			// 改变 遮罩层
			changeMask(mask) {
				console.info('changeMask:',mask);
				this.isMask = mask;
			},
			// 重新加载 商品列表 
			async reloadCommodity(searchkey) {
				console.info('reloadNearbyStore' + JSON.stringify(searchkey));
				this.nearbyListData = await searchStoreList(this.searchStoreKey);
				// console.info('reloadNearbyStore:', this.nearbyListData);
			},
			// 获取筛选栏-属性列表
			async getAttrList() {
				this.dataAttr = await getSearchAttrList();
				// console.info('attrData', this.dataAttr);
			},
		}
	}
</script>
<style scoped>

.store {
	width: 100%;
	height: 100%;
	padding-bottom: 1.4rem;
	background-color: #F4F4F4;
}

/* search-bar */
.search-bar {
	position: relative;
	width: 100%;
	height: 1.28rem;
	background-color: #FFF;
}

.search-bar::before {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 1px;
	background: #D8D8D8;
	transform: scaleY(0.5);
}

.searchBtnDefault {
	display: block;
	width: 14%;
	height: 100%;
	padding: 0 2%;
}

.btn-back {
	float: left;
	background: url('../assets/icon/topbar_back@2x.png') no-repeat center;
	background-size: 0.6rem;
}

.btn-search {
	float: right;
	background: url('../assets/icon/title_icon_search@2x.png') no-repeat center;
	background-size: 0.6rem;
}

.search-input::-webkit-input-placeholder {
	color: #999;
}

.search-input {
	width: 72%;
	height: 0.8rem;
	border: 1px solid #222;
	border-radius: 1rem;
	margin: 0.24rem auto;
	font-size: 0.32rem;
	padding: 0 4%;
}

/* store - info */

.store-info {
	width: 100%;
	height: 1.6rem;
	border-bottom: 1px solid #EEE;
	overflow: hidden;
	background-color: #FFF;
}

.info-img {
	float: left;
	position: relative;
	width: 1rem;
	height: 1rem;
	border-radius: 0.05rem;
	margin: 0.3rem 0.3rem 0.3rem 0.4rem;
}
.info-img img {
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 0.05rem;
	max-width: 100%;
}

.info-name {
	float: left;
	line-height: 1.6rem;
	font-size: 0.45rem;
	font-weight: 600;
	color: #222;
	max-width: 50%;
}

.info-btn {
	height: 100%;
	float: right;
	margin-right: 2%;
}

.info-btn li {
	float: left;
	width: 1.4rem;
	height: 100%;
	text-align: center;
	font-size: 0.35rem;
	padding: 0.15rem 0.3rem 0;
}
.info-btn li i {
	display: block;
	width: 0.8rem;
	height: 0.8rem;
	margin-bottom: 0.05rem;
}

.btn-praise  {
	background: url('../assets/icon/common_like_press@2x.png') center no-repeat;
	background-size: 0.7rem;
}
.btn-collect  {
	background: url('../assets/icon/common_collection_press@2x.png') center no-repeat;
	background-size: 0.7rem;
}

/* commodity-list */
.store-list {
	width: 100%;
	height: auto;
	margin-left: 1.5%;
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

/* sort-filter */
.sort-filter {
	position: relative;
}
.mask {
	position: absolute;
	display: block;
	top: 1.4rem;
	right: 0;
	bottom: 1.4rem;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 19;
	background-color: rgba(0,0,0,0.5);
}


</style>