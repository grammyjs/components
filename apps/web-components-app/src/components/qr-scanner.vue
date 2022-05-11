<template>
    <div class="layout">

        <qrcode-stream @decode="onDecode" @init="onCameraChange" :track="onTrack">
            <div v-if="loading" class="layout loading">
                <v-progress-circular :size="100" :width="10" color="grey" indeterminate></v-progress-circular>
            </div>
        </qrcode-stream>

        <v-snackbar v-bind:value="result" :timeout="-1" :top="true">
            {{ result }}
        </v-snackbar>

    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "@vue/composition-api";
import WebApp from "@grammyjs/web-app";
import { QrcodeStream } from 'vue-qrcode-reader'
import { QrScannerProps } from "grammy-components";

const props: QrScannerProps = defineProps([
    'callback',
    'sendButtonText'
])

const loading = ref(true);
const theme = ref(WebApp.themeParams);
const result = ref();
const error = ref();

const onDecode = (data: string) => {
    result.value = data;

    WebApp.MainButton.setParams({
        text: props.sendButtonText || 'SEND',
        color: theme.value.button_color,
        is_active: true,
    })
    WebApp.MainButton.hideProgress()
};

const onCameraChange = async (promise: any) => {
    try {
        await promise;

        WebApp.MainButton.setParams({
            text: 'Point camera at QR code',
            color: theme.value.hint_color,
            is_active: false,
            is_visible: true
        })
        WebApp.MainButton.showProgress()
    } catch (err) {
        const { name } = err as Error

        if (name === "NotAllowedError") {
            error.value = "Error: You need to grant camera access permission";
        } else if (name === "NotFoundError") {
            error.value = "Error: No camera on this device";
        } else if (name === "NotSupportedError") {
            error.value = "Error: Secure context required (HTTPS, localhost)";
        } else if (name === "NotReadableError") {
            error.value = "Error: Is the camera already in use?";
        } else if (name === "OverconstrainedError") {
            error.value = "Error: Installed cameras are not suitable";
        } else if (name === "StreamApiNotSupportedError") {
            error.value = "Error: Stream API is not supported in this browser";
        } else if (name === "InsecureContextError") {
            error.value =
                "Error: Use HTTPS or localhost rather than HTTP.";
        } else {
            error.value = `Error: Camera error (${name})`;
        }
        setTimeout(() => WebApp.close(), 5000)
    } finally {
        loading.value = false;
    }
};

const onTrack = (detectedCodes: any, ctx: CanvasRenderingContext2D) => {
    for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;
        ctx.strokeStyle = "grey";
        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
            ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
    }
};

const onSave = async () => {
    const { value } = result

    if (typeof props.callback === 'string') {
        WebApp.MainButton.showProgress()
        try {
            await fetch(props.callback,
                {
                    method: "POST",
                    body: JSON.stringify({
                        initData: WebApp.initData,
                        data: {
                            value
                        }
                    })
                })
            WebApp.close()
        } catch (err) {
            console.error(err)
        } finally {
            WebApp.MainButton.hideProgress()
        }
    } else {
        WebApp.sendData(value)
    }
}

watch(error, async (newValue, oldValue) => {
    WebApp.MainButton.setParams({
        text: newValue.substring(0, 64),
        color: '#ff0000',
        is_active: false,
        is_visible: true
    })
})

onMounted(() => {
    WebApp.onEvent('mainButtonClicked', onSave)
})

onBeforeUnmount(() => {
    WebApp.offEvent('mainButtonClicked', onSave)
})
</script>

<style scoped>
.layout {
    height: var(--tg-viewport-height);
    display: flex;
    align-items: center;
    justify-content: center;
}

.loading {
    color: var(--tg-theme-text-color);
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
}
</style>