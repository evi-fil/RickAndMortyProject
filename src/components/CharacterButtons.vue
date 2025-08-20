<template>
	<div class="w-full flex justify-around content-center pt-8 md:pt-12 pb-4 gap-4">
		<!-- Προηγούμενος -->
		<RouterLink v-if="currentId > 1"
			:to="{ path: '/character/' + (currentId - 1), query: { page: pageFromQuery } }">
			<button class="mt-4 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 
               hover:bg-fuchsia-800 hover:text-lime-400 font-semibold text-3xl py-1 px-6 rounded-xl transition-colors duration-100 
               cursor-pointer">&larr;</button>
		</RouterLink>
		<div v-else class="w-[72px]"></div>

		<!-- Επόμενος -->
		<RouterLink v-if="currentId < maxCharacters"
			:to="{ path: '/character/' + (currentId + 1), query: { page: pageFromQuery } }">
			<button class="mt-4 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 
               hover:bg-fuchsia-800 hover:text-lime-400 font-semibold text-3xl py-1 px-6 rounded-xl transition-colors duration-100 
               cursor-pointer">&rarr;</button>
		</RouterLink>
		<div v-else class="w-[72px]"></div>
	</div>
</template>

<script setup>
import { usePageFromQuery } from '@/composables/pageFromQuery';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageFromQuery = usePageFromQuery();
const maxCharacters = 826;
const currentId = computed(() => + route.params.id);
</script>