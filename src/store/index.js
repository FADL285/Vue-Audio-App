import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthModalOpened: false,
  },
  getters: {},
  mutations: {
    toggleAuthModal: (state) =>
      (state.isAuthModalOpened = !state.isAuthModalOpened),
  },
  actions: {},
  modules: {},
});
