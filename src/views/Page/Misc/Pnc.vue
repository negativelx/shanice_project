<template>
    <div class="flex flex-wrap w-full">
        <div class="w-full md:w-2">
            <div @click="goBack()"
                 class="pi pi-arrow-left h-3rem font-semibold text-green-400 text-3xl flex line-height-3 cursor-pointer"
                 v-if="showBack">
                <p class="back-btn pl-3">{{ t("Back") }}</p>
            </div>
        </div>
        <div class="post-content-wrapper w-full md:w-8 mb-0 bg-white border-round-3xl p-5">
            <ProgressSpinner class="flex align-self-center p-0 h-full" v-if="pdfLoading"/>
            <vue-pdf-embed ref="pdfRef" :source="viewPdf" class="border-none w-full h-full p-0" @rendered="rendered"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import pncMember from "@/assets/pdf/privacy-member.pdf";
import ProgressSpinner from "primevue/progressspinner";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import router from "@/router";
import VuePdfEmbed, {VuePdfEmbedMethods} from "vue-pdf-embed";
import {useRoute} from "vue-router";

const {t} = useI18n(),
    route = useRoute(),
    viewPdf = ref(pncMember),
    pdfLoading = ref(true),
    showBack = ref(route.meta.showBack ?? false),
    pdfRef = ref<VuePdfEmbedMethods | null>(null),
    pdfWrapperClass = ref("");


function rendered() {
    pdfLoading.value = false;
    pdfWrapperClass.value = "h-auto";
}

if (window.history.length < 2)
    showBack.value = false;

function goBack() {
    window.history.length > 2 ? router.back() : router.push({name: "Index"});
}
</script>

<style scoped lang="scss">

.post-content-wrapper {
  padding-left: 2.3rem;
  padding-right: 2.3rem;
  border-radius: 1.43rem;
  background: white;
  max-width: 950px;
  margin-top: 1vh;
  margin-bottom: 1vh;
  height: 98vh;
  caret-color: transparent;
  @media screen and (max-width: 768px) {
    padding: 0;
    margin: 0;
  }
}
</style>
