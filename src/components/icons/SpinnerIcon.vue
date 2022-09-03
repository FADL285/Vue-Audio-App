<template>
  <div class="mx-2 flex items-center justify-center">
    <div
      class="h-3 w-3 animate-spin rounded-full border-b-2 border-gray-900"
      v-bind="$attrs"
    ></div>
  </div>
</template>

<script>
export default {
  name: "SpinnerIcon",
  inheritAttrs: false,
};
</script>

<style scoped></style>
