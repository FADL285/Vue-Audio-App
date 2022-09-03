<template>
  <div class="404 mt-10 text-center">
    <img
      class="m-auto w-fit max-w-md"
      src="/assets/img/404.svg"
      alt="404, the page you are looking for is not available."
    />
    <router-link
      class="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-gray-700 focus:outline-none focus:ring active:text-gray-600"
      to="/"
    >
      <span
        class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4"
      >
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>

      <span class="text-sm font-medium transition-all group-hover:mr-4">
        Go to Home
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>

<style scoped>
img {
  max-width: 600px;
  width: 100%;
}
</style>
