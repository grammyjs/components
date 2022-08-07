import { grammy } from "../../deps.deno.ts";
import { WebAppComponent } from "../component.ts";
import { BASE_URL } from "../config.ts";
import { WebAppDataFlavor } from "../context.ts";

// deno-lint-ignore no-namespace
export namespace TimePicker {
  export type Props = WebAppComponent.Props;

  export type Config = WebAppComponent.Config;

  export type Result = WebAppComponent.Result<"time"> & {
    timeZone: string;
    time: string;
  };

  export type TransformedResult = WebAppComponent.Result<"time"> & {
    timeZone: string;
    utcTime: Date;
    time: Date;
  };

  export type CallbackResult = WebAppComponent.CallbackResult<"time", Result>;

  export type Context = Required<WebAppDataFlavor<Result, TransformedResult>>;
}

export class TimePicker extends WebAppComponent<
  TimePicker.Props,
  TimePicker.Config
> {
  constructor(props?: TimePicker.Props, config?: TimePicker.Config) {
    const defaultConfig: WebAppComponent.Config = {
      baseUrl: BASE_URL,
      path: "time-picker",
    };

    super(props, Object.assign(defaultConfig, config));
  }

  static transform({
    time,
    timeZone,
  }: TimePicker.Result): TimePicker.TransformedResult {
    return {
      type: "time",
      utcTime: new Date(
        new Date(`1970-01-01T${time}:00Z`).toLocaleString("en-US", {
          timeZone,
        }),
      ),
      time: new Date(`1970-01-01T${time}:00Z`),
      timeZone,
    };
  }

  static match<C extends grammy.Context & WebAppDataFlavor>(
    filter: (ctx: C & TimePicker.Context) => boolean = () => true,
  ) {
    return (ctx: C): ctx is C & TimePicker.Context =>
      ctx.webAppDataRaw?.type === "time" &&
      ctx.webAppData?.type === "time" &&
      filter(ctx as C & TimePicker.Context);
  }
}
