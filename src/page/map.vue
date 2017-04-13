<template>
	<div class="page-map">
		<header-top title="店铺位置"></header-top>
		<baidu-map class="map" :center="{lng: 113.94185, lat: 22.54865}" :zoom="80">
			<bm-marker :position="{lng: 113.94185, lat: 22.54865}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :label="{content: storeName, opts: {offset: {width: 20, height: -10}}}"></bm-marker>
	  </baidu-map>
  </div>
</template>
<script>
import headerTop from '@/components/common/headerTop'
export default {
	name: 'map',
	components: {
		headerTop,
	},
	computed: {
		storeName() {
			return this.$route.query.name
		}
	},
	mounted() {
		this.toName();
	},
	methods: {
		toName() {
			//  console.log( this.$router.query.name )
		}
	}
}
</script>
<style>
.page-map {
	padding-top: 1.28rem;
}
.map {
	width: 100%;
	height: 100%;
}	

</style>