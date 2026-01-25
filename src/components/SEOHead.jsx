import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { getHomepageSEO, getResultPageSEO, getOGTags, getTwitterTags, getHomepageSchema, getResultPageSchema, getArticleSchema, getCVPageSEO, getCVPageSchema } from '../services/seoService'

/**
 * Fonction pour normaliser une URL en version canonique (sans www, avec trailing slash si nécessaire)
 */
function normalizeCanonicalUrl(url) {
  try {
    const urlObj = new URL(url)
    // Toujours utiliser la version sans www
    urlObj.hostname = urlObj.hostname.replace(/^www\./, '')
    
    // Normaliser le pathname
    let pathname = urlObj.pathname
    
    // Retirer le trailing slash sauf pour la racine
    if (pathname !== '/' && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1)
    }
    
    // Reconstruire l'URL
    return `${urlObj.protocol}//${urlObj.hostname}${pathname}${urlObj.search}${urlObj.hash}`
  } catch (e) {
    console.error('Erreur normalisation URL:', e)
    return url
  }
}

/**
 * Composant pour gérer les meta tags SEO dynamiques
 */
function SEOHead({ page = 'homepage', profileName = '', articleTitle = '', articleSlug = '', customTitle = '', customDescription = '' }) {
  const { i18n } = useTranslation()
  const location = useLocation()
  const language = i18n.language || 'fr'

  useEffect(() => {
    // Obtenir le contenu SEO selon la page et la langue
    let seoData
    let schemaData

    if (page === 'result' && profileName) {
      seoData = getResultPageSEO(language, profileName)
      schemaData = getResultPageSchema(language, profileName)
    } else if (page === 'blog-article' && articleTitle) {
      seoData = {
        title: `${articleTitle} | QuizOrientation Blog`,
        description: `Découvrez notre article : ${articleTitle}`
      }
      // Le schema Article sera généré dans BlogArticle avec getArticleSchema
      schemaData = {}
    } else if (page === 'blog') {
      seoData = {
        title: 'Blog - Conseils d\'Orientation Professionnelle | QuizOrientation',
        description: 'Découvrez nos articles sur l\'orientation professionnelle, les métiers et les carrières'
      }
      schemaData = {}
    } else if (page === 'cv') {
      seoData = getCVPageSEO(language)
      schemaData = getCVPageSchema(language)
    } else if (customTitle && customDescription) {
      // Pages personnalisées (legal, contact, etc.)
      seoData = {
        title: customTitle,
        description: customDescription
      }
      schemaData = {}
    } else {
      seoData = getHomepageSEO(language)
      schemaData = getHomepageSchema(language)
    }

    const ogTags = getOGTags(language)
    const twitterTags = getTwitterTags(language)

    // Mettre à jour le titre
    document.title = customTitle || seoData.title

    // Mettre à jour la meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', customDescription || seoData.description)

    // Mettre à jour ou créer les balises Open Graph
    const ogTagsToUpdate = [
      { property: 'og:title', content: ogTags.title },
      { property: 'og:description', content: ogTags.description },
      { property: 'og:image', content: ogTags.image },
      { property: 'og:url', content: ogTags.url },
      { property: 'og:type', content: ogTags.type },
      { property: 'og:locale', content: language === 'fr' ? 'fr_FR' : language === 'en' ? 'en_US' : 'ar_MA' }
    ]

    ogTagsToUpdate.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    })

    // Mettre à jour ou créer les balises Twitter Card
    const twitterTagsToUpdate = [
      { name: 'twitter:card', content: twitterTags.card },
      { name: 'twitter:title', content: twitterTags.title },
      { name: 'twitter:description', content: twitterTags.description },
      { name: 'twitter:image', content: twitterTags.image }
    ]

    twitterTagsToUpdate.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    })

    // Ajouter ou mettre à jour le Schema.org JSON-LD
    let schemaScript = document.querySelector('script[type="application/ld+json"]')
    if (!schemaScript) {
      schemaScript = document.createElement('script')
      schemaScript.setAttribute('type', 'application/ld+json')
      document.head.appendChild(schemaScript)
    }
    schemaScript.textContent = JSON.stringify(schemaData)

    // Construire l'URL canonical basée sur l'URL actuelle
    const baseUrl = 'https://quizorientation.online' // Toujours sans www
    let canonicalUrl = baseUrl
    
    // Normaliser la langue
    let normalizedLang = language
    if (normalizedLang.includes('-')) {
      normalizedLang = normalizedLang.split('-')[0]
    }
    if (!['fr', 'en', 'ar'].includes(normalizedLang)) {
      normalizedLang = 'fr'
    }
    
    // Construire l'URL canonical selon la page
    if (page === 'blog-article' && articleSlug) {
      // Pour les articles de blog, utiliser le slug et la langue de l'URL actuelle
      const pathSegments = location.pathname.split('/').filter(Boolean)
      const langFromPath = pathSegments[0] && ['fr', 'en', 'ar'].includes(pathSegments[0]) ? pathSegments[0] : normalizedLang
      
      if (langFromPath === 'fr') {
        canonicalUrl = `${baseUrl}/blog/${articleSlug}`
      } else {
        canonicalUrl = `${baseUrl}/${langFromPath}/blog/${articleSlug}`
      }
    } else if (page === 'blog') {
      // Page liste des articles
      const pathSegments = location.pathname.split('/').filter(Boolean)
      const langFromPath = pathSegments[0] && ['fr', 'en', 'ar'].includes(pathSegments[0]) ? pathSegments[0] : normalizedLang
      
      if (langFromPath === 'fr') {
        canonicalUrl = `${baseUrl}/blog`
      } else {
        canonicalUrl = `${baseUrl}/${langFromPath}/blog`
      }
    } else if (page === 'result' && profileName) {
      const slug = profileName.toLowerCase().replace(/\s+/g, '-')
      canonicalUrl = `${baseUrl}/${normalizedLang === 'fr' ? '' : normalizedLang + '/'}result/${slug}`
    } else if (page === 'cv') {
      canonicalUrl = `${baseUrl}/${normalizedLang === 'fr' ? '' : normalizedLang + '/'}cv`
    } else {
      // Page d'accueil ou autres pages
      const pathSegments = location.pathname.split('/').filter(Boolean)
      const langFromPath = pathSegments[0] && ['fr', 'en', 'ar'].includes(pathSegments[0]) ? pathSegments[0] : normalizedLang
      
      if (langFromPath === 'fr') {
        canonicalUrl = `${baseUrl}/`
      } else {
        canonicalUrl = `${baseUrl}/${langFromPath}/`
      }
    }
    
    // Normaliser l'URL (s'assurer qu'elle est sans www et correctement formatée)
    canonicalUrl = normalizeCanonicalUrl(canonicalUrl)
    
    // Supprimer les balises canonical existantes SAUF celle de la homepage (statique dans index.html)
    // On garde le canonical statique de la homepage pour que Google le détecte même sans JS
    const existingCanonicals = document.querySelectorAll('link[rel="canonical"]')
    existingCanonicals.forEach(link => {
      // Ne pas supprimer le canonical statique de la homepage
      const href = link.getAttribute('href')
      if (href && href === 'https://quizorientation.online/') {
        // C'est le canonical statique de la homepage, on le garde
        return
      }
      link.remove()
    })
    
    // Créer la nouvelle balise canonical
    const canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    canonicalLink.setAttribute('href', canonicalUrl)
    document.head.appendChild(canonicalLink)

    // Mettre à jour la langue du document
    document.documentElement.setAttribute('lang', language)
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl')
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
    }

  }, [language, page, profileName, articleTitle, articleSlug, customTitle, customDescription, location.pathname])

  return null // Ce composant ne rend rien visuellement
}

export default SEOHead

