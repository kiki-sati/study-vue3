export default defineNuxtPlugin(async () => {
  const { fetchUser } = useAuthStore();
  await fetchUser();
});
