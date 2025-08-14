<template>
  <div
    class="relative min-h-screen bg-center bg-cover bg-fixed bg-no-repeat bg-[url('/rick-and-morty-portal.jpg')] bg-blend-multiply bg-gray-400">
  <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>
