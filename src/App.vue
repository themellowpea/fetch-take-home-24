<script setup lang="ts">
import DogSearch from './components/DogSearch.vue'
import { onMounted, ref } from 'vue'
import { useDogStore } from './stores/dog'
import { useAuthStore } from './stores/auth'

const dogStore = useDogStore()
const authStore = useAuthStore()
onMounted(async () => {
  await dogStore.getBreeds()
})

const hasFavorites = ref(false)
dogStore.$subscribe((_, store) => {
  const favorites = Object.keys(store.favoritesList)
  if (favorites.length > 0) {
    hasFavorites.value = true
  } else hasFavorites.value = false
})
</script>

<template>
  <div class="wrapper">
    <div v-if="!dogStore.isAuthenticated">
      <h1 class="mt-8 text-4xl font-bold text-gray-700">Fetch Rewards Take Home</h1>
      <h1 class="mt-4 text-2xl font-bold text-gray-700">Welcome!</h1>

      <p class="text-sm text-gray-800">Sign-in below to begin searching available adoptions!</p>
      <p class="text-xs text-gray-600">
        You will be able to add selected dogs to a list of favorites and generate a match for
        adoption instantly!
      </p>

      <div class="mt-8">
        <label for="name" class="sr-only block text-sm font-medium leading-6 text-gray-900"
          >Name</label
        >
        <input
          type="text"
          name="name"
          id="name"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Name"
          v-model="authStore.name"
        />
      </div>
      <div class="mt-2">
        <label for="email" class="sr-only block text-sm font-medium leading-6 text-gray-900"
          >Email</label
        >
        <input
          type="email"
          name="email"
          id="email"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Email"
          v-model="authStore.email"
        />
      </div>

      <button
        type="button"
        class="mt-4 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        @click.prevent="authStore.login"
      >
        Login
      </button>
    </div>

    <div v-else>
      <button
        type="button"
        class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        @click.prevent="authStore.logout"
      >
        Log Out
      </button>
      <button
        v-if="hasFavorites"
        type="button"
        class="ml-3 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        @click.prevent="dogStore.findMatch"
      >
        Find Match
      </button>
      <DogSearch />
    </div>
  </div>
</template>
