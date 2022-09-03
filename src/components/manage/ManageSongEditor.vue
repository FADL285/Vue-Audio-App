<template>
  <VeeForm
    :validation-schema="validationSchema"
    @submit="update"
    class="mt-3.5"
  >
    <div class="mb-3">
      <label class="mb-1 inline-block">Song Title</label>
      <VeeField
        name="title"
        type="text"
        class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
        placeholder="Enter Song Title"
        :value="song.modifiedName"
      />
      <ErrorMessage name="title" class="text-red-600" />
    </div>
    <div class="mb-3">
      <label class="mb-1 inline-block">Genre</label>
      <VeeField
        name="genre"
        type="text"
        class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
        placeholder="Enter Genre"
        :value="song.genre"
      />
      <ErrorMessage name="genre" class="text-red-600" />
    </div>
    <button
      type="submit"
      :disabled="sendRequest"
      class="inline-flex w-32 items-center justify-center rounded bg-green-600 py-1.5 px-3 text-white"
    >
      Submit
      <SpinnerIcon v-show="sendRequest" />
    </button>
    <button
      type="button"
      :disabled="sendRequest"
      class="mx-2 w-32 rounded bg-gray-600 py-1.5 px-3 text-white"
      @click="cancelEditing"
    >
      Cancel
    </button>
  </VeeForm>
</template>

<script>
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";

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
