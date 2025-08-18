<template>
	<div class="relative min-h-screen">
		<div
			class="fixed inset-0 bg-[url('/rick-and-morty-portal.jpg')] bg-center bg-cover bg-no-repeat bg-blend-multiply bg-gray-400 -z-10">
		</div>

		<RouterView />
	</div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>
