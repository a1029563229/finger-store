<template>
	<ul class="order-tab">
		<li class="tab-item" :class="{active: index === itemNum }" v-for="(item, index) in tabList" @click="chooseItem(index)">
			{{ item }}
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'order-tab',
		data() {
			return {
				tabList: ['全部', '待付款', '待发货', '待收货', '已完成', '退款'],
				itemNum: 0
			}
		},
    mounted(){
      this.resetIdx()
    },
    computed: {

    },
		methods: {
      resetIdx(){
          let isfromMyorder = this.$store.state.list.isfromMyorder
          if( isfromMyorder ){
              this.itemNum = this.$store.state.list.selectIdx
              this.$store.state.list.isfromMyorder = false
          }
      },
			chooseItem(index) {
        this.$store.dispatch('switchTab',index)
				this.itemNum = index;
			}
		}
	}
</script>
<style scoped>
	.order-tab {
		background-color: #FFF;
		width: 100%;
		height: 1.08rem;
		line-height: 1.08rem;
		justify-content: space-around;
		align-items: center;
		color: #222;
		text-align: center;
		border-bottom: 1px solid #EEE;
	}
	.tab-item {
		float: left;
		height: 100%;
    width: 16.666%;

	}
	.tab-item.active {
		color: #E52A52;
		border-bottom: 1px solid #E52A52;
	}
</style>
