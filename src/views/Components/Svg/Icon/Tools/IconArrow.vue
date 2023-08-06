<template>
  <svg :class="props.class" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.53334 9.53317L5.80001 7.79984C5.5889 7.58873 5.54179 7.34717 5.65867 7.07517C5.77556 6.80317 5.98379 6.66695 6.28334 6.6665H9.71667C10.0167 6.6665 10.2251 6.80273 10.342 7.07517C10.4589 7.34761 10.4116 7.58917 10.2 7.79984L8.46667 9.53317C8.40001 9.59984 8.32779 9.64984 8.25001 9.68317C8.17223 9.7165 8.0889 9.73317 8.00001 9.73317C7.91112 9.73317 7.82779 9.7165 7.75001 9.68317C7.67223 9.64984 7.60001 9.59984 7.53334 9.53317Z"
      :fill="props.color" />
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