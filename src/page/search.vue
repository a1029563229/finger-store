<template>
	<div class="search">
		<div class="search-bar">
			<span class="searchBtnDefault btn-back" @click="toBack()"></span>
			<input class="search-input" type="text" v-model.trim="searchResult" placeholder="请输入关键字" />
			<span class="searchBtnDefault btn-search" @click="toSearch(searchResult)"></span>
		</div>

			<h1 class="search-title" v-if="hotSearchWords.length">
				热门搜索
			</h1>
			<ul class="keyword-list clear">
				<li class="keyword-item" v-for="item in hotSearchWords" @click="toSearch(item.Word)">
					{{ item.Word }}
				</li>
			</ul>
			<h1 class="search-title" v-if="historyWords.length">
				历史搜索
			</h1>
			<ul class="keyword-list clear">
				<li class="keyword-item" v-for="item in historyWords">
					{{ item }}
				</li>
			</ul>
		<button class="btn-clear" v-show="historyWords.length" @click.prevent="deleteSearchRecord">清空历史搜索记录</button>
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
			storeid: null,
			// token: '',
		}
	},
	computed: {
		...mapState({
			token: state => state.home.token,
			}),
	},
	created() {
		this.init(); // get Token
		this.getHotWords();
		this.toHistoryWords();
	},
	mouted() {
		this.storeid = this.$route.query.storeid;
	},
	methods: {
		// 获取token
		init() {
			if (!this.token) {
				let tokenCookie = this.readCookie('USERTOKEN');
				this.$store.dispatch('recordToken', tokenCookie);
			}
		},
		readCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
		  return null;
		},
		// 获取历史搜索关键词
		async toHistoryWords() {
			const historyData =  await getHistoryWords(this.token);
			this.historyWords = historyData.Data ? historyData.Data : [];
			console.log('historydata:', this.historyWords);
		},
		// 热门搜搜关键词
		async getHotWords() {
			const hotData = await getHotSearchWords(this.token);
			this.hotSearchWords = hotData.Data;
			console.log('hotData',hotData);
		},
		async deleteSearchRecord() {
			let deleteInfo = await deleteSearchWords();
			this.historyWords = [];
			console.log('deleteInfo',deleteInfo);
		},
		toSearch(word) {
			if (!word) return
			if (this.$route.query.storeid) {
				this.$router.push({path:'productlist', query:{name: word, storeid:this.$route.query.storeid}});
			} else {
				this.$router.push({path:'productlist', query:{name: word}});
			}
			console.log(this.$route.query.storeid, word);
		},
		toBack() {
			this.$router.go(-1);
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
	border: 1px solid #999;
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
	border: 1px solid #999;
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

/* search-bar */
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
	background: url('../assets/icon/topbar_back@2x.png') no-repeat center;
	background-size: 0.6rem;
}

.btn-search {
	float: right;
	background: url('../assets/icon/title_icon_search@2x.png') no-repeat center;
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