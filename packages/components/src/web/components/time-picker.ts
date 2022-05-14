import {
  WebAppComponent,
  WebAppComponentConfig,
  WebAppComponentProps,
} from "../component.ts";
import { BASE_URL } from "../config.ts";

export interface TimePickerProps extends WebAppComponentProps {}

export class TimePicker<
  P extends TimePickerProps,
  C extends WebAppComponentConfig
> extends WebAppComponent<P, C> {
  constructor(props?: P, config?: C) {
    const defaultConfig: WebAppComponentConfig = {
      baseUrl: BASE_URL,
      name: "time-picker",
    };

    super(props, Object.assign(defaultConfig, config));
  }
}
