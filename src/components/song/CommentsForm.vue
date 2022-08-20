<template>
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments (15)</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <form>
          <textarea
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
          ></textarea>
          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600 block"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CommentsForm",
};
</script>

<style scoped></style>
