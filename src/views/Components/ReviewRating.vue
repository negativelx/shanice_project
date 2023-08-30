<template>
  <div class="flex">
    <Rating
        v-model="rateGiven"
        class="w-full mr-4"
        :cancel="false"
        @update:modelValue="giveRating"
    />
    <span class="font-bold text-lg text-gray-500">{{
        rateGiven > 0 ? rateGiven.toLocaleString(undefined, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }) : ''
      }}</span>
  </div>
</template>

<style scoped lang="scss">
:deep(.p-rating .p-rating-icon) {
  width: 1.5rem;
  height: 1.5rem;
  color: #ebc233;
}

:deep(.p-rating:not(.p-disabled):not(.p-readonly) .p-rating-icon:hover) {
  font-size: 1.5rem;
  color: rgba(235, 194, 51, 0.4);
}

:deep(.p-rating .p-rating-icon.pi-star-fill) {
  font-size: 1.5rem;
  color: #ebc233;
}
</style>
<script setup lang="ts">
import {ref} from "vue";
import Rating from "primevue/rating";

const props = defineProps({
      refId: {
        type: Number,
        required: true,
      }
    }),
    rateGiven = ref(0),
    emit = defineEmits(["give-rating"]);

function giveRating() {
  emit("give-rating", props.refId, rateGiven.value);
}
</script>
