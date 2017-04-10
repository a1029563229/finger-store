<template>
	<div>
		<h1 class="search-title" v-if="show">
			{{ title }}
		</h1>
		<slot></slot>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		show: {}
	}
}
</script>
<style>
	.search-title {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.36rem;
		color: #222;
		font-weight: 600;
		padding-left: 5%;
		background-color: #F4F4F4;
	}
</style>
