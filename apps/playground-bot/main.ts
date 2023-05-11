import {
  Bot,
  Context as DefaultContext,
  Keyboard,
} from "https://lib.deno.dev/x/grammy@1.x/mod.ts";
import {
  ColorPicker,
  ComponentFlavor,
  DatePicker,
  QrScanner,
  TimePicker,
} from "../../packages/components/src/mod.ts";

// Extend the context type.
type Context = DefaultContext & ComponentFlavor;

const bot = new Bot<Context>(Deno.env.get("BOT_TOKEN") as string);

const baseUrl =
  Deno.env.get("COMPONENTS_ROOT") ?? "https://grammy-components.pages.dev";

function formatJsonData(data: unknown) {
  return "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
}

bot.command("start", async (ctx) => {
  const keyboard = new Keyboard();

  keyboard
    .webApp(
      "Date Picker",
      new DatePicker({
        config: {
          baseUrl,
        },
      }).build()
    )
    .webApp(
      "Time Picker",
      new TimePicker({
        config: {
          baseUrl,
        },
      }).build()
    )
    .row();

  keyboard
    .webApp(
      "Color Picker",
      new ColorPicker({
        config: {
          baseUrl,
        },
      }).build()
    )
    .row();

  keyboard
    .webApp(
      "QR Scanner",
      new QrScanner({
        config: {
          baseUrl,
        },
      }).build()
    )
    .row();

  await ctx.reply("Welcome!", {
    reply_markup: {
      keyboard: keyboard.build(),
      resize_keyboard: true,
    },
  });
});

bot.filter(ColorPicker.match(), (ctx) => {
  const result = [
    "Data from Color Picker",
    "",
    "ctx.componentData:",
    formatJsonData(ctx.componentData),
  ].join("\n");

  return ctx.reply(result, {
    parse_mode: "HTML",
  });
});

bot.filter(DatePicker.match(), (ctx) => {
  const result = [
    "Data from Date Picker",
    "",
    "ctx.componentData:",
    formatJsonData(ctx.componentData),
  ].join("\n");

  return ctx.reply(result, {
    parse_mode: "HTML",
  });
});

bot.filter(TimePicker.match(), (ctx) => {
  const result = [
    "Data from Time Picker",
    "",
    "ctx.componentData:",
    formatJsonData(ctx.componentData),
  ].join("\n");

  return ctx.reply(result, {
    parse_mode: "HTML",
  });
});

bot.filter(QrScanner.match(), (ctx) => {
  const result = [
    "Data from QR Scanner",
    "",
    "ctx.componentData:",
    formatJsonData(ctx.componentData),
  ].join("\n");

  return ctx.reply(result, {
    parse_mode: "HTML",
  });
});

bot.on(":web_app_data", (ctx) => {
  const result = [
    "Unhandled Web App Data",
    "",
    "ctx.msg.web_app_data.data:",
    formatJsonData(ctx.msg.web_app_data.data),
  ].join("\n");

  return ctx.reply(result, {
    parse_mode: "HTML",
  });
});

bot.start();
