<template>
	<ExitButton />
	<!-- Search input -->
	<SearchCharacter @handleSearch="onSearch" />
	<!-- Character grid -->
	<div
		class="grid grid-cols-none justify-items-center-safe pt-8 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:px-12 xl:grid-cols-4 xl:px-32 2xl:grid-cols-5">
		<div v-for="character in characters" :key="character.id">
			<Card :character="character" :currentPage="page" />
		</div>
	</div>
	<!-- Scroll button-->
	<ScrollToTopButton />
	<!-- Pagination -->
	<div class="w-full">
		<Pagination :pagination="pagination" @prevPage="prevPage" @nextPage="nextPage" />
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Card from './Card.vue';
import Pagination from './Pagination.vue';
import ExitButton from './ExitButton.vue';
import ScrollToTopButton from './ScrollToTopButton.vue';
import SearchCharacter from './SearchCharacter.vue';
import { usePageFromQuery } from '@/composables/pageFromQuery';

const characters = ref([]);
const pagination = ref();
const router = useRouter();
const route = useRoute();
const pageFromQuery = usePageFromQuery(); 
const page = ref(Number(route.query.page) || pageFromQuery.value);
const searchActive = ref(false);
const lastSearchTerm = ref('');

// All Character fetch
async function fetchCharacters(pageToGo) {
	const response = await fetch('https://rickandmortyapi.com/api/character?page=' + pageToGo);
	if (!response.ok) {
		characters.value = [];
		pagination.value = null;
		return;
	}
	const data = await response.json();
	characters.value = data.results;
	pagination.value = data.info;
}
// Searched characters
async function fetchCharactersByName(name, pageToGo) {
	const response = await fetch(
		'https://rickandmortyapi.com/api/character/?name=' + encodeURIComponent(name) + '&page=' + pageToGo);
	if (!response.ok) {
		characters.value = [];
		pagination.value = null;
		return;
	}
	const data = await response.json();
	characters.value = data.results || [];
	pagination.value = data.info;
}
// Search handle 
function onSearch(searchTerm) {
	const trimmed = searchTerm.trim();
	if (!trimmed) {
		searchActive.value = false;
		fetchCharacters(page.value);
		router.push({ path: '/all-characters', query: { page: page.value } });
	} else {
		searchActive.value = true;
		lastSearchTerm.value = trimmed;
		fetchCharactersByName(trimmed, 1);
		router.push({ path: '/all-characters', query: { name: trimmed, page: 1 } });
	}
}
// Pagination
function prevPage() { changePage(false); }
function nextPage() { changePage(true); }

function changePage(isForward) {
	let newPage = isForward ? page.value + 1 : Math.max(1, page.value - 1);
	page.value = newPage;

	if (searchActive.value) {
		fetchCharactersByName(lastSearchTerm.value, newPage);
		router.push({ path: '/all-characters', query: { name: lastSearchTerm.value, page: newPage } });
	} else {
		fetchCharacters(newPage);
		router.push({ path: '/all-characters', query: { page: newPage } });
	}

	window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Initial fetch
onMounted(() => {
	const query = route.query;
	if (query.name) {
		searchActive.value = true;
		lastSearchTerm.value = query.name;
		fetchCharactersByName(query.name, Number(query.page) || 1);
	} else {
		fetchCharacters(Number(query.page) || page.value);
	}
});
</script>
