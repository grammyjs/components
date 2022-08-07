import { grammy } from "../../deps.deno.ts";
import { WebAppComponent } from "../component.ts";
import { BASE_URL } from "../config.ts";
import { WebAppDataFlavor } from "../context.ts";
import { matchWebAppData } from "../filter.ts";
import { MaybePromise } from "../types.ts";

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

  static match<
    TContext extends grammy.Context & WebAppDataFlavor,
    TTimePickerContext extends TContext & TimePicker.Context
  >(
    filter: (ctx: TTimePickerContext) => MaybePromise<boolean> = () => true
  ): (ctx: TContext) => MaybePromise<boolean> {
    const matchComponent = matchWebAppData<
      TContext,
      TimePicker.Result,
      TimePicker.TransformedResult
    >((ctx) => ctx.webAppDataRaw.type === "time", {
      transform: this.transform,
    });

    return (ctx) =>
      Promise.resolve(matchComponent(ctx)).then((matched) =>
        matched ? filter(ctx as TTimePickerContext) : false
      );
  }
}
