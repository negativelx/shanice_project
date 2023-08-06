<template>
  <svg :class="props.class" width="70" height="87" viewBox="0 0 70 87" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
          d="M38.1772 12.0068C38.172 11.9698 38.1667 11.9329 38.1613 11.8959C45.205 7.68729 52.1222 3.88826 57.5846 0.989586C62.8074 -1.78158 69.1291 1.83527 69.3832 7.73987C70.1966 26.3089 70.655 60.3177 64.0017 71.9467C54.6633 88.269 35.8202 90.544 19.5179 81.217C8.5313 74.9312 1.50221 64.9836 0.943149 54.17C7.92855 55.097 14.739 53.2654 20.66 49.3166C14.7392 53.2651 7.92913 55.096 0.944567 54.1676C0.67358 48.9342 1.91744 43.499 4.96148 38.1784C9.40403 30.4135 24.0373 20.333 38.1613 11.8961C38.1666 11.933 38.172 11.9699 38.1772 12.0068Z"
          fill="#ADE087" fill-opacity="0.15" />
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