<template>
    <svg :class="props.class" width="448" height="225" viewBox="0 0 448 225" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1952_10838)">
            <path d="M448 0H0V225H448V0Z" fill="white"/>
            <path
                d="M395.5 0C308.5 54.8 150.6 147.6 77.9 147.6C48.4 147.6 22.3 140.8 0 128.6V95.5C27.2 117.5 64.2 129.4 104.9 129.4C187 129.4 253.8 80.9 256.2 0H395.5Z"
                fill="#37A54A"/>
            <path d="M256.2 0C253.8 80.9 187 129.4 105 129.4C64.3001 129.4 27.3001 117.4 0.100098 95.5V0H256.2Z"
                  fill="#0C6B15"/>
            <path
                d="M423.9 32.8C423.9 34.9 423.1 36.8 421.6 38.6C419.8 40.6 417.5 41.6 414.6 41.6C412.2 41.6 410.2 40.7 408.4 38.9C406.6 37.2 405.7 35.1 405.7 32.6C405.7 29.5 406.7 27 408.7 25.3C410.4 23.8 412.4 23 414.7 23C416.7 23 418.4 23.5 419.8 24.4C421.2 25.4 422.4 26.9 423.5 29L411.5 35.8L409.8 32.5L417.9 27.9C417.6 27.6 417.2 27.4 416.7 27.2C416.2 27 415.6 26.9 414.8 26.9C413.2 26.9 412 27.5 411.2 28.6C410.3 29.7 409.9 31 409.9 32.6C409.9 33.9 410.3 35.1 411.2 36.1C412.2 37.2 413.4 37.8 414.9 37.8C416.5 37.8 417.7 37.3 418.5 36.4C419.2 35.6 419.8 34.3 420.2 32.4L423.9 32.8Z"
                fill="#5FA642"/>
            <path
                d="M395.2 28.2C399.5 21.9 405.5 15.8 413 14.9C413 14.9 401.6 14.1 392.2 25.4C393.4 26.3 394.4 27.3 395.2 28.2Z"
                fill="#5FA642"/>
            <path
                d="M388.3 31.1999C388.3 31.1999 382.5 22.3999 374 25.3999C374 25.3999 381.8 24.0999 387.4 43.4999C387.4 43.4999 389.1 38.4999 392.4 32.5999C391.5 30.9999 390.7 29.6999 389.8 28.5999C389.4 29.3999 388.9 30.2999 388.3 31.1999Z"
                fill="#5FA642"/>
            <path
                d="M397.5 31.2004C397.5 31.2004 396.7 29.8004 395.3 28.2004C394.3 29.7004 393.4 31.2004 392.6 32.6004C394.1 35.3004 395.5 38.9004 396.7 43.5004C396.7 43.5004 403.5 19.0004 422.3 14.9004C422.1 14.9004 407.2 13.9004 397.5 31.2004Z"
                fill="#5FA642"/>
            <path
                d="M383.5 23.4998C383.5 23.4998 386.5 24.1998 390 28.5998C390.8 27.4998 391.5 26.3998 392.3 25.3998C389.9 23.6998 386.9 22.4998 383.5 23.4998Z"
                fill="#5FA642"/>
            <path
                d="M392.3 25.5C391.5 26.5 390.7 27.5 390 28.7C390.8 29.8 391.7 31.1 392.6 32.7C393.4 31.3 394.3 29.8 395.3 28.3C394.4 27.3 393.4 26.3 392.3 25.5Z"
                fill="#5FA642"/>
            <path
                d="M392.3 25.5C391.5 26.5 390.7 27.5 390 28.7C390.8 29.8 391.7 31.1 392.6 32.7C393.4 31.3 394.3 29.8 395.3 28.3C394.4 27.3 393.4 26.3 392.3 25.5Z"
                fill="#5FA642"/>
            <text text-anchor="start" fill="#ffffff">
                <tspan x="50" y="55" style="font-size:1.2rem;">Cash</tspan>
                <tspan x="50" y="85" style="font-size:2.5rem; font-weight:700;">Voucher</tspan>
            </text>
            <text fill="#8E8E8E"  text-anchor="end">
                <tspan text-anchor="end">
                    <tspan x="240" y="180" style="font-size:2rem; font-weight:600;">{{props.requiredPoints}}</tspan>
                    <tspan x="325" y="175" style="font-size:1.5rem;">point for</tspan>
                    <tspan x="323" y="190" style="font-size:0.8rem;">T&C Apply</tspan>
                </tspan>
                <tspan x="323" y="145" fill="#FFAE5C" style="font-size:1.5rem;">{{props.currency}}</tspan>
                <tspan x="440" y="205" fill="#FFAE5C" style="font-size:7.5rem;">{{props.amount}}</tspan>
            </text>
        </g>
        <defs>
            <clipPath id="clip0_1952_10838">
                <rect width="448" height="225" fill="white"/>
            </clipPath>
        </defs>
    </svg>
</template>

<script setup lang="ts">

interface VoucherProps {
    class?: string,
    amount?: number,
    requiredPoints?: number,
    currency?: string,
}

const props = withDefaults(defineProps<VoucherProps>(), {
        class: "",
        amount: 7,
        requiredPoints: 500,
        currency: "MYR",
    });


</script>
