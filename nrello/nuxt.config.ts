// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  runtimeConfig: {
    auth: {
      secret: process.env.AUTH_SECRET,
      origin: process.env.AUTH_ORIGIN,
    },
    public: {
      pixabayApiKey: process.env.PIXABAY_API_KEY,
    },
  },

  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-server-utils",
    "@sidebase/nuxt-auth",
    "@nuxt/image",
  ],

  ui: {},
  nuxtServerUtils: {
    mongodbUri: process.env.MONGODB_URI,
  },
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
    },
  },
});
