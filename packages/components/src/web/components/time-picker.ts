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
  time: string;
};

export type TimePickerTransformedResult = WebAppComponentResult<"time"> & {
  timeZone: string;
  time: Date;
};

export type TimePickerCallbackResult = WebAppComponentCallbackResult<
  "time",
  TimePickerResult
>;

export type TimePickerContext = Required<
  WebAppDataFlavor<TimePickerResult, TimePickerTransformedResult>
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

  static transform({
    time,
    timeZone,
  }: TimePickerResult): TimePickerTransformedResult {
    return {
      type: "time",
      time: new Date(`1970-01-01T${time}:00Z`),
      timeZone,
    };
  }

  static match<
    TContext extends grammy.Context & WebAppDataFlavor,
    TTimePickerContext extends TContext & TimePickerContext
  >(
    filter: (ctx: TTimePickerContext) => MaybePromise<boolean> = () => true
  ): (ctx: TContext) => MaybePromise<boolean> {
    const matchComponent = matchWebAppData<
      TContext,
      TimePickerResult,
      TimePickerTransformedResult
    >((ctx) => ctx.webAppDataRaw.type === "time", {
      transform: this.transform,
    });

    return (ctx) =>
      Promise.resolve(matchComponent(ctx)).then((matched) =>
        matched ? filter(ctx as TTimePickerContext) : false
      );
  }
}
