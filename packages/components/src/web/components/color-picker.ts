import { grammy } from "../../deps.deno.ts";
import { WebAppComponent } from "../component.ts";
import { BASE_URL } from "../config.ts";
import { WebAppDataFlavor } from "../context.ts";

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

  static match<C extends grammy.Context & WebAppDataFlavor>(
    filter: (ctx: C & ColorPicker.Context) => boolean = () => true,
  ) {
    return (ctx: C): ctx is C & ColorPicker.Context =>
      ctx.webAppDataRaw?.type === "color" &&
      ctx.webAppData?.type === "color" &&
      filter(ctx as C & ColorPicker.Context);
  }
}
