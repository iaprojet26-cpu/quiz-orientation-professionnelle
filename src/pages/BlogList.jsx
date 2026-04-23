import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getAllArticles } from '../services/blogService'
import SEOHead from '../components/SEOHead'

function BlogList() {
  const { t, i18n } = useTranslation()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Normaliser la langue
  let language = i18n.language || 'fr'
  if (language.includes('-')) {
    language = language.split('-')[0]
  }
  if (!['fr', 'en', 'ar'].includes(language)) {
    language = 'fr'
  }
  const langPrefix = `/${language}`

  const isMountedRef = useRef(true)
  
  useEffect(() => {
    isMountedRef.current = true
    
    const loadArticles = async () => {
      try {
        if (!isMountedRef.current) return
        
        setLoading(true)
        setError(null)
        
        const data = await getAllArticles(language)
        
        if (!isMountedRef.current) return
        
        if (!data || data.length === 0) {
          setError('Aucun article disponible pour le moment.')
        } else {
          setArticles(data)
        }
      } catch (err) {
        if (!isMountedRef.current) return
        
        console.error('Erreur lors du chargement des articles:', err)
        setError(err.message || 'Erreur lors du chargement des articles')
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }
    }
    
    loadArticles()
    
    return () => {
      isMountedRef.current = false
    }
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

        <section className="max-w-4xl mx-auto mb-10 bg-white/80 rounded-lg p-6 border border-primary-100">
          <h2 className="text-2xl font-bold text-primary-900 mb-3">
            {language === 'fr'
              ? 'Notre engagement editorial'
              : language === 'en'
              ? 'Our editorial commitment'
              : 'التزامنا التحريري'}
          </h2>
          <p className="text-gray-700 mb-4">
            {language === 'fr'
              ? 'Chaque article est redige pour apporter une valeur pratique: informations metier, conseils applicables et pistes de formation.'
              : language === 'en'
              ? 'Each article is written to provide practical value: career insights, actionable advice and training pathways.'
              : 'يتم إعداد كل مقال لتقديم قيمة عملية: معلومات مهنية ونصائح قابلة للتطبيق ومسارات تكوين.'}
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>
              {language === 'fr'
                ? "Mise a jour reguliere selon l'evolution du marche de l'emploi"
                : language === 'en'
                ? 'Regular updates based on labor market evolution'
                : 'تحديث منتظم حسب تطور سوق العمل'}
            </li>
            <li>
              {language === 'fr'
                ? 'Ressources utiles pour etudiants, jeunes diplomes et reconversion'
                : language === 'en'
                ? 'Useful resources for students, graduates and career changers'
                : 'موارد مفيدة للطلاب والخريجين ومن هم في إعادة التوجيه المهني'}
            </li>
            <li>
              {language === 'fr'
                ? 'Contenu clair et oriente action'
                : language === 'en'
                ? 'Clear and action-oriented content'
                : 'محتوى واضح وموجه للتطبيق العملي'}
            </li>
          </ul>
        </section>

        {/* Contenu statique pour SEO - Visible même sans JavaScript */}
        <noscript>
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-gray-700 mb-4">
              {language === 'fr' 
                ? 'Découvrez nos articles sur l\'orientation professionnelle, les métiers d\'avenir, les compétences recherchées et les parcours de formation. Notre blog vous accompagne dans vos choix de carrière avec des conseils pratiques et des informations à jour sur le marché de l\'emploi.'
                : language === 'en'
                ? 'Discover our articles on career orientation, future jobs, in-demand skills and training paths. Our blog guides you in your career choices with practical advice and up-to-date information on the job market.'
                : 'اكتشف مقالاتنا حول التوجيه المهني والمهن المستقبلية والمهارات المطلوبة ومسارات التدريب. مدونتنا ترافقك في خياراتك المهنية مع نصائح عملية ومعلومات محدثة حول سوق العمل.'}
            </p>
            <p className="text-gray-700">
              {language === 'fr'
                ? 'Nous publions régulièrement des articles sur les secteurs qui recrutent, les formations les plus demandées, les compétences essentielles pour réussir sa carrière, et bien plus encore. Que vous soyez étudiant, jeune diplômé ou en reconversion professionnelle, vous trouverez des ressources utiles pour votre parcours.'
                : language === 'en'
                ? 'We regularly publish articles on recruiting sectors, most in-demand training, essential skills for career success, and much more. Whether you are a student, recent graduate or in career transition, you will find useful resources for your journey.'
                : 'ننشر بانتظام مقالات حول القطاعات التي توظف والتدريبات الأكثر طلبًا والمهارات الأساسية للنجاح في المسيرة المهنية والمزيد. سواء كنت طالبًا أو خريجًا حديثًا أو في مرحلة انتقال مهني، ستجد موارد مفيدة لرحلتك.'}
            </p>
          </div>
        </noscript>


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
              to={`${langPrefix}/blog/${article.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={`Lire l'article: ${article.title}`}
            >
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden relative">
                {(() => {
                  // TOUJOURS utiliser l'image générique par défaut pour tous les articles
                  const imageUrl = '/assets/blog/default-generic.svg'
                  
                  return (
                    <img
                      src={imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error('❌ Erreur chargement image:', imageUrl, 'pour article:', article.title)
                        // Fallback sur emoji si l'image échoue
                        e.target.style.display = 'none'
                        const parent = e.target.closest('div')
                        if (parent && !parent.querySelector('.fallback-emoji')) {
                          const emoji = document.createElement('span')
                          emoji.className = 'fallback-emoji text-6xl'
                          emoji.textContent = '📚'
                          parent.appendChild(emoji)
                        }
                      }}
                    />
                  )
                })()}
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

