<template>
	<div class="relative min-h-screen bg-center bg-cover bg-no-repeat
              bg-[url('/rick-and-morty-welcome-mobile-2.png')]
              md:bg-[url('/rick-and-morty-welcome.png')]">
		<div class="flex justify-center pt-100 md:pt-150">
			<RouterLink to="/all-characters">
				<button class="mt-10 mb-20 bg-lime-400 text-fuchsia-800 
                 hover:ring hover:ring-lime-500 hover:shadow-md hover:shadow-lime-500
                 hover:bg-fuchsia-800 hover:text-lime-400
                 font-semibold w-20 h-10 lg:w-24 text-xl rounded-full 
                 transition-colors duration-100 cursor-pointer">
					Enter
				</button>
			</RouterLink>
		</div>
	</div>
</template>
