<template>
	<div class="w-full flex justify-center content-center pb-8 gap-18 md:gap-56 lg:gap-72 xl:gap-96">
		<button @click="$emit('prevPage')" :disabled="!pagination?.prev" class="mt-12 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 
            hover:bg-fuchsia-800 hover:text-lime-400 font-semibold text-3xl py-1 px-6 rounded-xl transition-colors duration-100 
            cursor-pointer disabled:invisible disabled:cursor-default">&larr;
		</button>

		<button @click="$emit('nextPage')" :disabled="!pagination?.next" class="mt-12 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500 
            hover:bg-fuchsia-800 hover:text-lime-400 font-semibold text-3xl py-1 px-6 rounded-xl transition-colors duration-100 
            cursor-pointer disabled:invisible disabled:cursor-default">&rarr;
		</button>
	</div>
</template>

<script setup>
const props = defineProps({
	pagination: Object,
});
const emits = defineEmits(['prevPage', 'nextPage']);
</script>