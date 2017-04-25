<template>
	<div class="swiper-container" :class="swipeid">
		<div class="swiper-wrapper">
			<slot name="swiper-item"></slot>
		</div>
		<div :class="{'swiper-pagination': pagination}"></div>
	</div>
</template>
<script>
	import './swiper.js'
	export default {
		name: "swiper",
		props: {
			swipeid: {
				type: String,
				default: ''
			},
			effect: {
				type: String,
				default: 'slide'
			},
			loop: {
				type: Boolean,
				default: true
			},
			direction: {
				type: String,
				default: 'horizontal'
			},
			pagination: {
				type: Boolean,
				default: true
			},
			autoplay: {
				type: Number,
				default: 3500
			},
			paginationType: {
				type: String,
				default: 'bullets'
			}
		},
		mounted() {
			var self = this;
			var swiper = new Swiper('.'+ self.swipeid, {
				loop: self.loop,
				pagination: '.swiper-pagination',
				paginationType: self.paginationType,
				autoplay: self.autoplay,
				direction: self.direction,
				effect: self.effect,
				observer: true,
				observeParents: true,
				preventClicks : false,
				touchMoveStopPropagation : false
			})
		},
		data() {
			return {
				dom: ''
			}
		},
		
	}
</script>
<style>
	@import './swiper.min.css';
	.swiper-pagination-bullet-active {
		background: #fff;
	}
</style>
