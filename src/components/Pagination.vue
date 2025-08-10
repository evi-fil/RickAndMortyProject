<template>
<div class="w-full flex justify-around content-center py-8 px-32 gap-4">
    <button  @click="$emit('prevPage')" :disabled="!pagination?.prev" 
        class="mt-4 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 hover:bg-fuchsia-800 hover:text-lime-400 
        font-semibold text-3xl py-1 px-6 rounded transition-colors duration-100 cursor-pointer disabled:invisible disabled:cursor-default">
    &larr;
    </button>
    <button @click="$emit('nextPage')" :disabled="!pagination?.next" 
        class="mt-4 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 hover:bg-fuchsia-800 hover:text-lime-400 
        font-semibold text-3xl py-1 px-6 rounded transition-colors duration-100 cursor-pointer disabled:invisible disabled:cursor-default">
    &rarr;
    </button>
</div>
</template>

<script setup>
const props = defineProps({
    pagination: Object,
});
const emits = defineEmits(['prevPage', 'nextPage']);
</script>