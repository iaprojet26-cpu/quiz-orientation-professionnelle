import { useEffect, useState } from 'react'
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
    const candidatePaths = [
      `${basePath}/blog/${slugToFetch}.md`,
      `${basePath}/articles/${slugToFetch}.md`
    ]

    console.log('🔍 Tentative de chargement markdown pour:', slugToFetch)
    console.log('📁 Chemins testés:', candidatePaths)

    for (const path of candidatePaths) {
      try {
        console.log('📥 Fetch:', path)
        const response = await fetch(path, { cache: 'no-cache' })
        console.log('📊 Réponse:', response.status, response.statusText, response.url)
        
        if (response.ok) {
          const text = await response.text()
          console.log('📄 Contenu reçu (premiers 100 caractères):', text.substring(0, 100))
          
          // Vérifier que c'est bien du markdown et pas de l'HTML (index.html)
          if (text.trim().startsWith('<!doctype') || text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
            console.warn('⚠️ Réponse HTML reçue au lieu de markdown pour:', path)
            continue
          }
          // Vérifier que le contenu commence par --- (front matter) ou # (titre markdown)
          if (text.trim().startsWith('---') || text.trim().startsWith('#')) {
            console.log('✅ Markdown chargé avec succès depuis:', path)
            return text
          }
          console.warn('⚠️ Contenu ne semble pas être du markdown valide pour:', path)
        } else {
          console.warn('⚠️ Réponse non OK:', response.status, path)
        }
      } catch (err) {
        console.error('❌ Échec chargement markdown:', path, err)
      }
    }

    throw new Error(`Article markdown introuvable pour: ${slugToFetch}`)
  }

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true)
      setError(null)
      
      console.log('🚀 Début chargement article:', slug, 'langue:', language)
      
      try {
        console.log('📚 Appel getArticleBySlug...')
        let articleData = await getArticleBySlug(slug, language)
        console.log('📚 Résultat getArticleBySlug:', articleData ? 'Article trouvé' : 'Article non trouvé')
        
        let markdownContent = ''

        if (articleData?.title) {
          trackArticleView(articleData.title)
        }

        if (!articleData || !articleData.content) {
          console.log('📝 Pas de contenu dans articleData, tentative chargement markdown...')
          // Charger le fichier markdown en fallback
          try {
            const rawText = await fetchMarkdownContent(slug)
            console.log('✅ Markdown brut chargé, longueur:', rawText.length)
            const { frontMatter, body } = parseFrontMatter(rawText)
            console.log('📋 Front matter:', Object.keys(frontMatter))
            console.log('📄 Body longueur:', body.length)
            
            // Vérifier que le body n'est pas vide et contient du contenu valide
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
                console.log('✅ Article créé depuis front matter:', articleData.title)
              }
            } else {
              console.error('❌ Contenu markdown invalide ou vide pour:', slug)
              throw new Error('Contenu markdown invalide')
            }
          } catch (fetchError) {
            console.error('❌ Erreur lors du chargement du markdown:', fetchError)
            // Si le markdown ne peut pas être chargé, utiliser les métadonnées du service
            if (articleData) {
              console.log('⚠️ Utilisation du fallback avec métadonnées du service')
              markdownContent = `# ${articleData.title}\n\n${articleData.description || 'Contenu en cours de rédaction.'}\n\n*Le contenu complet de cet article sera bientôt disponible.*`
            } else {
              // Si même articleData est null, créer un article minimal
              console.log('⚠️ Création article minimal depuis slug')
              articleData = {
                slug,
                title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                description: 'Article en cours de chargement...',
                date: new Date().toISOString(),
                image: null,
                keywords: [],
                category: 'blog'
              }
              markdownContent = `# ${articleData.title}\n\n*Le contenu de cet article sera bientôt disponible.*`
            }
          }
        } else {
          console.log('✅ Contenu trouvé dans articleData')
          markdownContent = articleData.content
        }

        if (!articleData) {
          throw new Error('Article non trouvé')
        }

        console.log('✅ Article final:', articleData.title)
        setArticle(articleData)
        // S'assurer que le contenu est du markdown valide
        if (markdownContent && !markdownContent.trim().startsWith('<!')) {
          setContent(markdownContent)
          console.log('✅ Contenu markdown défini, longueur:', markdownContent.length)
        } else {
          console.error('⚠️ Contenu invalide détecté, utilisation du fallback')
          setContent(`# ${articleData?.title || 'Article'}\n\n${articleData?.description || 'Contenu en cours de rédaction.'}`)
        }
      } catch (error) {
        console.error('❌ Erreur de chargement article:', error)
        setError(error.message || 'Erreur lors du chargement de l\'article')
        setArticle(null)
        setContent('')
      } finally {
        setLoading(false)
        console.log('🏁 Fin chargement article')
      }
    }
    loadArticle()
  }, [slug, language])

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error ? 'Erreur de chargement' : 'Article non trouvé'}
          </h1>
          {error && (
            <p className="text-gray-600 mb-4">{error}</p>
          )}
          <Link 
            to="/blog" 
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  // Ajouter le schema Article pour SEO
  useEffect(() => {
    if (article) {
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
    }
  }, [article])

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
        <div className="mb-8 flex justify-center">
          <MonetagAdZone zoneId="10282723" position="top" className="w-full max-w-4xl" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content || 'Chargement du contenu...'}
          </ReactMarkdown>
        </div>

        {/* Zone publicitaire Monetag - Après le contenu */}
        <div className="my-8 flex justify-center">
          <MonetagAdZone zoneId="10282723" position="bottom" className="w-full max-w-4xl" />
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

