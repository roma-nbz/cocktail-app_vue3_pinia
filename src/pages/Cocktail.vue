<script setup>
import { COCKTALS_BY_ID } from '@/constants'
import axios from 'axios'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'

const route = useRoute()

const cocktail = ref(null)
const cocktailId = computed(() => route.path.split('/').pop())

const ingredients = computed(() => {
	const ingredients = []

	for (let i = 1; i <= 15; i++) {
		if (!cocktail.value[`strIngredient${i}`]) break

		const ingredient = {}
		ingredient.name = cocktail.value[`strIngredient${i}`]
		ingredient.measure = cocktail.value[`strMeasure${i}`]

		ingredients.push(ingredient)
	}

	return ingredients
})

async function getCocktail() {
	const data = await axios.get(`${COCKTALS_BY_ID}${cocktailId.value}`)
	cocktail.value = data?.data?.drinks[0]
}

getCocktail()
</script>

<template>
	<div v-if="cocktail" class="wrap">
		<AppLayout :imgUrl="cocktail.strDrinkThumb">
			<div class="about">
				<div class="wrapper__about wrapper">
					<h1 class="about__title title">{{ cocktail.strDrink }}</h1>
					<ul class="list">
						<li
							v-for="(item, key) in ingredients"
							:key="key"
							class="list__item"
						>
							{{ item.name }}
							<template v-if="item.measure">
								|
								{{ item.measure }}
							</template>
						</li>
					</ul>
					<p class="about__text">{{ cocktail.strInstructions }}</p>
				</div>
			</div>
		</AppLayout>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main';
.about {
	padding-top: 153px;
	&__text {
		font-size: 20px;
		line-height: 30px;
		letter-spacing: 2px;
		text-align: center;
		max-width: 516px;
	}
}
.list {
	margin-bottom: 80px;
	&__item {
		line-height: 27px;
		letter-spacing: 1.8px;
		position: relative;
		&:not(:last-child) {
			margin-bottom: 20px;
		}
		&::before {
			position: absolute;
			content: url('../../public/images/heart.svg');
			width: 17px;
			height: 17px;
			top: 0;
			left: -40px;
		}
	}
}
</style>
