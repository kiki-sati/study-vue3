import { Notify } from 'quasar';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (err) => {
    if (err instanceof Error) {
      Notify.create({
        message: err.message,
        type: 'negative',
      });
    }
  });
});
