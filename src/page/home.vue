<template>
	<div class="home">
		<swiper swipeid="swipe" ref="swiper" class="home-swipe">
			<div class="swiper-slide home-slide" slot="swiper-item" v-for="top in slides">
				<img :src="top.image">
			</div>
		</swiper>
		<div class="home-search">
			<a class="search-input" href="javascript:;">
				请输入关键字
			</a>
			<i class="search-icon"></i>
		</div>
		<recommend-today></recommend-today>
		<nearby-store></nearby-store>
	</div>
</template>
<script>
import swiper from '@/components/common/swiper/swipe'
import { mapState, mapActions } from 'vuex'
import api from '@/config/api'
import recommendToday from '@/components/recommendToday'
import nearbyStore from '@/components/nearbyStore'
export default {
	name: 'home',
	data() {
		return {
			slides: [],
		}
	},
	components: {
		swiper,
		recommendToday,
		nearbyStore
	},
	computed: {
	},
	mounted() {
		let swiper = this.$refs.swiper;
		if (swiper.dom) {
			this.swiper = swiper.dom;
		}
		/*this.axios.get('https://zhihu-agent.herokuapp.com/get?api=/4/news/latest').then(data => {
			console.log('axios', data);
		})*/
		console.log('aaa');
		this.initial();
	},
	methods: {
		initial() {
			api.getSlides().then(data => {
				console.log('slides:',data);
				this.slides = data.data;
			})
		}
	}

}
</script>
<style scoped>
	@import '../assets/css/home.css';

</style>