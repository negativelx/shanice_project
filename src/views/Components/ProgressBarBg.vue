<template>
    <div class="w-full h-full">
        <div class="flex flex-wrap justify-content-between ml-1 sm:hidden" v-if="props.name.length > 0">
            <div class="mb-1 flex w-full">
                <div class="flex gap-2">
                    <small
                        class="text-black-alpha-60 font-bold vertical-align-top inline-block white-space-nowrap overflow-hidden text-overflow-ellipsis w-fit"
                        style="max-width: 7.5rem">{{ name }}</small>
                    <small class="text-black-alpha-60 vertical-align-top">{{ size }}</small>
                </div>
                <div class="flex flex-wrap align-items-center mb-1">
                    <Badge class="ml-2 text-sm sm:text-normal" v-if="uploadProgress['state'] === 'completed'">{{t('Completed')}}</Badge>
                    <Badge class="ml-2" severity="danger" v-if="uploadProgress['state'] === 'failed'">{{t('Failed')}}</Badge>
                </div>
            </div>
        </div>
        <div class="progress-bar-container h-5rem border-1  border-round-xl relative py-2 sm:py-1"
             :class="uploadProgress['state'] === 'failed' ? 'bg-pink-50 border-pink-300' :
                (uploadProgress['state'] === 'completed' ? 'bg-green-50 border-green-300' : 'bg-white border-black-alpha-30')">

            <!-- The progress bar -->
            <div v-if="uploadProgress['state'] === 'uploading'" :class="uploadProgress['state'] === 'completed' ? '' : 'progress-bar'"
                 :style="{ width: uploadProgress['progress'] + '%' }"></div>
            <div class="w-full h-full flex flex-wrap justify-content-between px-3 py-2 relative z-2">
                <slot></slot>
            </div>
            <div class="absolute w-full text-xs sm:text-sm md:text-base" style="bottom: 0;">
                <template v-if="uploadProgress['state'] === 'uploading'">
                    <div class="flex justify-content-center">
                        <LoadingWordAnimation :content="t('Waiting for server')"
                                              v-if="Number(uploadProgress['progress']) === 100"
                                              :loading="uploadProgress['state'] === 'completed'">
                        </LoadingWordAnimation>
                        <LoadingWordAnimation :content="t('Uploading')"
                                              v-if="Number(uploadProgress['progress']) >= 0 && Number(uploadProgress['progress']) < 100"
                                              :loading="uploadProgress['state'] === 'uploading'">
                        </LoadingWordAnimation>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LoadingWordAnimation from "@/views/Components/LoadingWordAnimation.vue";
import { useI18n } from "vue-i18n";
import Badge from "primevue/badge";


const props = defineProps({
        uploadProgress: {
            type: Object,
            required: true,
            default: {
                state: "uploading",
                progress: 0,
            },
        },
        name: {
            type: String,
            default: "",
        },
        size: {
            type: String,
            default: "md",
        },
    }),
    {t} = useI18n();
</script>

<style>
.progress-bar-container {
    position: relative;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
}

/*noinspection CssUnusedSymbol*/
.progress-bar {
    z-index: 1 !important;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 100%; /* Set the desired height for your progress bar */
    background-color: rgba(195, 235, 51, 0.2);
    transition: width 0.3s ease;
}
</style>