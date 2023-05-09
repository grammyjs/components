export type ColorPickerConfig = {
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
   * @default "color-picker"
   */
  path?: string;
};

export type ColorPickerProps = {
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
   * Controls the main button, which is displayed at the bottom of the Web App in the Telegram interface.
   */
  sendButton?: {
    /**
     * The text to be displayed before color is selected.
     * If not specified, "Pick a color" (or equivalent in another language) will be used.
     */
    hintText: string;
    /**
     * The text to be displayed after color is selected.
     * If not specified, "Send" (or equivalent in another language) will be used.
     */
    submitText: string;
  };
};

export type ColorPickerResult = {
  type: "color-picker";
  /**
   * Color in HEX format.
   *
   * @pattern ^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$
   * @example "#FFFFFF"
   */
  hex: string;
};
