<template>
    <div class="flex flex-wrap">
        <div v-for="hashtag of postDetails?.['hashtag']" @click="searchHashtag(hashtag)"
             class="text-blue-500 font-semibold mx-2 my-2 cursor-pointer">#{{ hashtag }}
        </div>
    </div>
</template>

<script setup lang="ts">
import router from "@/router";

defineProps({
    postDetails: {
        type: Object,
        required: true,
    },
});

function searchHashtag(tag) {
    router.push({ name: "Member/Post/Hashtag", params: { tag: tag } });
}

</script>

<style scoped lang="scss">
</style>