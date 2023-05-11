import { boot } from 'quasar/wrappers';
import VueTelegram from 'vue-tg';

export default boot(({ app }) => {
  app.use(VueTelegram);
});
