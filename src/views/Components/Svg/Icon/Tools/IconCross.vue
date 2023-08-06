<template>
    <svg :class="props.class" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle opacity="0.2" cx="23" cy="23" r="23" :fill="props.color"/>
        <circle cx="23" cy="23" r="16.6111" :fill="props.color"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M16 17.4142L17.4142 16L22.7177 21.3035L28.0211 16L29.4354 17.4142L24.1319 22.7177L29.435 28.0208L28.0208 29.435L22.7177 24.1319L17.4145 29.435L16.0003 28.0208L21.3035 22.7177L16 17.4142Z"
              fill="white"/>
    </svg>
</template>

<script setup lang="ts">
interface IconColorProps {
  class?: string,
  color?: string
}

const props = withDefaults(defineProps<IconColorProps>(), {
  color: "#DF0D29",
  class: ""
});
</script>