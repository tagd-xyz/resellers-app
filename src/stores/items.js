import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useItemsStore = defineStore('items', {
  persist: true,
  state: () => {
    return {
      list: [],
      single: null,
      isFetching: false,
      isPosting: false,
      isDeleting: false,
    };
  },
  getters: {
    isLoading() {
      return this.isFetching || this.isPosting || this.isDeleting;
    },
    isEmpty() {
      return 0 == this.list.length;
    },
    getList() {
      return this.list;
    },
  },
  actions: {
    fetchAll() {
      this.isFetching = true;
      api
        .get('/api/v1/items')
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
    fetch(id) {
      this.isFetching = true;
      api
        .get('/api/v1/items/' + id)
        .then((response) => {
          this.single = response.data.data;
        })
        .catch(() => {
          this.single = null;
        })
        .finally(() => {
          this.isFetching = false;
        });
    },
    add(payload) {
      return new Promise((resolve, reject) => {
        this.isPosting = true;
        api
          .post('/api/v1/items', payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.isPosting = false;
          });
      });
    },
    delete(id) {
      return new Promise((resolve, reject) => {
        this.isDeleting = true;
        api
          .delete('/api/v1/items/' + id)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.isDeleting = false;
          });
      });
    },
  },
});
