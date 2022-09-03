<template>
  <VeeForm @submit="submit" :validation-schema="validationSchema">
    <!-- Email -->
    <div class="mb-3">
      <label class="mb-2 inline-block">Email</label>
      <VeeField
        name="email"
        type="email"
        autocomplete="username"
        class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
        placeholder="Enter Email"
      />
      <ErrorMessage name="email" class="text-red-600" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="mb-2 inline-block">Password</label>
      <VeeField
        name="password"
        type="password"
        autocomplete="current-password"
        class="block w-full rounded border border-gray-300 py-1.5 px-3 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
        placeholder="Password"
      />
      <ErrorMessage name="password" class="text-red-600" />
    </div>
    <button
      type="submit"
      class="flex w-full items-center justify-center rounded bg-purple-600 py-1.5 px-3 text-white transition hover:bg-purple-700"
      :disabled="sendRequest"
    >
      Submit
      <SpinnerIcon v-show="sendRequest" />
    </button>
  </VeeForm>
</template>

<script>
import { mapActions } from "vuex";
import { errorAlert } from "@/composables/useAuthMessage.js";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
import { useToast } from "vue-toastification";

export default {
  name: "LoginForm",
  components: { SpinnerIcon },
  data() {
    return {
      validationSchema: {
        email: "required|email",
        password: "required|min:3",
      },
      sendRequest: false,
    };
  },
  setup() {
    const toast = useToast();
    return {
      toast,
    };
  },
  methods: {
    ...mapActions(["login"]),
    generateLoginErrorMessage(errorCode) {
      let message = "";
      switch (errorCode) {
        case "auth/invalid-email":
          message = "Invalid Email Address. Provide a valid email address.";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          message =
            "Sorry, we don't recognize that username or password. You can try again or create an account.";
          break;
        default:
          message = "There is an error, Please try again.";
      }
      return message;
    },
    async submit(values, { resetForm }) {
      this.sendRequest = true;
      try {
        await this.login(values);
        this.toast.success("Login successfully!");
        resetForm();
      } catch (error) {
        // console.log(error.message);
        const errorMessage = this.generateLoginErrorMessage(error.code);
        errorAlert(errorMessage, false);
      } finally {
        this.sendRequest = false;
      }
    },
  },
};
</script>

<style scoped></style>
