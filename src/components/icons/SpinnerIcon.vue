<template>
  <div class="flex justify-center items-center mx-2">
    <div
      class="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900"
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
