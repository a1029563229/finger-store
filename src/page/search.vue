<template>
	<div class="search">
		<search-bar @search="toSearch()" v-model="searchResult"></search-bar>
			<h1 class="search-title" v-if="hotSearchWords.length">
				热门搜索
			</h1>
			<ul class="keyword-list clear">
				<li class="keyword-item" v-for="item in hotSearchWords">
					{{ item.Word }}
				</li>
			</ul>
			<h1 class="search-title" v-if="historyWords.length">
				热门搜索
			</h1>
			<ul class="keyword-list clear">
				<li class="keyword-item" v-for="item in historyWords">
					{{ item }}
				</li>
			</ul>
		<button class="btn-clear" @click.prevent="deleteSearchRecord">清空历史搜索记录</button>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import searchBar from '@/components/search/searchBar'
import { getHotSearchWords, getHistoryWords, deleteSearchWords } from '@/service/getData'
export default {
	name: 'search',
	data() {
		return {
			searchResult: '',
			hotSearchWords: [],
			historyWords: [],
			token: '',
		}
	},
	created() {
		console.log('search-token',this.$route.query.token); 
		this.token = this.$route.query.token;
		this.toHistoryWords();
		this.toHotSearchWords();
	},
	components: {
		searchBar,
	},
	methods: {
		toSearch() {
			console.log('search-type',this.$route.query.storeid); 
			console.log('toSearch',this.searchResult);
		},
		// 获取热门搜索关键词
		async toHotSearchWords() {
			const hotData = await getHotSearchWords(this.token);
			this.hotSearchWords = hotData ? hotData : [];
			console.log('hotdata:', this.hotSearchWords);
		},
		// 获取历史搜索关键词
		async toHistoryWords() {
			const historyData =  await getHistoryWords(this.token);
			this.historyWords = historyData ? historyData : [];
			console.log('historydata:', this.historyWords);
		},
		async deleteSearchRecord() {
			let deleteInfo = await deleteSearchWords();
			this.historyWords = [];
			console.log('deleteInfo',deleteInfo);
		},
	}
}
</script>
<style scoped>

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