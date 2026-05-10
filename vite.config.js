import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa' // Import this

export default defineConfig({
  plugins: [
    react(),
                            tailwindcss(),
                            VitePWA({
                              registerType: 'autoUpdate',
                              includeAssets: ['favicon.svg'],
                              manifest: {
                                name: 'JIM Pro',
                                short_name: 'JIM',
                                description: 'Trade management for solo tradies',
                                theme_color: '#ffffff',
                                background_color: '#0f172a',
                                display: 'standalone',
                                orientation: 'portrait',
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
