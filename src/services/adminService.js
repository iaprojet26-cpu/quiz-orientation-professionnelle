import { supabase } from '../lib/supabase'

/**
 * Service pour gérer les articles de blog côté admin
 */

/**
 * Vérifier l'authentification admin
 */
export const checkAdminAuth = async (password) => {
  // Mot de passe stocké dans variable d'environnement
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
  
  if (password === adminPassword) {
    // Stocker la session dans localStorage
    localStorage.setItem('admin_authenticated', 'true')
    localStorage.setItem('admin_auth_time', Date.now().toString())
    return true
  }
  return false
}

/**
 * Vérifier si l'admin est authentifié
 */
export const isAdminAuthenticated = () => {
  const authenticated = localStorage.getItem('admin_authenticated')
  const authTime = localStorage.getItem('admin_auth_time')
  
  if (!authenticated || authenticated !== 'true') {
    return false
  }
  
  // Vérifier que la session n'est pas expirée (24 heures)
  const timeDiff = Date.now() - parseInt(authTime || '0')
  const hoursDiff = timeDiff / (1000 * 60 * 60)
  
  if (hoursDiff > 24) {
    logoutAdmin()
    return false
  }
  
  return true
}

/**
 * Déconnexion admin
 */
export const logoutAdmin = () => {
  localStorage.removeItem('admin_authenticated')
  localStorage.removeItem('admin_auth_time')
}

/**
 * Obtenir tous les articles (admin - inclut non publiés)
 */
export const getAllArticlesAdmin = async () => {
  if (!supabase) {
    console.error('Supabase non configuré')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('blog_articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur lors du chargement des articles:', error)
    return []
  }
}

/**
 * Obtenir un article par son ID (admin)
 */
export const getArticleById = async (id) => {
  if (!supabase) {
    console.error('Supabase non configuré')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('blog_articles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erreur lors du chargement de l\'article:', error)
    return null
  }
}

/**
 * Créer un nouvel article
 */
export const createArticle = async (articleData) => {
  if (!supabase) {
    console.error('Supabase non configuré')
    return null
  }

  try {
    // Générer le slug si non fourni
    if (!articleData.slug && articleData.title_fr) {
      articleData.slug = articleData.title_fr
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    // Si l'article est publié, définir published_at
    if (articleData.published && !articleData.published_at) {
      articleData.published_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('blog_articles')
      .insert(articleData)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error)
    throw error
  }
}

/**
 * Mettre à jour un article
 */
export const updateArticle = async (id, articleData) => {
  if (!supabase) {
    console.error('Supabase non configuré')
    return null
  }

  try {
    // Si l'article passe de non publié à publié, définir published_at
    if (articleData.published && !articleData.published_at) {
      const currentArticle = await getArticleById(id)
      if (currentArticle && !currentArticle.published_at) {
        articleData.published_at = new Date().toISOString()
      }
    }

    const { data, error } = await supabase
      .from('blog_articles')
      .update(articleData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error)
    throw error
  }
}

/**
 * Supprimer un article
 */
export const deleteArticle = async (id) => {
  if (!supabase) {
    console.error('Supabase non configuré')
    return false
  }

  try {
    const { error } = await supabase
      .from('blog_articles')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error)
    return false
  }
}

/**
 * Générer le sitemap dynamiquement
 */
export const generateSitemap = async () => {
  if (!supabase) {
    console.error('Supabase non configuré')
    return null
  }

  try {
    // Récupérer tous les articles publiés
    const { data: articles, error } = await supabase
      .from('blog_articles')
      .select('slug, updated_at')
      .eq('published', true)
      .order('updated_at', { ascending: false })

    if (error) throw error

    const today = new Date().toISOString().split('T')[0]
    
    // URLs de base
    const baseUrls = [
      { loc: 'https://quizorientation.online/fr/', priority: '1.0', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/en/', priority: '1.0', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/ar/', priority: '1.0', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/fr/quiz', priority: '0.9', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/en/quiz', priority: '0.9', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/ar/quiz', priority: '0.9', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/fr/blog', priority: '0.7', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/en/blog', priority: '0.7', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/ar/blog', priority: '0.7', changefreq: 'weekly' }
    ]

    // URLs des articles
    const articleUrls = []
    articles.forEach(article => {
      const lastmod = article.updated_at ? new Date(article.updated_at).toISOString().split('T')[0] : today
      ;['fr', 'en', 'ar'].forEach(lang => {
        articleUrls.push({
          loc: `https://quizorientation.online/${lang}/blog/${article.slug}`,
          lastmod,
          priority: '0.8',
          changefreq: 'monthly'
        })
      })
    })

    // Générer le XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`

    // Ajouter les URLs de base
    baseUrls.forEach(url => {
      xml += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`
    })

    // Ajouter les URLs des articles
    articleUrls.forEach(url => {
      xml += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`
    })

    xml += `</urlset>`

    return xml
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error)
    return null
  }
}

// ============================================
// GESTION DES MÉTIERS (JOBS)
// ============================================

/**
 * Obtenir tous les profils (pour sélection dans formulaire métier)
 */
export const getAllProfiles = async () => {
  if (!supabase) {
    console.error('Supabase non configuré')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, nom, nom_en, nom_ar')
      .order('nom', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur lors du chargement des profils:', error)
    return []
  }
}

/**
 * Obtenir tous les métiers (admin)
 */
export const getAllJobsAdmin = async () => {
  if (!supabase) {
    console.error('Supabase non configuré')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        profiles:profil_id (
          id,
          nom,
          nom_en,
          nom_ar
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur lors du chargement des métiers:', error)
    return []
  }
}

/**
 * Obtenir un métier par son ID (admin)
 */
export const getJobById = async (id) => {
  if (!supabase) {
    console.error('Supabase non configuré')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        profiles:profil_id (
          id,
          nom,
          nom_en,
          nom_ar
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erreur lors du chargement du métier:', error)
    return null
  }
}

/**
 * Créer un nouveau métier
 */
export const createJob = async (jobData) => {
  if (!supabase) {
    console.error('Supabase non configuré')
    return null
  }

  try {
    // Convertir les compétences et formations en arrays si ce sont des strings
    if (typeof jobData.competences === 'string') {
      jobData.competences = jobData.competences.split(',').map(c => c.trim()).filter(c => c)
    }
    if (typeof jobData.competences_en === 'string') {
      jobData.competences_en = jobData.competences_en.split(',').map(c => c.trim()).filter(c => c)
    }
    if (typeof jobData.competences_ar === 'string') {
      jobData.competences_ar = jobData.competences_ar.split(',').map(c => c.trim()).filter(c => c)
    }
    if (typeof jobData.formations === 'string') {
      jobData.formations = jobData.formations.split(',').map(f => f.trim()).filter(f => f)
    }
    if (typeof jobData.formations_en === 'string') {
      jobData.formations_en = jobData.formations_en.split(',').map(f => f.trim()).filter(f => f)
    }
    if (typeof jobData.formations_ar === 'string') {
      jobData.formations_ar = jobData.formations_ar.split(',').map(f => f.trim()).filter(f => f)
    }

    const { data, error } = await supabase
      .from('jobs')
      .insert(jobData)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erreur lors de la création du métier:', error)
    throw error
  }
}

/**
 * Mettre à jour un métier
 */
export const updateJob = async (id, jobData) => {
  if (!supabase) {
    console.error('Supabase non configuré')
    return null
  }

  try {
    // Convertir les compétences et formations en arrays si ce sont des strings
    if (typeof jobData.competences === 'string') {
      jobData.competences = jobData.competences.split(',').map(c => c.trim()).filter(c => c)
    }
    if (typeof jobData.competences_en === 'string') {
      jobData.competences_en = jobData.competences_en.split(',').map(c => c.trim()).filter(c => c)
    }
    if (typeof jobData.competences_ar === 'string') {
      jobData.competences_ar = jobData.competences_ar.split(',').map(c => c.trim()).filter(c => c)
    }
    if (typeof jobData.formations === 'string') {
      jobData.formations = jobData.formations.split(',').map(f => f.trim()).filter(f => f)
    }
    if (typeof jobData.formations_en === 'string') {
      jobData.formations_en = jobData.formations_en.split(',').map(f => f.trim()).filter(f => f)
    }
    if (typeof jobData.formations_ar === 'string') {
      jobData.formations_ar = jobData.formations_ar.split(',').map(f => f.trim()).filter(f => f)
    }

    const { data, error } = await supabase
      .from('jobs')
      .update(jobData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erreur lors de la mise à jour du métier:', error)
    throw error
  }
}

/**
 * Supprimer un métier
 */
export const deleteJob = async (id) => {
  if (!supabase) {
    console.error('Supabase non configuré')
    return false
  }

  try {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Erreur lors de la suppression du métier:', error)
    return false
  }
}

