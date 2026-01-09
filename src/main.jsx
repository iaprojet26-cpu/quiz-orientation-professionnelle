import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './i18n/config' // Initialise i18next - DOIT être synchrone
import './index.css'
import { initGA } from './utils/analytics' // Google Analytics

// Initialiser Google Analytics avec délai (après le rendu complet) - non bloquant
const initAnalytics = () => {
  if (document.readyState === 'complete') {
    // Utiliser requestIdleCallback si disponible
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setTimeout(() => initGA(), 3000)
      }, { timeout: 5000 })
    } else {
      setTimeout(() => initGA(), 3000)
    }
  } else {
    window.addEventListener('load', () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setTimeout(() => initGA(), 3000)
        }, { timeout: 5000 })
      } else {
        setTimeout(() => initGA(), 3000)
      }
    })
  }
}

// Initialiser les scripts tiers de manière non bloquante
initAnalytics()

// Rendre immédiatement sans attendre - plus rapide et évite les blocages
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Pas besoin de marquer loaded - le CSS inline gère déjà l'affichage

