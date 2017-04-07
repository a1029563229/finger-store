<template>
	<div class="store-info">
		<div class="info-img">
			<img :src="image">
		</div>
		<h1>{{ name }}</h1>
		<ul class="info-btn">
			<li>
				<i class="btn-praise"></i>
				点赞
			</li>
			<li>
				<i class="btn-collect"></i>
				收藏
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				image: 'http://vpchina.vpclub.cn/images/201702/goods_img/356_G_1486692191132.jpg',
				name: '郑州苹果手机卖店',

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
	
	h1 {
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