import { types, url } from "../deps.deno.ts";
import { WebAppInitData } from "./telegram-types.ts";

const { URLSearchParams } = url;

export type WebAppComponentProps = {
  language?: string;
  callback?: string;
};

export type WebAppComponentConfig = {
  baseUrl?: string;
  path?: string;
};

export type WebAppComponentResult<T extends string> = {
  type: T;
};

export type WebAppComponentCallbackResult<
  T extends string,
  D extends WebAppComponentResult<T>
> = {
  initData: string;
  initDataUnsafe: WebAppInitData;
  data: D;
};

export class WebAppComponent<
  TProps extends WebAppComponentProps = WebAppComponentProps,
  TConfig extends WebAppComponentConfig = WebAppComponentConfig
> {
  readonly props: TProps;
  readonly config: TConfig;

  constructor(props?: TProps, config?: TConfig) {
    this.props = Object.assign({}, props);
    this.config = Object.assign({}, config);
  }

  clone(): this {
    const { constructor } = Object.getPrototypeOf(this);

    return new constructor(this.props, this.config);
  }

  setProp<TKey extends keyof TProps = keyof TProps>(
    key: TKey,
    value: TProps[TKey]
  ): this {
    this.props[key] = value;

    return this;
  }

  setLanguage(value: TProps["language"]) {
    return this.setProp("language", value);
  }

  setCallback(value: TProps["callback"]) {
    return this.setProp("callback", value);
  }

  button(text: string): types.KeyboardButton {
    return {
      text,
      web_app: {
        url: this.build(),
      },
    };
  }

  inlineButton(text: string): types.InlineKeyboardButton {
    if (typeof this.props.callback !== "string") {
      throw new Error("Callback property must be set for inline buttons");
    }

    return {
      text,
      web_app: {
        url: this.build(),
      },
    };
  }

  build(): string {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(this.props)) {
      params.set(key, value.toString());
    }

    return `${this.config.baseUrl}/${this.config.path}?${params}`;
  }
}
