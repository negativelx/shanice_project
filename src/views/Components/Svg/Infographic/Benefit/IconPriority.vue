<template>
  <svg :class="props.class" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="23" cy="23" r="23" :fill="color" fill-opacity="0.2"/>
    <path d="M23 10.5C16.0875 10.5 10.5 16.125 10.5 23C10.5 29.875 16.125 35.5 23 35.5C29.875 35.5 35.5 29.875 35.5 23C35.5 16.125 29.875 10.5 23 10.5ZM28 27.3C28 27.725 27.725 28 27.3 28H18.7C18.275 28 18 27.725 18 27.3V26.75H28V27.3ZM28 25.5H18L16.75 18L20.5 20.5L23 16.75L25.5 20.5L29.25 18L28 25.5Z" :fill="color"/>
  </svg>

</template>

<script setup lang="ts">
interface IconColorProps {
  class?: string,
  color?: string
}
const props = withDefaults(defineProps<IconColorProps>(), {
  color: '#8CC541',
  class: ''
});
</script>