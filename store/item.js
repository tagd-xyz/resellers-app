export const state = () => ({
  data: [],
});

export const mutations = {
  set(state, data) {
    state.data = data;
  },
};

export const actions = {
  async fetchById({ commit }, retailerId) {
    const res = await this.$axios.get('items/' + retailerId);

    commit('set', res.data.data);

    return res.data;
  },

  // eslint-disable-next-line no-unused-vars
  async setAsActive({ commit }, tagdId) {
    await this.$axios.put('tagds/' + tagdId, {
      isActive: true,
    });
  },
};
