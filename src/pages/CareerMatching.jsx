import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'
import { getCareerMatchingContent } from '../services/hubService'

function CareerMatching() {
  const { i18n } = useTranslation()
  const [searchParams] = useSearchParams()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  const langPrefix = language === 'fr' ? '' : `/${language}`
  const profileId = searchParams.get('profile_id') || ''
  const profileName = searchParams.get('profile_name') || ''
  const [loading, setLoading] = useState(true)
  const [matching, setMatching] = useState({
    careerPaths: [],
    opportunities: [],
    studyPrograms: [],
    careerGuides: []
  })

  const text = {
    fr: {
      h1: 'Career Matching',
      intro:
        'Cette section relie vos resultats de quiz a des metiers, formations, opportunites et guides personnalises.',
      cta: 'Lancer le quiz',
      empty: 'Aucune recommandation personnalisee trouvee. Faites le quiz pour activer le matching.',
      blocks: {
        paths: 'Parcours de carriere recommandes',
        opps: 'Opportunites recommandees',
        studies: 'Formations recommandees',
        guides: 'Guides recommandes'
      }
    },
    en: {
      h1: 'Career Matching',
      intro:
        'This section connects your quiz profile with tailored career paths, training, opportunities and practical guides.',
      cta: 'Start the quiz',
      empty: 'No personalized recommendations found. Take the quiz to enable matching.',
      blocks: {
        paths: 'Recommended Career Paths',
        opps: 'Recommended Opportunities',
        studies: 'Recommended Study Programs',
        guides: 'Recommended Guides'
      }
    },
    ar: {
      h1: 'مطابقة المسار المهني',
      intro:
        'يربط هذا القسم نتائج الاختبار بفرص مهنية وتكوينية وإرشادية مخصصة لملفك.',
      cta: 'ابدأ الاختبار',
      empty: 'لم يتم العثور على توصيات مخصصة. قم بالاختبار لتفعيل المطابقة.',
      blocks: {
        paths: 'مسارات مهنية مقترحة',
        opps: 'فرص مقترحة',
        studies: 'برامج تكوين مقترحة',
        guides: 'أدلة مقترحة'
      }
    }
  }[language]

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await getCareerMatchingContent({ profileId, profileName, lang: language })
      setMatching(data)
      setLoading(false)
    }
    load()
  }, [profileId, profileName, language])

  const hasData =
    matching.careerPaths.length > 0 ||
    matching.opportunities.length > 0 ||
    matching.studyPrograms.length > 0 ||
    matching.careerGuides.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead
        page="legal"
        customTitle={`${text.h1} | QuizOrientation`}
        customDescription="Recommandations personnalisees basees sur le profil quiz."
      />
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">{text.h1}</h1>
        <p className="text-gray-700 mb-2">{text.intro}</p>
        {profileName ? <p className="text-primary-700 font-semibold mb-8">{profileName}</p> : <div className="mb-8" />}

        {loading ? (
          <div className="text-center py-8 text-gray-600">Chargement...</div>
        ) : !hasData ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-gray-700">{text.empty}</div>
        ) : (
          <div className="space-y-6 mb-8">
            {matching.careerPaths.length > 0 ? (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-4">{text.blocks.paths}</h2>
                <ul className="space-y-2 text-gray-700">
                  {matching.careerPaths.map((item) => (
                    <li key={item.id}>
                      • <Link className="text-primary-700 hover:underline" to={`${langPrefix}/career-paths`}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {matching.opportunities.length > 0 ? (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-4">{text.blocks.opps}</h2>
                <ul className="space-y-2 text-gray-700">
                  {matching.opportunities.map((item) => (
                    <li key={item.id}>
                      • <Link className="text-primary-700 hover:underline" to={`${langPrefix}/opportunities`}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {matching.studyPrograms.length > 0 ? (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-4">{text.blocks.studies}</h2>
                <ul className="space-y-2 text-gray-700">
                  {matching.studyPrograms.map((item) => (
                    <li key={item.id}>
                      • <Link className="text-primary-700 hover:underline" to={`${langPrefix}/study-in-morocco`}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {matching.careerGuides.length > 0 ? (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-4">{text.blocks.guides}</h2>
                <ul className="space-y-2 text-gray-700">
                  {matching.careerGuides.map((item) => (
                    <li key={item.id}>
                      • <Link className="text-primary-700 hover:underline" to={`${langPrefix}/career-guides`}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        )}

        <Link to={`${langPrefix}/`} className="bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold">
          {text.cta}
        </Link>
      </main>
    </div>
  )
}

export default CareerMatching
