<template>
  <div class="min-h-screen px-6 py-16">
    <div class="pl-122 pb-8">
      <RouterLink :to="{ path: '/', query: { page: pageFromQuery } }">
        <button
          class="group mt-4 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 hover:bg-fuchsia-800 hover:text-lime-400 
          font-semibold text-3xl py-1 px-6 rounded transition-colors duration-100 cursor-pointer">
          <svg
              class="w-8 h-8 fill-current transition-colors duration-200 group-hover:text-lime-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 495.398 495.398">
            <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
            <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
          </svg>
        </button>
      </RouterLink>
    </div>

    <div class="bg-gradient-to-bl from-violet-900 to-fuchsia-800 text-violet-200 rounded-xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 max-w-4xl w-full mx-auto">
      <img
        :src="character.image"
        alt="Character Avatar"
        class="rounded-xl shadow-lg w-90 h-90 object-cover mx-auto md:mx-0"
      />
      <div class="flex-1 space-y-3">
        <h1 class="text-3xl font-bold text-lime-300">{{ character.name }}</h1>
        <p><span class="text-lime-400">Status:</span> {{ character.status }}</p>
        <p><span class="text-lime-400">Species:</span> {{ character.species }}</p>
        <p><span class="text-lime-400">Type:</span> {{ character.type || 'N/A' }}</p>
        <p><span class="text-lime-400">Gender:</span> {{ character.gender }}</p>
        <p><span class="text-lime-400">Origin:</span> {{ character.origin?.name }}</p>
        <p><span class="text-lime-400">Location:</span> {{ character.location?.name }}</p>
      </div>
    </div>

    <CharacterButtons />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import CharacterButtons from './CharacterButtons.vue';
import { usePageFromQuery } from '@/composables/pageFromQuery';
import { useRoute } from 'vue-router';

const pageFromQuery = usePageFromQuery();

const route = useRoute();

const character = ref({});

const fetchCharacter = async (id) => {
  const response = await fetch('https://rickandmortyapi.com/api/character/' + id);
  const data = await response.json();
  character.value = data;
};

onMounted(() => {
  fetchCharacter(route.params.id);
});

watch(() => route.params.id, (newId) => {
  fetchCharacter(newId);
});
</script>
