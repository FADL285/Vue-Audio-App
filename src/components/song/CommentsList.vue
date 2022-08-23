<script setup>
import { defineProps } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

defineProps({
  comments: {
    type: Array,
    required: true,
  },
});

// format time -:
const dateFormat = (timestamp) => dayjs(timestamp).fromNow();
</script>

<template>
  <section class="container mx-auto">
    <!-- Sort Comments -->
    <select
      class="block ml-auto mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
    >
      <option value="1">Latest</option>
      <option value="2">Oldest</option>
    </select>
    <ul>
      <li
        v-for="comment in comments"
        :key="comment.id"
        class="p-6 bg-gray-50 border border-gray-200"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.authName }}</div>
          <time>{{ dateFormat(comment.timestamp) }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
