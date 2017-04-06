<template>
	<div>
		<template>
			<div class="recommend-default recommend-three">
				<div class="recommend-left">
					<div>
						<img src="http://h9.86.cc/walls/20160108/1024x768_ec6f991dc0b233c.jpg" >
					</div>
					<h1>华为honor/荣耀华为honor/荣耀华为honor/荣耀</h1>
					<p>华为honor/荣耀V8华为honor/荣耀V8华为honor/荣耀V8</p>
					<h2>￥2799.00</h2>
				</div>
				<div class="recommend-right">
					<div class="recommend-right-top">
						<div class="right-img">
							<img src="http://h9.86.cc/walls/20160108/1024x768_ec6f991dc0b233c.jpg">
						</div>
						<div class="right-desc">
							<h1>华为honor/荣耀华为honor/荣耀华为honor/荣耀华为honor/荣耀华为honor/荣耀华为honor/荣耀</h1>
							<p>华为honor/荣耀V8华为honor/荣耀V8华为honor/荣耀V8华为honor/荣耀V8华为honor/荣耀V8华为honor/荣耀V8</p>
							<h2>￥2799.00</h2>
						</div>
					</div>
					<div class="recommend-right-bottom">
						<div class="right-img">
							<img src="http://h9.86.cc/walls/20160108/1024x768_ec6f991dc0b233c.jpg">
						</div>
						<div class="right-desc">
							<h1>华为honor/荣耀华为honor/荣耀华为honor/荣耀华为honor/荣耀华为honor/荣耀华为honor/荣耀</h1>
							<p>华为honor/荣耀V8华为honor/荣耀V8华为honor/荣耀V8华为honor/荣耀V8华为honor/荣耀V8华为honor/荣耀V8</p>
							<h2>￥2799.00</h2>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>
<script>

export default {
	name: 'recommend-today',
}
</script>
<style scoped>

.recommend-default {
	width: 100%;
	height: 5.96rem;
	line-height: 0.4rem;
}
.recommend-three > div {
	float: left;
	height: 100%;
}

.recommend-three .recommend-left {
	display: block;
	width: 40%;
	border-right: 1px solid #EEE;
}
.recommend-three .recommend-right {
	width: 60%;
}
.recommend-three .recommend-right > div {
	width: 100%;
	height: 50%;
}
.recommend-three .recommend-right-top {
	border-bottom: 1px solid #EEE;
}

.recommend-three .recommend-left > div {
	width: 100%;
	height: 0;
	padding: 6% 7% 90%;
	/* border-bottom: 1px solid #ddd; */
	/* background-color: #DDD; */
}

.recommend-three h1,
.recommend-three h2,
.recommend-three p {
	line-height: 0.65rem;
	padding: 0 5%;
	overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommend-three h1 {
	font-size: 0.4rem;
	color: #222;
}
.recommend-three h2 {
	color: #E52951;
	font-size: 0.35rem;
}
.recommend-three p {
	color: #999;
	font-size: 0.35rem;
}

.recommend-right .right-img {
	float: left;
	width: 45%;
	height: 0;
	padding: 5% 0 40% 5%;
	/* background: #DDD; */
}

.recommend-right .right-desc {
	padding-top: 8%;
}

/* .recommend-three .recommend-left::after {
	content: '';
	position: absolute;
	width: 1px;
	height: 100%;
	right: 0;
	top: 0;
	bottom: 0;
	background: #bbb;
	transform: scaleX(0.5);
} */


</style>
