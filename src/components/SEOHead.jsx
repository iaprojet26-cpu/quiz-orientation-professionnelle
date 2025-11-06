import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getHomepageSEO, getResultPageSEO, getOGTags, getTwitterTags, getHomepageSchema, getResultPageSchema } from '../services/seoService'

/**
 * Composant pour gérer les meta tags SEO dynamiques
 */
function SEOHead({ page = 'homepage', profileName = '' }) {
  const { i18n } = useTranslation()
  const language = i18n.language || 'fr'

  useEffect(() => {
    // Obtenir le contenu SEO selon la page et la langue
    let seoData
    let schemaData

    if (page === 'result' && profileName) {
      seoData = getResultPageSEO(language, profileName)
      schemaData = getResultPageSchema(language, profileName)
    } else {
      seoData = getHomepageSEO(language)
      schemaData = getHomepageSchema(language)
    }

    const ogTags = getOGTags(language)
    const twitterTags = getTwitterTags(language)

    // Mettre à jour le titre
    document.title = seoData.title

    // Mettre à jour la meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', seoData.description)

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

    // Mettre à jour la langue du document
    document.documentElement.setAttribute('lang', language)
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl')
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
    }

  }, [language, page, profileName])

  return null // Ce composant ne rend rien visuellement
}

export default SEOHead

