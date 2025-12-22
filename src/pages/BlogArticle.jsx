import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getArticleBySlug } from '../services/blogService'
import SEOHead from '../components/SEOHead'
import OptimizedImage from '../components/OptimizedImage'
import { trackArticleView } from '../utils/analytics'
import MonetagAdZone from '../components/MonetagAdZone'
import { getArticleSchema } from '../services/seoService'

function BlogArticle() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const [article, setArticle] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMountedRef = useRef(true)
  const language = i18n.language || 'fr'

  const parseFrontMatter = (rawText) => {
    const match = rawText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
    if (!match) {
      return { frontMatter: {}, body: rawText.trim() }
    }

    const frontMatterText = match[1]
    const lines = frontMatterText.split(/\r?\n/)
    const data = {}
    let currentKey = null

    lines.forEach(line => {
      if (!line.trim()) return

      // Gestion des listes (ex: keywords)
      const listMatch = line.match(/^\s*-\s+(.*)$/)
      if (listMatch && currentKey) {
        if (!Array.isArray(data[currentKey])) {
          data[currentKey] = []
        }
        data[currentKey].push(listMatch[1].replace(/^"|"$/g, '').trim())
        return
      }

      const [key, ...rest] = line.split(':')
      if (!key) return
      currentKey = key.trim()
      const value = rest.join(':').trim()

      if (!value) {
        data[currentKey] = []
      } else {
        data[currentKey] = value.replace(/^"|"$/g, '').trim()
      }
    })

    const body = rawText.slice(match[0].length).trim()
    return { frontMatter: data, body }
  }

  const fetchMarkdownContent = async (slugToFetch) => {
    const basePath = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '')
    
    // D'abord, essayer de charger depuis articles-seo/
    for (let i = 1; i <= 40; i++) {
      const articleNum = i.toString().padStart(2, '0')
      const metadataPath = `${basePath}/articles-seo/article-${articleNum}/metadata.json`
      
      try {
        const metadataResponse = await fetch(metadataPath, { cache: 'no-cache' })
        if (metadataResponse.ok) {
          const metadata = await metadataResponse.json()
          const slugKey = `slug_${language}`
          
          if (metadata[slugKey] === slugToFetch) {
            // Charger le contenu markdown
            const markdownPath = `${basePath}/articles-seo/article-${articleNum}/${language}.md`
            const contentResponse = await fetch(markdownPath, { cache: 'no-cache' })
            
            if (contentResponse.ok) {
              const text = await contentResponse.text()
              
              if (text.trim().startsWith('<!doctype') || text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
                continue
              }
              
              // Vérifier que ce n'est pas un placeholder
              if (text.includes('[Contenu à compléter') || text.includes('Contenu à compléter')) {
                throw new Error(`Article ${articleNum} contient un placeholder`)
              }
              
              return text
            }
          }
        }
      } catch (err) {
        continue
      }
    }
    
    // Fallback sur les anciens chemins
    const candidatePaths = [
      `${basePath}/blog/${slugToFetch}.md`,
      `${basePath}/articles/${slugToFetch}.md`
    ]

    for (const path of candidatePaths) {
      try {
        const response = await fetch(path, { cache: 'no-cache' })
        
        if (response.ok) {
          const text = await response.text()
          
          if (text.trim().startsWith('<!doctype') || text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
            continue
          }
          if (text.trim().startsWith('---') || text.trim().startsWith('#')) {
            return text
          }
        }
      } catch (err) {
        console.error('Échec chargement markdown:', path, err)
      }
    }

    throw new Error(`Article markdown introuvable pour: ${slugToFetch}`)
  }

  useEffect(() => {
    isMountedRef.current = true
    
    const loadArticle = async () => {
      if (!isMountedRef.current) return
      
      setLoading(true)
      setError(null)
      
      try {
        let articleData = await getArticleBySlug(slug, language)
        
        if (!isMountedRef.current) return
        
        let markdownContent = ''

        if (articleData?.title) {
          trackArticleView(articleData.title)
        }

        if (!articleData || !articleData.content) {
          try {
            const rawText = await fetchMarkdownContent(slug)
            
            if (!isMountedRef.current) return
            
            const { frontMatter, body } = parseFrontMatter(rawText)
            
            // Vérifier que le contenu n'est pas un placeholder
            if (body && body.includes('[Contenu à compléter') || body.includes('Contenu à compléter')) {
              throw new Error('Article en cours de rédaction')
            }
            
            if (body && body.trim().length > 0 && !body.trim().startsWith('<!')) {
              markdownContent = body

              if (!articleData) {
                articleData = {
                  slug,
                  title: frontMatter.title || slug,
                  description: frontMatter.description || '',
                  date: frontMatter.date || new Date().toISOString(),
                  image: frontMatter.image || null,
                  keywords: frontMatter.keywords || [],
                  category: frontMatter.category || 'blog'
                }
              }
            } else {
              throw new Error('Contenu markdown invalide')
            }
          } catch (fetchError) {
            if (!isMountedRef.current) return
            
            // Si l'article n'existe pas, on lance une erreur pour afficher la page 404
            if (!articleData) {
              throw new Error('Article non trouvé')
            }
            
            // Si l'article existe mais le contenu markdown n'est pas disponible,
            // on utilise le contenu de la base de données ou on affiche une erreur
            if (articleData.content) {
              markdownContent = articleData.content
            } else {
              throw new Error('Contenu de l\'article non disponible')
            }
          }
        } else {
          markdownContent = articleData.content
        }

        if (!isMountedRef.current) return

        if (!articleData) {
          throw new Error('Article non trouvé')
        }
        
        setArticle(articleData)
        if (markdownContent && !markdownContent.trim().startsWith('<!') && markdownContent.trim().length > 0) {
          setContent(markdownContent)
        } else {
          // Si pas de contenu valide, on lance une erreur pour afficher la page 404
          throw new Error('Contenu de l\'article non disponible')
        }
      } catch (error) {
        if (!isMountedRef.current) return
        
        console.error('Erreur de chargement article:', error)
        setError(error.message || 'Erreur lors du chargement de l\'article')
        setArticle(null)
        setContent('')
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }
    }
    
    loadArticle()
    
    return () => {
      isMountedRef.current = false
    }
  }, [slug, language])

  useEffect(() => {
    if (!isMountedRef.current || !article) return
    
    const articleSchema = getArticleSchema(article)
    if (articleSchema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"][data-article-schema]')
      if (!schemaScript) {
        schemaScript = document.createElement('script')
        schemaScript.setAttribute('type', 'application/ld+json')
        schemaScript.setAttribute('data-article-schema', 'true')
        document.head.appendChild(schemaScript)
      }
      schemaScript.textContent = JSON.stringify(articleSchema)
    }
  }, [article])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    const errorContent = {
      fr: {
        title: 'Article non trouvé',
        message: 'Désolé, l\'article que vous recherchez n\'existe pas ou n\'est plus disponible.',
        suggestion: 'Nous vous invitons à explorer nos autres articles de blog sur l\'orientation professionnelle, les métiers d\'avenir et les conseils de carrière.',
        backToBlog: 'Retour au blog',
        exploreArticles: 'Découvrir nos articles'
      },
      en: {
        title: 'Article Not Found',
        message: 'Sorry, the article you are looking for does not exist or is no longer available.',
        suggestion: 'We invite you to explore our other blog articles about career orientation, future careers and career advice.',
        backToBlog: 'Back to blog',
        exploreArticles: 'Discover our articles'
      },
      ar: {
        title: 'المقال غير موجود',
        message: 'عذرًا، المقال الذي تبحث عنه غير موجود أو لم يعد متاحًا.',
        suggestion: 'ندعوك لاستكشاف مقالات المدونة الأخرى حول التوجيه المهني والمهن المستقبلية ونصائح المسيرة المهنية.',
        backToBlog: 'العودة إلى المدونة',
        exploreArticles: 'اكتشف مقالاتنا'
      }
    }
    
    const content = errorContent[language] || errorContent.fr
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
        <SEOHead 
          page="blog-article" 
          articleTitle={content.title}
        />
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-4xl font-bold text-primary-900 mb-6">
              {content.title}
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              {content.message}
            </p>
            <p className="text-gray-600 mb-8">
              {content.suggestion}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/blog" 
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {content.backToBlog}
              </Link>
              <Link 
                to="/" 
                className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {language === 'fr' ? 'Retour à l\'accueil' : language === 'en' ? 'Back to home' : 'العودة إلى الصفحة الرئيسية'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead page="blog-article" articleTitle={article.title} />
      
      <main id="main-content">
        <article className="container mx-auto px-4 py-8 max-w-4xl" itemScope itemType="https://schema.org/Article">
        <Link 
          to="/blog" 
          className="text-primary-600 hover:underline mb-6 inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
          aria-label={t('blog.back_to_blog', { defaultValue: 'Retour au blog' })}
        >
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
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4" itemProp="headline">
            {article.title}
          </h1>
          <p className="text-xl text-gray-700 mb-6" itemProp="description">
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

        {/* Zone publicitaire Monetag - Avant le contenu */}
        {import.meta.env.VITE_MONETAG_ENABLED === 'true' && (
          <div className="mb-8 flex justify-center">
            <MonetagAdZone zoneId="10282723" position="top" className="w-full max-w-4xl" />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content && content.trim().length > 0
              ? content
              : `# ${article.title}\n\n${article.description || t('blog.article_default', { defaultValue: 'Contenu en cours de chargement.' })}`}
          </ReactMarkdown>
        </div>

        {/* Zone publicitaire Monetag - Après le contenu */}
        {import.meta.env.VITE_MONETAG_ENABLED === 'true' && (
          <div className="my-8 flex justify-center">
            <MonetagAdZone zoneId="10282723" position="bottom" className="w-full max-w-4xl" />
          </div>
        )}

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
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={t('blog.view_all', { defaultValue: 'Voir tous les articles' })}
          >
            {t('blog.view_all', { defaultValue: 'Voir tous les articles' })}
          </Link>
        </div>
      </article>
      </main>
    </div>
  )
}

export default BlogArticle

