<template>
	<div class="store">
		<div class="search-bar">
			<span class="searchBtnDefault btn-back" @click="toBack()"></span>
			<input class="search-input" type="text" v-model="searchKey" placeholder="请输入关键字" @click="toSearch"/>
			<span class="searchBtnDefault btn-search" @click="toSearch"></span>
		</div>
		<section class="sort-filter">
			<ul class="selection">
				<li class="selection-item" v-for="(item, index) in dataSortInit" :key="item.name" :class="[item.class, {active: item.active},{up: item.up}]" @click="choose(index)">
					{{ item.name }}
				</li>
			</ul>
			<aside class="sort" :class="{active: isSortList}" >
				<p v-for="(item,index) in dataSelectInit" @click="toSortPrice(index)" :class="{active: (index+1) == searchProductKey.sort}">{{item}}</p>
			</aside>
			<aside class="classify" :class="{active: isClassify}">
				<h1 class="classify-title">
				 	品牌
				 	<i class="arrow-down" :class="{active: brandarrow}" @click="brandarrow = !brandarrow"></i>
				</h1>
				<ol class="classify-name clear" :class="{active: brandarrow}">
					<dd v-for="(item,index) in brandsList" :class="{active: index === brandSelect}" @click="brandSelectResolve(index,item.Title)">{{ item.Title }}</dd>
				</ol>
				<h1 class="classify-title">
					价格区间
				</h1>
				<ol class="classify-price clear">
					<dd><input type="number" placeholder="最低价" v-model="priceMin"></dd>
					<dd class="classify-price-line">-</dd>
					<dd><input type="number" placeholder="最高价" v-model="priceMax"></dd>
				</ol>
				<h1 class="classify-title">
					内存
					<i class="arrow-down" :class="{active: memoryArrow}" @click="memoryArrow = !memoryArrow"></i>
				</h1>
				<ol class="classify-capacity clear" :class="{active: memoryArrow}">
					<dd v-for="(item,index) in memoryList" :class="{active: index === memorySelect}" @click="memorySelectResolve(index,item.Title)">{{item.Title}}</dd>
				</ol>
				<h1 class="classify-title">
					机身颜色
					<i class="arrow-down" :class="{active: colorArrow}" @click="colorArrow = !colorArrow"></i>
				</h1>
				<ol class="classify-color clear" :class="{active: colorArrow}">
					<dd v-for="(item,index) in colorList" :class="{active: index === colorSelect}" @click="colorSelectResolve(index,item.Title)">{{ item.Title }}</dd>
				</ol>
				<div class="classify-btn">
					<button class="classify-btn-reset" @click="reset">重置</button>
					<button class="classify-btn-confirm" @click="confirm">确定</button>
				</div>
			</aside>
			<div class="mask" v-show="isMask" @click="isSortList = isClassify = isMask = false;"></div>
			<ul class="store-list clear">
			<li class="store-item" v-for="item in commodityList" @click="toProduct(item.ProductUrl)">
				<div class="item-image">
					<img :src="item.ImgUrl">
				</div>
				<h1 class="item-title">{{ item.ProductTitle }}</h1>
				<p class="item-desc">
					<span class="item-price">
						{{ item.SellPrice | currency }}
					</span>
					<span class="item-num">
						月销量&nbsp;{{ item.SellCount }}
					</span>
				</p>
			</li>
		</ul>
		<div class="data-none" v-show="dataNone"> 抱歉，没有匹配到相关商品 </div>
		<infinite-scroll :scroller="scroller" :loading="loading" @load="loadmore" :loading-end="isLoadEnd"></infinite-scroll>
		</section>
		<navigation></navigation>
	</div>
</template>
<script>
	import storeList from '@/components/store/storeList'
	import navigation from '@/components/common/navigation'
	import infiniteScroll from '@/components/common/infiniteScroll'
	import { mapState } from 'vuex'
	import { appkey } from '../config/env'
	import { addStoreSuperb, addStoreCollect, searchProductList, getSearchAttrList } from '../service/getData'
	export default {
		name: 'store',
		data() {
			return {
				commodityList: [],
				dataSortInit: [		// 筛选数据初始化
					{name: '综合', class: 'total', up: false, active:true },
					{name: '距离', class: 'arrow-up', up: false, active:false },
					{name: '价格', class: 'arrow-up',  up: false, active:false },
					{name: '店铺', class: 'screen', up:false,  active:false },
					{name: '筛选', class: 'screen ',  up: false, active:false },
				],
				dataSelectInit: ['综合排序', '距离', '价格'],	//下拉框
				dataAttr: [],
				isMask: false,
				closeMask: false,
				loading: false,				//显示加载
				isLoadEnd: false,			// 加载完毕
				scroller: null,       // 加载更多
				dataNone: false,			// 数据为空时显示
				isSortList: false,		//综合
				isClassify: false,		// 筛选
				priceMin: '',					// 最低价
				priceMax: '',					// 最高价			
				brandarrow: false, 		//品牌下拉列表
				memoryArrow: false,		//内存下拉列表
				colorArrow: false,		//颜色下拉列表
				brandSelect: null,		// 选中品牌
				memorySelect: null,		// 选中内存
				colorSelect: null,		// 选中颜色
				searchProductKey: {
					appkey: appkey,
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
				searchKey: '',
			}
		},
		computed: {
			...mapState({
				token: state => state.home.token,
			}),
			colorList() {
				return this.dataAttr[0]
			},
			memoryList() {
				return this.dataAttr[1]
			},
			brandsList() {
				return this.dataAttr[2]
			},
		},
		components: {
			storeList,
			navigation,
			infiniteScroll,
		},
		created() {
			this.init();		// 获取token
			this.searchKey = this.$route.query.name;
			this.searchProductKey.brandName = this.$route.query.name;
			this.searchProductKey.storeid = this.$route.query.storeid || 0;
			this.reloadCommodity();
			this.getAttrList();
		},
		mounted() {
			this.scroller = this.$el;
		},
		filters: {
			currency(value) {
				return '￥' + parseFloat(value).toFixed(2);
			}
		},
		methods: {
			init() {
				if (!this.token) {
					let tokenCookie = this.readCookie('USERTOKEN');
					this.$store.dispatch('recordToken', tokenCookie);
				}
			},
			readCookie(name) {
		    var nameEQ = name + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		    }
			  return null;
			},
			// 点赞
			async toPraise() {
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
				this.$router.push({path:'search', query:{storeid:0}});
			},
			// 重新加载 商品列表 
			async reloadCommodity(searchkey) {
				console.info('reloadNearbyStore' + JSON.stringify(searchkey));
				this.isLoadEnd = false;
				let commodityListData = await searchProductList(this.searchProductKey);
				this.commodityList = commodityListData.Data;
				this.dataNone = this.commodityList.length ? false : true;
			},
			// 加载更多
			loadmore() {
				let self = this;
				this.loading = true;
				setTimeout(() => {
					this.searchProductKey.pageindex++;
					console.log('reload - list');
					self.getMore();
				},500);
			},
			// 获取更多
			async getMore() {
				const data = await searchProductList(this.searchProductKey);
				data.Data.forEach(item => {
					this.commodityList.push(item);
				});
				if (data.PageIndex > data.TotalPage) this.isLoadEnd = true;
				this.loading = false;
			},
			// 获取筛选栏-属性列表
			async getAttrList() {
				let dataAttrData = await getSearchAttrList();
				this.dataAttr = dataAttrData.Data;
				// console.info('attrData', this.dataAttr);
			},
			// 跳转到商品详情
			toProduct(url) {
				window.location.href = url;
			},
			toBack() {
				this.$router.go(-1);
			},
			// 切换筛选
			choose(index) {
				this.searchProductKey.pageindex = 1;
				let active = this.dataSortInit[index].active;
				let up = this.dataSortInit[index].up;
				this.dataSortInit.forEach((item,index) => {
					this.dataSortInit[index].active = false;
				})
				switch(index) {
					case 0: 
						this.reset();
						this.isMask = true;
						this.isClassify = false;
						this.isSortList = true;
						this.dataSortInit[0].active = true;
						return
					case 1: 
						this.reset();
						this.isMask = false;
						this.isSortList = false;
						this.isClassify = false;
						if (!active) {
							this.searchProductKey.sort = 2;
							this.dataSortInit[1].up ? this.searchProductKey.sequence = 0 : this.searchProductKey.sequence = 1;
							this.reloadCommodity();
						} else {
							this.dataSortInit[1].up = !up;
							this.dataSortInit[1].up ? this.searchProductKey.sequence = 0 : this.searchProductKey.sequence = 1;
							this.reloadCommodity();
						}
						this.dataSortInit[1].active = true;
						return
					case 2: 
						this.reset();
						this.isMask = false;
						this.isSortList = false;
						this.isClassify = false;
						if (!active) {
							this.searchProductKey.sort = 3;
							this.dataSortInit[2].up ? this.searchProductKey.sequence = 0 : this.searchProductKey.sequence = 1;							
							this.reloadCommodity();
						} else {
							this.dataSortInit[2].up = !up;
							this.dataSortInit[2].up ? this.searchProductKey.sequence = 0 : this.searchProductKey.sequence = 1;
							this.reloadCommodity();
						}
						this.dataSortInit[2].active = true;
						return
					case 3: 
						this.$router.push('storelist');
						return
					case 4: 
						this.isMask = true;
						this.isClassify = true;
						this.isSortList = false;
						this.dataSortInit[3].active = true;
						return
				}
			},
			// 综合排序
			toSortPrice(index) {
				this.searchProductKey.sort = index + 1;
				this.isMask = false;
				this.dataSortInit[0].active = true;
				this.isSortList = false;
				this.reloadCommodity();
			},
			// 重置
			reset() {
				this.colorSelect = null;
				this.brandSelect = null;
				this.memorySelect = null;
				this.searchProductKey.brandName = '';
				this.searchProductKey.minPrice = '';
				this.searchProductKey.maxPrice = '';
				this.priceMin = '';
				this.priceMax = '';
				this.searchProductKey.memory = '';
				this.searchProductKey.color = '';
				this.searchProductKey.pageIndex = 1;
			},
			// 确认筛选
			confirm() {
				if (this.priceMax < this.priceMin) this.priceMax = "";
				this.searchProductKey.priceMin = this.priceMin;
				this.searchProductKey.priceMax = this.priceMax;
				console.log('searchProductKey', this.searchProductKey);

				this.isClassify = false;
				this.isMask = false;
				this.reloadCommodity();
			},
			colorSelectResolve(index, title) {
				if (index == this.colorSelect) {
					this.colorSelect = null;
					this.searchProductKey.color = '';
				} else {
					this.colorSelect = index;
					this.searchProductKey.color = title;
				}
				console.log(this.colorSelect,this.searchProductKey.color);
			},
			memorySelectResolve(index, title) {
				if (index == this.memorySelect) {
					this.memorySelect = null;
					this.searchProductKey.memory = '';
				} else {
					this.memorySelect = index;
					this.searchProductKey.memory = title;
				}
				console.log(this.memorySelect,this.searchProductKey.memory);
			},
			brandSelectResolve(index, title) {
				if (index == this.brandSelect) {
					this.brandSelect = null;
					this.searchProductKey.brandName = '';
				} else {
					this.brandSelect = index;
					this.searchProductKey.brandName = title;
				}
				console.log(this.brandSelect,this.searchProductKey.brandName);
			}
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


/* commodity-list */
.store-list {
	width: 100%;
	height: auto;
	margin-left: 1.5%;
	padding-top: 0.15rem;
}
.store-item {
	position: relative;
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
	background-color: #FFF;
	overflow: hidden;
}
.item-image img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	max-width: 100%;
}

.item-title {
	font-size: 0.4rem;
	max-height: 1.1rem;
	overflow: hidden;
	line-height: 0.6rem;
}

.item-desc {
	position: absolute;
	display: flex;
	justify-content: space-between;
	bottom: 0.1rem;
	left: 0;
	right: 0;
	padding: 0 4%;
}

.item-price {
	line-height: 0.8rem;
	font-size: 0.4rem;
	color: #E52951;
}
.item-num {
	line-height: 0.8rem;
	color: #999;
	font-size: 0.3rem;
}

/* sort-filter */
.sort-filter {
	position: relative;
	width: 100%;
	height: 100%;
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
/* 筛选 */

.selection {
	background-color: #FFF;
	height: 1.4rem;
}
.selection::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 1px;
	background-color: #D8D8D8;
	transform: scaleY(0.5);
}

.selection-item {
	float: left;
	position: relative;
	width: 20%;
	height: 100%;
	text-align: center;
	line-height: 1.4rem;
	color: #333;
}

.arrow-up::before,
.selection-item::after {
	content: '';
	position: absolute;
	right: 19%;
	display: block;
	width: 0;
	height: 0;
	border: 0.15rem solid transparent;
}
.arrow-up::before {
	top: 0.4rem;
	opacity: 0.4;
	border-bottom-color: #333;
}
.selection-item::after {
	top: 0.75rem;
	border-top-color: #333;
}

.up::after {
	opacity: 0.4;
}
.up::before {
	opacity: 1;
}

.selection-item.active {
	color: #E40277;
}
.selection-item.active::before {
	border-bottom-color: #E40277;
}
.selection-item.active::after {
	border-top-color: #E40277;
}

.total::after ,
.screen::after {
	top: 0.65rem;
}

/* 下拉菜单 */
.sort {
	display: none;
	position: absolute;
	padding: 0.1rem 5% 0;
	top: 1.4rem;
	visibility: hidden;
	/* transform: translate3d(0, -2rem, 0); */
	left: 0;
	width: 100%;
	height: 2rem;
	z-index: 20;
	line-height: 0.6rem;
	color: inherit;
	/* transition: transform 0.3s ease; */
	background-color: #fff;
	border-bottom: 1px solid #EEE;
}

.sort.active {
	visibility: visible;
	display: block;
	/* transform: translate3d(0, 0, 0); */
}

.sort p.active {
	color: #E40277;
}

.classify {
	display: none;
	position: absolute;
	right: 0;
	top: 1.4rem;
	width: 60%;
	height: auto;
	z-index: 20;
	line-height: 0.6rem;
	background-color: #FFF;
}
.classify.active {
	display: block;
}

.classify h1 {
	position: relative;
	font-size: 0.35rem;
	font-weight: 600;
	line-height: 0.8rem;
	padding: 0 2%;
}
.classify ol {
	display: flex;
	padding: 0 2%;
	justify-content: space-around;
	flex-wrap: wrap;
}

.classify .classify-price {
	display: flex;
	justify-content: space-around;
	
}
.classify .classify-price dd {
	float: left;
	width: 30%;
	height: 0.5rem;
	margin: 0;
	padding: 0;
}

.classify dd.active {
	border-color: #E52951;
	background-color: #E52951;
	color: #FFF;
}

.classify-price input {
	display: block;
	width: 100%;
	height: 100%;
	text-align: center;
	border-radius: 0.03rem;
	border: 1px;
}


.classify dd {
	padding: 0.01rem 0.1rem;
	border: 1px solid #EEE;
	border-radius: 0.04rem;
	font-size: 0.28rem;
	margin: 0.06rem;
}
.classify-btn {
	display: flex;
	width: 100%;
	height: 1rem;
	margin-top: 0.4rem;
}
.classify-btn button {
	display: block;
	width: 50%;
	height: 1rem;
	border-right: 1px solid #eee;
}
.classify-btn-reset {
	border: 1px solid #E52951;
	background-color: #FFF;
	color: #E52951;
}
.classify-btn-confirm {
	background-color: #E52951;
	color: #FFF;
}


/* brands */
.classify .classify-name {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	height: 0.75rem;
	overflow-y: scroll;
	transition: height 0.3s ease;
}
.classify .classify-name.active {
	height: 3rem;
}

 .arrow-down {
	position: absolute;
	right: 0;
	top: 0;
	display: block;
	width: 0.8rem;
	height: 0.8rem;
	margin-right: 0.2rem;
	background: url('../assets/icon/arrow_down.png') no-repeat center;
	background-size: 0.6rem;
	transform: rotate(-90deg);
	transition: transform 0.3s ease;
}
.arrow-down.active {
	transform: rotate(0deg);
}

 .classify .classify-price	.classify-price-line {
 	border: none;
 	text-align: center;
 	width: 20%;
 }


.classify .classify-capacity {
	height: 0.75rem;
	overflow-y: scroll;
	transition: height 0.3s ease;
}
.classify .classify-color {
	height: 0.75rem;
	overflow-y: scroll;
	transition: height 0.3s ease;
}

.classify .classify-capacity.active {
	height: 1.5rem;
}

.classify .classify-color.active {
	height: 3rem;
}
/* 匹配不到数据 */
.data-none {
	width: 100%;
	height: 1.28rem;
	line-height: 1.2rem;
	text-align: center;
	font-size: 0.35rem;
	background-color: #FFF;
}


</style>