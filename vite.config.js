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
                              includeAssets: ['favicon.svg'],
                              manifest: {
                                name: 'JIM Pro',
                                short_name: 'JIM',
                                description: 'Trade management for solo tradies',
                                theme_color: '#ffffff',
                                icons: [
                                  {
                                    src: 'icon-192.png',
                                    sizes: '192x192',
                                    type: 'image/png'
                                  },
                                  {
                                    src: 'icon-512.png',
                                    sizes: '512x512',
                                    type: 'image/png'
                                  },
                                  {
                                    src: 'icon-512.png',
                                    sizes: '512x512',
                                    type: 'image/png',
                                    purpose: 'any maskable'
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
