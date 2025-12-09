import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './i18n/config' // Initialise i18next
import './index.css'
import { initGA } from './utils/analytics' // Google Analytics
import { initMonetag } from './utils/monetag' // Monetag

// Initialiser Google Analytics (non bloquant)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initGA()
  })
} else {
  // Utiliser requestIdleCallback si disponible pour ne pas bloquer le rendu
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => initGA(), { timeout: 2000 })
  } else {
    setTimeout(() => initGA(), 100)
  }
}

// Initialiser Monetag avec délai (uniquement si propriétaire vérifié)
// Déjà géré dans initMonetag avec setTimeout
initMonetag()

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

