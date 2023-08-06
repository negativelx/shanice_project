<template>
    <div class="w-full text-center">
        <div class="text-3xl md:text-4xl font-bold mt-5 mb-3">{{ t('Coming soon') }}</div>
        <IllustrationComingSoon class="m-3" style="width:80vw; max-width: 512px; max-height: 310px;"/>
        <div class="text-3xl md:text-4xl font-bold mt-5 mb-3">{{ t('Stay Tuned!') }}</div>
        <div class="text-xl md:text-2xl font-normal mx-auto" style="width:80vw; max-width: 700px;">{{ t("Exciting things are in the works! Stay tuned for our upcoming release. We can't wait to share it with you.") }}</div>
    </div>
    <div class="cursor-pointer border-round-3xl border-1 p-2 w-12rem text-center mx-auto my-5" @click="refresh">{{t('Refresh')}}</div>
    <div class="absolute" style="bottom: 5vh; left:0; right:0;">
        <LangSwitch/>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import router from "@/router";
import {useRoute} from "vue-router";
import IllustrationComingSoon from '@/views/Components/Svg/Illustration/ComingSoon.vue';
import LangSwitch from "@/views/Components/LangSwitch.vue";
import Emitter from "@/service/Emitter";

const {t} = useI18n(), route = useRoute(), showBack = ref(route.meta.showBack ?? false);

function refresh() {
    Emitter.emit("interactive:loading", true);
    Emitter.emit("navigator:sendMessage", "CACHE_CLEAR");
    window.history.length > 2 ? router.back() : router.push({name: "Index"});
}
</script>
