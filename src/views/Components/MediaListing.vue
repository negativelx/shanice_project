<template>
  <div class="p-2 mb-2 relative" ref="mediaListingRef">
    <template v-if="media?.length === 1">
      <div @click="onClickMedia(0)"
           class="absolute overflow-hidden flex justify-content-center align-items-center cursor-pointer border-1"
           :style="{inset: listingSize[1][0]}" >
        <img v-if="mediaDetails[0] && mediaDetails[0]['type'] === 'image'"
             :class="mediaDetails[0]['orientation'] === 'landscape' ? 'w-auto h-full' : 'w-full h-full'"
             :src="media?.[0]" alt=""  />
        <video v-if="mediaDetails[0] && mediaDetails[0]['type'] === 'video'" :src="media?.[0]" />
      </div>
    </template>
    <template v-if="media?.length === 2">
      <div v-for="index in [0,1,2]" @click="onClickMedia(index)"
           class="absolute overflow-hidden flex justify-content-center align-items-center cursor-pointer border-1"
           :style="{inset: listingSize[2][index]}" >
        <img v-if="mediaDetails[index] && mediaDetails[index]['type'] === 'image'"
             :class="mediaDetails[index]['orientation'] === 'landscape' ? 'w-auto h-full' : 'w-full h-full'"
             :src="media?.[index]" alt=""  />
        <video v-if="mediaDetails[index] && mediaDetails[index]['type'] === 'video'" :src="media?.[index]" />
      </div>
    </template>
    <template v-if="media?.length === 3">
      <div v-for="index in [0,1,2]" @click="onClickMedia(index)"
           class="absolute overflow-hidden flex justify-content-center align-items-center cursor-pointer border-1"
           :style="{inset: listingSize[3][index]}" >
        <img v-if="mediaDetails[index] && mediaDetails[index]['type'] === 'image'"
             :class="mediaDetails[index]['orientation'] === 'landscape' ? 'w-auto h-full' : 'w-full h-full'"
             :src="media?.[index]" alt=""  />
        <video v-if="mediaDetails[index] && mediaDetails[index]['type'] === 'video'" :src="media?.[index]" />
      </div>
    </template>
    <template v-if="media?.length === 4">
      <div v-for="index in [0,1,2,3]" @click="onClickMedia(index)"
           class="absolute overflow-hidden flex justify-content-center align-items-center cursor-pointer border-1"
           :style="{inset: listingSize[4][index]}" >
        <img v-if="mediaDetails[index] && mediaDetails[index]['type'] === 'image'"
             :class="mediaDetails[index]['orientation'] === 'landscape' ? 'w-auto h-full' : 'w-full h-full'"
             :src="media?.[index]" alt=""  />
        <video v-if="mediaDetails[index] && mediaDetails[index]['type'] === 'video'" :src="media?.[index]" />
      </div>
    </template>
    <template v-if="media?.length > 4">
      <div v-for="index in [0,1,2,3,4]" @click="onClickMedia(index)"
           class="absolute overflow-hidden flex justify-content-center align-items-center cursor-pointer border-1"
           :style="{inset: listingSize[5][index]}" >
        <img v-if="mediaDetails[index] && mediaDetails[index]['type'] === 'image'"
             :class="mediaDetails[index]['orientation'] === 'landscape' ? 'w-auto h-full' : 'w-full h-full'"
             :src="media?.[index]" alt=""  />
        <video v-if="mediaDetails[index] && mediaDetails[index]['type'] === 'video'" :src="media?.[index]" />
        <div class="blur-img media-overlay" v-if="index === 4 && media?.length > 5">
          <span class="font-bold text-5xl sm:text-7xl">+{{media?.length - 4}}</span>
        </div>
      </div>
    </template>
  </div>
  <div class="card md:flex md:justify-content-center">
    <Galleria v-model:visible="showGalleria" v-model:activeIndex="selectedMedia" :value="media" :fullScreen="true" @update:visible="galleriaVisibleEvent"
              :showItemNavigators="true" :showThumbnails="false"
               :numVisible="5">
      <div class="card w-10rem h-10rem"></div>
      <template #item="slotProps">
        <div class="flex justify-content-center w-fit align-items-center" style="height: 100vh; inset: 0;">
          <img v-if="mediaDetails[selectedMedia] && mediaDetails[selectedMedia]['type'] === 'image'"
               class="w-full h-full"
               :src="media?.[selectedMedia]" alt=""  />

          <video class="w-full h-full" controls v-if="mediaDetails[selectedMedia] && mediaDetails[selectedMedia]['type'] === 'video'">
            <source :src="media?.[selectedMedia]  + '?autoplay=0'" :type="mediaDetails[selectedMedia]['mime']">
          </video>
        </div>
      </template>
    </Galleria>
  </div>

</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {onMounted, reactive, ref} from "vue";
import Emitter from "@/service/Emitter";
import Galleria from "primevue/galleria";

const { t } = useI18n(),
    mediaListingRef = ref<HTMLElement>(),
    listingSize = reactive({
      1: {
        0: '0 0 0 0',
      },
      2: {
        0: '0 51% 0 0',
        1: '0 0 0 50%',
      },
      3: {
        0: '0 0 51% 0%',
        1: '50% 51% 0 0',
        2: '50% 0 0 50%',
      },
      4: {
        0: '0 51% 50% 0',
        1: '0 0 50% 50%',
        2: '51% 51% 0 0',
        3: '51% 0 0 50%',
      },
      5: {
        0: '0 51% 50% 0',
        1: '0 0 50% 50%',
        2: '51% 67.77% 0 0',
        3: '51% 33.33% 0 33.33%',
        4: '51% 0 0 67.77%',
      }
    }),
    mediaDetails = reactive({}),
    selectedMedia = ref(0),
    showGalleria = ref(false),
    props = defineProps({
      media: { type: Array, default: [] },
    });

Emitter.on('window:resize', () => {
  const mediaListingEl = mediaListingRef.value as HTMLElement;
  if (mediaListingEl.style && mediaListingEl.style.height)
    mediaListingEl.style.height = mediaListingRef.value?.scrollWidth + 'px';
});

function handleKeydown (e) {
  switch (e.keyCode) {
    case 27:
      showGalleria.value = false;
      selectedMedia.value = 0;
      window.removeEventListener('keydown', handleKeydown);
      break;
    case 37:
      if (selectedMedia.value === 0) return;
      selectedMedia.value--;
      break;
    case 39:
      if (selectedMedia.value === props.media?.length - 1) return;
      selectedMedia.value++;
      break;
  }
}

function galleriaVisibleEvent(){
  if (!showGalleria.value){
    selectedMedia.value = 0;
    window.removeEventListener('keydown', handleKeydown);
  }
}

function onClickMedia(index){
  selectedMedia.value = index;
  showGalleria.value = true;
  window.addEventListener('keydown', handleKeydown);
}

onMounted(() => {
  const mediaListingEl = mediaListingRef.value as HTMLElement;
  mediaListingEl.style.height = mediaListingRef.value?.scrollWidth + 'px';

  if (props.media && props.media.length > 0)
  {
    props.media.forEach(async (media, index) => {
      const response = await fetch(<string>media),
        contentType = response.headers.get('content-type');

      if (contentType?.startsWith('image')) {
        const img = new Image() as HTMLImageElement;
        img.src = <string>media;
        mediaDetails[index] = {
          type: 'image',
          mime: contentType,
          orientation: '',
        };
        img.onload = () => {
          mediaDetails[index]['orientation'] = img.width > img.height ? 'landscape' : 'portrait'
        }

      } else if (contentType?.startsWith('video')) {
        mediaDetails[index] = {
          type: 'video',
          mime: contentType,
          orientation: '',
        };
      } else {
        mediaDetails[index] = {
          type: 'unsupported',
          orientation: '',
        };
      }
    });
  }
});
</script>

<style scoped lang="scss">
.media-overlay{
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
  color: rgba(255, 255, 255, 0.70);
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}
.blur-img{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.01);
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
</style>