<template>
	<div class="relative min-h-screen p-4 md:pt-24 lg:pt-32">
		<!-- Top buttons -->
		<div class="w-full flex justify-around content-center p-4 md:p-6 lg:p-8 gap-4">
			<HomeButton />
			<ExitButton />
		</div>
		<!-- Character info -->
		<div class="relative p-4 text-center">
			<div
				class="bg-gradient-to-t from-violet-900 to-fuchsia-800 lg:bg-gradient-to-r text-violet-200 overflow-hidden rounded-full shadow-2xl p-8 flex flex-col lg:flex-row gap-4 md:gap-6 max-w-full lg:max-w-5xl mx-auto flex-wrap">
				<!-- Character image -->
				<img :src="character.image" alt="Character Avatar"
					class="rounded-full shadow-lg sw-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover mx-auto lg:mx-0 flex-shrink-0 lg:mt-6" />
				<!-- Character details -->
				<div class="flex flex-col min-w-0 px-4 p-2">
					<h1
						class="text-xl md:text-3xl xl:text-5xl font-bold text-lime-300 text-center lg:text-left mb-4 break-words">
						{{ character.name }}
					</h1>
					<div class="space-y-2 lg:space-y-3 text-center lg:text-left break-words">
						<!-- Status -->
						<p>
							<span class="text-lime-300 font-semibold text-xl md:text-2xl xl:text-3xl">Status:</span>
							<span v-if="character.status === 'Alive'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">💚</span>
							<span v-else-if="character.status === 'Dead'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">☠️</span>
							<span v-else class="inline mx-2 text-xl md:text-2xl xl:text-3xl">❔</span>
						</p>
						<!-- Gender -->
						<p>
							<span class="text-lime-300 font-semibold text-xl md:text-2xl xl:text-3xl">Gender:</span>
							<span v-if="character.gender === 'Female'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">♀️</span>
							<span v-else-if="character.gender === 'Male'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">♂️</span>
							<span v-else-if="character.gender === 'Genderless'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">⚪</span>
							<span v-else class="inline mx-2 text-xl md:text-2xl xl:text-3xl">❔</span>
						</p>
						<!-- Species -->
						<p>
							<span class="text-lime-300 font-semibold text-xl md:text-2xl xl:text-3xl">Species:</span>
							<span v-if="character.species === 'Human'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">🧑</span>
							<span v-else-if="character.species === 'Alien'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">👽</span>
							<span v-else-if="character.species === 'Humanoid'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">🧑‍🚀</span>
							<span v-else-if="character.species === 'Poopybutthole'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">💩</span>
							<span v-else-if="character.species === 'Mythological Creature'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">🐉</span>
							<span v-else-if="character.species === 'Robot'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">🤖</span>
							<span v-else-if="character.species === 'Cronenberg'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">☣️</span>
							<span v-else-if="character.species === 'Disease'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">🦠</span>
							<span v-else-if="character.species === 'Animal'"
								class="inline mx-2 text-xl md:text-2xl xl:text-3xl">🐕</span>
							<span v-else class="inline mx-2 text-xl md:text-2xl xl:text-3xl">❔</span>
						</p>
						<!-- Type -->
						<p>
							<span class="text-lime-300 font-semibold text-xl md:text-2xl xl:text-3xl">Type:</span>
							<span class="inline mx-2 text-xl md:text-2xl xl:text-3xl break-words">{{ character.type ||"N/A" }}</span>
						</p>
						<!-- Origin -->
						<p>
							<span class="text-lime-300 font-semibold text-xl md:text-2xl xl:text-3xl">Origin:</span>
							<span class="inline mx-2 text-xl md:text-2xl xl:text-3xl break-words">{{character.origin?.name }}</span>
						</p>
						<!-- Location -->
						<p>
							<span class="text-lime-300 font-semibold text-xl md:text-2xl xl:text-3xl">Location:</span>
							<span class="inline mx-2 text-xl md:text-2xl xl:text-3xl break-words">
								{{character.location?.name }}</span>
						</p>
					</div>
				</div>
			</div>
			<!-- Navigation buttons -->
			<ChangeCharacterButtons :characters="charactersList" :currentIndex="currentIndex" />
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import ExitButton from "./ExitButton.vue";
import HomeButton from "./HomeButton.vue";
import ChangeCharacterButtons from "./ChangeCharacterButtons.vue";
import { useCharactersStore } from "@/stores/characters";

const route = useRoute();
const store = useCharactersStore();
const character = ref({});

const charactersList = computed(() =>
	store.searchActive ? store.characters : store.fullCharacters
);

const currentIndex = computed(() =>
	charactersList.value.findIndex((c) => c.id === +route.params.id)
);

const fetchCharacter = async (id) => {
	const response = await fetch(
		"https://rickandmortyapi.com/api/character/" + id
	);
	const data = await response.json();
	character.value = data;
};

onMounted(async () => {
	if (!store.fullCharacters.length) {
		await store.fetchAllCharacters();
	}
	fetchCharacter(route.params.id);
});

watch(
	() => route.params.id,
	(newId) => {
		fetchCharacter(newId);
	}
);
</script>
