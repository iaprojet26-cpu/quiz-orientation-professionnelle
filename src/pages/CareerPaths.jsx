import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'
import { getCareerPaths } from '../services/hubService'

function CareerPaths() {
  const { i18n } = useTranslation()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  const langPrefix = language === 'fr' ? '' : `/${language}`
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const text = {
    fr: {
      title: 'Career Paths',
      h1: 'Parcours de carriere',
      intro:
        'Explorez des fiches metiers detaillees: competences, salaire, formations et debouches. Cette section est concue pour vous aider a choisir une direction claire.',
      empty: 'Aucun parcours publie pour le moment. Revenez bientot.',
      ctaQuiz: 'Faire le quiz et recevoir des suggestions',
      ctaBlog: 'Voir les guides de carriere'
    },
    en: {
      title: 'Career Paths',
      h1: 'Career Paths',
      intro:
        'Explore detailed career profiles including skills, salary ranges, training paths and opportunities. This section helps you make informed career decisions.',
      empty: 'No published career paths yet. Check back soon.',
      ctaQuiz: 'Take the quiz for personalized suggestions',
      ctaBlog: 'Explore career guides'
    },
    ar: {
      title: 'المسارات المهنية',
      h1: 'المسارات المهنية',
      intro:
        'اكتشف بطاقات مهنية مفصلة تشمل المهارات والرواتب ومسارات التكوين وآفاق العمل. هذه الصفحة تساعدك على اتخاذ قرار مهني واضح.',
      empty: 'لا توجد مسارات منشورة حاليا. عد لاحقا.',
      ctaQuiz: 'قم بالاختبار للحصول على اقتراحات مخصصة',
      ctaBlog: 'اطلع على أدلة المسار المهني'
    }
  }[language]

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await getCareerPaths(language)
      setItems(data)
      setLoading(false)
    }
    load()
  }, [language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead
        page="legal"
        customTitle={`${text.title} | QuizOrientation`}
        customDescription="Parcours metiers avec competences, salaires, formations et debouches."
      />
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">{text.h1}</h1>
        <p className="text-gray-700 mb-8 max-w-4xl">{text.intro}</p>

        {loading ? (
          <div className="text-center py-8 text-gray-600">Chargement...</div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-10 text-gray-700">{text.empty}</div>
        ) : (
          <section className="grid md:grid-cols-3 gap-6 mb-10">
            {items.map((item) => (
              <article key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-2">{item.title}</h2>
                <p className="text-gray-700 mb-3">{item.description}</p>
                {item.salaryMin || item.salaryMax ? (
                  <p className="text-sm text-primary-800 font-medium mb-2">
                    {item.salaryMin || '?'} - {item.salaryMax || '?'} MAD/mois
                  </p>
                ) : null}
                {item.skills.length > 0 ? (
                  <p className="text-sm text-gray-600 line-clamp-2">{item.skills.join(', ')}</p>
                ) : null}
              </article>
            ))}
          </section>
        )}

        <div className="flex flex-wrap gap-4">
          <Link to={`${langPrefix}/`} className="bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold">
            {text.ctaQuiz}
          </Link>
          <Link to={`${langPrefix}/career-guides`} className="bg-white text-primary-700 px-5 py-3 rounded-lg font-semibold border border-primary-200">
            {text.ctaBlog}
          </Link>
        </div>
      </main>
    </div>
  )
}

export default CareerPaths
