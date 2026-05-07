import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'
import { getOpportunities } from '../services/hubService'
import RelatedHubLinks from '../components/RelatedHubLinks'

function Opportunities() {
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
      h1: 'Opportunites',
      intro: 'Offres de stages, emplois debutants et appels a candidatures. Objectif: connecter orientation et opportunites reelles.',
      empty: 'Aucune opportunite publiee pour le moment.',
      cta: 'Voir les parcours de carriere',
      details: 'Voir les details',
      close: 'Masquer',
      apply: 'Postuler',
      steps: 'Etapes',
      requirements: 'Prerequis'
    },
    en: {
      h1: 'Opportunities',
      intro: 'Internships, entry-level jobs and calls for applications. The goal is to connect career guidance with real opportunities.',
      empty: 'No published opportunities yet.',
      cta: 'Explore career paths',
      details: 'View details',
      close: 'Hide',
      apply: 'Apply now',
      steps: 'Steps',
      requirements: 'Requirements'
    },
    ar: {
      h1: 'الفرص',
      intro: 'فرص تدريب ووظائف للمبتدئين وإعلانات ترشيح. الهدف هو ربط التوجيه المهني بفرص حقيقية.',
      empty: 'لا توجد فرص منشورة حاليا.',
      cta: 'استكشف المسارات المهنية',
      details: 'عرض التفاصيل',
      close: 'إخفاء',
      apply: 'قدّم الآن',
      steps: 'الخطوات',
      requirements: 'المتطلبات'
    }
  }[language]

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await getOpportunities(language)
      setItems(data)
      setLoading(false)
    }
    load()
  }, [language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead
        page="legal"
        customTitle={`Opportunities | QuizOrientation`}
        customDescription="Offres de stages, emplois debutants et opportunites de carriere."
      />
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">{text.h1}</h1>
        <p className="text-gray-700 mb-8">{text.intro}</p>

        {loading ? (
          <div className="text-center py-8 text-gray-600">Chargement...</div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-gray-700">{text.empty}</div>
        ) : (
          <section className="grid md:grid-cols-2 gap-5 mb-8">
            {items.map((item) => (
              <article key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-1">{item.title}</h2>
                <p className="text-sm text-gray-500 mb-3">
                  {item.type} {item.companyName ? `• ${item.companyName}` : ''} {item.city ? `• ${item.city}` : ''}
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
                    {item.deadline ? (
                      <p className="text-sm text-gray-600">
                        {language === 'fr' ? 'Date limite' : language === 'en' ? 'Deadline' : 'آخر أجل'}: {item.deadline}
                      </p>
                    ) : null}
                    {item.requirements?.length > 0 ? (
                      <div>
                        <h3 className="text-sm font-bold text-primary-900 mb-1">{text.requirements}</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                          {item.requirements.map((req) => <li key={req}>{req}</li>)}
                        </ul>
                      </div>
                    ) : null}
                    {item.applicationSteps?.length > 0 ? (
                      <div>
                        <h3 className="text-sm font-bold text-primary-900 mb-1">{text.steps}</h3>
                        <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                          {item.applicationSteps.map((step) => <li key={step}>{step}</li>)}
                        </ol>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </article>
            ))}
          </section>
        )}

        <Link to={`${langPrefix}/career-paths`} className="bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold">
          {text.cta}
        </Link>

        <RelatedHubLinks language={language} langPrefix={langPrefix} current="opportunities" />
      </main>
    </div>
  )
}

export default Opportunities
