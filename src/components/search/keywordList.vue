<template>
	<ul class="keyword-list">
		<template v-if="wordsType">
			<li class="keyword-item" v-for="item in list">
				{{ item.Word }}
			</li>
		</template>
		<template v-else>
			<li class="keyword-item" v-for="item in list">
				{{ item.Word }}
			</li>
		</template>
	</ul>
</template>
<script>

export default {
	name: 'keyword-list',
	props: {
		list: {
			type: Array
		},
		wordsType: {
			type: Boolean,
		}
	mounted() {
		console.log('this.list:', this.list);
	}
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
