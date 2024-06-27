export default defineNuxtRouteMiddleware((to) => {
  console.log('global middleware : ', to.path);
});
