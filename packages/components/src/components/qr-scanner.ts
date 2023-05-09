import { createWebAppComponent } from "../component.ts";
import {
  qrScannerConfigSchema as configSchema,
  qrScannerPropsSchema as propsSchema,
  qrScannerResultSchema as resultSchema,
} from "../validators/qr-scanner.ts";
import {
  QrScannerConfig,
  QrScannerProps,
  QrScannerResult,
} from "../types/qr-scanner.ts";
import { buildWebAppUrl } from "../utils.ts";

// deno-lint-ignore no-namespace
export namespace QrScanner {
  export type Props = QrScannerProps;
  export type Result = QrScannerResult;
}

export class QrScanner extends createWebAppComponent<QrScannerResult>(
  resultSchema,
) {
  #props: QrScannerProps;
  #config: Required<QrScannerConfig>;

  constructor(options?: QrScannerProps & { config?: QrScannerConfig }) {
    super();
    this.#props = propsSchema.parse(options ?? {});
    this.#config = configSchema.parse(options?.config ?? {});
  }

  setLanguage(value: QrScannerProps["language"]) {
    this.#props.language = propsSchema.shape.language.parse(value);
    return this;
  }

  setCallbackUrl(value: QrScannerProps["callbackUrl"]) {
    this.#props.callbackUrl = propsSchema.shape.callbackUrl.parse(value);
    return this;
  }

  setHintText(value: QrScannerProps["hintText"]) {
    this.#props.hintText = propsSchema.shape.hintText.parse(value);
    return this;
  }

  build() {
    return buildWebAppUrl(this.#config.baseUrl, this.#config.path, this.#props);
  }
}
