import { grammy } from "../../deps.deno.ts";
import { WebAppComponent } from "../component.ts";
import { BASE_URL } from "../config.ts";
import { WebAppDataFlavor } from "../context.ts";
import { matchWebAppData } from "../filter.ts";
import { MaybePromise } from "../types.ts";

// deno-lint-ignore no-namespace
export namespace ColorPicker {
  export type Props = WebAppComponent.Props & {
    sendButtonText?: string;
  };

  export type Config = WebAppComponent.Config;

  export type Result = WebAppComponent.Result<"color"> & {
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

  export type TransformedResult = Result;

  export type CallbackResult = WebAppComponent.CallbackResult<"color", Result>;

  export type Context = Required<WebAppDataFlavor<Result, TransformedResult>>;
}

export class ColorPicker extends WebAppComponent<
  ColorPicker.Props,
  ColorPicker.Config
> {
  constructor(props?: ColorPicker.Props, config?: ColorPicker.Config) {
    const defaultConfig: WebAppComponent.Config = {
      baseUrl: BASE_URL,
      path: "color-picker",
    };

    super(props, Object.assign(defaultConfig, config));
  }

  setSendButtonText(value: ColorPicker.Props["sendButtonText"]) {
    return this.setProp("sendButtonText", value);
  }

  static transform(data: ColorPicker.Result): ColorPicker.TransformedResult {
    return data;
  }

  static match<
    TContext extends grammy.Context & WebAppDataFlavor,
    TColorPickerContext extends TContext & ColorPicker.Context
  >(
    filter: (ctx: TColorPickerContext) => MaybePromise<boolean> = () => true
  ): (ctx: TContext) => MaybePromise<boolean> {
    const matchComponent = matchWebAppData<
      TContext,
      ColorPicker.Result,
      ColorPicker.TransformedResult
    >((ctx) => ctx.webAppDataRaw.type === "color", {
      transform: this.transform,
    });

    return (ctx) =>
      Promise.resolve(matchComponent(ctx)).then((matched) =>
        matched ? filter(ctx as TColorPickerContext) : false
      );
  }
}
