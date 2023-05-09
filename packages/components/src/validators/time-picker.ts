// Generated by `deno task generate:validators`
import { z } from "../deps/zod.ts";

export const timePickerConfigSchema = z.object({
  baseUrl: z.string().url().optional().default(
    "https://grammy-components.pages.dev",
  ),
  path: z.string().optional().default("time-picker"),
});

export const timePickerPropsSchema = z.object({
  language: z.string().optional(),
  callbackUrl: z.string().url().optional(),
  sendButton: z.object({
    hintText: z.string(),
    submitText: z.string(),
  }).optional(),
});

export const timePickerResultSchema = z.object({
  type: z.literal("time-picker"),
  time: z.date(),
  timezone: z.string(),
});
