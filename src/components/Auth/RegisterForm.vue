<template>
  <VeeForm @submit="submit" :validation-schema="validationSchema">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage name="name" class="text-red-600" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField name="email" v-slot="{ field, meta }">
        <input
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          :class="{ 'border-red-300': !meta.valid && meta.touched }"
          placeholder="Enter Your Email Address"
          v-bind="field"
        />
      </VeeField>
      <ErrorMessage name="email" class="text-red-600" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage name="password" class="text-red-600" />
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <VeeField
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage name="confirm_password" class="text-red-600" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="country">Country</label>
      <VeeField
        as="select"
        name="country"
        id="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Egypt">Egypt</option>
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
      </VeeField>
      <ErrorMessage name="country" class="text-red-600" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        name="tos"
        id="tos"
        type="checkbox"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block" for="tos">Accept terms of service</label>
      <ErrorMessage name="tos" class="text-red-600 block" />
    </div>
    <button
      type="submit"
      class="flex justify-center items-center w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="sendRequest"
    >
      Submit
      <SpinnerIcon v-show="sendRequest" />
    </button>
  </VeeForm>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { successAlert, errorAlert } from "@/composables/useAuthMessage.js";
import SpinnerIcon from "@/components/Icons/SpinnerIcon.vue";

export default {
  name: "RegisterForm",
  components: { SpinnerIcon },
  data() {
    return {
      validationSchema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|email",
        password: "required|min:6",
        confirm_password: "confirmed:@password",
        country: "required",
        tos: "tos",
      },
      sendRequest: false,
    };
  },
  computed: {
    ...mapMutations(["toggleAuthModal"]),
  },
  methods: {
    ...mapActions(["register"]),
    generateRegisterErrorMessage(errorCode) {
      let message = "";
      switch (errorCode) {
        case "auth/email-already-in-use":
          message = "Email have already been used. Please try another";
          break;
        case "auth/invalid-email":
          message = "Invalid Email Address. Provide a valid email address.";
          break;
        case "auth/weak-password":
          message = "Weak Password, Please provide strong password.";
          break;
        default:
          message = "There is an error, Please try again.";
      }
      return message;
    },
    async submit(values, { resetForm }) {
      this.sendRequest = true;
      try {
        await this.register(values);
        successAlert("Your Account has been created successfully!");
        resetForm();
      } catch (error) {
        // console.log(error.message);
        const errorMessage = this.generateRegisterErrorMessage(error.code);
        errorAlert(errorMessage, false);
      } finally {
        this.sendRequest = false;
      }
    },
  },
};
</script>

<style scoped></style>
