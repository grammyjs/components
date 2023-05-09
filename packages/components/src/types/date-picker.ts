export type DatePickerConfig = {
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
   * @default "date-picker"
   */
  path?: string;
};

export type DatePickerProps = {
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
     * The text to be displayed before date is selected.
     * If not specified, "Pick a date" (or equivalent in another language) will be used.
     */
    hintText: string;
    /**
     * The text to be displayed after date is selected.
     * If not specified, "Send \"{date}\"" (or equivalent in another language) will be used.
     */
    submitText: string;
  };
};

export type DatePickerResult = {
  type: "date-picker";
  /**
   * Time in "YYYY-MM-DDTHH:mm:ss.sssZ" format.
   */
  date: Date;
};
