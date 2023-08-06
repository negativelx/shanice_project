<template>
  <Dialog
    v-model:visible="props.showDialog"
    :modal="true"
    :showHeader="false"
    contentClass="p-0 border-round-3xl bg-white"
    :breakpoints="<DialogBreakpoints>props.breakpoints"
    :style="props.style"
  >
    <div class="py-6 px-4 text-center">
      <slot></slot>
      <template v-if="btnReverse">
        <Button :label="cancelText" class="confirm-btn m-2 border-round-2xl shadow-1 border-none w-9rem p-3 btn-color"
                @click="submitClosed" />
        <Button :label="confirmText"
                class="confirm-btn m-2 border-round-2xl shadow-1 text-black-alpha-90 border-black-alpha-90 w-9rem p-3 bg-white"
                @click="submitConfirmation" />
      </template>
      <template v-else>
        <Button :label="confirmText" class="m-2 border-round-2xl shadow-1 border-none w-9rem p-3 btn-color"
                @click="submitConfirmation" />
        <Button :label="cancelText"
                class="m-2 border-round-2xl shadow-1 text-black-alpha-90 border-black-alpha-90 w-9rem p-3 bg-white"
                @click="submitClosed" />
      </template>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog, { DialogBreakpoints } from "primevue/dialog";
import Button from "primevue/button";
import { useI18n } from "vue-i18n";
import { onMounted, ref, watch } from "vue";

const { t } = useI18n(),
    emit = defineEmits(["submit-confirm", "submit-closed"]),
    show = ref(false),
    confirmText = ref(<string>t("Confirm")),
    cancelText = ref(<string>t("Cancel")),
    props = defineProps({
        breakpoints: {
            type: Object,
            required: false,
            default: { "1620px": "50vw", "1200px": "60vw", "1020px": "70vw", "576px": "90vw" }
        },
        style: { type: Object, required: false, default: { width: "30vw" } },
        showDialog: { type: Boolean, required: false, default: false },
        confirmText: { type: String, required: false, default: null },
        cancelText: { type: String, required: false, default: null },
        btnReverse: { type: Boolean, required: false, default: false }
    });

onMounted(() => {
    confirmText.value = props.confirmText ? props.confirmText : confirmText.value;
    cancelText.value = props.cancelText ? props.cancelText : cancelText.value;
    show.value = props.showDialog;
});

watch(() => props.showDialog, (val) => {
    show.value = val;
});

watch(
    () => props.confirmText,
    (val) => {
        confirmText.value = val;
    },
);
watch(
    () => props.cancelText,
    (val) => {
      cancelText.value = val;
    },
);

function submitConfirmation() {
    emit("submit-confirm");
}

function submitClosed() {
    show.value = false;
    emit("submit-closed");
}

</script>

<style scoped lang="scss">

</style>