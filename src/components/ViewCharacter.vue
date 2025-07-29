<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-16">
    <div class="bg-gradient-to-bl from-violet-900 to-fuchsia-800 text-violet-200 rounded-xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 max-w-4xl w-full">
      <img
        :src="character.image"
        alt="Character Avatar"
        class="rounded-xl shadow-lg w-58 h-58 object-cover mx-auto md:mx-0"
      />
      <div class="flex-1 space-y-3">
        <h2 class="text-3xl font-bold text-lime-300">{{ character.name }}</h2>
        <p><span class="text-lime-400">Status:</span> {{ character.status }}</p>
        <p><span class="text-lime-400">Species:</span> {{ character.species }}</p>
        <p><span class="text-lime-400">Type:</span> {{ character.type || 'N/A' }}</p>
        <p><span class="text-lime-400">Gender:</span> {{ character.gender }}</p>
        <p><span class="text-lime-400">Origin:</span> {{ character.origin?.name }}</p>
        <p><span class="text-lime-400">Location:</span> {{ character.location?.name }}</p>
        <p><span class="text-lime-400">Episode:</span> {{ character.episode }}</p>

        <RouterLink to="/">
          <button class="mt-4 bg-lime-400 text-violet-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 hover:bg-violet-800 hover:text-lime-400 
               font-semibold py-2 px-4 rounded transition-colors duration-100 cursor-pointer">← Back</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const character = ref({});
const route = useRoute();

onMounted(async () => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${route.params.id}`);
  const data = await response.json();
  character.value = data;
});
</script>
