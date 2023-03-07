import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useTagdStore = defineStore('tagd', {
  persist: true,
  state: () => {
    return {
      data: null,
      is: {
        fetching: false,
      },
    };
  },
  getters: {},
  actions: {
    fetch(tagdId) {
      this.is.fetching = true;
      api
        .get('tagds/' + tagdId)
        .then((response) => {
          this.data = response.data.data;
        })
        .catch(() => {
          this.data = [];
        })
        .finally(() => {
          this.is.fetching = false;
        });
    },
  },
});
