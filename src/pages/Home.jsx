import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Quiz from '../components/Quiz'
import Results from '../components/Results'
import SEOHead from '../components/SEOHead'
import { getHomepageContent } from '../services/seoService'
import { getRecentArticles } from '../services/blogService'
import { Link } from 'react-router-dom'
import OptimizedImage from '../components/OptimizedImage'
import MonetagAdZone from '../components/MonetagAdZone'

function Home() {
  const { t, i18n } = useTranslation()
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizResults, setQuizResults] = useState(null)
  const [seoContent, setSeoContent] = useState(getHomepageContent(i18n.language || 'fr'))
  const [recentArticles, setRecentArticles] = useState([])
  const [loadingArticles, setLoadingArticles] = useState(true)
  
  // Mettre à jour le contenu SEO quand la langue change
  useEffect(() => {
    setSeoContent(getHomepageContent(i18n.language || 'fr'))
    const loadRecentArticles = async () => {
      setLoadingArticles(true)
      try {
        const articles = await getRecentArticles(3, i18n.language || 'fr')
        console.log('📚 Articles chargés:', articles.length)
        setRecentArticles(articles)
      } catch (error) {
        console.error('Erreur chargement articles:', error)
        setRecentArticles([])
      } finally {
        setLoadingArticles(false)
      }
    }
    loadRecentArticles()
  }, [i18n.language])

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
      
      <div className="container mx-auto px-4 py-8">
        {/* Zone publicitaire Monetag - En haut de page */}
        <div className="mb-8 flex justify-center">
          <MonetagAdZone zoneId="10282723" position="top" className="w-full max-w-4xl" />
        </div>

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

        {/* Zone publicitaire Monetag - Entre contenu et articles */}
        {!quizCompleted && (
          <div className="my-12 flex justify-center">
            <MonetagAdZone zoneId="10282723" position="middle" className="w-full max-w-4xl" />
          </div>
        )}

        {/* Section Articles Récents - Toujours affichée en bas de page */}
        {!quizCompleted && (
          <section className="mt-16 mb-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-primary-900">
                {t('blog.recent_articles', { defaultValue: 'Articles Récents' })}
              </h2>
              <Link
                to="/blog"
                className="text-primary-600 hover:underline font-semibold"
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
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
        )}
      </div>
    </div>
  )
}

export default Home

