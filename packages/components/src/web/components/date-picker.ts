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

export type DatePickerProps = WebAppComponentProps;

export type DatePickerConfig = WebAppComponentConfig;

export type DatePickerResult = WebAppComponentResult<"date"> & {
  date: string;
};

export type DatePickerTransformedResult = WebAppComponentResult<"date"> & {
  date: Date;
};

export type DatePickerCallbackResult = WebAppComponentCallbackResult<
  "date",
  DatePickerResult
>;

export type DatePickerContext = Required<
  WebAppDataFlavor<DatePickerResult, DatePickerTransformedResult>
>;

export class DatePicker<
  TProps extends DatePickerProps,
  TConfig extends WebAppComponentConfig
> extends WebAppComponent<TProps, TConfig> {
  constructor(props?: TProps, config?: TConfig) {
    const defaultConfig: WebAppComponentConfig = {
      baseUrl: BASE_URL,
      path: "date-picker",
    };

    super(props, Object.assign(defaultConfig, config));
  }

  static transform({ date }: DatePickerResult): DatePickerTransformedResult {
    return {
      type: "date",
      date: new Date(date),
    };
  }

  static match<
    TContext extends grammy.Context & WebAppDataFlavor,
    TDatePickerContext extends TContext & DatePickerContext
  >(
    filter: (ctx: TDatePickerContext) => MaybePromise<boolean> = () => true
  ): (ctx: TContext) => MaybePromise<boolean> {
    const matchComponent = matchWebAppData<
      TContext,
      DatePickerResult,
      DatePickerTransformedResult
    >((ctx) => ctx.webAppDataRaw.type === "date", {
      transform: this.transform,
    });

    return (ctx) =>
      Promise.resolve(matchComponent(ctx)).then((matched) =>
        matched ? filter(ctx as TDatePickerContext) : false
      );
  }
}
