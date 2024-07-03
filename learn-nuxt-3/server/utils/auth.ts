import type { H3Event } from 'h3';

export function getUserFromEvent(event: H3Event) {
  const config = useRuntimeConfig();
  const userJsonString = getCookie(event, config.authCookieName as string);

  console.log('userJsonString: ', userJsonString);

  if (!userJsonString) {
    return null;
  }

  return JSON.parse(userJsonString);
}
