import { createWebAppComponent } from "../component.ts";
import type {
  ColorPickerConfig,
  ColorPickerProps,
  ColorPickerResult,
} from "../types/color-picker.ts";
import {
  colorPickerConfigSchema as configSchema,
  colorPickerPropsSchema as propsSchema,
  colorPickerResultSchema as resultSchema,
} from "../validators/color-picker.ts";
import { buildWebAppUrl } from "../utils.ts";

// deno-lint-ignore no-namespace
export namespace ColorPicker {
  export type Props = ColorPickerProps;
  export type Result = ColorPickerResult;
}

export class ColorPicker extends createWebAppComponent<ColorPickerResult>(
  resultSchema,
) {
  #props: ColorPickerProps;
  #config: Required<ColorPickerConfig>;

  constructor(options?: ColorPickerProps & { config?: ColorPickerConfig }) {
    super();
    this.#props = propsSchema.parse(options ?? {});
    this.#config = configSchema.parse(options?.config ?? {});
  }

  setLanguage(value: ColorPickerProps["language"]) {
    this.#props.language = propsSchema.shape.language.parse(value);
    return this;
  }

  setCallbackUrl(value: ColorPickerProps["callbackUrl"]) {
    this.#props.callbackUrl = propsSchema.shape.callbackUrl.parse(value);
    return this;
  }

  setSendButton(value: ColorPickerProps["sendButton"]) {
    this.#props.sendButton = propsSchema.shape.sendButton.parse(value);
    return this;
  }

  build() {
    return buildWebAppUrl(this.#config.baseUrl, this.#config.path, this.#props);
  }
}
