export default defineEventHandler((event) => {
  const user = event.context.user;

  if (!user) {
    return { user: null };
  }

  return { user };
});
