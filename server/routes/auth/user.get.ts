export default defineEventHandler((event) => {
  const userJsonString = getCookie(event, '__user');

  if (!userJsonString) {
    return { user: null };
  }

  const user = JSON.parse(userJsonString);

  return { user };
});
