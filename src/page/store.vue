<template>
	<div>
		<search-bar></search-bar>
		<sort-list></sort-list>
		<store-info></store-info>
		<store-list></store-list>
		<navigation></navigation>
	</div>
</template>
<script>
	import searchBar from '@/components/search/searchBar'
	import sortList from '@/components/home/sortList'
	import storeInfo from '@/components/store/storeInfo'
	import storeList from '@/components/store/storeList'
	import navigation from '@/components/common/navigation'
	export default {
		name: 'store',
		components: {
			searchBar,
			sortList,
			navigation,
			storeInfo,
			storeList,
		}
	}
</script>