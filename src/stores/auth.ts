import { defineStore } from 'pinia'
import { useDogStore } from './dog'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('authStore', () => {
  const dogStore = useDogStore()
  const baseUrl = 'https://frontend-take-home-service.fetch.com/auth'
  const name = ref('')
  const email = ref('')

  async function login() {
    await axios.post(
      `${baseUrl}/login`,
      {
        name: name.value,
        email: email.value
      },
      {
        withCredentials: true
      }
    )
    dogStore.getBreeds()
  }
  async function logout() {
    try {
      await axios.post(`${baseUrl}/logout`, null, { withCredentials: true })
      dogStore.reset()
    } catch (error) {
      console.error(error)
    }
  }

  return { name, email, login, logout }
})
