<template>
    <svg :class="props.class" width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_4515_78137)">
            <g clip-path="url(#clip0_4515_78137)">
                <rect x="12" y="12" width="44" height="44" rx="10" fill="#35352F" />
                <g filter="url(#filter1_d_4515_78137)">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M34.1807 20.2675C34.5853 20.6434 34.6085 21.2761 34.2326 21.6807L33.1322 22.8649H38.9865C39.5388 22.8649 39.9865 23.3126 39.9865 23.8649C39.9865 24.4172 39.5388 24.8649 38.9865 24.8649H32.9989L34.2623 26.3527C34.6198 26.7737 34.5683 27.4048 34.1473 27.7623C33.7263 28.1197 33.0952 28.0683 32.7377 27.6473L30.0756 24.5121C29.7476 24.1259 29.7604 23.5554 30.1053 23.1842L32.7675 20.3193C33.1434 19.9147 33.7762 19.8915 34.1807 20.2675ZM31.862 29.3313C32.0559 29.8484 31.7939 30.4248 31.2768 30.6188L28.7312 31.5734L34.9526 34.0405L40.6676 31.6063L38.034 30.6188C37.5169 30.4248 37.2549 29.8484 37.4488 29.3313C37.6427 28.8142 38.2191 28.5522 38.7363 28.7461L43.7092 30.611C43.8901 30.6788 44.0475 30.7976 44.1623 30.9529L46.8042 34.5272C46.9797 34.7647 47.0413 35.0676 46.9724 35.3548C46.9036 35.6419 46.7113 35.884 46.4472 36.0161L44.3581 37.0606V41.1824C44.3581 41.5559 44.15 41.8983 43.8184 42.0702L35.4265 46.4215C35.1485 46.5657 34.819 46.5713 34.5362 46.4366L25.4006 42.0853C25.0524 41.9194 24.8306 41.5681 24.8306 41.1824V37.0794L22.5771 36.0278C22.2967 35.8969 22.0926 35.6436 22.0245 35.3417C21.9564 35.0398 22.0319 34.7233 22.229 34.4847L25.1818 30.9104C25.2931 30.7756 25.4379 30.6724 25.6016 30.611L30.5746 28.7461C31.0917 28.5522 31.6681 28.8142 31.862 29.3313ZM26.8306 38.0128V40.5511L33.9662 43.9498V38.6955L33.1791 39.992C32.9144 40.428 32.3638 40.5949 31.9014 40.3792L26.8306 38.0128ZM35.9662 38.1849V43.8888L42.3581 40.5745V38.0606L38.3661 40.0566C37.9297 40.2748 37.3995 40.1462 37.1115 39.7522L35.9662 38.1849ZM36.5165 35.5482L38.2277 37.8898L44.4887 34.7593L43.0234 32.7768L36.5165 35.5482ZM33.497 35.6147L26.2603 32.7451L24.5942 34.762L31.9348 38.1877L33.497 35.6147Z"
                        fill="#EBEBEB"
                    />
                </g>
            </g>
        </g>
        <defs>
            <filter id="filter0_d_4515_78137" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="8" dy="8" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4515_78137" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4515_78137" result="shape" />
            </filter>
            <filter id="filter1_d_4515_78137" x="8" y="7" width="70" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="8" dy="8" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4515_78137" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4515_78137" result="shape" />
            </filter>
            <clipPath id="clip0_4515_78137">
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