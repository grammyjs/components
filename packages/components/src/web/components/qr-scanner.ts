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

export type QrScannerProps = WebAppComponentProps & {
  sendButtonText?: string;
};

export type QrScannerConfig = WebAppComponentConfig;

export type QrScannerResult = WebAppComponentResult<"qr"> & {
  value: string;
};

export type QrScannerTransformedResult = QrScannerResult;

export type QrScannerCallbackResult = WebAppComponentCallbackResult<
  "qr",
  QrScannerResult
>;

export type QrScannerContext = Required<
  WebAppDataFlavor<QrScannerResult, QrScannerTransformedResult>
>;

export class QrScanner<
  TProps extends QrScannerProps,
  TConfig extends WebAppComponentConfig
> extends WebAppComponent<TProps, TConfig> {
  constructor(props?: TProps, config?: TConfig) {
    const defaultConfig: WebAppComponentConfig = {
      baseUrl: BASE_URL,
      path: "qr-scanner",
    };

    super(props, Object.assign(defaultConfig, config));
  }

  setSendButtonText(value: QrScannerProps["sendButtonText"]) {
    return this.setProp("sendButtonText", value);
  }

  static transform(data: QrScannerResult): QrScannerTransformedResult {
    return data;
  }

  static match<
    TContext extends grammy.Context & WebAppDataFlavor,
    TQrScannerContext extends TContext & QrScannerContext
  >(
    filter: (ctx: TQrScannerContext) => MaybePromise<boolean> = () => true
  ): (ctx: TContext) => MaybePromise<boolean> {
    const matchComponent = matchWebAppData<
      TContext,
      QrScannerResult,
      QrScannerTransformedResult
    >((ctx) => ctx.webAppDataRaw.type === "qr", {
      transform: this.transform,
    });

    return (ctx) =>
      Promise.resolve(matchComponent(ctx)).then((matched) =>
        matched ? filter(ctx as TQrScannerContext) : false
      );
  }
}
