<template>
	<div class="w-full flex justify-around content-center p-4 md:p-6 lg:p-8 gap-4">
		<!-- Previous -->
		<RouterLink v-if="prevCharacter"
			:to="{ path: '/character/' + prevCharacter.id, query: { page: pageFromQuery } }">
			<button class="mt-4 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500
               hover:bg-fuchsia-800 hover:text-lime-400 font-semibold text-3xl w-16 h-10 lg:w-20 rounded-full transition-colors duration-100 
               cursor-pointer">
				&larr;
			</button>
		</RouterLink>
		<div v-else class="w-18"></div>

		<!-- Next -->
		<RouterLink v-if="nextCharacter"
			:to="{ path: '/character/' + nextCharacter.id, query: { page: pageFromQuery } }">
			<button class="mt-4 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500
               hover:bg-fuchsia-800 hover:text-lime-400 font-semibold text-3xl w-16 h-10 lg:w-20 rounded-full transition-colors duration-100 
               cursor-pointer">
				&rarr;
			</button>
		</RouterLink>
		<div v-else class="w-18"></div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { usePageFromQuery } from '@/composables/pageFromQuery';
import { RouterLink } from 'vue-router';

const props = defineProps({
	characters: Array,
	currentIndex: Number,
});

const pageFromQuery = usePageFromQuery();

const prevCharacter = computed(() => props.characters[props.currentIndex - 1] || null);
const nextCharacter = computed(() => props.characters[props.currentIndex + 1] || null);
</script>