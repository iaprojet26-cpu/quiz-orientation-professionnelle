import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'

function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  const langPrefix = language === 'fr' ? '' : `/${language}`

  const menuItems = {
    fr: [
      { path: '/', label: 'Accueil' },
      { path: '/career-paths', label: 'Parcours' },
      { path: '/opportunities', label: 'Opportunites' },
      { path: '/study-in-morocco', label: 'Etudier au Maroc' },
      { path: '/career-guides', label: 'Guides' },
      { path: '/free-tools', label: 'Outils' },
      { path: '/blog', label: 'Blog' },
      { path: '/a-propos', label: 'À Propos' },
      { path: '/contact', label: 'Contact' }
    ],
    en: [
      { path: '/', label: 'Home' },
      { path: '/career-paths', label: 'Career Paths' },
      { path: '/opportunities', label: 'Opportunities' },
      { path: '/study-in-morocco', label: 'Study in Morocco' },
      { path: '/career-guides', label: 'Guides' },
      { path: '/free-tools', label: 'Tools' },
      { path: '/blog', label: 'Blog' },
      { path: '/a-propos', label: 'About' },
      { path: '/contact', label: 'Contact' }
    ],
    ar: [
      { path: '/', label: 'الرئيسية' },
      { path: '/career-paths', label: 'المسارات المهنية' },
      { path: '/opportunities', label: 'الفرص' },
      { path: '/study-in-morocco', label: 'الدراسة في المغرب' },
      { path: '/career-guides', label: 'الأدلة المهنية' },
      { path: '/free-tools', label: 'أدوات' },
      { path: '/blog', label: 'المدونة' },
      { path: '/a-propos', label: 'من نحن' },
      { path: '/contact', label: 'اتصل بنا' }
    ]
  }

  const items = menuItems[language] || menuItems.fr
  const getLocalizedPath = (path) => (language === 'fr' ? path : `${langPrefix}${path === '/' ? '' : path}`)
  const isActive = (path) => {
    const localizedPath = getLocalizedPath(path)
    return location.pathname === localizedPath || (path === '/' && location.pathname === `/${language}`)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <a href="#main-content" className="skip-to-main">
        Aller au contenu principal
      </a>
      <nav className="container mx-auto px-4 py-4" aria-label="Navigation principale">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to={language === 'fr' ? '/' : `/${language}`}
            className="text-2xl font-bold text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
            aria-label="QuizOrientation - Retour à l'accueil"
          >
            QuizOrientation
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {items.map((item) => (
              <Link
                key={item.path}
                to={getLocalizedPath(item.path)}
                className={`px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  isActive(item.path)
                    ? 'text-primary-600 font-semibold bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSelector />
          </div>

          {/* Bouton Menu Mobile */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden mt-4 pb-4 border-t border-gray-200" role="menu">
            <div className="flex flex-col gap-2 pt-4">
              {items.map((item) => (
                <Link
                  key={item.path}
                  to={getLocalizedPath(item.path)}
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                  className={`px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    isActive(item.path)
                      ? 'text-primary-600 font-semibold bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

