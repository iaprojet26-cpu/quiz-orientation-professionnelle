import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Quiz from '../components/Quiz'
import Results from '../components/Results'
import SEOHead from '../components/SEOHead'
import { getHomepageContent } from '../services/seoService'
import { getRecentArticles } from '../services/blogService'
import { getCareerMatchingContent } from '../services/hubService'
import { Link } from 'react-router-dom'
import OptimizedImage from '../components/OptimizedImage'

function Home() {
  const { t, i18n } = useTranslation()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  const langPrefix = language === 'fr' ? '' : `/${language}`
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizResults, setQuizResults] = useState(null)
  const [seoContent, setSeoContent] = useState(getHomepageContent(i18n.language || 'fr'))
  const [recentArticles, setRecentArticles] = useState([])
  const [loadingArticles, setLoadingArticles] = useState(true)
  const [personalized, setPersonalized] = useState({
    careerPaths: [],
    opportunities: [],
    studyPrograms: [],
    careerGuides: []
  })
  const [loadingPersonalized, setLoadingPersonalized] = useState(false)
  
  // Mettre à jour le contenu SEO quand la langue change
  useEffect(() => {
    setSeoContent(getHomepageContent(i18n.language || 'fr'))
  }, [i18n.language])

  // Charger les articles uniquement quand ils sont visibles (Intersection Observer)
  useEffect(() => {
    // Charger les articles même après le quiz pour avoir du contenu visible

    // Ne charger les articles qu'après un délai et seulement si la section est visible
    const loadRecentArticles = () => {
      // Vérifier si la section articles existe
      const articlesSection = document.querySelector('[data-articles-section]')
      if (!articlesSection) {
        // Si la section n'existe pas encore, attendre un peu plus
        setTimeout(() => loadRecentArticles(), 500)
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.disconnect()
            setLoadingArticles(true)
            // Utiliser requestIdleCallback pour charger sans bloquer
            const load = () => {
              getRecentArticles(3, i18n.language || 'fr')
                .then((articles) => {
                  setRecentArticles(articles)
                })
                .catch((error) => {
                  console.error('Erreur chargement articles:', error)
                  setRecentArticles([])
                })
                .finally(() => {
                  setLoadingArticles(false)
                })
            }
            
            if ('requestIdleCallback' in window) {
              requestIdleCallback(load, { timeout: 2000 })
            } else {
              setTimeout(load, 1000)
            }
          }
        },
        { rootMargin: '300px' } // Commencer à charger 300px avant que la section soit visible
      )
      
      observer.observe(articlesSection)
    }

    // Délai initial pour ne pas bloquer le rendu
    setTimeout(() => loadRecentArticles(), 2000)
  }, [i18n.language, quizCompleted])

  useEffect(() => {
    const loadPersonalized = async () => {
      if (!quizCompleted || !quizResults?.profile?.id) {
        setPersonalized({ careerPaths: [], opportunities: [], studyPrograms: [], careerGuides: [] })
        return
      }
      setLoadingPersonalized(true)
      const data = await getCareerMatchingContent({
        profileId: quizResults.profile.id,
        profileName: quizResults.profile.nom,
        lang: language
      })
      setPersonalized(data)
      setLoadingPersonalized(false)
    }
    loadPersonalized()
  }, [quizCompleted, quizResults?.profile?.id, quizResults?.profile?.nom, language])

  const handleQuizComplete = (results) => {
    setQuizResults(results)
    setQuizCompleted(true)
  }

  const handleRestart = () => {
    setQuizCompleted(false)
    setQuizResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Gestion des meta tags SEO dynamiques */}
      <SEOHead 
        page={quizCompleted ? 'result' : 'homepage'} 
        profileName={quizResults?.profile?.nom || ''} 
      />
      
      <main id="main-content" className="container mx-auto px-4 py-8">

        {!quizCompleted && (
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              {seoContent.h1}
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
              {t('header.subtitle')}
            </p>
            
            {/* Contenu SEO supplémentaire - Multilingue */}
            <div className={`max-w-3xl mx-auto mt-8 text-left space-y-4 text-gray-700 ${i18n.language === 'ar' ? 'rtl' : ''}`}>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="mb-4">
                  {seoContent.intro1}
                </p>
                <p className="mb-4">
                  {seoContent.intro2}
                </p>
                <h2 className="text-2xl font-bold text-primary-900 mb-3 mt-6">{seoContent.whyTitle}</h2>
                <p className="mb-4">
                  {seoContent.whyText}
                </p>
                <h2 className="text-2xl font-bold text-primary-900 mb-3 mt-6">{seoContent.howTitle}</h2>
                <p>
                  {seoContent.howText}
                </p>
              </div>
            </div>
          </header>
        )}

        {!quizCompleted ? (
          <Quiz onComplete={handleQuizComplete} />
        ) : (
          <Results results={quizResults} onRestart={handleRestart} />
        )}

        {quizCompleted && (
          <section className="mt-10 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-3">
                {language === 'fr' ? 'Recommande pour vous' : language === 'en' ? 'Recommended for you' : 'موصى به لك'}
              </h2>
              <p className="text-gray-700 mb-5">
                {language === 'fr'
                  ? 'Selection personnalisee basee sur votre profil quiz.'
                  : language === 'en'
                  ? 'Personalized selection based on your quiz profile.'
                  : 'اختيارات مخصصة بناء على نتيجة الاختبار.'}
              </p>
              {loadingPersonalized ? (
                <p className="text-gray-600">Chargement...</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {personalized.careerPaths.length > 0 && <Link to={`${langPrefix}/career-paths`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Career Paths ({personalized.careerPaths.length})</Link>}
                  {personalized.opportunities.length > 0 && <Link to={`${langPrefix}/opportunities`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Opportunities ({personalized.opportunities.length})</Link>}
                  {personalized.studyPrograms.length > 0 && <Link to={`${langPrefix}/study-in-morocco`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Study in Morocco ({personalized.studyPrograms.length})</Link>}
                  {personalized.careerGuides.length > 0 && <Link to={`${langPrefix}/career-guides`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Career Guides ({personalized.careerGuides.length})</Link>}
                  <Link
                    to={`${langPrefix}/career-matching?profile_id=${encodeURIComponent(quizResults?.profile?.id || '')}&profile_name=${encodeURIComponent(quizResults?.profile?.nom || '')}`}
                    className="bg-white border border-primary-200 hover:bg-primary-50 rounded-lg p-4 font-semibold text-primary-900"
                  >
                    {language === 'fr' ? 'Voir le matching detaille' : language === 'en' ? 'Open detailed matching' : 'عرض المطابقة التفصيلية'}
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}


        {/* Section Articles Récents - Toujours affichée en bas de page (même après quiz) */}
        <section className="mt-16 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-3">
              {i18n.language === 'fr'
                ? "Hub d'orientation, formation et employabilite"
                : i18n.language === 'en'
                ? 'Career, Training and Employability Hub'
                : 'منصة التوجيه والتكوين وقابلية التوظيف'}
            </h2>
            <p className="text-gray-700 mb-6">
              {i18n.language === 'fr'
                ? 'Decouvrez les rubriques strategiques pour passer du quiz a un plan d action concret.'
                : i18n.language === 'en'
                ? 'Explore strategic sections to turn quiz insights into a practical action plan.'
                : 'اكتشف الأقسام الاستراتيجية لتحويل نتائج الاختبار إلى خطة عملية.'}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to={`${langPrefix}/career-paths`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Career Paths</Link>
              <Link to={`${langPrefix}/opportunities`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Opportunities</Link>
              <Link to={`${langPrefix}/study-in-morocco`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Study in Morocco</Link>
              <Link to={`${langPrefix}/career-guides`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Career Guides</Link>
              <Link to={`${langPrefix}/career-matching`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Career Matching</Link>
              <Link to={`${langPrefix}/free-tools`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Free Tools</Link>
            </div>
          </div>
        </section>

        <section className="mt-16 mb-8 max-w-6xl mx-auto" data-articles-section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-primary-900">
                {t('blog.recent_articles', { defaultValue: 'Articles Récents' })}
              </h2>
              <Link
                to="/blog"
                className="text-primary-600 hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                aria-label={t('blog.view_all', { defaultValue: 'Voir tous les articles' })}
              >
                {t('blog.view_all', { defaultValue: 'Voir tous les articles' })} →
              </Link>
            </div>
            
            {loadingArticles ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement des articles...</p>
              </div>
            ) : recentArticles.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {recentArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/blog/${article.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label={`Lire l'article: ${article.title}`}
                  >
                    <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                      {article.image ? (
                        <OptimizedImage
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          lazy={true}
                        />
                      ) : (
                        <span className="text-5xl">📚</span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-gray-500 mb-2">
                        {new Date(article.date).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : i18n.language === 'en' ? 'en-US' : 'ar-MA')}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-600 mb-4">Aucun article disponible pour le moment.</p>
                <Link
                  to="/blog"
                  className="text-primary-600 hover:underline font-semibold"
                >
                  Voir le blog →
                </Link>
              </div>
            )}
          </section>
      </main>
    </div>
  )
}

export default Home

