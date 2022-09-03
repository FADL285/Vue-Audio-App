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
      class="ml-auto mt-4 block rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
    >
      <option value="asc">Latest</option>
      <option value="desc">Oldest</option>
    </select>
    <ul>
      <li
        v-for="comment in comments"
        :key="comment.id"
        class="border border-gray-200 bg-gray-50 p-6"
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
