<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
  Switch,
  SwitchGroup,
  SwitchLabel
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useDogStore } from '../stores/dog'
import { storeToRefs } from 'pinia'

const dogStore = useDogStore()

const { showModal, currentDog } = storeToRefs(dogStore)

function handleClose() {
  showModal.value = false
}
</script>

<template>
  <TransitionRoot as="template" :show="showModal">
    <Dialog class="relative z-10" @close="handleClose">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
        >
          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden md:inline-block md:h-screen md:align-middle" aria-hidden="true"
            >&#8203;</span
          >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enter-to="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 md:scale-100"
            leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <DialogPanel
              class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
            >
              <div
                class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
              >
                <button
                  type="button"
                  class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  @click="handleClose"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                <div
                  class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:items-center lg:gap-x-8"
                >
                  <div
                    class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5"
                  >
                    <img :src="currentDog.img" alt="" class="object-cover object-center" />
                  </div>
                  <div class="sm:col-span-8 lg:col-span-7">
                    <h2 class="text-xl font-medium text-gray-900 sm:pr-12">
                      {{ currentDog.name }}
                    </h2>

                    <section aria-labelledby="information-heading" class="mt-1">
                      <h3 id="information-heading" class="sr-only">Puppy Details</h3>

                      <SwitchGroup as="div" class="flex items-center">
                        <Switch
                          v-model="currentDog.favorite"
                          :class="[
                            currentDog.favorite ? 'bg-indigo-600' : 'bg-gray-200',
                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                          ]"
                          @click="dogStore.toggleFavorite"
                        >
                          <span
                            aria-hidden="true"
                            :class="[
                              currentDog.favorite ? 'translate-x-5' : 'translate-x-0',
                              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                            ]"
                          />
                        </Switch>
                        <SwitchLabel as="span" class="ml-3 text-sm">
                          <span class="font-medium text-gray-900">{{
                            currentDog.favorite ? 'Favorite!' : `Add to Favorites`
                          }}</span>
                        </SwitchLabel>
                      </SwitchGroup>

                      <!-- Reviews -->
                      <div class="mt-4">
                        <h4 class="sr-only">Reviews</h4>
                      </div>
                    </section>

                    <section aria-labelledby="options-heading" class="mt-8">
                      <h3 id="options-heading" class="sr-only">Product options</h3>
                    </section>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
