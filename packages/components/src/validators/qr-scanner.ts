// Generated by `deno task generate:validators`
import { z } from "../deps/zod.ts";

export const qrScannerConfigSchema = z.object({
  baseUrl: z.string().url().optional().default(
    "https://grammy-components.pages.dev",
  ),
  path: z.string().optional().default("qr-scanner"),
});

export const qrScannerPropsSchema = z.object({
  language: z.string().optional(),
  callbackUrl: z.string().url().optional(),
  hintText: z.string().optional(),
});

export const qrScannerResultSchema = z.object({
  type: z.literal("qr-scanner"),
  value: z.string(),
});
