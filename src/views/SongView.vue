<script setup>
import { defineProps, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
import CommentsForm from "@/components/song/CommentsForm.vue";
import CommentsList from "@/components/song/CommentsList.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const isUserLoggedIn = computed(() => store.getters.isLoggedIn);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// Fetch song from store if found or fetch it from the server
const song = ref(null);
const comments = computed(() => store.getters.getSongComments(props.id));
(async () => {
  song.value = await store.dispatch("fetchSong", { id: props.id });
  if (!song.value) {
    await router.push({
      name: "NotFound",
      // preserve current path and remove the first char to avoid the target URL starting with `//`
      params: { pathMatch: route.path.substring(1).split("/") },
      // preserve existing query and hash if any
      query: route.query,
      hash: route.hash,
    });
  }

  if (!comments.value || comments.value?.length === 0) {
    await store.dispatch("fetchSongComments", props.id);
  }
})();
</script>

<template>
  <template v-if="song"
    ><!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center justify-center">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- song Info -->
          <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>

    <!-- Comments Form -->
    <CommentsForm
      :id="props.id"
      v-if="isUserLoggedIn"
      :comments-length="comments?.length ?? 0"
    />
    <!-- Comments -->
    <CommentsList
      :comments="comments"
      v-if="comments || comments?.length > 0"
    />
  </template>
  <SpinnerIcon v-else class="mt-14" style="width: 70px; height: 70px" />
</template>

<style scoped></style>
