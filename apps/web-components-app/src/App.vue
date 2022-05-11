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

const $vuetify = getCurrentInstance()?.proxy?.$vuetify

const isDarkColorScheme = () => WebApp.colorScheme === 'dark' ? true : false

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

onThemeChanged()

onMounted(() => {
    WebApp.onEvent('themeChanged', onThemeChanged)
})

onBeforeUnmount(() => {
    WebApp.offEvent('themeChanged', onThemeChanged)
})
</script>