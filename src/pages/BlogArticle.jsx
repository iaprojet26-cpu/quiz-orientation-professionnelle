import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getArticleBySlug } from '../services/blogService'
import SEOHead from '../components/SEOHead'
import OptimizedImage from '../components/OptimizedImage'
import { trackArticleView } from '../utils/analytics'

function BlogArticle() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const [article, setArticle] = useState(null)
  const [content, setContent] = useState('')
  const language = i18n.language || 'fr'

  useEffect(() => {
    const loadArticle = async () => {
      const articleData = await getArticleBySlug(slug, language)
      setArticle(articleData)
      
      // Tracker la vue de l'article
      if (articleData?.title) {
        trackArticleView(articleData.title)
      }

      // Si l'article vient de Supabase, utiliser le contenu directement
      if (articleData?.content) {
        setContent(articleData.content)
      } else if (slug) {
        // Fallback : charger depuis fichier Markdown
        fetch(`/blog/${slug}.md`)
          .then(res => {
            if (!res.ok) throw new Error('Article non trouvé')
            return res.text()
          })
          .then(text => {
            const contentMatch = text.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)
            if (contentMatch) {
              setContent(contentMatch[1])
            } else {
              setContent(text)
            }
          })
          .catch(() => {
            setContent(`# ${articleData?.title || 'Article'}\n\nContenu de l'article à venir...`)
          })
      }
    }
    loadArticle()
  }, [slug, language])

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <Link to="/blog" className="text-primary-600 hover:underline">
            Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead page="blog-article" articleTitle={article.title} />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="text-primary-600 hover:underline mb-6 inline-block">
          ← {t('blog.back_to_blog', { defaultValue: 'Retour au blog' })}
        </Link>

        <header className="mb-8">
          <div className="text-sm text-gray-500 mb-4">
            {new Date(article.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'ar-MA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            {article.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {article.keywords?.slice(0, 3).map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content || 'Chargement du contenu...'}
          </ReactMarkdown>
        </div>

        {/* Liens internes SEO */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {language === 'fr' ? 'Explorez Plus' : language === 'en' ? 'Explore More' : 'استكشف المزيد'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Link
              to="/"
              className="card hover:shadow-lg transition-shadow bg-gradient-to-br from-primary-50 to-primary-100"
            >
              <h3 className="text-xl font-bold text-primary-900 mb-2">
                {language === 'fr' ? '🎯 Test d\'Orientation Gratuit' : language === 'en' ? '🎯 Free Orientation Test' : '🎯 اختبار التوجيه المجاني'}
              </h3>
              <p className="text-gray-700">
                {language === 'fr' ? 'Découvrez votre profil professionnel en 10 minutes avec notre quiz d\'orientation professionnelle.' : language === 'en' ? 'Discover your professional profile in 10 minutes with our career orientation quiz.' : 'اكتشف ملفك المهني في 10 دقائق مع اختبار التوجيه المهني لدينا.'}
              </p>
            </Link>
            <Link
              to="/top-metiers-futur"
              className="card hover:shadow-lg transition-shadow bg-gradient-to-br from-primary-50 to-primary-100"
            >
              <h3 className="text-xl font-bold text-primary-900 mb-2">
                {language === 'fr' ? '🚀 Top Métiers du Futur' : language === 'en' ? '🚀 Top Future Careers' : '🚀 أفضل المهن المستقبلية'}
              </h3>
              <p className="text-gray-700">
                {language === 'fr' ? 'Découvrez les métiers les plus prometteurs pour 2025-2030 et trouvez votre métier idéal.' : language === 'en' ? 'Discover the most promising careers for 2025-2030 and find your ideal career.' : 'اكتشف المهن الأكثر وعداً لعام 2025-2030 واعثر على مهنتك المثالية.'}
              </p>
            </Link>
          </div>
          <Link
            to="/blog"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            {t('blog.view_all', { defaultValue: 'Voir tous les articles' })}
          </Link>
        </div>
      </article>
    </div>
  )
}

export default BlogArticle

