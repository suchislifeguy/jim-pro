import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa' // Import this

export default defineConfig({
  plugins: [
    react(),
                            tailwindcss(),
                            VitePWA({
                              registerType: 'prompt', // Forces user to click "Reload"
                              includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
                              manifest: {
                                name: 'JIM Pro',
                                short_name: 'JIM',
                                description: 'Trade management for solo tradies',
                                theme_color: '#ffffff',
                                icons: [
                                  {
                                    src: 'pwa-192x192.png',
                                    sizes: '192x192',
                                    type: 'image/png'
                                  },
                                  {
                                    src: 'pwa-512x512.png',
                                    sizes: '512x512',
                                    type: 'image/png'
                                  }
                                ]
                              },
                              workbox: {
                                // This ensures the service worker is rebuilt on every change
                                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
                              }
                            })
  ],
})
