import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

function FreeTools() {
  const { i18n } = useTranslation()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  const langPrefix = language === 'fr' ? '' : `/${language}`

  const text = {
    fr: {
      h1: 'Outils gratuits',
      intro: 'CV builder, outils de preparation et ressources gratuites pour renforcer votre employabilite.',
      cta: 'Construire mon CV'
    },
    en: {
      h1: 'Free Tools',
      intro: 'CV builder, preparation tools and free resources to improve your employability.',
      cta: 'Build my CV'
    },
    ar: {
      h1: 'أدوات مجانية',
      intro: 'منشئ السيرة الذاتية وأدوات التحضير وموارد مجانية لتعزيز فرص التوظيف.',
      cta: 'إنشاء سيرتي الذاتية'
    }
  }[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead
        page="legal"
        customTitle={`${text.h1} | QuizOrientation`}
        customDescription="Outils gratuits pour CV, orientation et preparation carriere."
      />
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">{text.h1}</h1>
        <p className="text-gray-700 mb-8">{text.intro}</p>
        <Link to={`${langPrefix}/cv`} className="bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold">
          {text.cta}
        </Link>
      </main>
    </div>
  )
}

export default FreeTools
