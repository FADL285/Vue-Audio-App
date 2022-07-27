<template>
  <VeeForm @submit="submit" :validation-schema="validationSchema">
    <AuthMessage :type="authMessage.type" v-if="authMessage.shown">
      {{ authMessage.content }}
    </AuthMessage>
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
      Submit <SpinnerIcon v-show="sendRequest" />
    </button>
  </VeeForm>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/plugins/firebase.js";
import AuthMessage from "@/components/Auth/AuthMessage.vue";
import SpinnerIcon from "@/components/Icons/SpinnerIcon.vue";

export default {
  name: "RegisterForm",
  components: { SpinnerIcon, AuthMessage },
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
      authMessage: {
        type: "success",
        shown: false,
        content: "Success Alert",
      },
      sendRequest: false,
    };
  },
  methods: {
    async submit(values) {
      this.sendRequest = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        console.log(user);
        this.authMessage.content =
          "Your account has been created successfully!";
        this.authMessage.shown = true;
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("ERROR CODE: " + errorCode);
        console.log("ERROR message: " + errorMessage);
        this.authMessage = {
          type: "error",
          content: errorCode,
          shown: true,
        };
      } finally {
        this.sendRequest = false;
      }
    },
  },
};
</script>

<style scoped></style>
