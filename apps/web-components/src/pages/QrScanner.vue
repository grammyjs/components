<template>
  <q-page class="flex flex-center">
    <q-btn color="primary" :loading="loading" size="xl" padding="xl" :icon="mdiQrcodeScan" round
      @click="handleOpenScanner"></q-btn>
    <tg-scan-qr :text="props.hintText" />
  </q-page>
</template>

<script setup lang="ts">
import { mdiQrcodeScan } from '@quasar/extras/mdi-v7';
import { ref } from 'vue';
import {
  useWebAppPopup,
  useWebAppQrScanner,
  useWebAppHapticFeedback,
} from 'vue-tg';
import type { QrScanner } from '@grammyjs/components';
import { sendComponentResult } from 'helpers/telegram';

const props = defineProps<{
  hintText?: QrScanner.Props['hintText'];
  callbackUrl?: QrScanner.Props['callbackUrl'];
}>();

const loading = ref(false);

const { showConfirm } = useWebAppPopup();
const { impactOccurred } = useWebAppHapticFeedback();
const { onQrTextReceived, showScanQrPopup, closeScanQrPopup } =
  useWebAppQrScanner();

function handleOpenScanner() {
  loading.value = true;
  try {
    showScanQrPopup({
      text: props.hintText
    });
  } catch {

  }
  setTimeout(() => {
    loading.value = false;
  }, 3000);
}

onQrTextReceived(handleResult);

async function handleResult({ data }: { data: string }) {
  try {
    showConfirm(data, async (ok) => {
      if (ok) {
        await sendComponentResult<QrScanner.Result>({
          type: 'qr-scanner',
          value: data,
        }, props.callbackUrl);
        closeScanQrPopup();
      }
    });
    impactOccurred('heavy');
  } catch { }
}
</script>

<style scoped>
.q-page:deep() {
  min-height: unset !important;
  height: var(--tg-viewport-height);
}
</style>
