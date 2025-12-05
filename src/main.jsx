import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './i18n/config' // Initialise i18next
import './index.css'
import { initGA } from './utils/analytics' // Google Analytics
import { initMonetag } from './utils/monetag' // Monetag

// Initialiser Google Analytics
initGA()

// Initialiser Monetag (uniquement si propriétaire vérifié)
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

