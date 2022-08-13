<template>
  <VeeForm
    :validation-schema="validationSchema"
    @submit="update"
    class="mt-3.5"
  >
    <div class="mb-3">
      <label class="inline-block mb-1">Song Title</label>
      <VeeField
        name="title"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Song Title"
        :value="song.modifiedName"
      />
      <ErrorMessage name="title" class="text-red-600" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-1">Genre</label>
      <VeeField
        name="genre"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Genre"
        :value="song.genre"
      />
      <ErrorMessage name="genre" class="text-red-600" />
    </div>
    <button
      type="submit"
      :disabled="sendRequest"
      class="inline-flex justify-center items-center w-32 py-1.5 px-3 rounded text-white bg-green-600"
    >
      Submit
      <SpinnerIcon v-show="sendRequest" />
    </button>
    <button
      type="button"
      :disabled="sendRequest"
      class="w-32 py-1.5 px-3 mx-2 rounded text-white bg-gray-600"
      @click="cancelEditing"
    >
      Cancel
    </button>
  </VeeForm>
</template>

<script>
import SpinnerIcon from "@/components/Icons/SpinnerIcon.vue";

export default {
  name: "ManageSongEditor",
  components: { SpinnerIcon },
  data() {
    return {
      validationSchema: {
        title: "required|min:3",
        genre: "alpha_spaces|min:2",
      },
      sendRequest: false,
    };
  },
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
    update(values) {
      this.sendRequest = true;
      this.$emit("update", {
        id: this.song.id,
        modifiedName: values.title,
        genre: values.genre,
      });
    },
  },
};
</script>

<style scoped></style>
