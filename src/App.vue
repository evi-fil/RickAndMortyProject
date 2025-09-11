<template>
	<div class="relative min-h-screen bg-center bg-repeat-y
		bg-[url('rick-and-morty-mobile.jpg')]
		bg-fixed md:bg-[url('/rick-and-morty.jpg')] 
		md:bg-no-repeat md:bg-cover bg-blend-multiply bg-gray-400">
		<RouterView />
	</div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>
