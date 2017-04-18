<template>
	<div class="storelist">
		<header class="search-bar">
			<span class="searchBtnDefault btn-back" @click="toBack"></span>
			<input class="search-input" type="text" placeholder="请输入关键字" @click="toSearch"/>
			<span class="searchBtnDefault btn-search" @click="toSearch"></span>
		</header>
		<!-- <sort-list></sort-list> -->
		<section class="sort-filter">
			<ul class="selection">
				<li class="selection-item" v-for="(item, index) in dataSortInit" :key="item.name" :class="[item.class, {active: item.active},{up: item.up}]" @click="choose(index)">
					{{ item.name }}
				</li>
			</ul>
			<aside class="sort" :class="{active: isSortList}" >
				<p v-for="(item,index) in dataSelectInit" @click="toSortPrice(index)" :class="{active: (index+1) == searchStoreKey.sort}">{{item}}</p>
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
					<button class="classify-btn-confirm " @click="confirm">确定</button>
				</div>
			</aside>
			<div class="mask" v-show="isMask" @click="isSortList = isClassify = isMask = false;"></div>

			<ul class="nearby-list">
				<li v-for="item in nearbyListData" class="nearby-item" :key="item.StoreID" @click="toStore(item.StoreName,item.StoreID,item.StoreLogo)">
					<div class="img">
						<img :src="item.StoreLogo" >
					</div>
					<div class="desc">
						<h1 class="ellipsis">{{ item.StoreName }}</h1>
						<p class="desc-item">
							<span>月销量&nbsp;{{ item.SellCount }}</span>
							<span class="item-distance" v-show="searchStoreKey.lat && searchStoreKey.lng">&lt;&nbsp;{{ item.Distanct }}&nbsp;km</span>
							<span class="item-distance" v-show="!(searchStoreKey.lat && searchStoreKey.lng)">&nbsp;0&nbsp;km</span>
						</p>
						<button class="btn-map" @click.stop="toMap(item.StoreName, item.CoordsX, item.CoordsY)">到这里去</button>
					</div>
				</li>
			</ul>
			<div class="data-none" v-show="dataNone"> 抱歉，没有匹配到相关店铺 </div>
		<infinite-scroll :scroller="scroller" :loading="loading" @load="loadmore" :loading-end="isLoadEnd"></infinite-scroll>
	</section>
		<!-- <nearby-list></nearby-list> -->

		<navigation></navigation>
	</div>
</template>

<script>
// import searchBar from '@/components/search/searchBar'
// import sortList from '@/components/home/sortList'
// import nearbyList from '@/components/home/nearbyList'
import navigation from '@/components/common/navigation'
// 加载更多
import infiniteScroll from '@/components/common/infiniteScroll'
// 获取数据
import { searchStoreList, getSearchAttrList } from '@/service/getData'
import { appkey } from '@/config/env'
import { mapState } from 'vuex'

export default {
	name: 'store-list',
	components: {
		// searchBar,
		// sortList,
		// nearbyList,
		infiniteScroll,
		navigation,
	},
	data() {
		return {
			token: '2eba04f0df7348769233ece29b670d10', //user-sessionkey
			isMask: false,				// 遮罩
			isScroll: false,			// 是否滚动
			scroller: null,				// window对象
			loading: true,				// 是否显示loading
			showType: 0,					// 今日推荐模式
			recommendData: [],		// 今日推荐
			nearbyListData: [],		// 店铺列表
			dataAttr: [],					// 筛选数据
			dataNone: false, 			// 数据为空时显示
			isSortList: false,		// 综合
			isClassify: false,		// 筛选
			priceMin: '',					// 最低价
			priceMax: '',					// 最高价			
			brandarrow: false, 		// 品牌下拉列表
			memoryArrow: false,		// 内存下拉列表
			colorArrow: false,		// 颜色下拉列表
			brandSelect: null,		// 选中品牌
			memorySelect: null,		// 选中内存
			colorSelect: null,		// 选中颜色
			searchStoreKey: {
				appkey: appkey, 
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
			dataSortInit: [		// 筛选数据初始化
				{name: '综合', class: 'total', up: false, active:true },
				{name: '距离', class: 'arrow-up', up: false, active:false },
				{name: '销量', class: 'arrow-up',  up: false, active:false },
				{name: '筛选', class: 'screen ',  up: false, active:false },
			],
			dataSelectInit: ['综合排序', '距离', '销量'],	//下拉框
			isLoadEnd: false,
		}
	},
	computed: {
		...mapState({
			userLocal: state => state.home.userLocal,
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
	created() {
		this.getlocalation();
		// this.reloadNearbyStore();
		this.getAttrList();
	},
	mounted() {
		this.scroller = this.$el;
	},
	methods: {
		toBack() {
			this.$router.go(-1);
		},
		toSearch() {
			this.$router.push({path:'search', query:{storeid:0}});
		},
		// 获取筛选栏-属性列表
		async getAttrList() {
			let dataAttrData = await getSearchAttrList();
			this.dataAttr = dataAttrData.Data;
			// console.info('attrData', this.dataAttr);
		},
		// 加载更多
		loadmore() {
			let self = this;
			this.loading = true;
			setTimeout(() => {
				this.searchStoreKey.pageIndex++;
				console.log('reload - list');
				self.getNearbyStore();
			},500);
		},
		// 重新加载 附近商店列表 
		async reloadNearbyStore() {
			this.loading = true;
			this.isLoadEnd = false;
			this.searchStoreKey.pageIndex = 1;
			let nearbyListData = await searchStoreList(this.searchStoreKey);
			this.loading = false;
			this.nearbyListData = nearbyListData.Data;
			if (nearbyListData.PageIndex >= nearbyListData.totalPage ) this.isLoadEnd = true;
			this.dataNone = this.nearbyListData.length ? false : true;
		},
		// 获取 附近商店列表
		async getNearbyStore() {
			const data = await searchStoreList(this.searchStoreKey);
			data.Data.forEach(item => {
				this.nearbyListData.push(item);
			});
			if (data.PageIndex > data.TotalPage) this.isLoadEnd = true;
			this.loading = false;
		},
		// 获取筛选栏-属性列表
		async getAttrList() {
			let dataAttrData = await getSearchAttrList();
			this.dataAttr = dataAttrData.Data;
		},
		// 获取用户地理位置
		async getlocalation() {
			this.loading = true;
			var options={enableHighAccuracy:true, maximumAge:1000 }
      if(navigator.geolocation){
      await navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError,options);  //浏览器支持geolocation\
      }else{
        alert('您的浏览器不支持地理位置定位');  //浏览器不支持geolocation
      }
		},
		// 获取地理位置成功回调
    onSuccess(position){
    	this.searchStoreKey.lng = position.coords.longitude;  //返回用户位置  //经度
      this.searchStoreKey.lat = position.coords.latitude;   //纬度
      this.reloadNearbyStore();
      let userLocal = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.$store.dispatch('recordUserLocal', userLocal);
      return 
       // 根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
       // alert('经度'+this.searchStoreKey.lng +'，纬度'+this.searchStoreKey.lat); 
    },
    // 获取地理位置失败回调
 		onError(error){
 			this.reloadNearbyStore();
 			return
      // switch(error.code){
       /* case 1: alert("位置服务被拒绝"); break;
        case 2: alert("暂时获取不到位置信息"); break;
        case 3: alert("获取信息超时"); break;
        case 4: alert("未知错误"); break;*/
    	// },
  	},
  	// 跳转到地图 - 到这里去
  	toMap(name,storelat,storelng) {
  		let local = {
  			storename: name,
				userlat: this.searchStoreKey.lat,
				userlng: this.searchStoreKey.lng,
				storelat: storelat, 
				storelng: storelng, 
  		};
  		this.$store.dispatch('recordStoreLocal', local);
  		this.$router.push({path:'map', query:{name:name,lat:location.lat,lng:location.lng}});
  	},
  	// 切换筛选
		choose(index) {
			this.isLoadEnd = false;
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
						this.searchStoreKey.sort = 2;
						this.dataSortInit[1].up ? this.searchStoreKey.sequence = 0 : this.searchStoreKey.sequence = 1;
						this.reloadNearbyStore();
					} else {
						this.dataSortInit[1].up = !up;
						this.dataSortInit[1].up ? this.searchStoreKey.sequence = 0 : this.searchStoreKey.sequence = 1;
						this.reloadNearbyStore();
					}
					this.dataSortInit[1].active = true;
					return
				case 2: 
					this.reset();
					this.isMask = false;
					this.isSortList = false;
					this.isClassify = false;
					if (!active) {
						this.searchStoreKey.sort = 3;
						this.dataSortInit[2].up ? this.searchStoreKey.sequence = 0 : this.searchStoreKey.sequence = 1;							
						this.reloadNearbyStore();
					} else {
						this.dataSortInit[2].up = !up;
						this.dataSortInit[2].up ? this.searchStoreKey.sequence = 0 : this.searchStoreKey.sequence = 1;
						this.reloadNearbyStore();
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
			this.searchStoreKey.sort = index + 1;
			this.isMask = false;
			this.dataSortInit[0].active = true;
			this.isSortList = false;
			this.reloadNearbyStore();
		},
		// 重置
		reset() {
			this.colorSelect = null;
			this.brandSelect = null;
			this.memorySelect = null;
			this.searchStoreKey.brandName = '';
			this.searchStoreKey.minPrice = '';
			this.searchStoreKey.maxPrice = '';
			this.priceMin = '';
			this.priceMax = '';
			this.searchStoreKey.memory = '';
			this.searchStoreKey.color = '';
			this.searchStoreKey.pageIndex = 1;
		},
		// 确认筛选
		confirm() {
			if (this.priceMax < this.priceMin) this.priceMax = this.priceMin;
			this.searchStoreKey.priceMin = this.priceMin;
			this.searchStoreKey.priceMax = this.priceMax;
			console.log('searchStoreKey', this.searchStoreKey);

			this.isClassify = false;
			this.isMask = false;
			this.reloadNearbyStore();
		},
		colorSelectResolve(index, title) {
			if (index == this.colorSelect) {
				this.colorSelect = null;
				this.searchStoreKey.color = '';
			} else {
				this.colorSelect = index;
				this.searchStoreKey.color = title;
			}
			console.log(this.colorSelect,this.searchStoreKey.color);
		},
		memorySelectResolve(index, title) {
			if (index == this.memorySelect) {
				this.memorySelect = null;
				this.searchStoreKey.memory = '';
			} else {
				this.memorySelect = index;
				this.searchStoreKey.memory = title;
			}
			console.log(this.memorySelect,this.searchStoreKey.memory);
		},
		brandSelectResolve(index, title) {
			if (index == this.brandSelect) {
				this.brandSelect = null;
				this.searchStoreKey.brandName = '';
			} else {
				this.brandSelect = index;
				this.searchStoreKey.brandName = title;
			}
			console.log(this.brandSelect,this.searchStoreKey.brandName);
		}
	}
}
</script>
<style scoped>

.storelist {
	width: 100%;
	height: 100%;
	padding-bottom: 1.4rem;
	/*background-color: #F4F4F4;*/
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
/* sort  */
/* 遮罩处理 */
.section-item-mask,
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
/* section-item-mask */
.selection {
	position: relative;
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
	background: #DDD;
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
/* nearbylist */
.nearby-item {
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
	line-height: 0.8rem;
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
	position: relative;
	z-index: 10;
	float: right;
	margin-top: 0.2rem;
	display: block;
	width: 2.2rem;
	height: 0.7rem;
	line-height: 0.65rem;
	text-align: center;
	color: #E52951;
	background-color: #FFF;
	border: 1px solid #E52951;
	border-radius: 0.06rem;
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