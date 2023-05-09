import { stringify } from "./deps/qs.ts";

export function buildWebAppUrl(
  baseUrl: string,
  componentName: string,
  props: Record<string, unknown>
) {
  return `${baseUrl}/${componentName}?${stringify(props)}`;
}
