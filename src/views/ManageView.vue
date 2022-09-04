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
          class="relative flex flex-col rounded border border-gray-200 bg-white"
        >
          <div class="border-b border-gray-200 px-6 pt-6 pb-5 font-bold">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-2xl text-green-400"
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
import MangeSong from "@/components/manage/MangeSong.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userSongsListLength: "userSongsListLength",
      songs: "userSongs",
    }),
  },
  components: { MangeSong, AppUploader },
  methods: {
    ...mapActions(["fetchSongs"]),
  },
  async created() {
    if (this.userSongsListLength === 0) {
      await this.fetchSongs({ type: "auth" });
    }
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
