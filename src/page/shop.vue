<script src="../../../vue-demo/src/main.js"></script>
<template>
	<div class="store">
		<div class="search-bar">
			<span class="searchBtnDefault btn-back" @click="toBack()"></span>
			<input class="search-input" type="text" v-model="keyword" placeholder="请输入关键字" @click="toSearch"/>
			<span class="searchBtnDefault btn-search" @click="searchNow"></span>
		</div>
		<section class="store-info">
			<div class="info-img">
				<img :src="storeInfo.logo">
			</div>
			<h1 class="info-name ellipsis">{{ storeInfo.name }}</h1>
			<ul class="info-btn">
				<li @click="toPraise">
					<i v-show="!isLike" class="btn-praise-nor" :class="{active: isLike}"></i>
          <i v-show="isLike" class="btn-praise-press" :class="{active: isLike}"></i>
          点赞
				</li>
				<li @click="toCollect">
					<i v-show="!isCollect" class="btn-collect-nor" :class="{active: isCollect}"></i>
          <i v-show="isCollect" class="btn-collect-press" :class="{active: isCollect}"></i>
					收藏
				</li>
			</ul>
		</section>
		<div class="mask" v-show="isMask" @click="isSortList = isClassify = isMask = false;"></div>
		<section class="sort-filter">
			<ul class="selection">
				<li class="selection-item" v-for="(item, index) in dataSortInit" :key="item.name" :class="[item.class, {active: item.active},{up: item.up}]" @click="choose(index)">
					{{ item.name }}
				</li>
			</ul>
			<aside class="sort" :class="{active: isSortList}" >
				<p v-for="(item,index) in dataSelectInit" @click="toSortPrice(index)" :class="{active: index == simpleSort}">{{item}}</p>
			</aside>
			<aside class="classify" :class="{active: isClassify}">
				<h1 class="classify-title">
				 	品牌
				 	<i class="arrow-down" :class="{active: brandarrow}" @click="brandarrow = !brandarrow"></i>
				</h1>
				<ol class="classify-name" :class="{active: brandarrow}">
					<dd v-for="(item,index) in brandsList" :class="{active: index === brandSelect}" @click="brandSelectResolve(index,item.Title)">{{ item.Title }}</dd>
				</ol>
				<h1 class="classify-title">
					价格区间
				</h1>
				<ol class="classify-price">
					<dd><input type="number" placeholder="最低价" v-model.number="searchProductKey.minPrice"></dd>
					<dd class="classify-price-line">-</dd>
					<dd><input type="number" placeholder="最高价" v-model.number="searchProductKey.maxPrice"></dd>
				</ol>
				<h1 class="classify-title">
					内存
					<i class="arrow-down" :class="{active: memoryArrow}" @click="memoryArrow = !memoryArrow"></i>
				</h1>
				<ol class="classify-capacity" :class="{active: memoryArrow}">
					<dd v-for="(item,index) in memoryList" :class="{active: index === memorySelect}" @click="memorySelectResolve(index,item.Title)">{{item.Title}}</dd>
				</ol>
				<h1 class="classify-title">
					机身颜色
					<i class="arrow-down" :class="{active: colorArrow}" @click="colorArrow = !colorArrow"></i>
				</h1>
				<ol class="classify-color" :class="{active: colorArrow}">
					<dd v-for="(item,index) in colorList" :class="{active: index === colorSelect}" @click="colorSelectResolve(index,item.Title)">{{ item.Title }}</dd>
				</ol>
				<div class="classify-btn">
					<button class="classify-btn-reset" @click="reset">重置</button>
					<button class="classify-btn-confirm" @click="confirm">确定</button>
				</div>
			</aside>

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
							销量&nbsp;{{ item.SellCount }}
						</span>
					</p>
				</li>
		</ul>
		<div class="data-none" v-show="dataNone">抱歉！未搜到您所需要的内容，可尝试换个关键字试试哦！</div>
		<infinite-scroll :scroller="scroller" :loading="loading" @load="loadmore" :loading-end="isLoadEnd"></infinite-scroll>
		</section>
		<navigation :about="true"></navigation>
	</div>
</template>
<script>
	import storeList from '@/components/store/storeList'
	import navigation from '@/components/common/navigation'
	import infiniteScroll from '@/components/common/infiniteScroll'
	import { mapState } from 'vuex'
	import { appkey } from '../config/env'
	import { addStoreSuperb, addStoreCollect, searchProductList, getSearchAttrList, GetCollectSotres } from '../service/getData'
	export default {
		name: 'shop',
		data() {
			return {
				keyword: '',
				commodityList: [],
				dataSortInit: [		// 筛选数据初始化
					{name: '综合', class: 'total', up: false, active:true },
					{name: '价格', class: 'arrow-up', up: true, active:false },
					{name: '销量', class: 'arrow-up',  up: true, active:false },
					{name: '筛选', class: 'screen ',  up: false, active:false },
				],
				dataSelectInit: ['综合排序', '价格从低到高', '价格从高到低'],	//下拉框
				dataAttr: [],
				isMask: false,
				closeMask: false,
				loading: false,				//显示加载
				isLoadEnd: false,			// 加载完毕
				scroller: null,       // 加载更多
				dataNone: false,			// 数据为空时显示
				isSortList: false,		//综合
				simpleSort: 0,				// 筛选-默认综合
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
					keyword: '',
					brandName: '',  // string	品牌名称
					maxPrice: '',		// string	价格区间最大值
					minPrice: '',   // string	价格区间最小值
					color: '', 			// string	颜色
					memory: ''     // string	内存
				},
				isCollect: false,
				isLike: false,
			}
		},
		computed: {
			...mapState({
				storeInfo: state => state.home.storeInfo,
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
			this.init();
			this.keyword = this.$route.query.name || '';
			this.searchProductKey.keyword = this.$route.query.name || '';
			this.searchProductKey.storeid = this.storeInfo.id;
			this.reloadCommodity();
			this.getAttrList();;
      this.getCollect();
		},
		mounted() {
			this.scroller = this.$el;
			document.body.scrollTop = 0
		},
		filters: {
			currency(value) {
				return '￥' + parseFloat(value).toFixed(2);
			}
		},
		methods: {
			init() {
				console.warn('token', this.token);
				if (!this.token) {
					console.warn('token-if', this.token);
					this.$store.dispatch('recordToken',this.readCookie('USERTOKEN'));
				}
				if (JSON.stringify(this.storeInfo).length < 3) {
					let storeInfoTemp = JSON.parse(this.readCookie('storeInfo'));
					this.$store.dispatch('recordStoreInfo',storeInfoTemp);
		 			this.storeInfo = storeInfoTemp;
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
				let params =  {
					appkey: appkey,
					token: this.token,
					storeId: this.storeInfo.id
				};
//				let praiseResult = await addStoreSuperb(params);
        let praiseResult = await addStoreSuperb(params);
//        console.log(praiseResult);
				if (praiseResult.ResultCode === 1000) {
          this.$toast('点赞成功！');
          this.isLike = true;
				} else if (praiseResult.ResultCode === 1009) {
				    this.$toast('未登录');
        }
//				console.log('praiseResult',praiseResult);
			},
			// 收藏
			async toCollect() {
				if (this.isCollect == 2) {
          this.$toast('您已收藏，看看别的店铺吧');
          return;
        } else if (this.isCollect == 1) {
          return;
        }
        this.isCollect = 1;
				let params =  {
					appkey: appkey,
					token: this.token,
					storeId: this.storeInfo.id
				};
				let collectResult = await addStoreCollect(params);
				if (collectResult.ResultCode === 1000) {
          this.$toast('收藏成功！');
          this.isCollect = 2;
				} else if (praiseResult.ResultCode === 1009) {
          this.$toast('未登录');
          this.isCollect = false;
        } else {
          this.isCollect = false;
        }
				console.log('collectResult',collectResult);
			},
      // 获取用户收藏的店铺
      async getCollect() {
        let params =  {
          appkey: appkey,
          token: this.token,
          pageSize:1000,
          pageIndex:1
        };
        let collectResult = await GetCollectSotres(params);
//        console.log(collectResult);
        console.log(this.storeInfo.id);
        console.log(collectResult.Data.filter(collect => collect.StoreID == this.storeInfo.id));
        this.isCollect = collectResult.Data.filter(collect => collect.StoreID == this.storeInfo.id).length > 0 ? 2 : false;
      },
			// 搜索
			toSearch() {
				this.$router.push({path:'/search', query:{storeid: this.storeInfo.id,name: this.keyword}});
			},
			// 开始搜索
			searchNow() {
				this.searchProductKey.pageindex = 1;
				this.searchProductKey.keyword = this.keyword;
				this.reloadCommodity();
			},
			// 重新加载 商品列表
			async reloadCommodity() {
				this.isLoadEnd = false;
				this.loading = true;
				let commodityListData = await searchProductList(this.searchProductKey);
				this.commodityList = commodityListData.Data;
				this.loading = false;
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
				console.log(this.token)
				console.warn(url+ '&token=' + this.token);
				window.location.href = url + '&token=' + this.token;
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
							this.searchProductKey.sort = 3;
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
							this.searchProductKey.sort = 2;
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
						this.isMask = true;
						this.isClassify = true;
						this.isSortList = false;
						this.dataSortInit[3].active = true;
						return
				}
			},
			// 综合排序
			toSortPrice(index) {
				switch (index) {
					case 0:
						this.simpleSort = 0;
						this.searchProductKey.sort = 1;
						this.searchProductKey.sequence = 0;
						this.isMask = false;
						this.dataSortInit[0].active = true;
						this.isSortList = false;
						this.reloadCommodity();
						return
					case 1:
						this.simpleSort = 1;
						this.searchProductKey.sort = 3;
						this.searchProductKey.sequence = 0;
						this.isMask = false;
						this.dataSortInit[0].active = true;
						this.isSortList = false;
						this.reloadCommodity();
						return
					case 2:
						this.simpleSort = 2;
						this.searchProductKey.sort = 3;
						this.searchProductKey.sequence = 1;
						this.isMask = false;
						this.dataSortInit[0].active = true;
						this.isSortList = false;
						this.reloadCommodity();
						return
				}
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
				if (this.searchProductKey.maxPrice < this.searchProductKey.minPrice) {
					this.searchProductKey.maxPrice = '';
				}
				// this.searchProductKey.minPrice = this.priceMin;
				// this.searchProductKey.maxPrice = this.priceMax;
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
	/*position: relative;*/
	width: 100%;
	background-color: #F4F4F4;
	padding-top:3rem;
}

/* search-bar */
.search-bar {
	position: fixed;
	top: 0;
	width: 100%;
	height: 1.28rem;
	background-color: #FFF;
	z-index: 9;
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
	border: 1px solid #999;
	border-radius: 1rem;
	margin: 0.24rem auto;
	font-size: 0.32rem;
	padding: 0 4%;
}

/* store - info */

.store-info {
	position: fixed;
	top: 1.28rem;
	width: 100%;
	height: 1.6rem;
	border-bottom: 1px solid #EEE;
	overflow: hidden;
	background-color: #FFF;
	z-index: 9;
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
	transition: background 0.3s;
}

.btn-praise-nor  {
	background: url('../assets/icon/common_like_nor@2x.png') center no-repeat;
	background-size: 0.7rem;
}

.btn-praise-press  {
  background: url('../assets/icon/common_like_press@2x.png') center no-repeat;
  background-size: 0.7rem;
}

.btn-praise.active {
	animation: tipMove 0.3s;
}
.btn-collect-nor  {
	background: url('../assets/icon/common_collection_nor@2x.png') center no-repeat;
	background-size: 0.7rem;
}

.btn-collect-press  {
  background: url('../assets/icon/common_collection_press@2x.png') center no-repeat;
  background-size: 0.7rem;
}
.btn-collect.active  {
	animation: tipMove 0.3s;
}

@keyframes tipMove{
   0%   { background-size: 0.7rem }
   35%  { background-size: 1rem }
   70%  { background-size: 0.8rem  }
   100% { background-size: 0.7rem }
}


/* commodity-list */
.store-list {
	width: 100%;
	padding-top: 0.15rem;
}
.store-item {
	position: relative;
	float: left;
	margin: 0.08rem 0 0.08rem 2%;
	width: 47%;
	height: 6.64rem;
	border: 1px solid #EEE;
	border-radius: 0.04rem;
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
}
.mask {
	position: absolute;
	display: block;
	top: 4.28rem;
	right: 0;
	bottom: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 19;
	background-color: rgba(0,0,0,0.5);
}
/* 筛选 */

.selection {
	position: relative;
	background-color: #FFF;
	height: 1.4rem;
	padding-right: 3%;
}
.selection::after {
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

.selection-item {
	float: left;
	position: relative;
	width: 25%;
	height: 100%;
	text-align: center;
	line-height: 1.4rem;
	color: #333;
}

.arrow-up::before,
.selection-item::after {
	content: '';
	position: absolute;
	right: 16%;
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
