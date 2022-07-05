<template>
  <!-- Auth Modal -->
  <Transition name="bounce">
    <div
      v-show="isAuthModalOpened"
      class="fixed z-10 inset-0 overflow-y-auto"
      id="modal"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
          >&#8203;</span
        >

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <!-- Add margin if you want to see some of the overlay behind the modal-->
          <div class="py-4 text-left px-6">
            <!--Title-->
            <div class="flex justify-between items-center pb-4">
              <p class="text-2xl font-bold">Your Account</p>
              <!-- Modal Close Button -->
              <div
                class="modal-close cursor-pointer z-50"
                @click="toggleAuthModal"
              >
                <i class="fas fa-times"></i>
              </div>
            </div>

            <!-- Tabs -->
            <ul class="flex flex-wrap mb-4">
              <li class="flex-auto text-center">
                <a
                  class="block rounded py-3 px-4 transition"
                  :class="{
                    'text-white bg-blue-600 cursor-auto hover:text-white':
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
                    'text-white bg-blue-600 cursor-auto hover:text-white':
                      !isLoginModal,
                    'hover:text-blue-600': isLoginModal,
                  }"
                  href="#"
                  @click.prevent="changeModalType(false)"
                  >Register</a
                >
              </li>
            </ul>

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
import LoginForm from "@/components/Auth/LoginForm.vue";
import RegisterForm from "@/components/Auth/RegisterForm.vue";

export default {
  name: "AuthModal",
  components: { RegisterForm, LoginForm },
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
