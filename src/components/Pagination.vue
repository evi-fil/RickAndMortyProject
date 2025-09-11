<template>
	<div class="w-full flex justify-center content-center pb-6 gap-18 md:gap-56 lg:gap-72 xl:gap-96">
		<button @click="prevPage" :disabled="!pagination?.prev" class="mt-4 md:mt-6 lg:mt-8 
			bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 
             hover:shadow-md hover:shadow-lime-500 hover:bg-fuchsia-800 hover:text-lime-400 
             font-semibold text-3xl w-16 h-10 lg:w-20 rounded-full transition-colors duration-100 
             cursor-pointer disabled:invisible disabled:cursor-default">&larr;</button>

		<button @click="nextPage" :disabled="!pagination?.next" class="mt-4 md:mt-6 lg:mt-8 
			bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 
			hover:shadow-md hover:shadow-lime-500 hover:bg-fuchsia-800 hover:text-lime-400 
			font-semibold text-3xl w-16 h-10 lg:w-20 rounded-full transition-colors duration-100 
			cursor-pointer disabled:invisible disabled:cursor-default">&rarr;</button>
	</div>
</template>

<script setup>
const props = defineProps({ pagination: Object });
const emit = defineEmits(['prevPage', 'nextPage']);

function prevPage() {
	emit('prevPage');
}

function nextPage() {
	emit('nextPage');
}
</script>
