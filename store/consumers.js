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
    const res = await this.$axios.get('consumers');

    commit('set', res.data.data);

    return res.data;
  },
};
