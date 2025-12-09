import { useState } from 'react'

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
  ...props 
}) {
  const [imageError, setImageError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

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

  const webpSrc = getWebPSrc(src)
  const finalSrc = imageError ? src : (webpSrc || src)

  const handleError = () => {
    // Si WebP échoue, essayer l'original
    if (webpSrc && !imageError) {
      setImageError(true)
    }
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <picture>
      {/* Source WebP si disponible */}
      {webpSrc && !imageError && (
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
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
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

