<h1 align="center">🪄 Components for grammY</h1>

Set of useful components for grammY.

[Component List »](#component-list)

## Install

### Node

// TODO

### Deno

// TODO

## Documentation

- [Sending components](#sending-components)
- [Configure components](#configure-components)
- [Handle component results](#handle-component-results)

### Sending components

> Notice that you must use a component from [the list](#component-list) instead
> of `Component`.

#### Custom Keyboards

Each component has a `build()` method that returns a Web App URL:

<!-- deno-fmt-ignore -->
```ts
const keyboard = new Keyboard();

// Create a component builder
const component = new Component({
  callback,
});

keyboard.webApp("Open", component.build());

ctx.reply("Component", {
  reply_markup: keyboard,
});
```

#### Inline Keyboards

Web Apps opened via an inline keyboard cannot send data directly to Telegram, so
you must set the callback prop with an URL where the data will be sent:

<!-- deno-fmt-ignore -->
```ts
const inlineKeyboard = new InlineKeyboard();

// A result will be sent to this URL.
const callback = "https://example.org/api";

// Create a component builder
const component = new Component({
  callback,
});

inlineKeyboard.webApp("Open", component.build());

ctx.reply("Component", {
  reply_markup: inlineKeyboard,
});
```

#### Menu Button

Web Apps opened via a menu button cannot send data directly to Telegram, so you
must set the callback prop with an URL where the data will be sent:

<!-- deno-fmt-ignore -->
```ts
// A result will be sent to this URL.
const callback = "https://example.org/api";

// Create a component builder
const component = new Component({
  callback,
});

ctx.setChatMenuButton({
  menu_button: {
    text: "Open",
    web_app: {
      url: component.build(),
    },
    type: "web_app",
  },
});
```

### Configure components

> Notice that you must use a component from [the list](#component-list) instead
> of `Component`.

There are three ways to configure components. You can pass a props object to
`Component` class constructor:

<!-- deno-fmt-ignore -->
```ts
new Component({
  language: "en",
  callback: "https://example.org/api",
});
```

Or you can use the corresponding prop setter method of `Component` to set props:

<!-- deno-fmt-ignore -->
```ts
new Component()
  .setLanguage("en")
  .setCallback("https://example.org/api");
```

Or you can use `setProp` method of `Component` to set props:

<!-- deno-fmt-ignore -->
```ts
new Component()
  .setProp("language", "en")
  .setProp("callback", "https://example.org/api");
```

### Handling component results

> Notice that you must use a component from [the list](#component-list) instead
> of `Component`.

First you need to install the data transformer middleware before you can match
component data on your bot.

<!-- deno-fmt-ignore -->
```ts
import { transformWebAppData } from "@grammyjs/components";

bot.use(transformWebAppData());
```

#### Custom Keyboards

<!-- deno-fmt-ignore -->
```ts
bot.filter(
  Component.match(), // match component data
  (ctx) => {
    // called when the component data is matched
    // ctx.webAppDataRaw <- untransformed (raw) component data available here
    // ctx.webAppData <- transformed component data available here
  }
);
```

By default, only the type prop is matched. If you want to filter on other
component data props as well, pass a filter function to `match()` method of a
component:

<!-- deno-fmt-ignore -->
```ts
bot.filter(
  Component.match((ctx) => {
    // filter by the value prop
    return ctx.webAppData.value == 1337;
  }),
  (ctx) => {
    // called when the component data is matched
  }
);
```

#### Inline Keyboards and Menu Button

After the user clicks the send result button, a component sends an HTTPS POST
request to the specified callback URL containing the JSON-serialized result:

<!-- deno-fmt-ignore -->
```ts
{
  initData: string;
  initDataUnsafe: WebAppInitData;
  data: ComponentResult;
}
```

## Component List

- [Color Picker](#color-picker) allows to select a color.
- [Date Picker](#date-picker) allows to select a date.
- [QR Scanner](#qr-scanner) allows to scan a QR.
- [Time Picker](#time-picker) allows to select a time.

### Color Picker

Allows to select a color.

#### Usage

<!-- deno-fmt-ignore -->
```ts
import { ColorPicker } from "@grammyjs/components";
```

#### Props

| **Field**      | **Type** | **Required** | **Description**                                                                                                                                                                                |
| -------------- | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| language       | string   | Optional     | Two-letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code, used for interface localization. <br> If not specified, the user's browser language will be used. |
| callback       | string   | Optional     | URL to send the result to. <br> If not specified, the result will be sent using [Telegram.WebApp.sendData](https://core.telegram.org/bots/webapps#initializing-web-apps).                      |
| sendButtonText | string   | Optional     | Text for the button to send the result. <br> If not specified, "Send" (or equivalent in another language) will be used.                                                                        |

#### Result

<!-- deno-fmt-ignore -->
```ts
{
  type: "color";

  // Alpha channel
  alpha: number;

  // Color in hexadecimal format
  hex: string;

  // Color in hexadecimal format with an alpha channel
  hexa: string;

  // Color in HSL format with an alpha channel
  hsla: {
    h: number;
    s: number;
    l: number;
    a: number;
  }

  // Color in HSV format with an alpha channel
  hsva: {
    h: number;
    s: number;
    v: number;
    a: number;
  }

  hue: number;

  // Color in RGB format with an alpha channel
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  }
}
```

### Date Picker

Allows to select a date.

#### Usage

<!-- deno-fmt-ignore -->
```ts
import { DatePicker } from "@grammyjs/components";
```

#### Props

| Field    | Type   | Required | Description                                                                                                                                                                                    |
| -------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| language | string | Optional | Two-letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code, used for interface localization. <br> If not specified, the user's browser language will be used. |
| callback | string | Optional | URL to send the result to. <br> If not specified, the result will be sent using [Telegram.WebApp.sendData](https://core.telegram.org/bots/webapps#initializing-web-apps).                      |

#### Result

<!-- deno-fmt-ignore -->
```ts
{
  type: "date";
  date: string; // e.g. "2022-02-22"
}
```

#### Transformed Result

<!-- deno-fmt-ignore -->
```ts
{
  type: "date";
  date: Date;
}
```

### QR Scanner

Allows to scan a QR.

#### Usage

<!-- deno-fmt-ignore -->
```ts
import { QrScanner } from "@grammyjs/components";
```

#### Props

| **Field**      | **Type** | **Required** | **Description**                                                                                                                                                                                |
| -------------- | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| language       | string   | Optional     | Two-letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code, used for interface localization. <br> If not specified, the user's browser language will be used. |
| callback       | string   | Optional     | URL to send the result to. <br> If not specified, the result will be sent using [Telegram.WebApp.sendData](https://core.telegram.org/bots/webapps#initializing-web-apps).                      |
| sendButtonText | string   | Optional     | Text for the button to send the result. <br> If not specified, "Send" (or equivalent in another language) will be used.                                                                        |

#### Result

<!-- deno-fmt-ignore -->
```ts
{
  type: "qr";
  value: string; // e.g. "https://example.org", "some text"
}
```

### Time Picker

Allows to select a time.

#### Usage

<!-- deno-fmt-ignore -->
```ts
import { TimePicker } from "@grammyjs/components";
```

#### Props

| Field    | Type   | Required | Description                                                                                                                                                                                    |
| -------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| language | string | Optional | Two-letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code, used for interface localization. <br> If not specified, the user's browser language will be used. |
| callback | string | Optional | URL to send the result to. <br> If not specified, the result will be sent using [Telegram.WebApp.sendData](https://core.telegram.org/bots/webapps#initializing-web-apps).                      |

#### Result

<!-- deno-fmt-ignore -->
```ts
{
  type: "time";
  time: string; // e.g. "13:37"
  timeZone: string; // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
}
```

#### Transformed Result

<!-- deno-fmt-ignore -->
```ts
{
  type: "time";
  utcTime: Date; // time in UTC format
  time: Date;
  timeZone: string;
}
```
