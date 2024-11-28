export default defineNuxtConfig({
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
    componentDir: './src/components/shadcn'
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
  ],
});