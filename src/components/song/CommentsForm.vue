<template>
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments ({{ commentsLength }})</span>
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
            :disabled="isSubmitting"
          >
            Submit
          </button>
        </VeeForm>
      </div>
    </div>
  </section>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  name: "CommentsForm",
  data() {
    return {
      validationSchema: {
        comment: "required|min:6",
      },
      isSubmitting: false,
    };
  },
  setup() {
    const toast = useToast();
    return {
      toast,
    };
  },
  props: {
    id: {
      required: true,
      type: String,
    },
    commentsLength: {
      required: true,
      type: Number,
    },
  },
  methods: {
    async submit(values, { resetForm }) {
      this.isSubmitting = true;
      await this.$store.dispatch("addComment", {
        songId: this.id,
        content: values.comment,
      });
      resetForm();
      this.toast.success("Comment added successfully");
      this.isSubmitting = false;
    },
  },
};
</script>

<style scoped></style>
