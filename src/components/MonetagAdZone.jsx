import { useEffect, useRef } from 'react'

/**
 * Composant pour afficher une zone publicitaire Monetag
 * @param {string} zoneId - L'ID de la zone publicitaire Monetag
 * @param {string} className - Classes CSS optionnelles pour le conteneur
 * @param {string} position - Position de la zone (pour le tracking)
 */
function MonetagAdZone({ zoneId, className = '', position = 'default' }) {
  const containerRef = useRef(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    // Vérifier que la zone est définie
    if (!zoneId) {
      console.warn('MonetagAdZone: zoneId manquant')
      return
    }

    // Vérifier que le conteneur existe
    if (!containerRef.current) {
      return
    }

    try {
      // Créer et injecter le script Monetag selon la méthode officielle
      const script = document.createElement('script')
      script.type = 'text/javascript'
      
      // Utiliser une fonction immédiatement invoquée pour charger le script Monetag
      script.textContent = `
        (function(s){
          s.dataset.zone='${zoneId}';
          s.src='https://groleegni.net/vignette.min.js';
        })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));
      `
      
      // Ajouter le script au conteneur
      containerRef.current.appendChild(script)

      console.log(`Monetag: Zone ${zoneId} chargée (position: ${position})`)
    } catch (error) {
      console.error(`Monetag: Erreur chargement zone ${zoneId}`, error)
    }

    // Cleanup
    return () => {
      if (containerRef.current) {
        // Nettoyer le script si nécessaire
        const scripts = containerRef.current.querySelectorAll('script')
        scripts.forEach(s => s.remove())
      }
    }
  }, [zoneId, position])

  if (!zoneId) {
    return null
  }

  return (
    <div 
      ref={containerRef}
      className={`monetag-ad-zone monetag-zone-${zoneId} ${className}`}
      data-zone={zoneId}
      data-position={position}
      style={{ minHeight: '100px' }} // Hauteur minimale pour éviter le layout shift
    />
  )
}

export default MonetagAdZone

