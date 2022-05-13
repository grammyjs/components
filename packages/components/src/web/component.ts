import { types, url } from "../deps.deno.ts";

const {
  URLSearchParams,
} = url;

export interface WebAppComponentProps {
  lang?: string;
  callback?: string;
}

export interface WebAppComponentConfig {
  url?: string;
}

export class WebAppComponent<
  P extends WebAppComponentProps = WebAppComponentProps,
  C extends WebAppComponentConfig = WebAppComponentConfig,
> {
  #props: P;
  #config: C;
  url: string;

  constructor(props?: P, config?: C) {
    this.#props = Object.assign({}, props);
    this.#config = Object.assign({}, config);
    this.url = this.build();
  }

  get props(): P {
    return this.#props;
  }

  get config(): C {
    return this.#config;
  }

  clone(): this {
    const { constructor } = Object.getPrototypeOf(this);

    return new constructor(this.props, this.config);
  }

  setProperty<K extends keyof P = keyof P>(
    key: K,
    value: P[K],
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

    return `${this.#config.url}?${params}`;
  }
}
