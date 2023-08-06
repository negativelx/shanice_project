<template>
  <div class="col-6 xl:col-3 p-2 cursor-pointer relative" :class="{'relative':props.badge}" style="max-width: 23rem;"
       @click="router.push(props.route)">
    <template v-if="props.badge">
      <img style="position: absolute;right: -5px;top: -0px;width: 3.5rem;" :src="ellipseUrl" alt="" />
      <span style="color: grey;position: absolute;right: 10px;top: 14px;font-size: 0.75rem;">{{ props.badge }}</span>
    </template>
    <div class="border-round-3xl border-1 border-solid h-8rem flex p-3 card-border" :class="cardInnerClass">
      <div class="flex justify-content-center">
        <component :is="props.logo" v-if="props.logo"></component>
      </div>
      <div class="ml-2 flex justify-content-center" :class="cardBeforeSlotClass">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ellipseUrl from "@/assets/images/icon/ellipse.png";
import router from "@/router";

const props = defineProps({
    route: <any>{},
    logo: <any>{},
    badge: {
        type: String,
        default: ""
    },
    cardInnerClass: {
        type: String,
        default: ""
    },
    cardBeforeSlotClass: {
        type: String,
        default: ""
    },
    cardRouteBg: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped lang="scss">
.card-border {
  border-color: #3BB34A;
}

/*noinspection CssUnusedSymbol*/
.complete-profile-card {
  /*noinspection CssUnusedSymbol*/
  .card-bg {
    background-image: url("@/assets/images/card_route_bg.png") !important;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

  }

  /*noinspection CssUnusedSymbol*/
  .card-bg:hover {
    opacity: 0.9;
  }

  /*noinspection CssUnusedSymbol*/

}
</style>
