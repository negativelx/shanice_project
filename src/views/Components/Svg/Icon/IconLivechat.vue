<template>
  <svg :class="props.class" width="105" height="105" viewBox="0 0 105 105" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_491_4797)">
      <circle cx="52.5" cy="42.5" r="42.5" fill="#3BB34A" />
    </g>
    <path fill-rule="evenodd" clip-rule="evenodd"
          d="M32.1032 39.0283C32.1032 42.0699 33.0624 44.9005 34.7113 47.2662C34.4543 47.5087 34.2237 47.7932 34.0289 48.1196C32.4739 50.7249 34.3511 54.0314 37.3852 54.0314C37.7799 54.0314 38.1551 53.9754 38.5057 53.8723V54.0564H47.5759V54.05C47.7354 54.0544 47.8955 54.0566 48.0561 54.0566C56.8667 54.0566 64.009 47.3282 64.009 39.0283C64.009 30.7284 56.8667 24 48.0561 24C39.2456 24 32.1032 30.7284 32.1032 39.0283Z"
          fill="white" fill-opacity="0.5" />
    <path fill-rule="evenodd" clip-rule="evenodd"
          d="M72.1157 48.4269C72.1157 51.1096 71.2698 53.6061 69.8155 55.6927C70.0422 55.9066 70.2455 56.1575 70.4173 56.4453C71.7888 58.7432 70.1331 61.6596 67.4571 61.6596C67.1089 61.6596 66.7779 61.6102 66.4687 61.5192V61.6818H58.4687V61.6761C58.3281 61.68 58.1869 61.682 58.0452 61.682C50.2742 61.682 43.9746 55.7475 43.9746 48.4269C43.9746 41.1064 50.2742 35.1719 58.0452 35.1719C65.8161 35.1719 72.1157 41.1064 72.1157 48.4269Z"
          fill="white" />
    <defs>
      <filter id="filter0_d_491_4797" x="0" y="0" width="105" height="105" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                       result="hardAlpha" />
        <feOffset dy="10" />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.820833 0 0 0 0 0.820833 0 0 0 0 0.820833 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_491_4797" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_491_4797" result="shape" />
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