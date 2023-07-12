<script setup>
import { useRootStore } from '@/stores/root'
import { storeToRefs } from 'pinia'
import AppLayout from '../components/AppLayout.vue'
import CocktailThumb from '../components/CocktailThumb.vue'

const rootStore = useRootStore()
rootStore.getIngredients()

const { ingredients, ingredient, cocktails } = storeToRefs(rootStore)

function getCocktails() {
	rootStore.getCocktails(rootStore.ingredient)
}

function removeIngredient() {
	rootStore.setIngredient(null)
}
</script>

<template>
	<AppLayout
		imgUrl="/images/cocktail.jpg"
		:backFunc="removeIngredient"
		:isBackButtonVisible="ingredient"
	>
		<div class="info">
			<div v-if="!ingredient || !cocktails" class="wrapper__info wrapper">
				<h1 class="info__title title">Choose your drink</h1>
				<div class="select__wrapper">
					<el-select
						v-model="rootStore.ingredient"
						placeholder="Choose main ingredient"
						size="large"
						filterable
						allow-create
						class="select"
						@change="getCocktails"
					>
						<el-option
							v-for="item in ingredients"
							:key="item.strIngredient1"
							:label="item.strIngredient1"
							:value="item.strIngredient1"
							class="options"
						/>
					</el-select>
				</div>
				<p class="info__text text">
					Try our delicious cocktail recipes for every occasion. Find delicious
					cocktail recipes by ingredient through our cocktail generator.
				</p>
				<img src="/images/info-1.png" alt="" class="info__img" />
			</div>
			<div v-else class="wrapper__info wrapper">
				<h1 class="info__title title">COCKTAILS WITH {{ ingredient }}</h1>
				<div class="cocktails">
					<CocktailThumb
						v-for="cocktail in cocktails"
						:key="cocktail.idDrink"
						:cocktail="cocktail"
					/>
				</div>
			</div>
		</div>
	</AppLayout>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main';

.info {
	padding-top: 231px;
	&__text {
		margin-bottom: 60px;
	}
}
.select {
	width: 220px;
	height: 40px;
	margin-bottom: 50px;
}
.options {
	padding-left: 15px;
	font-size: 16px;
	font-family: Raleway;
	font-weight: 500;
}
.cocktails {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 41px 38px;
	max-height: 400px;
	overflow-y: auto;
}
</style>
