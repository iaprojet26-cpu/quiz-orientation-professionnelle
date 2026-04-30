import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'
import { getOpportunities } from '../services/hubService'

function Opportunities() {
  const { i18n } = useTranslation()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  const langPrefix = language === 'fr' ? '' : `/${language}`
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const text = {
    fr: {
      h1: 'Opportunites',
      intro: 'Offres de stages, emplois debutants et appels a candidatures. Objectif: connecter orientation et opportunites reelles.',
      empty: 'Aucune opportunite publiee pour le moment.',
      cta: 'Voir les parcours de carriere'
    },
    en: {
      h1: 'Opportunities',
      intro: 'Internships, entry-level jobs and calls for applications. The goal is to connect career guidance with real opportunities.',
      empty: 'No published opportunities yet.',
      cta: 'Explore career paths'
    },
    ar: {
      h1: 'الفرص',
      intro: 'فرص تدريب ووظائف للمبتدئين وإعلانات ترشيح. الهدف هو ربط التوجيه المهني بفرص حقيقية.',
      empty: 'لا توجد فرص منشورة حاليا.',
      cta: 'استكشف المسارات المهنية'
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
                {item.requirements.length > 0 ? (
                  <p className="text-sm text-gray-600 line-clamp-2">{item.requirements.join(', ')}</p>
                ) : null}
              </article>
            ))}
          </section>
        )}

        <Link to={`${langPrefix}/career-paths`} className="bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold">
          {text.cta}
        </Link>
      </main>
    </div>
  )
}

export default Opportunities
