import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'
import { getStudyPrograms } from '../services/hubService'

function StudyInMorocco() {
  const { i18n } = useTranslation()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  const langPrefix = language === 'fr' ? '' : `/${language}`
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const text = {
    fr: {
      h1: 'Etudier au Maroc',
      intro:
        'Decouvrez les parcours academiques, ecoles, universites et formations professionnalisantes au Maroc, avec des conseils pratiques d admission.',
      empty: 'Aucune formation publiee pour le moment.',
      cta: 'Voir les guides de carriere'
    },
    en: {
      h1: 'Study in Morocco',
      intro:
        'Discover academic paths, schools, universities and career-oriented programs in Morocco, with practical admission tips.',
      empty: 'No published programs yet.',
      cta: 'Explore career guides'
    },
    ar: {
      h1: 'الدراسة في المغرب',
      intro:
        'اكتشف المسارات الأكاديمية والمدارس والجامعات والتكوينات المهنية في المغرب مع نصائح عملية للقبول.',
      empty: 'لا توجد برامج منشورة حاليا.',
      cta: 'استكشف أدلة المسار المهني'
    }
  }[language]

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await getStudyPrograms(language)
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
        customDescription="Formations, ecoles et parcours academiques au Maroc."
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
                <p className="text-sm text-gray-500 mb-3">
                  {item.institutionName} {item.city ? `• ${item.city}` : ''} {item.degreeLevel ? `• ${item.degreeLevel}` : ''}
                </p>
                <p className="text-gray-700">{item.description}</p>
              </article>
            ))}
          </section>
        )}

        <Link to={`${langPrefix}/career-guides`} className="bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold">
          {text.cta}
        </Link>
      </main>
    </div>
  )
}

export default StudyInMorocco
