export default defineNuxtConfig({
  compatibilityDate: '2024-11-28',
  devtools: { enabled: true },
  ssr: false,

  devServer: { 
    port: 5123,
  },

  srcDir: 'src',

  vite: {
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      strictPort: true,
    },
  },
  shadcn: {
    prefix: '',
    componentDir: 'src/components/ui',
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },
  css: [
    '~/assets/css/geist_font.css',
  ],
  components: [
    {
      path: '~/components/ui',
      extensions: ['vue']
    }
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
  ],
});