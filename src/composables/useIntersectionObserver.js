import { ref } from "vue";

export function useIntersectionObserver(target, callback, options = {}) {
  const { root, rootMargin = "0px", threshold = 0.1 } = options;
  const targetIsVisible = ref(false);
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      targetIsVisible.value = false;
      if (entries.some((entry) => entry.isIntersecting)) {
        targetIsVisible.value = true;
        callback();
      }
    },
    {
      root,
      rootMargin,
      threshold,
    }
  );
  intersectionObserver.observe(target);

  return targetIsVisible;
}
