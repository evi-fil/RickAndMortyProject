<template>
	<div v-show="showButton" class="fixed bottom-18 right-4 lg:right-10 transition-opacity duration-300">
		<button @click="scrollToTop" class="mt-4 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 
		hover:shadow-md hover:shadow-lime-500 hover:bg-fuchsia-800 
		hover:text-lime-400 font-semibold text-3xl w-10 h-10 lg:w-12 lg:h-12 
		rounded-full transition-colors duration-100 cursor-pointer">&uarr;</button>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showButton = ref(false);

const handleScroll = () => {
	showButton.value = window.scrollY > window.innerHeight / 2
};

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" })
};

onMounted(() => {
	window.addEventListener("scroll", handleScroll)
});

onUnmounted(() => {
	window.removeEventListener("scroll", handleScroll)
});
</script>