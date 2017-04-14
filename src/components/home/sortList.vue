<template>
	<ul class="selection">
		<li v-for="(item, index) in list" :key="item.name" :class="[item.class, {active: item.active},{up: item.up}]" @click="choose(index)">
			{{ item.name }}
		</li>
		<div class="sort" :class="{active: isSortList}" >
			<p v-for="(item,index) in sortPrices" @click="toSortPrice(index)" :class="{active: (index+1) == searchStoreKey.sort}">{{item}}</p>
		</div>
		<div class="classify" :class="{active: isClassify}">
			<h1 class="classify-title">
			 	品牌
			 	<i class="arrow-down" :class="{active: brandarrow}" @click="brandarrow = !brandarrow"></i>
			</h1>
			<ol class="classify-name clear" :class="{active: brandarrow}">
				<dd v-for="(item,index) in brandsList" :class="{active: index === brandSelect}" @click="brandSelect = index;searchStoreKey.brandName = item.Title">{{ item.Title }}</dd>
			</ol>
			<h1 class="classify-title">
				价格区间
			</h1>
			<ol class="classify-price clear">
				<dd><input type="text" placeholder="最低价" v-model="priceMin"></dd>
				<dd class="classify-price-line">-</dd>
				<dd><input type="text" placeholder="最高价" v-model="priceMax"></dd>
			</ol>
			<h1 class="classify-title">
				内存
				<i class="arrow-down" :class="{active: memoryArrow}" @click="memoryArrow = !memoryArrow"></i>
			</h1>
			<ol class="classify-capacity clear" :class="{active: memoryArrow}">
				<dd v-for="(item,index) in memoryList" :class="{active: index === memorySelect}" @click="memorySelect = index;searchStoreKey.memory = item.Title">{{item.Title}}</dd>
			</ol>
			<h1 class="classify-title">
				机身颜色
				<i class="arrow-down" :class="{active: colorArrow}" @click="colorArrow = !colorArrow"></i>
			</h1>
			<ol class="classify-color clear" :class="{active: colorArrow}">
				<dd v-for="(item,index) in colorList" :class="{active: index === colorSelect}" @click="colorSelect = index;searchStoreKey.color = item.Title">{{ item.Title }}</dd>
			</ol>
			<div class="classify-btn">
				<button @click="reset">重置</button>
				<button @click="confirm">确定</button>
			</div>
		</div>
	</ul>
</template>
<script>
	export default {
		name: 'selection',
		props: ['dataAttr','dataLocal', 'dataSearch'],		// 属性列表 
		data() {
			return {
				list: [
					{name: '综合', class: 'total', up: false, active:true },
					{name: '距离', class: 'arrow-up', up: false, active:false },
					{name: '销量', class: 'arrow-up',  up: false, active:false },
					{name: '筛选', class: 'screen ',  up: false, active:false },
				],
				sortPrices: ['综合排序', '距离', '销量'],	//下拉框
				isSortList: false,
				isClassify: false,
				priceMin: '',
				priceMax: '',
				brandarrow: false, 		//品牌下拉列表
				memoryArrow: false,		//内存下拉列表
				colorArrow: false,		//颜色下拉列表
				brandSelect: null,		// 选中品牌
				memorySelect: null,		// 选中内存
				colorSelect: null,		// 选中颜色
				/*searchStore: {
					appkey: 100000029, 
					lat: '', // String	纬度  120.14563
					lng: '', // String	经度  30.242523
					pageIndex: 1,  		// int	页码
					pageSize: 14,			// int	每页多少条数据
					sort: 1, 					// int 1.综合（销量+价格）2.销量 3.价格
					sequence: 0, 			// 顺序排列：1 倒序：0正序

					brandName: '',  // string	品牌名称
					maxPrice: '',		// string	价格区间最大值
					minPrice: '',   // string	价格区间最小值
					color: '', 			// string	颜色 
					memory: ''     // string	内存	
				},*/
			}
		},
		computed: {
			colorList() {
				return this.dataAttr[0]
			},
			memoryList() {
				return this.dataAttr[1]
			},
			brandsList() {
				return this.dataAttr[2]
			},
			searchStoreKey() {
				 // this.searchStore.lat = this.dataLocal.lat;
				 
				 // this.searchStore.lng = this.dataLocal.lng;
				return this.dataSearch
			}
		},
		mounted() {
			console.log('sortList:-data', this.dataAttr);
		},
		methods: {
			choose(index) {
				let active = this.list[index].active;
				let up = this.list[index].up;
				this.list.forEach((item,index) => {
					this.list[index].active = false;
				})
				switch(index) {
					case 0: 
						this.$emit('mask', true);
						this.isClassify = false;
						this.isSortList = true;
						this.list[0].active = true;
						 return
					case 1: 
						this.$emit('mask', false);
						this.isSortList ? this.isSortList = false : '';
						this.isClassify ? this.isClassify = false : '';
						if (!active) {
							this.searchStoreKey.sort = 2;
							this.$emit('reload',this.searchStoreKey);
						} else {
							this.list[1].up = !up;
							this.list[1].up ? this.searchStoreKey.sequence = 0 : this.searchStoreKey.sequence = 1;
							this.$emit('reload', this.searchStoreKey);
						}
						this.list[1].active = true;
						return
					case 2: 
						this.$emit('mask', false);
						this.isSortList ? this.isSortList = false : '';
						this.isClassify ? this.isClassify = false : '';
						if (!active) {
							this.searchStoreKey.sort = 3;
							this.$emit('reload', this.searchStoreKey);
						} else {
							this.list[2].up = !up;
							this.list[2].up ? this.searchStoreKey.sequence = 0 : this.searchStoreKey.sequence = 1;
							this.$emit('reload',this.searchStoreKey);
						}
						this.list[2].active = true;
						return
					case 3: 
						this.$emit('mask', true);
						this.isClassify = true;
						this.isSortList = false;
						this.list[3].active = true;
						return
				}
			},
			toSortPrice(index) {
				// this.$store.dispatch('switch_home_sort',index+1);
				this.searchStoreKey.sort = index + 1;
				this.$emit('mask');
				this.list[0].active = false;
				this.isSortList = false;
				this.$emit('reload',this.searchStoreKey);
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
			},
			confirm() {
				this.searchStoreKey.priceMin = this.priceMin;
				this.searchStoreKey.priceMax = this.priceMax;
				console.log('searchStoreKey', this.searchStoreKey);

				this.isClassify = false;
				this.$emit('mask', false);
				this.$emit('reload',this.searchStoreKey);
				
			}
		}
	}
</script>
<style scoped>

.selection {
	position: relative;
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

li {
	float: left;
	position: relative;
	width: 25%;
	height: 100%;
	text-align: center;
	line-height: 1.4rem;
	color: #333;
}


.arrow-up::before,
li::after {
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
 li::after {
	top: 0.75rem;
	border-top-color: #333;
}

.up::after {
	opacity: 0.4;
}
.up::before {
	opacity: 1;
}

li.active {
	color: #E40277;
}
.active::before {
	border-bottom-color: #E40277;
}
.active::after {
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
	background: url('../../assets/icon/arrow_down.png') no-repeat center;
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

</style>