<template>
    <div class="mb-3 py-2 pl-4 pr-6 dashboard-banner sub-content-header">
        <div class="flex text-white text-lg">
            <div class="flex-initial flex align-self-center">
                <props.logo v-if="props.logo" />
            </div>
            <div class="flex-1 flex align-items-center pl-4 pt-3 pb-3 text-3xl font-medium">
                {{ props.title }}
            </div>
            <template v-if="props.route">
                <div class="flex-initial flex align-self-center">
                    <i @click="router.push(props.route)" class="cursor-pointer pi pi-angle-right"></i>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from "@/router";

const props = defineProps({
    route: Object,
    logo: Object,
    title: String,
});
</script>