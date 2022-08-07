import { grammy } from "../../deps.deno.ts";
import { WebAppComponent } from "../component.ts";
import { BASE_URL } from "../config.ts";
import { WebAppDataFlavor } from "../context.ts";
import { matchWebAppData } from "../filter.ts";
import { MaybePromise } from "../types.ts";

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

  static match<
    TContext extends grammy.Context & WebAppDataFlavor,
    TDatePickerContext extends TContext & DatePicker.Context
  >(
    filter: (ctx: TDatePickerContext) => MaybePromise<boolean> = () => true
  ): (ctx: TContext) => MaybePromise<boolean> {
    const matchComponent = matchWebAppData<
      TContext,
      DatePicker.Result,
      DatePicker.TransformedResult
    >((ctx) => ctx.webAppDataRaw.type === "date", {
      transform: this.transform,
    });

    return (ctx) =>
      Promise.resolve(matchComponent(ctx)).then((matched) =>
        matched ? filter(ctx as TDatePickerContext) : false
      );
  }
}
