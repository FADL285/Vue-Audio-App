<script setup>
import { useStore } from "vuex";
import AppHeader from "@/components/AppHeader.vue";
import AuthModal from "@/components/AuthModal.vue";
import AppPlayer from "@/components/AppPlayer.vue";

const store = useStore();
store.dispatch("autoLogin");
</script>

<template>
  <AppHeader />
  <router-view />
  <AppPlayer />
  <Teleport to="body">
    <AuthModal />
  </Teleport>
</template>

<style></style>
