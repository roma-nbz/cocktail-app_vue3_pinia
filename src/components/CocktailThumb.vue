<script setup>
const props = defineProps({
	cocktail: {
		type: Object,
		required: true,
	},
})
</script>

<template>
	<div cocktails__item>
		<RouterLink :to="`/cocktail/${cocktail.idDrink}`">
			<div
				:style="`background-image: url(${cocktail.strDrinkThumb})`"
				class="cocktails__img"
			></div>
		</RouterLink>
		<p class="cocktails__name">{{ cocktail.strDrink }}</p>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main';
.cocktails {
	&__img {
		width: 123px;
		height: 120px;
		background-position: top center;
		background-repeat: no-repeat;
		background-size: cover;
		margin-bottom: 15px;
		& a {
			display: block;
		}
	}
	&__name {
		font-size: 16px;
		letter-spacing: 1.6px;
		text-align: center;
		width: 123px;
	}
}
</style>
