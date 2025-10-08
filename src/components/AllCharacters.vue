<template>
	<div class="w-full">
		<div class="w-full flex justify-center content-center pb-6 gap-18 md:gap-56 lg:gap-72 xl:gap-96">
			<HomeButton />
			<ExitButton />
		</div>
	</div>
	<!-- Search input -->
	<SearchCharacter @handleSearch="onSearch" />
	<!--Character not found-->
	<div v-if="!store.characters.length">
		<p class="flex justify-center content-center p-4 mt-12 w-56 md:w-72 lg:w-96 mx-auto 
		 text-lime-300 text-xl text-bold rounded-full shadow-lg 
		 bg-gradient-to-r from-violet-900 to-fuchsia-800">
			Character not found!</p>
	</div>
	<!-- Character grid -->
	<div class="grid grid-cols-none justify-items-center-safe pt-8 gap-8 
           md:grid-cols-2 lg:grid-cols-3 lg:px-12 
           xl:grid-cols-4 xl:px-32 2xl:grid-cols-5">
		<div v-for="character in store.characters" :key="character.id">
			<Card :character="character" :currentPage="store.page" />
		</div>
	</div>
	<!-- Scroll button-->
	<ScrollToTopButton />
	<!-- Pagination -->
	<div class="w-full">
		<Pagination :pagination="store.pagination" @prevPage="prevPage" @nextPage="nextPage" />
	</div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Card from './Card.vue';
import Pagination from './Pagination.vue';
import ExitButton from './ExitButton.vue';
import ScrollToTopButton from './ScrollToTopButton.vue';
import SearchCharacter from './SearchCharacter.vue';
import { useCharactersStore } from '@/stores/characters';
import HomeButton from './HomeButton.vue';
import { useKeyboardPagination } from '@/composables/useKeyboardPagination';

const store = useCharactersStore();
const router = useRouter();
const route = useRoute();

// Search handle
function onSearch(searchTerm) {
	const trimmed = searchTerm.trim();
	if (!trimmed) {
		store.clearSearch();
		router.push({ path: '/all-characters', query: { page: 1 } });
	} else {
		store.fetchCharactersByName(trimmed, 1);
		router.push({ path: '/all-characters', query: { name: trimmed, page: 1 } });
	}
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Pagination handlers
function prevPage() {
	const newPage = Math.max(1, store.page - 1);
	goToPage(newPage);
}

function nextPage() {
	const newPage = store.page + 1;
	goToPage(newPage);
}

function goToPage(page) {
	if (store.searchActive) {
		store.fetchCharactersByName(store.lastSearchTerm, page);
		router.push({
			path: '/all-characters',
			query: { name: store.lastSearchTerm, page },
		});
	} else {
		store.fetchCharacters(page);
		router.push({ path: '/all-characters', query: { page } });
	}
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initial fetch based on query
onMounted(() => {
	const query = route.query;
	if (query.name) {
		store.fetchCharactersByName(query.name, Number(query.page) || 1);
	} else {
		store.fetchCharacters(Number(query.page) || 1);
	}
});

watch(
	() => route.query,
	(query) => {
		if (query.name) {
			store.fetchCharactersByName(query.name, Number(query.page) || 1);
		} else {
			store.fetchCharacters(Number(query.page) || 1);
		}
	}
);

useKeyboardPagination();
</script>
