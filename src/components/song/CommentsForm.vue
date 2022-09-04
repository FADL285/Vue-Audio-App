<template>
  <section class="container mx-auto mt-6">
    <div class="relative flex flex-col rounded border border-gray-200 bg-white">
      <div class="border-b border-gray-200 px-6 pt-6 pb-5 font-bold">
        <!-- Comment Count -->
        <span class="card-title">Comments ({{ commentsLength }})</span>
        <i class="fa fa-comments float-right text-2xl text-green-400"></i>
      </div>
      <div class="p-6">
        <VeeForm :validation-schema="validationSchema" @submit="submit">
          <VeeField
            name="comment"
            as="textarea"
            class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
            placeholder="Your comment here..."
          ></VeeField>
          <ErrorMessage name="comment" class="text-red-600" />

          <button
            type="submit"
            class="mt-4 block rounded bg-green-600 py-1.5 px-3 text-white"
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
      const isAdded = await this.$store.dispatch("addComment", {
        songId: this.id,
        content: values.comment,
      });
      if (isAdded) {
        this.toast.success("Comment added successfully");
        resetForm();
      } else {
        this.toast.error("Something went wrong");
      }
      this.isSubmitting = false;
    },
  },
};
</script>

<style scoped></style>
