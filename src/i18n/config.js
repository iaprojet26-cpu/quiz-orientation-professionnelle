import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import des fichiers de traduction
import frTranslation from '../locales/fr/translation.json'
import enTranslation from '../locales/en/translation.json'
import arTranslation from '../locales/ar/translation.json'

// Configuration des ressources de traduction
const resources = {
  fr: {
    translation: frTranslation
  },
  en: {
    translation: enTranslation
  },
  ar: {
    translation: arTranslation
  }
}

// Configuration i18next
i18n
  // Détection automatique de la langue du navigateur
  .use(LanguageDetector)
  // Passe l'instance i18n à react-i18next
  .use(initReactI18next)
  // Initialise i18next
  .init({
    resources,
    // Langue par défaut (fallback)
    fallbackLng: 'fr',
    // Langues supportées
    supportedLngs: ['fr', 'en', 'ar'],
    // Détection automatique depuis :
    // 1. localStorage (si déjà sauvegardé)
    // 2. Paramètres du navigateur
    // 3. Fallback sur 'fr'
    detection: {
      // Ordre de détection
      order: ['localStorage', 'navigator'],
      // Clé dans localStorage
      lookupLocalStorage: 'i18nextLng',
      // Cache la langue choisie
      caches: ['localStorage']
    },
    // Options de debug (désactivé en production)
    debug: false,
    // Interpolation pour les variables dans les traductions
    interpolation: {
      escapeValue: false // React échappe déjà les valeurs
    },
    // Direction du texte (LTR par défaut, RTL pour l'arabe sera géré dans le composant)
    react: {
      useSuspense: false
    }
  })

// Fonction pour appliquer la direction RTL/LTR selon la langue
export const applyTextDirection = (language) => {
  const htmlElement = document.documentElement
  
  if (language === 'ar') {
    htmlElement.setAttribute('dir', 'rtl')
    htmlElement.setAttribute('lang', 'ar')
    htmlElement.classList.add('rtl')
  } else {
    htmlElement.setAttribute('dir', 'ltr')
    htmlElement.setAttribute('lang', language)
    htmlElement.classList.remove('rtl')
  }
}

// Appliquer la direction au chargement initial
applyTextDirection(i18n.language || 'fr')

// Écouter les changements de langue pour appliquer la direction
i18n.on('languageChanged', (lng) => {
  applyTextDirection(lng)
})

export default i18n

