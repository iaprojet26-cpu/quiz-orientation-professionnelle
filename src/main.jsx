import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './i18n/config' // Initialise i18next - DOIT être synchrone
import './index.css'
import { initGA } from './utils/analytics' // Google Analytics
import { initMonetag } from './utils/monetag' // Monetag

// Initialiser Google Analytics avec délai (après le rendu complet)
if (document.readyState === 'complete') {
  setTimeout(() => initGA(), 3000)
} else {
  window.addEventListener('load', () => {
    setTimeout(() => initGA(), 3000)
  })
}

// Initialiser Monetag avec délai encore plus long (uniquement si propriétaire vérifié)
if (document.readyState === 'complete') {
  setTimeout(() => initMonetag(), 5000)
} else {
  window.addEventListener('load', () => {
    setTimeout(() => initMonetag(), 5000)
  })
}

// Attendre que le CSS soit chargé avant de rendre
const root = ReactDOM.createRoot(document.getElementById('root'))

// Marquer le root comme chargé une fois que React est monté
const renderApp = () => {
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
  
  // Marquer comme chargé pour afficher le contenu
  requestAnimationFrame(() => {
    document.getElementById('root').classList.add('loaded')
  })
}

// Attendre que le DOM soit prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp)
} else {
  renderApp()
}

