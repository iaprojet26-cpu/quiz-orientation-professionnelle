import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    // Minification automatique - esbuild plus sûr que terser
    minify: 'esbuild', // esbuild est plus rapide et plus sûr
    // Optimisation des chunks
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Ne PAS séparer React - il doit rester avec le code principal pour éviter les erreurs
          // React Router séparé (peut être chargé à la demande)
          if (id.includes('node_modules/react-router')) {
            return 'react-router'
          }
          // i18n séparé (peut être chargé à la demande)
          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
            return 'i18n'
          }
          // Supabase séparé (chargé seulement si nécessaire)
          if (id.includes('node_modules/@supabase')) {
            return 'supabase'
          }
          // Markdown séparé (chargé seulement pour les articles)
          if (id.includes('node_modules/react-markdown') || id.includes('node_modules/remark')) {
            return 'markdown'
          }
          // React et React-DOM restent dans le bundle principal
          // Autres node_modules dans vendor
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        // Optimisation des noms de fichiers
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Optimisation des assets
    assetsInlineLimit: 4096, // Inline les assets < 4KB
    cssCodeSplit: true,
    sourcemap: false, // Désactiver sourcemap en production pour réduire la taille
    // Augmenter la limite de warning pour les chunks
    chunkSizeWarningLimit: 1000
  },
  // Optimisation des dépendances
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: []
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})

