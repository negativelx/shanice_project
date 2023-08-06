<template>
  <svg :class="props.class" width="30" height="30" viewBox="-4.5 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.9963 16.4688C4.60502 16.4688 0 17.3188 0 20.7188C0 24.12 4.57627 25 9.9963 25C15.3876 25 19.9926 24.1513 19.9926 20.75C19.9926 17.3488 15.4176 16.4688 9.9963 16.4688"
      :fill="color" />
    <path opacity="0.4"
          d="M9.99638 13.2301C13.6689 13.2301 16.6114 10.2863 16.6114 6.61503C16.6114 2.94376 13.6689 0 9.99638 0C6.32511 0 3.38135 2.94376 3.38135 6.61503C3.38135 10.2863 6.32511 13.2301 9.99638 13.2301"
          :fill="color" />
  </svg>
</template>

<script setup lang="ts">
interface IconColorProps {
  class?: string,
  color?: string
}

const props = withDefaults(defineProps<IconColorProps>(), {
  color: "#8CC541",
  class: ""
});
</script>