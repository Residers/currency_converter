// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/test-utils", "@nuxt/eslint", "@nuxt/icon", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      currencyApiKey: process.env.NUXT_CURRENCY_API_KEY,
      openexchangeratesApiKey:
        process.env.NUXT_CURRENCY_API_KEY_OPENEXCHANGERATES,
      currencyApiUrl: process.env.NUXT_CURRENCY_API_URL,
      openexchangeratesApiUrl: process.env.NUXT_CURRENCY_API_URL,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },
})
