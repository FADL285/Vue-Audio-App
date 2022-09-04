<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const store = useStore();

// Player Song Duration & CurrentTime
const songDuration = computed(() => store.state.songs.playerSongDuration);
const currentTime = computed(() => store.state.songs.playerSongCurrentTime);
const playerProgress = computed(
  () => (currentTime.value / songDuration.value) * 100
);

// play icon status
const playIconStatus = computed(() =>
  store.getters.isPlaying ? "fa-pause" : "fa-play"
);

// Toggle Song Playing Status
const togglePlay = () => store.dispatch("togglePlay");

// Get Current Audio Info
const currentAudio = computed(() => store.getters.getCurrentAudio);

// Update Current Audio Time
const updateCurrentTime = (event) => store.dispatch("updateCurrentTime", event);

// Convert Seconds to Time Format
const formatTime = (seconds) => dayjs.duration(seconds * 1000).format("mm:ss");
</script>

<template>
  <!-- Player -->
  <Transition name="slide-fade">
    <div
      v-if="currentAudio"
      class="fixed bottom-0 left-0 h-16 w-full bg-white p-5 pb-4 text-left align-top shadow-xl shadow-inner"
    >
      <div class="relative">
        <!-- Play/Pause Button -->
        <div class="float-left h-7 w-7 leading-3">
          <button type="button" @click.prevent="togglePlay">
            <i class="fa text-xl text-gray-500" :class="playIconStatus"></i>
          </button>
        </div>
        <!-- Current Position -->
        <div
          class="float-left mt-0 ml-5 mt-1 h-7 w-7 w-14 text-lg leading-3 text-gray-400"
        >
          <span class="player-currenttime">{{ formatTime(currentTime) }}</span>
        </div>
        <!-- Scrub -->
        <div class="player-scrub float-left ml-7 mt-2 h-7 w-7 leading-3">
          <div
            class="player-song-info absolute left-0 right-0 mx-auto text-center text-lg"
          >
            <span class="song-title">{{ currentAudio?.modifiedName }}</span>
            <small class="px-2">uploaded by</small>
            <span class="song-artist italic">
              {{ currentAudio?.displayName }}
            </span>
          </div>
          <!-- Scrub Container  -->
          <span
            class="relative m-1 mt-2 block h-2 w-full cursor-pointer rounded bg-gray-200"
            @click.prevent="updateCurrentTime"
          >
            <!-- Player Ball -->
            <span
              class="absolute -top-2.5 left-0 text-lg text-gray-800"
              :style="{ left: playerProgress + '%' }"
            >
              <i class="fas fa-circle"></i>
            </span>
            <!-- Player Progress Bar-->
            <span
              class="block h-2 w-0 rounded bg-gradient-to-r from-green-500 to-green-400"
              :style="{ width: playerProgress + '%' }"
            ></span>
          </span>
        </div>
        <!-- Duration -->
        <div
          class="float-left mt-0 ml-8 mt-1 h-7 w-7 w-14 text-lg leading-3 text-gray-400"
        >
          <span class="player-duration">{{ formatTime(songDuration) }}</span>
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
