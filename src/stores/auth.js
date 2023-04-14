import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => {
    return {
      user: false,
      token: false,
      enabled: false,
      interval: null,
    };
  },
  getters: {
    isSignedIn() {
      return false !== this.user;
    },
    isEnabled() {
      return false !== this.enabled;
    },
  },
  actions: {
    signIn(user, enabled) {
      this.user = user;
      this.enabled = enabled;
    },
    signOut() {
      this.user = false;
      this.token = false;
      this.enabled = false;
      this.interval = null;
    },
    setToken(token) {
      this.token = token;
    },
    setInterval(interval) {
      this.interval = interval;
    },
  },
});
