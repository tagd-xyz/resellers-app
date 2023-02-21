export const state = () => ({
  user: false,
  token: false,
  me: false,
  actor: false,
});

export const mutations = {
  setAuth(state, { user, token }) {
    state.user = user;
    state.token = token;
  },
  setMe(state, me) {
    state.me = me;
  },
  setActor(state, actor) {
    state.actor = actor;
  },
};

export const actions = {
  async onAuthStateChangedAction({ commit }, { authUser }) {
    if (authUser) {
      const { uid, email, displayName } = authUser;
      commit('setAuth', {
        user: { uid, email, displayName },
        token: await authUser.getIdToken(),
      });
    } else {
      commit('setAuth', {
        user: false,
        token: false,
      });
      commit('setMe', false);
      commit('setActor', false);
    }
  },
  // eslint-disable-next-line no-unused-vars
  async fetchMe({ commit }) {
    const res = await this.$axios.get('me');
    commit('setMe', res.data.data);
    commit('setActor', res.data.data.actors[0]?.id ?? false);
  },
  setActor({ commit }, actor) {
    commit('setActor', actor);
  },
};
