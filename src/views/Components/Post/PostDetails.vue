<template>
    <div class="p-2 mb-2 relative flex justify-content-center" ref="mediaListingRef">
        <PostMediaComposition :mediaDetails="mediaDetails" :media="media" @onClickMedia="onClickMedia"></PostMediaComposition>
    </div>
    <Dialog
        :modal="true"
        :showHeader="false"
        class="w-full post-dialog p-dialog-maximized"
        header="&nbsp;"
        style="height: 100vh"
        ref="postDialogRef"
        content-style="max-height: 100vh;"
        v-model:visible="showGalleria"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
    >
        <div class="card w-full h-full p-0 m-0 relative border-round-3xl hidden md:block">
            <IconBack :fill="'#fff'" class="w-2rem h-2rem absolute z-2 back-icon-hover cursor-pointer" style="top: 1%; left: 1%" @click="closeGalleria" />
            <Button class="absolute z-2" severity="secondary" rounded aria-label="Cancel" style="top: 1%; right: 0.5%" icon="pi pi-times" @click="closeGalleria" />
            <div class="grid p-0 m-0 h-full">
                <div class="col-7 lg:col-9 bg-black-alpha-90 p-0">
                    <Galleria
                        v-model:visible="showGalleria"
                        v-model:activeIndex="selectedMedia"
                        class="col-9 h-full"
                        :value="media"
                        :showItemNavigators="true"
                        :showThumbnails="false"
                        :numVisible="5"
                        :pt="{
                            previousItemButton: { class: ['z-1'] },
                            nextItemButton: { class: ['z-1'] },
                        }"
                    >
                        <div class="card w-10rem h-10rem"></div>
                        <template #item>
                            <div class="flex justify-content-center w-fit align-items-center" style="height: 99.5vh; inset: 0">
                                <img v-if="mediaDetails[selectedMedia] && mediaDetails[selectedMedia]['type'] === 'image'" class="max-w-full max-h-full" :src="media?.[selectedMedia]['link']" alt="" />
                                <video class="w-full h-full" controls oncontextmenu="return false;" v-if="mediaDetails[selectedMedia] && mediaDetails[selectedMedia]['type'] === 'video'">
                                    <source :src="media?.[selectedMedia]['link'] + '?autoplay=0'" :type="media?.[selectedMedia]['mimeType']" />
                                </video>
                            </div>
                        </template>
                    </Galleria>
                </div>
                <div class="col-5 lg:col-3 border-left-1 p-0">
                        <div class="flex flex-wrap justify-content-between p-4 pb-2">
                            <div class="flex">
                                <Avatar class="w-3rem h-3rem" :src="postDetails['member_avatar'] ?? ''"></Avatar>
                                <div class="ml-3 flex flex-column justify-content-center">
                                    <div class="flex">
                                        <span class="font-bold">{{ postDetails["member_name"].length > 0  ? postDetails["member_name"] : t('Wellous Anonymous') }}</span>
                                        <!--                  <i class="pi ml-2 line-height-3" :class="postDetails['visibility'] === 'private' ? 'pi-lock' : 'pi-globe' "></i>-->
                                    </div>
                                    <small>{{ postDetails["date"] }}</small>
                                </div>
                            </div>
                        </div>
                    <ScrollPanel style="width: 100%; height: 90vh">
                        <div class="content mt-0 pt-0 p-2 w-11" ref="postRef">
                            <ReadMore :content="postDetails['content']" />
                            <PostHashtag :postDetails="postDetails" />
                        </div>
                    </ScrollPanel>
                </div>
            </div>
        </div>
        <div class="card w-full h-full p-0 m-0 relative border-round-3xl block md:hidden">
            <ScrollPanel style="width: 100%; height: 100vh">
                <Button class="fixed bg-white z-4" severity="secondary" rounded raised aria-label="Cancel" style="top: 1rem; right: 1.5rem" icon="pi pi-times" @click="showGalleria = false" />
                <div class="p-0 mt-4">
                    <div class="flex flex-wrap justify-content-between p-4 pb-2">
                        <div class="flex">
                            <Avatar class="w-3rem h-3rem" :src="postDetails['member_avatar'] ?? ''"></Avatar>
                            <div class="ml-3 flex flex-column justify-content-center">
                                <div class="flex">
                                    <span class="font-bold">{{ postDetails["member_name"].length > 0  ? postDetails["member_name"] : t('Wellous Anonymous') }}</span>
                                    <!--                  <i class="pi ml-2 line-height-3" :class="postDetails['visibility'] === 'private' ? 'pi-lock' : 'pi-globe' "></i>-->
                                </div>
                                <small>{{ postDetails["date"] }}</small>
                            </div>
                        </div>
                        <div class="font-semibold p-3"></div>
                    </div>
                    <div class="content p-2 pr-4 pt-0 w-full" ref="postRef">
                        <ReadMore :content="postDetails['content']" />
                        <PostHashtag :postDetails="postDetails" />
                    </div>
                </div>
                <div class="flex flex-column justify-content-center align-items-center border-1 border-black-alpha-10 shadow-3 my-5" v-for="index in Object.keys(media)">
                    <img v-if="mediaDetails[index] && mediaDetails[index]['type'] === 'image'" ref="scrollItemRefs" class="w-full h-auto" :src="media?.[index]['link']" alt="" />
                    <video class="w-full h-auto" controls ref="scrollItemRefs" v-if="mediaDetails[index] && mediaDetails[index]['type'] === 'video'">
                        <source :src="media?.[index]['link']" :type="media?.[index]['mimeType']" />
                    </video>
                </div>
            </ScrollPanel>
        </div>
        <LoginRequiredFooter v-if="!useMemberStore().isLogin" />
    </Dialog>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onBeforeMount, reactive, ref, watch } from "vue";
import Emitter from "@/service/Emitter";
import Galleria from "primevue/galleria";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import ReadMore from "@/views/Components/Post/ReadMore.vue";
import Avatar from "@/views/Components/Avatar.vue";
import ScrollPanel from "primevue/scrollpanel";
import PostMediaComposition from "@/views/Components/Post/PostMediaComposition.vue";
import IconBack from "@/views/Components/Svg/Icon/IconBack.vue";
import { useMemberStore } from "@/stores/Member/Member";
import LoginRequiredFooter from "@/views/Components/LoginRequiredFooter.vue";
import PostHashtag from "@/views/Components/Post/PostHashtag.vue";

const { t } = useI18n(),
    mediaListingRef = ref<HTMLElement>(),
    windowWidth = ref(window.innerWidth),
    mediaDetails = reactive(<any>{}),
    selectedMedia = ref(-1),
    showGalleria = ref(false),
    media = ref(<Array<any>>[]),
    scrollItemRefs = ref([]),
    postDialogRef = ref(),
    props = defineProps({
        postDetails: {
            type: Object,
            required: true,
        },
        preSelectedMediaId: {
            type: Number,
            default: 0,
        },
        from: {
            type: String,
            default: "post",
        },
    });
let observers: IntersectionObserver[] = [];



onBeforeMount(async () => {
    media.value = props.postDetails?.media;
    if (media.value && media.value.length > 0)
        await processMedia();
    getDisplayHeight();
    const tempId = media.value.findIndex(item => item.id === props.preSelectedMediaId);
    if (props.preSelectedMediaId > 0 && tempId > -1)
    {
      selectedMedia.value = tempId;
      showGalleria.value = true;
        setTimeout(() => {
            scrollToTargetMedia(tempId);
        }, 100);
    }
});


async function processMedia() {
    media.value.forEach((data, index) => {
        const img = new Image() as HTMLImageElement;
        img.src = <string>data?.["thumb"];
        mediaDetails[index] = {
            type: data?.["mimeType"].startsWith("image") ? "image" : "video",
            orientation: "",
        };
        img.onload = () => {
            mediaDetails[index]["orientation"] = img.width > img.height ? "landscape" : img.width === img.height ? "square" : "portrait";
        };
    });
}

Emitter.on("window:resize", () => {
    windowWidth.value = window.innerWidth;
    getDisplayHeight();
});

const startX = ref(0),
    currentX = ref(0);

function onTouchStart(e) {
    startX.value = e.touches[0].clientX;
}

function getDisplayHeight() {
    const mediaListingEl = mediaListingRef.value as HTMLElement;
    const displayWidth = mediaListingRef.value?.scrollWidth ?? 200;
    switch (media.value.length) {
        case 1:
            mediaListingEl.style.height =
                (mediaDetails[0]["orientation"] === "portrait" ? displayWidth * 1.2 : mediaDetails[0]["orientation"] === "landscape" ? displayWidth / 2 : displayWidth) + "px";
            break;
        case 2:
            mediaListingEl.style.height = displayWidth / 2 + "px";
            break;
        case 4:
            mediaListingEl.style.height = displayWidth + "px";
            break;
        default:
            mediaListingEl.style.height = (displayWidth * 4) / 5 + "px";
            break;
    }
}

function onTouchMove(e) {
    currentX.value = e.touches[0].clientX;
}

function onTouchEnd() {
    const diff = startX.value - currentX.value;
    const mostLeftThreshold = postDialogRef.value?.container.offsetWidth * 0.1;

    if (currentX.value !== 0 && diff > mostLeftThreshold) {
        if (selectedMedia.value === media.value?.length - 1) return;
        selectedMedia.value++;
    } else {
        if (startX.value <= mostLeftThreshold * 2 && diff < mostLeftThreshold * -2) closeGalleria();
        if (selectedMedia.value === 0) return;
        if (diff < mostLeftThreshold * -1) selectedMedia.value--;
    }
    currentX.value = 0;
}

function handleKeydown(e) {
    switch (e.keyCode) {
        case 27:
            closeGalleria();
            break;
        case 37:
            if (selectedMedia.value === 0) return;
            selectedMedia.value--;
            break;
        case 39:
            if (selectedMedia.value === media.value?.length - 1) return;
            selectedMedia.value++;
            break;
    }
}

function onClickMedia(index: number) {
    selectedMedia.value = index;
    showGalleria.value = true;
    if (windowWidth.value < 768) {
        setTimeout(() => {
            scrollToTargetMedia(index);
            registerObserveVideos();
        }, 10);
    }
    window.addEventListener("keydown", handleKeydown);
}

function onMediaIndexUpdate(index: number){
  if(index >= 0)
    window.history.replaceState({}, '', window.location.origin + `/member/post/${props.postDetails?.id}/${media.value[index]['id']}`);
}

watch(
    () => selectedMedia.value,
    (index) => {
        // if (mediaDetails[index]?.type === "video") {
        //     const video = scrollItemRefs.value?.[index] as HTMLVideoElement;
        //     video.play();
        // }
        onMediaIndexUpdate(index);
    },
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                const video = entry.target as HTMLVideoElement;
                video.pause();
            }
        });
    },
    { threshold: 0.5 },
);

function registerObserveVideos() {
    scrollItemRefs.value?.forEach((item, index) => {
        if (mediaDetails[index]?.type === "video") {
            observer.observe(item);
            observers.push(observer);
        }
    });
}

function scrollToTargetMedia(index) {
    const target = scrollItemRefs.value?.[index] as HTMLElement;
    target.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "center",
    });
}

function closeGalleria() {
    showGalleria.value = false;
    selectedMedia.value = -1;
    observer.disconnect();
    window.removeEventListener("keydown", handleKeydown);
    let url: string;
    url = window.location.origin + '/member/post';
    if (props.from === 'single')
        url = window.location.origin + `/member/post/${props.postDetails?.id}`;
    window.history.pushState({}, '', url);
}
</script>

<style scoped lang="scss">
:deep(.p-dialog .p-dialog-header) {
    border-radius: 0;
    background: #fff !important;
}

:deep(.p-dialog-header) {
    border-radius: 0;
    background: #fff !important;
}
.back-icon-hover{
    opacity: 40%;
}
.back-icon-hover:hover{
    opacity: 100%;
}
</style>

<style lang="scss">
.post-dialog{
    height: 100vh !important;
}
.p-dialog-header{
    padding: 0.6rem !important;
    color: #fff !important;
    width: 100%;
    background: #fff !important;
    .p-dialog-header-icons .p-dialog-header-close {
        color: black  !important;
    }
}
</style>