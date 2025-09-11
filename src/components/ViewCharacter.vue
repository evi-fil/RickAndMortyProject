<template>
	<div class="w-full flex justify-around content-center p-4 md:p-6 lg:p-8 gap-4">
		<HomeButton />

		<ExitButton />
	</div>
	<!-- Image -->
	<div class="relative min-h-screen p-4">
		<div
			class="bg-gradient-to-t from-violet-900 to-fuchsia-800 md:bg-gradient-to-r text-violet-200 rounded-xl shadow-2xl p-6 flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
			<img :src="character.image" alt="Character Avatar"
				class="rounded-xl shadow-lg lg:w-90 lg:h-90 object-cover mx-auto md:mx-0" />
			<div class="flex flex-col flex-1">
				<h1 class="text-3xl font-bold text-lime-300 text-left mb-4 xl:text-5xl">
					{{ character.name }}
				</h1>
				<div class="space-y-2">
					<p>
						<span class="text-lime-300 font-semibold text-xl lg:text-2xl 2xl:text-3xl">Status:</span>
						<span v-if="character.status === 'Alive'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">💚</span>
						<span v-else-if="character.status === 'Dead'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">☠️</span>
						<span v-else class="inline ml-3 text-xl lg:text-2xl xl:text-3xl">❔</span>
					</p>

					<p>
						<span class="text-lime-300 font-semibold text-xl lg:text-2xl 2xl:text-3xl">Gender:</span>
						<span v-if="character.gender === 'Female'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">♀️</span>
						<span v-else-if="character.gender === 'Male'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">♂️</span>
						<span v-else-if="character.gender === 'Genderless'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">⚪</span>
						<span v-else class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">❔</span>
					</p>

					<p>
						<span class="text-lime-300 font-semibold text-xl lg:text-2xl 2xl:text-3xl">Species:</span>
						<span v-if="character.species === 'Human'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">🧑</span>
						<span v-else-if="character.species === 'Alien'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">👽</span>
						<span v-else-if="character.species === 'Humanoid'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">🧑‍🚀</span>
						<span v-else-if="character.species === 'Poopybutthole'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">💩</span>
						<span v-else-if="character.species === 'Mythological Creature'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">🐉</span>
						<span v-else-if="character.species === 'Robot'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">🤖</span>
						<span v-else-if="character.species === 'Cronenberg'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">☣️</span>
						<span v-else-if="character.species === 'Disease'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">🦠</span>
						<span v-else-if="character.species === 'Animal'"
							class="inline ml-3 text-xl lg:text-2xl 2xl:text-3xl">🐕</span>
						<span v-else class="inline ml-3 text-lg lg:text-xl 2xl:text-3xl">❔</span>
					</p>

					<p>
						<span class="text-lime-300 font-semibold mr-3 text-xl lg:text-2xl 2xl:text-3xl">Type:</span>
						<span class="inline ml-3 text-lg lg:text-xl 2xl:text-2xl">{{ character.type || "N/A" }}</span>
					</p>
					<p>
						<span class="text-lime-300 font-semibold mr-3 text-xl lg:text-2xl 2xl:text-3xl">Origin:</span>
						<span class="inline ml-3 text-lg lg:text-xl 2xl:text-2xl">{{ character.origin?.name }}</span>
					</p>
					<p>
						<span class="text-lime-300 font-semibold mr-3 text-xl lg:text-2xl 2xl:text-3xl">Location:</span>
						<span class="inline ml-3 text-lg lg:text-xl 2xl:text-2xl">{{ character.location?.name }}</span>
					</p>
				</div>
			</div>
		</div>

		<ChangeCharacterButtons />
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import ExitButton from "./ExitButton.vue";
import HomeButton from "./HomeButton.vue";
import ChangeCharacterButtons from "./ChangeCharacterButtons.vue";

const route = useRoute();

const character = ref({});

const fetchCharacter = async (id) => {
	const response = await fetch(
		"https://rickandmortyapi.com/api/character/" + id
	);
	const data = await response.json();
	character.value = data;
};

onMounted(() => {
	fetchCharacter(route.params.id);
});

watch(
	() => route.params.id,
	(newId) => {
		fetchCharacter(newId);
	}
);
</script>
