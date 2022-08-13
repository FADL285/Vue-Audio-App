<script setup></script>

<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <AppUploader ref="uploader" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <template v-if="songs.length > 0">
              <MangeSong v-for="song in songs" :key="song.id" :song="song" />
            </template>
            <p v-else class="text-center">
              No Data Found, Upload Some Audios...
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import AppUploader from "@/components/AppUploader.vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/plugins/firebase.js";
import MangeSong from "@/components/manage/MangeSong.vue";

export default {
  data() {
    return {
      songs: [],
    };
  },
  components: { MangeSong, AppUploader },
  methods: {
    async fetchSongs() {
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
        this.songs.push(song);
      });
    },
  },
  async created() {
    await this.fetchSongs();
  },
  beforeRouteLeave() {
    if (this.$refs.uploader.hasActiveUploads) {
      const answer = window.confirm(
        "Do you really want to leave? you will cancel the uploads!"
      );
      if (!answer) return false;
      this.$refs.uploader.cancelUploads();
    }
  },
};
</script>
