import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'
import { getStudyPrograms } from '../services/hubService'
import RelatedHubLinks from '../components/RelatedHubLinks'

function StudyInMorocco() {
  const { i18n } = useTranslation()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  const langPrefix = language === 'fr' ? '' : `/${language}`
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [openItemId, setOpenItemId] = useState(null)

  const text = {
    fr: {
      h1: 'Etudier au Maroc',
      intro:
        'Decouvrez les parcours academiques, ecoles, universites et formations professionnalisantes au Maroc, avec des conseils pratiques d admission.',
      empty: 'Aucune formation publiee pour le moment.',
      cta: 'Voir les guides de carriere',
      details: 'Voir les details',
      close: 'Masquer',
      apply: 'S inscrire',
      requirements: 'Conditions d admission'
    },
    en: {
      h1: 'Study in Morocco',
      intro:
        'Discover academic paths, schools, universities and career-oriented programs in Morocco, with practical admission tips.',
      empty: 'No published programs yet.',
      cta: 'Explore career guides',
      details: 'View details',
      close: 'Hide',
      apply: 'Apply',
      requirements: 'Admission requirements'
    },
    ar: {
      h1: 'الدراسة في المغرب',
      intro:
        'اكتشف المسارات الأكاديمية والمدارس والجامعات والتكوينات المهنية في المغرب مع نصائح عملية للقبول.',
      empty: 'لا توجد برامج منشورة حاليا.',
      cta: 'استكشف أدلة المسار المهني',
      details: 'عرض التفاصيل',
      close: 'إخفاء',
      apply: 'التسجيل',
      requirements: 'شروط القبول'
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
                <p className="text-gray-700 mb-3">{item.description}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenItemId((prev) => (prev === item.id ? null : item.id))}
                    className="text-primary-700 hover:underline font-semibold text-sm"
                  >
                    {openItemId === item.id ? text.close : text.details}
                  </button>
                  {item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold"
                    >
                      {text.apply}
                    </a>
                  ) : null}
                </div>
                {openItemId === item.id ? (
                  <div className="mt-4 border-t pt-4 space-y-3">
                    {item.admissionRequirements?.length > 0 ? (
                      <div>
                        <h3 className="text-sm font-bold text-primary-900 mb-1">{text.requirements}</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                          {item.admissionRequirements.map((req) => <li key={req}>{req}</li>)}
                        </ul>
                      </div>
                    ) : null}
                    {item.durationMonths ? (
                      <p className="text-sm text-gray-600">
                        {language === 'fr' ? 'Duree' : language === 'en' ? 'Duration' : 'المدة'}: {item.durationMonths} {language === 'fr' ? 'mois' : language === 'en' ? 'months' : 'شهرا'}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </article>
            ))}
          </section>
        )}

        <Link to={`${langPrefix}/career-guides`} className="bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold">
          {text.cta}
        </Link>

        <RelatedHubLinks language={language} langPrefix={langPrefix} current="study-in-morocco" />
      </main>
    </div>
  )
}

export default StudyInMorocco
