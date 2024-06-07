import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  }),
  actions: {
    login() {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
    },
    logout() {
      this.isAuthenticated = false;
      localStorage.setItem('isAuthenticated', 'false');
    },
  },
});
