<script setup lang="ts">
import { useDogStore } from '@/stores/dog'
import type { Dog } from '@/types'

const dogStore = useDogStore()

async function handleSelectDog(dog: Dog) {
  await dogStore.selectCurrentDog(dog)
}
</script>
<template>
  <!--Puppy Grid-->
  <ul
    role="list"
    class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 mt-2"
  >
    <li v-for="(dog, index) in dogStore.dogs" :key="index + dog.name" class="relative">
      <div
        class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
        @click.prevent="handleSelectDog(dog)"
      >
        <img
          :src="dog.img"
          alt=""
          class="pointer-events-none object-cover group-hover:opacity-75"
        />
        <button type="button" class="absolute inset-0 focus:outline-none">
          <span class="sr-only">View more details for {{ dog.name }}</span>
        </button>
      </div>
      <div>
        <p class="pointer-events-none block truncate text-sm font-medium text-gray-900">
          {{ dog.name }}
        </p>
        <p class="pointer-events-none block text-sm font-medium text-gray-500">
          {{ dog.age }}
        </p>
      </div>
    </li>
  </ul>
</template>
