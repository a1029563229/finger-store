<template>
	<div class="search">
		<search-bar @search="toSearch()" v-model="searchResult"></search-bar>
		<search-section title="热门搜索">
			<keyword-list :list="list" slot="search-list"></keyword-list>
		</search-section>
		<search-section title="历史搜索">
			<keyword-list :list="list" slot="search-list"></keyword-list>
		</search-section>
		<button class="btn-clear">清空历史搜索记录</button>
	</div>
</template>

<script>

import searchBar from '@/components/search/searchBar'
import searchSection from '@/components/search/searchSection'
import keywordList from '@/components/search/keywordList'

export default {
	name: 'search',
	data() {
		return {
			searchResult: '',
			list: [
			'荣耀V8', '苹果', '魅蓝5s', '美图V8', '华为honor','荣耀V8', '苹果', '魅蓝5s'
			]
		}
	},
	components: {
		searchBar,
		searchSection,
		keywordList,
	},
	methods: {
		toSearch() {
			console.log('toSearch',this.searchResult);
		},
		/*toWatch(value) {
			console.log(value);
		}*/
	}
}
</script>
<style scoped>
	.btn-clear {
		display: block;
		width: 40%;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		border-radius: 0.08rem;
		margin: 1.4rem auto 0;
		background: #FFF;
		border: 1px solid #333;
	}
</style>