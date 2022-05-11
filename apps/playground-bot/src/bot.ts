import { Bot, Keyboard } from "grammy";
import { QrScanner } from "grammy-components";

const bot = new Bot(""); // <-- put your authentication token between the ""

bot.command("start", (ctx) => ctx.reply("Welcome!"));

bot.command("setcommands", async (ctx) => {
  await ctx.api.setMyCommands([
    {
      command: "qr",
      description: "QR component",
    },
  ]);
  await ctx.reply("Commands updated");
});

bot
  .on("message")
  .on(":web_app_data", (ctx) => ctx.reply(ctx.message.web_app_data.data));

bot.command("qr", (ctx) => {
  ctx.reply("QR component", {
    reply_markup: new Keyboard().webApp("Scan QR", new QrScanner().build()),
  });

  // OR

  /*
  ctx.reply("QR component", {
      reply_markup: new Keyboard().add(
          new QrScanner().buildKeyboardButton("Scan QR")
      ),
  });
  */

  // OR

  /*
  ctx.reply("QR component", {
      reply_markup: new Keyboard()
          .add({
              text: 'Scan QR',
              web_app: new QrScanner()
          }),
  });
  */
});

bot.start();
