import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t, i18n } = useTranslation()
  const language = i18n.language || 'fr'
  const currentYear = new Date().getFullYear()

  const content = {
    fr: {
      about: "À Propos",
      blog: "Blog",
      contact: "Contact",
      legal: "Mentions Légales",
      privacy: "Politique de Confidentialité",
      copyright: `© ${currentYear} quizorientation. Tous droits réservés.`
    },
    en: {
      about: "About",
      blog: "Blog",
      contact: "Contact",
      legal: "Legal Notice",
      privacy: "Privacy Policy",
      copyright: `© ${currentYear} quizorientation. All rights reserved.`
    },
    ar: {
      about: "من نحن",
      blog: "المدونة",
      contact: "اتصل بنا",
      legal: "الإشعار القانوني",
      privacy: "سياسة الخصوصية",
      copyright: `© ${currentYear} quizorientation. جميع الحقوق محفوظة.`
    }
  }

  const pageContent = content[language] || content.fr

  return (
    <footer className="bg-gray-800 text-white mt-16" role="contentinfo">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Colonne 1 : Navigation */}
          <nav aria-label="Navigation principale">
            <h3 className="text-lg font-bold mb-4">{language === 'fr' ? 'Navigation' : language === 'en' ? 'Navigation' : 'التنقل'}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                >
                  {language === 'fr' ? 'Accueil' : language === 'en' ? 'Home' : 'الرئيسية'}
                </Link>
              </li>
              <li>
                <Link 
                  to="/top-metiers-futur" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                >
                  {language === 'fr' ? 'Top Métiers' : language === 'en' ? 'Top Careers' : 'أفضل المهن'}
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                >
                  {pageContent.blog}
                </Link>
              </li>
              <li>
                <Link 
                  to="/a-propos" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                >
                  {pageContent.about}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                >
                  {pageContent.contact}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Colonne 2 : Informations Légales */}
          <nav aria-label="Informations légales">
            <h3 className="text-lg font-bold mb-4">{language === 'fr' ? 'Informations Légales' : language === 'en' ? 'Legal Information' : 'المعلومات القانونية'}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/mentions-legales" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                >
                  {pageContent.legal}
                </Link>
              </li>
              <li>
                <Link 
                  to="/politique-confidentialite" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                >
                  {pageContent.privacy}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Colonne 3 : Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">{pageContent.contact}</h3>
            <p className="text-gray-300 mb-2">
              <a 
                href="mailto:contact@quizorientation.online" 
                className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                aria-label="Envoyer un email à contact@quizorientation.online"
              >
                contact@quizorientation.online
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {pageContent.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

