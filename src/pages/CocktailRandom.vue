<script setup>
import { COCKTALS_RANDOM, INGREDIENT_IMG } from '@/constants'
import axios from 'axios'
import { computed, ref } from 'vue'
import AppLayout from '../components/AppLayout.vue'

const cocktail = ref(null)

const ingredients = computed(() => {
	const ingredients = []

	for (let i = 1; i <= 15; i++) {
		if (!cocktail.value[`strIngredient${i}`]) break

		const ingredient = cocktail.value[`strIngredient${i}`]

		ingredients.push(ingredient)
	}

	return ingredients
})

async function getCocktail() {
	const data = await axios.get(COCKTALS_RANDOM)
	cocktail.value = data?.data?.drinks[0]
}

function goBack() {
	router.go(-1)
}

getCocktail()
</script>

<template>
	<div v-if="cocktail" class="wrap">
		<AppLayout :imgUrl="cocktail.strDrinkThumb">
			<div class="random">
				<div class="wrapper__about wrapper">
					<h1 class="random__title title">{{ cocktail.strDrink }}</h1>
					<div class="random__item">
						<div
							v-for="(ingredient, key) in ingredients"
							:key="key"
							class="random__content"
						>
							<img
								:src="`${INGREDIENT_IMG}${ingredient}-Small.png`"
								alt=""
								class="random__img"
							/>
							<div class="random__name">
								{{ ingredient }}
							</div>
						</div>
					</div>
					<p class="random__text">{{ cocktail.strInstructions }}</p>
				</div>
			</div>
		</AppLayout>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main';

.random {
	padding-top: 153px;
	&__item {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 50px;
		max-height: 150px;
		overflow-y: auto;
	}
	&__content {
		text-align: center;
	}
	&__ {
		margin: 0 auto;
	}
	&__text {
		font-size: 20px;
		line-height: 30px;
		letter-spacing: 2px;
		text-align: center;
		max-width: 516px;
		margin-top: 50px;
	}
}
</style>
