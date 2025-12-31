const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '../public/articles-seo');

// Plan des 10 articles sur l'Employabilité 4.0 et l'IA
const articles = [
  {
    num: 31,
    title_fr: "Employabilité 4.0 : Comment l'IA transforme le marché du travail en 2025",
    slug_fr: "employabilite-4-0-ia-transforme-marche-travail-2025",
    description_fr: "Découvrez comment l'employabilité 4.0 et l'intelligence artificielle transforment le marché du travail en 2025. Guide complet sur les nouvelles compétences requises et les opportunités de carrière.",
    title_en: "Employability 4.0: How AI is Transforming the Job Market in 2025",
    slug_en: "employability-4-0-ai-transforms-job-market-2025",
    description_en: "Discover how employability 4.0 and artificial intelligence are transforming the job market in 2025. Complete guide on new required skills and career opportunities.",
    title_ar: "القابلية للتشغيل 4.0: كيف تحول الذكاء الاصطناعي سوق العمل في 2025",
    slug_ar: "القابلية-للتشغيل-4-0-الذكاء-الاصطناعي-2025",
    description_ar: "اكتشف كيف تحول القابلية للتشغيل 4.0 والذكاء الاصطناعي سوق العمل في 2025. دليل شامل حول المهارات الجديدة المطلوبة وفرص العمل.",
    category: "employabilite",
    date: "2025-02-20"
  },
  {
    num: 32,
    title_fr: "Piloter sa carrière avec l'IA : outils et stratégies pour réussir",
    slug_fr: "piloter-carriere-ia-outils-strategies-reussir",
    description_fr: "Apprenez à piloter votre carrière avec l'intelligence artificielle. Découvrez les meilleurs outils IA pour l'orientation professionnelle, la recherche d'emploi et le développement de compétences.",
    title_en: "Managing Your Career with AI: Tools and Strategies for Success",
    slug_en: "manage-career-ai-tools-strategies-success",
    description_en: "Learn how to manage your career with artificial intelligence. Discover the best AI tools for career guidance, job search and skills development.",
    title_ar: "إدارة مسيرتك المهنية بالذكاء الاصطناعي: الأدوات والاستراتيجيات للنجاح",
    slug_ar: "إدارة-المسيرة-المهنية-الذكاء-الاصطناعي",
    description_ar: "تعلم كيفية إدارة مسيرتك المهنية بالذكاء الاصطناعي. اكتشف أفضل أدوات الذكاء الاصطناعي للتوجيه المهني والبحث عن عمل وتطوير المهارات.",
    category: "orientation",
    date: "2025-02-21"
  },
  {
    num: 33,
    title_fr: "Compétences du futur : quelles sont les soft skills essentielles à l'ère de l'IA ?",
    slug_fr: "competences-futur-soft-skills-essentielles-ere-ia",
    description_fr: "Découvrez les compétences du futur essentielles à l'ère de l'intelligence artificielle. Guide complet sur les soft skills qui feront la différence dans votre carrière professionnelle.",
    title_en: "Future Skills: What are the Essential Soft Skills in the AI Era?",
    slug_en: "future-skills-essential-soft-skills-ai-era",
    description_en: "Discover the essential future skills in the artificial intelligence era. Complete guide on soft skills that will make a difference in your professional career.",
    title_ar: "مهارات المستقبل: ما هي المهارات الناعمة الأساسية في عصر الذكاء الاصطناعي؟",
    slug_ar: "مهارات-المستقبل-المهارات-الناعمة-الذكاء-الاصطناعي",
    description_ar: "اكتشف المهارات المستقبلية الأساسية في عصر الذكاء الاصطناعي. دليل شامل حول المهارات الناعمة التي ستحقق الفرق في مسيرتك المهنية.",
    category: "competences",
    date: "2025-02-22"
  },
  {
    num: 34,
    title_fr: "Reconversion professionnelle avec l'IA : comment se former aux métiers de demain",
    slug_fr: "reconversion-professionnelle-ia-se-former-metiers-demain",
    description_fr: "Guide complet sur la reconversion professionnelle à l'ère de l'IA. Découvrez comment utiliser l'intelligence artificielle pour identifier les métiers d'avenir et vous former efficacement.",
    title_en: "Career Change with AI: How to Train for Tomorrow's Jobs",
    slug_en: "career-change-ai-train-tomorrow-jobs",
    description_en: "Complete guide on career change in the AI era. Discover how to use artificial intelligence to identify future jobs and train effectively.",
    title_ar: "إعادة التوجيه المهني بالذكاء الاصطناعي: كيف تتدرب على مهن الغد",
    slug_ar: "إعادة-التوجيه-المهني-الذكاء-الاصطناعي",
    description_ar: "دليل شامل حول إعادة التوجيه المهني في عصر الذكاء الاصطناعي. اكتشف كيفية استخدام الذكاء الاصطناعي لتحديد مهن المستقبل والتدرب بفعالية.",
    category: "formation",
    date: "2025-02-23"
  },
  {
    num: 35,
    title_fr: "L'IA au service de l'orientation professionnelle : outils et plateformes innovantes",
    slug_fr: "ia-service-orientation-professionnelle-outils-plateformes-innovantes",
    description_fr: "Découvrez comment l'intelligence artificielle révolutionne l'orientation professionnelle. Guide sur les meilleurs outils et plateformes IA pour trouver votre voie professionnelle.",
    title_en: "AI at the Service of Career Guidance: Innovative Tools and Platforms",
    slug_en: "ai-career-guidance-innovative-tools-platforms",
    description_en: "Discover how artificial intelligence is revolutionizing career guidance. Guide to the best AI tools and platforms to find your professional path.",
    title_ar: "الذكاء الاصطناعي في خدمة التوجيه المهني: الأدوات والمنصات المبتكرة",
    slug_ar: "الذكاء-الاصطناعي-التوجيه-المهني",
    description_ar: "اكتشف كيف يحدث الذكاء الاصطناعي ثورة في التوجيه المهني. دليل حول أفضل أدوات ومنصات الذكاء الاصطناعي لإيجاد مسارك المهني.",
    category: "orientation",
    date: "2025-02-24"
  },
  {
    num: 36,
    title_fr: "CV et lettre de motivation à l'ère de l'IA : comment se démarquer ?",
    slug_fr: "cv-lettre-motivation-ere-ia-comment-demarquer",
    description_fr: "Apprenez à créer un CV et une lettre de motivation qui se démarquent à l'ère de l'intelligence artificielle. Conseils pratiques pour optimiser votre candidature avec l'IA.",
    title_en: "CV and Cover Letter in the AI Era: How to Stand Out?",
    slug_en: "cv-cover-letter-ai-era-stand-out",
    description_en: "Learn how to create a CV and cover letter that stand out in the artificial intelligence era. Practical tips to optimize your application with AI.",
    title_ar: "السيرة الذاتية ورسالة التحفيز في عصر الذكاء الاصطناعي: كيف تبرز؟",
    slug_ar: "السيرة-الذاتية-الذكاء-الاصطناعي",
    description_ar: "تعلم كيفية إنشاء سيرة ذاتية ورسالة تحفيز تبرز في عصر الذكاء الاصطناعي. نصائح عملية لتحسين طلبك بالذكاء الاصطناعي.",
    category: "emploi",
    date: "2025-02-25"
  },
  {
    num: 37,
    title_fr: "Formation continue et apprentissage avec l'IA : les meilleures pratiques",
    slug_fr: "formation-continue-apprentissage-ia-meilleures-pratiques",
    description_fr: "Découvrez comment utiliser l'intelligence artificielle pour votre formation continue et votre apprentissage professionnel. Guide complet sur les meilleures pratiques et outils IA.",
    title_en: "Continuing Education and Learning with AI: Best Practices",
    slug_en: "continuing-education-learning-ai-best-practices",
    description_en: "Discover how to use artificial intelligence for your continuing education and professional learning. Complete guide on best practices and AI tools.",
    title_ar: "التكوين المستمر والتعلم بالذكاء الاصطناعي: أفضل الممارسات",
    slug_ar: "التكوين-المستمر-الذكاء-الاصطناعي",
    description_ar: "اكتشف كيفية استخدام الذكاء الاصطناعي لتكوينك المستمر وتعلمك المهني. دليل شامل حول أفضل الممارسات وأدوات الذكاء الاصطناعي.",
    category: "formation",
    date: "2025-02-26"
  },
  {
    num: 38,
    title_fr: "Métiers en croissance grâce à l'IA : opportunités de carrière en 2025",
    slug_fr: "metiers-croissance-grace-ia-opportunites-carriere-2025",
    description_fr: "Explorez les métiers en forte croissance grâce à l'intelligence artificielle. Découvrez les opportunités de carrière les plus prometteuses en 2025 et les compétences requises.",
    title_en: "Growing Jobs Thanks to AI: Career Opportunities in 2025",
    slug_en: "growing-jobs-ai-career-opportunities-2025",
    description_en: "Explore jobs with strong growth thanks to artificial intelligence. Discover the most promising career opportunities in 2025 and required skills.",
    title_ar: "المهن المتزايدة بفضل الذكاء الاصطناعي: فرص العمل في 2025",
    slug_ar: "المهن-المتزايدة-الذكاء-الاصطناعي-2025",
    description_ar: "استكشف المهن ذات النمو القوي بفضل الذكاء الاصطناعي. اكتشف فرص العمل الأكثر وعداً في 2025 والمهارات المطلوبة.",
    category: "metiers",
    date: "2025-02-27"
  },
  {
    num: 39,
    title_fr: "Networking et développement professionnel avec l'IA : stratégies efficaces",
    slug_fr: "networking-developpement-professionnel-ia-strategies-efficaces",
    description_fr: "Apprenez à utiliser l'intelligence artificielle pour développer votre réseau professionnel et accélérer votre carrière. Stratégies et outils IA pour un networking efficace.",
    title_en: "Networking and Professional Development with AI: Effective Strategies",
    slug_en: "networking-professional-development-ai-effective-strategies",
    description_en: "Learn how to use artificial intelligence to develop your professional network and accelerate your career. Strategies and AI tools for effective networking.",
    title_ar: "الشبكات والتطوير المهني بالذكاء الاصطناعي: استراتيجيات فعالة",
    slug_ar: "الشبكات-التطوير-المهني-الذكاء-الاصطناعي",
    description_ar: "تعلم كيفية استخدام الذكاء الاصطناعي لتطوير شبكتك المهنية وتسريع مسيرتك. استراتيجيات وأدوات الذكاء الاصطناعي للشبكات الفعالة.",
    category: "rh",
    date: "2025-02-28"
  },
  {
    num: 40,
    title_fr: "Entrepreneuriat et IA : comment lancer son projet professionnel en 2025",
    slug_fr: "entrepreneuriat-ia-lancer-projet-professionnel-2025",
    description_fr: "Découvrez comment l'intelligence artificielle transforme l'entrepreneuriat. Guide complet pour lancer votre projet professionnel avec l'IA en 2025.",
    title_en: "Entrepreneurship and AI: How to Launch Your Professional Project in 2025",
    slug_en: "entrepreneurship-ai-launch-professional-project-2025",
    description_en: "Discover how artificial intelligence is transforming entrepreneurship. Complete guide to launching your professional project with AI in 2025.",
    title_ar: "ريادة الأعمال والذكاء الاصطناعي: كيف تطلق مشروعك المهني في 2025",
    slug_ar: "ريادة-الأعمال-الذكاء-الاصطناعي-2025",
    description_ar: "اكتشف كيف يحول الذكاء الاصطناعي ريادة الأعمال. دليل شامل لإطلاق مشروعك المهني بالذكاء الاصطناعي في 2025.",
    category: "entrepreneuriat",
    date: "2025-03-01"
  }
];

// Fonction pour créer la structure d'un article
function createArticleStructure(article) {
  const articleDir = path.join(ARTICLES_DIR, `article-${String(article.num).padStart(2, '0')}`);
  
  // Créer le dossier
  if (!fs.existsSync(articleDir)) {
    fs.mkdirSync(articleDir, { recursive: true });
  }

  // Créer metadata.json
  const metadata = {
    title_fr: article.title_fr,
    slug_fr: article.slug_fr,
    description_fr: article.description_fr,
    title_en: article.title_en,
    slug_en: article.slug_en,
    description_en: article.description_en,
    title_ar: article.title_ar,
    slug_ar: article.slug_ar,
    description_ar: article.description_ar,
    category: article.category,
    datePublication: article.date
  };

  fs.writeFileSync(
    path.join(articleDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );

  // Créer schema.json
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title_fr,
    "description": article.description_fr,
    "image": "/assets/blog/default-ia.svg",
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Organization",
      "name": "Quiz Orientation"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Quiz Orientation",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quizorientation.online/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://quizorientation.online/blog/${article.slug_fr}`
    }
  };

  fs.writeFileSync(
    path.join(articleDir, 'schema.json'),
    JSON.stringify(schema, null, 2)
  );

  // Créer les fichiers markdown (vides pour l'instant, seront remplis après)
  fs.writeFileSync(path.join(articleDir, 'fr.md'), '');
  fs.writeFileSync(path.join(articleDir, 'en.md'), '');
  fs.writeFileSync(path.join(articleDir, 'ar.md'), '');

  console.log(`✅ Article ${article.num} créé : ${article.title_fr}`);
}

// Créer tous les articles
console.log('🚀 Création des 10 articles sur l\'Employabilité 4.0 et l\'IA...\n');
articles.forEach(article => {
  createArticleStructure(article);
});

console.log('\n✅ Tous les articles ont été créés avec succès !');
console.log('📝 Les fichiers markdown sont vides et doivent être remplis avec le contenu complet.');




