<template>
    <div class="flex flex-wrap w-full">
        <div class="w-full md:w-2">
            <div @click="goBack()"
                 class="pi pi-arrow-left h-3rem font-semibold text-green-400 text-3xl flex line-height-3 cursor-pointer"
                 v-if="showBack">
                <p class="back-btn pl-3">{{ t("Back") }}</p>
            </div>
        </div>
    </div>
    <div class="exception-body accessdenied relative" style="min-height: 80vh;">
        <div class="exception-panel">
            <h1>{{ t('ACCESS') }}</h1>
            <h3>{{ t('denied') }}</h3>
            <div class="text-3xl md:text-4xl font-bold mt-5 mb-3">{{ t('Access Denied') }}</div>
            <div class="text-xl md:text-2xl font-normal">{{ t('You are not allowed to view this page.') }}</div>
        </div>
        <div class="absolute" style="bottom: 10vh; left:0; right:0;">
            <LangSwitch/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import router from "@/router";
import {useRoute} from "vue-router";
import LangSwitch from "@/views/Components/LangSwitch.vue";

const {t} = useI18n(), route = useRoute(), showBack = ref(route.meta.showBack ?? false);

function goBack() {
    window.history.length > 2 ? router.back() : router.push({name: "Index"});
}
</script>
