<template>
	<div class="fixed inset-0 bg-center bg-cover bg-no-repeat lg:bg-fixed 
           bg-[url('/rick-and-morty-portal.jpg')] bg-blend-multiply bg-gray-400">
	</div>

	<div class="relative min-h-screen">
		<RouterView />
	</div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>
