<template>
    <svg :class="props.class" width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_4038_29802)">
            <rect x="12" y="12" width="44" height="44" rx="10" fill="#F8F8F8" />
            <path
                d="M45.465 22.2898C45.3302 22.1554 45.16 22.0624 44.9743 22.0217C44.7885 21.981 44.595 21.9942 44.4165 22.0598L22.4479 30.0598C22.2584 30.1317 22.0953 30.2597 21.9802 30.4267C21.8651 30.5937 21.8035 30.7918 21.8035 30.9948C21.8035 31.1977 21.8651 31.3958 21.9802 31.5628C22.0953 31.7298 22.2584 31.8578 22.4479 31.9298L31.0256 35.3598L37.3566 28.9998L38.7646 30.4098L32.4037 36.7798L35.8388 45.3698C35.9128 45.5558 36.0409 45.7154 36.2064 45.8277C36.372 45.94 36.5674 46 36.7674 45.9998C36.9692 45.9956 37.165 45.9303 37.329 45.8125C37.493 45.6947 37.6175 45.5299 37.6861 45.3398L45.6747 23.3398C45.7428 23.1628 45.7592 22.9702 45.722 22.7843C45.6849 22.5984 45.5958 22.4269 45.465 22.2898Z"
                fill="#EBEBEB"
            />
        </g>
        <defs>
            <filter id="filter0_d_4038_29802" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="8" dy="8" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4038_29802" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4038_29802" result="shape" />
            </filter>
        </defs>
    </svg>
</template>

<script setup lang="ts">
interface IconProps {
    class?: string;
}

const props = withDefaults(defineProps<IconProps>(), {
    class: "",
});
</script>