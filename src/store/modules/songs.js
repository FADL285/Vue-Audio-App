import {
  doc,
  getDocs,
  getDoc,
  startAfter,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
  deleteDoc,
  addDoc,
  increment,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import {
  auth,
  db,
  songsRef,
  songsCollection,
  commentsCollection,
} from "@/plugins/firebase.js";
import { Howl } from "howler";

const AUTH_SONGS = "auth";
const ALL_SONGS = "all";

export default {
  state: () => ({
    userSongs: [],
    songs: [],
    comments: {},
    currentPlayingSong: null,
    currentAudio: null,
    playerSongDuration: 0,
    playerSongCurrentTime: 0,
  }),
  mutations: {
    addSong(state, song) {
      state.songs.push(song);
    },
    addUserSong(state, song) {
      state.userSongs.push(song);
    },
    clearUserSongs(state) {
      state.userSongs = [];
    },
    updateSong(state, song) {
      const updatedSong = state.userSongs.find((s) => s.id === song.id);
      updatedSong.modifiedName = song.modifiedName;
      updatedSong.genre = song.genre;
    },
    updateSongCommentsCount(state, { songId }) {
      const song = state.songs.find((s) => s.id === songId);
      if (song) song.commentsCount++;
    },
    deleteSong(state, song) {
      state.userSongs = state.userSongs.filter((s) => s.id !== song.id);
    },
    addComment(state, comment) {
      if (!state.comments[comment.songId]) {
        state.comments[comment.songId] = [];
      }
      state.comments[comment.songId].push(comment);
    },
    playNewSong(state, song) {
      state.currentPlayingSong = song;
      state.currentAudio = new Howl({
        src: [song.url],
        html5: true,
      });
    },
    unloadCurrentSong(state) {
      state.currentAudio?.unload();
    },
    setCurrentSongDuration(state) {
      state.playerSongDuration = state.currentAudio.duration();
    },
    updateCurrentSongCurrentTime(state) {
      state.playerSongCurrentTime = state.currentAudio.seek();
    },
  },
  actions: {
    async fetchSongs({ commit, getters }, { type = ALL_SONGS, perPage = 10 }) {
      let q;
      // Type is all and first fetch
      if (type === ALL_SONGS && getters.songsListLength === 0) {
        q = query(songsCollection, orderBy("modifiedName"), limit(perPage));
      }
      // Type is all and not last
      else if (type === ALL_SONGS && getters.songsListLength !== 0) {
        const lastDoc = await getDoc(doc(db, "songs", getters.songs.at(-1).id));
        q = query(
          songsCollection,
          orderBy("modifiedName"),
          startAfter(lastDoc),
          limit(perPage)
        );
      }
      // Type is auth and first fetch
      else if (type === AUTH_SONGS && getters.userSongsListLength === 0) {
        q = query(
          songsCollection,
          where("uid", "==", auth.currentUser.uid),
          orderBy("modifiedName"),
          limit(perPage)
        );
      }
      // Type is auth and not first fetch
      else {
        const lastDoc = await getDoc(
          doc(db, "songs", getters.userSongs.at(-1).id)
        );
        q = query(
          songsCollection,
          where("uid", "==", auth.currentUser.uid),
          orderBy("modifiedName"),
          startAfter(lastDoc),
          limit(perPage)
        );
      }

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const song = {
          id: doc.id,
          ...doc.data(),
        };

        if (type === ALL_SONGS) commit("addSong", song);
        else commit("addUserSong", song);
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
      } catch (err) {
        console.error(err);
      }
    },
    async fetchSong({ getters }, { id }) {
      let song = getters.songs.find((s) => s.id === id);
      if (song) return song;
      try {
        const songDoc = await getDoc(doc(db, "songs", id));
        song = songDoc.data();
      } catch (err) {
        console.error(err);
      }
      return song;
    },
    async addComment({ commit }, { songId, content }) {
      try {
        const comment = {
          songId,
          content,
          authName: auth.currentUser.displayName,
          authId: auth.currentUser.uid,
          timestamp: Date.now(),
        };
        const { id } = await addDoc(commentsCollection, comment);
        comment.id = id;

        // Update song comments count
        await updateDoc(doc(db, "songs", songId), {
          commentsCount: increment(1),
        });
        commit("updateSongCommentsCount", { songId });
        commit("addComment", comment);
        return true;
      } catch (err) {
        console.info(err);
        return false;
      }
    },
    async fetchSongComments({ commit }, songId) {
      const q = query(
        commentsCollection,
        where("songId", "==", songId),
        orderBy("timestamp")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const comment = {
          id: doc.id,
          ...doc.data(),
        };
        commit("addComment", comment);
      });
    },
    playNewSong({ commit, dispatch }, song) {
      commit("unloadCurrentSong");
      commit("playNewSong", song);
      dispatch("togglePlay");
    },
    togglePlay({ state, dispatch, commit }) {
      if (!state.currentAudio.playing) return;
      if (state.currentAudio.playing()) state.currentAudio.pause();
      else {
        state.currentAudio.play();
        state.currentAudio.on("play", () => {
          commit("setCurrentSongDuration");
          dispatch("updateProgress");
        });
      }
    },
    updateProgress({ commit, state, dispatch }) {
      commit("updateCurrentSongCurrentTime");
      if (state.currentAudio.playing()) {
        requestAnimationFrame(() => dispatch("updateProgress"));
      }
    },
    //  Update Player Current Time
    updateCurrentTime({ state, commit, dispatch }, event) {
      if (!state.currentAudio.playing) return;

      const { clientX, currentTarget } = event;
      const { x, width } = currentTarget.getBoundingClientRect();
      const clickX = clientX - x;
      const percent = clickX / width;
      const seconds = percent * state.playerSongDuration;
      state.currentAudio.seek(seconds);
      commit("updateCurrentSongCurrentTime");
      state.currentAudio.once("seek", () => {
        setTimeout(() => {
          dispatch("updateProgress");
        });
      });
    },
  },
  getters: {
    songs: (state) => state.songs,
    userSongs: (state) => state.userSongs,
    userSongsListLength: (state) => state.userSongs.length,
    songsListLength: (state) => state.songs.length,
    getSongComments: (state) => (songId) => state.comments[songId],
    isPlaying: (state) => !!state.currentAudio?.playing(),
    getCurrentAudio: (state) => state.currentPlayingSong,
  },
};
