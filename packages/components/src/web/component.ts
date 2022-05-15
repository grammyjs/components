import { types, url } from "../deps.deno.ts";
import { WebAppInitData } from "./telegram-types.ts";

const { URLSearchParams } = url;

export interface WebAppComponentProps {
  lang?: string;
  callback?: string;
}

export interface WebAppComponentConfig {
  baseUrl?: string;
  path?: string;
}

export interface WebAppComponentResult<T extends string> {
  type: T;
}

export interface WebAppComponentCallbackResult<
  T extends string,
  D extends WebAppComponentResult<T>
> {
  initData: string;
  initDataUnsafe: WebAppInitData;
  data: D;
}

export class WebAppComponent<
  TProps extends WebAppComponentProps = WebAppComponentProps,
  TConfig extends WebAppComponentConfig = WebAppComponentConfig
> {
  #props: TProps;
  #config: TConfig;
  url: string;

  constructor(props?: TProps, config?: TConfig) {
    this.#props = Object.assign({}, props);
    this.#config = Object.assign({}, config);
    this.url = this.build();
  }

  get props(): TProps {
    return this.#props;
  }

  get config(): TConfig {
    return this.#config;
  }

  clone(): this {
    const { constructor } = Object.getPrototypeOf(this);

    return new constructor(this.props, this.config);
  }

  setProperty<TKey extends keyof TProps = keyof TProps>(
    key: TKey,
    value: TProps[TKey]
  ): this {
    this.#props[key] = value;
    this.url = this.build();

    return this;
  }

  buildKeyboardButton(text: string): types.KeyboardButton {
    return {
      text,
      web_app: {
        url: this.build(),
      },
    };
  }

  buildInlineKeyboardButton(text: string): types.InlineKeyboardButton {
    if (typeof this.#props.callback !== "string") {
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

    for (const [key, value] of Object.entries(this.#props)) {
      params.set(key, value.toString());
    }

    return `${this.#config.baseUrl}/${this.#config.path}?${params}`;
  }
}
