<template>
    <div>
        <transition name="loading">
            <p :class="props.class" >{{props.content}}{{ dots }}</p>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const props = defineProps({
        content: {
            type: String,
            default: "Loading",
        },
        loading: {
            type: Boolean,
            default: true,
        },
        class: {
            type: String,
            default: "text-black-alpha-30",
        },
    }),
    loading = ref(props.loading),
    dots = ref("."),
    interval = ref();

watch(loading, (value) => {
    if (!value) {
        clearLoadingInterval();
    }
});

onMounted(() => {

    if (loading) {
        startLoadingAnimation();
    }
});

function startLoadingAnimation() {
    let counter = 1;
    interval.value = setInterval(() => {
        dots.value = '.'.repeat(counter);

        if (counter === 3) {
            counter = 0;
        } else {
            counter++;
        }
    }, 500);
}

function clearLoadingInterval()
{
    clearInterval(interval.value);
}

</script>

<style lang="scss" scoped>
.loading-enter-active,
.loading-leave-active {
    transition: opacity 0.5s;
}

.loading-enter,
.loading-leave-to {
    opacity: 0;
}

</style>