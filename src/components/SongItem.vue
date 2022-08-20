<script setup>
import { defineProps } from "vue";

defineProps({
  song: Object,
});
</script>

<template>
  <router-link :to="{ name: 'song', params: { id: song.id } }">
    <li
      class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
    >
      <div>
        <h3 class="font-bold block text-gray-600">
          {{ song.modifiedName }}
        </h3>
        <span class="text-gray-500 text-sm">{{ song.displayName }}</span>
      </div>

      <div class="text-gray-600 text-lg">
        <span class="comments">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.commentsCount }}
        </span>
      </div>
    </li>
  </router-link>
</template>

<style scoped></style>
