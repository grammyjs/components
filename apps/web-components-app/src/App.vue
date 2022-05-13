<template>
    <v-app :style="{ background: 'none' }">
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import WebApp from "@grammyjs/web-app";
import { onBeforeUnmount, onMounted, getCurrentInstance } from "@vue/composition-api";
import rtlDetect from 'rtl-detect'

const $vuetify = getCurrentInstance()?.proxy?.$vuetify
const $route = getCurrentInstance()?.proxy?.$route

const isDarkColorScheme = () => WebApp.colorScheme === 'dark' ? true : false
const currentLang = ($route?.query.lang as string | undefined)
    || navigator.language
    || 'en'

const onThemeChanged = () => {
    $vuetify.theme.dark = isDarkColorScheme()

    // if ($vuetify.theme.dark) {
    //     $vuetify.theme.themes.dark.primary = WebApp.themeParams.bg_color
    //     $vuetify.theme.themes.dark.secondary = WebApp.themeParams.hint_color
    //     $vuetify.theme.themes.dark.accent = WebApp.themeParams.button_color
    // } else {
    //     $vuetify.theme.themes.light.primary = WebApp.themeParams.bg_color
    //     $vuetify.theme.themes.light.secondary = WebApp.themeParams.hint_color
    //     $vuetify.theme.themes.light.accent = WebApp.themeParams.button_color
    // }
}

// initialization
(() => {
    // set theme
    onThemeChanged()

    // set language
    $vuetify.lang.current = currentLang.substring(0, 2)
    $vuetify.rtl = rtlDetect.isRtlLang($vuetify.lang.current);
})()

onMounted(() => {
    WebApp.onEvent('themeChanged', onThemeChanged)
})

onBeforeUnmount(() => {
    WebApp.offEvent('themeChanged', onThemeChanged)
})
</script>