<template>
  <svg :class="props.class" width="300" height="300" viewBox="0 0 77 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_226_2589)">
      <circle cx="40" cy="36" r="20" fill="white"/>
    </g>
    <path fill-rule="evenodd" clip-rule="evenodd"
          d="M40.6 41.2137C45.6421 41.2137 47.9747 40.5192 48.2 37.7317C48.2 34.946 46.5737 35.1252 46.5737 31.7073C46.5737 29.0376 44.2169 26 40.6 26C36.9831 26 34.6263 29.0376 34.6263 31.7073C34.6263 35.1252 33 34.946 33 37.7317C33.2262 40.5298 35.5588 41.2137 40.6 41.2137Z"
          stroke="#3BB34A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42.7356 44.1025C41.5159 45.5567 39.6132 45.5739 38.3818 44.1025" stroke="#3BB34A" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
      <filter id="filter0_d_226_2589" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                       result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="10"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.247059 0 0 0 0 0.403922 0 0 0 0.1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_226_2589"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_226_2589" result="shape"/>
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