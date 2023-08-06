<template>
    <div :class="{preserve: props.parallax}" id="tiltMe" ref="tiltRef">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import VanillaTilt, { TiltOptions } from "vanilla-tilt";
import { onMounted, ref } from "vue";

interface TiltProps {
    parallax?: boolean,
    options?: TiltOptions
}

const props = withDefaults(defineProps<TiltProps>(), {
    parallax: true
}), tiltRef = ref(null);

onMounted(() => {
    VanillaTilt.init(<HTMLElement><unknown>tiltRef.value,
        props.options);
});
</script>

<style lang="scss">
.preserve {
    transform-style: preserve-3d;
}
</style>

