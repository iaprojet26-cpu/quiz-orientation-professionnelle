import { supabase } from '../lib/supabase'

/**
 * Service pour gérer les articles de blog côté admin
 */

/**
 * Vérifier l'authentification admin
 */
export const checkAdminAuth = async (password) => {
  // Mot de passe stocké dans variable d'environnement.
  // On trim pour éviter les erreurs causées par des espaces invisibles.
  const configuredPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'admin123').trim()
  const providedPassword = (password || '').trim()

  if (providedPassword && providedPassword === configuredPassword) {
    // Stocker la session dans localStorage
    localStorage.setItem('admin_authenticated', 'true')
    localStorage.setItem('admin_auth_time', Date.now().toString())
    return true
  }
  return false
}

/**
 * Authentification de récupération via token d'urgence.
 * Utilisation: /admin/login?admin_token=VOTRE_TOKEN
 */
export const checkAdminRecoveryToken = (token) => {
  const configuredToken = (import.meta.env.VITE_ADMIN_RECOVERY_TOKEN || '').trim()
  const providedToken = (token || '').trim()

  if (!configuredToken || !providedToken) return false

  if (providedToken === configuredToken) {
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

    // Récupérer le contenu Hub publié/actif
    const [careerPathsRes, opportunitiesRes, studyProgramsRes, careerGuidesRes] = await Promise.all([
      supabase.from('career_paths').select('slug, updated_at').eq('active', true).order('updated_at', { ascending: false }),
      supabase.from('opportunities').select('id, updated_at').eq('is_active', true).order('updated_at', { ascending: false }),
      supabase.from('study_programs').select('slug, updated_at').eq('is_active', true).order('updated_at', { ascending: false }),
      supabase.from('career_guides').select('slug, updated_at').eq('is_published', true).order('updated_at', { ascending: false })
    ])

    if (careerPathsRes.error) throw careerPathsRes.error
    if (opportunitiesRes.error) throw opportunitiesRes.error
    if (studyProgramsRes.error) throw studyProgramsRes.error
    if (careerGuidesRes.error) throw careerGuidesRes.error

    const careerPaths = careerPathsRes.data || []
    const opportunities = opportunitiesRes.data || []
    const studyPrograms = studyProgramsRes.data || []
    const careerGuides = careerGuidesRes.data || []

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
      { loc: 'https://quizorientation.online/ar/blog', priority: '0.7', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/fr/career-paths', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/en/career-paths', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/ar/career-paths', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/fr/opportunities', priority: '0.8', changefreq: 'daily' },
      { loc: 'https://quizorientation.online/en/opportunities', priority: '0.8', changefreq: 'daily' },
      { loc: 'https://quizorientation.online/ar/opportunities', priority: '0.8', changefreq: 'daily' },
      { loc: 'https://quizorientation.online/fr/study-in-morocco', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/en/study-in-morocco', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/ar/study-in-morocco', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/fr/career-guides', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/en/career-guides', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/ar/career-guides', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/fr/career-matching', priority: '0.7', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/en/career-matching', priority: '0.7', changefreq: 'weekly' },
      { loc: 'https://quizorientation.online/ar/career-matching', priority: '0.7', changefreq: 'weekly' }
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

    // URLs détail du hub
    const hubDetailUrls = []
    careerPaths.forEach((item) => {
      const lastmod = item.updated_at ? new Date(item.updated_at).toISOString().split('T')[0] : today
      ;['fr', 'en', 'ar'].forEach((lang) => {
        hubDetailUrls.push({
          loc: `https://quizorientation.online/${lang}/career-paths#${item.slug}`,
          lastmod,
          priority: '0.7',
          changefreq: 'monthly'
        })
      })
    })
    studyPrograms.forEach((item) => {
      const lastmod = item.updated_at ? new Date(item.updated_at).toISOString().split('T')[0] : today
      ;['fr', 'en', 'ar'].forEach((lang) => {
        hubDetailUrls.push({
          loc: `https://quizorientation.online/${lang}/study-in-morocco#${item.slug}`,
          lastmod,
          priority: '0.7',
          changefreq: 'monthly'
        })
      })
    })
    careerGuides.forEach((item) => {
      const lastmod = item.updated_at ? new Date(item.updated_at).toISOString().split('T')[0] : today
      ;['fr', 'en', 'ar'].forEach((lang) => {
        hubDetailUrls.push({
          loc: `https://quizorientation.online/${lang}/career-guides#${item.slug}`,
          lastmod,
          priority: '0.7',
          changefreq: 'monthly'
        })
      })
    })
    opportunities.forEach((item) => {
      const lastmod = item.updated_at ? new Date(item.updated_at).toISOString().split('T')[0] : today
      ;['fr', 'en', 'ar'].forEach((lang) => {
        hubDetailUrls.push({
          loc: `https://quizorientation.online/${lang}/opportunities#op-${item.id}`,
          lastmod,
          priority: '0.7',
          changefreq: 'weekly'
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

    // Ajouter les URLs detail hub
    hubDetailUrls.forEach(url => {
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

// ============================================
// HUB CONTENT - CAREER PATHS
// ============================================

const parseCsvToArray = (value) => {
  if (Array.isArray(value)) return value
  if (!value || typeof value !== 'string') return []
  return value.split(',').map((item) => item.trim()).filter(Boolean)
}

export const getAllCareerPathsAdmin = async () => {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('career_paths')
      .select(`
        *,
        career_path_translations (*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur chargement career paths:', error)
    throw error
  }
}

export const createCareerPath = async (formData) => {
  if (!supabase) return null
  try {
    const baseData = {
      slug: formData.slug,
      level_group: formData.level_group || null,
      salary_min_monthly: formData.salary_min_monthly ? parseInt(formData.salary_min_monthly, 10) : null,
      salary_max_monthly: formData.salary_max_monthly ? parseInt(formData.salary_max_monthly, 10) : null,
      active: formData.active !== false
    }

    const { data: created, error: createError } = await supabase
      .from('career_paths')
      .insert(baseData)
      .select()
      .single()
    if (createError) throw createError

    const translations = [
      {
        career_path_id: created.id,
        language: 'fr',
        title: formData.title_fr,
        short_description: formData.short_description_fr,
        long_description: formData.long_description_fr || '',
        skills: parseCsvToArray(formData.skills_fr),
        education_paths: parseCsvToArray(formData.education_paths_fr),
        opportunities_summary: formData.opportunities_summary_fr || ''
      },
      {
        career_path_id: created.id,
        language: 'en',
        title: formData.title_en || formData.title_fr,
        short_description: formData.short_description_en || formData.short_description_fr,
        long_description: formData.long_description_en || '',
        skills: parseCsvToArray(formData.skills_en),
        education_paths: parseCsvToArray(formData.education_paths_en),
        opportunities_summary: formData.opportunities_summary_en || ''
      },
      {
        career_path_id: created.id,
        language: 'ar',
        title: formData.title_ar || formData.title_fr,
        short_description: formData.short_description_ar || formData.short_description_fr,
        long_description: formData.long_description_ar || '',
        skills: parseCsvToArray(formData.skills_ar),
        education_paths: parseCsvToArray(formData.education_paths_ar),
        opportunities_summary: formData.opportunities_summary_ar || ''
      }
    ]

    const { error: trError } = await supabase.from('career_path_translations').insert(translations)
    if (trError) throw trError
    return created
  } catch (error) {
    console.error('Erreur creation career path:', error)
    throw error
  }
}

export const updateCareerPath = async (id, formData) => {
  if (!supabase) return null
  try {
    const baseData = {
      slug: formData.slug,
      level_group: formData.level_group || null,
      salary_min_monthly: formData.salary_min_monthly ? parseInt(formData.salary_min_monthly, 10) : null,
      salary_max_monthly: formData.salary_max_monthly ? parseInt(formData.salary_max_monthly, 10) : null,
      active: formData.active !== false
    }
    const { error: upError } = await supabase.from('career_paths').update(baseData).eq('id', id)
    if (upError) throw upError

    const translations = [
      ['fr', formData.title_fr, formData.short_description_fr, formData.long_description_fr, formData.skills_fr, formData.education_paths_fr, formData.opportunities_summary_fr],
      ['en', formData.title_en || formData.title_fr, formData.short_description_en || formData.short_description_fr, formData.long_description_en, formData.skills_en, formData.education_paths_en, formData.opportunities_summary_en],
      ['ar', formData.title_ar || formData.title_fr, formData.short_description_ar || formData.short_description_fr, formData.long_description_ar, formData.skills_ar, formData.education_paths_ar, formData.opportunities_summary_ar]
    ]

    for (const [language, title, shortDescription, longDescription, skills, educationPaths, opportunitiesSummary] of translations) {
      const { error } = await supabase.from('career_path_translations').upsert({
        career_path_id: id,
        language,
        title,
        short_description: shortDescription,
        long_description: longDescription || '',
        skills: parseCsvToArray(skills),
        education_paths: parseCsvToArray(educationPaths),
        opportunities_summary: opportunitiesSummary || ''
      }, { onConflict: 'career_path_id,language' })
      if (error) throw error
    }
    return true
  } catch (error) {
    console.error('Erreur update career path:', error)
    throw error
  }
}

export const deleteCareerPath = async (id) => {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('career_paths').delete().eq('id', id)
    if (error) throw error
    return true
  } catch (error) {
    console.error('Erreur suppression career path:', error)
    return false
  }
}

// ============================================
// HUB CONTENT - OPPORTUNITIES
// ============================================

export const getAllOpportunitiesAdmin = async () => {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select(`
        *,
        opportunity_translations (*)
      `)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur chargement opportunities:', error)
    throw error
  }
}

export const createOpportunity = async (formData) => {
  if (!supabase) return null
  try {
    const baseData = {
      type: formData.type,
      company_name: formData.company_name || null,
      city: formData.city || null,
      country: formData.country || 'Morocco',
      source_url: formData.source_url || null,
      application_deadline: formData.application_deadline || null,
      is_remote: !!formData.is_remote,
      is_active: formData.is_active !== false
    }
    const { data: created, error: createError } = await supabase
      .from('opportunities')
      .insert(baseData)
      .select()
      .single()
    if (createError) throw createError

    const translations = [
      {
        opportunity_id: created.id,
        language: 'fr',
        title: formData.title_fr,
        description: formData.description_fr,
        requirements: parseCsvToArray(formData.requirements_fr),
        application_steps: parseCsvToArray(formData.application_steps_fr)
      },
      {
        opportunity_id: created.id,
        language: 'en',
        title: formData.title_en || formData.title_fr,
        description: formData.description_en || formData.description_fr,
        requirements: parseCsvToArray(formData.requirements_en),
        application_steps: parseCsvToArray(formData.application_steps_en)
      },
      {
        opportunity_id: created.id,
        language: 'ar',
        title: formData.title_ar || formData.title_fr,
        description: formData.description_ar || formData.description_fr,
        requirements: parseCsvToArray(formData.requirements_ar),
        application_steps: parseCsvToArray(formData.application_steps_ar)
      }
    ]
    const { error: trError } = await supabase.from('opportunity_translations').insert(translations)
    if (trError) throw trError
    return created
  } catch (error) {
    console.error('Erreur creation opportunity:', error)
    throw error
  }
}

export const updateOpportunity = async (id, formData) => {
  if (!supabase) return null
  try {
    const baseData = {
      type: formData.type,
      company_name: formData.company_name || null,
      city: formData.city || null,
      country: formData.country || 'Morocco',
      source_url: formData.source_url || null,
      application_deadline: formData.application_deadline || null,
      is_remote: !!formData.is_remote,
      is_active: formData.is_active !== false
    }
    const { error: upError } = await supabase.from('opportunities').update(baseData).eq('id', id)
    if (upError) throw upError

    const translations = [
      ['fr', formData.title_fr, formData.description_fr, formData.requirements_fr, formData.application_steps_fr],
      ['en', formData.title_en || formData.title_fr, formData.description_en || formData.description_fr, formData.requirements_en, formData.application_steps_en],
      ['ar', formData.title_ar || formData.title_fr, formData.description_ar || formData.description_fr, formData.requirements_ar, formData.application_steps_ar]
    ]
    for (const [language, title, description, requirements, applicationSteps] of translations) {
      const { error } = await supabase.from('opportunity_translations').upsert({
        opportunity_id: id,
        language,
        title,
        description,
        requirements: parseCsvToArray(requirements),
        application_steps: parseCsvToArray(applicationSteps)
      }, { onConflict: 'opportunity_id,language' })
      if (error) throw error
    }
    return true
  } catch (error) {
    console.error('Erreur update opportunity:', error)
    throw error
  }
}

export const deleteOpportunity = async (id) => {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('opportunities').delete().eq('id', id)
    if (error) throw error
    return true
  } catch (error) {
    console.error('Erreur suppression opportunity:', error)
    return false
  }
}

// ============================================
// HUB CONTENT - STUDY PROGRAMS
// ============================================

export const getAllStudyProgramsAdmin = async () => {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('study_programs')
      .select(`
        *,
        study_program_translations (*)
      `)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur chargement study programs:', error)
    throw error
  }
}

export const createStudyProgram = async (formData) => {
  if (!supabase) return null
  try {
    const { data: created, error: createError } = await supabase
      .from('study_programs')
      .insert({
        slug: formData.slug,
        institution_name: formData.institution_name,
        city: formData.city || null,
        degree_level: formData.degree_level || null,
        duration_months: formData.duration_months ? parseInt(formData.duration_months, 10) : null,
        is_active: formData.is_active !== false
      })
      .select()
      .single()
    if (createError) throw createError

    const translations = [
      ['fr', formData.title_fr, formData.description_fr, formData.admission_requirements_fr, formData.outcomes_fr],
      ['en', formData.title_en || formData.title_fr, formData.description_en || formData.description_fr, formData.admission_requirements_en, formData.outcomes_en],
      ['ar', formData.title_ar || formData.title_fr, formData.description_ar || formData.description_fr, formData.admission_requirements_ar, formData.outcomes_ar]
    ].map(([language, title, description, admissionRequirements, outcomes]) => ({
      study_program_id: created.id,
      language,
      title,
      description,
      admission_requirements: parseCsvToArray(admissionRequirements),
      outcomes: parseCsvToArray(outcomes)
    }))

    const { error: trError } = await supabase.from('study_program_translations').insert(translations)
    if (trError) throw trError
    return created
  } catch (error) {
    console.error('Erreur creation study program:', error)
    throw error
  }
}

export const updateStudyProgram = async (id, formData) => {
  if (!supabase) return null
  try {
    const { error: upError } = await supabase
      .from('study_programs')
      .update({
        slug: formData.slug,
        institution_name: formData.institution_name,
        city: formData.city || null,
        degree_level: formData.degree_level || null,
        duration_months: formData.duration_months ? parseInt(formData.duration_months, 10) : null,
        is_active: formData.is_active !== false
      })
      .eq('id', id)
    if (upError) throw upError

    const translations = [
      ['fr', formData.title_fr, formData.description_fr, formData.admission_requirements_fr, formData.outcomes_fr],
      ['en', formData.title_en || formData.title_fr, formData.description_en || formData.description_fr, formData.admission_requirements_en, formData.outcomes_en],
      ['ar', formData.title_ar || formData.title_fr, formData.description_ar || formData.description_fr, formData.admission_requirements_ar, formData.outcomes_ar]
    ]
    for (const [language, title, description, admissionRequirements, outcomes] of translations) {
      const { error } = await supabase.from('study_program_translations').upsert({
        study_program_id: id,
        language,
        title,
        description,
        admission_requirements: parseCsvToArray(admissionRequirements),
        outcomes: parseCsvToArray(outcomes)
      }, { onConflict: 'study_program_id,language' })
      if (error) throw error
    }
    return true
  } catch (error) {
    console.error('Erreur update study program:', error)
    throw error
  }
}

export const deleteStudyProgram = async (id) => {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('study_programs').delete().eq('id', id)
    if (error) throw error
    return true
  } catch (error) {
    console.error('Erreur suppression study program:', error)
    return false
  }
}

// ============================================
// HUB CONTENT - CAREER GUIDES
// ============================================

export const getAllCareerGuidesAdmin = async () => {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('career_guides')
      .select(`
        *,
        career_guide_translations (*)
      `)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur chargement career guides:', error)
    throw error
  }
}

export const createCareerGuide = async (formData) => {
  if (!supabase) return null
  try {
    const isPublished = formData.is_published !== false
    const { data: created, error: createError } = await supabase
      .from('career_guides')
      .insert({
        slug: formData.slug,
        category: formData.category || 'skills',
        reading_minutes: formData.reading_minutes ? parseInt(formData.reading_minutes, 10) : 6,
        is_published: isPublished,
        published_at: isPublished ? (formData.published_at || new Date().toISOString()) : null
      })
      .select()
      .single()
    if (createError) throw createError

    const translations = [
      ['fr', formData.title_fr, formData.summary_fr, formData.body_markdown_fr, formData.seo_title_fr, formData.seo_description_fr],
      ['en', formData.title_en || formData.title_fr, formData.summary_en || formData.summary_fr, formData.body_markdown_en || '', formData.seo_title_en, formData.seo_description_en],
      ['ar', formData.title_ar || formData.title_fr, formData.summary_ar || formData.summary_fr, formData.body_markdown_ar || '', formData.seo_title_ar, formData.seo_description_ar]
    ].map(([language, title, summary, bodyMarkdown, seoTitle, seoDescription]) => ({
      career_guide_id: created.id,
      language,
      title,
      summary,
      body_markdown: bodyMarkdown || '',
      seo_title: seoTitle || null,
      seo_description: seoDescription || null
    }))

    const { error: trError } = await supabase.from('career_guide_translations').insert(translations)
    if (trError) throw trError
    return created
  } catch (error) {
    console.error('Erreur creation career guide:', error)
    throw error
  }
}

export const updateCareerGuide = async (id, formData) => {
  if (!supabase) return null
  try {
    const isPublished = formData.is_published !== false
    const { error: upError } = await supabase
      .from('career_guides')
      .update({
        slug: formData.slug,
        category: formData.category || 'skills',
        reading_minutes: formData.reading_minutes ? parseInt(formData.reading_minutes, 10) : 6,
        is_published: isPublished,
        published_at: isPublished ? (formData.published_at || new Date().toISOString()) : null
      })
      .eq('id', id)
    if (upError) throw upError

    const translations = [
      ['fr', formData.title_fr, formData.summary_fr, formData.body_markdown_fr, formData.seo_title_fr, formData.seo_description_fr],
      ['en', formData.title_en || formData.title_fr, formData.summary_en || formData.summary_fr, formData.body_markdown_en || '', formData.seo_title_en, formData.seo_description_en],
      ['ar', formData.title_ar || formData.title_fr, formData.summary_ar || formData.summary_fr, formData.body_markdown_ar || '', formData.seo_title_ar, formData.seo_description_ar]
    ]
    for (const [language, title, summary, bodyMarkdown, seoTitle, seoDescription] of translations) {
      const { error } = await supabase.from('career_guide_translations').upsert({
        career_guide_id: id,
        language,
        title,
        summary,
        body_markdown: bodyMarkdown || '',
        seo_title: seoTitle || null,
        seo_description: seoDescription || null
      }, { onConflict: 'career_guide_id,language' })
      if (error) throw error
    }
    return true
  } catch (error) {
    console.error('Erreur update career guide:', error)
    throw error
  }
}

export const deleteCareerGuide = async (id) => {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('career_guides').delete().eq('id', id)
    if (error) throw error
    return true
  } catch (error) {
    console.error('Erreur suppression career guide:', error)
    return false
  }
}

