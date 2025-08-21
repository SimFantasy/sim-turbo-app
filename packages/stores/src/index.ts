import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

export const createStore = () => {
  const pinia = createPinia()
  pinia.use(piniaPersistedstate)
  return pinia
}
