<template>
  <form class="mt-3.5">
    <div class="mb-3">
      <label class="inline-block mb-1">Song Title</label>
      <input
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Song Title"
        :value="song.modifiedName"
      />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-1">Genre</label>
      <input
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Genre"
        :value="song.genre"
      />
    </div>
    <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">
      Submit
    </button>
    <button
      type="button"
      class="py-1.5 px-3 mx-2 rounded text-white bg-gray-600"
      @click="cancelEditing"
    >
      Cancel
    </button>
  </form>
</template>

<script>
export default {
  name: "ManageSongEditor",
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  emits: ["cancel", "update"],
  methods: {
    cancelEditing() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped></style>
