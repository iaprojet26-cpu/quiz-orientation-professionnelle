import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'

function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const language = i18n.language || 'fr'

  const menuItems = {
    fr: [
      { path: '/', label: 'Accueil' },
      { path: '/blog', label: 'Blog' },
      { path: '/a-propos', label: 'À Propos' },
      { path: '/contact', label: 'Contact' }
    ],
    en: [
      { path: '/', label: 'Home' },
      { path: '/blog', label: 'Blog' },
      { path: '/a-propos', label: 'About' },
      { path: '/contact', label: 'Contact' }
    ],
    ar: [
      { path: '/', label: 'الرئيسية' },
      { path: '/blog', label: 'المدونة' },
      { path: '/a-propos', label: 'من نحن' },
      { path: '/contact', label: 'اتصل بنا' }
    ]
  }

  const items = menuItems[language] || menuItems.fr
  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            QuizOrientation
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-primary-600 font-semibold bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSelector />
          </div>

          {/* Bouton Menu Mobile */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-primary-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-2 pt-4">
              {items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'text-primary-600 font-semibold bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
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

