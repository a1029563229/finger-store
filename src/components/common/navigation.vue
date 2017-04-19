<template>
	<div class="navigation">
		<template v-if="about">
			<router-link class="nav-about" to="shopdes">
				联系我们
			</router-link>
		</template>
		<template v-else>
			<router-link class="nav-home" to="home">
				掌中店首页
			</router-link>
			<router-link class="nav-order" to="order">
				我的订单
			</router-link>
		</template>
		
	</div>
</template>
<script>
	export default {
		name: 'navigation',
		props:{
			about: {
				type: Boolean,
				default: false,
			}
		}
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
	background: #FFF;
	z-index: 100;
	border-top: 1px solid #EEE;
}
.nav-home {
	float: left;
	display: block;
	margin: 0.3rem 4%;
	height: 0.8rem;
	width: 42%;
	border-radius: 0.06rem;
	text-align: center;
	line-height: 0.8rem;
}
.nav-order {
	float: left;
	display: block;
	margin: 0.3rem 4%;
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

.nav-about {
	display: block;
	width: 100%;
	height: 100%;
	text-align: center;
	line-height: 1.35rem;
}

</style>