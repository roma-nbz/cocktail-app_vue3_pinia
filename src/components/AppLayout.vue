<script setup>
import { ROUTER_PATHS } from '@/constants'
import { Back } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
	imgUrl: {
		type: String,
		required: true,
	},
	backFunc: {
		tupe: Function,
	},
	isBackButtonVisible: {
		type: Boolean,
		default: true,
	},
})

const route = useRoute()
const router = useRouter()

const routeName = computed(() => route.name)

function goForCocktailRandom() {
	router.push(ROUTER_PATHS.RANDOM)

	if (routeName.value === ROUTER_PATHS.RANDOM) {
		router.go()
	}
}

function goBack() {
	props.backFunk ? props.backFunk() : router.go(-1)
}
</script>

<template>
	<div class="root">
		<div :style="`background-image: url(${imgUrl})`" class="img"></div>
		<div class="main">
			<div class="btns">
				<el-button
					v-if="isBackButtonVisible"
					class="btn-back"
					type="primary"
					:icon="Back"
					circle
					@click="goBack"
				/>
				<el-button class="btn" @click="goForCocktailRandom"
					>Get random cocktail</el-button
				>
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main';

.root {
	display: flex;
	min-height: 100vh;
	background-color: $background;
}
.img {
	width: 50%;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	background-size: cover;
}
.main {
	position: relative;
	width: 50%;
	padding: 32px 40px;
}
.btn {
	position: absolute;
	top: 32px;
	right: 40px;
	width: 182px;
	height: 32px;
	border-radius: 4px;
	font-size: 16px;
	font-family: Raleway;
	font-weight: 400;
	color: $colorTitle;
	background-color: $colorAccent;
	border: 2px solid $colorAccent;
	transition: all 0.36s ease-in-out;
	&:hover,
	&:active {
		border-color: $colorAccent;
		color: $colorAccent;
		background-color: $background;
	}
}
.btns {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.btn-back {
	width: 53px;
	height: 53px;
	border: 1px solid #fff;
	transition: all 0.36s ease-in-out;
	&:hover {
		border: 1px solid $colorAccent;
		background-color: transparent;
	}
}
</style>
