<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import SongItem from "@/components/SongItem.vue";
import { useIntersectionObserver } from "@/composables/useIntersectionObserver.js";

// Fetch Songs
const store = useStore();
if (store.getters.songsListLength === 0) store.dispatch("fetchSongs", {});
const songs = computed(() => store.state.songs.songs);

// Infinite Scroll Logic
const loader = ref(null);
const load = () => {
  console.log("Load More Media..."); // TODO
};
onMounted(() => {
  useIntersectionObserver(loader.value, load);
});
</script>

<template>
  <!-- Introduction -->
  <section class="relative mb-8 py-20 text-center text-white">
    <div
      class="introduction-bg absolute inset-0 h-full w-full bg-contain"
      style="background-image: url(/assets/img/header.png)"
    ></div>
    <div class="container mx-auto">
      <div class="main-header-content text-white">
        <h1 class="mb-5 text-5xl font-bold">{{ $t("home.listen") }}</h1>
        <p class="mx-auto w-full md:w-8/12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et
          dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
          suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
          pulvinar, fringilla lorem eget, ullamcorper urna.
        </p>
      </div>
    </div>

    <img
      class="relative mx-auto mt-5 -mb-20 block w-auto max-w-full"
      src="/assets/img/introduction-music.png"
      alt="music images"
    />
  </section>

  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="relative flex flex-col rounded border border-gray-200 bg-white">
      <div class="border-b border-gray-200 px-6 pt-6 pb-5 font-bold">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="fa fa-headphones-alt float-right text-xl text-green-400"></i>
      </div>
      <!-- Playlist -->
      <ol id="playlist" v-if="songs?.length">
        <song-item v-for="song in songs" :key="song.id" :song="song" />
      </ol>
      <p v-else class="py-28 text-center text-4xl">No Songs Found...</p>
      <!-- .. end Playlist -->
      <span class="loader" ref="loader"></span>
    </div>
  </section>
</template>
