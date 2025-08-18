<template>
	<div class="relative min-h-screen bg-center bg-cover bg-no-repeat lg:bg-fixed bg-[url('/rick-and-morty-portal.jpg')] bg-blend-multiply bg-gray-400">
		<ExitButton />

		<div
			class="grid grid-cols-none justify-items-center-safe pt-8 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:px-12 xl:grid-cols-4 xl:px-32 2xl:grid-cols-5">
			<div v-for="character in characters" :key="character.id"
				class="bg-gradient-to-t from-violet-900 from-0% to-fuchsia-800 to-100% text-violet-200 py-6 rounded-xl shadow-lg w-72 hover:ring hover:ring-lime-500 hover:shadow-lime-500 hover:scale-110 transition-transform duration-200">
				<Card :character="character" :currentPage="page" />
			</div>
		</div>

		<div class="w-full mt-8">
			<Pagination :pagination="pagination" @prevPage="changePage(false)" @nextPage="changePage(true)" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Card from "./Card.vue";
import Pagination from "./Pagination.vue";
import { useRouter } from "vue-router";
import { usePageFromQuery } from "@/composables/pageFromQuery";
import ExitButton from "./ExitButton.vue";

const characters = ref([]);
const pagination = ref();
const router = useRouter();
const page = usePageFromQuery();

onMounted(async () => {
	fetchCharacters(page.value);
});

async function fetchCharacters(pageToGo) {
	const currentPage = pageToGo || 1;
	const response = await fetch(
		"https://rickandmortyapi.com/api/character?page=" + currentPage
	);
	const data = await response.json();
	characters.value = data.results;
	pagination.value = data.info;
}

function changePage(isForward) {
	let newPage = page.value;

	if (isForward) {
		newPage++;
	} else if (newPage > 1) {
		newPage--;
	}

	fetchCharacters(newPage);

	router.push({ path: "/all-characters", query: { page: newPage } });
}
</script>
