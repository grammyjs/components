<template>
  <div class="layout">
    <v-date-picker class="picker" v-model="result" :first-day-of-week="startOfWeek" :color="primaryColor" no-title
      show-current show-adjacent-months full-width />
  </div>
</template>

<script lang="ts">
import WebApp from "@grammyjs/web-app";
import getStartOfWeek from 'start-of-week'
import { DatePickerProps } from "grammy-components";
import { sendResult } from "@/helpers/telegram";

const props: Array<keyof DatePickerProps> = ["callback"];

export default defineComponent({
  props,
  setup(props, ctx) {
    const $vuetify = ctx.root.$vuetify;

    const primaryColor = ref(WebApp.themeParams.button_color);
    const startOfWeek = ref(getStartOfWeek($vuetify.lang.current))
    const result = ref();

    const onSave = () =>
      sendResult({
        value: result.value
      }, {
        callback: props.callback,
      });

    watch(result, async (value, oldValue) => {
      WebApp.MainButton.setParams({
        text: $vuetify.lang.t("$vuetify.datePicker.sendButtonText", result.value),
        color: WebApp.themeParams.button_color,
        is_active: true,
        is_visible: true,
      });
    });

    // initialization
    (() => {
      WebApp.MainButton.setParams({
        text: $vuetify.lang.t("$vuetify.datePicker.pickDate"),
        color: WebApp.themeParams.hint_color,
        is_active: false,
        is_visible: true,
      });
    })();

    onMounted(() => {
      WebApp.onEvent("mainButtonClicked", onSave);
    });

    onBeforeUnmount(() => {
      WebApp.offEvent("mainButtonClicked", onSave);
    });

    return {
      primaryColor,
      startOfWeek,
      result,
    };
  },
});
</script>

<style scoped>
.layout {
  height: var(--tg-viewport-height);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ease-out 0.25s;
}
</style>

<style>
.theme--dark.v-card {
  background: transparent !important
}

.theme--dark.v-picker__body {
  background: transparent !important
}

.v-picker {
  height: 100%;
}

.v-picker__body {
  height: 100%;
}

.v-picker__body>div {
  height: 95%;
}

.v-date-picker-table {
  height: inherit;
}

.v-date-picker-table table {
  height: 100%;
}
</style>
