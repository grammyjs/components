import { grammy } from "../../deps.deno.ts";
import { WebAppComponent } from "../component.ts";
import { BASE_URL } from "../config.ts";
import { WebAppDataFlavor } from "../context.ts";

// deno-lint-ignore no-namespace
export namespace DatePicker {
  export type Props = WebAppComponent.Props;

  export type Config = WebAppComponent.Config;

  export type Result = WebAppComponent.Result<"date"> & {
    date: string;
  };

  export type TransformedResult = WebAppComponent.Result<"date"> & {
    date: Date;
  };

  export type CallbackResult = WebAppComponent.CallbackResult<"date", Result>;

  export type Context = Required<WebAppDataFlavor<Result, TransformedResult>>;
}

export class DatePicker extends WebAppComponent<
  DatePicker.Props,
  DatePicker.Config
> {
  constructor(props?: DatePicker.Props, config?: DatePicker.Config) {
    const defaultConfig: WebAppComponent.Config = {
      baseUrl: BASE_URL,
      path: "date-picker",
    };

    super(props, Object.assign(defaultConfig, config));
  }

  static transform({ date }: DatePicker.Result): DatePicker.TransformedResult {
    return {
      type: "date",
      date: new Date(date),
    };
  }

  static match<C extends grammy.Context & WebAppDataFlavor>(
    filter: (ctx: C & DatePicker.Context) => boolean = () => true,
  ) {
    return (ctx: C): ctx is C & DatePicker.Context =>
      ctx.webAppDataRaw?.type === "date" &&
      ctx.webAppData?.type === "date" &&
      filter(ctx as C & DatePicker.Context);
  }
}
