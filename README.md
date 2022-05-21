<h1 align="center">🪄 Components for grammY</h1>

> 🚧 Under development. Please do not use in production yet

Set of useful components for grammY.

[Documentation »](./packages/components/README.md)

## Install

### Node

// TODO

### Deno

// TODO

## Usage

// TODO: add imports after publishing

```ts
// Extend bot context type
export type MyContext = Context & WebAppDataFlavor;

// Create a bot, specify the extended context
const bot = new Bot<MyContext>(""); // <-- put your authentication token between the ""

bot.command("start", async (ctx) => {
  const keyboard = new Keyboard();

  // Sending the component to the user
  keyboard.webApp("Click to pick", new TimePicker().build());

  await ctx.reply("Hey, pick a time!", {
    reply_markup: keyboard,
  });
});

// Handle time selected by a user
bot.filter(TimePicker.match(), (ctx) => {
  const { time } = ctx.webAppData;

  return ctx.reply(`You chose ${time.getUTCHours()}:${time.getUTCMinutes()}`);
});

bot.start();
```

## Component List

- [Color Picker](./packages/components/README.md#color-picker) let select a color.
- [Date Picker](./packages/components/README.md#date-picker) let select a date.
- [QR Scanner](./packages/components/README.md#qr-scanner) let scan a QR.
- [Time Picker](./packages/components/README.md#time-picker) let select a time.

## Repository contents

- Packages
  - [`components`](./packages/components/) - Package that provides all the
    components
    - `web` - Module that creates buttons of web components
    - `keyboard` - Module that implements keyboard components
- Apps
  - [`web-components-app`](./apps/web-components-app/) - Web application that
    implements web components
  - [`playground-bot`](./apps/playground-bot/) - Demo bot that uses all
    components
