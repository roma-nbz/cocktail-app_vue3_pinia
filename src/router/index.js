import { ROUTER_PATHS } from '@/constants'
import { createRouter, createWebHistory } from 'vue-router'
import Cocktail from '../pages/Cocktail.vue'
import CocktailRandom from '../pages/CocktailRandom.vue'
import Home from '../pages/Home.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: ROUTER_PATHS.HOME,
			name: ROUTER_PATHS.HOME,
			component: Home,
		},
		{
			path: ROUTER_PATHS.COCKTAIL,
			name: ROUTER_PATHS.COCKTAIL,
			component: Cocktail,
		},
		{
			path: ROUTER_PATHS.RANDOM,
			name: ROUTER_PATHS.RANDOM,
			component: CocktailRandom,
		},
	],
})

export default router
