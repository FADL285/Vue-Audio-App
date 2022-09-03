<template>
  <div
    v-if="alert.shown"
    class="mb-3 flex items-center justify-between rounded border p-4"
    :class="
      isSuccessMessage
        ? 'border-green-900/10 bg-green-50 text-green-700'
        : 'border-red-900/10 bg-red-50 text-red-700'
    "
    role="alert"
  >
    <strong class="text-sm font-medium">
      {{ alert.message }}
    </strong>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { alert } from "@/composables/useAuthMessage.js";

const isSuccessMessage = computed(() => alert.type === "success");
</script>
