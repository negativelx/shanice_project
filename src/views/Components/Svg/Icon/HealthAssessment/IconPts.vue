<template>
    <svg :class="props.class" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6.5" cy="6.5" r="6.5" fill="#8CC541" />
        <path
            d="M10.4584 3.89844L8.75152 9.78809H7.88962L6.52072 5.04764L5.10111 9.78809L4.24766 9.79654L2.59991 3.89844H3.41956L4.70396 8.89239L6.12356 3.89844H6.98547L8.33747 8.87549L9.63032 3.89844H10.4584Z"
            fill="white"
        />
    </svg>
</template>

<script setup lang="ts">
interface IconColorProps {
    class?: string;
}

const props = withDefaults(defineProps<IconColorProps>(), {
    class: "",
});
</script>