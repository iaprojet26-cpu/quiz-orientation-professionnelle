import { useTranslation } from 'react-i18next'
import { applyTextDirection } from '../i18n/config'

/**
 * Composant LanguageSelector
 * Affiche un sélecteur de langue avec des drapeaux pour FR, EN, AR
 * Sauvegarde le choix dans localStorage et applique la direction RTL pour l'arabe
 */
function LanguageSelector() {
  const { i18n } = useTranslation()

  // Liste des langues disponibles avec leurs drapeaux
  const languages = [
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'ar', flag: '🇲🇦', name: 'العربية' }
  ]

  /**
   * Change la langue de l'application
   * @param {string} languageCode - Code de la langue (fr, en, ar)
   */
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode)
    // La direction RTL/LTR est appliquée automatiquement via i18n.on('languageChanged')
  }

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-md border border-gray-200">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`
            flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-200
            ${i18n.language === lang.code
              ? 'bg-primary-600 text-white shadow-md scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }
          `}
          title={lang.name}
          aria-label={`Change language to ${lang.name}`}
        >
          <span className="text-xl">{lang.flag}</span>
          <span className="font-medium text-sm hidden sm:inline">
            {lang.code.toUpperCase()}
          </span>
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector

