/**
 * Service pour gérer les articles de blog
 * Utilise Supabase si disponible, sinon fallback sur données statiques
 */

import { supabase } from '../lib/supabase'

// Supabase activé uniquement si les variables sont présentes ET non forcé à false
const supabaseEnabled = (
  import.meta?.env?.VITE_SUPABASE_ENABLED !== 'false' &&
  Boolean(import.meta?.env?.VITE_SUPABASE_URL && import.meta?.env?.VITE_SUPABASE_ANON_KEY)
)

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
  },
  {
    slug: 'strategie-cv-2025-recrutement',
    title: {
      fr: 'Stratégie CV 2025 : Comment rédiger un CV qui attire les recruteurs',
      en: 'CV Strategy 2025: How to Write a CV That Attracts Recruiters',
      ar: 'استراتيجية السيرة الذاتية 2025: كيفية كتابة سيرة ذاتية تجذب أصحاب العمل'
    },
    description: {
      fr: 'Guide complet pour rédiger un CV efficace en 2025 : format, contenu, mots-clés, ATS. Découvrez les meilleures pratiques pour décrocher des entretiens.',
      en: 'Complete guide to writing an effective CV in 2025: format, content, keywords, ATS. Discover best practices to land interviews.',
      ar: 'دليل شامل لكتابة سيرة ذاتية فعالة في عام 2025: التنسيق، المحتوى، الكلمات المفتاحية، أنظمة التتبع. اكتشف أفضل الممارسات للحصول على المقابلات.'
    },
    date: '2025-01-25',
    image: '/assets/blog/cv-2025.svg',
    keywords: {
      fr: ['CV 2025', 'rédaction CV', 'curriculum vitae', 'recrutement'],
      en: ['CV 2025', 'CV writing', 'curriculum vitae', 'recruitment'],
      ar: ['السيرة الذاتية 2025', 'كتابة السيرة الذاتية', 'السيرة الذاتية', 'التوظيف']
    },
    category: 'recrutement'
  },
  {
    slug: 'lettre-motivation-2025',
    title: {
      fr: 'Lettre de Motivation 2025 : Guide pour rédiger une candidature qui marque',
      en: 'Cover Letter 2025: Guide to Writing an Impactful Application',
      ar: 'رسالة التحفيز 2025: دليل لكتابة طلب ترشح مؤثر'
    },
    description: {
      fr: 'Comment rédiger une lettre de motivation efficace en 2025 ? Techniques, structure, erreurs à éviter. Guide complet pour décrocher des entretiens.',
      en: 'How to write an effective cover letter in 2025? Techniques, structure, mistakes to avoid. Complete guide to land interviews.',
      ar: 'كيف تكتب رسالة تحفيز فعالة في عام 2025؟ التقنيات، الهيكل، الأخطاء التي يجب تجنبها. دليل شامل للحصول على المقابلات.'
    },
    date: '2025-01-26',
    image: '/assets/blog/lettre-motivation-2025.svg',
    keywords: {
      fr: ['lettre de motivation', 'candidature', 'recherche d\'emploi', 'rédaction lettre'],
      en: ['cover letter', 'application', 'job search', 'letter writing'],
      ar: ['رسالة التحفيز', 'الترشح', 'البحث عن عمل', 'كتابة الرسالة']
    },
    category: 'recrutement'
  },
  {
    slug: 'entretien-embauche-reussir-2025',
    title: {
      fr: 'Entretien d\'Embauche 2025 : Comment réussir votre entretien et décrocher le poste',
      en: 'Job Interview 2025: How to Succeed in Your Interview and Land the Job',
      ar: 'مقابلة التوظيف 2025: كيفية النجاح في مقابلتك والحصول على الوظيفة'
    },
    description: {
      fr: 'Guide complet pour réussir vos entretiens d\'embauche en 2025 : préparation, questions fréquentes, techniques, erreurs à éviter. Conseils pratiques.',
      en: 'Complete guide to succeed in your job interviews in 2025: preparation, common questions, techniques, mistakes to avoid. Practical advice.',
      ar: 'دليل شامل للنجاح في مقابلات التوظيف في عام 2025: التحضير، الأسئلة الشائعة، التقنيات، الأخطاء التي يجب تجنبها. نصائح عملية.'
    },
    date: '2025-01-27',
    image: '/assets/blog/entretien-embauche-2025.svg',
    keywords: {
      fr: ['entretien d\'embauche', 'réussir entretien', 'préparation entretien', 'questions entretien'],
      en: ['job interview', 'succeed interview', 'interview preparation', 'interview questions'],
      ar: ['مقابلة التوظيف', 'النجاح في المقابلة', 'تحضير المقابلة', 'أسئلة المقابلة']
    },
    category: 'recrutement'
  },
  {
    slug: 'linkedin-optimisation-profil-2025',
    title: {
      fr: 'LinkedIn 2025 : Comment optimiser votre profil pour attirer les recruteurs',
      en: 'LinkedIn 2025: How to Optimize Your Profile to Attract Recruiters',
      ar: 'لينكد إن 2025: كيفية تحسين ملفك الشخصي لجذب أصحاب العمل'
    },
    description: {
      fr: 'Guide complet pour optimiser votre profil LinkedIn en 2025 : titre, résumé, expériences, recommandations. Techniques pour être visible des recruteurs.',
      en: 'Complete guide to optimize your LinkedIn profile in 2025: title, summary, experiences, recommendations. Techniques to be visible to recruiters.',
      ar: 'دليل شامل لتحسين ملفك الشخصي على لينكد إن في عام 2025: العنوان، الملخص، الخبرات، التوصيات. تقنيات للظهور أمام أصحاب العمل.'
    },
    date: '2025-01-28',
    image: '/assets/blog/linkedin-2025.svg',
    keywords: {
      fr: ['LinkedIn', 'optimisation profil LinkedIn', 'réseau professionnel', 'recrutement LinkedIn'],
      en: ['LinkedIn', 'LinkedIn profile optimization', 'professional network', 'LinkedIn recruitment'],
      ar: ['لينكد إن', 'تحسين ملف لينكد إن', 'الشبكة المهنية', 'التوظيف على لينكد إن']
    },
    category: 'réseau'
  },
  {
    slug: 'reconversion-professionnelle-guide-2025',
    title: {
      fr: 'Reconversion Professionnelle 2025 : Guide complet pour changer de carrière',
      en: 'Career Change 2025: Complete Guide to Change Careers',
      ar: 'إعادة التوجيه المهني 2025: دليل شامل لتغيير المسيرة المهنية'
    },
    description: {
      fr: 'Comment réussir sa reconversion professionnelle en 2025 ? Étapes, formations, financement, erreurs à éviter. Guide pratique pour changer de métier.',
      en: 'How to succeed in your career change in 2025? Steps, training, funding, mistakes to avoid. Practical guide to change careers.',
      ar: 'كيف تنجح في إعادة توجيهك المهني في عام 2025؟ الخطوات، التدريب، التمويل، الأخطاء التي يجب تجنبها. دليل عملي لتغيير المهنة.'
    },
    date: '2025-01-29',
    image: '/assets/blog/reconversion-2025.svg',
    keywords: {
      fr: ['reconversion professionnelle', 'changement de carrière', 'changer de métier', 'formation reconversion'],
      en: ['career change', 'career transition', 'change careers', 'career change training'],
      ar: ['إعادة التوجيه المهني', 'تغيير المسيرة المهنية', 'تغيير المهنة', 'تدريب إعادة التوجيه']
    },
    category: 'orientation'
  },
  {
    slug: 'teletravail-productivite-2025',
    title: {
      fr: 'Télétravail et Productivité 2025 : Comment réussir le travail à distance',
      en: 'Remote Work and Productivity 2025: How to Succeed in Remote Work',
      ar: 'العمل عن بعد والإنتاجية 2025: كيفية النجاح في العمل عن بعد'
    },
    description: {
      fr: 'Guide complet sur le télétravail en 2025 : organisation, productivité, outils, équilibre vie pro/perso. Conseils pratiques pour réussir le travail à distance.',
      en: 'Complete guide on remote work in 2025: organization, productivity, tools, work-life balance. Practical advice to succeed in remote work.',
      ar: 'دليل شامل حول العمل عن بعد في عام 2025: التنظيم، الإنتاجية، الأدوات، التوازن بين العمل والحياة. نصائح عملية للنجاح في العمل عن بعد.'
    },
    date: '2025-01-30',
    image: '/assets/blog/teletravail-2025.svg',
    keywords: {
      fr: ['télétravail', 'travail à distance', 'productivité', 'organisation télétravail'],
      en: ['remote work', 'work from home', 'productivity', 'remote work organization'],
      ar: ['العمل عن بعد', 'العمل من المنزل', 'الإنتاجية', 'تنظيم العمل عن بعد']
    },
    category: 'télétravail'
  },
  {
    slug: 'negociation-salaire-2025',
    title: {
      fr: 'Négociation Salariale 2025 : Comment négocier son salaire avec succès',
      en: 'Salary Negotiation 2025: How to Successfully Negotiate Your Salary',
      ar: 'تفاوض الراتب 2025: كيفية التفاوض بنجاح على راتبك'
    },
    description: {
      fr: 'Guide complet pour négocier son salaire en 2025 : préparation, techniques, timing, erreurs à éviter. Conseils pratiques pour obtenir la rémunération méritée.',
      en: 'Complete guide to negotiate your salary in 2025: preparation, techniques, timing, mistakes to avoid. Practical advice to get the compensation you deserve.',
      ar: 'دليل شامل للتفاوض على راتبك في عام 2025: التحضير، التقنيات، التوقيت، الأخطاء التي يجب تجنبها. نصائح عملية للحصول على التعويض الذي تستحقه.'
    },
    date: '2025-02-01',
    image: '/assets/blog/negociation-salaire-2025.svg',
    keywords: {
      fr: ['négociation salaire', 'rémunération', 'salaire', 'augmentation salaire'],
      en: ['salary negotiation', 'compensation', 'salary', 'salary increase'],
      ar: ['تفاوض الراتب', 'التعويض', 'الراتب', 'زيادة الراتب']
    },
    category: 'carrière'
  },
  {
    slug: 'burn-out-prevention-2025',
    title: {
      fr: 'Burn-out et Prévention 2025 : Comment préserver son bien-être au travail',
      en: 'Burnout and Prevention 2025: How to Preserve Your Well-being at Work',
      ar: 'الإرهاق والوقاية 2025: كيفية الحفاظ على رفاهيتك في العمل'
    },
    description: {
      fr: 'Guide complet sur le burn-out : signes, causes, prévention, solutions. Conseils pratiques pour préserver son bien-être et sa santé mentale au travail.',
      en: 'Complete guide on burnout: signs, causes, prevention, solutions. Practical advice to preserve your well-being and mental health at work.',
      ar: 'دليل شامل حول الإرهاق: العلامات، الأسباب، الوقاية، الحلول. نصائح عملية للحفاظ على رفاهيتك وصحتك العقلية في العمل.'
    },
    date: '2025-02-02',
    image: '/assets/blog/burnout-2025.svg',
    keywords: {
      fr: ['burn-out', 'épuisement professionnel', 'bien-être au travail', 'santé mentale'],
      en: ['burnout', 'professional exhaustion', 'well-being at work', 'mental health'],
      ar: ['الإرهاق', 'الإرهاق المهني', 'الرفاهية في العمل', 'الصحة العقلية']
    },
    category: 'bien-être'
  },
  {
    slug: 'leadership-management-2025',
    title: {
      fr: 'Leadership et Management 2025 : Les compétences essentielles pour diriger',
      en: 'Leadership and Management 2025: Essential Skills to Lead',
      ar: 'القيادة والإدارة 2025: المهارات الأساسية للقيادة'
    },
    description: {
      fr: 'Guide complet sur le leadership moderne en 2025 : styles de leadership, compétences clés, gestion d\'équipe, développement des talents. Conseils pratiques.',
      en: 'Complete guide on modern leadership in 2025: leadership styles, key skills, team management, talent development. Practical advice.',
      ar: 'دليل شامل حول القيادة الحديثة في عام 2025: أنماط القيادة، المهارات الأساسية، إدارة الفريق، تطوير المواهب. نصائح عملية.'
    },
    date: '2025-02-03',
    image: '/assets/blog/leadership-2025.svg',
    keywords: {
      fr: ['leadership', 'management', 'gestion d\'équipe', 'compétences leadership'],
      en: ['leadership', 'management', 'team management', 'leadership skills'],
      ar: ['القيادة', 'الإدارة', 'إدارة الفريق', 'مهارات القيادة']
    },
    category: 'leadership'
  },
  {
    slug: 'entrepreneuriat-startup-2025',
    title: {
      fr: 'Entrepreneuriat et Startup 2025 : Guide pour lancer votre projet',
      en: 'Entrepreneurship and Startup 2025: Guide to Launch Your Project',
      ar: 'ريادة الأعمال والشركات الناشئة 2025: دليل لإطلاق مشروعك'
    },
    description: {
      fr: 'Comment créer une startup en 2025 ? Étapes, financement, erreurs à éviter, compétences nécessaires. Guide complet pour réussir votre projet entrepreneurial.',
      en: 'How to create a startup in 2025? Steps, funding, mistakes to avoid, necessary skills. Complete guide to succeed in your entrepreneurial project.',
      ar: 'كيف تنشئ شركة ناشئة في عام 2025؟ الخطوات، التمويل، الأخطاء التي يجب تجنبها، المهارات اللازمة. دليل شامل للنجاح في مشروعك الريادي.'
    },
    date: '2025-02-04',
    image: '/assets/blog/entrepreneuriat-2025.svg',
    keywords: {
      fr: ['entrepreneuriat', 'startup', 'création d\'entreprise', 'lancement startup'],
      en: ['entrepreneurship', 'startup', 'company creation', 'startup launch'],
      ar: ['ريادة الأعمال', 'الشركات الناشئة', 'إنشاء الشركة', 'إطلاق الشركة الناشئة']
    },
    category: 'entrepreneuriat'
  },
  {
    slug: 'networking-professionnel-2025',
    title: {
      fr: 'Networking Professionnel 2025 : Comment construire un réseau efficace',
      en: 'Professional Networking 2025: How to Build an Effective Network',
      ar: 'الشبكات المهنية 2025: كيفية بناء شبكة فعالة'
    },
    description: {
      fr: 'Guide complet sur le networking en 2025 : stratégies, événements, réseaux sociaux, erreurs à éviter. Conseils pratiques pour développer votre réseau professionnel.',
      en: 'Complete guide on networking in 2025: strategies, events, social networks, mistakes to avoid. Practical advice to develop your professional network.',
      ar: 'دليل شامل حول الشبكات في عام 2025: الاستراتيجيات، الأحداث، الشبكات الاجتماعية، الأخطاء التي يجب تجنبها. نصائح عملية لتطوير شبكتك المهنية.'
    },
    date: '2025-02-05',
    image: '/assets/blog/networking-2025.svg',
    keywords: {
      fr: ['networking', 'réseau professionnel', 'réseautage', 'développement réseau'],
      en: ['networking', 'professional network', 'networking', 'network development'],
      ar: ['الشبكات', 'الشبكة المهنية', 'التشبيك', 'تطوير الشبكة']
    },
    category: 'réseau'
  },
  {
    slug: 'formation-continue-2025',
    title: {
      fr: 'Formation Continue 2025 : Investir dans son développement professionnel',
      en: 'Continuing Education 2025: Investing in Your Professional Development',
      ar: 'التدريب المستمر 2025: الاستثمار في تطويرك المهني'
    },
    description: {
      fr: 'Guide complet sur la formation continue en 2025 : CPF, financement, types de formations, choix. Conseils pratiques pour développer ses compétences tout au long de sa carrière.',
      en: 'Complete guide on continuing education in 2025: CPF, funding, types of training, choice. Practical advice to develop your skills throughout your career.',
      ar: 'دليل شامل حول التدريب المستمر في عام 2025: الحساب الشخصي للتدريب، التمويل، أنواع التدريب، الاختيار. نصائح عملية لتطوير مهاراتك طوال مسيرتك المهنية.'
    },
    date: '2025-02-06',
    image: '/assets/blog/formation-continue-2025.svg',
    keywords: {
      fr: ['formation continue', 'développement professionnel', 'CPF', 'formation'],
      en: ['continuing education', 'professional development', 'CPF', 'training'],
      ar: ['التدريب المستمر', 'التطوير المهني', 'الحساب الشخصي للتدريب', 'التدريب']
    },
    category: 'formation'
  },
  {
    slug: 'diversite-inclusion-entreprise-2025',
    title: {
      fr: 'Diversité et Inclusion en Entreprise 2025 : Enjeux et Bonnes Pratiques',
      en: 'Diversity and Inclusion in Companies 2025: Challenges and Best Practices',
      ar: 'التنوع والشمول في الشركات 2025: التحديات وأفضل الممارسات'
    },
    description: {
      fr: 'Guide complet sur la diversité et l\'inclusion en entreprise : enjeux, bénéfices, mise en œuvre. Comment créer un environnement de travail inclusif et performant.',
      en: 'Complete guide on diversity and inclusion in companies: challenges, benefits, implementation. How to create an inclusive and high-performing work environment.',
      ar: 'دليل شامل حول التنوع والشمول في الشركات: التحديات، الفوائد، التنفيذ. كيفية خلق بيئة عمل شاملة وعالية الأداء.'
    },
    date: '2025-02-07',
    image: '/assets/blog/diversite-inclusion-2025.svg',
    keywords: {
      fr: ['diversité', 'inclusion', 'diversité entreprise', 'inclusion entreprise'],
      en: ['diversity', 'inclusion', 'company diversity', 'company inclusion'],
      ar: ['التنوع', 'الشمول', 'تنوع الشركة', 'شمول الشركة']
    },
    category: 'rh'
  },
  {
    slug: 'innovation-creativite-entreprise-2025',
    title: {
      fr: 'Innovation et Créativité en Entreprise 2025 : Comment favoriser l\'innovation',
      en: 'Innovation and Creativity in Companies 2025: How to Foster Innovation',
      ar: 'الابتكار والإبداع في الشركات 2025: كيفية تعزيز الابتكار'
    },
    description: {
      fr: 'Guide complet sur l\'innovation en entreprise : processus, culture, outils, obstacles. Comment développer la créativité et l\'innovation dans votre organisation.',
      en: 'Complete guide on innovation in companies: process, culture, tools, obstacles. How to develop creativity and innovation in your organization.',
      ar: 'دليل شامل حول الابتكار في الشركات: العملية، الثقافة، الأدوات، العقبات. كيفية تطوير الإبداع والابتكار في مؤسستك.'
    },
    date: '2025-02-08',
    image: '/assets/blog/innovation-2025.svg',
    keywords: {
      fr: ['innovation', 'créativité', 'innovation entreprise', 'culture innovation'],
      en: ['innovation', 'creativity', 'company innovation', 'innovation culture'],
      ar: ['الابتكار', 'الإبداع', 'ابتكار الشركة', 'ثقافة الابتكار']
    },
    category: 'innovation'
  },
  {
    slug: 'gestion-stress-travail-2025',
    title: {
      fr: 'Gestion du Stress au Travail 2025 : Techniques et Stratégies Efficaces',
      en: 'Stress Management at Work 2025: Effective Techniques and Strategies',
      ar: 'إدارة الإجهاد في العمل 2025: تقنيات واستراتيجيات فعالة'
    },
    description: {
      fr: 'Guide complet sur la gestion du stress professionnel : causes, symptômes, techniques de gestion, prévention. Conseils pratiques pour préserver votre bien-être.',
      en: 'Complete guide on professional stress management: causes, symptoms, management techniques, prevention. Practical advice to preserve your well-being.',
      ar: 'دليل شامل حول إدارة الإجهاد المهني: الأسباب، الأعراض، تقنيات الإدارة، الوقاية. نصائح عملية للحفاظ على رفاهيتك.'
    },
    date: '2025-02-09',
    image: '/assets/blog/gestion-stress-2025.svg',
    keywords: {
      fr: ['gestion stress', 'stress professionnel', 'stress au travail', 'techniques relaxation'],
      en: ['stress management', 'professional stress', 'work stress', 'relaxation techniques'],
      ar: ['إدارة الإجهاد', 'الإجهاد المهني', 'الإجهاد في العمل', 'تقنيات الاسترخاء']
    },
    category: 'bien-être'
  },
  {
    slug: 'communication-professionnelle-2025',
    title: {
      fr: 'Communication Professionnelle 2025 : Maîtriser l\'art de communiquer efficacement',
      en: 'Professional Communication 2025: Mastering the Art of Effective Communication',
      ar: 'التواصل المهني 2025: إتقان فن التواصل الفعال'
    },
    description: {
      fr: 'Guide complet sur la communication professionnelle : techniques, outils, erreurs à éviter. Comment communiquer efficacement au travail et développer votre influence.',
      en: 'Complete guide on professional communication: techniques, tools, mistakes to avoid. How to communicate effectively at work and develop your influence.',
      ar: 'دليل شامل حول التواصل المهني: التقنيات، الأدوات، الأخطاء التي يجب تجنبها. كيفية التواصل بفعالية في العمل وتطوير نفوذك.'
    },
    date: '2025-02-10',
    image: '/assets/blog/communication-2025.svg',
    keywords: {
      fr: ['communication professionnelle', 'communication', 'communication efficace', 'communication orale'],
      en: ['professional communication', 'communication', 'effective communication', 'oral communication'],
      ar: ['التواصل المهني', 'التواصل', 'التواصل الفعال', 'التواصل الشفهي']
    },
    category: 'compétences'
  },
  {
    slug: 'equilibre-vie-pro-perso-2025',
    title: {
      fr: 'Équilibre Vie Professionnelle / Personnelle 2025 : Guide Complet',
      en: 'Work-Life Balance 2025: Complete Guide',
      ar: 'التوازن بين الحياة المهنية والشخصية 2025: دليل شامل'
    },
    description: {
      fr: 'Comment trouver l\'équilibre entre vie professionnelle et personnelle en 2025 ? Stratégies, techniques, erreurs à éviter. Conseils pour préserver votre bien-être.',
      en: 'How to find balance between professional and personal life in 2025? Strategies, techniques, mistakes to avoid. Advice to preserve your well-being.',
      ar: 'كيف تجد التوازن بين الحياة المهنية والشخصية في عام 2025؟ الاستراتيجيات، التقنيات، الأخطاء التي يجب تجنبها. نصائح للحفاظ على رفاهيتك.'
    },
    date: '2025-02-11',
    image: '/assets/blog/equilibre-vie-2025.svg',
    keywords: {
      fr: ['équilibre vie pro perso', 'work life balance', 'bien-être', 'qualité de vie'],
      en: ['work-life balance', 'work life balance', 'well-being', 'quality of life'],
      ar: ['التوازن بين العمل والحياة', 'التوازن بين العمل والحياة', 'الرفاهية', 'جودة الحياة']
    },
    category: 'bien-être'
  },
  {
    slug: 'mentorat-coaching-carriere-2025',
    title: {
      fr: 'Mentorat et Coaching de Carrière 2025 : Accélérer votre développement',
      en: 'Mentoring and Career Coaching 2025: Accelerate Your Development',
      ar: 'الإرشاد والتدريب المهني 2025: تسريع تطويرك'
    },
    description: {
      fr: 'Guide complet sur le mentorat et le coaching : trouver un mentor, devenir mentor, bénéfices, mise en œuvre. Comment accélérer votre développement professionnel.',
      en: 'Complete guide on mentoring and coaching: finding a mentor, becoming a mentor, benefits, implementation. How to accelerate your professional development.',
      ar: 'دليل شامل حول الإرشاد والتدريب: العثور على مرشد، أن تصبح مرشداً، الفوائد، التنفيذ. كيفية تسريع تطويرك المهني.'
    },
    date: '2025-02-12',
    image: '/assets/blog/mentorat-2025.svg',
    keywords: {
      fr: ['mentorat', 'coaching', 'coaching carrière', 'mentor'],
      en: ['mentoring', 'coaching', 'career coaching', 'mentor'],
      ar: ['الإرشاد', 'التدريب', 'التدريب المهني', 'المرشد']
    },
    category: 'développement'
  },
  {
    slug: 'gestion-projet-professionnel-2025',
    title: {
      fr: 'Gestion de Projet Professionnel 2025 : Méthodes et Outils Efficaces',
      en: 'Professional Project Management 2025: Effective Methods and Tools',
      ar: 'إدارة المشاريع المهنية 2025: الطرق والأدوات الفعالة'
    },
    description: {
      fr: 'Guide complet sur la gestion de projet : méthodes agiles, outils, compétences, erreurs à éviter. Comment réussir vos projets professionnels en 2025.',
      en: 'Complete guide on project management: agile methods, tools, skills, mistakes to avoid. How to succeed in your professional projects in 2025.',
      ar: 'دليل شامل حول إدارة المشاريع: الطرق الرشيقة، الأدوات، المهارات، الأخطاء التي يجب تجنبها. كيفية النجاح في مشاريعك المهنية في عام 2025.'
    },
    date: '2025-02-13',
    image: '/assets/blog/gestion-projet-2025.svg',
    keywords: {
      fr: ['gestion de projet', 'project management', 'méthodes agiles', 'chef de projet'],
      en: ['project management', 'project management', 'agile methods', 'project manager'],
      ar: ['إدارة المشاريع', 'إدارة المشاريع', 'الطرق الرشيقة', 'مدير المشروع']
    },
    category: 'compétences'
  },
  {
    slug: 'performance-evaluation-2025',
    title: {
      fr: 'Évaluation de Performance 2025 : Guide Complet pour Managers et Employés',
      en: 'Performance Evaluation 2025: Complete Guide for Managers and Employees',
      ar: 'تقييم الأداء 2025: دليل شامل للمديرين والموظفين'
    },
    description: {
      fr: 'Guide complet sur l\'évaluation de performance : processus, objectifs, feedback, développement. Comment mener des évaluations efficaces et constructives.',
      en: 'Complete guide on performance evaluation: process, objectives, feedback, development. How to conduct effective and constructive evaluations.',
      ar: 'دليل شامل حول تقييم الأداء: العملية، الأهداف، الملاحظات، التطوير. كيفية إجراء تقييمات فعالة وبناءة.'
    },
    date: '2025-02-14',
    image: '/assets/blog/evaluation-performance-2025.svg',
    keywords: {
      fr: ['évaluation performance', 'évaluation professionnelle', 'entretien annuel', 'feedback'],
      en: ['performance evaluation', 'professional evaluation', 'annual review', 'feedback'],
      ar: ['تقييم الأداء', 'التقييم المهني', 'المراجعة السنوية', 'الملاحظات']
    },
    category: 'rh'
  },
  {
    slug: 'branding-personnel-marque-2025',
    title: {
      fr: 'Personal Branding 2025 : Construire votre marque personnelle professionnelle',
      en: 'Personal Branding 2025: Build Your Professional Personal Brand',
      ar: 'العلامة الشخصية 2025: بناء علامتك الشخصية المهنية'
    },
    description: {
      fr: 'Guide complet sur le personal branding : stratégie, réseaux sociaux, contenu, visibilité. Comment construire une marque personnelle forte et influente.',
      en: 'Complete guide on personal branding: strategy, social networks, content, visibility. How to build a strong and influential personal brand.',
      ar: 'دليل شامل حول العلامة الشخصية: الاستراتيجية، الشبكات الاجتماعية، المحتوى، الرؤية. كيفية بناء علامة شخصية قوية ومؤثرة.'
    },
    date: '2025-02-15',
    image: '/assets/blog/personal-branding-2025.svg',
    keywords: {
      fr: ['personal branding', 'marque personnelle', 'branding personnel', 'réputation professionnelle'],
      en: ['personal branding', 'personal brand', 'personal branding', 'professional reputation'],
      ar: ['العلامة الشخصية', 'العلامة الشخصية', 'العلامة الشخصية', 'السمعة المهنية']
    },
    category: 'développement'
  },
  {
    slug: 'competences-transversales-2025',
    title: {
      fr: 'Compétences Transversales 2025 : Les Soft Skills Essentielles',
      en: 'Transferable Skills 2025: Essential Soft Skills',
      ar: 'المهارات القابلة للنقل 2025: المهارات الناعمة الأساسية'
    },
    description: {
      fr: 'Guide complet sur les compétences transversales : communication, leadership, adaptabilité, résolution de problèmes. Comment développer vos soft skills en 2025.',
      en: 'Complete guide on transferable skills: communication, leadership, adaptability, problem solving. How to develop your soft skills in 2025.',
      ar: 'دليل شامل حول المهارات القابلة للنقل: التواصل، القيادة، التكيف، حل المشاكل. كيفية تطوير مهاراتك الناعمة في عام 2025.'
    },
    date: '2025-02-16',
    image: '/assets/blog/competences-transversales-2025.svg',
    keywords: {
      fr: ['compétences transversales', 'soft skills', 'compétences comportementales', 'compétences relationnelles'],
      en: ['transferable skills', 'soft skills', 'behavioral skills', 'relational skills'],
      ar: ['المهارات القابلة للنقل', 'المهارات الناعمة', 'المهارات السلوكية', 'المهارات العلائقية']
    },
    category: 'compétences'
  },
  {
    slug: 'carriere-internationale-expatriation-2025',
    title: {
      fr: 'Carrière Internationale et Expatriation 2025 : Guide Complet',
      en: 'International Career and Expatriation 2025: Complete Guide',
      ar: 'المسيرة المهنية الدولية والإقامة في الخارج 2025: دليل شامل'
    },
    description: {
      fr: 'Guide complet sur l\'expatriation professionnelle : préparation, destinations, défis, opportunités. Comment réussir votre carrière à l\'international en 2025.',
      en: 'Complete guide on professional expatriation: preparation, destinations, challenges, opportunities. How to succeed in your international career in 2025.',
      ar: 'دليل شامل حول الإقامة المهنية في الخارج: التحضير، الوجهات، التحديات، الفرص. كيفية النجاح في مسيرتك المهنية الدولية في عام 2025.'
    },
    date: '2025-02-17',
    image: '/assets/blog/expatriation-2025.svg',
    keywords: {
      fr: ['expatriation', 'carrière internationale', 'travail à l\'étranger', 'mobilité professionnelle'],
      en: ['expatriation', 'international career', 'work abroad', 'professional mobility'],
      ar: ['الإقامة في الخارج', 'المسيرة المهنية الدولية', 'العمل في الخارج', 'الحراك المهني']
    },
    category: 'carrière'
  },
  {
    slug: 'transition-carriere-2025',
    title: {
      fr: 'Transition de Carrière 2025 : Guide pour Changer de Voie Professionnelle',
      en: 'Career Transition 2025: Guide to Change Professional Path',
      ar: 'الانتقال المهني 2025: دليل لتغيير المسار المهني'
    },
    description: {
      fr: 'Guide complet sur la transition de carrière : préparation, stratégies, financement, erreurs à éviter. Comment réussir votre changement de voie professionnelle.',
      en: 'Complete guide on career transition: preparation, strategies, funding, mistakes to avoid. How to succeed in your professional path change.',
      ar: 'دليل شامل حول الانتقال المهني: التحضير، الاستراتيجيات، التمويل، الأخطاء التي يجب تجنبها. كيفية النجاح في تغيير مسارك المهني.'
    },
    date: '2025-02-18',
    image: '/assets/blog/transition-carriere-2025.svg',
    keywords: {
      fr: ['transition carrière', 'changement carrière', 'reconversion', 'évolution professionnelle'],
      en: ['career transition', 'career change', 'career change', 'professional evolution'],
      ar: ['الانتقال المهني', 'تغيير المسيرة المهنية', 'إعادة التوجيه', 'التطور المهني']
    },
    category: 'carrière'
  },
  {
    slug: 'productivite-efficacite-travail-2025',
    title: {
      fr: 'Productivité et Efficacité au Travail 2025 : Techniques et Outils',
      en: 'Productivity and Efficiency at Work 2025: Techniques and Tools',
      ar: 'الإنتاجية والكفاءة في العمل 2025: التقنيات والأدوات'
    },
    description: {
      fr: 'Guide complet pour améliorer votre productivité : méthodes, outils, techniques, erreurs à éviter. Comment être plus efficace et performant au travail.',
      en: 'Complete guide to improve your productivity: methods, tools, techniques, mistakes to avoid. How to be more efficient and performant at work.',
      ar: 'دليل شامل لتحسين إنتاجيتك: الطرق، الأدوات، التقنيات، الأخطاء التي يجب تجنبها. كيفية أن تكون أكثر كفاءة وأداءً في العمل.'
    },
    date: '2025-02-19',
    image: '/assets/blog/productivite-2025.svg',
    keywords: {
      fr: ['productivité', 'efficacité', 'productivité travail', 'gestion du temps'],
      en: ['productivity', 'efficiency', 'work productivity', 'time management'],
      ar: ['الإنتاجية', 'الكفاءة', 'إنتاجية العمل', 'إدارة الوقت']
    },
    category: 'compétences'
  },
  {
    slug: 'objectifs-carriere-planification-2025',
    title: {
      fr: 'Objectifs de Carrière et Planification 2025 : Construire votre Avenir Professionnel',
      en: 'Career Goals and Planning 2025: Build Your Professional Future',
      ar: 'أهداف المسيرة المهنية والتخطيط 2025: بناء مستقبلك المهني'
    },
    description: {
      fr: 'Guide complet sur la planification de carrière : définir ses objectifs, créer un plan, stratégies, erreurs à éviter. Comment construire la carrière de vos rêves.',
      en: 'Complete guide on career planning: define your goals, create a plan, strategies, mistakes to avoid. How to build the career of your dreams.',
      ar: 'دليل شامل حول تخطيط المسيرة المهنية: تحديد أهدافك، إنشاء خطة، الاستراتيجيات، الأخطاء التي يجب تجنبها. كيفية بناء المسيرة المهنية التي تحلم بها.'
    },
    date: '2025-02-20',
    image: '/assets/blog/objectifs-carriere-2025.svg',
    keywords: {
      fr: ['objectifs carrière', 'planification carrière', 'plan de carrière', 'développement carrière'],
      en: ['career goals', 'career planning', 'career plan', 'career development'],
      ar: ['أهداف المسيرة المهنية', 'تخطيط المسيرة المهنية', 'خطة المسيرة المهنية', 'تطوير المسيرة المهنية']
    },
    category: 'carrière'
  },
  {
    slug: 'retraite-planification-financiere-2025',
    title: {
      fr: 'Retraite et Planification Financière 2025 : Préparer son Avenir',
      en: 'Retirement and Financial Planning 2025: Prepare Your Future',
      ar: 'التقاعد والتخطيط المالي 2025: إعداد مستقبلك'
    },
    description: {
      fr: 'Guide complet sur la planification de la retraite : épargne, investissements, stratégies, erreurs à éviter. Comment préparer financièrement votre retraite.',
      en: 'Complete guide on retirement planning: savings, investments, strategies, mistakes to avoid. How to financially prepare for your retirement.',
      ar: 'دليل شامل حول تخطيط التقاعد: الادخار، الاستثمارات، الاستراتيجيات، الأخطاء التي يجب تجنبها. كيفية التحضير مالياً للتقاعد.'
    },
    date: '2025-02-21',
    image: '/assets/blog/retraite-2025.svg',
    keywords: {
      fr: ['retraite', 'planification retraite', 'épargne retraite', 'investissement retraite'],
      en: ['retirement', 'retirement planning', 'retirement savings', 'retirement investment'],
      ar: ['التقاعد', 'تخطيط التقاعد', 'ادخار التقاعد', 'استثمار التقاعد']
    },
    category: 'planification'
  },
  {
    slug: 'success-stories-carriere-2025',
    title: {
      fr: 'Success Stories de Carrière 2025 : Inspirations et Leçons Apprises',
      en: 'Career Success Stories 2025: Inspirations and Lessons Learned',
      ar: 'قصص نجاح المسيرة المهنية 2025: الإلهام والدروس المستفادة'
    },
    description: {
      fr: 'Découvrez des success stories de carrière inspirantes : parcours, défis, stratégies, leçons. Comment ces professionnels ont réussi leur carrière et ce que vous pouvez en apprendre.',
      en: 'Discover inspiring career success stories: paths, challenges, strategies, lessons. How these professionals succeeded in their careers and what you can learn from them.',
      ar: 'اكتشف قصص نجاح مهنية ملهمة: المسارات، التحديات، الاستراتيجيات، الدروس. كيف نجح هؤلاء المحترفون في مسيراتهم المهنية وما يمكنك تعلمه منهم.'
    },
    date: '2025-02-22',
    image: '/assets/blog/success-stories-2025.svg',
    keywords: {
      fr: ['success stories', 'parcours professionnel', 'réussite carrière', 'inspiration carrière'],
      en: ['success stories', 'professional path', 'career success', 'career inspiration'],
      ar: ['قصص النجاح', 'المسار المهني', 'نجاح المسيرة المهنية', 'إلهام المسيرة المهنية']
    },
    category: 'inspiration'
  },
  {
    slug: 'tendances-emploi-futur-2025-2030',
    title: {
      fr: 'Tendances de l\'Emploi 2025-2030 : Préparer l\'Avenir du Travail',
      en: 'Employment Trends 2025-2030: Preparing for the Future of Work',
      ar: 'اتجاهات التوظيف 2025-2030: الاستعداد لمستقبل العمل'
    },
    description: {
      fr: 'Analyse complète des tendances de l\'emploi pour 2025-2030 : métiers émergents, secteurs en croissance, compétences requises. Comment se préparer aux évolutions du marché du travail.',
      en: 'Complete analysis of employment trends for 2025-2030: emerging jobs, growing sectors, required skills. How to prepare for job market evolutions.',
      ar: 'تحليل شامل لاتجاهات التوظيف لعام 2025-2030: الوظائف الناشئة، القطاعات النامية، المهارات المطلوبة. كيفية الاستعداد لتطورات سوق العمل.'
    },
    date: '2025-02-23',
    image: '/assets/blog/tendances-emploi-2025.svg',
    keywords: {
      fr: ['tendances emploi', 'métiers futurs', 'emploi 2025', 'marché du travail'],
      en: ['employment trends', 'future jobs', 'employment 2025', 'job market'],
      ar: ['اتجاهات التوظيف', 'وظائف المستقبل', 'التوظيف 2025', 'سوق العمل']
    },
    category: 'tendances'
  },
  {
    slug: 'qualite-vie-travail-bien-etre-2025',
    title: {
      fr: 'Qualité de Vie au Travail et Bien-être 2025 : Créer un Environnement Épanouissant',
      en: 'Quality of Life at Work and Well-being 2025: Create a Fulfilling Environment',
      ar: 'جودة الحياة في العمل والرفاهية 2025: خلق بيئة مُرضية'
    },
    description: {
      fr: 'Guide complet sur la qualité de vie au travail : bien-être, satisfaction, engagement, performance. Comment créer un environnement de travail épanouissant et performant.',
      en: 'Complete guide on quality of life at work: well-being, satisfaction, engagement, performance. How to create a fulfilling and high-performing work environment.',
      ar: 'دليل شامل حول جودة الحياة في العمل: الرفاهية، الرضا، المشاركة، الأداء. كيفية خلق بيئة عمل مُرضية وعالية الأداء.'
    },
    date: '2025-02-24',
    image: '/assets/blog/qualite-vie-travail-2025.svg',
    keywords: {
      fr: ['qualité de vie au travail', 'bien-être travail', 'QVT', 'satisfaction professionnelle'],
      en: ['quality of life at work', 'work well-being', 'QWL', 'professional satisfaction'],
      ar: ['جودة الحياة في العمل', 'الرفاهية في العمل', 'جودة الحياة في العمل', 'الرضا المهني']
    },
    category: 'bien-être'
  },
  {
    slug: 'metiers-tech-2025-guide-complet',
    title: {
      fr: 'Métiers Tech 2025 : Guide Complet des Carrières Numériques',
      en: 'Tech Jobs 2025: Complete Guide to Digital Careers',
      ar: 'وظائف التكنولوجيا 2025: دليل شامل للمهن الرقمية'
    },
    description: {
      fr: 'Découvrez les métiers tech les plus recherchés en 2025 : développeur, data scientist, cybersécurité, cloud. Guide complet avec compétences requises, salaires et formations.',
      en: 'Discover the most sought-after tech jobs in 2025: developer, data scientist, cybersecurity, cloud. Complete guide with required skills, salaries and training.',
      ar: 'اكتشف وظائف التكنولوجيا الأكثر طلباً في عام 2025: المطور، عالم البيانات، الأمن السيبراني، السحابة. دليل شامل مع المهارات المطلوبة والرواتب والتدريب.'
    },
    date: '2025-02-25',
    image: '/assets/blog/metiers-tech-2025.svg',
    keywords: {
      fr: ['métiers tech', 'développeur web', 'data scientist', 'cybersécurité', 'cloud computing', 'métiers IT', 'carrière numérique', 'formation tech'],
      en: ['tech jobs', 'web developer', 'data scientist', 'cybersecurity', 'cloud computing', 'IT jobs', 'digital career', 'tech training'],
      ar: ['وظائف التكنولوجيا', 'مطور الويب', 'عالم البيانات', 'الأمن السيبراني', 'الحوسبة السحابية', 'وظائف تقنية المعلومات', 'المسيرة الرقمية', 'التدريب التقني']
    },
    category: 'tech'
  },
  {
    slug: 'insertion-professionnelle-jeunes-2025',
    title: {
      fr: 'Insertion Professionnelle des Jeunes 2025 : Guide Complet pour Débuter',
      en: 'Professional Integration for Young People 2025: Complete Guide to Get Started',
      ar: 'الإدماج المهني للشباب 2025: دليل شامل للبدء'
    },
    description: {
      fr: 'Guide complet pour l\'insertion professionnelle des jeunes diplômés : CV, entretiens, réseaux, premières expériences. Conseils pratiques pour réussir votre entrée sur le marché du travail.',
      en: 'Complete guide for professional integration of young graduates: CV, interviews, networks, first experiences. Practical advice to succeed in entering the job market.',
      ar: 'دليل شامل للإدماج المهني للخريجين الشباب: السيرة الذاتية، المقابلات، الشبكات، التجارب الأولى. نصائح عملية للنجاح في دخول سوق العمل.'
    },
    date: '2025-02-26',
    image: '/assets/blog/insertion-jeunes-2025.svg',
    keywords: {
      fr: ['insertion professionnelle', 'jeunes diplômés', 'premier emploi', 'recherche d\'emploi', 'stage', 'alternance', 'première expérience', 'carrière débutant'],
      en: ['professional integration', 'young graduates', 'first job', 'job search', 'internship', 'apprenticeship', 'first experience', 'beginner career'],
      ar: ['الإدماج المهني', 'الخريجون الشباب', 'الوظيفة الأولى', 'البحث عن عمل', 'التدريب', 'التدريب المهني', 'التجربة الأولى', 'المسيرة للمبتدئين']
    },
    category: 'insertion'
  },
  {
    slug: 'secteurs-porteurs-emploi-2025',
    title: {
      fr: 'Secteurs Porteurs d\'Emploi 2025 : Où Trouver les Meilleures Opportunités',
      en: 'Growing Job Sectors 2025: Where to Find the Best Opportunities',
      ar: 'القطاعات النامية للتوظيف 2025: أين تجد أفضل الفرص'
    },
    description: {
      fr: 'Découvrez les secteurs qui recrutent le plus en 2025 : tech, santé, énergies renouvelables, services. Analyse complète avec opportunités, compétences et formations.',
      en: 'Discover the sectors that recruit the most in 2025: tech, health, renewable energy, services. Complete analysis with opportunities, skills and training.',
      ar: 'اكتشف القطاعات التي توظف أكثر في عام 2025: التكنولوجيا، الصحة، الطاقة المتجددة، الخدمات. تحليل شامل مع الفرص والمهارات والتدريب.'
    },
    date: '2025-02-27',
    image: '/assets/blog/secteurs-porteurs-2025.svg',
    keywords: {
      fr: ['secteurs porteurs', 'secteurs qui recrutent', 'opportunités emploi', 'marché du travail', 'secteurs croissance', 'emploi 2025', 'secteurs d\'avenir', 'recrutement'],
      en: ['growing sectors', 'recruiting sectors', 'job opportunities', 'job market', 'growth sectors', 'employment 2025', 'future sectors', 'recruitment'],
      ar: ['القطاعات النامية', 'القطاعات الموظفة', 'فرص العمل', 'سوق العمل', 'قطاعات النمو', 'التوظيف 2025', 'قطاعات المستقبل', 'التوظيف']
    },
    category: 'emploi'
  },
  {
    slug: 'competences-recherchees-2025',
    title: {
      fr: 'Compétences les Plus Recherchées en 2025 : Guide Complet',
      en: 'Most Sought-After Skills in 2025: Complete Guide',
      ar: 'المهارات الأكثر طلباً في 2025: دليل شامل'
    },
    description: {
      fr: 'Découvrez les compétences les plus recherchées par les employeurs en 2025 : techniques et comportementales. Guide complet avec formations et développement.',
      en: 'Discover the most sought-after skills by employers in 2025: technical and behavioral. Complete guide with training and development.',
      ar: 'اكتشف المهارات الأكثر طلباً من قبل أصحاب العمل في عام 2025: التقنية والسلوكية. دليل شامل مع التدريب والتطوير.'
    },
    date: '2025-02-28',
    image: '/assets/blog/competences-recherchees-2025.svg',
    keywords: {
      fr: ['compétences recherchées', 'compétences 2025', 'compétences employabilité', 'compétences techniques', 'soft skills', 'compétences marché', 'développement compétences', 'formation compétences'],
      en: ['sought-after skills', 'skills 2025', 'employability skills', 'technical skills', 'soft skills', 'market skills', 'skill development', 'skill training'],
      ar: ['المهارات المطلوبة', 'مهارات 2025', 'مهارات قابلية التوظيف', 'المهارات التقنية', 'المهارات الناعمة', 'مهارات السوق', 'تطوير المهارات', 'تدريب المهارات']
    },
    category: 'compétences'
  },
  {
    slug: 'salaire-marche-travail-2025',
    title: {
      fr: 'Salaires et Marché du Travail 2025 : Guide des Rémunérations par Secteur',
      en: 'Salaries and Job Market 2025: Salary Guide by Sector',
      ar: 'الرواتب وسوق العمل 2025: دليل الرواتب حسب القطاع'
    },
    description: {
      fr: 'Guide complet des salaires par secteur en 2025 : tech, finance, santé, commerce. Analyse du marché, facteurs influençant les rémunérations et négociation.',
      en: 'Complete salary guide by sector in 2025: tech, finance, health, commerce. Market analysis, factors influencing compensation and negotiation.',
      ar: 'دليل شامل للرواتب حسب القطاع في عام 2025: التكنولوجيا، المالية، الصحة، التجارة. تحليل السوق والعوامل المؤثرة على التعويضات والتفاوض.'
    },
    date: '2025-03-01',
    image: '/assets/blog/salaire-marche-2025.svg',
    keywords: {
      fr: ['salaire', 'rémunération', 'salaire par secteur', 'marché du travail', 'négociation salaire', 'salaire moyen', 'rémunération 2025', 'compensation'],
      en: ['salary', 'compensation', 'salary by sector', 'job market', 'salary negotiation', 'average salary', 'compensation 2025', 'remuneration'],
      ar: ['الراتب', 'التعويض', 'الراتب حسب القطاع', 'سوق العمل', 'تفاوض الراتب', 'متوسط الراتب', 'التعويض 2025', 'المكافأة']
    },
    category: 'carrière'
  },
  {
    slug: 'formation-professionnelle-continue-2025',
    title: {
      fr: 'Formation Professionnelle Continue 2025 : Guide Complet pour Se Former',
      en: 'Continuing Professional Training 2025: Complete Guide to Training',
      ar: 'التدريب المهني المستمر 2025: دليل شامل للتدريب'
    },
    description: {
      fr: 'Guide complet sur la formation professionnelle continue : types de formations, financement, certifications, e-learning. Tout pour développer vos compétences en 2025.',
      en: 'Complete guide on continuing professional training: types of training, funding, certifications, e-learning. Everything to develop your skills in 2025.',
      ar: 'دليل شامل حول التدريب المهني المستمر: أنواع التدريب، التمويل، الشهادات، التعلم الإلكتروني. كل شيء لتطوير مهاراتك في عام 2025.'
    },
    date: '2025-03-02',
    image: '/assets/blog/formation-continue-2025.svg',
    keywords: {
      fr: ['formation professionnelle', 'formation continue', 'développement compétences', 'certification professionnelle', 'e-learning', 'formation adulte', 'CPF', 'reconversion'],
      en: ['professional training', 'continuing training', 'skill development', 'professional certification', 'e-learning', 'adult training', 'training fund', 'career change'],
      ar: ['التدريب المهني', 'التدريب المستمر', 'تطوير المهارات', 'الشهادة المهنية', 'التعلم الإلكتروني', 'تدريب الكبار', 'صندوق التدريب', 'تغيير المسيرة']
    },
    category: 'formation'
  },
  {
    slug: 'reconversion-professionnelle-reussir-2025',
    title: {
      fr: 'Reconversion Professionnelle 2025 : Guide Complet pour Réussir',
      en: 'Career Change 2025: Complete Guide to Succeed',
      ar: 'إعادة التوجيه المهني 2025: دليل شامل للنجاح'
    },
    description: {
      fr: 'Guide complet pour réussir sa reconversion professionnelle : étapes, formations, financement, témoignages. Tout pour changer de métier en 2025.',
      en: 'Complete guide to succeed in career change: steps, training, funding, testimonials. Everything to change careers in 2025.',
      ar: 'دليل شامل للنجاح في إعادة التوجيه المهني: الخطوات، التدريب، التمويل، الشهادات. كل شيء لتغيير المهنة في عام 2025.'
    },
    date: '2025-03-03',
    image: '/assets/blog/reconversion-2025.svg',
    keywords: {
      fr: ['reconversion professionnelle', 'changement de métier', 'reconversion', 'changement de carrière', 'nouveau métier', 'transition professionnelle', 'bilan de compétences', 'formation reconversion'],
      en: ['career change', 'career transition', 'career switch', 'new career', 'professional transition', 'skills assessment', 'career change training'],
      ar: ['إعادة التوجيه المهني', 'تغيير المهنة', 'إعادة التوجيه', 'تغيير المسيرة', 'مهنة جديدة', 'الانتقال المهني', 'تقييم المهارات', 'تدريب إعادة التوجيه']
    },
    category: 'reconversion'
  },
  {
    slug: 'entrepreneuriat-startup-guide-2025',
    title: {
      fr: 'Entrepreneuriat et Startup 2025 : Guide Complet pour Créer son Entreprise',
      en: 'Entrepreneurship and Startup 2025: Complete Guide to Start Your Business',
      ar: 'ريادة الأعمال والشركات الناشئة 2025: دليل شامل لإنشاء شركتك'
    },
    description: {
      fr: 'Guide complet pour créer sa startup en 2025 : idée, business plan, financement, équipe, lancement. Toutes les étapes pour réussir votre projet entrepreneurial.',
      en: 'Complete guide to create your startup in 2025: idea, business plan, funding, team, launch. All steps to succeed in your entrepreneurial project.',
      ar: 'دليل شامل لإنشاء شركتك الناشئة في عام 2025: الفكرة، خطة العمل، التمويل، الفريق، الإطلاق. جميع الخطوات للنجاح في مشروعك الريادي.'
    },
    date: '2025-03-04',
    image: '/assets/blog/entrepreneuriat-2025.svg',
    keywords: {
      fr: ['entrepreneuriat', 'startup', 'créer entreprise', 'business plan', 'financement startup', 'lancement startup', 'entrepreneur', 'création entreprise'],
      en: ['entrepreneurship', 'startup', 'start business', 'business plan', 'startup funding', 'startup launch', 'entrepreneur', 'business creation'],
      ar: ['ريادة الأعمال', 'الشركات الناشئة', 'إنشاء شركة', 'خطة العمل', 'تمويل الشركات الناشئة', 'إطلاق الشركة الناشئة', 'رائد أعمال', 'إنشاء الأعمال']
    },
    category: 'entrepreneuriat'
  },
  {
    slug: 'leadership-management-2025',
    title: {
      fr: 'Leadership et Management 2025 : Guide des Compétences Managériales',
      en: 'Leadership and Management 2025: Management Skills Guide',
      ar: 'القيادة والإدارة 2025: دليل المهارات الإدارية'
    },
    description: {
      fr: 'Guide complet sur le leadership et le management en 2025 : styles de leadership, compétences managériales, gestion d\'équipe, développement des talents. Tout pour devenir un bon manager.',
      en: 'Complete guide on leadership and management in 2025: leadership styles, management skills, team management, talent development. Everything to become a good manager.',
      ar: 'دليل شامل حول القيادة والإدارة في عام 2025: أنماط القيادة، المهارات الإدارية، إدارة الفريق، تطوير المواهب. كل شيء لتصبح مديراً جيداً.'
    },
    date: '2025-03-05',
    image: '/assets/blog/leadership-2025.svg',
    keywords: {
      fr: ['leadership', 'management', 'gestion d\'équipe', 'compétences managériales', 'développement leadership', 'manager', 'chef d\'équipe', 'direction'],
      en: ['leadership', 'management', 'team management', 'management skills', 'leadership development', 'manager', 'team leader', 'direction'],
      ar: ['القيادة', 'الإدارة', 'إدارة الفريق', 'المهارات الإدارية', 'تطوير القيادة', 'مدير', 'قائد الفريق', 'التوجيه']
    },
    category: 'management'
  },
  {
    slug: 'work-life-balance-2025',
    title: {
      fr: 'Équilibre Vie Pro / Vie Perso 2025 : Guide Complet pour Réussir',
      en: 'Work-Life Balance 2025: Complete Guide to Succeed',
      ar: 'التوازن بين الحياة المهنية والشخصية 2025: دليل شامل للنجاح'
    },
    description: {
      fr: 'Guide complet pour trouver l\'équilibre entre vie professionnelle et vie personnelle en 2025 : organisation, limites, bien-être, productivité. Conseils pratiques pour un équilibre durable.',
      en: 'Complete guide to find balance between professional and personal life in 2025: organization, boundaries, well-being, productivity. Practical advice for sustainable balance.',
      ar: 'دليل شامل لإيجاد التوازن بين الحياة المهنية والشخصية في عام 2025: التنظيم، الحدود، الرفاهية، الإنتاجية. نصائح عملية للتوازن المستدام.'
    },
    date: '2025-03-06',
    image: '/assets/blog/work-life-balance-2025.svg',
    keywords: {
      fr: ['équilibre vie pro perso', 'work life balance', 'bien-être au travail', 'organisation personnelle', 'gestion du temps', 'qualité de vie', 'burn-out', 'santé mentale'],
      en: ['work-life balance', 'work life balance', 'well-being at work', 'personal organization', 'time management', 'quality of life', 'burnout', 'mental health'],
      ar: ['التوازن بين الحياة المهنية والشخصية', 'التوازن بين العمل والحياة', 'الرفاهية في العمل', 'التنظيم الشخصي', 'إدارة الوقت', 'جودة الحياة', 'الإرهاق', 'الصحة العقلية']
    },
    category: 'bien-etre'
  },
  {
    slug: 'cv-lettre-motivation-2025',
    title: {
      fr: 'CV et Lettre de Motivation 2025 : Guide Complet pour Décrocher un Entretien',
      en: 'CV and Cover Letter 2025: Complete Guide to Get an Interview',
      ar: 'السيرة الذاتية ورسالة التحفيز 2025: دليل شامل للحصول على مقابلة'
    },
    description: {
      fr: 'Guide complet pour créer un CV et une lettre de motivation efficaces en 2025. Conseils pratiques, exemples, erreurs à éviter pour décrocher des entretiens.',
      en: 'Complete guide to create an effective CV and cover letter in 2025. Practical advice, examples, mistakes to avoid to get interviews.',
      ar: 'دليل شامل لإنشاء سيرة ذاتية ورسالة تحفيز فعالة في عام 2025. نصائح عملية، أمثلة، أخطاء يجب تجنبها للحصول على المقابلات.'
    },
    date: '2025-03-07',
    image: '/assets/blog/cv-lettre-2025.svg',
    keywords: {
      fr: ['CV', 'lettre de motivation', 'candidature', 'recrutement', 'CV efficace', 'rédaction CV', 'entretien d\'embauche', 'recherche d\'emploi'],
      en: ['CV', 'cover letter', 'application', 'recruitment', 'effective CV', 'CV writing', 'job interview', 'job search'],
      ar: ['السيرة الذاتية', 'رسالة التحفيز', 'التقديم', 'التوظيف', 'سيرة ذاتية فعالة', 'كتابة السيرة الذاتية', 'مقابلة العمل', 'البحث عن عمل']
    },
    category: 'recrutement'
  },
  {
    slug: 'entretien-embauche-reussir-2025',
    title: {
      fr: 'Entretien d\'Embauche 2025 : Guide Complet pour Réussir',
      en: 'Job Interview 2025: Complete Guide to Succeed',
      ar: 'مقابلة العمل 2025: دليل شامل للنجاح'
    },
    description: {
      fr: 'Guide complet pour réussir vos entretiens d\'embauche en 2025 : préparation, questions fréquentes, techniques, erreurs à éviter. Tous les conseils pour décrocher le poste.',
      en: 'Complete guide to succeed in your job interviews in 2025: preparation, common questions, techniques, mistakes to avoid. All advice to get the job.',
      ar: 'دليل شامل للنجاح في مقابلات العمل في عام 2025: التحضير، الأسئلة الشائعة، التقنيات، الأخطاء التي يجب تجنبها. جميع النصائح للحصول على الوظيفة.'
    },
    date: '2025-03-08',
    image: '/assets/blog/entretien-2025.svg',
    keywords: {
      fr: ['entretien d\'embauche', 'réussir entretien', 'préparation entretien', 'questions entretien', 'techniques entretien', 'entretien recrutement', 'décrocher emploi', 'conseils entretien'],
      en: ['job interview', 'succeed interview', 'interview preparation', 'interview questions', 'interview techniques', 'recruitment interview', 'get job', 'interview advice'],
      ar: ['مقابلة العمل', 'النجاح في المقابلة', 'تحضير المقابلة', 'أسئلة المقابلة', 'تقنيات المقابلة', 'مقابلة التوظيف', 'الحصول على الوظيفة', 'نصائح المقابلة']
    },
    category: 'recrutement'
  },
  {
    slug: 'linkedin-optimisation-profil-2025',
    title: {
      fr: 'LinkedIn 2025 : Guide Complet pour Optimiser son Profil Professionnel',
      en: 'LinkedIn 2025: Complete Guide to Optimize Your Professional Profile',
      ar: 'لينكد إن 2025: دليل شامل لتحسين ملفك المهني'
    },
    description: {
      fr: 'Guide complet pour optimiser votre profil LinkedIn en 2025 : titre, résumé, expériences, compétences, réseau. Tous les conseils pour attirer les recruteurs et développer votre réseau.',
      en: 'Complete guide to optimize your LinkedIn profile in 2025: title, summary, experiences, skills, network. All advice to attract recruiters and grow your network.',
      ar: 'دليل شامل لتحسين ملفك على لينكد إن في عام 2025: العنوان، الملخص، الخبرات، المهارات، الشبكة. جميع النصائح لجذب أصحاب العمل وتطوير شبكتك.'
    },
    date: '2025-03-09',
    image: '/assets/blog/linkedin-2025.svg',
    keywords: {
      fr: ['LinkedIn', 'profil LinkedIn', 'optimisation LinkedIn', 'réseau professionnel', 'LinkedIn recrutement', 'profil professionnel', 'réseautage', 'personal branding'],
      en: ['LinkedIn', 'LinkedIn profile', 'LinkedIn optimization', 'professional network', 'LinkedIn recruitment', 'professional profile', 'networking', 'personal branding'],
      ar: ['لينكد إن', 'ملف لينكد إن', 'تحسين لينكد إن', 'الشبكة المهنية', 'توظيف لينكد إن', 'الملف المهني', 'التواصل', 'العلامة الشخصية']
    },
    category: 'réseau'
  },
  {
    slug: 'networking-professionnel-2025',
    title: {
      fr: 'Networking Professionnel 2025 : Guide Complet pour Développer son Réseau',
      en: 'Professional Networking 2025: Complete Guide to Grow Your Network',
      ar: 'التواصل المهني 2025: دليل شامل لتطوير شبكتك'
    },
    description: {
      fr: 'Guide complet sur le networking professionnel en 2025 : stratégies, événements, réseaux sociaux, relations. Tous les conseils pour développer un réseau efficace et générer des opportunités.',
      en: 'Complete guide on professional networking in 2025: strategies, events, social networks, relationships. All advice to develop an effective network and generate opportunities.',
      ar: 'دليل شامل حول التواصل المهني في عام 2025: الاستراتيجيات، الأحداث، الشبكات الاجتماعية، العلاقات. جميع النصائح لتطوير شبكة فعالة وإنشاء الفرص.'
    },
    date: '2025-03-10',
    image: '/assets/blog/networking-2025.svg',
    keywords: {
      fr: ['networking', 'réseau professionnel', 'réseautage', 'développement réseau', 'événements professionnels', 'relations professionnelles', 'opportunités professionnelles', 'carrière'],
      en: ['networking', 'professional network', 'networking', 'network development', 'professional events', 'professional relationships', 'professional opportunities', 'career'],
      ar: ['التواصل', 'الشبكة المهنية', 'التواصل', 'تطوير الشبكة', 'الأحداث المهنية', 'العلاقات المهنية', 'الفرص المهنية', 'المسيرة']
    },
    category: 'réseau'
  },
  {
    slug: 'productivite-efficacite-travail-2025',
    title: {
      fr: 'Productivité et Efficacité au Travail 2025 : Techniques et Outils',
      en: 'Productivity and Efficiency at Work 2025: Techniques and Tools',
      ar: 'الإنتاجية والكفاءة في العمل 2025: التقنيات والأدوات'
    },
    description: {
      fr: 'Guide complet pour améliorer sa productivité et son efficacité au travail en 2025 : techniques, outils, méthodes, organisation. Tous les conseils pour être plus performant.',
      en: 'Complete guide to improve productivity and efficiency at work in 2025: techniques, tools, methods, organization. All advice to be more performant.',
      ar: 'دليل شامل لتحسين الإنتاجية والكفاءة في العمل في عام 2025: التقنيات، الأدوات، الطرق، التنظيم. جميع النصائح لتحسين الأداء.'
    },
    date: '2025-03-11',
    image: '/assets/blog/productivite-2025.svg',
    keywords: {
      fr: ['productivité', 'efficacité travail', 'gestion du temps', 'organisation travail', 'techniques productivité', 'outils productivité', 'performance professionnelle', 'optimisation travail'],
      en: ['productivity', 'work efficiency', 'time management', 'work organization', 'productivity techniques', 'productivity tools', 'professional performance', 'work optimization'],
      ar: ['الإنتاجية', 'كفاءة العمل', 'إدارة الوقت', 'تنظيم العمل', 'تقنيات الإنتاجية', 'أدوات الإنتاجية', 'الأداء المهني', 'تحسين العمل']
    },
    category: 'productivite'
  },
  {
    slug: 'communication-professionnelle-2025',
    title: {
      fr: 'Communication Professionnelle 2025 : Guide des Compétences Essentielles',
      en: 'Professional Communication 2025: Essential Skills Guide',
      ar: 'التواصل المهني 2025: دليل المهارات الأساسية'
    },
    description: {
      fr: 'Guide complet sur la communication professionnelle en 2025 : écoute, présentation, écrit, non verbal, interculturelle. Tous les conseils pour communiquer efficacement au travail.',
      en: 'Complete guide on professional communication in 2025: listening, presentation, writing, non-verbal, intercultural. All advice to communicate effectively at work.',
      ar: 'دليل شامل حول التواصل المهني في عام 2025: الاستماع، العرض، الكتابة، غير اللفظي، بين الثقافات. جميع النصائح للتواصل بفعالية في العمل.'
    },
    date: '2025-03-12',
    image: '/assets/blog/communication-2025.svg',
    keywords: {
      fr: ['communication professionnelle', 'compétences communication', 'écoute active', 'présentation professionnelle', 'communication écrite', 'communication non verbale', 'communication interculturelle', 'soft skills'],
      en: ['professional communication', 'communication skills', 'active listening', 'professional presentation', 'written communication', 'non-verbal communication', 'intercultural communication', 'soft skills'],
      ar: ['التواصل المهني', 'مهارات التواصل', 'الاستماع النشط', 'العرض المهني', 'التواصل الكتابي', 'التواصل غير اللفظي', 'التواصل بين الثقافات', 'المهارات الناعمة']
    },
    category: 'compétences'
  },
  {
    slug: 'objectifs-carriere-planification-2025',
    title: {
      fr: 'Objectifs de Carrière 2025 : Guide Complet pour Planifier sa Carrière',
      en: 'Career Goals 2025: Complete Guide to Plan Your Career',
      ar: 'أهداف المسيرة 2025: دليل شامل لتخطيط مسيرتك'
    },
    description: {
      fr: 'Guide complet pour définir et atteindre vos objectifs de carrière en 2025 : planification, stratégies, étapes, suivi. Tous les conseils pour construire la carrière de vos rêves.',
      en: 'Complete guide to define and achieve your career goals in 2025: planning, strategies, steps, tracking. All advice to build the career of your dreams.',
      ar: 'دليل شامل لتحديد وتحقيق أهدافك المهنية في عام 2025: التخطيط، الاستراتيجيات، الخطوات، المتابعة. جميع النصائح لبناء المسيرة التي تحلم بها.'
    },
    date: '2025-03-13',
    image: '/assets/blog/objectifs-carriere-2025.svg',
    keywords: {
      fr: ['objectifs carrière', 'planification carrière', 'développement carrière', 'stratégie carrière', 'évolution professionnelle', 'plan de carrière', 'objectifs professionnels', 'carrière'],
      en: ['career goals', 'career planning', 'career development', 'career strategy', 'professional evolution', 'career plan', 'professional goals', 'career'],
      ar: ['أهداف المسيرة', 'تخطيط المسيرة', 'تطوير المسيرة', 'استراتيجية المسيرة', 'التطور المهني', 'خطة المسيرة', 'الأهداف المهنية', 'المسيرة']
    },
    category: 'carrière'
  },
  {
    slug: 'mentorat-coaching-professionnel-2025',
    title: {
      fr: 'Mentorat et Coaching Professionnel 2025 : Guide Complet',
      en: 'Mentoring and Professional Coaching 2025: Complete Guide',
      ar: 'الإرشاد والتدريب المهني 2025: دليل شامل'
    },
    description: {
      fr: 'Guide complet sur le mentorat et le coaching professionnel en 2025 : trouver un mentor, devenir mentor, bénéfices, relations. Tous les conseils pour développer votre carrière avec l\'aide d\'un mentor.',
      en: 'Complete guide on mentoring and professional coaching in 2025: finding a mentor, becoming a mentor, benefits, relationships. All advice to develop your career with a mentor\'s help.',
      ar: 'دليل شامل حول الإرشاد والتدريب المهني في عام 2025: العثور على مرشد، أن تصبح مرشداً، الفوائد، العلاقات. جميع النصائح لتطوير مسيرتك بمساعدة مرشد.'
    },
    date: '2025-03-14',
    image: '/assets/blog/mentorat-2025.svg',
    keywords: {
      fr: ['mentorat', 'coaching professionnel', 'mentor', 'mentoré', 'développement carrière', 'guidance professionnelle', 'apprentissage', 'réseau professionnel'],
      en: ['mentoring', 'professional coaching', 'mentor', 'mentee', 'career development', 'professional guidance', 'learning', 'professional network'],
      ar: ['الإرشاد', 'التدريب المهني', 'المرشد', 'المسترشد', 'تطوير المسيرة', 'الإرشاد المهني', 'التعلم', 'الشبكة المهنية']
    },
    category: 'développement'
  },
  {
    slug: 'innovation-creativite-travail-2025',
    title: {
      fr: 'Innovation et Créativité au Travail 2025 : Développer sa Pensée Créative',
      en: 'Innovation and Creativity at Work 2025: Develop Your Creative Thinking',
      ar: 'الابتكار والإبداع في العمل 2025: تطوير تفكيرك الإبداعي'
    },
    description: {
      fr: 'Guide complet pour développer l\'innovation et la créativité au travail en 2025 : techniques, méthodes, environnement, culture. Tous les conseils pour être plus créatif et innovant.',
      en: 'Complete guide to develop innovation and creativity at work in 2025: techniques, methods, environment, culture. All advice to be more creative and innovative.',
      ar: 'دليل شامل لتطوير الابتكار والإبداع في العمل في عام 2025: التقنيات، الطرق، البيئة، الثقافة. جميع النصائح لتكون أكثر إبداعاً وابتكاراً.'
    },
    date: '2025-03-15',
    image: '/assets/blog/innovation-2025.svg',
    keywords: {
      fr: ['innovation', 'créativité', 'pensée créative', 'innovation travail', 'créativité professionnelle', 'développement créativité', 'culture innovation', 'résolution créative'],
      en: ['innovation', 'creativity', 'creative thinking', 'work innovation', 'professional creativity', 'creativity development', 'innovation culture', 'creative problem solving'],
      ar: ['الابتكار', 'الإبداع', 'التفكير الإبداعي', 'ابتكار العمل', 'الإبداع المهني', 'تطوير الإبداع', 'ثقافة الابتكار', 'حل المشاكل الإبداعي']
    },
    category: 'innovation'
  },
  {
    slug: 'diversite-inclusion-entreprise-2025',
    title: {
      fr: 'Diversité et Inclusion en Entreprise 2025 : Enjeux et Opportunités',
      en: 'Diversity and Inclusion in Companies 2025: Challenges and Opportunities',
      ar: 'التنوع والشمول في الشركات 2025: التحديات والفرص'
    },
    description: {
      fr: 'Guide complet sur la diversité et l\'inclusion en entreprise en 2025 : bénéfices, stratégies, mise en œuvre, enjeux. Tous les conseils pour créer un environnement inclusif.',
      en: 'Complete guide on diversity and inclusion in companies in 2025: benefits, strategies, implementation, challenges. All advice to create an inclusive environment.',
      ar: 'دليل شامل حول التنوع والشمول في الشركات في عام 2025: الفوائد، الاستراتيجيات، التنفيذ، التحديات. جميع النصائح لخلق بيئة شاملة.'
    },
    date: '2025-03-16',
    image: '/assets/blog/diversite-2025.svg',
    keywords: {
      fr: ['diversité', 'inclusion', 'diversité entreprise', 'inclusion entreprise', 'égalité professionnelle', 'culture inclusive', 'diversité recrutement', 'inclusion travail'],
      en: ['diversity', 'inclusion', 'corporate diversity', 'corporate inclusion', 'professional equality', 'inclusive culture', 'diversity recruitment', 'workplace inclusion'],
      ar: ['التنوع', 'الشمول', 'تنوع الشركات', 'شمول الشركات', 'المساواة المهنية', 'الثقافة الشاملة', 'توظيف التنوع', 'الشمول في العمل']
    },
    category: 'diversite'
  },
  {
    slug: 'teletravail-guide-complet-2025',
    title: {
      fr: 'Télétravail 2025 : Guide Complet pour Réussir le Travail à Distance',
      en: 'Remote Work 2025: Complete Guide to Succeed in Working from Home',
      ar: 'العمل عن بُعد 2025: دليل شامل للنجاح في العمل من المنزل'
    },
    description: {
      fr: 'Guide complet sur le télétravail en 2025 : organisation, productivité, équilibre, outils, communication. Tous les conseils pour réussir le travail à distance.',
      en: 'Complete guide on remote work in 2025: organization, productivity, balance, tools, communication. All advice to succeed in working from home.',
      ar: 'دليل شامل حول العمل عن بُعد في عام 2025: التنظيم، الإنتاجية، التوازن، الأدوات، التواصل. جميع النصائح للنجاح في العمل من المنزل.'
    },
    date: '2025-03-17',
    image: '/assets/blog/teletravail-2025.svg',
    keywords: {
      fr: ['télétravail', 'travail à distance', 'remote work', 'télétravail productivité', 'organisation télétravail', 'équilibre télétravail', 'outils télétravail', 'communication télétravail'],
      en: ['remote work', 'work from home', 'remote work', 'remote work productivity', 'remote work organization', 'remote work balance', 'remote work tools', 'remote work communication'],
      ar: ['العمل عن بُعد', 'العمل من المنزل', 'العمل عن بُعد', 'إنتاجية العمل عن بُعد', 'تنظيم العمل عن بُعد', 'توازن العمل عن بُعد', 'أدوات العمل عن بُعد', 'تواصل العمل عن بُعد']
    },
    category: 'télétravail'
  },
  {
    slug: 'negociation-salaire-2025',
    title: {
      fr: 'Négociation Salariale 2025 : Guide Complet pour Négocier son Salaire',
      en: 'Salary Negotiation 2025: Complete Guide to Negotiate Your Salary',
      ar: 'تفاوض الراتب 2025: دليل شامل للتفاوض على راتبك'
    },
    description: {
      fr: 'Guide complet sur la négociation salariale en 2025 : préparation, techniques, timing, erreurs à éviter. Tous les conseils pour négocier efficacement votre rémunération.',
      en: 'Complete guide on salary negotiation in 2025: preparation, techniques, timing, mistakes to avoid. All advice to negotiate your compensation effectively.',
      ar: 'دليل شامل حول تفاوض الراتب في عام 2025: التحضير، التقنيات، التوقيت، الأخطاء التي يجب تجنبها. جميع النصائح للتفاوض بفعالية على تعويضك.'
    },
    date: '2025-03-18',
    image: '/assets/blog/negociation-salaire-2025.svg',
    keywords: {
      fr: ['négociation salaire', 'négociation salariale', 'négocier salaire', 'augmentation salaire', 'rémunération', 'salaire négociation', 'techniques négociation', 'conseils négociation'],
      en: ['salary negotiation', 'salary negotiation', 'negotiate salary', 'salary increase', 'compensation', 'salary negotiation', 'negotiation techniques', 'negotiation advice'],
      ar: ['تفاوض الراتب', 'تفاوض الراتب', 'التفاوض على الراتب', 'زيادة الراتب', 'التعويض', 'تفاوض الراتب', 'تقنيات التفاوض', 'نصائح التفاوض']
    },
    category: 'carrière'
  },
  {
    slug: 'personal-branding-2025',
    title: {
      fr: 'Personal Branding 2025 : Guide Complet pour Construire sa Marque Personnelle',
      en: 'Personal Branding 2025: Complete Guide to Build Your Personal Brand',
      ar: 'العلامة الشخصية 2025: دليل شامل لبناء علامتك الشخصية'
    },
    description: {
      fr: 'Guide complet sur le personal branding en 2025 : stratégie, réseaux sociaux, contenu, visibilité. Tous les conseils pour construire une marque personnelle forte et attractive.',
      en: 'Complete guide on personal branding in 2025: strategy, social networks, content, visibility. All advice to build a strong and attractive personal brand.',
      ar: 'دليل شامل حول العلامة الشخصية في عام 2025: الاستراتيجية، الشبكات الاجتماعية، المحتوى، الرؤية. جميع النصائح لبناء علامة شخصية قوية وجذابة.'
    },
    date: '2025-03-19',
    image: '/assets/blog/personal-branding-2025.svg',
    keywords: {
      fr: ['personal branding', 'marque personnelle', 'image professionnelle', 'réputation en ligne', 'e-réputation', 'stratégie personal branding', 'réseaux sociaux professionnels', 'visibilité professionnelle'],
      en: ['personal branding', 'personal brand', 'professional image', 'online reputation', 'e-reputation', 'personal branding strategy', 'professional social networks', 'professional visibility'],
      ar: ['العلامة الشخصية', 'العلامة الشخصية', 'الصورة المهنية', 'السمعة على الإنترنت', 'السمعة الإلكترونية', 'استراتيجية العلامة الشخصية', 'الشبكات الاجتماعية المهنية', 'الرؤية المهنية']
    },
    category: 'branding'
  },
  {
    slug: 'gestion-projet-professionnel-2025',
    title: {
      fr: 'Gestion de Projet Professionnel 2025 : Méthodes et Outils',
      en: 'Professional Project Management 2025: Methods and Tools',
      ar: 'إدارة المشاريع المهنية 2025: الطرق والأدوات'
    },
    description: {
      fr: 'Guide complet sur la gestion de projet professionnel en 2025 : méthodes agiles, outils, planification, exécution. Tous les conseils pour réussir vos projets professionnels.',
      en: 'Complete guide on professional project management in 2025: agile methods, tools, planning, execution. All advice to succeed in your professional projects.',
      ar: 'دليل شامل حول إدارة المشاريع المهنية في عام 2025: الطرق المرنة، الأدوات، التخطيط، التنفيذ. جميع النصائح للنجاح في مشاريعك المهنية.'
    },
    date: '2025-03-20',
    image: '/assets/blog/gestion-projet-2025.svg',
    keywords: {
      fr: ['gestion de projet', 'management projet', 'méthodes agiles', 'outils gestion projet', 'planification projet', 'chef de projet', 'méthodologie projet', 'suivi projet'],
      en: ['project management', 'project management', 'agile methods', 'project management tools', 'project planning', 'project manager', 'project methodology', 'project tracking'],
      ar: ['إدارة المشاريع', 'إدارة المشاريع', 'الطرق المرنة', 'أدوات إدارة المشاريع', 'تخطيط المشروع', 'مدير المشروع', 'منهجية المشروع', 'متابعة المشروع']
    },
    category: 'management'
  },
  {
    slug: 'carriere-internationale-2025',
    title: {
      fr: 'Carrière Internationale 2025 : Guide Complet pour Travailler à l\'Étranger',
      en: 'International Career 2025: Complete Guide to Work Abroad',
      ar: 'المسيرة الدولية 2025: دليل شامل للعمل في الخارج'
    },
    description: {
      fr: 'Guide complet pour développer une carrière internationale en 2025 : opportunités, compétences, préparation, défis. Tous les conseils pour réussir à l\'international.',
      en: 'Complete guide to develop an international career in 2025: opportunities, skills, preparation, challenges. All advice to succeed internationally.',
      ar: 'دليل شامل لتطوير مسيرة دولية في عام 2025: الفرص، المهارات، التحضير، التحديات. جميع النصائح للنجاح دولياً.'
    },
    date: '2025-03-21',
    image: '/assets/blog/carriere-internationale-2025.svg',
    keywords: {
      fr: ['carrière internationale', 'travailler à l\'étranger', 'expatriation', 'mobilité internationale', 'emploi international', 'compétences internationales', 'carrière globale', 'opportunités internationales'],
      en: ['international career', 'work abroad', 'expatriation', 'international mobility', 'international employment', 'international skills', 'global career', 'international opportunities'],
      ar: ['المسيرة الدولية', 'العمل في الخارج', 'العيش في الخارج', 'الحراك الدولي', 'التوظيف الدولي', 'المهارات الدولية', 'المسيرة العالمية', 'الفرص الدولية']
    },
    category: 'carrière'
  },
  {
    slug: 'transition-carriere-2025',
    title: {
      fr: 'Transition de Carrière 2025 : Guide Complet pour Changer de Voie',
      en: 'Career Transition 2025: Complete Guide to Change Path',
      ar: 'الانتقال المهني 2025: دليل شامل لتغيير المسار'
    },
    description: {
      fr: 'Guide complet sur la transition de carrière en 2025 : étapes, préparation, stratégies, défis. Tous les conseils pour réussir votre changement de voie professionnelle.',
      en: 'Complete guide on career transition in 2025: steps, preparation, strategies, challenges. All advice to succeed in your career path change.',
      ar: 'دليل شامل حول الانتقال المهني في عام 2025: الخطوات، التحضير، الاستراتيجيات، التحديات. جميع النصائح للنجاح في تغيير مسارك المهني.'
    },
    date: '2025-03-22',
    image: '/assets/blog/transition-carriere-2025.svg',
    keywords: {
      fr: ['transition carrière', 'changement carrière', 'changement de voie', 'transition professionnelle', 'nouvelle carrière', 'évolution carrière', 'changement métier', 'transition réussie'],
      en: ['career transition', 'career change', 'path change', 'professional transition', 'new career', 'career evolution', 'job change', 'successful transition'],
      ar: ['الانتقال المهني', 'تغيير المسيرة', 'تغيير المسار', 'الانتقال المهني', 'مسيرة جديدة', 'تطور المسيرة', 'تغيير المهنة', 'انتقال ناجح']
    },
    category: 'transition'
  },
  {
    slug: 'evaluation-performance-professionnelle-2025',
    title: {
      fr: 'Évaluation de Performance Professionnelle 2025 : Guide Complet',
      en: 'Professional Performance Evaluation 2025: Complete Guide',
      ar: 'تقييم الأداء المهني 2025: دليل شامل'
    },
    description: {
      fr: 'Guide complet sur l\'évaluation de performance professionnelle en 2025 : préparation, entretiens, objectifs, développement. Tous les conseils pour réussir vos évaluations.',
      en: 'Complete guide on professional performance evaluation in 2025: preparation, interviews, goals, development. All advice to succeed in your evaluations.',
      ar: 'دليل شامل حول تقييم الأداء المهني في عام 2025: التحضير، المقابلات، الأهداف، التطوير. جميع النصائح للنجاح في تقييماتك.'
    },
    date: '2025-03-23',
    image: '/assets/blog/evaluation-performance-2025.svg',
    keywords: {
      fr: ['évaluation performance', 'entretien annuel', 'évaluation professionnelle', 'objectifs professionnels', 'développement professionnel', 'feedback professionnel', 'performance travail', 'évaluation employé'],
      en: ['performance evaluation', 'annual review', 'professional evaluation', 'professional goals', 'professional development', 'professional feedback', 'work performance', 'employee evaluation'],
      ar: ['تقييم الأداء', 'المراجعة السنوية', 'التقييم المهني', 'الأهداف المهنية', 'التطوير المهني', 'التغذية الراجعة المهنية', 'أداء العمل', 'تقييم الموظف']
    },
    category: 'carrière'
  },
  {
    slug: 'retraite-planification-financiere-2025',
    title: {
      fr: 'Retraite et Planification Financière 2025 : Guide Complet',
      en: 'Retirement and Financial Planning 2025: Complete Guide',
      ar: 'التقاعد والتخطيط المالي 2025: دليل شامل'
    },
    description: {
      fr: 'Guide complet sur la retraite et la planification financière en 2025 : épargne, investissements, préparation, stratégies. Tous les conseils pour préparer sereinement votre retraite.',
      en: 'Complete guide on retirement and financial planning in 2025: savings, investments, preparation, strategies. All advice to prepare your retirement serenely.',
      ar: 'دليل شامل حول التقاعد والتخطيط المالي في عام 2025: الادخار، الاستثمارات، التحضير، الاستراتيجيات. جميع النصائح للتحضير للتقاعد بهدوء.'
    },
    date: '2025-03-24',
    image: '/assets/blog/retraite-2025.svg',
    keywords: {
      fr: ['retraite', 'planification financière', 'épargne retraite', 'préparation retraite', 'investissement retraite', 'planification retraite', 'finances retraite', 'sécurité financière'],
      en: ['retirement', 'financial planning', 'retirement savings', 'retirement preparation', 'retirement investment', 'retirement planning', 'retirement finances', 'financial security'],
      ar: ['التقاعد', 'التخطيط المالي', 'ادخار التقاعد', 'تحضير التقاعد', 'استثمار التقاعد', 'تخطيط التقاعد', 'أموال التقاعد', 'الأمن المالي']
    },
    category: 'retraite'
  },
  {
    slug: 'success-stories-carriere-2025',
    title: {
      fr: 'Success Stories de Carrière 2025 : Inspirations et Leçons',
      en: 'Career Success Stories 2025: Inspirations and Lessons',
      ar: 'قصص نجاح المسيرة 2025: الإلهام والدروس'
    },
    description: {
      fr: 'Découvrez des success stories de carrière en 2025 : parcours inspirants, leçons apprises, conseils. Des exemples concrets pour vous inspirer dans votre développement professionnel.',
      en: 'Discover career success stories in 2025: inspiring journeys, lessons learned, advice. Concrete examples to inspire you in your professional development.',
      ar: 'اكتشف قصص نجاح المسيرة في عام 2025: رحلات ملهمة، دروس مستفادة، نصائح. أمثلة ملموسة لإلهامك في تطويرك المهني.'
    },
    date: '2025-03-25',
    image: '/assets/blog/success-stories-2025.svg',
    keywords: {
      fr: ['success stories', 'histoires de réussite', 'parcours inspirant', 'réussite professionnelle', 'leçons carrière', 'inspiration carrière', 'exemples réussite', 'développement carrière'],
      en: ['success stories', 'success stories', 'inspiring journey', 'professional success', 'career lessons', 'career inspiration', 'success examples', 'career development'],
      ar: ['قصص النجاح', 'قصص النجاح', 'رحلة ملهمة', 'النجاح المهني', 'دروس المسيرة', 'إلهام المسيرة', 'أمثلة النجاح', 'تطوير المسيرة']
    },
    category: 'inspiration'
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
 * Charger les articles depuis les fichiers markdown dans articles-seo/
 */
const loadArticlesFromMarkdown = async (language = 'fr') => {
  const articles = []
  const basePath = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '')
  
  try {
    // Charger la liste des dossiers article-XX depuis le serveur
    // On va essayer de charger un fichier index qui liste les articles
    // Sinon, on va itérer sur les numéros d'articles connus (1-40)
    for (let i = 1; i <= 40; i++) {
      const articleNum = i.toString().padStart(2, '0')
      const metadataPath = `${basePath}/articles-seo/article-${articleNum}/metadata.json`
      
      try {
        const metadataResponse = await fetch(metadataPath, { cache: 'no-cache' })
        if (metadataResponse.ok) {
          const metadata = await metadataResponse.json()
          
          // Vérifier que le slug existe pour la langue demandée
          const slugKey = `slug_${language}`
          const titleKey = `title_${language}`
          const descriptionKey = `description_${language}`
          
          if (metadata[slugKey] && metadata[titleKey]) {
            articles.push({
              slug: metadata[slugKey],
              title: metadata[titleKey],
              description: metadata[descriptionKey] || '',
              date: metadata.datePublication || '2025-01-01',
              image: metadata.image || `/assets/blog/default-${metadata.category || 'blog'}.svg`,
              keywords: [],
              category: metadata.category || 'blog'
            })
          }
        }
      } catch (err) {
        // Ignorer les erreurs pour les articles qui n'existent pas
        continue
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement des articles markdown:', error)
  }
  
  return articles
}

/**
 * Obtenir tous les articles (depuis Supabase + markdown + fallback statique)
 */
export const getAllArticles = async (language = 'fr') => {
  const combinedArticles = []
  const slugSet = new Set()

  // Essayer de charger depuis Supabase
  if (supabase && supabaseEnabled) {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (error) {
        console.error('Erreur Supabase:', error)
      } else if (data && data.length > 0) {
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

  // Charger les articles depuis les fichiers markdown
  try {
    const markdownArticles = await loadArticlesFromMarkdown(language)
    markdownArticles.forEach(article => {
      if (!slugSet.has(article.slug)) {
        combinedArticles.push(article)
        slugSet.add(article.slug)
      }
    })
  } catch (error) {
    console.error('Erreur lors du chargement des articles markdown:', error)
  }

  // Ajouter les articles statiques manquants
  staticArticles.forEach(article => {
    if (!slugSet.has(article.slug)) {
      const mapped = mapStaticArticle(article, language)
      combinedArticles.push(mapped)
    }
  })

  if (combinedArticles.length === 0) {
    return staticArticles.map(article => mapStaticArticle(article, language))
  }

  return combinedArticles.sort((a, b) => new Date(b.date) - new Date(a.date))
}

/**
 * Obtenir un article par son slug (depuis Supabase, markdown ou fallback)
 */
export const getArticleBySlug = async (slug, language = 'fr') => {
  // Essayer de charger depuis Supabase
  if (supabase && supabaseEnabled) {
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

  // Essayer de charger depuis les fichiers markdown dans articles-seo/
  const basePath = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '')
  for (let i = 1; i <= 40; i++) {
    const articleNum = i.toString().padStart(2, '0')
    const metadataPath = `${basePath}/articles-seo/article-${articleNum}/metadata.json`
    
    try {
      const metadataResponse = await fetch(metadataPath, { cache: 'no-cache' })
      if (metadataResponse.ok) {
        const metadata = await metadataResponse.json()
        const slugKey = `slug_${language}`
        
        if (metadata[slugKey] === slug) {
          // Charger le contenu markdown
          const markdownPath = `${basePath}/articles-seo/article-${articleNum}/${language}.md`
          let content = ''
          
          try {
            const contentResponse = await fetch(markdownPath, { cache: 'no-cache' })
            if (contentResponse.ok) {
              const rawText = await contentResponse.text()
              
              // Parser le front matter et extraire le contenu
              const frontMatterMatch = rawText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
              if (frontMatterMatch) {
                // Extraire le contenu après le front matter
                content = rawText.slice(frontMatterMatch[0].length).trim()
              } else {
                // Si pas de front matter, utiliser tout le contenu
                content = rawText.trim()
              }
              
              // Vérifier que le contenu n'est pas un placeholder
              if (content.includes('[Contenu à compléter') || content.includes('Contenu à compléter')) {
                console.warn(`Article ${articleNum} contient un placeholder, article ignoré`)
                // Ne pas retourner cet article
                continue
              }
              
              // Vérifier que le contenu a une longueur minimale
              if (content.length < 1000) {
                console.warn(`Article ${articleNum} a un contenu trop court (${content.length} caractères), article ignoré`)
                continue
              }
            }
          } catch (err) {
            console.error('Erreur chargement markdown:', err)
          }
          
          return {
            slug: metadata[slugKey],
            title: metadata[`title_${language}`] || metadata.title_fr,
            description: metadata[`description_${language}`] || metadata.description_fr,
            date: metadata.datePublication || '2025-01-01',
            image: metadata.image || `/assets/blog/default-${metadata.category || 'blog'}.svg`,
            keywords: [],
            category: metadata.category || 'blog',
            content: content
          }
        }
      }
    } catch (err) {
      continue
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

