import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Contenu détaillé par article et par langue
const detailedContent = {
  2: { // Data Analyst
    fr: {
      intro: `Le métier de **Data Analyst** est l'un des plus prometteurs en 2025. Avec l'explosion des données générées par les entreprises, les besoins en analystes capables de transformer ces données en insights actionnables sont en forte croissance. Ce guide complet vous donne toutes les clés pour devenir Data Analyst.`,
      sections: [
        {
          title: "Pourquoi devenir Data Analyst en 2025 ?",
          content: `Le marché de la data explose. Chaque jour, les entreprises génèrent des quantités astronomiques de données : transactions clients, comportements utilisateurs, performances produits, etc. Ces données représentent un trésor inexploité si personne ne sait les analyser.\n\n**Les opportunités sont immenses** :\n\n- **Croissance du secteur** : Le marché de la data analytics devrait croître de 25% par an jusqu'en 2030\n- **Pénurie de talents** : Les entreprises peinent à recruter des profils qualifiés\n- **Salaires attractifs** : Les Data Analysts sont parmi les mieux payés du secteur tech\n- **Évolution rapide** : Possibilité d'évoluer vers Data Scientist, Data Engineer ou Chief Data Officer\n\nDe plus, ce métier offre une grande **polyvalence** : vous pouvez travailler dans tous les secteurs (finance, e-commerce, santé, marketing, etc.) et tous les types d'entreprises (startups, grands groupes, agences).`
        },
        {
          title: "Qu'est-ce qu'un Data Analyst ?",
          content: `Un **Data Analyst** est un professionnel qui collecte, nettoie, analyse et interprète des données pour aider les entreprises à prendre des décisions éclairées. Il transforme des données brutes en informations exploitables.\n\n**Ses missions principales** :\n\n- **Collecte de données** : Récupérer des données depuis diverses sources (bases de données, APIs, fichiers)\n- **Nettoyage et préparation** : Nettoyer les données, gérer les valeurs manquantes, corriger les erreurs\n- **Analyse statistique** : Appliquer des méthodes statistiques pour identifier des tendances et patterns\n- **Visualisation** : Créer des tableaux de bord et graphiques pour présenter les résultats\n- **Reporting** : Rédiger des rapports et présenter les insights aux équipes dirigeantes\n\nLe Data Analyst travaille en étroite collaboration avec les équipes métier (marketing, commercial, RH) pour comprendre leurs besoins et leur fournir des analyses pertinentes.`
        },
        {
          title: "Les compétences essentielles d'un Data Analyst",
          content: `Pour exceller en tant que Data Analyst, vous devez maîtriser plusieurs compétences :\n\n### Compétences techniques\n\n**Langages de programmation** :\n- **SQL** : Indispensable pour interroger les bases de données (MySQL, PostgreSQL, SQL Server)\n- **Python** : Pour l'analyse de données (pandas, numpy, matplotlib)\n- **R** : Alternative à Python, très utilisé en statistiques\n- **Excel avancé** : Pivot tables, formules complexes, VBA\n\n**Outils de visualisation** :\n- **Tableau, Power BI, Looker** : Pour créer des dashboards interactifs\n- **Matplotlib, Seaborn** : Bibliothèques Python pour la visualisation\n\n**Bases de données** :\n- Compréhension des bases relationnelles (SQL)\n- Notions de bases NoSQL (MongoDB, Cassandra)\n\n### Soft skills\n\n- **Esprit analytique** : Capacité à voir au-delà des chiffres\n- **Communication** : Expliquer des concepts complexes de manière simple\n- **Curiosité** : Se poser les bonnes questions\n- **Rigueur** : Attention aux détails, vérification des résultats`
        },
        {
          title: "Les formations pour devenir Data Analyst",
          content: `Plusieurs parcours mènent au métier de Data Analyst :\n\n### Parcours académique\n\n**Bac +3** :\n- Licence Mathématiques appliquées\n- Licence Informatique\n- Bachelor Data Science\n\n**Bac +5** :\n- Master Data Science\n- Master Statistiques\n- Master Informatique spécialisé data\n- École d'ingénieur avec spécialisation data\n\n### Formations professionnelles\n\n**Bootcamps** (3-6 mois) :\n- Le Wagon (Data Science)\n- DataCamp\n- OpenClassrooms (Data Analyst)\n\n**Certifications** :\n- Google Data Analytics Certificate\n- Microsoft Certified: Data Analyst Associate\n- Tableau Desktop Specialist\n\n### Autoformation\n\n- **Cours en ligne** : Coursera, edX, Udemy\n- **Pratique** : Kaggle, projets personnels\n- **Communautés** : Stack Overflow, Reddit r/datascience`
        },
        {
          title: "Salaire et débouchés d'un Data Analyst",
          content: `### Salaires en France (2025)\n\n- **Junior (0-2 ans)** : 35 000 à 45 000 € brut/an\n- **Confirmé (3-5 ans)** : 45 000 à 60 000 € brut/an\n- **Senior (5+ ans)** : 60 000 à 85 000 € brut/an\n\n### Salaires au Maroc (2025)\n\n- **Junior** : 30 000 à 40 000 MAD/an\n- **Confirmé** : 40 000 à 60 000 MAD/an\n- **Senior** : 60 000 à 100 000 MAD/an\n\n### Évolution de carrière\n\n**Data Analyst** → **Senior Data Analyst** → **Data Scientist** → **Lead Data Analyst** → **Head of Data**\n\n### Secteurs qui recrutent\n\n- **E-commerce** : Analyse du comportement client\n- **Finance** : Analyse de risques, fraud detection\n- **Marketing** : Analyse de campagnes, ROI\n- **Santé** : Analyse de données médicales\n- **Tech** : Product analytics, user behavior`
        },
        {
          title: "Comment se lancer : plan d'action pratique",
          content: `### Étape 1 : Acquérir les bases\n\nCommencez par maîtriser **SQL** et **Excel**. Ce sont les outils les plus utilisés et les plus demandés. Pratiquez sur des datasets réels (Kaggle, données publiques).\n\n### Étape 2 : Apprendre Python ou R\n\nChoisissez un langage (Python est plus polyvalent) et apprenez les bibliothèques essentielles : pandas, numpy, matplotlib.\n\n### Étape 3 : Construire un portfolio\n\nCréez des projets concrets :\n- Analyse d'un dataset public\n- Dashboard interactif\n- Projet de prédiction\n\nPubliez vos projets sur GitHub avec des README détaillés.\n\n### Étape 4 : Obtenir une certification\n\nUne certification reconnue (Google, Microsoft) peut booster votre CV et démontrer vos compétences.\n\n### Étape 5 : Candidater\n\nPréparez votre CV en mettant en avant vos projets et compétences techniques. Préparez-vous aux tests techniques (SQL, Python) lors des entretiens.`
        }
      ]
    }
  }
  // Ajouter les autres articles...
};

// Fonction pour générer le contenu complet
function generateDetailedArticle(articleId, article, lang) {
  const articleContent = detailedContent[articleId];
  if (!articleContent || !articleContent[lang]) {
    return null; // Utiliser le contenu générique si pas de contenu détaillé
  }
  
  const content = articleContent[lang];
  const title = lang === 'fr' ? article.title_fr : lang === 'en' ? article.title_en : article.title_ar;
  const description = lang === 'fr' ? article.description_fr : lang === 'en' ? article.description_en : article.description_ar;
  const slug = lang === 'fr' ? article.slug_fr : lang === 'en' ? article.slug_en : article.slug_ar;
  
  let markdown = `---
title: "${title}"
date: "${article.date}"
description: "${description}"
image: "/assets/blog/default-${article.category}.svg"
keywords:
  - "${article.category}"
  - "orientation professionnelle"
  - "2025"
slug: "${slug}"
---

# ${title}

${content.intro}

`;

  // Ajouter les sections
  content.sections.forEach(section => {
    markdown += `## ${section.title}\n\n${section.content}\n\n`;
  });
  
  // Ajouter liens internes
  markdown += addInternalLinks(article, lang);
  
  // Ajouter lien externe
  markdown += addExternalLink(lang);
  
  // FAQ
  markdown += generateFAQ(article, lang);
  
  // Conclusion
  markdown += generateConclusion(lang);
  
  return markdown;
}

function addInternalLinks(article, lang) {
  const links = {
    fr: `\n## Articles connexes\n\nPour approfondir vos connaissances :\n\n- [Comment booster son employabilité en 2025](/blog/booster-employabilite-2025)\n- [Compétences digitales indispensables](/blog/competences-digitales-jeunes-diplomes-2025)\n\n`,
    en: `\n## Related Articles\n\nTo deepen your knowledge:\n\n- [How to Boost Your Employability in 2025](/blog/boost-employability-2025)\n- [Essential Digital Skills](/blog/essential-digital-skills-graduates-2025)\n\n`,
    ar: `\n## مقالات ذات صلة\n\nلتعميق معرفتك:\n\n- [كيف تعزز قابليتك للتوظيف](/blog/تعزيز-قابلية-التوظيف-2025)\n- [المهارات الرقمية الأساسية](/blog/المهارات-الرقمية-الخريجين-2025)\n\n`
  };
  return links[lang] || links.fr;
}

function addExternalLink(lang) {
  const links = {
    fr: `Pour plus d'informations sur les formations et les métiers du numérique, consultez les ressources officielles du [Ministère du Travail](https://travail-emploi.gouv.fr) et de [France Compétences](https://www.francecompetences.fr).\n\n`,
    en: `For more information on training and digital professions, consult the official resources of the [Ministry of Labor](https://www.service-public.fr) and [France Compétences](https://www.francecompetences.fr).\n\n`,
    ar: `لمزيد من المعلومات حول التدريبات ومهن الرقمي، راجع الموارد الرسمية لوزارة العمل وفرنسا للكفاءات.\n\n`
  };
  return links[lang] || links.fr;
}

function generateFAQ(article, lang) {
  const faqs = {
    fr: `## FAQ : Questions fréquentes\n\n**Quelle formation choisir pour devenir Data Analyst ?**\n\nPlusieurs options s'offrent à vous : formation académique (Master), bootcamp intensif (3-6 mois), ou autoformation. Le choix dépend de votre situation, votre budget et votre disponibilité. L'essentiel est de pratiquer régulièrement sur des projets concrets.\n\n**Faut-il être bon en mathématiques ?**\n\nUne bonne base en mathématiques et statistiques est recommandée, mais pas indispensable au départ. Vous pouvez progresser en parallèle de votre apprentissage technique. L'important est la logique et l'esprit analytique.\n\n**Combien de temps pour devenir Data Analyst ?**\n\nAvec une formation intensive (bootcamp), comptez 3-6 mois pour les bases. Pour une maîtrise solide, prévoyez 1-2 ans de pratique régulière. L'expérience terrain reste la meilleure formation.\n\n**Quels sont les secteurs qui recrutent le plus ?**\n\nL'e-commerce, la finance, le marketing digital et la tech sont les secteurs les plus demandeurs. Mais tous les secteurs ont besoin de Data Analysts aujourd'hui.\n\n**Comment se différencier des autres candidats ?**\n\nConstruisez un portfolio solide avec des projets variés, obtenez des certifications reconnues, participez à des compétitions Kaggle, et montrez votre capacité à expliquer des analyses complexes de manière simple.\n\n`,
    en: `## FAQ: Frequently Asked Questions\n\n**What training to choose to become a Data Analyst?**\n\nSeveral options are available: academic training (Master's), intensive bootcamp (3-6 months), or self-training. The choice depends on your situation, budget, and availability. The essential is to practice regularly on concrete projects.\n\n**Do you need to be good at mathematics?**\n\nA good foundation in mathematics and statistics is recommended, but not essential at the start. You can progress in parallel with your technical learning. The important thing is logic and analytical thinking.\n\n**How long to become a Data Analyst?**\n\nWith intensive training (bootcamp), count 3-6 months for the basics. For solid mastery, plan 1-2 years of regular practice. Field experience remains the best training.\n\n**Which sectors recruit the most?**\n\nE-commerce, finance, digital marketing, and tech are the most demanding sectors. But all sectors need Data Analysts today.\n\n**How to stand out from other candidates?**\n\nBuild a solid portfolio with varied projects, obtain recognized certifications, participate in Kaggle competitions, and show your ability to explain complex analyses simply.\n\n`,
    ar: `## الأسئلة الشائعة\n\n**ما التدريب الذي تختار لتصبح محلل بيانات؟**\n\nعدة خيارات متاحة: تدريب أكاديمي (ماجستير)، bootcamp مكثف (3-6 أشهر)، أو تعلم ذاتي. الاختيار يعتمد على وضعك وميزانيتك وتوفرك. الأساسي هو الممارسة بانتظام على مشاريع ملموسة.\n\n**هل تحتاج أن تكون جيداً في الرياضيات؟**\n\nأساس جيد في الرياضيات والإحصاء موصى به، لكن ليس ضرورياً في البداية. يمكنك التقدم بالتوازي مع تعلمك التقني. المهم هو المنطق والتفكير التحليلي.\n\n**كم من الوقت لتصبح محلل بيانات؟**\n\nمع تدريب مكثف (bootcamp)، احسب 3-6 أشهر للأساسيات. للإتقان الصلب، خطط لسنة إلى سنتين من الممارسة المنتظمة. الخبرة الميدانية تبقى أفضل تدريب.\n\n**ما القطاعات التي توظف أكثر؟**\n\nالتجارة الإلكترونية، المالية، التسويق الرقمي، والتكنولوجيا هي القطاعات الأكثر طلباً. لكن جميع القطاعات تحتاج محللي بيانات اليوم.\n\n**كيف تميز نفسك عن المرشحين الآخرين؟**\n\nابن محفظة أعمال صلبة مع مشاريع متنوعة، احصل على شهادات معترف بها، شارك في مسابقات Kaggle، وأظهر قدرتك على شرح التحليلات المعقدة بطريقة بسيطة.\n\n`
  };
  return faqs[lang] || faqs.fr;
}

function generateConclusion(lang) {
  const conclusions = {
    fr: `## Conclusion : votre avenir en data analytics vous attend\n\nLe métier de Data Analyst offre des opportunités exceptionnelles en 2025. Avec la croissance exponentielle des données, les besoins en analystes qualifiés ne cessent d'augmenter. Que vous choisissiez une formation académique, un bootcamp ou l'autoformation, l'essentiel est de **pratiquer régulièrement** et de **construire un portfolio** qui démontre vos compétences.\n\n**Prêt à découvrir si le métier de Data Analyst correspond à votre profil ?** [Passez notre test d'orientation professionnelle gratuit](https://quizorientation.online/quiz) et obtenez des recommandations personnalisées pour votre carrière dans la data.\n\n`,
    en: `## Conclusion: Your Future in Data Analytics Awaits\n\nThe Data Analyst profession offers exceptional opportunities in 2025. With the exponential growth of data, the need for qualified analysts continues to increase. Whether you choose academic training, a bootcamp, or self-training, the essential is to **practice regularly** and **build a portfolio** that demonstrates your skills.\n\n**Ready to discover if the Data Analyst profession matches your profile?** [Take our free career orientation test](https://quizorientation.online/quiz) and get personalized recommendations for your career in data.\n\n`,
    ar: `## الخلاصة: مستقبلك في تحليل البيانات ينتظرك\n\nمهنة محلل البيانات تقدم فرصاً استثنائية في 2025. مع النمو المتسارع للبيانات، الحاجة لمحللي بيانات مؤهلين تستمر في الزيادة. سواء اخترت تدريباً أكاديمياً، bootcamp، أو تعلم ذاتي، الأساسي هو **الممارسة بانتظام** و**بناء محفظة أعمال** تثبت مهاراتك.\n\n**هل أنت مستعد لاكتشاف ما إذا كانت مهنة محلل البيانات تطابق ملفك؟** [اجتز اختبار التوجيه المهني المجاني](https://quizorientation.online/quiz) واحصل على توصيات مخصصة لمسيرتك في البيانات.\n\n`
  };
  return conclusions[lang] || conclusions.fr;
}

// Liste des articles (2-30)
const articles = [
  {
    id: 2,
    title_fr: "Métier Data Analyst : formation, salaire, compétences et débouchés en 2025",
    slug_fr: "metier-data-analyst-formation-salaire-2025",
    description_fr: "Guide complet sur le métier de Data Analyst en 2025 : formations, compétences requises, salaires, débouchés. Découvrez comment devenir analyste de données.",
    title_en: "Data Analyst Career: Training, Salary, Skills and Opportunities in 2025",
    slug_en: "data-analyst-career-training-salary-2025",
    description_en: "Complete guide on the Data Analyst profession in 2025: training, required skills, salaries, career opportunities. Discover how to become a data analyst.",
    title_ar: "مهنة محلل البيانات: التدريب والراتب والمهارات والفرص في 2025",
    slug_ar: "مهنة-محلل-البيانات-2025",
    category: "métiers",
    date: "2025-01-16"
  }
  // Les autres articles seront traités avec le contenu générique amélioré
];

// Fonction pour générer le contenu amélioré pour tous les articles
function generateAllImprovedArticles() {
  const baseDir = path.join(__dirname, '..', 'public', 'articles-seo');
  
  // Lire tous les articles depuis le script précédent
  const allArticles = JSON.parse(fs.readFileSync(path.join(__dirname, 'generate-seo-articles.js'), 'utf-8').match(/const articles = (\[[\s\S]*?\]);/)?.[1] || '[]');
  
  // Pour l'article 2, utiliser le contenu détaillé
  const article2 = {
    id: 2,
    title_fr: "Métier Data Analyst : formation, salaire, compétences et débouchés en 2025",
    slug_fr: "metier-data-analyst-formation-salaire-2025",
    description_fr: "Guide complet sur le métier de Data Analyst en 2025 : formations, compétences requises, salaires, débouchés. Découvrez comment devenir analyste de données.",
    title_en: "Data Analyst Career: Training, Salary, Skills and Opportunities in 2025",
    slug_en: "data-analyst-career-training-salary-2025",
    description_en: "Complete guide on the Data Analyst profession in 2025: training, required skills, salaries, career opportunities. Discover how to become a data analyst.",
    title_ar: "مهنة محلل البيانات: التدريب والراتب والمهارات والفرص في 2025",
    slug_ar: "مهنة-محلل-البيانات-2025",
    category: "métiers",
    date: "2025-01-16"
  };
  
  const articleDir = path.join(baseDir, 'article-02');
  
  // Générer les 3 versions
  ['fr', 'en', 'ar'].forEach(lang => {
    const content = generateDetailedArticle(2, article2, lang);
    if (content) {
      fs.writeFileSync(path.join(articleDir, `${lang}.md`), content, 'utf-8');
    }
  });
  
  console.log('✅ Article 02 mis à jour avec contenu détaillé');
}

// Exécuter
generateAllImprovedArticles();










