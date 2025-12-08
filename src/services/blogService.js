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
    image: '/assets/blog/competences-2025-data.svg',
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
  },
  {
    slug: 'employabilite-marche-travail-2025',
    title: {
      fr: 'Employabilité 2025 : Comment se positionner sur un marché du travail en mutation',
      en: 'Employability 2025: How to Position Yourself in a Changing Job Market',
      ar: 'قابلية التوظيف 2025: كيفية تحديد موقعك في سوق عمل متغير'
    },
    description: {
      fr: 'Le marché de l\'emploi évolue rapidement. Découvrez les stratégies pour renforcer votre employabilité et décrocher les meilleures opportunités professionnelles en 2025.',
      en: 'The job market is evolving rapidly. Discover strategies to strengthen your employability and land the best professional opportunities in 2025.',
      ar: 'سوق العمل يتطور بسرعة. اكتشف الاستراتيجيات لتعزيز قابليتك للتوظيف والحصول على أفضل الفرص المهنية في عام 2025.'
    },
    date: '2025-01-15',
    image: '/assets/blog/employabilite-2025.svg',
    keywords: {
      fr: ['employabilité', 'marché du travail 2025', 'carrière professionnelle', 'recherche d\'emploi'],
      en: ['employability', 'job market 2025', 'professional career', 'job search'],
      ar: ['قابلية التوظيف', 'سوق العمل 2025', 'المسيرة المهنية', 'البحث عن عمل']
    },
    category: 'employabilite'
  },
  {
    slug: 'tendances-rh-recrutement-2025',
    title: {
      fr: 'Tendances RH 2025 : Les nouvelles pratiques de recrutement qui transforment l\'embauche',
      en: 'HR Trends 2025: New Recruitment Practices Transforming Hiring',
      ar: 'اتجاهات الموارد البشرية 2025: ممارسات التوظيف الجديدة التي تحول التوظيف'
    },
    description: {
      fr: 'Découvrez les dernières tendances en recrutement et ressources humaines : IA, soft skills, diversité, expérience candidat. Guide complet pour recruteurs et candidats.',
      en: 'Discover the latest trends in recruitment and human resources: AI, soft skills, diversity, candidate experience. Complete guide for recruiters and candidates.',
      ar: 'اكتشف أحدث الاتجاهات في التوظيف والموارد البشرية: الذكاء الاصطناعي، المهارات الناعمة، التنوع، تجربة المرشح. دليل شامل للموظفين والمرشحين.'
    },
    date: '2025-01-16',
    image: '/assets/blog/tendances-rh-2025.svg',
    keywords: {
      fr: ['tendances RH', 'recrutement 2025', 'ressources humaines', 'processus de recrutement'],
      en: ['HR trends', 'recruitment 2025', 'human resources', 'recruitment process'],
      ar: ['اتجاهات الموارد البشرية', 'التوظيف 2025', 'الموارد البشرية', 'عملية التوظيف']
    },
    category: 'rh'
  },
  {
    slug: 'job-dating-speed-hiring-partenariats',
    title: {
      fr: 'Job Dating et Speed Hiring : Maximisez vos chances lors des événements de recrutement',
      en: 'Job Dating and Speed Hiring: Maximize Your Chances at Recruitment Events',
      ar: 'لقاءات التوظيف والسرعة في التوظيف: ا maximize فرصك في أحداث التوظيف'
    },
    description: {
      fr: 'Guide complet pour réussir les job dating et speed hiring : préparation, stratégie, networking. Découvrez comment les partenariats entreprises-écoles transforment le recrutement.',
      en: 'Complete guide to succeed in job dating and speed hiring: preparation, strategy, networking. Discover how company-school partnerships are transforming recruitment.',
      ar: 'دليل شامل للنجاح في لقاءات التوظيف والسرعة في التوظيف: التحضير، الاستراتيجية، التواصل. اكتشف كيف تحول الشراكات بين الشركات والمدارس التوظيف.'
    },
    date: '2025-01-17',
    image: '/assets/blog/job-dating-2025.svg',
    keywords: {
      fr: ['job dating', 'speed hiring', 'événements recrutement', 'partenariats entreprises'],
      en: ['job dating', 'speed hiring', 'recruitment events', 'company partnerships'],
      ar: ['لقاءات التوظيف', 'السرعة في التوظيف', 'أحداث التوظيف', 'شراكات الشركات']
    },
    category: 'recrutement'
  },
  {
    slug: 'marche-travail-maroc-international',
    title: {
      fr: 'Marché du travail au Maroc et à l\'international : Opportunités et défis en 2025',
      en: 'Job Market in Morocco and Internationally: Opportunities and Challenges in 2025',
      ar: 'سوق العمل في المغرب ودولياً: الفرص والتحديات في عام 2025'
    },
    description: {
      fr: 'Analyse complète du marché de l\'emploi marocain et international : secteurs porteurs, compétences recherchées, opportunités à l\'étranger, stratégies de carrière.',
      en: 'Complete analysis of the Moroccan and international job market: growing sectors, sought-after skills, opportunities abroad, career strategies.',
      ar: 'تحليل شامل لسوق العمل المغربي والدولي: القطاعات النامية، المهارات المطلوبة، الفرص في الخارج، استراتيجيات المسيرة المهنية.'
    },
    date: '2025-01-18',
    image: '/assets/blog/marche-travail-maroc.svg',
    keywords: {
      fr: ['marché du travail Maroc', 'emploi Maroc', 'carrière internationale', 'opportunités emploi'],
      en: ['Morocco job market', 'Morocco employment', 'international career', 'job opportunities'],
      ar: ['سوق العمل المغرب', 'التوظيف المغرب', 'المسيرة المهنية الدولية', 'فرص العمل']
    },
    category: 'marche-travail'
  },
  {
    slug: 'orientation-formation-professionnelle',
    title: {
      fr: 'Orientation et formation professionnelle : Guide complet pour construire votre parcours',
      en: 'Career Orientation and Professional Training: Complete Guide to Build Your Path',
      ar: 'التوجيه والتدريب المهني: دليل شامل لبناء مسارك'
    },
    description: {
      fr: 'Comment bien s\'orienter et choisir sa formation professionnelle ? Guide pratique avec conseils, erreurs à éviter et ressources pour réussir votre orientation.',
      en: 'How to properly orient yourself and choose your professional training? Practical guide with advice, mistakes to avoid and resources to succeed in your orientation.',
      ar: 'كيف توجه نفسك بشكل صحيح وتختار تدريبك المهني؟ دليل عملي مع النصائح والأخطاء التي يجب تجنبها والموارد للنجاح في توجيهك.'
    },
    date: '2025-01-19',
    image: '/assets/blog/orientation-formation.svg',
    keywords: {
      fr: ['orientation professionnelle', 'formation professionnelle', 'choix de carrière', 'parcours professionnel'],
      en: ['career orientation', 'professional training', 'career choice', 'professional path'],
      ar: ['التوجيه المهني', 'التدريب المهني', 'اختيار المسيرة المهنية', 'المسار المهني']
    },
    category: 'orientation'
  },
  {
    slug: 'it-digitalisation-transformation-digitale',
    title: {
      fr: 'IT et Digitalisation : Les compétences clés pour réussir dans la transformation digitale',
      en: 'IT and Digitalization: Key Skills to Succeed in Digital Transformation',
      ar: 'تقنية المعلومات والرقمنة: المهارات الأساسية للنجاح في التحول الرقمي'
    },
    description: {
      fr: 'Guide complet sur les métiers IT, la digitalisation et les compétences requises. Découvrez comment se former et évoluer dans le secteur du numérique en 2025.',
      en: 'Complete guide on IT jobs, digitalization and required skills. Discover how to train and evolve in the digital sector in 2025.',
      ar: 'دليل شامل حول وظائف تقنية المعلومات والرقمنة والمهارات المطلوبة. اكتشف كيفية التدريب والتطور في القطاع الرقمي في عام 2025.'
    },
    date: '2025-01-20',
    image: '/assets/blog/it-digitalisation-2025.svg',
    keywords: {
      fr: ['IT', 'digitalisation', 'transformation digitale', 'métiers du numérique'],
      en: ['IT', 'digitalization', 'digital transformation', 'digital jobs'],
      ar: ['تقنية المعلومات', 'الرقمنة', 'التحول الرقمي', 'الوظائف الرقمية']
    },
    category: 'it'
  },
  {
    slug: 'intelligence-artificielle-competences-avenir',
    title: {
      fr: 'Intelligence Artificielle et Compétences de Demain : Comment se préparer à l\'ère de l\'IA',
      en: 'Artificial Intelligence and Skills of Tomorrow: How to Prepare for the AI Era',
      ar: 'الذكاء الاصطناعي ومهارات الغد: كيفية الاستعداد لعصر الذكاء الاصطناعي'
    },
    description: {
      fr: 'L\'IA transforme tous les secteurs. Découvrez comment l\'intelligence artificielle impacte l\'emploi, les compétences à développer et les opportunités de carrière dans l\'IA.',
      en: 'AI is transforming all sectors. Discover how artificial intelligence impacts employment, skills to develop and career opportunities in AI.',
      ar: 'الذكاء الاصطناعي يحول جميع القطاعات. اكتشف كيف يؤثر الذكاء الاصطناعي على التوظيف والمهارات التي يجب تطويرها وفرص العمل في الذكاء الاصطناعي.'
    },
    date: '2025-01-21',
    image: '/assets/blog/ia-competences-avenir.svg',
    keywords: {
      fr: ['intelligence artificielle', 'IA', 'compétences de demain', 'machine learning'],
      en: ['artificial intelligence', 'AI', 'skills of tomorrow', 'machine learning'],
      ar: ['الذكاء الاصطناعي', 'الذكاء الاصطناعي', 'مهارات الغد', 'التعلم الآلي']
    },
    category: 'ia'
  },
  {
    slug: 'soft-skills-insertion-professionnelle',
    title: {
      fr: 'Soft Skills et Insertion Professionnelle : Les compétences comportementales qui font la différence',
      en: 'Soft Skills and Professional Integration: Behavioral Skills That Make the Difference',
      ar: 'المهارات الناعمة والإدماج المهني: المهارات السلوكية التي تحدث الفرق'
    },
    description: {
      fr: 'Les soft skills sont devenues essentielles pour réussir sa carrière. Découvrez quelles compétences comportementales développer et comment les valoriser lors de votre insertion professionnelle.',
      en: 'Soft skills have become essential to succeed in your career. Discover which behavioral skills to develop and how to value them during your professional integration.',
      ar: 'أصبحت المهارات الناعمة ضرورية للنجاح في مسيرتك المهنية. اكتشف المهارات السلوكية التي يجب تطويرها وكيفية تقييمها أثناء إدماجك المهني.'
    },
    date: '2025-01-22',
    image: '/assets/blog/soft-skills-2025.svg',
    keywords: {
      fr: ['soft skills', 'compétences comportementales', 'insertion professionnelle', 'compétences relationnelles'],
      en: ['soft skills', 'behavioral skills', 'professional integration', 'relational skills'],
      ar: ['المهارات الناعمة', 'المهارات السلوكية', 'الإدماج المهني', 'المهارات العلائقية']
    },
    category: 'soft-skills'
  },
  {
    slug: 'partenariats-entreprises-ecoles-insertion',
    title: {
      fr: 'Partenariats Entreprises-Écoles : Comment maximiser votre insertion professionnelle',
      en: 'Company-School Partnerships: How to Maximize Your Professional Integration',
      ar: 'الشراكات بين الشركات والمدارس: كيفية تعظيم إدماجك المهني'
    },
    description: {
      fr: 'Les partenariats entre entreprises et établissements de formation transforment l\'insertion professionnelle. Découvrez comment en bénéficier et préparer votre carrière.',
      en: 'Partnerships between companies and training institutions are transforming professional integration. Discover how to benefit and prepare your career.',
      ar: 'الشراكات بين الشركات ومؤسسات التدريب تحول الإدماج المهني. اكتشف كيفية الاستفادة وإعداد مسيرتك المهنية.'
    },
    date: '2025-01-23',
    image: '/assets/blog/partenariats-entreprises-ecoles.svg',
    keywords: {
      fr: ['partenariats entreprises', 'insertion professionnelle', 'alternance', 'stages'],
      en: ['company partnerships', 'professional integration', 'apprenticeship', 'internships'],
      ar: ['شراكات الشركات', 'الإدماج المهني', 'التدريب المهني', 'التدريب']
    },
    category: 'partenariats'
  },
  {
    slug: 'competences-demain-futur-travail',
    title: {
      fr: 'Compétences de Demain : Se préparer au futur du travail en 2025-2030',
      en: 'Skills of Tomorrow: Preparing for the Future of Work in 2025-2030',
      ar: 'مهارات الغد: الاستعداد لمستقبل العمل في 2025-2030'
    },
    description: {
      fr: 'Le monde du travail évolue rapidement. Découvrez les compétences essentielles pour réussir dans les années à venir et comment vous y préparer dès maintenant.',
      en: 'The world of work is evolving rapidly. Discover the essential skills to succeed in the coming years and how to prepare now.',
      ar: 'عالم العمل يتطور بسرعة. اكتشف المهارات الأساسية للنجاح في السنوات القادمة وكيفية الاستعداد الآن.'
    },
    date: '2025-01-24',
    image: '/assets/blog/competences-demain-2025.svg',
    keywords: {
      fr: ['compétences de demain', 'futur du travail', 'compétences 2030', 'métiers du futur'],
      en: ['skills of tomorrow', 'future of work', 'skills 2030', 'future jobs'],
      ar: ['مهارات الغد', 'مستقبل العمل', 'مهارات 2030', 'مهن المستقبل']
    },
    category: 'competences'
  }
]

const mapStaticArticle = (article, language = 'fr') => ({
  slug: article.slug,
  title: article.title[language] || article.title.fr,
  description: article.description[language] || article.description.fr,
  date: article.date,
  image: article.image,
  keywords: article.keywords[language] || article.keywords.fr,
  category: article.category
})

const mapSupabaseArticle = (article, language = 'fr') => ({
  slug: article.slug,
  title: article[`title_${language}`] || article.title_fr,
  description: article[`description_${language}`] || article.description_fr,
  date: article.published_at || article.created_at,
  image: article.image,
  keywords: article[`keywords_${language}`] || article.keywords_fr || [],
  category: article.category
})

/**
 * Obtenir tous les articles (depuis Supabase + fallback statique)
 */
export const getAllArticles = async (language = 'fr') => {
  const combinedArticles = []
  const slugSet = new Set()

  // Essayer de charger depuis Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (!error && data && data.length > 0) {
        data.forEach(article => {
          const mapped = mapSupabaseArticle(article, language)
          combinedArticles.push(mapped)
          slugSet.add(mapped.slug)
        })
      }
    } catch (error) {
      console.error('Erreur lors du chargement des articles depuis Supabase:', error)
    }
  }

  // Ajouter les articles statiques manquants
  staticArticles.forEach(article => {
    if (!slugSet.has(article.slug)) {
      combinedArticles.push(mapStaticArticle(article, language))
    }
  })

  if (combinedArticles.length === 0) {
    return staticArticles.map(article => mapStaticArticle(article, language))
  }

  return combinedArticles.sort((a, b) => new Date(b.date) - new Date(a.date))
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

