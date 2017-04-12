<template>
	<ul class="selection">
		<li v-for="(item, index) in list" :key="item.name" :class="[item.class, {active: item.active},{up: item.up}]" @click="choose(index)">
			{{ item.name }}
		</li>
		<div class="sort" :class="{active: isSelect}" >
			<p v-for="(item,index) in sortPrices" @click="toSortPrice(index)" :class="{active: (index+1) == searchStoreKey.sort}">{{item}}</p>
		</div>
		<div class="classify" :class="{active: isClassify}">
			 <h1>品牌
			 <i></i>
			 </h1>
			 <!-- v-for="item in classifyNames" -->
			<ol class="classify-name clear" >
				<dd>不限</dd>
				<dd>不限</dd>
				<dd>不限</dd>
				<dd>不限</dd>
			</ol>
			<h1>价格区间</h1>
			<ol class="classify-price clear">
				<dd>最低价</dd>
					-
				<dd>最高价</dd>
			</ol>
			<h1>内存</h1>
			<ol class="classify-capacity clear">
				<dd>不限</dd>
				<dd>不限</dd>
				<dd>不限</dd>
			</ol>
			<h1>机身颜色</h1>
			<ol class="classify-color clear">
				<dd>不限</dd>
				<dd>不限</dd>
				<dd>不限</dd>
				<dd>不限</dd>
			</ol>
			<div class="classify-btn">
				<button @click="reset">重置</button>
				<button @click="confirm">确定</button>
			</div>
		</div>
	</ul>
</template>
<script>
import { mapState } from 'vuex'

	export default {
		name: 'selection',
		props: {
			isMask: {},
		},
		data() {
			return {
				list: [
					{name: '综合', class: 'total', up: false, active:false },
					{name: '距离', class: 'arrow-up', up: false, active:false },
					{name: '销量', class: 'arrow-up',  up: true, active:false },
					{name: '筛选', class: 'screen ',  up: false, active:false },
				],
				sortPrices: ['综合排序', '距离', '销量'],
				isSelect: false,
				isClassify: false,
			}
		},
		computed: {
			...mapState([
				'searchStoreKey'
			]),
		},
		mounted() {
			console.info('search',this.search);
		},
		methods: {
			choose(index) {
				console.log(index);
				// this.list[index].isActive = !this.list[index].isActive;
				let active = this.list[index].active;
				let up = this.list[index].up;
				this.list.forEach((item,index) => {
					this.list[index].active = false;
				})
				switch(index) {
					case 0: 
						if (this.isMask && !active) {
							
						} else {
							this.$emit('mask');
						}
						if (this.isClassify) this.isClassify = false;
						this.list[index].active = !active;
						this.isSelect = !active;
						// this.list[index].isActive = !active; 
						 return
					case 1: 
						if (this.isMask) this.$emit('mask');
						if (this.isSelect) this.isSelect = false;
						if (this.isClassify) this.isClassify = false;

						this.list[index].up = !up; 
						this.list[index].active = !active;
						return
					case 2: 
						if (this.isMask) this.$emit('mask');
						if (this.isSelect) this.isSelect = false;
						if (this.isClassify) this.isClassify = false;
						if (!active) this.list[index].active = !active;
						this.list[index].up = !up; 
						return
					case 3: 
						if (this.isMask && !active) {
								
							} else {
								this.$emit('mask');
							}
						if (this.isSelect) this.isSelect = false;
						this.isSelect = false;
						this.isClassify = !active;
						this.list[index].active = !active;
						return
				}
			},
			toSortPrice(index) {
				this.$store.dispatch('switch_home_sort',index+1);
			},
			// 重置
			reset() {

			},
			confirm() {
				this.$emit('isMask');
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
	font-size: 0.35rem;
	font-weight: 600;
	line-height: 0.8rem;
	padding: 0 2%;
}
.classify ol {
	display: flex;
	padding: 0 2%;
	justify-content: space-between;
}

.classify .classify-price {
	justify-content: space-around;
}

.classify dd {
	padding: 0.02rem 0.1rem;
	border: 1px solid #EEE;
	border-radius: 0.04rem;
	font-size: 0.28rem;
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

</style>