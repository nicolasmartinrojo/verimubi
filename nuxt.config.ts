// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    // db_file_name: process.env.NUXT_DB_FILE_NAME || "file:local.db",
    db_file_name: process.env.NUXT_DB_FILE_NAME,
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/test-utils",
    "@nuxt/image",
    "@nuxt/hints",
    "nuxt-auth-utils",
  ],
  css: ["~/assets/css/main.css"],
});
