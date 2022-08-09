import { Bot, Context as DefaultContext, InlineKeyboard, Keyboard, session, SessionFlavor } from "grammy";
import {
  WebAppDataFlavor,
  ColorPicker,
  QrScanner,
  DatePicker,
  TimePicker,
  transformWebAppData,
} from "grammy-components";
import { createWebhook, getWebhookEndpoint, getWebhookResults } from "./utils.js";

const formatWebAppData = (ctx: Context) => {
  const webAppData =
    "<pre>\n" + JSON.stringify(ctx.webAppData!, null, 2) + "</pre>";
  // const webAppDataRaw =
  //   "<pre>\n" + JSON.stringify(ctx.webAppDataRaw!, null, 2) + "</pre>";

  return `ctx.webAppData:${webAppData}`;
};

// Flavor the context type to include web apps data.
type Context = DefaultContext & SessionFlavor<{ webhookToken: string}> & WebAppDataFlavor;

const bot = new Bot<Context>(process.env.BOT_TOKEN as string);

bot.use(session({ initial: () => ({}) }));
bot.use(transformWebAppData());

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

  if (typeof ctx.session.webhookToken === 'undefined') {
    ctx.session.webhookToken = await createWebhook()
  }
  const token = ctx.session.webhookToken;

  const inlineKeyboard = new InlineKeyboard();
  const config = {
    callback: getWebhookEndpoint(token),
  };

  inlineKeyboard.url("Results »", getWebhookResults(token)).row();
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
