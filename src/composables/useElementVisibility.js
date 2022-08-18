import { ref } from "vue";

export default function isElementVisible(element) {
  const elementIsVisible = ref(false);

  const rect = element.getBoundingClientRect();
  elementIsVisible.value =
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.bottom >= 0 &&
    rect.right >= 0;

  return elementIsVisible;
}
