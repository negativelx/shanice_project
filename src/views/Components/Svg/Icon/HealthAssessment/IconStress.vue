<template>
    <svg :class="props.class" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8.66699 14.666C9.42299 15.506 10.3417 15.9993 11.3337 15.9993C12.3257 15.9993 13.2443 15.506 14.0003 14.666M18.0003 14.666C18.7563 15.506 19.675 15.9993 20.667 15.9993C21.659 15.9993 22.5777 15.506 23.3337 14.666"
            :stroke="colors[props.icon]"
            stroke-width="1.5"
            stroke-linecap="round"
        />
        <path
            d="M17.3337 21.3333C17.3337 21.687 17.1932 22.0261 16.9431 22.2761C16.6931 22.5262 16.3539 22.6667 16.0003 22.6667C15.6467 22.6667 15.3076 22.5262 15.0575 22.2761C14.8075 22.0261 14.667 21.687 14.667 21.3333C14.667 20.9797 14.8075 20.6406 15.0575 20.3905C15.3076 20.1405 15.6467 20 16.0003 20C16.3539 20 16.6931 20.1405 16.9431 20.3905C17.1932 20.6406 17.3337 20.9797 17.3337 21.3333Z"
            :fill="colors[props.icon]"
        />
        <path
            d="M22.6668 5.33268L27.2855 2.66602L25.3335 9.95135L29.9521 7.28468M18.7308 7.33268L21.0401 8.66602L17.3975 9.64202L19.7068 10.9753"
            :stroke="colors[props.icon]"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M29.3337 15.9993C29.3337 23.3633 23.3643 29.3327 16.0003 29.3327C13.6597 29.3362 11.3597 28.7208 9.33366 27.5487M16.0003 2.66602C8.63633 2.66602 2.66699 8.63535 2.66699 15.9993C2.66699 18.4273 3.31633 20.706 4.45099 22.666"
            :stroke="colors[props.icon]"
            stroke-width="1.5"
            stroke-linecap="round"
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
