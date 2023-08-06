<template>
    <svg :class="props.class" width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_4515_78135)">
            <g clip-path="url(#clip0_4515_78135)">
                <rect x="12" y="12" width="44" height="44" rx="10" fill="#F04060" />
                <g filter="url(#filter1_d_4515_78135)">
                    <g clip-path="url(#clip1_4515_78135)">
                        <path
                            d="M23 27.6815V39.662L33.4984 45.7757M23 27.6815L33.4984 33.9805M23 27.6815L27 25.5M33.4984 45.7757L39 42.5M33.4984 45.7757V33.9805M39 42.5C40.753 45.7757 43.4913 45.4323 44.5 45C47.5 43.7995 47.5514 40.8358 46.7757 39.1679C46 37.5 45.0704 37.0152 44.0585 36.744M39 42.5C38.7358 41.7844 38.7273 40.851 38.8843 39.7237M38.8843 39.7237C39.0209 38.7433 39.6716 37.7034 40.4767 37.2535C41.2817 36.8036 42.6887 36.3769 44.0585 36.744M38.8843 39.7237L37.0184 40.8353V43.7995M44.0585 36.744L43.935 27.6815M43.935 27.6815L33.4984 22L30.4106 23.671M43.935 27.6815L40.4767 29.7687M33.4984 33.9805L40.4767 29.7687M27 25.5L37.0184 31.6955V34.9686L40.4767 33.1777V29.7687M27 25.5L30.4106 23.671M40.4767 29.7687L30.4106 23.671M44 39.5L42.8543 40.65M41.5 42L42.8543 40.65M42.8543 40.65L44.5 42M42.8543 40.65L41.5 39.5M26.3727 35.2535L29.3987 37.1679V40.3174L26.3727 38.2795V35.2535Z"
                            stroke="#EBEBEB"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </g>
                </g>
            </g>
        </g>
        <defs>
            <filter id="filter0_d_4515_78135" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="8" dy="8" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4515_78135" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4515_78135" result="shape" />
            </filter>
            <filter id="filter1_d_4515_78135" x="7.26782" y="7.4541" width="69.0494" height="69.0908" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="8" dy="8" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4515_78135" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4515_78135" result="shape" />
            </filter>
            <clipPath id="clip0_4515_78135">
                <rect x="12" y="12" width="44" height="44" rx="10" fill="white" />
            </clipPath>
            <clipPath id="clip1_4515_78135">
                <rect width="29.0494" height="29.0909" fill="white" transform="translate(19.2678 19.4541)" />
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