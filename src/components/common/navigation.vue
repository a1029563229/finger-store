<template>
	<div class="navigation">
		<router-link class="nav-home" to="home">
			掌中店首页
		</router-link>
		<router-link class="nav-order" to="order">
			我的订单
		</router-link>
	</div>
</template>
<script>
	export default {
		name: 'navigation',
	}
</script>

<style scoped>
	.navigation {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 1.4rem;
		padding: 0.3rem 0;
		background: #FFF;
		z-index: 100;
		border-top: 1px solid #EEE;
	}
	.navigation a {
		float: left;
		display: block;
		margin: 0 4%;
		height: 0.8rem;
		width: 42%;
		border-radius: 0.06rem;
		text-align: center;
		line-height: 0.8rem;
	}
	.nav-home {
		border: 1px solid #E52A52;
		color: #E52A52;
	}
	.nav-order {
		background: #E52951;
		color: #FFF;
}
</style>