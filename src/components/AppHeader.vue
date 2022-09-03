<script setup>
import { useStore } from "vuex";
const store = useStore();
const ToggleAuthModal = () => store.commit("toggleAuthModal");
</script>

<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex items-center justify-start py-5 px-4">
      <!-- App Name -->
      <router-link
        to="/"
        class="mr-4 text-2xl font-bold uppercase text-white hover:text-yellow-500"
        exact-active-class="logo"
      >
        &#9835; Music &#9835;
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="mt-1 flex w-full flex-row">
          <!-- Navigation Links -->
          <li>
            <router-link
              :to="{ name: 'about' }"
              class="px-2 text-white hover:text-yellow-500"
            >
              About
            </router-link>
          </li>
          <li v-if="!isLoggedIn" class="ml-auto">
            <a
              class="px-2 text-white hover:text-yellow-500"
              href="#"
              @click.prevent="ToggleAuthModal"
            >
              Login / Register
            </a>
          </li>
          <template v-else>
            <li>
              <router-link
                :to="{ name: 'manage' }"
                class="px-2 text-white hover:text-yellow-500"
              >
                Manage
              </router-link>
            </li>
            <li class="ml-auto">
              <a
                class="px-2 text-white hover:text-yellow-500"
                href="#logout"
                @click.prevent="logout"
              >
                Logout &#10150;
              </a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppHeader",
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped></style>
