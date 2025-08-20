<template>
	<div class="flex justify-around content-center gap-4 pb-4">
		<div class="p-4 md:mt-10">
			<RouterLink :to="{ path: '/all-characters', query: { page: pageFromQuery } }">
				<button
					class="group mt-4 ml-4 mb-4 md:mb-6 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 
				hover:bg-fuchsia-800 hover:text-lime-400 font-semibold text-3xl py-1 px-6 rounded-xl transition-colors duration-100 cursor-pointer">
					<svg class="w-8 h-8 fill-current transition-colors duration-200 group-hover:text-lime-400"
						xmlns="http://www.w3.org/2000/svg" viewBox="0 0 495.398 495.398">
						<path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,
						0-28.377,12.709-28.377,28.391v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,
						225.514c-11.082,11.104-11.082,29.071,0,40.158c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,
						16.893-6.083,22.976-0.018l187.742,187.747c5.567,5.551,12.825,8.312,
						20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z" />
						<path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,
						6.164-4.085,9.877v120.401c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,
						51.159-51.159V306.79c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z" />
					</svg>
				</button>
			</RouterLink>
		</div>

		<ExitButton />
	</div>
	
	<div class="min-h-screen p-4">
		<div
			class="bg-gradient-to-t from-violet-900 from-0% to-fuchsia-800 to-100% lg:bg-gradient-to-r text-violet-200 rounded-xl shadow-2xl p-6 flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
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

		<CharacterButtons />
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import CharacterButtons from "./CharacterButtons.vue";
import { usePageFromQuery } from "@/composables/pageFromQuery";
import { useRoute } from "vue-router";
import ExitButton from "./ExitButton.vue";

const pageFromQuery = usePageFromQuery();

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
