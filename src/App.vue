<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AuthModal from "@/components/AuthModal.vue";
</script>

<template>
  <AppHeader />
  <router-view />
  <Teleport to="body">
    <AuthModal />
  </Teleport>
</template>

<style></style>
