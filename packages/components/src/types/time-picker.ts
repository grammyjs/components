export type TimePickerConfig = {
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
   * @default "time-picker"
   */
  path?: string;
};

export type TimePickerProps = {
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
   * Props controls the main button, which is displayed at the bottom of the Web App in the Telegram interface.
   */
  sendButton?: {
    /**
     * The text to be displayed before time is selected.
     * If not specified, "Pick a time" (or equivalent in another language) will be used.
     */
    hintText: string;
    /**
     * The text to be displayed after time is selected.
     * If not specified, "Send \"{time}\"" (or equivalent in another language) will be used.
     */
    submitText: string;
  };
};

export type TimePickerResult = {
  type: "time-picker";
  /**
   * Time in "YYYY-MM-DDTHH:mm:ss.sssZ" format.
   *
   * @format date-time
   */
  time: Date;
  /**
   * Time zone in IANA Time Zone Database format.
   * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   *
   * @example "Europe/Kyiv"
   */
  timezone: string;
};
