import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),

  actions: {
    login() {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
    },

    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');
    },

    initializeAuthState() {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      this.isAuthenticated = isAuthenticated === 'true';
    },
  },
});
