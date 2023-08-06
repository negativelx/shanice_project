<template>
  <Dialog
    v-model:visible="props.showDialog"
    :modal="true"
    :showHeader="false"
    contentClass="p-0 border-round-3xl bg-white"
    :breakpoints="<DialogBreakpoints>props.breakpoints"
    :style="props.style"
    @afterHide="submitOk"
  >
    <div class="py-6 px-4 text-center">
      <slot></slot>
      <Button :label="okText" class="m-2 border-round-2xl shadow-1 border-none w-9rem p-3 btn-color"
              @click="submitOk" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog, { DialogBreakpoints } from "primevue/dialog";
import Button from "primevue/button";
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const { t } = useI18n(),
    emit = defineEmits(["submit-ok"]),
    show = ref(false),
    okText = ref(<string>t("Ok")),
    props = defineProps({
        breakpoints: {
            type: Object,
            required: false,
            default: { "1620px": "50vw", "1200px": "60vw", "1020px": "70vw", "576px": "90vw" }
        },
        style: { type: Object, required: false, default: { width: "30vw" } },
        showDialog: { type: Boolean, required: false, default: false },
        okText: { type: String, required: false, default: null }
    });
okText.value = props.okText ? props.okText : okText.value;

function submitOk() {
    emit("submit-ok");
}
</script>