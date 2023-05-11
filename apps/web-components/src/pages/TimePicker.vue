<template>
  <q-page>
    <q-time v-model="time" mask="YYYY-MM-DD HH:mm" now-btn flat square />
    <tg-main-button
      :text="buttonText"
      :color="buttonColor"
      :disabled="!isTimePicked"
      @click="handleSend"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useWebAppTheme } from 'vue-tg';
import type { TimePicker } from '@grammyjs/components';
import { useTdesktopViewportFix } from 'composables/useTdesktopViewportFix';
import { sendComponentResult } from 'helpers/telegram';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  sendButton?: TimePicker.Props['sendButton'];
}>();

const { t, locale, mergeLocaleMessage } = useI18n();
const { themeParams } = useWebAppTheme();
const { offset: pageOffset } = useTdesktopViewportFix(2);

props.sendButton &&
  mergeLocaleMessage(locale.value, {
    timePicker: {
      sendButton: {
        hintText: props.sendButton.hintText,
        submitText: props.sendButton.submitText,
      },
    },
  });

const time = ref('');
const isTimePicked = ref(false);

const formattedTime = computed(() =>
  new Date(time.value).toLocaleTimeString(locale.value, {
    timeStyle: 'short',
  })
);
const buttonText = computed(() =>
  isTimePicked.value
    ? t('timePicker.sendButton.submitText', { time: formattedTime.value })
    : t('timePicker.sendButton.hintText')
);
const buttonColor = computed(() =>
  isTimePicked.value
    ? themeParams.value.button_color
    : themeParams.value.hint_color
);

watch(time, async () => {
  isTimePicked.value = true;
});

async function handleSend() {
  const resultDatetime = new Date(`${time.value}Z`);
  resultDatetime.setFullYear(1970, 0, 1);

  await sendComponentResult<TimePicker.Result>({
    type: 'time-picker',
    time: resultDatetime,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
}

const clockSize = `${innerWidth / 1.5}px`;
</script>

<style scoped>
/* resize to fit viewport */
.q-time:deep() {
  height: calc(var(--tg-viewport-height) - v-bind(pageOffset));
  transition: height 0.1s ease-out;
  width: 100%;

  --time-display-height: 86px;
}

.q-time:deep().q-time__content {
  height: calc(
    var(--tg-viewport-height) - var(--time-display-height) - v-bind(pageOffset)
  );
  transition: height 0.1s ease-out;
}

/* clock position */
.q-time:deep().q-time__container-parent {
  display: flex;
  padding: unset;
  align-items: center;
  justify-content: center;
}

/* resize clock */
.q-time:deep().q-time__container-child {
  height: calc(v-bind(clockSize)) !important;
  width: calc(v-bind(clockSize)) !important;
}

/* hide x-asis scrollbar */
.q-time:deep().q-time__content:before {
  padding-bottom: 50%;
}
</style>
