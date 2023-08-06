<template>
    <svg :class="props.class" width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_4515_78141)">
            <g clip-path="url(#clip0_4515_78141)">
                <rect x="12" y="12" width="44" height="44" rx="10" fill="#4086F0" />
                <g filter="url(#filter1_d_4515_78141)">
                    <g clip-path="url(#clip1_4515_78141)">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M35.0648 21.1747C34.7218 20.94 34.2694 20.9419 33.9284 21.1796L22.2327 29.3311L20.4857 30.3793C20.0121 30.6635 19.8585 31.2778 20.1427 31.7513C20.4268 32.2249 21.0411 32.3785 21.5146 32.0943L21.7765 31.9372V45.0921C21.7765 45.6444 22.2242 46.0921 22.7765 46.0921C23.3288 46.0921 23.7765 45.6444 23.7765 45.0921V30.693L34.5054 23.2153L45.2238 30.5489V45.0921C45.2238 45.6444 45.6715 46.0921 46.2238 46.0921C46.7761 46.0921 47.2238 45.6444 47.2238 45.0921V31.9173L47.4355 32.0622C47.8913 32.374 48.5136 32.2573 48.8255 31.8015C49.1373 31.3457 49.0206 30.7234 48.5648 30.4115L35.0648 21.1747ZM24.7962 32.4805C24.7962 31.9282 25.2439 31.4805 25.7962 31.4805H43.2041C43.7564 31.4805 44.2041 31.9282 44.2041 32.4805V45.0923C44.2041 45.6446 43.7564 46.0923 43.2041 46.0923C42.6518 46.0923 42.2041 45.6446 42.2041 45.0923V33.4805H26.7962V45.0923C26.7962 45.6446 26.3485 46.0923 25.7962 46.0923C25.2439 46.0923 24.7962 45.6446 24.7962 45.0923V32.4805ZM30.658 35.5C30.658 34.9477 31.1057 34.5 31.658 34.5H37.4755C38.0277 34.5 38.4755 34.9477 38.4755 35.5V38.9408H40.362C40.9143 38.9408 41.362 39.3885 41.362 39.9408V44.7368C41.362 45.2891 40.9143 45.7368 40.362 45.7368H28.8159C28.2636 45.7368 27.8159 45.2891 27.8159 44.7368V39.9408C27.8159 39.3885 28.2636 38.9408 28.8159 38.9408H30.658V35.5ZM32.658 38.9408H36.4755V36.5H32.658V38.9408ZM29.8159 40.9408V43.7368H33.5889V40.9408H29.8159ZM35.5889 40.9408V43.7368H39.362V40.9408H35.5889Z"
                            fill="#EBEBEB"
                        />
                    </g>
                </g>
            </g>
        </g>
        <defs>
            <filter id="filter0_d_4515_78141" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="8" dy="8" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4515_78141" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4515_78141" result="shape" />
            </filter>
            <filter id="filter1_d_4515_78141" x="7" y="7" width="70" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="8" dy="8" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4515_78141" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4515_78141" result="shape" />
            </filter>
            <clipPath id="clip0_4515_78141">
                <rect x="12" y="12" width="44" height="44" rx="10" fill="white" />
            </clipPath>
            <clipPath id="clip1_4515_78141">
                <rect width="30" height="30" fill="white" transform="translate(19 19)" />
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