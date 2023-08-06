<template>
    <div class="block-content">
        <transition @enter="onEnter" @after-enter="onAfterEnter" @before-leave="onBeforeLeave" @leave="onLeave"
                    ref="contentRef" mode="out-in">
            <p v-if="!isExpanded" class="block-content__preview mb-0 w-full" v-html="contentHtml" />
            <p
                v-else
                class="mb-0 w-full"
                :class="{
                    'block-content__paragraph': true,
                    'block-content__paragraph--is-expanded': isExpanded,
                }"
                v-html="contentHtml"
            />
        </transition>
        <a v-if="showMoreButton" class="cursor-pointer no-underline" @click="triggerReadMore"
           :class="isExpanded ? 'block-content__link--expanded' : 'block-content__link--collapsed'">
            <span class="mx-1 text-black-alpha-80">{{ isExpanded ? "" : "...." }}</span>
            <span class="ml-1 underline">{{ toggleLabel }}</span>
        </a>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { getAppEnvConfig } from "@/service/Env";

function triggerReadMore() {
    contentHtml.value = linkify(props.content || "");
    isExpanded.value = !isExpanded.value;
    if (!isExpanded.value) emit("readMoreClosed");
}

/**
 * @param el
 */
function onEnter(el: Element) {
    const htmlEl = el as HTMLElement;
    contentHtml.value = linkify(props.content || "");
    htmlEl.style.height = el.scrollHeight + "px";
}

/**
 * @param el
 */
function onAfterEnter(el: Element) {
    const htmlEl = el as HTMLElement;
    contentHtml.value = linkify(props.content || "");
    htmlEl.style.overflow = "hidden";
    htmlEl.style["text-overflow"] = "ellipsis";
}

/**
 * @param el
 */
function onBeforeLeave(el: Element) {
    const htmlEl = el as HTMLElement;
    contentHtml.value = linkify(props.content || "");
    htmlEl.style.height = `${el.scrollHeight}px`;
    htmlEl.style.overflow = "hidden";
    htmlEl.style["text-overflow"] = "ellipsis";
}

/**
 * @param el
 */
function onLeave(el: Element) {
    const htmlEl = el as HTMLElement;
    htmlEl.style.height = maxHeightCollapsed.value + "px";
    htmlEl.style.overflow = "hidden";
    htmlEl.style["text-overflow"] = "ellipsis";
}

/**
 * @param inputText
 */
function linkify(inputText) {
    /**
     *
     * @param url
     */
    const isOwnUrl = (url) => {
        const linkHostname = new URL(url).hostname;
        return linkHostname === location.hostname;
    };

    let replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, (match, url) => {
        const isOwn = isOwnUrl(url);
        return (isOwn) ? `<a href="${url}" target="_self">${url}</a>` : `<a href="${appConfig.API_URL}member/post/link?refUrl=${encodeURIComponent(url)}" target="_blank">${url}</a>`;
    });

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/a-z])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, (match, p1, p2) => {
        const url = `${location.protocol}://${p2}`, isOwn = isOwnUrl(url);
        return (isOwn) ? `<a href="${url}" target="_self">${url}</a>` : `<a href="${appConfig.API_URL}member/post/link?refUrl=${encodeURIComponent(url)}" target="_blank">${url}</a>`;
    });

    //Change email addresses to mailto:: links.
    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    replacedText = replacedText.replace(replacePattern3, (match, p1) => `<a href="${appConfig.API_URL}member/post/link?refUrl=${encodeURIComponent("mailto:" + p1)}" target="_blank">${p1}</a>`);

    // Change hashtags into links
    // Hide first as per request from JJ
    // replacePattern4 = /(#\w+)/gim;
    // replacedText = replacedText.replace(replacePattern4, (match, p1) => `<a href="${location.protocol}//${location.host}/member/post/hashtag/${encodeURIComponent(p1.substring(1))}" target="_self">${p1}</a>`);

    return replacedText;
}

const { t } = useI18n(),
    emit = defineEmits(["readMoreClosed"]),
    appConfig = getAppEnvConfig(),
    props = defineProps({
        content: { type: String, default: "" },
        visibleLines: { type: Number, default: 3 },
        lineHeight: { type: String, default: "20px" },
    }),
    contentHtml = ref(""),
    isExpanded = ref(false),
    { visibleLines } = toRefs(props),
    { lineHeight } = toRefs(props),
    showMoreButton = ref(true),
    contentRef = ref<HTMLElement>(),
    maxHeightCollapsed = computed(() => parseInt(lineHeight.value, 10) * visibleLines.value),
    toggleLabel = computed(() => (isExpanded.value ? t("Read less") : t("Read more")));
contentHtml.value = linkify(props.content || "");

onMounted(() => {
    const contentEl = contentRef.value as HTMLElement;
    showMoreButton.value = contentEl.scrollHeight > maxHeightCollapsed.value;
});
</script>

<style lang="scss" scoped>
.block-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 0.5rem 0.5rem;
    border-radius: 8px;
}

.block-content__preview {
    max-height: calc(v-bind(lineHeight) * v-bind(visibleLines));
    overflow: hidden;
    color: black;
    word-wrap: break-word !important;
}

.block-content__paragraph {
    color: black;
    overflow: hidden;
    transition: all 250ms ease-out;
    word-wrap: break-word !important;
}

.block-content__paragraph.block-content__paragraph--is-expanded {
    overflow: initial;
}

.block-content__link--expanded {
    color: blue;
    display: inline-block;
    background: white;
    padding: 0 0.5rem;
    text-decoration: underline;
    align-self: flex-end;
    margin-top: -0.5rem;
}

.block-content__link--collapsed {
    color: blue;
    display: inline-block;
    background: white;
    padding: 0 1.5rem 0 0;
    text-decoration: underline;
    align-self: flex-end;
    margin-top: -1.8rem;
}
</style>