import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    theme: 1,
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme
    }
  }
})
