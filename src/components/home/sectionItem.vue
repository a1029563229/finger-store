<template>
	<div>
		<div class="section-title">
			<img :src="title">
		</div>
		<slot></slot>
	</div>
</template>

<script>

export default {
	name: 'nearby-store',
	props: {
		title: {
			type: String,
			default: ''
		}
	}
}
</script>
<style>
	.section-title {
		width: 100%;
		height: auto;
	}
</style>