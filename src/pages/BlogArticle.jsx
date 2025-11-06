import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getArticleBySlug } from '../services/blogService'
import SEOHead from '../components/SEOHead'
import LanguageSelector from '../components/LanguageSelector'

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
        {/* Sélecteur de langue en haut à droite */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>
        
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

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('blog.related_articles', { defaultValue: 'Articles Similaires' })}
          </h2>
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

