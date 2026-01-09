import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true,
    host: true
  },
  build: {
    // Minification automatique - esbuild plus sûr que terser
    minify: 'esbuild', // esbuild est plus rapide et plus sûr
    // Optimisation des chunks (simple pour éviter les doublons de React)
    rollupOptions: {
      output: {
        // Laisser Rollup gérer automatiquement les chunks pour éviter les copies multiples de React
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

