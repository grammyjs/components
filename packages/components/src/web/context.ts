import {
  ColorPickerResult,
  ColorPickerTransformedResult,
} from "./components/color-picker.ts";
import {
  DatePickerResult,
  DatePickerTransformedResult,
} from "./components/date-picker.ts";
import {
  QrScannerResult,
  QrScannerTransformedResult,
} from "./components/qr-scanner.ts";
import {
  TimePickerResult,
  TimePickerTransformedResult,
} from "./components/time-picker.ts";

export type WebAppRawData =
  | QrScannerResult
  | DatePickerResult
  | TimePickerResult
  | ColorPickerResult;

export type WebAppData =
  | QrScannerTransformedResult
  | DatePickerTransformedResult
  | TimePickerTransformedResult
  | ColorPickerTransformedResult;

export interface WebAppDataFlavor<
  TRawData = WebAppRawData,
  TData = WebAppData
> {
  webAppDataRaw?: TRawData;
  webAppData?: TData;
}
