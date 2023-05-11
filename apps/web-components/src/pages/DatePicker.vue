<template>
  <q-page>
    <q-date
      v-model="date"
      mask="YYYY-MM-DD"
      :first-day-of-week="fisrtDayOfWeek"
      years-in-month-view
      no-unset
      flat
      square
    />
    <tg-main-button
      :text="buttonText"
      :color="buttonColor"
      :disabled="!isDatePicked"
      @click="handleSend"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useWebAppTheme } from 'vue-tg';
import { getWeekStartByLocale } from 'weekstart';
import type { DatePicker } from '@grammyjs/components';
import { useTdesktopViewportFix } from 'composables/useTdesktopViewportFix';
import { sendComponentResult } from 'helpers/telegram';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  sendButton?: DatePicker.Props['sendButton'];
}>();

const { t, locale, mergeLocaleMessage } = useI18n();
const { themeParams } = useWebAppTheme();
const { offset: pageOffset } = useTdesktopViewportFix(2);

props.sendButton &&
  mergeLocaleMessage(locale.value, {
    datePicker: {
      sendButton: {
        hintText: props.sendButton.hintText,
        submitText: props.sendButton.submitText,
      },
    },
  });

const date = ref();
const fisrtDayOfWeek = ref(getWeekStartByLocale(locale.value));
const isDatePicked = ref(false);

const formattedDate = computed(() =>
  new Date(date.value).toLocaleDateString(locale.value)
);
const buttonText = computed(() =>
  isDatePicked.value
    ? t('datePicker.sendButton.submitText', { date: formattedDate.value })
    : t('datePicker.sendButton.hintText')
);
const buttonColor = computed(() =>
  isDatePicked.value
    ? themeParams.value.button_color
    : themeParams.value.hint_color
);

watch(date, async () => {
  isDatePicked.value = true;
});

async function handleSend() {
  await sendComponentResult<DatePicker.Result>({
    type: 'date-picker',
    date: new Date(`${date.value}T00:00:00.000Z`),
  });
}
</script>

<style scoped>
/* resize to fit viewport */
.q-date:deep() {
  height: calc(var(--tg-viewport-height) - v-bind(pageOffset));
  transition: height 0.1s ease-out;
  width: unset;
}
</style>
