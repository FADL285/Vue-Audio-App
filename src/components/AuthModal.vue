<template>
  <!-- auth Modal -->
  <Transition name="bounce">
    <div
      v-show="isAuthModalOpened"
      class="fixed inset-0 z-10 overflow-y-auto"
      id="modal"
    >
      <div
        class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:h-screen sm:align-middle"
          >&#8203;</span
        >

        <div
          class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
        >
          <!-- Add margin if you want to see some of the overlay behind the modal-->
          <div class="py-4 px-6 text-left">
            <!--Title-->
            <div class="flex items-center justify-between pb-4">
              <p class="text-2xl font-bold">Your Account</p>
              <!-- Modal Close Button -->
              <div
                class="modal-close z-50 cursor-pointer"
                @click="toggleAuthModal"
              >
                <i class="fas fa-times"></i>
              </div>
            </div>

            <!-- Tabs -->
            <ul class="mb-4 flex flex-wrap">
              <li class="flex-auto text-center">
                <a
                  class="block rounded py-3 px-4 transition"
                  :class="{
                    'cursor-auto bg-blue-600 text-white hover:text-white':
                      isLoginModal,
                    'hover:text-blue-600': !isLoginModal,
                  }"
                  href="#"
                  @click.prevent="changeModalType(true)"
                  >Login</a
                >
              </li>
              <li class="flex-auto text-center">
                <a
                  class="block rounded py-3 px-4 transition"
                  :class="{
                    'cursor-auto bg-blue-600 text-white hover:text-white':
                      !isLoginModal,
                    'hover:text-blue-600': isLoginModal,
                  }"
                  href="#"
                  @click.prevent="changeModalType(false)"
                  >Register</a
                >
              </li>
            </ul>

            <AuthMessage />

            <!-- Login Form -->
            <LoginForm v-show="isLoginModal" />

            <!-- Registration Form -->
            <RegisterForm v-show="!isLoginModal" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <!-- Overlay -->
  <div v-show="isAuthModalOpened" class="fixed inset-0 transition-opacity">
    <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { closeAlert } from "@/composables/useAuthMessage.js";
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import AuthMessage from "@/components/auth/AuthMessage.vue";

export default {
  name: "AuthModal",
  components: { AuthMessage, RegisterForm, LoginForm },
  data() {
    return {
      isLoginModal: true,
    };
  },
  computed: {
    ...mapState(["isAuthModalOpened"]),
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),
    changeModalType(isLogin) {
      this.isLoginModal = isLogin;
      closeAlert();
    },
  },
};
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.025);
  }
  100% {
    transform: scale(1);
  }
}
</style>
