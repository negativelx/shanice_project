<template>
  <svg :class="props.class" width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_1605_8456)">
      <rect x="11" y="11" width="24" height="24" rx="12" fill="white"/>
      <path d="M20.6667 22.4167H22.4167M22.4167 22.4167H24.1667M22.4167 22.4167V20.6667M22.4167 22.4167V24.1667M25.9167 25.9167L28.25 28.25M17.75 22.4167C17.75 23.6543 18.2417 24.8413 19.1168 25.7165C19.992 26.5917 21.179 27.0833 22.4167 27.0833C23.6543 27.0833 24.8413 26.5917 25.7165 25.7165C26.5917 24.8413 27.0833 23.6543 27.0833 22.4167C27.0833 21.179 26.5917 19.992 25.7165 19.1168C24.8413 18.2417 23.6543 17.75 22.4167 17.75C21.179 17.75 19.992 18.2417 19.1168 19.1168C18.2417 19.992 17.75 21.179 17.75 22.4167Z"
            stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="11.5" y="11.5" width="23" height="23" rx="11.5" stroke="#41B789"/>
    </g>
    <defs>
      <filter id="filter0_d_1605_8456" x="0" y="0" width="54" height="54" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                       result="hardAlpha"/>
        <feOffset dx="4" dy="4"/>
        <feGaussianBlur stdDeviation="7.5"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1605_8456"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1605_8456" result="shape"/>
      </filter>
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