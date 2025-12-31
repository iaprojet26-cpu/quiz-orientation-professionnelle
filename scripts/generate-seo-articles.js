import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Liste des 30 articles avec leurs métadonnées
const articles = [
  {
    id: 1,
    title_fr: "Comment devenir développeur web en 2025 : Guide complet formation, salaire et compétences",
    slug_fr: "comment-devenir-developpeur-web-2025",
    title_en: "How to Become a Web Developer in 2025: Complete Guide to Training, Salary and Skills",
    slug_en: "how-to-become-web-developer-2025",
    title_ar: "كيف تصبح مطور ويب في 2025: دليل شامل للتدريب والراتب والمهارات",
    slug_ar: "كيف-تصبح-مطور-ويب-2025",
    category: "métiers",
    date: "2025-01-15"
  },
  {
    id: 2,
    title_fr: "Métier Data Analyst : formation, salaire, compétences et débouchés en 2025",
    slug_fr: "metier-data-analyst-formation-salaire-2025",
    title_en: "Data Analyst Career: Training, Salary, Skills and Opportunities in 2025",
    slug_en: "data-analyst-career-training-salary-2025",
    title_ar: "مهنة محلل البيانات: التدريب والراتب والمهارات والفرص في 2025",
    slug_ar: "مهنة-محلل-البيانات-2025",
    category: "métiers",
    date: "2025-01-16"
  },
  {
    id: 3,
    title_fr: "Infirmier en 2025 : parcours, débouchés, salaires et formations",
    slug_fr: "infirmier-2025-parcours-debouches-salaires",
    title_en: "Nurse in 2025: Career Path, Opportunities, Salaries and Training",
    slug_en: "nurse-2025-career-opportunities-salaries",
    title_ar: "الممرض في 2025: المسار المهني والفرص والرواتب والتدريب",
    slug_ar: "الممرض-2025",
    category: "métiers",
    date: "2025-01-17"
  },
  {
    id: 4,
    title_fr: "Ingénieur IA : pourquoi c'est le métier du futur en 2025",
    slug_fr: "ingenieur-ia-metier-futur-2025",
    title_en: "AI Engineer: Why It's the Job of the Future in 2025",
    slug_en: "ai-engineer-future-job-2025",
    title_ar: "مهندس الذكاء الاصطناعي: لماذا هي مهنة المستقبل في 2025",
    slug_ar: "مهندس-الذكاء-الاصطناعي-2025",
    category: "métiers",
    date: "2025-01-18"
  },
  {
    id: 5,
    title_fr: "Gestionnaire RH : fiche métier complète, compétences et salaire 2025",
    slug_fr: "gestionnaire-rh-fiche-metier-2025",
    title_en: "HR Manager: Complete Job Description, Skills and Salary 2025",
    slug_en: "hr-manager-job-description-2025",
    title_ar: "مدير الموارد البشرية: وصف الوظيفة الكامل والمهارات والراتب 2025",
    slug_ar: "مدير-الموارد-البشرية-2025",
    category: "métiers",
    date: "2025-01-19"
  },
  {
    id: 6,
    title_fr: "Agent immobilier : comment réussir en 2025, formation et conseils",
    slug_fr: "agent-immobilier-reussir-2025",
    title_en: "Real Estate Agent: How to Succeed in 2025, Training and Tips",
    slug_en: "real-estate-agent-succeed-2025",
    title_ar: "وكيل عقاري: كيف تنجح في 2025، التدريب والنصائح",
    slug_ar: "وكيل-عقاري-2025",
    category: "métiers",
    date: "2025-01-20"
  },
  {
    id: 7,
    title_fr: "Technicien en réseaux et cybersécurité : parcours complet et formations 2025",
    slug_fr: "technicien-reseaux-cybersecurite-2025",
    title_en: "Network and Cybersecurity Technician: Complete Career Path and Training 2025",
    slug_en: "network-cybersecurity-technician-2025",
    title_ar: "فني الشبكات والأمن السيبراني: المسار المهني الكامل والتدريب 2025",
    slug_ar: "فني-الشبكات-الأمن-2025",
    category: "métiers",
    date: "2025-01-21"
  },
  {
    id: 8,
    title_fr: "Assistant(e) administratif(ve) : compétences essentielles et débouchés 2025",
    slug_fr: "assistant-administratif-competences-2025",
    title_en: "Administrative Assistant: Essential Skills and Opportunities 2025",
    slug_en: "administrative-assistant-skills-2025",
    title_ar: "مساعد إداري: المهارات الأساسية والفرص 2025",
    slug_ar: "مساعد-إداري-2025",
    category: "métiers",
    date: "2025-01-22"
  },
  {
    id: 9,
    title_fr: "Community Manager : guide complet du débutant à l'expert en 2025",
    slug_fr: "community-manager-guide-complet-2025",
    title_en: "Community Manager: Complete Guide from Beginner to Expert in 2025",
    slug_en: "community-manager-complete-guide-2025",
    title_ar: "مدير المجتمع: دليل شامل من المبتدئ إلى الخبير في 2025",
    slug_ar: "مدير-المجتمع-2025",
    category: "métiers",
    date: "2025-01-23"
  },
  {
    id: 10,
    title_fr: "Métiers du BTP : ceux qui recrutent le plus en 2025",
    slug_fr: "metiers-btp-recrutent-2025",
    title_en: "Construction Jobs: The Most Recruited in 2025",
    slug_en: "construction-jobs-recruiting-2025",
    title_ar: "مهن البناء: الأكثر توظيفاً في 2025",
    slug_ar: "مهن-البناء-2025",
    category: "métiers",
    date: "2025-01-24"
  },
  {
    id: 11,
    title_fr: "Comment choisir sa filière après le bac : guide complet orientation 2025",
    slug_fr: "choisir-filiere-apres-bac-2025",
    title_en: "How to Choose Your Field After High School: Complete Orientation Guide 2025",
    slug_en: "choose-field-after-high-school-2025",
    title_ar: "كيف تختار تخصصك بعد البكالوريا: دليل التوجيه الشامل 2025",
    slug_ar: "اختيار-التخصص-بعد-البكالوريا-2025",
    category: "orientation",
    date: "2025-01-25"
  },
  {
    id: 12,
    title_fr: "Erreurs d'orientation à éviter : guide complet pour bien s'orienter",
    slug_fr: "erreurs-orientation-eviter-2025",
    title_en: "Orientation Mistakes to Avoid: Complete Guide to Proper Guidance",
    slug_en: "orientation-mistakes-avoid-2025",
    title_ar: "أخطاء التوجيه التي يجب تجنبها: دليل شامل للتوجيه الصحيح",
    slug_ar: "أخطاء-التوجيه-2025",
    category: "orientation",
    date: "2025-01-26"
  },
  {
    id: 13,
    title_fr: "Comment réussir un entretien d'admission : conseils et techniques 2025",
    slug_fr: "reussir-entretien-admission-2025",
    title_en: "How to Succeed in an Admission Interview: Tips and Techniques 2025",
    slug_en: "succeed-admission-interview-2025",
    title_ar: "كيف تنجح في مقابلة القبول: نصائح وتقنيات 2025",
    slug_ar: "مقابلة-القبول-2025",
    category: "orientation",
    date: "2025-01-27"
  },
  {
    id: 14,
    title_fr: "Comment réussir son premier stage : guide complet étudiant 2025",
    slug_fr: "reussir-premier-stage-2025",
    title_en: "How to Succeed in Your First Internship: Complete Student Guide 2025",
    slug_en: "succeed-first-internship-2025",
    title_ar: "كيف تنجح في تدريبك الأول: دليل الطالب الشامل 2025",
    slug_ar: "النجاح-في-التدريب-الأول-2025",
    category: "orientation",
    date: "2025-01-28"
  },
  {
    id: 15,
    title_fr: "Étudier ou travailler : comment prendre la bonne décision en 2025",
    slug_fr: "etudier-ou-travailler-decision-2025",
    title_en: "Study or Work: How to Make the Right Decision in 2025",
    slug_en: "study-or-work-decision-2025",
    title_ar: "الدراسة أو العمل: كيف تتخذ القرار الصحيح في 2025",
    slug_ar: "الدراسة-أو-العمل-2025",
    category: "orientation",
    date: "2025-01-29"
  },
  {
    id: 16,
    title_fr: "Top 10 soft skills demandées en entreprise en 2025",
    slug_fr: "top-10-soft-skills-entreprise-2025",
    title_en: "Top 10 Soft Skills in Demand in Companies in 2025",
    slug_en: "top-10-soft-skills-companies-2025",
    title_ar: "أفضل 10 مهارات ناعمة مطلوبة في الشركات في 2025",
    slug_ar: "أفضل-10-مهارات-ناعمة-2025",
    category: "compétences",
    date: "2025-01-30"
  },
  {
    id: 17,
    title_fr: "Compétences digitales indispensables pour les jeunes diplômés en 2025",
    slug_fr: "competences-digitales-jeunes-diplomes-2025",
    title_en: "Essential Digital Skills for Young Graduates in 2025",
    slug_en: "essential-digital-skills-graduates-2025",
    title_ar: "المهارات الرقمية الأساسية للخريجين الشباب في 2025",
    slug_ar: "المهارات-الرقمية-الخريجين-2025",
    category: "compétences",
    date: "2025-01-31"
  },
  {
    id: 18,
    title_fr: "Comment améliorer sa communication professionnelle en 2025",
    slug_fr: "ameliorer-communication-professionnelle-2025",
    title_en: "How to Improve Your Professional Communication in 2025",
    slug_en: "improve-professional-communication-2025",
    title_ar: "كيف تحسن تواصلك المهني في 2025",
    slug_ar: "تحسين-التواصل-المهني-2025",
    category: "compétences",
    date: "2025-02-01"
  },
  {
    id: 19,
    title_fr: "Comment rédiger un CV parfait : guide complet avec modèles 2025",
    slug_fr: "rediger-cv-parfait-modeles-2025",
    title_en: "How to Write a Perfect CV: Complete Guide with Templates 2025",
    slug_en: "write-perfect-cv-templates-2025",
    title_ar: "كيف تكتب سيرة ذاتية مثالية: دليل شامل مع نماذج 2025",
    slug_ar: "كتابة-سيرة-ذاتية-مثالية-2025",
    category: "conseils",
    date: "2025-02-02"
  },
  {
    id: 20,
    title_fr: "Lettre de motivation : guide complet avec exemples pratiques 2025",
    slug_fr: "lettre-motivation-guide-exemples-2025",
    title_en: "Cover Letter: Complete Guide with Practical Examples 2025",
    slug_en: "cover-letter-guide-examples-2025",
    title_ar: "رسالة التحفيز: دليل شامل مع أمثلة عملية 2025",
    slug_ar: "رسالة-التحفيز-2025",
    category: "conseils",
    date: "2025-02-03"
  },
  {
    id: 21,
    title_fr: "Comment décrocher un job sans expérience : stratégies efficaces 2025",
    slug_fr: "decrocher-job-sans-experience-2025",
    title_en: "How to Land a Job Without Experience: Effective Strategies 2025",
    slug_en: "land-job-without-experience-2025",
    title_ar: "كيف تحصل على وظيفة بدون خبرة: استراتيجيات فعالة 2025",
    slug_ar: "الحصول-على-وظيفة-بدون-خبرة-2025",
    category: "conseils",
    date: "2025-02-04"
  },
  {
    id: 22,
    title_fr: "Comment préparer un entretien d'embauche : guide complet 2025",
    slug_fr: "preparer-entretien-embauche-2025",
    title_en: "How to Prepare for a Job Interview: Complete Guide 2025",
    slug_en: "prepare-job-interview-2025",
    title_ar: "كيف تحضر لمقابلة عمل: دليل شامل 2025",
    slug_ar: "تحضير-مقابلة-عمل-2025",
    category: "conseils",
    date: "2025-02-05"
  },
  {
    id: 23,
    title_fr: "Comment booster son employabilité en 2025 : stratégies efficaces",
    slug_fr: "booster-employabilite-2025",
    title_en: "How to Boost Your Employability in 2025: Effective Strategies",
    slug_en: "boost-employability-2025",
    title_ar: "كيف تعزز قابليتك للتوظيف في 2025: استراتيجيات فعالة",
    slug_ar: "تعزيز-قابلية-التوظيف-2025",
    category: "conseils",
    date: "2025-02-06"
  },
  {
    id: 24,
    title_fr: "Les métiers qui vont disparaître d'ici 2030 : analyse et alternatives",
    slug_fr: "metiers-disparaitre-2030",
    title_en: "Jobs That Will Disappear by 2030: Analysis and Alternatives",
    slug_en: "jobs-disappear-2030",
    title_ar: "المهن التي ستختفي بحلول 2030: تحليل وبدائل",
    slug_ar: "مهن-ستختفي-2030",
    category: "futur",
    date: "2025-02-07"
  },
  {
    id: 25,
    title_fr: "Les métiers qui vont exploser grâce à l'IA en 2025-2030",
    slug_fr: "metiers-exploser-ia-2025-2030",
    title_en: "Jobs That Will Explode Thanks to AI in 2025-2030",
    slug_en: "jobs-explode-ai-2025-2030",
    title_ar: "المهن التي ستنفجر بفضل الذكاء الاصطناعي في 2025-2030",
    slug_ar: "مهن-تنفجر-الذكاء-الاصطناعي-2025",
    category: "futur",
    date: "2025-02-08"
  },
  {
    id: 26,
    title_fr: "Les secteurs qui recrutent le plus au Maroc en 2025",
    slug_fr: "secteurs-recrutent-maroc-2025",
    title_en: "Sectors Recruiting the Most in Morocco in 2025",
    slug_en: "sectors-recruiting-morocco-2025",
    title_ar: "القطاعات التي توظف أكثر في المغرب في 2025",
    slug_ar: "القطاعات-التوظيف-المغرب-2025",
    category: "futur",
    date: "2025-02-09"
  },
  {
    id: 27,
    title_fr: "Comment découvrir son potentiel professionnel : guide complet",
    slug_fr: "decouvrir-potentiel-professionnel",
    title_en: "How to Discover Your Professional Potential: Complete Guide",
    slug_en: "discover-professional-potential",
    title_ar: "كيف تكتشف إمكانياتك المهنية: دليل شامل",
    slug_ar: "اكتشاف-الإمكانيات-المهنية",
    category: "orientation",
    date: "2025-02-10"
  },
  {
    id: 28,
    title_fr: "Test d'orientation professionnelle : comment ça marche en 2025",
    slug_fr: "test-orientation-professionnelle-2025",
    title_en: "Career Orientation Test: How It Works in 2025",
    slug_en: "career-orientation-test-2025",
    title_ar: "اختبار التوجيه المهني: كيف يعمل في 2025",
    slug_ar: "اختبار-التوجيه-المهني-2025",
    category: "orientation",
    date: "2025-02-11"
  },
  {
    id: 29,
    title_fr: "Comment surmonter le stress lié à l'avenir professionnel : guide pratique",
    slug_fr: "surmonter-stress-avenir-professionnel",
    title_en: "How to Overcome Stress Related to Professional Future: Practical Guide",
    slug_en: "overcome-stress-professional-future",
    title_ar: "كيف تتغلب على التوتر المرتبط بالمستقبل المهني: دليل عملي",
    slug_ar: "التغلب-على-التوتر-المهني",
    category: "orientation",
    date: "2025-02-12"
  },
  {
    id: 30,
    title_fr: "Comment définir son projet professionnel de A à Z : méthode complète",
    slug_fr: "definir-projet-professionnel-a-z",
    title_en: "How to Define Your Professional Project from A to Z: Complete Method",
    slug_en: "define-professional-project-a-z",
    title_ar: "كيف تحدد مشروعك المهني من الألف إلى الياء: طريقة شاملة",
    slug_ar: "تحديد-المشروع-المهني",
    category: "orientation",
    date: "2025-02-13"
  }
];

// Fonction pour générer le contenu d'un article (template de base)
function generateArticleContent(article, lang) {
  const basePath = path.join(__dirname, '..', 'public', 'articles-seo', `article-${String(article.id).padStart(2, '0')}`);
  
  // Templates de contenu selon la langue (sera remplacé par du contenu réel)
  const templates = {
    fr: `---
title: "${article.title_fr}"
date: "${article.date}"
description: "Article complet sur ${article.title_fr.toLowerCase()}"
image: "/assets/blog/default-${article.category}.svg"
keywords:
  - "${article.category}"
  - "orientation professionnelle"
  - "2025"
slug: "${article.slug_fr}"
---

# ${article.title_fr}

[Contenu de l'article à générer - 900-1400 mots]

## FAQ

**Question 1 ?**
Réponse détaillée...

**Question 2 ?**
Réponse détaillée...

**Question 3 ?**
Réponse détaillée...

**Question 4 ?**
Réponse détaillée...

**Question 5 ?**
Réponse détaillée...

## Conclusion

Découvrez votre profil professionnel avec notre [test d'orientation gratuit](https://quizorientation.online/quiz).
`,
    en: `---
title: "${article.title_en}"
date: "${article.date}"
description: "Complete article about ${article.title_en.toLowerCase()}"
image: "/assets/blog/default-${article.category}.svg"
keywords:
  - "${article.category}"
  - "career orientation"
  - "2025"
slug: "${article.slug_en}"
---

# ${article.title_en}

[Article content to generate - 900-1400 words]

## FAQ

**Question 1?**
Detailed answer...

**Question 2?**
Detailed answer...

**Question 3?**
Detailed answer...

**Question 4?**
Detailed answer...

**Question 5?**
Detailed answer...

## Conclusion

Discover your professional profile with our [free orientation test](https://quizorientation.online/quiz).
`,
    ar: `---
title: "${article.title_ar}"
date: "${article.date}"
description: "مقال شامل حول ${article.title_ar}"
image: "/assets/blog/default-${article.category}.svg"
keywords:
  - "${article.category}"
  - "التوجيه المهني"
  - "2025"
slug: "${article.slug_ar}"
---

# ${article.title_ar}

[محتوى المقال للإنشاء - 900-1400 كلمة]

## الأسئلة الشائعة

**السؤال 1؟**
إجابة مفصلة...

**السؤال 2؟**
إجابة مفصلة...

**السؤال 3؟**
إجابة مفصلة...

**السؤال 4؟**
إجابة مفصلة...

**السؤال 5؟**
إجابة مفصلة...

## الخلاصة

اكتشف ملفك المهني مع [اختبار التوجيه المجاني](https://quizorientation.online/quiz).
`
  };
  
  return templates[lang] || templates.fr;
}

// Fonction principale
function generateAllArticles() {
  const baseDir = path.join(__dirname, '..', 'public', 'articles-seo');
  
  articles.forEach(article => {
    const articleDir = path.join(baseDir, `article-${String(article.id).padStart(2, '0')}`);
    
    // Créer le dossier
    if (!fs.existsSync(articleDir)) {
      fs.mkdirSync(articleDir, { recursive: true });
    }
    
    // Générer metadata.json
    const metadata = {
      title_fr: article.title_fr,
      slug_fr: article.slug_fr,
      description_fr: `Guide complet sur ${article.title_fr.toLowerCase()}`,
      title_en: article.title_en,
      slug_en: article.slug_en,
      description_en: `Complete guide about ${article.title_en.toLowerCase()}`,
      title_ar: article.title_ar,
      slug_ar: article.slug_ar,
      description_ar: `دليل شامل حول ${article.title_ar}`,
      category: article.category,
      datePublication: article.date
    };
    
    fs.writeFileSync(
      path.join(articleDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2),
      'utf-8'
    );
    
    // Générer schema.json
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title_fr,
      "description": metadata.description_fr,
      "image": `/assets/blog/default-${article.category}.svg`,
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
      JSON.stringify(schema, null, 2),
      'utf-8'
    );
    
    // Générer les fichiers markdown
    ['fr', 'en', 'ar'].forEach(lang => {
      const content = generateArticleContent(article, lang);
      fs.writeFileSync(
        path.join(articleDir, `${lang}.md`),
        content,
        'utf-8'
      );
    });
    
    console.log(`✅ Article ${article.id} généré: ${article.title_fr}`);
  });
  
  console.log(`\n🎉 ${articles.length} articles générés avec succès !`);
}

// Exécuter
generateAllArticles();










