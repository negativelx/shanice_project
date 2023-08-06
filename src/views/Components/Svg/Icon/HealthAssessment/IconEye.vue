<template>
    <svg :class="props.class" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 16C11.2 5.33333 20.8 5.33333 28 16C20.8 26.6667 11.2 26.6667 4 16Z" :stroke="colors[props.icon]" stroke-width="2" stroke-linejoin="round" />
        <path
            d="M20 16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20C14.9391 20 13.9217 19.5786 13.1716 18.8284C12.4214 18.0783 12 17.0609 12 16C12 14.9391 12.4214 13.9217 13.1716 13.1716C13.9217 12.4214 14.9391 12 16 12C17.0609 12 18.0783 12.4214 18.8284 13.1716C19.5786 13.9217 20 14.9391 20 16Z"
            :stroke="colors[props.icon]"
            stroke-width="2"
            stroke-linejoin="round"
        />
    </svg>
</template>

<script setup lang="ts">
import { reactive } from "vue";

interface IconColorProps {
    class?: string;
    icon?: string;
}

const props = withDefaults(defineProps<IconColorProps>(), {
        class: "",
        icon: "none",
    }),
    colors = reactive({
        highlight: "#ffffff",
        none: "#8CC541",
    });
</script>
