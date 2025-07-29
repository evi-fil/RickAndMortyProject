<template>
    <div class="grid grid-cols-4 gap-12 justify-items-center-safe px-40 py-20">
        <div
            v-for="character in characters"
            :key="character.id"
            class="bg-gradient-to-bl from-violet-900 to-fuchsia-800 text-violet-200 p-6 rounded-xl shadow-lg w-72 hover:ring hover:ring-lime-500 hover:shadow-lime-500 hover:scale-110 transition-transform duration-200"
        >
            <Card :character="character" />
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import Card from './Card.vue';
const characters = ref([]);


onMounted(async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    characters.value = data.results;
});
</script>