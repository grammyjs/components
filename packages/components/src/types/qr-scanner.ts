export type QrScannerConfig = {
  /**
   * Root URL of Web Components App.
   *
   * @format url
   * @default "https://grammy-components.pages.dev"
   */
  baseUrl?: string;

  /**
   * URL path to Web Component.
   *
   * @default "qr-scanner"
   */
  path?: string;
};

export type QrScannerProps = {
  /**
   * Two-letter ISO 639-1 language code, used for interface localization.
   * If not specified, the user's browser language will be used.
   */
  language?: string;

  /**
   * URL to send the result to.
   * If not specified, the result will be sent using [Telegram.WebApp.sendData](https://core.telegram.org/bots/webapps#initializing-web-apps).
   *
   * @format url
   */
  callbackUrl?: string;

  /**
   * The text to be displayed under the 'Scan QR' heading, 0-64 characters.
   */
  hintText?: string;
};

export type QrScannerResult = {
  type: "qr-scanner";
  /**
   * Scan result in text format.
   *
   * @example "https://en.wikipedia.org"
   */
  value: string;
};
