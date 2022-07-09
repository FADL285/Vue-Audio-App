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
      generateMessage: (context) => {
        const messages = {
          required: `This field ${context.field} is required.`,
          min: `This field ${context.field} is too short.`,
          max: `This field ${context.field} is too long.`,
          alpha_spaces: `This field ${context.field} should only contain alphabetical characters.`,
          email: `This field ${context.field} must be a valid email address.`,
          confirmed: `The passwords don't match.`,
          tos: `You must accept the terms of service.`,
        };
        return messages[context.rule.name]
          ? messages[context.rule.name]
          : `This field ${context.field} is invalid.`;
      },
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
    defineRule("tos", required);
  },
};
