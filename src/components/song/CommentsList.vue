<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

defineProps({
  comments: {
    type: Array,
    required: true,
  },
});

const route = useRoute();

const emit = defineEmits(["sort"]);
const sortBy = ref(route.query.sort ?? "asc");
const updateSortType = () => emit("sort", sortBy.value);

// format time -:
const dateFormat = (timestamp) => dayjs(timestamp).fromNow();
</script>

<template>
  <section class="container mx-auto">
    <!-- Sort Comments -->
    <select
      v-model="sortBy"
      @change="updateSortType"
      class="block ml-auto mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
    >
      <option value="asc">Latest</option>
      <option value="desc">Oldest</option>
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
