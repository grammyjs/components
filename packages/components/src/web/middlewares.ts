import { grammy } from "../deps.deno.ts";
import { ColorPicker } from "./components/color-picker.ts";
import { DatePicker } from "./components/date-picker.ts";
import { QrScanner } from "./components/qr-scanner.ts";
import { TimePicker } from "./components/time-picker.ts";
import { WebAppDataFlavor } from "./context.ts";

export const transformWebAppData =
  (): grammy.MiddlewareFn<grammy.Context & WebAppDataFlavor> => (ctx, next) => {
    const webAppData = ctx.message?.web_app_data?.data;

    if (
      typeof webAppData !== "undefined" &&
      typeof ctx.webAppDataRaw === "undefined"
    ) {
      try {
        const data = JSON.parse(webAppData);

        if (typeof data.type !== "string") {
          return next();
        }

        ctx.webAppDataRaw = data;

        // Keep in sync with components.
        switch (ctx.webAppDataRaw?.type) {
          case "color":
            ctx.webAppData = ColorPicker.transform(data);
            break;
          case "date":
            ctx.webAppData = DatePicker.transform(data);
            break;
          case "qr":
            ctx.webAppData = QrScanner.transform(data);
            break;
          case "time":
            ctx.webAppData = TimePicker.transform(data);
            break;

          default:
            ctx.webAppData = data;
        }
      } catch (_err) {}
    }

    return next();
  };
