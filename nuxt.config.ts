// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/test-utils", "@nuxt/eslint", "@nuxt/icon"],
  css: ["~/assets/css/main.css"],

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
