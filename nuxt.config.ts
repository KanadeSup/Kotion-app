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
});