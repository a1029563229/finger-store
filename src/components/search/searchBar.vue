<template>
	<div class="search-bar">
		<span class="searchBtnDefault btn-back" @click="toBack()"></span>
		<input class="search-input" type="text" ref="input" :value="value" @input="updateValue($event.target.value)" placeholder="请输入关键字" />
		<span class="searchBtnDefault btn-search" @click="toSearch()"></span>
	</div>
</template>
<script>
export default {
	name: 'search-bar',
	props: ['value'],
	methods: {
		updateValue(value) {
			let formattedValue = value.trim();
			if (formattedValue !== value) {
				this.$refs.input.value = formattedValue;
			}
			this.$emit('input', formattedValue);
		},
		toBack() {
			this.$router.go(-1);
		},
		toSearch() {
			this.$emit('search', value);
		}
	}
}
</script>
<style scoped>

.search-bar {
	position: relative;
	width: 100%;
	height: 1.28rem;
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
	background: url('../../assets/icon/topbar_back@2x.png') no-repeat center;
	background-size: 0.6rem;
}

.btn-search {
	float: right;
	background: url('../../assets/icon/title_icon_search@2x.png') no-repeat center;
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

</style>