import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => {
    return {
      user: false,
      token: false,
      interval: null,
    };
  },
  getters: {
    isSignedIn() {
      return false !== this.user;
    },
  },
  actions: {
    signIn(user) {
      this.user = user;
    },
    signOut() {
      this.user = false;
    },
    setToken(token) {
      this.token = token;
    },
    setInterval(interval) {
      this.interval = interval;
    },
    clearInterval() {
      this.interval = null;
    },
  },
});
