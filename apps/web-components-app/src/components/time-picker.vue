<template>
  <div class="layout">
    <v-time-picker v-model="result" :color="primaryColor" format="24hr" full-width scrollable />
  </div>
</template>

<script lang="ts">
import { WebApp } from "@grammyjs/web-app";
import type { TimePicker } from "grammy-components";
import { sendResult } from "@/helpers/telegram";

const props: Array<keyof TimePicker.Props> = ["callback"];

export default defineComponent({
  props,
  setup(props) {
    const instance = getCurrentInstance()!.proxy;

    const $vuetify = instance.$vuetify;

    const primaryColor = ref(WebApp.themeParams.button_color);
    const result = ref();

    const onSave = () =>
      sendResult<TimePicker.Result>({
        type: 'time',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        time: result.value
      }, {
        callback: props.callback,
      });

    watch(result, async () => {
      WebApp.MainButton.setParams({
        text: $vuetify.lang.t("$vuetify.components.timePicker.sendButtonText", result.value),
        color: WebApp.themeParams.button_color,
        is_active: true,
        is_visible: true,
      });
    });

    // initialization
    (() => {
      WebApp.MainButton.setParams({
        text: $vuetify.lang.t("$vuetify.components.timePicker.pickTime"),
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
  transition: linear 0.1s;
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
  justify-content: center;
}
</style>
