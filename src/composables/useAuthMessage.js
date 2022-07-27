import { reactive } from "vue";

export const alert = reactive({
  type: "success",
  message: "ALERT",
  shown: false,
});

const fireAlert = (type, message, timeout) => {
  alert.type = type;
  alert.message = message;
  alert.shown = true;
  if (timeout) closeAlert(timeout);
};

export const successAlert = (message, timeout = 3000) => {
  fireAlert("success", message, timeout);
};

export const errorAlert = (message, timeout = 3000) => {
  fireAlert("error", message, timeout);
};

export const closeAlert = (timeout = 0) => {
  setTimeout(() => (alert.shown = false), timeout);
};
