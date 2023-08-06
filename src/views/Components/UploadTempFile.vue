<template>
    <FileUpload
        :id="props.componentId"
        @select="onSelectedFiles"
        @clear="onClearFiles"
        :showUploadButton="false"
        :accept="props.acceptFileType"
    >
        <template #header="{ chooseCallback, clearCallback }">
            <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                <div class="flex gap-2">
                    <Button @click="chooseCallback()" outlined ref="selectButtonRef">
                        <i class="pi pi-plus mr-2 font-semibold"></i> <span class="">{{ t("Select") }}</span>
                    </Button>
                    <Button @click="clearCallback()" outlined severity="danger" :disabled="Object.keys(mediaData.files).length <= 0">
                        <i class="pi pi-times mr-2 font-semibold"></i> <span class="">{{ t("Clear") }}</span>
                    </Button>
                </div>
                <div class="flex flex-column gap-1">
                    <span class="white-space-nowrap">{{ Utilities.bytesToFormatSize(mediaData["totalSize"])
                                                     }} / {{ Utilities.bytesToFormatSize(props.totalFileSize) }}</span>
                    <ProgressBar
                        :value="(mediaData['totalSize'] / props.totalFileSize) * 100"
                        :showValue="false"
                        style="height: 0.6rem;"
                        :class="['md:w-20rem w-full md:ml-auto', { 'exceeded-progress-bar': (mediaData['totalSize'] / props.totalFileSize) * 100 > 100 }]"
                    >
                    </ProgressBar>
                </div>
            </div>
        </template>
        <template #content="{}">
            <div v-if="Object.keys(mediaData.files).length > 0">
                <div class="flex flex-wrap p-0 gap-1">
                    <template v-for="(uploads, index) of mediaData.files">
                        <div class="mb-5 sm:mb-2 w-full">
                            <ProgressBarBg :uploadProgress="mediaProgress[index]" :name="uploads['name']" :size="Utilities.bytesToFormatSize(Number(uploads['size']))">
                                <div class="h-full w-5rem flex flex-wrap justify-content-center align-content-center">
                                    <img v-if="checkFileIsType(uploads['type'], 'image')"
                                         :alt="uploads['name']"
                                         :src="uploads['objectURL']"
                                         style="max-width: 100%; max-height: 3.7rem"
                                         class="shadow-2 " />
                                    <i v-if="checkFileIsType(uploads['type'], 'video')" class="pi pi-video text-4xl sm:text-6xl"></i>
                                </div>
                                <div class="ml-3 justify-content-start align-items-center flex-grow-1 px-1 hidden sm:flex">
                                    <div class="flex flex-column align-items-start">
                                        <div class="text-black-alpha-60 w-fit white-space-nowrap overflow-hidden text-overflow-ellipsis"
                                             style="max-width: 14rem">{{uploads["name"]}}</div>
                                        <small class="text-black-alpha-60"> {{ Utilities.bytesToFormatSize(Number(uploads["size"])) }} </small>
                                    </div>
                                    <Badge class="ml-2" v-if="mediaProgress[index]['state'] === 'completed'">{{t('Completed')}}</Badge>
                                    <Badge class="ml-2" severity="danger" v-if="mediaProgress[index]['state'] === 'failed'">{{t('Failed')}}</Badge>
                                </div>
                                <div class="flex flex-column justify-content-center align-items-end">
                                    <div class="flex gap-2">
                                        <Button class="px-3 font-bold bg-white text-black-alpha-70 border-gray-400 shadow-none"
                                                @click="sendRetry(index)"
                                                :label="t('Retry')" v-if="mediaProgress[index]['state'] === 'failed'" />
                                        <Button icon="pi pi-times" @click="onRemoveFile(index)" rounded severity="danger" />
                                    </div>
                                </div>
                            </ProgressBarBg>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <template #empty >
            <div class="flex align-items-center justify-content-center flex-column"
                 v-if="Object.keys(mediaData.files).length <= 0">
                <i class="pi pi-cloud-upload border-2 border-circle p-3 text-6xl text-400 border-400 cursor-pointer"
                   @click="onClickUploadButton"/>
                <p class="mt-4 mb-0">
                    {{ t("Select or Drag and drop files to here to upload.") }}
                </p>
            </div>
        </template>
    </FileUpload>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import { useI18n } from "vue-i18n";
import { GlobalToastOptionsType } from "@/types";
import Emitter from "@/service/Emitter";
import { useAppStore } from "@/stores/AppStore";
import Utilities from "../../service/Utilities";
import ProgressBarBg from "@/views/Components/ProgressBarBg.vue";
import Badge from "primevue/badge";

const { t } = useI18n(),
    appStore = useAppStore(),
    selectButtonRef = ref(null) as any,
    emit = defineEmits(['onUpdateSubmittedMedia']),
    mediaData = ref({ totalSize: 0, files: {}, videoCount: 0, filesType: {} }),
    mediaProgress = ref({}),
    currentIndex = ref(1),
    submittedMedia = ref({}),
    props = defineProps({
        componentId: {
            type: [String, Number],
            default: "fileUpload",
        },
        videoLimit: {
            type: Number,
            default: 0,
        },
        currentVideoCount: {
            type: Number,
            default: 0,
        },
        fileLimit: {
            type: Number,
            default: 10,
        },
        currentFileCount:{
            type: Number,
            default: 0,
        },
        acceptFileType: {
            type: String,
            default: "image/*,video/mp4,video/x-m4v,video/*",
        },
        totalFileSize: {
            type: Number,
            default: 1048576 * 100, // 100MB
        },
        currentTotalSize: {
            type: Number,
            default: 0,
        },
    });

onMounted(() => {
    if(props.currentTotalSize > 0)
        mediaData.value.totalSize = props.currentTotalSize;
    if(props.currentVideoCount > 0)
        mediaData.value.videoCount = props.currentVideoCount;
    console.log(mediaData.value)
});

function onClickUploadButton(){
    const uploadButtonEl = selectButtonRef?.value?.$el as HTMLElement;
    if (uploadButtonEl)
        uploadButtonEl.click();
}

function checkFileSize(event) {
    if (mediaData.value.totalSize + event.files[event.files.length - 1].size > props.totalFileSize) {
        showErrorToast("fileSize");
        event.files = event.files.pop();
        return false;
    } else return true;
}

async function onSelectedFiles(event: any) {
    const file = event.files[event.files.length - 1],
        fileType = file.type.split("/")[0];
    if (Object.keys(mediaData.value.files).length + props.currentFileCount >= props.fileLimit) {
        showErrorToast("fileLimit");
        event.files = event.files.pop();
        return;
    }
    if (!checkFileSize(event)) return;

    if (props.videoLimit > 0 ) {
        if (fileType === "video")
            mediaData.value.videoCount++;
        if (mediaData.value.videoCount > props.videoLimit)
        {
            showErrorToast("videoLimit");
            event.files = event.files.pop();
            mediaData.value.videoCount--;
            return;
        }
    }
    event.files = event.files.pop();
    mediaData.value.totalSize += file.size;
    mediaData.value.files[currentIndex.value] = file;
    mediaData.value.filesType[currentIndex.value] = fileType;
    if (!mediaProgress.value) mediaProgress.value = {};
    if (!mediaProgress.value[currentIndex.value]) mediaProgress.value[currentIndex.value] = ref({
        progress: 0,
        state: 'uploading'
    });

    const formData: FormData = new FormData();
    formData.append(`${fileType}`, file);
    formData.append(`type`, fileType);

    const currentIdx = currentIndex.value;
    currentIndex.value++;

    await uploadTempFile(formData, currentIdx);
}

async function uploadTempFile(formData, currentIdx)
{
    await appStore
        .uploadMedia(formData, (progressEvent) => {
            mediaProgress.value[currentIdx] = {
                progress: Math.floor((progressEvent.loaded * 100) / progressEvent.total),
                state: 'uploading'
            };
        })
        .then((resp) => {
            if (resp) {
                if (!submittedMedia.value) submittedMedia.value = {};
                submittedMedia.value[currentIdx] = resp.tempId;
                mediaProgress.value[currentIdx]['state'] = 'completed';
                emit("onUpdateSubmittedMedia", submittedMedia.value, props.componentId);
            } else {
                mediaProgress.value[currentIdx]['state'] = 'failed';
            }
        });
}

async function sendRetry(currentIdx)
{
    mediaProgress.value[currentIdx] = {
        progress: 0,
        state: 'uploading'
    };
    const formData: FormData = new FormData();
    formData.append(`${mediaData.value.filesType[currentIdx]}`, mediaData.value.files[currentIdx]);
    formData.append(`type`, mediaData.value.filesType[currentIdx]);
    await uploadTempFile(formData, currentIdx);
}

function checkFileIsType(arg, type) {
    return arg.startsWith(type);
}


function onClearFiles() {
    mediaData.value.files = {};
    mediaData.value.filesType = {};
    mediaData.value.totalSize = 0 + props.currentTotalSize
    mediaData.value.videoCount = 0 + props.currentVideoCount;
    submittedMedia.value = {};
    emit("onUpdateSubmittedMedia", submittedMedia.value, props.componentId);
}

function onRemoveFile(index) {
    delete mediaData.value.files[index];
    delete mediaData.value.filesType[index];
    if (submittedMedia?.value?.[index]) delete submittedMedia.value[index];
    mediaData.value.totalSize = 0 + props.currentTotalSize
    mediaData.value.videoCount = 0 + props.currentVideoCount;
    if (Object.keys(mediaData.value.files).length > 0) {
        Object.keys(mediaData.value.files).forEach(function (key) {
            const item = mediaData.value.files[key];
            mediaData.value.totalSize += item["size"];
            if (checkFileIsType(item["type"], "video"))
                mediaData.value.videoCount++;
        });
    }
    emit("onUpdateSubmittedMedia", submittedMedia.value, props.componentId);
}

function showErrorToast(type: string) {
    let messages: Array<any>;
    switch (type) {
        case "fileSize":
            messages = [t("Maximum file size is {maxSize}", {'maxSize': Utilities.bytesToFormatSize(props.totalFileSize)})];
            break;
        case "pendingUpload":
            messages = [t("Please wait for all files to be uploaded.")];
            break;
        case "videoLimit":
            messages = [t("Max Video Upload is {maxVideo}", {'maxVideo': props.videoLimit})];
            break;
        case "fileLimit":
            messages = [t("Max {maxFile} files", {'maxFile': props.fileLimit})];
            break;
        default:
            messages = [t("Error")];
            break;
    }
    const toastOptions: GlobalToastOptionsType = {
        severity: "error",
        title: t("Notice"),
        messages,
        timeout: 3000,
        position: "bottom-right",
    };
    Emitter.emit("interactive:toast", toastOptions);
}

function exCheckUploadDone()
{
    let uploadDone = true;
    for (let key of Object.keys(mediaProgress.value)) {
        if (mediaProgress.value[key]['progress'] >= 0 && mediaProgress.value[key]['progress'] < 100) {
            uploadDone = false;
            break;
        }
    }
    return uploadDone;
}

defineExpose({
    exCheckUploadDone
});

</script>

<style scoped lang="scss"></style>
