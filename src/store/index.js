import { createStore } from "vuex";
import users from "@/store/modules/users.js";
import songs from "@/store/modules/songs.js";

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
  modules: {
    users,
    songs,
  },
});
