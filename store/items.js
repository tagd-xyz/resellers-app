export const state = () => ({
  data: [],
});

export const mutations = {
  set(state, data) {
    state.data = data;
  },
};

export const actions = {
  async fetch({ commit }) {
    const res = await this.$axios.get('items');

    commit('set', res.data.data);

    return res.data;
  },

  // eslint-disable-next-line no-unused-vars
  async add({ commit }, payload) {
    await this.$axios.post('items', payload);
  },
};
