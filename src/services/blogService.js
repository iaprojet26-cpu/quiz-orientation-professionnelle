/**
 * Service pour gérer les articles de blog
 * Utilise Supabase si disponible, sinon fallback sur données statiques
 */

import { supabase } from '../lib/supabase'

// Articles statiques (fallback si Supabase non disponible)
const staticArticles = [
  {
    slug: 'competences-cles-2025',
    title: {
      fr: 'Compétences Clés à Maîtriser en 2025',
      en: 'Key Skills to Master in 2025',
      ar: 'المهارات الأساسية لإتقانها في 2025'
    },
    description: {
      fr: 'Identifiez les compétences techniques et soft skills indispensables en 2025 pour booster votre employabilité et attirer les recruteurs.',
      en: 'Identify the technical and soft skills you need in 2025 to boost your employability and attract recruiters.',
      ar: 'اكتشف المهارات التقنية والناعمة الضرورية في عام 2025 لتعزيز قابليتك للتوظيف وجذب أصحاب العمل.'
    },
    date: '2025-11-07',
    image: '/assets/blog/competences-2025.webp',
    keywords: {
      fr: ['compétences 2025', 'employabilité', 'soft skills', 'métiers du futur'],
      en: ['skills 2025', 'employability', 'soft skills', 'future jobs'],
      ar: ['مهارات 2025', 'قابلية التوظيف', 'المهارات الناعمة', 'مهن المستقبل']
    },
    category: 'competences'
  },
  {
    slug: 'comment-choisir-sa-voie-professionnelle',
    title: {
      fr: 'Comment Choisir Sa Voie Professionnelle : Guide Complet 2025',
      en: 'How to Choose Your Career Path: Complete Guide 2025',
      ar: 'كيف تختار مسارك المهني: دليل شامل 2025'
    },
    description: {
      fr: 'Découvrez comment choisir votre voie professionnelle avec notre guide complet. Tests d\'orientation, conseils pratiques et étapes clés pour trouver le métier qui vous correspond.',
      en: 'Discover how to choose your career path with our complete guide. Orientation tests, practical advice and key steps to find the career that suits you.',
      ar: 'اكتشف كيفية اختيار مسارك المهني مع دليلنا الشامل. اختبارات التوجيه، النصائح العملية والخطوات الرئيسية للعثور على المهنة التي تناسبك.'
    },
    date: '2025-11-06',
    image: '/assets/blog/choisir-metier.webp',
    keywords: {
      fr: ['choisir voie professionnelle', 'orientation professionnelle', 'test métier'],
      en: ['choose career path', 'career orientation', 'career test'],
      ar: ['اختيار المسار المهني', 'التوجيه المهني', 'اختبار المهنة']
    },
    category: 'orientation'
  },
  {
    slug: '5-profils-professionnels-qui-vous-correspondent',
    title: {
      fr: '5 Profils Professionnels Qui Vous Correspondent : Lequel Êtes-Vous ?',
      en: '5 Professional Profiles That Match You: Which One Are You?',
      ar: '5 ملفات مهنية تناسبك: أيهم أنت؟'
    },
    description: {
      fr: 'Découvrez les 5 profils professionnels : Créatif, Technique, Social, Organisationnel et Entrepreneurial. Identifiez votre profil et les métiers associés.',
      en: 'Discover the 5 professional profiles: Creative, Technical, Social, Organizational and Entrepreneurial. Identify your profile and associated careers.',
      ar: 'اكتشف الملفات المهنية الخمسة: الإبداعي، التقني، الاجتماعي، التنظيمي والريادي. حدد ملفك والمهن المرتبطة به.'
    },
    date: '2025-11-05',
    image: '/assets/blog/profils-professionnels.webp',
    keywords: {
      fr: ['profil professionnel', 'profil créatif', 'test personnalité professionnelle'],
      en: ['professional profile', 'creative profile', 'personality career test'],
      ar: ['الملف المهني', 'الملف الإبداعي', 'اختبار شخصية المهنة']
    },
    category: 'profils'
  },
  {
    slug: 'metiers-davenir-2025-2030',
    title: {
      fr: 'Les Métiers d\'Avenir 2025-2030 : Secteurs Porteurs et Opportunités',
      en: 'Future Jobs 2025-2030: Growing Sectors and Opportunities',
      ar: 'مهن المستقبل 2025-2030: القطاعات النامية والفرص'
    },
    description: {
      fr: 'Découvrez les métiers d\'avenir pour 2025-2030. Secteurs en croissance, compétences recherchées et formations pour se préparer aux emplois de demain.',
      en: 'Discover future jobs for 2025-2030. Growing sectors, sought-after skills and training to prepare for tomorrow\'s jobs.',
      ar: 'اكتشف مهن المستقبل لعام 2025-2030. القطاعات النامية، المهارات المطلوبة والتدريب للاستعداد لوظائف الغد.'
    },
    date: '2025-11-04',
    image: '/assets/blog/metiers-avenir.webp',
    keywords: {
      fr: ['métiers d\'avenir', 'emplois 2025', 'secteurs porteurs'],
      en: ['future jobs', 'jobs 2025', 'growing sectors'],
      ar: ['مهن المستقبل', 'وظائف 2025', 'القطاعات النامية']
    },
    category: 'metiers'
  }
]

/**
 * Obtenir tous les articles (depuis Supabase ou fallback)
 */
export const getAllArticles = async (language = 'fr') => {
  // Essayer de charger depuis Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (!error && data && data.length > 0) {
        return data.map(article => ({
          slug: article.slug,
          title: article[`title_${language}`] || article.title_fr,
          description: article[`description_${language}`] || article.description_fr,
          date: article.published_at || article.created_at,
          image: article.image,
          keywords: article[`keywords_${language}`] || article.keywords_fr || [],
          category: article.category
        }))
      }
    } catch (error) {
      console.error('Erreur lors du chargement des articles depuis Supabase:', error)
    }
  }

  // Fallback sur articles statiques
  return staticArticles.map(article => ({
    slug: article.slug,
    title: article.title[language] || article.title.fr,
    description: article.description[language] || article.description.fr,
    date: article.date,
    image: article.image,
    keywords: article.keywords[language] || article.keywords.fr,
    category: article.category
  }))
}

/**
 * Obtenir un article par son slug (depuis Supabase ou fallback)
 */
export const getArticleBySlug = async (slug, language = 'fr') => {
  // Essayer de charger depuis Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (!error && data) {
        return {
          slug: data.slug,
          title: data[`title_${language}`] || data.title_fr,
          description: data[`description_${language}`] || data.description_fr,
          date: data.published_at || data.created_at,
          image: data.image,
          keywords: data[`keywords_${language}`] || data.keywords_fr || [],
          category: data.category,
          content: data[`content_${language}`] || data.content_fr || ''
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'article depuis Supabase:', error)
    }
  }

  // Fallback sur articles statiques
  const article = staticArticles.find(a => a.slug === slug)
  if (!article) return null

  return {
    slug: article.slug,
    title: article.title[language] || article.title.fr,
    description: article.description[language] || article.description.fr,
    date: article.date,
    image: article.image,
    keywords: article.keywords[language] || article.keywords.fr,
    category: article.category
  }
}

/**
 * Obtenir les articles récents (limite)
 */
export const getRecentArticles = async (limit = 3, language = 'fr') => {
  const articles = await getAllArticles(language)
  return articles
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
}

