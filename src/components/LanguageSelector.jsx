import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { applyTextDirection } from '../i18n/config'

/**
 * Composant LanguageSelector
 * Affiche un sélecteur de langue avec des drapeaux pour FR, EN, AR
 * Sauvegarde le choix dans localStorage et applique la direction RTL pour l'arabe
 */
function LanguageSelector() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  // Liste des langues disponibles avec leurs drapeaux
  const languages = [
    { code: 'fr', flag: '🇫🇷', name: 'Français', flagUnicode: '\u{1F1EB}\u{1F1F7}' },
    { code: 'en', flag: '🇬🇧', name: 'English', flagUnicode: '\u{1F1EC}\u{1F1E7}' },
    { code: 'ar', flag: '🇲🇦', name: 'العربية', flagUnicode: '\u{1F1F2}\u{1F1E6}' }
  ]

  /**
   * Change la langue de l'application
   * @param {string} languageCode - Code de la langue (fr, en, ar)
   */
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode)
    // Recomposer l'URL avec le préfixe de langue, en conservant le slug actuel
    const segments = location.pathname.split('/').filter(Boolean)
    // Si le premier segment est une langue, le retirer
    if (segments.length > 0 && ['fr', 'en', 'ar'].includes(segments[0])) {
      segments.shift()
    }
    const newPath = `/${languageCode}/${segments.join('/')}`.replace(/\/+$/, '') || `/${languageCode}`
    navigate(newPath === `/${languageCode}` ? `/${languageCode}/` : newPath, { replace: true })
    // La direction RTL/LTR est appliquée automatiquement via i18n.on('languageChanged')
  }

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-md border border-gray-200">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`
            flex items-center gap-1.5 px-3 py-2 rounded-md transition-all duration-200
            ${i18n.language === lang.code
              ? 'bg-primary-600 text-white shadow-md scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }
          `}
          title={lang.name}
          aria-label={`Change language to ${lang.name}`}
        >
          <span 
            className="text-2xl" 
            style={{ 
              fontSize: '1.5rem', 
              lineHeight: '1',
              display: 'inline-block',
              fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif'
            }}
            role="img"
            aria-label={lang.name}
          >
            {lang.flag}
          </span>
          <span className="font-medium text-sm">
            {lang.code.toUpperCase()}
          </span>
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector

