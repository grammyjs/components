import { createWebAppComponent } from "../component.ts";
import {
  timePickerConfigSchema as configSchema,
  timePickerPropsSchema as propsSchema,
  timePickerResultSchema as resultSchema,
} from "../validators/time-picker.ts";
import {
  TimePickerConfig,
  TimePickerProps,
  TimePickerResult,
} from "../types/time-picker.ts";
import { buildWebAppUrl } from "../utils.ts";

// deno-lint-ignore no-namespace
export namespace TimePicker {
  export type Props = TimePickerProps;
  export type Result = TimePickerResult;
}

export class TimePicker extends createWebAppComponent<TimePicker.Result>(
  resultSchema,
) {
  #props: TimePickerProps;
  #config: Required<TimePickerConfig>;

  constructor(options?: TimePickerProps & { config?: TimePickerConfig }) {
    super();
    this.#props = propsSchema.parse(options ?? {});
    this.#config = configSchema.parse(options?.config ?? {});
  }

  setLanguage(value: TimePickerProps["language"]) {
    this.#props.language = propsSchema.shape.language.parse(value);
    return this;
  }

  setCallbackUrl(value: TimePickerProps["callbackUrl"]) {
    this.#props.callbackUrl = propsSchema.shape.callbackUrl.parse(value);
    return this;
  }

  setSendButton(value: TimePickerProps["sendButton"]) {
    this.#props.sendButton = propsSchema.shape.sendButton.parse(value);
    return this;
  }

  build() {
    return buildWebAppUrl(this.#config.baseUrl, this.#config.path, this.#props);
  }
}
