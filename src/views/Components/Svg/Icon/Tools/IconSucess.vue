<template>
  <svg :class="props.class" width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="42" cy="42" r="42" fill="#78C55D" />
    <rect x="26.4657" y="43.9033" width="7.13122" height="18.411" rx="3.56561" transform="rotate(-45 26.4657 43.9033)"
          fill="white" />
    <rect x="58.0933" y="28.7666" width="6.87665" height="32.2407" rx="3.43832" transform="rotate(45 58.0933 28.7666)"
          fill="white" />
  </svg>
</template>

<script setup lang="ts">
interface IconColorProps {
  class?: string,
}

const props = withDefaults(defineProps<IconColorProps>(), {
  class: ""
});
</script>