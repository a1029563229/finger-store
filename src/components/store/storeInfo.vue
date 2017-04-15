<template>
	<div class="store-info">
		<div class="info-img">
			<img :src="storeInfo.logo">
		</div>
		<h1 class="info-name">{{ storeInfo.name }}</h1>
		<ul class="info-btn">
			<li @click="toPraise">
				<i class="btn-praise"></i>
				点赞
			</li>
			<li @click="toCollect">
				<i class="btn-collect"></i>
				收藏
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import { addStoreSuperb, addStoreCollect } from '../../service/getData'

	export default {
		computed: {
			...mapState({
				storeInfo: state => state.home.storeInfo,
				token: state => state.home.token,
			})
		},
		methods: {
			async toPraise() {
				console.log('praiseResult');
				let praiseResult = await addStoreSuperb(this.token);
				console.log('praiseResult',praiseResult);
			},
			async toCollect() {
				let collectResult = await addStoreCollect(this.token);
				console.log('collectResult',collectResult);
			}
		}
	}
</script>

<style scoped>
	
	.store-info {
		width: 100%;
		height: 1.6rem;
		border-bottom: 1px solid #EEE;
		overflow: hidden;
	}

	.info-img {
		float: left;
		position: relative;
		width: 1rem;
		height: 1rem;
		margin: 0.3rem 0.3rem 0.3rem 0.4rem;
	}
	.info-img img {
		position: absolute;
		top: 0;
		left: 0;
		max-width: 100%;
	}
	
	.info-name {
		float: left;
		line-height: 1.6rem;
		font-size: 0.45rem;
		font-weight: 600;
		color: #222;
	}

	.info-btn {
		height: 100%;
		float: right;
		margin-right: 2%;
	}

	.info-btn li {
		float: left;
		width: 1.4rem;
		height: 100%;
		text-align: center;
		font-size: 0.35rem;
		padding: 0.15rem 0.3rem 0;
	}
	.info-btn li i {
		display: block;
		width: 0.8rem;
		height: 0.8rem;
		margin-bottom: 0.05rem;
	}

	.btn-praise  {
		background: url('../../assets/icon/common_like_press@2x.png') center no-repeat;
		background-size: 0.7rem;
	}
	.btn-collect  {
		background: url('../../assets/icon/common_collection_press@2x.png') center no-repeat;
		background-size: 0.7rem;
	}

</style>