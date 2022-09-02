<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

// play icon status
const playIconStatus = computed(() =>
  store.getters.isPlaying ? "fa-pause" : "fa-play"
);

// Toggle Song Playing Status
const togglePlay = () => store.dispatch("togglePlay");

// Get Current Audio Info
const currentAudio = computed(() => store.getters.getCurrentAudio);
</script>

<template>
  <!-- Player -->
  <Transition name="slide-fade">
    <div
      v-if="currentAudio"
      class="fixed bottom-0 left-0 bg-white p-5 pb-4 text-left align-top w-full h-16"
    >
      <div class="relative">
        <!-- Play/Pause Button -->
        <div class="float-left w-7 h-7 leading-3">
          <button type="button" @click.prevent="togglePlay">
            <i class="fa text-gray-500 text-xl" :class="playIconStatus"></i>
          </button>
        </div>
        <!-- Current Position -->
        <div
          class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-5 mt-1"
        >
          <span class="player-currenttime">00:00</span>
        </div>
        <!-- Scrub -->
        <div class="float-left w-7 h-7 leading-3 ml-7 mt-2 player-scrub">
          <div
            class="absolute left-0 right-0 text-lg text-center mx-auto player-song-info"
          >
            <span class="song-title">{{ currentAudio?.modifiedName }}</span> by
            <span class="song-artist">{{ currentAudio?.displayName }}</span>
          </div>
          <!-- Scrub Container  -->
          <span
            class="block w-full h-2 rounded m-1 mt-2 bg-gray-200 relative cursor-pointer"
          >
            <!-- Player Ball -->
            <span
              class="absolute top-neg-8 text-gray-800 text-lg"
              style="left: 50%"
            >
              <i class="fas fa-circle"></i>
            </span>
            <!-- Player Progress Bar-->
            <span
              class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
              style="width: 50%"
            ></span>
          </span>
        </div>
        <!-- Duration -->
        <div
          class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-8 mt-1"
        >
          <span class="player-duration">03:06</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
