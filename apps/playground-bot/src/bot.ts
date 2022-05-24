import { Bot, Context, InlineKeyboard, Keyboard } from "grammy";
import {
  WebAppDataFlavor,
  ColorPicker,
  QrScanner,
  DatePicker,
  TimePicker,
} from "grammy-components";
import { default as fetch } from "node-fetch";

const createWebhook = async () => {
  const request = await fetch("https://webhook.site/token", {
    method: "post",
  });

  const { uuid: token } = (await request.json()) as { uuid: string };

  await fetch(`https://webhook.site/token/${token}/cors/toggle`, {
    method: "put",
  });

  return {
    token,
  };
};

const formatWebAppData = (ctx: MyContext) => {
  const webAppData =
    "<pre>\n" + JSON.stringify(ctx.webAppData!, null, 2) + "</pre>";
  // const webAppDataRaw =
  //   "<pre>\n" + JSON.stringify(ctx.webAppDataRaw!, null, 2) + "</pre>";

  return `ctx.webAppData:${webAppData}`;
};

// Flavor the context type to include web apps data.
type MyContext = Context & WebAppDataFlavor;

const bot = new Bot<MyContext>(""); // <-- put your authentication token between the ""

bot.command("start", async (ctx) => {
  const keyboard = new Keyboard();

  keyboard.webApp("Date Picker", new DatePicker().build());
  keyboard.webApp("Time Picker", new TimePicker().build()).row();
  keyboard.webApp("Color Picker", new ColorPicker().build()).row();
  keyboard.webApp("QR Scanner", new QrScanner().build()).row();

  await ctx.reply("Welcome!", {
    reply_markup: {
      keyboard: keyboard.build(),
      resize_keyboard: true,
    },
  });

  const inlineKeyboard = new InlineKeyboard();
  const { token } = await createWebhook();
  const config = {
    callback: `https://webhook.site/${token}`,
  };

  inlineKeyboard.url("Results »", `https://webhook.site/#!/${token}`).row();
  inlineKeyboard.webApp("Date Picker", new DatePicker(config).build());
  inlineKeyboard.webApp("Time Picker", new TimePicker(config).build()).row();
  inlineKeyboard.webApp("Color Picker", new ColorPicker(config).build()).row();
  inlineKeyboard.webApp("QR Scanner", new QrScanner(config).build()).row();

  await ctx.reply(`Inline keyboard`, {
    reply_markup: inlineKeyboard,
  });
});

bot.filter(ColorPicker.match(), (ctx) => {
  const result = `Data from Color Picker \n\n${formatWebAppData(ctx)}`;

  return ctx.reply(result, {
    parse_mode: "HTML",
  });
});

bot.filter(DatePicker.match(), (ctx) => {
  const result = `Data from Date Picker \n\n${formatWebAppData(ctx)}`;

  return ctx.reply(result, {
    parse_mode: "HTML",
  });
});

bot.filter(TimePicker.match(), (ctx) => {
  const result = `Data from Time Picker \n\n${formatWebAppData(ctx)}`;

  return ctx.reply(result, {
    parse_mode: "HTML",
  });
});

bot.filter(QrScanner.match(), (ctx) => {
  const result = `Data from QR Scanner \n\n${formatWebAppData(ctx)}`;

  return ctx.reply(result, {
    parse_mode: "HTML",
  });
});

bot.start();
