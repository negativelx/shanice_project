<template>
    <svg :class="props.class" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2023_11485)">
            <circle cx="20" cy="20" r="20" :fill="color" fill-opacity="0.15"/>
            <path d="M23.9999 20C26.7599 20 28.9999 17.76 28.9999 15C28.9999 12.24 26.7599 10 23.9999 10C21.2399 10 18.9999 12.24 18.9999 15C18.9999 17.76 21.2399 20 23.9999 20ZM29.4499 25.6C29.0599 25.2 28.5699 25 27.9999 25H20.9999L18.9199 24.27L19.2499 23.33L20.9999 24H23.7999C24.1499 24 24.4299 23.86 24.6599 23.63C24.8899 23.4 24.9999 23.12 24.9999 22.81C24.9999 22.27 24.7399 21.9 24.2199 21.69L16.9499 19H14.9999V28L21.9999 30L30.0299 27C30.0399 26.47 29.8399 26 29.4499 25.6ZM12.9999 19H8.98389V30H12.9999V19Z"
                  :fill="color"/>
        </g>
        <defs>
            <clipPath id="clip0_2023_11485">
                <rect width="40" height="40" fill="white"/>
            </clipPath>
        </defs>
    </svg>
</template>

<script setup lang="ts">
interface IconColorProps {
    class?: string,
    color?: string
}
const props = withDefaults(defineProps<IconColorProps>(), {
    color: '#55C494',
    class: ''
});
</script>