// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt"],
  vite: {
    server: {
      hmr: {
        port: 3000,
      },
    },
  },
});
