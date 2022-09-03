<script setup>
import { defineProps } from "vue";

defineProps({
  song: Object,
});
</script>

<template>
  <router-link :to="{ name: 'song', params: { id: song.id } }">
    <li
      class="flex cursor-pointer items-center justify-between p-3 pl-6 transition duration-300 hover:bg-gray-50"
    >
      <div>
        <h3 class="block font-bold text-gray-600">
          {{ song.modifiedName }}
        </h3>
        <span class="text-sm text-gray-500">{{ song.displayName }}</span>
      </div>

      <div class="text-lg text-gray-600">
        <span class="comments">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.commentsCount }}
        </span>
      </div>
    </li>
  </router-link>
</template>

<style scoped></style>
