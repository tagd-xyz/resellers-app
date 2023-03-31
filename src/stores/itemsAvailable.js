import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useItemsAvailableStore = defineStore('itemsAvailable', {
  persist: true,
  state: () => {
    return {
      list: [],
      isFetching: false,
    };
  },
  getters: {
    isEmpty() {
      return 0 == this.list.length;
    },
  },
  actions: {
    clear() {
      this.list = [];
    },
    fetch(consumer) {
      this.isFetching = true;
      api
        .get('tagds-available-for-resale', {
          params: { consumer },
        })
        .then((response) => {
          this.list = response.data.data;
        })
        .catch(() => {
          this.list = [];
        })
        .finally(() => {
          this.isFetching = false;
        });
    },
  },
});
