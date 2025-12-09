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
 * Optimisé pour ne pas bloquer le rendu (délai de 1 seconde)
 */
export const initMonetag = () => {
  if (!isOwnerVerified()) {
    console.log('Monetag: Désactivé (propriétaire non vérifié ou configuration manquante)')
    return
  }

  // Délai de 1 seconde pour éviter le blocage du rendu initial
  setTimeout(() => {
    try {
      // Enregistrer le service worker (non bloquant)
      if ('serviceWorker' in navigator) {
        // Utiliser requestIdleCallback si disponible, sinon setTimeout
        const registerSW = () => {
          navigator.serviceWorker
            .register('/sw.js')
            .then((registration) => {
              console.log('Monetag: Service Worker enregistré avec succès', registration.scope)
            })
            .catch((error) => {
              console.error('Monetag: Erreur enregistrement Service Worker', error)
            })
        }
        
        if ('requestIdleCallback' in window) {
          requestIdleCallback(registerSW, { timeout: 2000 })
        } else {
          setTimeout(registerSW, 1000)
        }
      }

      // Charger le script Monetag en bas de page (non bloquant)
      const script = document.createElement('script')
      script.src = `https://s.monetag.net/s/${MONETAG_SITE_ID}.js`
      script.async = true
      script.defer = true
      script.onerror = () => {
        console.error('Monetag: Erreur chargement script')
      }
      
      // Ajouter en bas du body plutôt que dans le head pour ne pas bloquer
      if (document.body) {
        document.body.appendChild(script)
      } else {
        // Si body n'est pas encore disponible, attendre
        document.addEventListener('DOMContentLoaded', () => {
          document.body.appendChild(script)
        })
      }

      console.log('Monetag: Initialisé avec succès (délai appliqué)')
    } catch (error) {
      console.error('Monetag: Erreur initialisation', error)
    }
  }, 1000) // Délai de 1 seconde avant initialisation
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

