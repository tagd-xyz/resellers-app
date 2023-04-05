import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useAccessRequestsStore = defineStore('accessRequests', {
  persist: true,
  state: () => {
    return {
      list: [],
      is: {
        fetching: false,
        posting: false,
      },
    };
  },
  getters: {
    isEmpty() {
      return this.list?.length == 0;
    },
  },
  actions: {
    clear() {
      this.list = [];
    },
    fetch() {
      return new Promise((resolve, reject) => {
        this.is.fetching = true;
        api
          .get('resale-access-requests')
          .then((response) => {
            this.list = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.list = [];
            reject(error);
          })
          .finally(() => {
            this.is.fetching = false;
          });
      });
    },
    add(payload) {
      return new Promise((resolve, reject) => {
        this.is.posting = true;
        api
          .post('resale-access-requests', payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.is.posting = false;
          });
      });
    },
  },
});
