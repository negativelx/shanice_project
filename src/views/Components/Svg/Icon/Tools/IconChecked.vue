<template>
  <svg :class="props.class" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle opacity="0.2" cx="23" cy="23" r="23" :fill="props.color" />
    <circle cx="22.9998" cy="22.9998" r="16.6111" :fill="props.color" />
    <mask id="mask0_899_1776" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="11" y="11" width="24" height="24">
      <rect x="11" y="11" width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_899_1776)">
      <path
        d="M20.5496 28.9996L14.8496 23.2996L16.2746 21.8746L20.5496 26.1496L29.7246 16.9746L31.1496 18.3996L20.5496 28.9996Z"
        fill="white" />
    </g>
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