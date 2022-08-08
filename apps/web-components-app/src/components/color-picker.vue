<template>
    <div class="layout">
        <v-color-picker v-model="result" class="picker" :canvas-height.once="pickerSize" :width.once="pickerSize"
            dot-size="30" hide-inputs>
        </v-color-picker>
    </div>
</template>

<script lang="ts">
import { WebApp } from "@grammyjs/web-app";
import type { ColorPicker } from "grammy-components";
import { sendResult } from "@/helpers/telegram";
import { getViewport } from "@/helpers/viewport";
import { getBrowserName } from "@/helpers/detect-browser";

const props: Array<keyof ColorPicker.Props> = [
    'callback',
    'sendButtonText'
]

export default defineComponent({
    props,
    setup(props) {
        const instance = getCurrentInstance()!.proxy;

        const $vuetify = instance.$vuetify;

        const result = ref({
            alpha: 1,
            hex: "#443E80",
            hexa: "#443E80FF",
            hsla: { h: 245.78125, s: 0.34743760911985205, l: 0.371979755353956, a: 1 },
            hsva: { h: 245.78125, s: 0.5157012195121952, v: 0.501219512195122, a: 1 },
            hue: 245.78125,
            rgba: { r: 68, g: 62, b: 128, a: 1 },
        });
        const pickerSize = ref();

        const onViewportUpdate = () => {
            const viewportWidth = getViewport().width;
            const viewportHeight = WebApp.viewportHeight;

            if (viewportWidth < viewportHeight) {
                pickerSize.value = viewportWidth * 0.9;
            } else {
                pickerSize.value = viewportHeight * 0.9;
            }

            if (getBrowserName() == 'safari') {
                pickerSize.value = pickerSize.value * 0.9
            }
        };

        const onSave = () =>
            sendResult<ColorPicker.Result>({
                type: 'color',
                ...result.value
            }, {
                callback: props.callback,
            });

        watch(result, async (value) => {
            const { r, g, b } = value.rgba;
            // https://en.wikipedia.org/wiki/Luma_%28video%29
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            let textColor = "#ffffff";
            if (luminance > 0.5) {
                textColor = "#000000";
            }

            WebApp.MainButton.setParams({
                text:
                    props.sendButtonText ||
                    $vuetify.lang.t("$vuetify.colorPicker.sendButtonText"),
                color: result.value.hex,
                text_color: textColor,
                is_active: true,
                is_visible: true,
            });
        });

        // initialization
        (() => {
            WebApp.MainButton.setParams({
                text: $vuetify.lang.t('$vuetify.colorPicker.pickColor'),
                color: WebApp.themeParams.hint_color,
                is_active: false,
                is_visible: true
            })

            onViewportUpdate()
        })();

        onMounted(() => {
            WebApp.onEvent("mainButtonClicked", onSave);
            WebApp.onEvent("viewPortChanged", onViewportUpdate);
        });

        onBeforeUnmount(() => {
            WebApp.offEvent("mainButtonClicked", onSave);
            WebApp.offEvent("viewPortChanged", onViewportUpdate);
        });

        return {
            pickerSize,
            result,
        }
    }
});
</script>

<style scoped>
.layout {
    height: var(--tg-viewport-height);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: linear 0.1s;
}

.picker {
    align-self: auto;
}
</style>
