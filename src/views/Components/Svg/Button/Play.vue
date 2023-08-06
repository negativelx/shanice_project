<template>
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="27" cy="27" r="27" :fill="color" :fill-opacity="opacity"/>
<path d="M38 28L20 38.3923L20 17.6077L38 28Z" fill="white"/>
</svg>

</template>

<script setup lang="ts">
defineProps({
    color: { type: String, required: false, default: "#FF0000" },
    opacity: { type: Number, required: false, default: 0.7 },
});
</script>