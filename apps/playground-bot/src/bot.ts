import { Bot, Keyboard } from "grammy";
import {
  ColorPicker,
  QrScanner,
  DatePicker,
  TimePicker,
} from "grammy-components";

const bot = new Bot(""); // <-- put your authentication token between the ""

bot.command("start", (ctx) => {
  const keyboard = new Keyboard();

  keyboard.webApp("Date Picker", new DatePicker().build());
  keyboard.webApp("Time Picker", new TimePicker().build()).row();
  keyboard.webApp("Color Picker", new ColorPicker().build()).row();
  keyboard.webApp("QR Scanner", new QrScanner().build()).row();

  return ctx.reply("Welcome!", {
    reply_markup: {
      keyboard: keyboard.build(),
      resize_keyboard: true,
    },
  });
});

bot.on("message").on(":web_app_data", (ctx) => {
  const data = JSON.stringify(
    JSON.parse(ctx.message.web_app_data.data),
    null,
    2
  );

  return ctx.reply("```\n" + data + "```", {
    parse_mode: "MarkdownV2",
  });
});

bot.start();
