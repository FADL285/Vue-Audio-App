<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import AppHeader from "@/components/AppHeader.vue";
import AuthModal from "@/components/AuthModal.vue";
import AppPlayer from "@/components/AppPlayer.vue";

// Auto Login
const store = useStore();
store.dispatch("autoLogin");

// check connection status
const toast = useToast();

const connectionStatus = ref(navigator.onLine);
window.addEventListener("offline", () => {
  connectionStatus.value = false;
  console.log("OFFLINE");
  toast.error("No Internet Connection!", { timeout: false });
});
window.addEventListener("online", () => {
  connectionStatus.value = true;
  toast.clear();
});
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
