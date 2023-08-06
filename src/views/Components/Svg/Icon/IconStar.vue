<template>
  <svg :class="props.class" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" fill="#FFFF00" fill-opacity="0.15"/>
    <path d="M16 21.2698L20.15 23.7798C20.91 24.2398 21.84 23.5598 21.64 22.6998L20.54 17.9798L24.21 14.7998C24.88 14.2198 24.52 13.1198 23.64 13.0498L18.81 12.6398L16.92 8.17977C16.58 7.36977 15.42 7.36977 15.08 8.17977L13.19 12.6298L8.36001 13.0398C7.48001 13.1098 7.12001 14.2098 7.79001 14.7898L11.46 17.9698L10.36 22.6898C10.16 23.5498 11.09 24.2298 11.85 23.7698L16 21.2698Z"
          fill="#FFFF00"/>
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