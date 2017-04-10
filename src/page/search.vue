<template>
	<div class="search">
		<search-bar @search="toSearch()" v-model="searchResult"></search-bar>
		<search-section class="clear" title="热门搜索" :show="hotSearchWords.length">
			<ul class="keyword-list clear">
				<li class="keyword-item" v-for="item in hotSearchWords">
					{{ item.Word }}
				</li>
			</ul>
		</search-section>

		<search-section class="clear" title="历史搜索" :show="historyWords.length">
			<ul class="keyword-list clear">
				<li class="keyword-item" v-for="item in historyWords">
					{{ item }}
				</li>
			</ul>
			<!-- <keyword-list :list="historyWords"></keyword-list> -->
		</search-section>
		<button class="btn-clear" @click.prevent="deleteSearchRecord">清空历史搜索记录</button>
	</div>
</template>

<script>

import searchBar from '@/components/search/searchBar'
import searchSection from '@/components/search/searchSection'
// import keywordList from '@/components/search/keywordList'
import { getToken, getHotSearchWords, getHistoryWords, deleteSearchWords } from '@/service/getData'
export default {
	name: 'search',
	data() {
		return {
			searchResult: '',
			hotSearchWords: [],
			historyWords: [],
		}
	},
	created() {
	  this.toHotSearchWords();
	},
	components: {
		searchBar,
		searchSection,
	},
	methods: {
		toSearch() {
			console.log('toSearch',this.searchResult);
		},
		async toHotSearchWords() {
			let token = await getToken();
			let hotdata =  await getHotSearchWords(token.data.Data);
			this.hotSearchWords = hotdata.data.Data;
			console.log('hotdata:', this.hotSearchWords);

			let historydata =  await getHistoryWords(token.data.Data);
			this.historyWords = historydata.data.Data;
			console.log('historydata:', this.historyWords);
		},
		async deleteSearchRecord() {
			let deleteInfo = await deleteSearchWords();
		}
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
	.keyword-list {
		width: 100%;
		height: auto;
		margin-bottom: 0.46rem;
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