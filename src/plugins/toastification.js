import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default {
  install(app) {
    const options = {
      position: "bottom-left",
      timeout: 3500,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false,
      maxToasts: 10,
    };
    app.use(Toast, options);
  },
};
