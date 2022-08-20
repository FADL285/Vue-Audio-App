<template>
  <div class="404 text-center mt-10">
    <img
      class="max-w-md w-fit m-auto"
      src="/assets/img/404.svg"
      alt="404, the page you are looking for is not available."
    />
    <router-link
      class="relative inline-flex items-center px-8 py-3 overflow-hidden text-gray-700 border border-current rounded group active:text-gray-600 focus:outline-none focus:ring"
      to="/"
    >
      <span
        class="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4"
      >
        <svg
          class="w-5 h-5"
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
