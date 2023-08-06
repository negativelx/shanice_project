<template>
  <svg :class="props.class" width="246" height="105" viewBox="0 0 246 105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_3205_20219)">
      <rect width="246" height="105" rx="20" fill="url(#paint0_linear_3205_20219)"/>
      <path d="M101 106C147.191 67.2448 192.346 37 220.539 37C246.063 37 268.282 48.129 286.639 67.5066C296.594 78.0465 305.394 91.0085 313 106H101Z"
            fill="white" fill-opacity="0.08"/>
      <path d="M246 -16C199.809 22.7552 154.654 53 126.461 53C100.937 53 78.7175 41.871 60.3606 22.4934C50.4057 11.9535 41.6056 -1.00854 34 -16H246Z"
            fill="white" fill-opacity="0.05"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear_3205_20219" x1="29" y1="105" x2="246" y2="10" gradientUnits="userSpaceOnUse">
        <stop offset="0.526426" stop-color="#0C6B15"/>
        <stop offset="1" stop-color="#37A54A"/>
      </linearGradient>
      <clipPath id="clip0_3205_20219">
        <rect width="246" height="105" rx="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
</template>

<script setup lang="ts">
interface IconColorProps {
    class?: string|object,
}

const props = withDefaults(defineProps<IconColorProps>(), {
    class: "",
});
</script>
