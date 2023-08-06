<template>
    <div class="normal-text w-9 flex card-container mx-auto overflow-hidden flex flex-wrap justify-content-center align-items-center">
        <div v-for="langItem in layoutStore.availableLanguage"
             style="max-width: 12rem;"
             class="w-4 text-center text-sm lg:text-lg cursor-pointer border-round-3xl p-2"
             :class="{ selected: layoutStore.language === langItem }"
             :style="layoutStore.language === langItem ? 'border: 1px solid ' : ''"
             @click="changeLanguage(langItem)"
        >{{ t(`language.${langItem}`) }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.selected {
    color: var(--green-600);
    font-weight: bold;
}
</style>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useLayoutStore } from "@/stores/LayoutStore";

const layoutStore = useLayoutStore(), { t } = useI18n();

function changeLanguage(lang: string) {
    layoutStore.language = lang;
}
</script>
