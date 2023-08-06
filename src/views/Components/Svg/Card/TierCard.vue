<template>
    <svg :class="props.class" width="520" height="270" viewBox="0 0 520 270" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1899_13339)">
            <path d="M0 0V270H249.8H311.6H520V0H0Z" fill="white"/>
            <path d="M311.1 270H519.5V120.9C459.3 143.3 384.5 185 322.1 223.1C316.9 240.1 313.2 255.8 311.1 270Z" :class="props.isBlur ? 'blurCard' : ''"
                  fill="#115B11"/>
            <path
                d="M255.7 265C253.4 266.5 251.2 268.2 249.3 270H311.1C313.1 255.8 316.9 240.1 322.1 223.1C297.5 238.1 274.9 252.5 255.7 265Z" :class="props.isBlur ? 'blurCard' : ''"
                fill="#2E983A"/>
            <path d="M519.6 120.9V0H424.9C382.7 76 342 158.2 322.1 223.1C384.6 185 459.3 143.3 519.6 120.9Z" :class="props.isBlur ? 'blurCard' : ''"
                  :fill="colors[props.card]"/>
            <path
                d="M481.5 225.1C481.5 228.5 480.3 231.5 477.9 234.2C475.1 237.4 471.4 239 466.8 239C463 239 459.8 237.6 457 234.8C454.2 232 452.8 228.7 452.8 224.8C452.8 219.9 454.4 216 457.5 213.1C460.2 210.7 463.4 209.5 467 209.5C470.2 209.5 472.8 210.2 475 211.7C477.2 213.2 479.1 215.6 480.8 218.9L461.7 229.7L459 224.5L471.9 217.2C471.4 216.7 470.7 216.3 470 216C469.2 215.7 468.2 215.5 466.9 215.5C464.4 215.5 462.5 216.4 461.2 218.1C459.8 219.9 459.1 222 459.1 224.5C459.1 226.6 459.8 228.5 461.2 230.1C462.7 231.9 464.7 232.8 467.1 232.8C469.6 232.8 471.5 232.1 472.8 230.6C473.9 229.3 474.8 227.2 475.4 224.2L481.5 225.1Z"
                fill="white"/>
            <path
                d="M436 217.8C442.8 207.8 452.3 198.1 464.3 196.7C464.3 196.7 446.2 195.4 431.3 213.4C433.1 214.8 434.7 216.3 436 217.8Z"
                fill="white"/>
            <path
                d="M425.1 222.601C425.1 222.601 415.9 208.601 402.5 213.301C402.5 213.301 414.9 211.301 423.7 242.001C423.7 242.001 426.4 234.001 431.7 224.801C430.3 222.301 429 220.201 427.6 218.401C426.7 219.701 425.9 221.101 425.1 222.601Z"
                fill="white"/>
            <path
                d="M439.5 222.6C439.5 222.6 438.2 220.4 436 217.8C434.4 220.1 433 222.5 431.7 224.8C434 229.1 436.3 234.8 438.2 242C438.2 242 449 203 478.8 196.7C478.7 196.7 455 195 439.5 222.6Z"
                fill="white"/>
            <path
                d="M417.3 210.301C417.3 210.301 422.1 211.401 427.6 218.501C428.8 216.701 430 215.001 431.3 213.501C427.5 210.601 422.7 208.701 417.3 210.301Z"
                fill="white"/>
            <path
                d="M431.3 213.4C430 214.9 428.8 216.6 427.6 218.4C428.9 220.1 430.3 222.2 431.7 224.8C433 222.5 434.4 220.1 436 217.8C434.7 216.3 433.1 214.8 431.3 213.4Z"
                fill="white"/>
            <path
                d="M431.3 213.4C430 214.9 428.8 216.6 427.6 218.4C428.9 220.1 430.3 222.2 431.7 224.8C433 222.5 434.4 220.1 436 217.8C434.7 216.3 433.1 214.8 431.3 213.4Z"
                fill="white"/>
            <text text-anchor="start" fill="#8E8E8E" >
                <tspan x="35" y="75" :fill="colors[props.card]" style="font-size:3.5rem; font-weight: 700;"  >{{ words[props.card] }}</tspan>
                <template v-if="props.isBlur">
                  <tspan x="35" y="138" style="font-size:2rem; font-weight: 600;filter: blur(0.3rem);">xxxxxxxx</tspan>
                  <tspan x="35" y="165" style="font-size:1rem; filter: blur(0.2rem);">xxxxxx@xxx.com</tspan>
                  <tspan x="35" y="190" style="font-size:1rem; filter: blur(0.2rem);"> (xx)xxxx-xxx-xxx</tspan>
                  <tspan x="35" y="240" style="font-size:0.8rem; filter: blur(0.2rem);">Member since MMM YYYY</tspan>
                </template>
                <template v-else>
                  <tspan x="35" y="138" style="font-size:2rem; font-weight: 600;">{{ props.holder && props.holder.length > 0  ? props.holder : ' ' }}</tspan>
                  <tspan x="35" y="165" style="font-size:1rem;">
                    {{ props.email.length > 0 ? props.email : ' ' }}
                  </tspan>
                  <tspan x="35" y="190" style="font-size:1rem;" :fill="mobileColor">
                    {{ displayMobile }}
                  </tspan>
                  <tspan x="35" y="240" style="font-size:0.8rem;">{{ props.since }}</tspan>
                </template>
            </text>
        </g>
        <defs>
            <clipPath id="clip0_1899_13339">
                <rect width="520" height="270" fill="white"/>
            </clipPath>
        </defs>
    </svg>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import { useI18n } from "vue-i18n";

interface IconColorProps {
    class?: string,
    card?: string,
    since?: string,
    holder?: string,
    mobile?: string,
    mobilePrefix?: string,
    email?: string,
    isBlur?: boolean,
}

const { t } = useI18n(),
  props = withDefaults(defineProps<IconColorProps>(), {
        card: "bronze",
        class: "",
        holder: "",
        since: "",
        mobile: "",
        mobilePrefix: "",
        email: "",
        isBlur: false,
    }),
    colors = reactive({
        basic: '#c5e58c',
        pro: '#81d8a9',
        premium: '#399d89',
        vip: '#37a54a',
        vvip: '#ffae5c',
    }),
    words = reactive({
        basic: 'STANDARD',
        pro: 'PRO',
        premium: 'PREMIUM',
        vip: 'VIP',
        vvip: 'VVIP',
    }),
  mobileColor = ref('#44486D'),
  displayMobile = ref();

if (props.mobilePrefix && props.mobilePrefix.length > 0 && props.mobile && props.mobile.length > 0){
  displayMobile.value = "(" + props.mobilePrefix + ") " + props.mobile;
}else{
  mobileColor.value = '#ED5050';
  displayMobile.value = t("Please click here to setup your mobile phone");
}

</script>

<style lang="scss">
    .blurCard {
        -webkit-filter: blur(2rem);
        -moz-filter: blur(2rem);
        -o-filter: blur(2rem);
        -ms-filter: blur(2rem);
        filter: blur(2rem);
        -webkit-backdrop-filter: blur(2rem);
        backdrop-filter: blur(2rem);
    }
</style>