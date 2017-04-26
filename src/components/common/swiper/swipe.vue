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
			let self = this;
      let swiper = new Swiper('.'+ self.swipeid, {
        loop: true,
        loopAdditionalSlides:3,
        pagination: '.swiper-pagination',
        paginationType: self.paginationType,
        autoplay: self.autoplay,
        direction: self.direction,
        effect: self.effect,
        observer: true,
        observeParents: true,
        preventClicks : false,
        autoplayDisableOnInteraction : false,
        touchMoveStopPropagation : false
      });
//      console.log(this);
      let timer = setInterval(() => {
          if (this.$slots['swiper-item']) {
            swiper.reLoop();
            swiper.slideTo(0, 0, false);
            swiper.startAutoplay();
            clearInterval(timer);
          }
      },500)
		},
		data() {
			return {
				dom: ''
			}
		}

	}
</script>
<style>
	@import './swiper.min.css';
	.swiper-pagination-bullet-active {
		background: #fff;
	}
</style>
