<template>
	<ExitButton />
	<div
		class="grid grid-cols-none justify-items-center-safe pt-8 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:px-12 xl:grid-cols-4 xl:px-32 2xl:grid-cols-5">
		<div v-for="character in characters" :key="character.id">
			<Card :character="character" :currentPage="page" />
		</div>
	</div>
	<PageUp />
	<div class="w-full">
		<Pagination :pagination="pagination" @prevPage="changePage(false)" @nextPage="changePage(true)" />
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from './Card.vue';
import Pagination from './Pagination.vue';
import { useRouter } from 'vue-router';
import { usePageFromQuery } from '@/composables/pageFromQuery';
import ExitButton from './ExitButton.vue';
import PageUp from './PageUp.vue';

const characters = ref([]);
const pagination = ref();
const router = useRouter();
const page = usePageFromQuery();

onMounted(async () => {
	fetchCharacters(page.value);
});

async function fetchCharacters(pageToGo) {
	const currentPage = pageToGo || 1;
	const response = await fetch('https://rickandmortyapi.com/api/character?page=' + currentPage);
	const data = await response.json();
	characters.value = data.results;
	pagination.value = data.info;
}

function changePage(isForward) {
	let newPage = page.value;

	if (isForward) {
		newPage++;
	}
	else if (newPage > 1) {
		newPage--;
	}

	fetchCharacters(newPage);

	router.push({ path: '/all-characters', query: { page: newPage } });
}
</script>