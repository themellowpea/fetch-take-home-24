import { defineStore } from 'pinia'
import { computed, ref, shallowRef, type Ref, type ShallowRef } from 'vue'
import axios from 'axios'
import { type Dog, type DogLocation, type DogSearchQueryParams } from '@/types'

export const useDogStore = defineStore('dogStore', () => {
  const baseUrl = 'https://frontend-take-home-service.fetch.com'

  const breeds = ref([])
  const httpStatus = ref('')
  const total = ref(0)
  const next = ref('')
  const prev = ref('')
  const dogs: ShallowRef<Dog[]> = shallowRef([])
  const currentDog: Ref<Dog> = ref({}) as Ref<Dog>
  const currentAddress: Ref<DogLocation> = ref({}) as Ref<DogLocation>

  const showModal = ref(false)
  // App.vue is calling getBreeds() onMount so we will know authentication status when the app mounts
  // The user should be forced to login and authenticate
  async function getBreeds() {
    try {
      const { data, status } = await axios.get(`${baseUrl}/dogs/breeds`, {
        withCredentials: true
      })
      breeds.value = data
      httpStatus.value = status.toString()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else console.error(error)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function searchDogs(params: DogSearchQueryParams, _url: string = baseUrl || '') {
    try {
      const searchResults = await axios.get(`${baseUrl}/dogs/search`, {
        withCredentials: true,
        params
      })

      total.value = searchResults.data.total
      next.value = searchResults.data.next
      prev.value = searchResults.data.prev

      const dogObjects = await axios.post(`${baseUrl}/dogs`, searchResults.data.resultIds, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dogs.value = dogObjects.data
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else console.error(error)
    }
  }

  async function goNextPage(params: DogSearchQueryParams) {
    try {
      await searchDogs(params, baseUrl + next.value)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else console.error(error)
    }
  }
  async function goPrevPage(params: DogSearchQueryParams) {
    try {
      await searchDogs(params, baseUrl + prev.value)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else console.error(error)
    }
  }

  function isAuthenticated() {
    return httpStatus.value === '200'
  }

  function reset() {
    breeds.value = []
    httpStatus.value = ''
    dogs.value = []
    currentDog.value = {} as Dog
  }

  async function selectCurrentDog(dog: Dog) {
    currentDog.value = dog
    await getCurrentLocation()
    showModal.value = true
  }

  async function getCurrentLocation() {
    try {
      const { zip_code } = currentDog.value
      const { data } = await axios.post(`${baseUrl}/locations`, [zip_code], {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      currentAddress.value = data[0]
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else console.error(error)
    }
  }

  const favoritesList: ShallowRef<Record<string, boolean>> = shallowRef({})
  function toggleFavorite() {
    if (favoritesList.value[currentDog.value.id]) {
      delete favoritesList.value[currentDog.value.id]
    } else favoritesList.value[currentDog.value.id] = true
  }

  async function findMatch() {
    try {
      const favoriteDogs = Object.keys(favoritesList.value)
      console.log(favoriteDogs)
      const { data } = await axios.post(`${baseUrl}/dogs/match`, favoriteDogs, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(data)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else console.error(error)
    }
  }

  return {
    breeds,
    getBreeds,
    reset,
    isAuthenticated,
    searchDogs,
    dogs,
    total,
    next,
    prev,
    goNextPage,
    goPrevPage,
    showModal,
    currentDog,
    currentAddress,
    selectCurrentDog,
    favoritesList,
    toggleFavorite,
    findMatch
  }
})
