<template>
  <q-page>
    <q-color v-model="hex" no-header-tabs flat square />
    <tg-main-button
      :text="buttonText"
      :text-color="buttonTextColor"
      :color="hex"
      :disabled="!isColorPicked"
      @click="handleSend"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ColorPicker } from '@grammyjs/components';
import { sendComponentResult } from 'helpers/telegram';
import { hexToRgb } from 'helpers/color';
import { useTdesktopViewportFix } from 'composables/useTdesktopViewportFix';

const props = defineProps<{
  sendButton?: ColorPicker.Props['sendButton'];
}>();

const { offset: pageOffset } = useTdesktopViewportFix(2);
const { t, locale, mergeLocaleMessage } = useI18n();

props.sendButton &&
  mergeLocaleMessage(locale.value, {
    colorPicker: {
      sendButton: {
        hintText: props.sendButton.hintText,
        submitText: props.sendButton.submitText,
      },
    },
  });

const hex = ref('#666');
const isColorPicked = ref(false);

const buttonText = computed(() =>
  isColorPicked.value
    ? t('colorPicker.sendButton.submitText')
    : t('colorPicker.sendButton.hintText')
);
const buttonTextColor = computed(() => {
  const { r, g, b } = hexToRgb(hex.value.slice(1, 7));

  // https://en.wikipedia.org/wiki/Luma_(video)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  if (luminance > 0.5) {
    return '#000';
  } else {
    return '#fff';
  }
});

watch(hex, () => {
  isColorPicked.value = true;
});

async function handleSend() {
  await sendComponentResult<ColorPicker.Result>({
    type: 'color-picker',
    hex: hex.value,
  });
}
</script>

<style scoped>
/* resize to fit viewport */
.q-color-picker:deep() {
  max-width: unset;

  --header-height: 36px;
  --slider-height: 38px;
  --tabs-height: 36px;
}

/* resize spectrum picker */
.q-color-picker:deep().q-color-picker__spectrum {
  height: calc(
    var(--tg-viewport-height) - var(--header-height) - var(--slider-height) -
      var(--tabs-height) - v-bind(pageOffset)
  );
  transition: height 0.1s ease-out;
}

/* resize palette picker */
.q-color-picker:deep().q-color-picker__cube {
  padding-bottom: unset;
}

/* resize colors of palette picker */
.q-color-picker:deep().q-tab-panel > .q-color-picker__palette-rows {
  height: calc(
    var(--tg-viewport-height) - var(--header-height) - var(--tabs-height) -
      v-bind(pageOffset)
  );
  transition: height 0.1s ease-out;
  align-items: inherit;
}

/* hide rgb sliders tab */
.q-color-picker:deep().q-tabs__content > div:nth-child(2) {
  display: none;
}
</style>
