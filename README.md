<h1 align="center">🪄 Components for grammY</h1>

> 🚧 Under development. Please do not use in production yet

Set of useful components for grammY.

<!-- [Documentation »](./packages/components#documentation) -->

## Installation

### Node

// TODO

### Deno

// TODO

## Example

```js
import { Bot, Keyboard } from "https://deno.land/x/grammy@v1.8.3/mod.ts";
import { QrScanner } from "https://github.com/bot-base/grammy-components/raw/main/packages/components/src/mod.ts";

const bot = new Bot(""); // <-- put your authentication token between the ""

bot
  .on("message")
  .on(":web_app_data", (ctx) => ctx.reply(ctx.message.web_app_data.data));

bot.command("start", (ctx) => {
  ctx.reply("QR component", {
    reply_markup: new Keyboard().webApp("Scan QR", new QrScanner().build()),
  });
});

bot.start();
```

## List of components

// TODO

- Keyboard components
  - ...
- Web components
  - `QrScanner` - ...

## Repository contents

- Packages
  - [`components`](./packages/components/) - Package that provides all the
    components
    - `web` - Module that creates buttons of web components
    - `keyboard` - Module that implements keyboard components
- Apps
  - [`web-components-app`](./apps/web-components-app/) - Application that
    implements web components
  - [`playground-bot`](./apps/playground-bot/) - Demo bot that uses all
    components
