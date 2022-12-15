<template>
    <v-app :style="{ background: 'none' }">
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { WebApp } from "@grammyjs/web-app";

const isDarkColorScheme = () => WebApp.colorScheme === 'dark' ? true : false

export default defineComponent({
    setup() {
        const instance = getCurrentInstance()!.proxy;
        const $vuetify = instance.$vuetify

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

        onMounted(() => {
            onThemeChanged()

            WebApp.onEvent('themeChanged', onThemeChanged)
        })

        onBeforeUnmount(() => {
            WebApp.offEvent('themeChanged', onThemeChanged)
        })
    }
});
</script>