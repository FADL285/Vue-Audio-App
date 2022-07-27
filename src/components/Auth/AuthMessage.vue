<template>
  <div
    class="flex items-center justify-between p-4 mb-3 rounded border"
    :class="
      isSuccessMessage
        ? 'border-green-900/10 bg-green-50 text-green-700'
        : 'border-red-900/10 bg-red-50 text-red-700'
    "
    role="alert"
  >
    <strong class="text-sm font-medium"><slot></slot></strong>
  </div>
</template>

<script>
export default {
  name: "AuthMessage",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    isSuccessMessage() {
      return this.type === "success";
    },
  },
};
</script>
