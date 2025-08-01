<template>
    <div class="text-center text-violet-200 w-60 mx-auto">
        <div class="flex justify-center">
            <img
                :src="character.image"
                alt="Character Avatar"
                class="rounded-lg object-cover shadow-md w-52 h-52"
            />
        </div>
        <div class="text-center p-4">
            <h2 class="text-lime-300 font-bold text-lg"> {{ character.name }}</h2>
            <p><span class="text-lime-200">Status:</span> {{ character.status }}</p>
            <p><span class="text-lime-200">Species:</span> {{ character.species }}</p>
            <RouterLink :to="{ path: '/character/' + character.id, query: { page: currentPage } }">  
                <button class="mt-4 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 hover:bg-fuchsia-800 hover:text-lime-400 
               font-semibold py-2 px-4 rounded transition-colors duration-100 cursor-pointer">Show More</button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    character: Object,
    currentPage: Number,
});
</script>