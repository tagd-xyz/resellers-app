import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useTagdsStore = defineStore('tagds', {
  persist: true,
  state: () => {
    return {
      list: [],
      is: {
        fetching: false,
        posting: false,
        deleting: false,
        confirming: false,
      },
    };
  },
  getters: {},
  actions: {
    fetch() {
      this.is.fetching = true;
      api
        .get('tagds')
        .then((response) => {
          this.list = response.data.data;
        })
        .catch(() => {
          this.list = [];
        })
        .finally(() => {
          this.is.fetching = false;
        });
    },
    add(tagdId) {
      return new Promise((resolve, reject) => {
        this.is.posting = true;
        api
          .post('tagds', {
            tagdId: tagdId,
          })
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
    delete(tagdId) {
      return new Promise((resolve, reject) => {
        this.is.deleting = true;
        api
          .delete('tagds/' + tagdId)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.is.deleting = false;
          });
      });
    },
    confirm(tagdId, consumerEmail, price, location) {
      return new Promise((resolve, reject) => {
        this.is.confirming = true;
        api
          .post('tagds/' + tagdId + '/confirm', {
            consumerEmail: consumerEmail,
            price: price,
            location: location,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.is.confirming = false;
          });
      });
    },
    cancel(tagdId) {
      return new Promise((resolve, reject) => {
        this.is.confirming = true;
        api
          .post('tagds/' + tagdId + '/cancel')
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.is.confirming = false;
          });
      });
    },
  },
});
