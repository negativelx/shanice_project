<template>
    <div class="fixed bottom-0 left-0 right-0 w-full z-5 sign-in-banner" style="min-height: 5rem;">
        <div class="flex flex-wrap justify-content-center align-items-center p-4 ">
            <div class="text-center">
                <span >{{t('See more and comment post of Wellous Malaysia on membership')}}</span>
                <div class="flex flex-wrap justify-content-center align-items-center gap-4 mt-4">
                    <Button :label="t('Sign in')" class="w-full h-3rem md:w-12rem sign-in-button "/>
                    <Button :label="t('Create an account')" class="w-full h-3rem md:w-12rem bg-transparent border-white" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useI18n } from "vue-i18n";
import Button from "primevue/button";

const {t} = useI18n();
</script>

<style lang="scss" scoped>

.sign-in-banner{
    background: #8CC541;
    color: white;
}

.sign-in-button{
    background: #ffffff;
    color: #8CC541;
    border: 1px solid #8CC541;
}

</style>