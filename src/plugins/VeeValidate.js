import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import {
  required,
  email,
  min,
  max,
  alpha_spaces,
  confirmed,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", Form);
    app.component("VeeField", Field);
    app.component("ErrorMessage", ErrorMessage);

    // Default values
    configure({
      validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
      validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
      validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
      validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
    });

    defineRule("required", required);
    defineRule("email", email);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alpha_spaces);
    defineRule("confirmed", confirmed);
  },
};
