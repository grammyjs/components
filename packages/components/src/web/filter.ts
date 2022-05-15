import { grammy } from "../deps.deno.ts";
import { WebAppData, WebAppRawData, WebAppDataFlavor } from "./context.ts";
import type { MaybePromise } from "./types.ts";

export type MatchWebAppDataOptions<TRawData, TData> = {
  transform?: (data: TRawData) => TData;
};

export const matchWebAppData = <
  TContext extends grammy.Context & WebAppDataFlavor,
  TRawData extends WebAppRawData,
  TData extends WebAppData,
  TOptions extends MatchWebAppDataOptions<
    TRawData,
    TData
  > = MatchWebAppDataOptions<TRawData, TData>
>(
  filter: (
    ctx: TContext & Required<Pick<WebAppDataFlavor, "webAppDataRaw">>
  ) => MaybePromise<boolean>,
  options?: TOptions
): ((ctx: TContext) => MaybePromise<boolean>) => {
  const defaultOptions: Required<MatchWebAppDataOptions<any, any>> = {
    transform: (data) => data,
  };

  const { transform } = Object.assign({}, defaultOptions, options);

  return async (ctx) => {
    const webAppData = ctx.message?.web_app_data?.data;

    if (typeof webAppData === "undefined") {
      return false;
    }

    if (typeof ctx.webAppDataRaw === "undefined") {
      let data: any;
      try {
        data = JSON.parse(webAppData);
      } catch (e) {
        return false;
      }

      ctx.webAppDataRaw = data;
    }

    return Promise.resolve(
      filter(
        ctx as TContext & Required<Pick<WebAppDataFlavor, "webAppDataRaw">>
      )
    ).then((result) => {
      if (result === true) {
        ctx.webAppData = Object.assign({}, transform(ctx.webAppDataRaw));
      }

      return result;
    });
  };
};
