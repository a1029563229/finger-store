<template>
	<div class="search-bar">
		<span class="btn-back"></span>
		<input class="search-input" type="text" :value="result" @input="result= $event.target.value" />
		<span class="btn-search"></span>
	</div>
</template>
<script>
export default {
	name: 'search-bar',
	props: {

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
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 1px;
	background: #eee;
	transform: scaleY(0.5);
}

span {
	display: block;
	width: 10%;
	padding: 0 2%;
}

.btn-back {
	float: left;
}

.btn-search {
	float: right;
}

.search-input {
	width: 72%;
	height: 100%;
}

</style>