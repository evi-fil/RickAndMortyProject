<template>
	<div class="text-center text-violet-200 w-72 mx-auto 
           py-6 rounded-full shadow-lg
           bg-gradient-to-t from-violet-900 to-fuchsia-800 
           hover:ring hover:ring-lime-500 hover:shadow-lime-500 
           hover:scale-110 transition-transform duration-200">
		<div class="flex justify-center">
			<img :src="character.image" alt="Character Avatar" class="rounded-full object-cover shadow-md w-52 h-52" />
		</div>

		<div class="text-center p-4">
			<h2 class="text-lime-300 font-bold text-lg truncate"> {{ character.name }}</h2>
			<!-- Gender -->
			<p>
				<span class="text-lime-200">Gender:</span>
				<span v-if="character.gender === 'Female'" class="inline ml-2 text-md">♀️</span>
				<span v-else-if="character.gender === 'Male'" class="inline ml-2 text-md">♂️</span>
				<span v-else-if="character.gender === 'Genderless'" class="inline ml-2 text-md">⚪</span>
				<span v-else class="inline ml-2 text-md">❔</span>
			</p>
			<!-- Species -->
			<p>
				<span class="text-lime-200">Species:</span>
				<span v-if="character.species === 'Human'" class="inline ml-2 text-md">🧑</span>
				<span v-else-if="character.species === 'Alien'" class="inline ml-2 text-md">👽</span>
				<span v-else-if="character.species === 'Humanoid'" class="inline ml-2 text-md">🧑‍🚀</span>
				<span v-else-if="character.species === 'Poopybutthole'" class="inline ml-2 text-md">💩</span>
				<span v-else-if="character.species === 'Mythological Creature'" class="inline ml-2 text-md">🐉</span>
				<span v-else-if="character.species === 'Robot'" class="inline ml-2 text-md">🤖</span>
				<span v-else-if="character.species === 'Cronenberg'" class="inline ml-2 text-md">☣️</span>
				<span v-else-if="character.species === 'Disease'" class="inline ml-2 text-md">🦠</span>
				<span v-else-if="character.species === 'Animal'" class="inline ml-2 text-md">🐕</span>
				<span v-else class="inline ml-2 text-md">❔</span>
			</p>

			<RouterLink :to="{ path: '/character/' + character.id, query: { page: currentPage } }">
				<button @click="scrollToTop" class="mt-4 bg-lime-400 text-fuchsia-800 hover:ring hover:ring-lime-500 hover:shadow-md
                 hover:shadow-lime-500 hover:bg-fuchsia-800 hover:text-lime-400
                 font-semibold w-24 h-10 rounded-full transition-colors duration-100 cursor-pointer">
					Show More
				</button>
			</RouterLink>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	character: Object,
	currentPage: Number,
});

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>