import { useEffect, useState } from 'react'

/**
 * Composant Image Optimisé avec lazy-loading et support WebP
 * @param {string} src - Source de l'image (chemin relatif ou URL)
 * @param {string} alt - Texte alternatif
 * @param {string} className - Classes CSS
 * @param {object} style - Styles inline
 * @param {boolean} lazy - Activer le lazy-loading (défaut: true)
 */
function OptimizedImage({ 
  src, 
  alt = '', 
  className = '', 
  style = {},
  lazy = true,
  fallbackSrc = '',
  onError: externalOnError,
  onLoad: externalOnLoad,
  ...props 
}) {
  const [activeSrc, setActiveSrc] = useState(src)
  const [triedOriginal, setTriedOriginal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setActiveSrc(src)
    setTriedOriginal(false)
    setIsLoaded(false)
  }, [src])

  // Générer le chemin WebP si possible
  const getWebPSrc = (originalSrc) => {
    if (!originalSrc) return null
    // Si c'est déjà une URL externe, on ne peut pas la convertir
    if (originalSrc.startsWith('http://') || originalSrc.startsWith('https://')) {
      return null
    }
    // Si c'est un emoji ou un symbole, on ne fait rien
    if (originalSrc.length < 10) return null
    
    // Remplacer l'extension par .webp
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp')
    return webpSrc
  }

  const webpSrc = getWebPSrc(activeSrc)
  const finalSrc = triedOriginal ? activeSrc : (webpSrc || activeSrc)

  const handleError = (e) => {
    // 1) Si WebP échoue, essayer l'image originale
    if (!triedOriginal && webpSrc) {
      setTriedOriginal(true)
      return
    }

    // 2) Si l'original échoue, essayer un fallback explicite
    if (fallbackSrc && activeSrc !== fallbackSrc) {
      setActiveSrc(fallbackSrc)
      setTriedOriginal(true)
      return
    }

    // 3) Dernier recours: laisser visible (éviter bloc vide)
    setIsLoaded(true)
    console.warn('Image failed to load:', activeSrc)
    if (typeof externalOnError === 'function') externalOnError(e)
  }

  const handleLoad = (e) => {
    setIsLoaded(true)
    if (typeof externalOnLoad === 'function') externalOnLoad(e)
  }

  return (
    <picture>
      {/* Source WebP si disponible */}
      {webpSrc && (
        <source
          srcSet={webpSrc}
          type="image/webp"
          loading={lazy ? 'lazy' : 'eager'}
        />
      )}
      {/* Image de fallback */}
      <img
        src={finalSrc}
        alt={alt || 'Image'}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-100'} transition-opacity duration-300`}
        style={{
          ...style,
          width: style?.width || '100%',
          height: style?.height || 'auto',
          objectFit: style?.objectFit || 'cover'
        }}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        fetchpriority={lazy ? 'low' : 'high'}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </picture>
  )
}

export default OptimizedImage

