import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/plugins/firebase.js";
import { doc, setDoc } from "firebase/firestore";

export default {
  state: () => ({
    isUserLoggedIn: false,
  }),
  mutations: {
    toggleAuth: (state) => (state.isUserLoggedIn = !state.isUserLoggedIn),
  },
  actions: {
    async register({ commit }, payload) {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      await updateProfile(user, {
        displayName: payload.name,
      });
      await setDoc(doc(db, "users", user.uid), {
        name: payload.name,
        email: payload.email,
        country: payload.country,
      });
      commit("toggleAuth");
      setTimeout(() => commit("toggleAuthModal"), 500);
    },
    async login({ commit }, payload) {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);
      commit("toggleAuth");
      setTimeout(() => commit("toggleAuthModal"), 500);
    },
    autoLogin({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit("toggleAuth");
      }
    },
    async logout({ commit }) {
      await signOut(auth);
      commit("toggleAuth");
      commit("clearUserSongs");
    },
  },
  getters: {},
};
