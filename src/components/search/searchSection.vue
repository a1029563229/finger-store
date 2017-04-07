<template>
	<div>
		<h1 class="search-title">
			{{ title }}
		</h1>
		<slot name="search-list"></slot>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		}
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
