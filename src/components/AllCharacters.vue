<template>
	<ExitButton />
	<!-- Search input -->
	<SearchCharacter @handleSearch="onSearch" />
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
	//window.scrollTo({ top: 0, behavior: 'smooth' });
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

// React to URL changes (e.g. back/forward browser buttons)
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
</script>
