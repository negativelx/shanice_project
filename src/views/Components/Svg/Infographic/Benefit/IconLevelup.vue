<template>
    <svg :class="props.class" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="23" cy="23" r="23" :fill="props.color" fill-opacity="0.2" />
        <path
            d="M16.1614 15.6701H19.1906C19.4323 15.6701 19.6314 15.8608 19.6314 16.1011L19.6883 19.931C19.6883 20.1712 19.8874 20.362 20.1292 20.362H26.7564C26.9982 20.362 27.1973 20.1642 27.1973 19.9239V16.1152C27.1973 15.875 27.3964 15.6771 27.6382 15.6771H30.7029C31.0869 15.6771 31.286 15.2249 31.03 14.9422L23.7984 7.14114C23.6206 6.95035 23.329 6.95035 23.1513 7.14114L15.8414 14.9352C15.5783 15.2178 15.7774 15.6701 16.1614 15.6701Z"
            :fill="props.color" />
        <path d="M16.9865 22.8525H14V34.9287H21.4663V31.9256H16.9865V22.8525Z" :fill="props.color" />
        <path d="M29.2457 22.8525L26.1525 30.9928L23.102 22.8525H20.0088L24.5952 34.9287H27.6173L32.2322 22.8525H29.2457Z"
        :fill="props.color" />
        <path
            d="M31.8301 34.9566C32.6519 34.7637 33.1607 33.9455 32.9667 33.1289C32.7726 32.3123 31.9492 31.8067 31.1275 31.9995C30.3058 32.1923 29.7969 33.0106 29.991 33.8272C30.185 34.6437 31.0084 35.1494 31.8301 34.9566Z"
            :fill="props.color" />
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