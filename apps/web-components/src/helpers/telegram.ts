import { watch } from 'vue';
import {
  useWebApp,
  useWebAppMainButton,
  useWebAppPopup,
  useWebAppSendData,
} from 'vue-tg';
import { stringify } from 'devalue';

const { canSendData } = useWebApp();
const { showMainButtonProgress, hideMainButtonProgress } =
  useWebAppMainButton();
const { showAlert } = useWebAppPopup();

export async function sendComponentResult<D>(data: D, callbackUrl?: string) {
  const { execute, executeHttp, error, isLoading } = useWebAppSendData(data, {
    serialize: stringify,
  });

  watch(error, () => showAlert(error.value));
  watch(isLoading, (value) => {
    if (value === true) {
      showMainButtonProgress();
    } else {
      hideMainButtonProgress();
    }
  });

  if (canSendData && typeof callbackUrl !== 'string') {
    execute();
  } else if (typeof callbackUrl === 'string') {
    await executeHttp(callbackUrl);
  } else {
    showAlert('Error: Callback URL is not set');
  }
}
