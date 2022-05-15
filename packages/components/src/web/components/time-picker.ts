import { grammy } from "../../deps.deno.ts";
import {
  WebAppComponent,
  WebAppComponentConfig,
  WebAppComponentProps,
  WebAppComponentResult,
  WebAppComponentCallbackResult,
} from "../component.ts";
import { BASE_URL } from "../config.ts";
import { WebAppDataFlavor } from "../context.ts";
import { matchWebAppData } from "../filter.ts";
import { MaybePromise } from "../types.ts";

export type TimePickerProps = WebAppComponentProps;

export type TimePickerConfig = WebAppComponentConfig;

export type TimePickerResult = WebAppComponentResult<"time"> & {
  timeZone: string;
  value: string;
};

export type TimePickerTransformedResult = WebAppComponentResult<"time"> & {
  timeZone: string;
  value: Date;
};

export type TimePickerCallbackResult = WebAppComponentCallbackResult<
  "time",
  TimePickerResult
>;

export class TimePicker<
  TProps extends TimePickerProps,
  TConfig extends WebAppComponentConfig
> extends WebAppComponent<TProps, TConfig> {
  constructor(props?: TProps, config?: TConfig) {
    const defaultConfig: WebAppComponentConfig = {
      baseUrl: BASE_URL,
      path: "time-picker",
    };

    super(props, Object.assign(defaultConfig, config));
  }

  static match<
    TContext extends grammy.Context & WebAppDataFlavor,
    TTimePickerContext extends TContext &
      Required<WebAppDataFlavor<TimePickerResult, TimePickerTransformedResult>>
  >(
    filter: (ctx: TTimePickerContext) => MaybePromise<boolean> = () => true
  ): (ctx: TContext) => MaybePromise<boolean> {
    const matchComponent = matchWebAppData<
      TContext,
      TimePickerResult,
      TimePickerTransformedResult
    >((ctx) => ctx.webAppDataRaw.type === "time", {
      transform: ({ timeZone, value }) => ({
        type: "time",
        value: new Date(`1970-01-01T${value}:00Z`),
        timeZone,
      }),
    });

    return (ctx) =>
      Promise.resolve(matchComponent(ctx)).then((matched) =>
        matched ? filter(ctx as TTimePickerContext) : false
      );
  }
}
