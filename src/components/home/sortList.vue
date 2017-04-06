<template>
	<ul class="selection">
		<li v-for="(item, index) in list" :key="item.name" :class="[item.class, {active: item.isActive},{up: item.isUp}]" @click="choose(index)">
			{{ item.name }}
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'selection',
		props: {

		},
		data() {
			return {
				list: [
					{name: '综合', class: 'total', up: false, active:false },
					{name: '距离', class: 'arrow-up', up: false, active:false },
					{name: '销量', class: 'arrow-up',  up: true, active:false },
					{name: '筛选', class: 'screen ',  up: false, active:false },
				],
			}
		},
		methods: {
			choose(index) {
				console.log(index);
				this.list[index].isActive = !this.list[index].isActive;
				let active = this.list[index].isActive;
				let up = this.list[index].isUp;
				switch(index) {
					case 0: 
						// active ?  
				}
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

.active {
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


</style>