<template>
  <svg :class="props.class" @click="handleClick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <circle class="cls-1" cx="18" cy="18" r="18" />
        <path class="cls-2" :stroke="props.color"
              d="M19.05,10l-6.84,7.24a2.57,2.57,0,0,0-.56,1.19l-.31,2.7a1.28,1.28,0,0,0,1.56,1.48l2.68-.46a2.36,2.36,0,0,0,1.16-.63l6.84-7.24c1.19-1.25,1.72-2.67-.12-4.41S20.23,8.75,19.05,10Z" />
        <path class="cls-2" d="M17.91,11.21a5.1,5.1,0,0,0,4.54,4.29M10.5,25.33h15" :stroke="props.color" />
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">

interface IconColorProps {
  class?: string,
  color?: string
}

const props = withDefaults(defineProps<IconColorProps>(), {
  color: "#29a073",
  class: ""
}), emits = defineEmits(["click"]);

function handleClick(e) {
  emits("click", e);
}
</script>

<style scoped lang="scss">
.cls-1 {
  fill: #fff;
}
.cls-2 {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2px;
}</style>
