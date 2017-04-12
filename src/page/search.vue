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
import { mapState, mapActions } from 'vuex'
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
	computed: {
		...mapState([
			'loginToken'
		])
	},
	mounted() {
		this.getlocal();
	},
	methods: {
		toSearch() {
			this.$router.
			console.log('toSearch',this.searchResult);
		},
		async toHotSearchWords() {
			let hotdata =  await getHotSearchWords(this.loginToken);
			this.hotSearchWords = hotdata.data.Data;
			console.log('hotdata:', this.hotSearchWords);

			let historydata =  await getHistoryWords(this.loginToken);
			this.historyWords = historydata.data.Data || [];
			console.log('historydata:', this.historyWords);
		},
		async deleteSearchRecord() {
			let deleteInfo = await deleteSearchWords();
			console.log('deleteInfo',deleteInfo);
		},
		getlocal() {
			var options={
        enableHighAccuracy:true,
        maximumAge:1000
      }
      if(navigator.geolocation){
          //浏览器支持geolocation
          navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError,options);
      }else{
          //浏览器不支持geolocation
          alert('您的浏览器不支持地理位置定位');
      }
		},
     onSuccess(position){
        //返回用户位置
        //经度
        var longitude =position.coords.longitude;
        //纬度
        var latitude = position.coords.latitude;
        alert('经度'+longitude+'，纬度'+latitude);

        //根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(longitude,latitude);
        var gc = new BMap.Geocoder();
        gc.getLocation(point, function(rs){
            var addComp = rs.addressComponents;
            alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        });
    },
 		onError(error){
      switch(error.code){
        case 1:
            alert("位置服务被拒绝");
            break;
        case 2:
            alert("暂时获取不到位置信息");
            break;
        case 3:
            alert("获取信息超时");
            break;
        case 4:
            alert("未知错误");
            break;
    }
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