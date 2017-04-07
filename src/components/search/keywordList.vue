<template>
	<ul class="keyword-list">
		<li class="keyword-item" v-for="item in list">
			{{ item }}
		</li>
	</ul>
</template>
<script>

export default {
	name: 'keyword-list',
	props: ['list'],
}
</script>

<style>
	.keyword-list {
		width: 100%;
		height: 2.8rem;
	}
	.keyword-item {
		float: left;
		margin: 0.46rem 0 0 4%;
		width: 20%;
		height: 0.7rem;
		line-height: 0.7rem;
		border: 1px solid #333;
		border-radius: 0.08rem;
		color: #333;
		text-align: center;
	}
</style>
