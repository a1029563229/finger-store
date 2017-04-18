<template>
	<div class="page-map">
		<header-top title="店铺位置" @click.stop="toName"></header-top>
		<template  v-if="isUserLocal">
			<baidu-map class="map" :center="{lng: storeLocal.userlng, lat: storeLocal.userlat}" :zoom="80">
				<bm-marker :position="{lng: storeLocal.userlng, lat: storeLocal.userlat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :label="{content: storeName, opts: {offset: {width: 20, height: -10}}}"></bm-marker>
		  </baidu-map>
	  </template>
	  <template v-else>
		  <baidu-map class="map" :center="{lng: storeLocal.userlng, lat: storeLocal.userlat}" :zoom="15">
	    	<bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="true" @lineupdate="updatePolylinePath"></bm-polyline>
	  	</baidu-map>
  	</template>
	 
  </div>
</template>
<script>
import headerTop from '@/components/common/headerTop'
import { mapState } from 'vuex'
export default {
	name: 'map',
	data() {
		return {
			isUserLocal: true
		}
	},
	components: {
		headerTop,
	},
	computed: {
		storeName() {
			return this.storeLocal.storename
		},
		...mapState({
			storeLocal: state => state.home.storeLocal,
		}),
		center() {
			return {
				lat: this.storeLocal.storelat,
				lng: this.storeLocal.storelng,
			}
		},
		polylinePath() {
			return  [
				{ lng: this.storeLocal.userlng, lat: this.storeLocal.userlat},
				{ lng: this.storeLocal.storelng, lat: this.storeLocal.storelat}
			]
		}
	},
	mounted() {
		console.warn(this.storeLocal);
		if (this.storeLocal.userlat && this.storeLocal.userlng) {
			this.isUserLocal = false;
		}
	},
	methods: {
	}
}
</script>
<style>
.page-map {
	padding-top: 1.28rem;
	padding-top: 1.28rem;
}
.map {
	width: 100%;
	height: 100%;
}	

</style>