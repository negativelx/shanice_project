<template>
  <svg :class="props.class" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1409_8747)">
      <circle cx="20" cy="20" r="20" fill="url(#paint0_linear_1409_8747)"/>
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M15.81 10H24.191C27.28 10 29 11.78 29 14.83V25.16C29 28.26 27.28 30 24.191 30H15.81C12.77 30 11 28.26 11 25.16V14.83C11 11.78 12.77 10 15.81 10ZM16.08 14.6599V14.6499H19.069C19.5 14.6499 19.85 14.9999 19.85 15.4289C19.85 15.8699 19.5 16.2199 19.069 16.2199H16.08C15.649 16.2199 15.3 15.8699 15.3 15.4399C15.3 15.0099 15.649 14.6599 16.08 14.6599ZM16.08 20.7399H23.92C24.35 20.7399 24.7 20.3899 24.7 19.9599C24.7 19.5299 24.35 19.1789 23.92 19.1789H16.08C15.649 19.1789 15.3 19.5299 15.3 19.9599C15.3 20.3899 15.649 20.7399 16.08 20.7399ZM16.08 25.3099H23.92C24.319 25.2699 24.62 24.9289 24.62 24.5299C24.62 24.1199 24.319 23.7799 23.92 23.7399H16.08C15.78 23.7099 15.49 23.8499 15.33 24.1099C15.17 24.3599 15.17 24.6899 15.33 24.9499C15.49 25.1999 15.78 25.3499 16.08 25.3099Z"
            fill="white"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear_1409_8747" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
        <stop stop-color="#58D4CE" stop-opacity="0.6"/>
        <stop offset="1" stop-color="#58D4CE"/>
      </linearGradient>
      <clipPath id="clip0_1409_8747">
        <rect width="40" height="40" fill="white"/>
      </clipPath>
    </defs>
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