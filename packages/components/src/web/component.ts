import { InlineKeyboardButton, KeyboardButton, url } from "../deps.deno.ts";
import { WebAppInitData } from "./telegram-types.ts";

const { URLSearchParams } = url;

// deno-lint-ignore no-namespace
export namespace WebAppComponent {
  export type Props = {
    language?: string;
    callback?: string;
  };

  export type Config = {
    baseUrl?: string;
    path?: string;
  };

  export type Result<T extends string> = {
    type: T;
  };

  export type CallbackResult<T extends string, D extends Result<T>> = {
    initData: string;
    initDataUnsafe: WebAppInitData;
    data: D;
  };
}

export class WebAppComponent<
  TProps extends WebAppComponent.Props = WebAppComponent.Props,
  TConfig extends WebAppComponent.Config = WebAppComponent.Config,
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
    value: TProps[TKey],
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

  button(text: string): KeyboardButton {
    return {
      text,
      web_app: {
        url: this.build(),
      },
    };
  }

  inlineButton(text: string): InlineKeyboardButton {
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
