// 현재 라우트와 다음 라우트를 매개변수로 받는 내비게이션 가드
export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = storeToRefs(useAuthStore());
  if (isAuthenticated.value) {
    if (process.server) return navigateTo('/');

    return abortNavigation();
  }
});
