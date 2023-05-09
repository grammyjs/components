import { Context } from "./deps/grammy.ts";
import { z } from "./deps/zod.ts";
import { parse } from "./deps/devalue.ts";
import type { ComponentFlavor, WebAppData } from "./context.ts";

export function createWebAppComponent<TResult>(resultSchema: z.AnyZodObject) {
  abstract class WebAppComponent {
    static validate(result: Record<string, unknown>): TResult {
      return resultSchema.parse(result) as TResult;
    }

    static parse(data: string): TResult {
      return this.validate(parse(data));
    }

    static match<C extends Context & ComponentFlavor>() {
      return (ctx: C): ctx is C & Required<ComponentFlavor<TResult>> => {
        if (
          //@ts-expect-error internal property
          typeof ctx.componentDataRaw !== "object" &&
          typeof ctx.msg?.web_app_data?.data !== "undefined"
        ) {
          try {
            //@ts-expect-error internal property
            ctx.componentDataRaw = parse(ctx.msg?.web_app_data?.data);
          } catch {
            return false;
          }
        }

        //@ts-expect-error internal property
        const { success, data } = resultSchema.safeParse(ctx.componentDataRaw);
        if (!success) {
          return false;
        }

        ctx.componentData = data as WebAppData;
        return true;
      };
    }
  }
  return WebAppComponent;
}
