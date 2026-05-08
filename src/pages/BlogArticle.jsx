import { useEffect, useState, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getArticleBySlug, getAllArticles } from '../services/blogService'
import SEOHead from '../components/SEOHead'
import { trackArticleView } from '../utils/analytics'
import { getArticleSchema } from '../services/seoService'
import OptimizedImage from '../components/OptimizedImage'

function BlogArticle() {
  const { slug: rawSlug, lang: routeLang } = useParams()
  const safeDecodeURIComponent = (value = '') => {
    try {
      return decodeURIComponent(value)
    } catch {
      return value
    }
  }
  const slug = safeDecodeURIComponent(rawSlug || '')
  const { t, i18n } = useTranslation()
  const [article, setArticle] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMountedRef = useRef(true)
  const language = i18n.language || 'fr'
  const defaultArticleImage = '/assets/blog/default-generic.svg'
  const fetchWithTimeout = async (resource, options = {}, timeoutMs = 8000) => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    try {
      return await fetch(resource, { ...options, signal: controller.signal })
    } finally {
      clearTimeout(timer)
    }
  }
  const withTimeout = (promise, timeoutMs = 10000, message = 'Timeout de chargement') =>
    Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error(message)), timeoutMs))
    ])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug, language])

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

  const fetchMarkdownContent = async (slugToFetch, lang = language) => {
    const basePath = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '')
    
    // D'abord, essayer de charger depuis articles-seo/
    // Charger en parallèle pour améliorer les performances
    const promises = []
    for (let i = 1; i <= 60; i++) {
      const articleNum = i.toString().padStart(2, '0')
      const metadataPath = `${basePath}/articles-seo/article-${articleNum}/metadata.json`
      
      promises.push(
        fetchWithTimeout(metadataPath, { cache: 'default' }, 6000)
          .then(async (metadataResponse) => {
            if (!metadataResponse.ok) return null
            try {
              const metadata = await metadataResponse.json()
              const slugKey = `slug_${lang}`
              
              if (metadata[slugKey] === slugToFetch) {
                // Charger le contenu markdown dans la bonne langue
                const markdownPath = `${basePath}/articles-seo/article-${articleNum}/${lang}.md`
                const contentResponse = await fetchWithTimeout(markdownPath, { cache: 'default' }, 6000)
                
                if (contentResponse.ok) {
                  const text = await contentResponse.text()
                  
                  if (text.trim().startsWith('<!doctype') || text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
                    return null
                  }
                  
                  // Vérifier que ce n'est pas un placeholder
                  if (text.includes('[Contenu à compléter') || text.includes('Contenu à compléter')) {
                    throw new Error(`Article ${articleNum} contient un placeholder`)
                  }
                  
                  return text
                }
              }
              return null
            } catch (err) {
              return null
            }
          })
          .catch(() => null)
      )
    }
    
    // Attendre toutes les requêtes et retourner le premier résultat valide
    const results = await Promise.all(promises)
    for (const result of results) {
      if (result) {
        return result
      }
    }
    
    // Fallback sur les anciens chemins
    const candidatePaths = [
      `${basePath}/blog/${slugToFetch}.md`,
      `${basePath}/articles/${slugToFetch}.md`
    ]

    for (const path of candidatePaths) {
      try {
        const response = await fetchWithTimeout(path, { cache: 'no-cache' }, 6000)
        
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
        // Normaliser la langue (enlever les variantes)
        let normalizedLang = language
        if (normalizedLang.includes('-')) {
          normalizedLang = normalizedLang.split('-')[0]
        }
        if (!['fr', 'en', 'ar'].includes(normalizedLang)) {
          normalizedLang = 'fr'
        }
        
        let articleData = null
        try {
          articleData = await withTimeout(
            getArticleBySlug(slug, normalizedLang),
            10000,
            'Chargement de l\'article trop long'
          )
        } catch {
          // Plan B: si la résolution par slug est lente/instable, tenter via la liste d'articles.
          const allArticles = await withTimeout(
            getAllArticles(normalizedLang),
            8000,
            'Chargement alternatif trop long'
          )
          articleData = Array.isArray(allArticles)
            ? allArticles.find((a) => a?.slug === slug) || null
            : null
        }
        
        if (!isMountedRef.current) return
        
        if (articleData?.title) {
          trackArticleView(articleData.title)
        }

        if (!isMountedRef.current) return

        if (!articleData) {
          throw new Error('Article non trouvé')
        }

        // Toujours afficher une version minimale immédiatement pour éviter toute page blanche.
        const immediateContent = (articleData.content && articleData.content.trim().length > 0)
          ? articleData.content
          : `## ${articleData.title || slug}\n\n${articleData.description || t('blog.article_default', { defaultValue: 'Contenu en cours de mise a jour.' })}`

        setArticle(articleData)
        setContent(immediateContent)

        // Puis tenter d'enrichir avec le markdown complet en arrière-plan.
        if (!articleData.content || articleData.content.trim().length === 0) {
          try {
            const rawText = await fetchMarkdownContent(slug, normalizedLang)
            if (!isMountedRef.current) return
            const { frontMatter, body } = parseFrontMatter(rawText)

            if (body && body.trim().length > 0 && !body.trim().startsWith('<!') && !body.includes('Contenu à compléter')) {
              if (!articleData.image && frontMatter.image) {
                setArticle((prev) => prev ? { ...prev, image: frontMatter.image } : prev)
              }
              setContent(body)
            }
          } catch {
            // On garde le contenu minimal déjà affiché.
          }
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

  if (routeLang && !['fr', 'en', 'ar'].includes(routeLang)) {
    return <Navigate to={`/fr/blog/${slug}`} replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead page="blog-article" articleTitle={article.title} articleSlug={slug} />
      
      <main id="main-content">
        <article className="container mx-auto px-4 py-8 max-w-4xl" itemScope itemType="https://schema.org/Article">
        <Link 
          to={`${['fr','en','ar'].includes(language) ? `/${language}` : ''}/blog`} 
          className="text-primary-600 hover:underline mb-6 inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
          aria-label={t('blog.back_to_blog', { defaultValue: 'Retour au blog' })}
        >
          ← {t('blog.back_to_blog', { defaultValue: 'Retour au blog' })}
        </Link>

        <header className="mb-8">
          <div className="rounded-lg overflow-hidden mb-5 bg-gradient-to-br from-primary-100 to-primary-200">
            <OptimizedImage
              src={article.image || defaultArticleImage}
              alt={article.title}
              className="w-full h-72 object-cover"
              lazy={false}
              onError={(e) => {
                e.currentTarget.src = defaultArticleImage
              }}
            />
          </div>
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
            {Array.isArray(article.keywords) && article.keywords.length > 0 && article.keywords.slice(0, 3).map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </header>

        <section className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-primary-900 mb-2">
            {language === 'fr'
              ? 'Fiabilite et methode editoriale'
              : language === 'en'
              ? 'Reliability and editorial method'
              : 'الموثوقية والمنهجية التحريرية'}
          </h2>
          <p className="text-gray-700 mb-2">
            {language === 'fr'
              ? 'Article prepare par l equipe editoriale QuizOrientation, relu et mis a jour regulierement pour offrir des conseils pratiques.'
              : language === 'en'
              ? 'Article prepared by the QuizOrientation editorial team, reviewed and updated regularly to provide practical guidance.'
              : 'تم إعداد المقال من طرف فريق التحرير في QuizOrientation مع مراجعة وتحديث دوري لتقديم نصائح عملية.'}
          </p>
          <p className="text-gray-700">
            {language === 'fr'
              ? "Derniere mise a jour: " + new Date(article.date).toLocaleDateString('fr-FR')
              : language === 'en'
              ? "Last updated: " + new Date(article.date).toLocaleDateString('en-US')
              : "آخر تحديث: " + new Date(article.date).toLocaleDateString('ar-MA')}
          </p>
        </section>


        <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, href, children, ...props }) => {
                if (!href) return <span>{children}</span>
                
                // Corriger les liens vers le quiz (toutes les variantes)
                  if (href.includes('/quiz') || href.includes('quizorientation.online/quiz') || href === 'quiz') {
                  return (
                    <Link to="/" {...props} className="text-primary-600 hover:underline font-semibold">
                      {children}
                    </Link>
                  )
                }
                
                // Si c'est un lien interne (commence par / ou ne commence pas par http/https)
                if (href.startsWith('/') || (!href.startsWith('http://') && !href.startsWith('https://'))) {
                  // Liens internes vers le blog
                  if (href.startsWith('/blog/') || href.startsWith('blog/')) {
                    const langPrefix = ['fr', 'en', 'ar'].includes(language) ? `/${language}` : ''
                    const cleanHref = href.startsWith('/') ? href : `/${href}`
                    const finalHref = `${langPrefix}${cleanHref}`
                    return (
                      <Link to={finalHref} {...props} className="text-primary-600 hover:underline">
                        {children}
                      </Link>
                    )
                  }
                  // Autres liens internes
                  const langPrefix = ['fr', 'en', 'ar'].includes(language) ? `/${language}` : ''
                  const cleanHref = href.startsWith('/') ? href : `/${href}`
                  const finalHref = `${langPrefix}${cleanHref}`
                  return (
                    <Link to={finalHref} {...props} className="text-primary-600 hover:underline">
                      {children}
                    </Link>
                  )
                }
                
                // Liens externes
                return (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    {...props} 
                    className="text-primary-600 hover:underline"
                  >
                    {children}
                  </a>
                )
              }
            }}
          >
            {content && content.trim().length > 0
              ? content
              : `# ${article.title}\n\n${article.description || t('blog.article_default', { defaultValue: 'Contenu en cours de chargement.' })}`}
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
                {language === 'fr' ? 'Découvrez votre profil professionnel en 2 minutes avec notre quiz d\'orientation professionnelle.' : language === 'en' ? 'Discover your professional profile in 2 minutes with our career orientation quiz.' : 'اكتشف ملفك المهني في دقيقتين مع اختبار التوجيه المهني لدينا.'}
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

