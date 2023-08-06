<template>
    <div
        v-for="index in range(0, renderSize)"
        @click="onClickMedia(index)"
        class="absolute overflow-hidden flex justify-content-center align-items-center cursor-pointer border-1 border-round-xl"
        :style="{
            inset: listingSize[renderSize][index],
            backgroundImage: mediaDetails[index]['type'] === 'video' ? `url(${media?.[index]['thumb']})` : `url(${media?.[index]['link']})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
        }"
    >
        <!--    <img-->
        <!--      :src="media?.[index]['thumb']"-->
        <!--      :class="-->
        <!--        mediaDetails[0]['orientation'] === 'landscape'-->
        <!--          ? 'w-auto h-full'-->
        <!--          : (mediaDetails[0]['orientation'] === 'square' ? 'w-auto h-full' : 'w-full h-auto')-->
        <!--      "-->
        <!--      alt=""-->
        <!--    />-->
        <div v-if="mediaDetails[index] && mediaDetails[index]['type'] === 'video'" class="absolute bg-primary p-2 sm:p-3 border-round-2xl flex justify-content-center">
            <i class="pi pi-play text-xl sm:text-2xl md:text-3xl"></i>
        </div>
        <div class="blur-img media-overlay" v-if="Number(index) === 4 && media?.length > 5">
            <span class="font-bold text-5xl sm:text-7xl">+{{ media?.length - 4 }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { range } from "lodash";

const size = ref(0),
    renderSize = ref(0),
    emit = defineEmits(["onClickMedia"]),
    listingSize = reactive({
        1: {
            0: "0 0 0 0",
        },
        2: {
            0: "0 50.5% 0 0",
            1: "0 0 0 50%",
        },
        3: {
            0: "0 0 33.33% 0%",
            1: "67.2% 51% 0 0",
            2: "67.2% 0 0 50%",
        },
        4: {
            0: "0 50.5% 50% 0",
            1: "0 0 50% 50%",
            2: "50.5% 50.5% 0 0",
            3: "50.5% 0 0 50%",
        },
        5: {
            0: "0 50.5% 33.33% 0",
            1: "0 0 33.33% 50%",
            2: "67.2% 67.77% 0 0",
            3: "67.2% 33.33% 0 33.33%",
            4: "67.2% 0 0 67.77%",
        },
    }),
    props = defineProps({
        media: {
            type: Array<any>,
            required: true,
        },
        mediaDetails: {
            type: Object,
            required: true,
        },
    });

onMounted(() => {
    size.value = props.media.length;
    renderSize.value = props.media.length >= 5 ? 5 : props.media.length;
});

function onClickMedia(index) {
    emit("onClickMedia", index);
}
</script>

<style scoped lang="scss">
.media-overlay {
    position: relative;
    width: 100%;
    height: 100%;
}

.media-overlay span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.blur-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.01);
    backdrop-filter: blur(1px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.image-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>