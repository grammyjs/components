import { useWebApp, useWebAppViewport } from 'vue-tg';

// fix invalid viewport height on first load in tdesktop
export function useTdesktopViewportFix(additionalOffset = 0) {
  const { isPlatform } = useWebApp();
  const { viewportHeight } = useWebAppViewport();

  const offset =
    isPlatform('tdesktop') && viewportHeight.value == window.innerHeight
      ? `${additionalOffset + 16}px`
      : `${additionalOffset}px`;

  return {
    offset,
  };
}
