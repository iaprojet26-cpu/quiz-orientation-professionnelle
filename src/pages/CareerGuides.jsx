import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'
import { getCareerGuides } from '../services/hubService'

function CareerGuides() {
  const { i18n } = useTranslation()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  const langPrefix = language === 'fr' ? '' : `/${language}`
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const text = {
    fr: {
      h1: 'Guides de carriere',
      intro:
        'Guides pratiques pour choisir une filiere, preparer un entretien, construire un CV et piloter une trajectoire professionnelle durable.',
      empty: 'Aucun guide publie pour le moment.',
      cta1: 'Voir les opportunites',
      cta2: 'Faire le quiz'
    },
    en: {
      h1: 'Career Guides',
      intro:
        'Practical guides to choose a pathway, prepare interviews, build a strong CV and manage a long-term career strategy.',
      empty: 'No published guides yet.',
      cta1: 'View opportunities',
      cta2: 'Take the quiz'
    },
    ar: {
      h1: 'أدلة المسار المهني',
      intro:
        'أدلة عملية لاختيار التخصص والتحضير للمقابلات وبناء سيرة ذاتية قوية وإدارة مسار مهني مستدام.',
      empty: 'لا توجد أدلة منشورة حاليا.',
      cta1: 'عرض الفرص',
      cta2: 'قم بالاختبار'
    }
  }[language]

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await getCareerGuides(language)
      setItems(data)
      setLoading(false)
    }
    load()
  }, [language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead
        page="legal"
        customTitle={`${text.h1} | QuizOrientation`}
        customDescription="Guides pratiques d orientation et d employabilite."
      />
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">{text.h1}</h1>
        <p className="text-gray-700 mb-8">{text.intro}</p>

        {loading ? (
          <div className="text-center py-8 text-gray-600">Chargement...</div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-gray-700">{text.empty}</div>
        ) : (
          <section className="grid md:grid-cols-2 gap-6 mb-8">
            {items.map((item) => (
              <article key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-2">{item.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{item.category} • {item.readingMinutes || 6} min</p>
                <p className="text-gray-700">{item.summary}</p>
              </article>
            ))}
          </section>
        )}

        <div className="flex flex-wrap gap-4">
          <Link to={`${langPrefix}/opportunities`} className="bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold">
            {text.cta1}
          </Link>
          <Link to={`${langPrefix}/`} className="bg-white text-primary-700 px-5 py-3 rounded-lg font-semibold border border-primary-200">
            {text.cta2}
          </Link>
        </div>
      </main>
    </div>
  )
}

export default CareerGuides
