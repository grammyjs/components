import { createWebAppComponent } from "../component.ts";
import {
  datePickerConfigSchema as configSchema,
  datePickerPropsSchema as propsSchema,
  datePickerResultSchema as resultSchema,
} from "../validators/date-picker.ts";
import {
  DatePickerConfig,
  DatePickerProps,
  DatePickerResult,
} from "../types/date-picker.ts";
import { buildWebAppUrl } from "../utils.ts";

// deno-lint-ignore no-namespace
export namespace DatePicker {
  export type Props = DatePickerProps;
  export type Result = DatePickerResult;
}

export class DatePicker extends createWebAppComponent<DatePickerResult>(
  resultSchema,
) {
  #props: DatePickerProps;
  #config: Required<DatePickerConfig>;

  constructor(options?: DatePickerProps & { config?: DatePickerConfig }) {
    super();
    this.#props = propsSchema.parse(options ?? {});
    this.#config = configSchema.parse(options?.config ?? {});
  }

  setLanguage(value: DatePickerProps["language"]) {
    this.#props.language = propsSchema.shape.language.parse(value);
    return this;
  }

  setCallbackUrl(value: DatePickerProps["callbackUrl"]) {
    this.#props.callbackUrl = propsSchema.shape.callbackUrl.parse(value);
    return this;
  }

  setSendButton(value: DatePickerProps["sendButton"]) {
    this.#props.sendButton = propsSchema.shape.sendButton.parse(value);
    return this;
  }

  build() {
    return buildWebAppUrl(this.#config.baseUrl, this.#config.path, this.#props);
  }
}
