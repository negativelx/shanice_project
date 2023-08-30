<template>
  <img class="border-circle" :style="props.style" :class="props.class" :src="src" :alt="props.alt"
       v-if="!defaultAvatar" />
  <svg v-else :class="props.class" :style="props.style" xmlns="http://www.w3.org/2000/svg" width="120" height="120"
       viewBox="0 0 120 120"
       fill="none">
    <circle cx="60" cy="60" r="59" fill="#F3F8FE" stroke="#8CC541" stroke-width="2" />
    <g clip-path="url(#clip0_1138_8977)">
      <path
        d="M71.25 52.5C71.25 55.4837 70.0647 58.3452 67.955 60.455C65.8452 62.5647 62.9837 63.75 60 63.75C57.0163 63.75 54.1548 62.5647 52.045 60.455C49.9353 58.3452 48.75 55.4837 48.75 52.5C48.75 49.5163 49.9353 46.6548 52.045 44.545C54.1548 42.4353 57.0163 41.25 60 41.25C62.9837 41.25 65.8452 42.4353 67.955 44.545C70.0647 46.6548 71.25 49.5163 71.25 52.5Z"
        fill="#8CC541" />
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M30 60C30 52.0435 33.1607 44.4129 38.7868 38.7868C44.4129 33.1607 52.0435 30 60 30C67.9565 30 75.5871 33.1607 81.2132 38.7868C86.8393 44.4129 90 52.0435 90 60C90 67.9565 86.8393 75.5871 81.2132 81.2132C75.5871 86.8393 67.9565 90 60 90C52.0435 90 44.4129 86.8393 38.7868 81.2132C33.1607 75.5871 30 67.9565 30 60ZM60 33.75C55.0567 33.7503 50.2139 35.1464 46.029 37.7776C41.8441 40.4088 38.4873 44.1683 36.3449 48.6232C34.2024 53.0782 33.3614 58.0475 33.9187 62.9593C34.476 67.8712 36.4089 72.5258 39.495 76.3875C42.1575 72.0975 48.0188 67.5 60 67.5C71.9812 67.5 77.8388 72.0937 80.505 76.3875C83.5911 72.5258 85.524 67.8712 86.0813 62.9593C86.6386 58.0475 85.7976 53.0782 83.6551 48.6232C81.5127 44.1683 78.1559 40.4088 73.971 37.7776C69.7861 35.1464 64.9433 33.7503 60 33.75Z"
            fill="#8CC541" />
    </g>
    <defs>
      <clipPath id="clip0_1138_8977">
        <rect width="60" height="60" fill="white" transform="translate(30 30)" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface AvatarProps {
    class?: string,
    alt?: string,
    src?: string,
    style?: string
}

const props = withDefaults(defineProps<AvatarProps>(), {
        class: "",
        alt: "",
        src: "",
        style: ""
    }),
    defaultAvatar = ref(true), src = ref("");


</script>