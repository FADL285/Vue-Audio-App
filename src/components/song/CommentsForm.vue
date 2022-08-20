<template>
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments (15)</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <VeeForm :validation-schema="validationSchema" @submit="submit">
          <VeeField
            name="comment"
            as="textarea"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Your comment here..."
          ></VeeField>
          <ErrorMessage name="comment" class="text-red-600" />

          <button
            type="submit"
            class="mt-4 py-1.5 px-3 rounded text-white bg-green-600 block"
          >
            Submit
          </button>
        </VeeForm>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CommentsForm",
  data() {
    return {
      validationSchema: {
        comment: "required|min:6",
      },
    };
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  methods: {
    async submit(values, { resetForm }) {
      await this.$store.dispatch("addComment", {
        id: this.id,
        content: values.comment,
      });
      resetForm();
    },
  },
};
</script>

<style scoped></style>
