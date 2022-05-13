import {
  WebAppComponent,
  WebAppComponentConfig,
  WebAppComponentProps,
} from "../component.ts";
import { BASE_URL } from "../config.ts";

export interface ColorPickerProps extends WebAppComponentProps {
  sendButtonText?: string;
}

export class ColorPicker<
  P extends ColorPickerProps,
  C extends WebAppComponentConfig
> extends WebAppComponent<P, C> {
  constructor(props?: P, config?: C) {
    const defaultConfig: WebAppComponentConfig = {
      baseUrl: BASE_URL,
      name: "color-picker",
    };

    super(props, Object.assign(defaultConfig, config));
  }
}
