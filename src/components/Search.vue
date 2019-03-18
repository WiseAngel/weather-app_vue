<template>
	<div id="search">
		<input class="input" type="text" placeholder="Введите название города">
		<button class="btn" @click="foo">+</button>
	</div>
</template>

<script>
import axios from 'axios';
import {tokenGis} from '@/_token';

export default {
	name: 'Search',
	data() {
		return {
	
		}
	},
	methods: {
		foo() {
			this.$store.dispatch('foo');
		}
	},
}
</script>

<style lang="stylus" scoped>
#search
	position relative
	width 400px
.input
	width 100%
	border none
.btn
	position absolute
	top 0
	right 0
</style>