<template>
	<div class="w-full flex justify-around content-center pt-8 pb-4 gap-4">
		<RouterLink :to="{ path: `/character/${Number(route.params.id) - 1}`, query: { page: pageFromQuery } }">
			<button :disabled="Number(route.params.id) <= 1" class="mt-4 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 
          hover:bg-fuchsia-800 hover:text-lime-400 font-semibold text-3xl py-1 px-6 rounded-xl transition-colors duration-100 
          cursor-pointer disabled:invisible disabled:cursor-default">&larr;
			</button>
		</RouterLink>

		<RouterLink :to="{ path: `/character/${Number(route.params.id) + 1}`, query: { page: pageFromQuery } }">
			<button :disabled="Number(route.params.id) >= maxCharacters" class="mt-4 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 
          hover:bg-fuchsia-800 hover:text-lime-400 font-semibold text-3xl py-1 px-6 rounded-xl transition-colors duration-100 
          cursor-pointer disabled:invisible disabled:cursor-default">&rarr;
			</button>
		</RouterLink>
	</div>
</template>

<script setup>
import { usePageFromQuery } from '@/composables/pageFromQuery';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageFromQuery = usePageFromQuery();
const maxCharacters = 826;
</script>