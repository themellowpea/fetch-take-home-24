<script setup lang="ts">
import SearchPage from './components/SearchPage.vue'
import { onMounted } from 'vue'
import { useDogStore } from './stores/dog'
import { useAuthStore } from './stores/auth'

const dogStore = useDogStore()
const authStore = useAuthStore()
onMounted(async () => {
  await dogStore.getBreeds()
})
</script>

<template>
  <div class="wrapper">
    <div v-if="!dogStore.isAuthenticated()">
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
      <div class="mt-2">
        <input
          type="email"
          name="email"
          id="email"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="you@example.com"
          v-model="authStore.email"
        />
      </div>
      <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>

      <div class="mt-2">
        <input
          type="text"
          name="name"
          id="name"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="mark"
          v-model="authStore.name"
        />
      </div>

      <button
        type="button"
        class="m2-4 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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
      <SearchPage />
    </div>
  </div>
</template>
