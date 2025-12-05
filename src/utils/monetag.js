/**
 * Service de monétisation Monetag
 * Activation conditionnelle avec vérification du propriétaire
 */

const MONETAG_ENABLED = import.meta.env.VITE_MONETAG_ENABLED === 'true'
const MONETAG_SITE_ID = import.meta.env.VITE_MONETAG_SITE_ID
const MONETAG_OWNER_VERIFICATION = import.meta.env.VITE_MONETAG_OWNER_VERIFICATION

/**
 * Vérifie que le propriétaire est autorisé à activer Monetag
 */
export const isOwnerVerified = () => {
  // Vérification multiple pour sécurité
  if (!MONETAG_ENABLED) {
    return false
  }

  if (!MONETAG_SITE_ID) {
    console.warn('Monetag: VITE_MONETAG_SITE_ID manquant')
    return false
  }

  if (!MONETAG_OWNER_VERIFICATION) {
    console.warn('Monetag: VITE_MONETAG_OWNER_VERIFICATION manquant')
    return false
  }

  // Vérification supplémentaire : le site ID doit correspondre au domaine
  const currentDomain = window.location.hostname
  const allowedDomains = ['quizorientation.online', 'localhost', '127.0.0.1']
  
  if (!allowedDomains.includes(currentDomain) && process.env.NODE_ENV === 'production') {
    console.warn('Monetag: Domaine non autorisé')
    return false
  }

  return true
}

/**
 * Initialise Monetag si le propriétaire est vérifié
 */
export const initMonetag = () => {
  if (!isOwnerVerified()) {
    console.log('Monetag: Désactivé (propriétaire non vérifié ou configuration manquante)')
    return
  }

  try {
    // Enregistrer le service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Monetag: Service Worker enregistré avec succès', registration.scope)
        })
        .catch((error) => {
          console.error('Monetag: Erreur enregistrement Service Worker', error)
        })
    }

    // Charger le script Monetag
    const script = document.createElement('script')
    script.src = `https://s.monetag.net/s/${MONETAG_SITE_ID}.js`
    script.async = true
    script.onerror = () => {
      console.error('Monetag: Erreur chargement script')
    }
    document.head.appendChild(script)

    console.log('Monetag: Initialisé avec succès')
  } catch (error) {
    console.error('Monetag: Erreur initialisation', error)
  }
}

/**
 * Désactive Monetag (pour tests ou en cas de problème)
 */
export const disableMonetag = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        if (registration.scope.includes('sw.js')) {
          registration.unregister()
          console.log('Monetag: Service Worker désenregistré')
        }
      })
    })
  }
}

