import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    username: '',
  }),

  actions: {
    login(username) {
      this.isAuthenticated = true;
      this.username = username; 
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username); 
    },

    logout() {
      this.isAuthenticated = false;
      this.username = ''; 
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username'); 
    },

    initializeAuthState() {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const username = localStorage.getItem('username');
      this.isAuthenticated = isAuthenticated === 'true';
      this.username = username || '';  
    },
  },
});
