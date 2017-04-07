<template>
	<div>
		<search-bar></search-bar>
		<sort-list></sort-list>
		<nearby-list></nearby-list>
		<navigation></navigation>
	</div>
</template>

<script>
	import searchBar from '@/components/search/searchBar'
	import sortList from '@/components/home/sortList'
	import nearbyList from '@/components/home/nearbyList'
	import navigation from '@/components/common/navigation'

	export default {
		name: 'store-list',
		components: {
			searchBar,
			sortList,
			nearbyList,
			navigation
		},
		data() {
			return {

			}
		}
	}
</script>