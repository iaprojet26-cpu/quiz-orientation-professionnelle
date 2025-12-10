import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getAllArticles } from '../services/blogService'
import SEOHead from '../components/SEOHead'
import OptimizedImage from '../components/OptimizedImage'
import MonetagAdZone from '../components/MonetagAdZone'

function BlogList() {
  const { t, i18n } = useTranslation()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const language = i18n.language || 'fr'

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true)
        setError(null)
        console.log('📚 Début du chargement des articles, langue:', language)
        
        const data = await getAllArticles(language)
        console.log('✅ Articles chargés:', data?.length || 0, 'articles')
        console.log('📋 Détails des articles:', data)
        
        if (!data || data.length === 0) {
          console.warn('⚠️ Aucun article trouvé')
          setError('Aucun article disponible pour le moment.')
        } else {
          setArticles(data)
        }
      } catch (err) {
        console.error('❌ Erreur lors du chargement des articles:', err)
        setError(err.message || 'Erreur lors du chargement des articles')
      } finally {
        setLoading(false)
      }
    }
    loadArticles()
  }, [language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead page="blog" />
      
      <main id="main-content" className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            {t('blog.title', { defaultValue: 'Blog - Conseils d\'Orientation Professionnelle' })}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t('blog.subtitle', { defaultValue: 'Découvrez nos articles sur l\'orientation professionnelle, les métiers et les carrières' })}
          </p>
        </header>

        {/* Zone publicitaire Monetag - En haut de la liste */}
        <div className="mb-8 flex justify-center">
          <MonetagAdZone zoneId="10282723" position="top" className="w-full max-w-4xl" />
        </div>

        {/* État de chargement */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des articles...</p>
          </div>
        )}

        {/* Message d'erreur */}
        {error && !loading && (
          <div className="text-center py-12 max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-800 font-semibold mb-2">Erreur de chargement</p>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Message si aucun article */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-12 max-w-2xl mx-auto">
            <p className="text-gray-600 text-lg">Aucun article disponible pour le moment.</p>
          </div>
        )}

        {/* Liste des articles */}
        {!loading && !error && articles.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={`Lire l'article: ${article.title}`}
            >
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                {article.image ? (
                  <OptimizedImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    lazy={true}
                  />
                ) : (
                  <span className="text-6xl">📚</span>
                )}
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(article.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'ar-MA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {article.description}
                </p>
                <div className="flex items-center text-primary-600 font-semibold">
                  {t('blog.read_more', { defaultValue: 'Lire la suite' })} →
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}
      </main>
    </div>
  )
}

export default BlogList

