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

export type ColorPickerProps = WebAppComponentProps & {
  sendButtonText?: string;
};

export type ColorPickerConfig = WebAppComponentConfig;

export type ColorPickerResult = WebAppComponentResult<"color"> & {
  alpha: number;
  hex: string;
  hexa: string;
  hsla: {
    h: number;
    s: number;
    l: number;
    a: number;
  };
  hsva: {
    h: number;
    s: number;
    v: number;
    a: number;
  };
  hue: number;
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
};

export type ColorPickerTransformedResult = ColorPickerResult;

export type ColorPickerCallbackResult = WebAppComponentCallbackResult<
  "color",
  ColorPickerResult
>;

export type ColorPickerContext = Required<
  WebAppDataFlavor<ColorPickerResult, ColorPickerTransformedResult>
>;

export class ColorPicker<
  TProps extends ColorPickerProps,
  TConfig extends WebAppComponentConfig
> extends WebAppComponent<TProps, TConfig> {
  constructor(props?: TProps, config?: TConfig) {
    const defaultConfig: WebAppComponentConfig = {
      baseUrl: BASE_URL,
      path: "color-picker",
    };

    super(props, Object.assign(defaultConfig, config));
  }

  static transform(data: ColorPickerResult): ColorPickerTransformedResult {
    return data;
  }

  static match<
    TContext extends grammy.Context & WebAppDataFlavor,
    TColorPickerContext extends TContext & ColorPickerContext
  >(
    filter: (ctx: TColorPickerContext) => MaybePromise<boolean> = () => true
  ): (ctx: TContext) => MaybePromise<boolean> {
    const matchComponent = matchWebAppData<
      TContext,
      ColorPickerResult,
      ColorPickerTransformedResult
    >((ctx) => ctx.webAppDataRaw.type === "color", {
      transform: this.transform,
    });

    return (ctx) =>
      Promise.resolve(matchComponent(ctx)).then((matched) =>
        matched ? filter(ctx as TColorPickerContext) : false
      );
  }
}
