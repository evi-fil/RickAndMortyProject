<template>
    <button  @click="$emit('prevPage')" v-if="pagination?.prev" class="mt-4 bg-lime-400 text-violet-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 hover:bg-violet-800 hover:text-lime-400 
               font-semibold py-2 px-4 rounded transition-colors duration-100 cursor-pointer"><-</button>
    <button @click="$emit('nextPage')" v-if="pagination?.next" class="mt-4 bg-lime-400 text-violet-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 hover:bg-violet-800 hover:text-lime-400 
               font-semibold py-2 px-4 rounded transition-colors duration-100 cursor-pointer">-></button>
</template>

<script setup>
const props = defineProps({
    pagination: Object,
});
const emits = defineEmits(['prevPage', 'nextPage']);
</script>