<template>
    <div class="ml-2 flex flex-row flex-wrap title-nav mb-4 mt-4">
        <div class="flex cursor-pointer mr-3 page-title white-space-nowrap overflow-hidden text-overflow-ellipsis"
             @click="back"><i class="pi pi-arrow-left text-xl font-bold mt-2"></i>
            <Skeleton v-if="skeleton" class="w-10rem" height="2rem"/>
            <span v-else class="ml-3 page-title font-bold vertical-align-top text-3xl ">{{
                    translate ? t(pageTitle) : pageTitle
                }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Skeleton from 'primevue/skeleton';
import { useLayoutStore } from "@/stores/LayoutStore";

const { t } = useI18n(),
    pageTitle = ref('Title'),
    backLink = ref(''),
    router = useRouter(),
    props = defineProps({
        pageTitle: {
            type: String,
            required: true
        },
        backLink: {
            type: String,
            default: ''
        },
        translate: {
            type: Boolean,
            default: true
        },
        skeleton: {
            type: Boolean,
            default: false
        }
    });

onMounted(() => {
    pageTitle.value = props.pageTitle;
    backLink.value = props.backLink;
});

function back() {
    if (backLink.value === '')
        window.history.length > 2 ? router.back() : useLayoutStore().goHome();
    else
        router.push({ name: backLink.value });
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 576px) {
    .page-title {
        font-size: 1.5rem !important;
        line-height: 2rem !important;
    }
}

//#3F464C
.page-title {
    color: #3F464C;
}
</style>
