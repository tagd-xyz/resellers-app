export const state = () => ({
  data: [],
});

export const mutations = {
  set(state, data) {
    state.data = data;
  },
};

export const actions = {
  async fetchById({ commit }, id) {
    const res = await this.$axios.get('consumers/' + id);

    commit('set', res.data.data);

    return res.data;
  },
};
