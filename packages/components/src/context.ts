import { ColorPicker } from "./components/color-picker.ts";
import { DatePicker } from "./components/date-picker.ts";
import { QrScanner } from "./components/qr-scanner.ts";
import { TimePicker } from "./components/time-picker.ts";

// Keep in sync with components.
export type WebAppData =
  | QrScanner.Result
  | DatePicker.Result
  | TimePicker.Result
  | ColorPicker.Result;

export interface ComponentFlavor<TData = WebAppData> {
  componentData?: TData;
}
