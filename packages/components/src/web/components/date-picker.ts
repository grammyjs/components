import {
  WebAppComponent,
  WebAppComponentConfig,
  WebAppComponentProps,
} from "../component.ts";
import { BASE_URL } from "../config.ts";

export interface DatePickerProps extends WebAppComponentProps {}

export class DatePicker<
  P extends DatePickerProps,
  C extends WebAppComponentConfig
> extends WebAppComponent<P, C> {
  constructor(props?: P, config?: C) {
    const defaultConfig: WebAppComponentConfig = {
      baseUrl: BASE_URL,
      name: "date-picker",
    };

    super(props, Object.assign(defaultConfig, config));
  }
}
