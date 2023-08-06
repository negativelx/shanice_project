<template>
    <div class="card p-5 border-round-2xl">
        <div class="flex flex-wrap justify-content-between" ref="postRef">
            <div class="flex">
                <Avatar class="w-3rem h-3rem" :src="postDetails['member_avatar'] ?? ''"></Avatar>
                <div class="ml-3 flex flex-column justify-content-center">
                    <div class="flex">
                        <span class="font-bold">{{ postDetails["member_name"].length > 0 ? postDetails["member_name"] : t("Wellous Anonymous") }}</span>
                        <!--            <i class="pi ml-2 line-height-3" :class="postDetails['visibility'] === 'private' ? 'pi-lock' : 'pi-globe' "></i>-->
                    </div>
                    <small>
                        <router-link class="text-black-alpha-30 hover:underline" :to="{ name: 'Member/Post/Single', params: { id: postDetails['id'], mediaId: 0 } }">
                            {{ postDetails["date"] }}
                        </router-link>
                    </small>
                </div>
            </div>
            <div class="font-semibold p-3"></div>
        </div>
        <div class="content mt-2">
            <div class="font-bold text-lg ml-2">{{ postDetails?.["rating_product_display"]?.toUpperCase() }}</div>
            <div class="w-full">
                <ReadMore :content="postDetails['content']" @readMoreClosed="readMoreClosed" />
                <PostHashtag :postDetails="postDetails" />
                <PostDetails v-if="postDetails?.['media']?.length > 0" :from="from" :postDetails="postDetails" :preSelectedMediaId="preSelectedMediaId" />
                <!--        <div class="ml-1 mt-2 flex">-->
                <!--          <IconViews :fill="'black'" />-->
                <!--          <div class="ml-1" style="line-height: 20px">{{postDetails['viewer']}}</div>-->
                <!--        </div>-->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Avatar from "@/views/Components/Avatar.vue";
import ReadMore from "@/views/Components/Post/ReadMore.vue";
import PostDetails from "@/views/Components/Post/PostDetails.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import PostHashtag from "@/views/Components/Post/PostHashtag.vue";

const { t } = useI18n(),
    postRef = ref<HTMLElement>();

defineProps({
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

function readMoreClosed() {
    const element = postRef?.value;

    if (element) {
        element?.parentElement?.classList.add("focus-animate");
        element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start",
        });
        setTimeout(() => {
            element?.parentElement?.classList.remove("focus-animate");
        }, 1100);
    }
}
</script>

<style scoped lang="scss"></style>
