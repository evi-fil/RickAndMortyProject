<template>
	<div class="flex justify-center pt-4">
		<!--Search bar-->
		<input v-model="searchName" @keyup.enter="handleSearch" type="text" placeholder="Search Character..."
			aria-label="Search Character" class="w-52 md:w-80 lg:w-96 h-10 rounded-l-full border border-fuchsia-800
             focus:outline-none focus:ring-1 focus:ring-fuchsia-800 focus:border-lime-400
             text-center  text-fuchsia-800 placeholder:text-fuchsia-800
             font-base text-lg transition-colors duration-100 bg-white/30 backdrop-blur-sm 
			 hover:bg-white/50 hover:shadow-md hover:shadow-lime-500" />

		<button @click="handleSearch" class="h-10 w-10 md:w-12 -ml-px bg-lime-400 text-fuchsia-800 rounded-r-full
             hover:bg-fuchsia-800 hover:text-lime-400
             focus:outline-none focus:ring-1 focus:ring-lime-400
             transition-colors duration-100 flex items-center justify-center hover:shadow-md hover:shadow-lime-500">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
				stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
			</svg>
		</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const searchName = ref('');
const emit = defineEmits(['handleSearch']);

function handleSearch() {
	emit('handleSearch', searchName.value.trim());
}
</script>
