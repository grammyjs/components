import { grammy } from "../../deps.deno.ts";
import { WebAppComponent } from "../component.ts";
import { BASE_URL } from "../config.ts";
import { WebAppDataFlavor } from "../context.ts";

// deno-lint-ignore no-namespace
export namespace QrScanner {
  export type Props = WebAppComponent.Props & {
    sendButtonText?: string;
  };

  export type Config = WebAppComponent.Config;

  export type Result = WebAppComponent.Result<"qr"> & {
    value: string;
  };

  export type TransformedResult = Result;

  export type CallbackResult = WebAppComponent.CallbackResult<"qr", Result>;

  export type Context = Required<WebAppDataFlavor<Result, TransformedResult>>;
}

export class QrScanner extends WebAppComponent<
  QrScanner.Props,
  QrScanner.Config
> {
  constructor(props?: QrScanner.Props, config?: QrScanner.Config) {
    const defaultConfig: WebAppComponent.Config = {
      baseUrl: BASE_URL,
      path: "qr-scanner",
    };

    super(props, Object.assign(defaultConfig, config));
  }

  setSendButtonText(value: QrScanner.Props["sendButtonText"]) {
    return this.setProp("sendButtonText", value);
  }

  static transform(data: QrScanner.Result): QrScanner.TransformedResult {
    return data;
  }

  static match<C extends grammy.Context & WebAppDataFlavor>(
    filter: (ctx: C & QrScanner.Context) => boolean = () => true,
  ) {
    return (ctx: C): ctx is C & QrScanner.Context =>
      ctx.webAppDataRaw?.type === "qr" &&
      ctx.webAppData?.type === "qr" &&
      filter(ctx as C & QrScanner.Context);
  }
}
