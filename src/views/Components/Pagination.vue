<template>
    <template v-if="currentPage > 1">
        <div class="cursor-pointer mx-1 flex-initial flex align-items-center justify-content-center w-2rem search-filter">
            <div class="border-round-md py-2 w-12 text-center" @click="toPage(1)"><i class="pi pi-angle-double-left"></i></div>
        </div>
        <div class="cursor-pointer mx-1 flex-initial flex align-items-center justify-content-center w-2rem search-filter">
            <div class="border-round-md py-2 w-12 text-center" @click="toPage(currentPage - 1)"><i class="pi pi-angle-left"></i></div>
        </div>
        <div class="cursor-pointer mx-1 flex-initial flex align-items-center justify-content-center w-2rem search-filter">
            <div class="border-round-md py-2 w-12 text-center" @click="toPage(currentPage - 1)">{{ currentPage - 1 }}</div>
        </div>
    </template>
    <div class="mx-1 flex-initial flex align-items-center justify-content-center w-2rem search-filter">
        <div class="border-round-md py-2 w-12 text-center border-1 border-solid border-blue-500">{{ currentPage }}</div>
    </div>
    <template v-if="totalPage > currentPage">
        <div class="cursor-pointer mx-1 flex-initial flex align-items-center justify-content-center w-2rem search-filter">
            <div class="border-round-md py-2 w-12 text-center" @click="toPage(currentPage + 1)">{{ currentPage + 1 }}</div>
        </div>
        <div class="cursor-pointer mx-1 flex-initial flex align-items-center justify-content-center w-2rem search-filter">
            <div class="border-round-md py-2 w-12 text-center" @click="toPage(currentPage + 1)"><i class="pi pi-angle-right"></i></div>
        </div>
        <div class="cursor-pointer mx-1 flex-initial flex align-items-center justify-content-center w-2rem search-filter">
            <div class="border-round-md py-2 w-12 text-center" @click="toPage(totalPage)"><i class="pi pi-angle-double-right"></i></div>
        </div>
    </template>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const emit = defineEmits(["to-page"]),
    currentPage = ref(0),
    totalPage = ref(0),
    props = defineProps({
        totalPage: {
            type: Number,
            default: 1,
        },
        currentPage: {
            type: Number,
            default: 1,
        },
    });

onMounted(() => {
    totalPage.value = props.totalPage || 1;
    currentPage.value = props.currentPage || 1;
});

watch(
    () => props.totalPage,
    (val) => {
        totalPage.value = val || 1;
    },
);
watch(
    () => props.currentPage,
    (val) => {
        currentPage.value = val || 1;
    },
);

function toPage(val) {
    emit("to-page", {
        page: val,
    });
}
</script>
