import { Notify } from 'quasar';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:error', (err) => {
    if (process.client) {
      if (err instanceof Error) {
        Notify.create({
          message: err.message,
          type: 'warning',
        });
      }
    } else {
      console.log('error : ', err.message);
    }
  });
  nuxtApp.hook('vue:error', (err) => {
    if (err instanceof Error) {
      if (process.client) {
        Notify.create({
          message: err.message,
          type: 'negative',
        });
      } else {
        console.log('error : ', err.message);
      }
    }
  });
});
