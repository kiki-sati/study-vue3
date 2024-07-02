export default defineEventHandler((event) => {
  deleteCookie(event, '__user');
  return {
    user: null,
  };
});
