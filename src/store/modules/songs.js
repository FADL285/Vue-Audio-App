import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { auth, db, songsRef } from "@/plugins/firebase.js";

export default {
  state: () => ({ userSongs: [] }),
  mutations: {
    addUserSong(state, song) {
      state.userSongs.push(song);
    },
    updateSong(state, song) {
      const updatedSong = state.userSongs.find((s) => s.id === song.id);
      updatedSong.modifiedName = song.modifiedName;
      updatedSong.genre = song.genre;
    },
    deleteSong(state, song) {
      state.userSongs = state.userSongs.filter((s) => s.id !== song.id);
    },
  },
  actions: {
    async fetchSongs({ commit }) {
      const q = query(
        collection(db, "songs"),
        where("uid", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const song = {
          id: doc.id,
          ...doc.data(),
        };
        commit("addUserSong", song);
      });
    },
    async updateSong({ commit }, song) {
      try {
        await updateDoc(doc(db, "songs", song.id), {
          modifiedName: song.modifiedName,
          genre: song.genre,
        });
        commit("updateSong", song);
      } catch (err) {
        console.error(err);
      }
    },
    async deleteSong({ commit }, song) {
      const songRef = ref(songsRef, song.originalName);
      try {
        await deleteDoc(doc(db, "songs", song.id));
        await deleteObject(songRef);
        commit("deleteSong", song);
        console.log("Delete Song Successfully");
      } catch (err) {
        console.error(err);
      }
    },
  },
  getters: {},
};
