import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Charger i18n de manière asynchrone après le rendu initial
let i18nLoaded = false
const loadI18n = async () => {
  if (!i18nLoaded) {
    i18nLoaded = true
    await import('./i18n/config')
  }
}

// Initialiser Google Analytics avec délai encore plus long (après le rendu complet)
const initGA = () => {
  import('./utils/analytics').then(({ initGA: init }) => {
    // Attendre que la page soit complètement chargée
    if (document.readyState === 'complete') {
      setTimeout(() => init(), 3000) // 3 secondes après le chargement complet
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => init(), 3000)
      })
    }
  })
}

// Initialiser Monetag avec délai encore plus long
const initMonetag = () => {
  import('./utils/monetag').then(({ initMonetag: init }) => {
    // Attendre 5 secondes après le chargement complet
    if (document.readyState === 'complete') {
      setTimeout(() => init(), 5000)
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => init(), 5000)
      })
    }
  })
}

// Charger i18n immédiatement mais de manière asynchrone
loadI18n()

// Initialiser les scripts tiers après le rendu
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    initGA()
    initMonetag()
  }, { timeout: 5000 })
} else {
  setTimeout(() => {
    initGA()
    initMonetag()
  }, 2000)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

