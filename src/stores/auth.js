import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => {
    return {
      user: false,
      token: false,
    };
  },
  getters: {
    isSignedIn() {
      return false !== this.user;
    },
  },
  actions: {
    signIn(user) {
      console.log('setting user');
      this.user = user;
    },
    signOut() {
      console.log('clear user');
      this.user = false;
    },
    setToken(token) {
      if (token) {
        console.log('setting token');
      } else {
        console.log('clear token');
      }
      this.token = token;
    },
  },
});
