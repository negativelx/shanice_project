<template>
    <svg :class="props.class" width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_4515_78139)">
            <g clip-path="url(#clip0_4515_78139)">
                <rect x="12" y="12" width="44" height="44" rx="10" fill="#F09440" />
                <g filter="url(#filter1_d_4515_78139)">
                    <path
                        d="M25.4355 24.1516H31.3581M24.9419 36.6548L25.929 37.6419C25.271 39.0897 25.9839 40.2194 26.4226 40.6032L28.7258 42.9065M24.9419 36.6548L24.2839 37.3129L20.5 33.6935M24.9419 36.6548L29.0548 32.5419M20.829 23L29.7129 31.8839L29.0548 32.5419M29.0548 32.5419L30.8645 34.1871C32.071 33.3645 35.2406 32.7065 38.2677 36.6548C38.7613 37.6419 38.6297 38.991 34.1548 36.4903C33.6065 36.6548 32.7729 37.2142 33.8258 38.1355L39.0989 43.729M39.0989 43.729C39.2821 43.4563 39.382 43.1495 39.4194 42.9065H46V24.1516H36.9516M39.0989 43.729C38.7448 44.2563 38.0793 44.6563 36.9516 44.2226H30.0419L28.7258 42.9065M28.7258 42.9065H21.6516V38.1355M31.3581 24.1516V26.9484H36.9516V24.1516M31.3581 24.1516H36.9516"
                        stroke="#EBEBEB"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g>
            </g>
        </g>
        <defs>
            <filter id="filter0_d_4515_78139" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="8" dy="8" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4515_78139" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4515_78139" result="shape" />
            </filter>
            <filter id="filter1_d_4515_78139" x="7" y="7" width="70" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="8" dy="8" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4515_78139" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4515_78139" result="shape" />
            </filter>
            <clipPath id="clip0_4515_78139">
                <rect x="12" y="12" width="44" height="44" rx="10" fill="white" />
            </clipPath>
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