import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Templates de contenu par catégorie
const contentTemplates = {
  métiers: {
    fr: {
      intro: (title) => `Le métier de ${title.toLowerCase()} attire de plus en plus de candidats en 2025. Avec l'évolution constante du marché du travail et les nouvelles opportunités qui émergent, ce secteur offre des perspectives de carrière prometteuses.`,
      sections: [
        "Pourquoi choisir ce métier en 2025 ?",
        "Qu'est-ce qu'un(e) {title} ?",
        "Les compétences essentielles",
        "Les formations et parcours possibles",
        "Le salaire et les débouchés",
        "Comment se lancer : plan d'action pratique",
        "Les erreurs à éviter",
        "Ressources et outils recommandés"
      ]
    }
  },
  orientation: {
    fr: {
      intro: (title) => `${title} est une question cruciale pour de nombreux étudiants et jeunes professionnels. Faire le bon choix peut déterminer l'ensemble de votre parcours professionnel.`,
      sections: [
        "Pourquoi cette question est importante",
        "Les éléments à prendre en compte",
        "Les différentes options possibles",
        "Comment prendre la bonne décision",
        "Conseils pratiques et exemples",
        "Les erreurs courantes à éviter",
        "Ressources pour vous aider"
      ]
    }
  },
  compétences: {
    fr: {
      intro: (title) => `${title} sont devenues essentielles dans le monde professionnel actuel. Les recruteurs recherchent des profils capables de s'adapter et d'évoluer rapidement.`,
      sections: [
        "Pourquoi ces compétences sont importantes",
        "Les compétences clés à maîtriser",
        "Comment les développer",
        "Comment les valoriser",
        "Exemples concrets d'application",
        "Les erreurs à éviter",
        "Ressources pour progresser"
      ]
    }
  },
  conseils: {
    fr: {
      intro: (title) => `${title} est une étape essentielle dans votre parcours professionnel. Bien maîtriser cette compétence peut faire la différence lors de vos candidatures.`,
      sections: [
        "Pourquoi c'est important",
        "Les éléments essentiels",
        "Méthodes et techniques efficaces",
        "Exemples pratiques et modèles",
        "Les erreurs courantes à éviter",
        "Conseils d'experts",
        "Ressources utiles"
      ]
    }
  },
  futur: {
    fr: {
      intro: (title) => `${title} est une question que se posent de nombreux professionnels et étudiants. Comprendre les tendances du marché du travail permet de mieux s'orienter.`,
      sections: [
        "Les tendances actuelles",
        "Analyse du marché",
        "Les opportunités émergentes",
        "Comment se préparer",
        "Les secteurs porteurs",
        "Les défis à anticiper",
        "Ressources pour rester informé"
      ]
    }
  }
};

// Générer le contenu complet d'un article
function generateFullContent(article, lang) {
  const category = article.category;
  const template = contentTemplates[category]?.[lang] || contentTemplates.métiers[lang];
  
  if (!template) {
    return generateDefaultContent(article, lang);
  }
  
  const title = lang === 'fr' ? article.title_fr : lang === 'en' ? article.title_en : article.title_ar;
  const intro = template.intro(title);
  
  let content = `---
title: "${title}"
date: "${article.date}"
description: "${lang === 'fr' ? article.description_fr : lang === 'en' ? article.description_en : article.description_ar}"
image: "/assets/blog/default-${category}.svg"
keywords:
  - "${category}"
  - "orientation professionnelle"
  - "2025"
slug: "${lang === 'fr' ? article.slug_fr : lang === 'en' ? article.slug_en : article.slug_ar}"
---

# ${title}

${intro} Ce guide complet vous accompagne dans votre démarche et vous donne toutes les clés pour réussir.

`;

  // Générer les sections
  template.sections.forEach((section, index) => {
    const sectionTitle = section.replace('{title}', title.split(':')[0].toLowerCase());
    content += `## ${sectionTitle}\n\n`;
    
    // Contenu détaillé selon le type d'article
    if (category === 'métiers') {
      content += generateMetierContent(section, index, lang);
    } else if (category === 'orientation') {
      content += generateOrientationContent(section, index, lang);
    } else if (category === 'compétences') {
      content += generateCompetencesContent(section, index, lang);
    } else if (category === 'conseils') {
      content += generateConseilsContent(section, index, lang);
    } else {
      content += generateFuturContent(section, index, lang);
    }
    
    content += '\n\n';
  });
  
  // Ajouter liens internes et externes
  content += addInternalLinks(article, lang);
  content += addExternalLink(lang);
  
  // FAQ
  content += generateFAQ(article, lang);
  
  // Conclusion avec CTA
  content += generateConclusion(lang);
  
  return content;
}

function generateMetierContent(section, index, lang) {
  const contents = {
    fr: [
      `Le marché du travail évolue rapidement et ce métier est particulièrement recherché en 2025. Les entreprises font face à des défis de recrutement et recherchent des profils qualifiés. Les opportunités sont nombreuses, que ce soit en entreprise, en freelance ou dans le secteur public.`,
      `Un(e) professionnel(le) dans ce domaine est responsable de [définir les responsabilités principales]. Il/elle travaille en collaboration avec [équipes/parties prenantes] et doit faire preuve de [qualités clés]. Le métier nécessite une combinaison de compétences techniques et relationnelles.`,
      `Pour exceller dans ce métier, plusieurs compétences sont essentielles :\n\n- **Compétences techniques** : [liste des compétences techniques]\n- **Soft skills** : [liste des compétences comportementales]\n- **Savoir-faire** : [compétences pratiques]\n\nCes compétences peuvent être développées grâce à la formation continue et l'expérience terrain.`,
      `Plusieurs parcours permettent d'accéder à ce métier :\n\n1. **Formation initiale** : [parcours académiques]\n2. **Formation continue** : [formations professionnelles]\n3. **Reconversion** : [parcours de reconversion]\n4. **Autoformation** : [ressources en ligne]\n\nChaque parcours a ses avantages et peut être adapté selon votre situation.`,
      `Les salaires varient selon l'expérience et la localisation :\n\n- **Débutant** : [fourchette salariale]\n- **Confirmé** : [fourchette salariale]\n- **Senior** : [fourchette salariale]\n\nLes débouchés sont nombreux dans [secteurs concernés] et les perspectives d'évolution sont [description des perspectives].`,
      `Pour vous lancer dans ce métier, suivez ces étapes :\n\n1. **Évaluer votre profil** : Identifiez vos forces et axes d'amélioration\n2. **Choisir votre formation** : Sélectionnez le parcours adapté à votre situation\n3. **Construire votre réseau** : Participez à des événements professionnels\n4. **Créer un portfolio** : Valorisez vos compétences et projets\n5. **Candidater** : Préparez votre CV et vos entretiens`,
      `Évitez ces erreurs courantes :\n\n- Négliger les soft skills au profit des compétences techniques uniquement\n- Choisir une formation sans vérifier sa reconnaissance\n- Ne pas se tenir informé des évolutions du secteur\n- Postuler sans personnaliser sa candidature\n- Ignorer l'importance du réseau professionnel`,
      `Pour approfondir vos connaissances, consultez :\n\n- [Ressource 1] : [description]\n- [Ressource 2] : [description]\n- [Ressource 3] : [description]\n\nCes ressources vous aideront à progresser et à rester à jour dans votre domaine.`
    ],
    en: [
      `The job market is evolving rapidly and this profession is particularly sought after in 2025. Companies face recruitment challenges and are looking for qualified profiles. Opportunities are numerous, whether in companies, as freelancers, or in the public sector.`,
      `A professional in this field is responsible for [defining main responsibilities]. They work in collaboration with [teams/stakeholders] and must demonstrate [key qualities]. The profession requires a combination of technical and relational skills.`,
      `To excel in this profession, several skills are essential:\n\n- **Technical skills**: [list of technical skills]\n- **Soft skills**: [list of behavioral skills]\n- **Know-how**: [practical skills]\n\nThese skills can be developed through continuing education and field experience.`,
      `Several paths lead to this profession:\n\n1. **Initial training**: [academic paths]\n2. **Continuing education**: [professional training]\n3. **Career change**: [career change paths]\n4. **Self-training**: [online resources]\n\nEach path has its advantages and can be adapted according to your situation.`,
      `Salaries vary according to experience and location:\n\n- **Beginner**: [salary range]\n- **Experienced**: [salary range]\n- **Senior**: [salary range]\n\nOpportunities are numerous in [concerned sectors] and career prospects are [description of prospects].`,
      `To get started in this profession, follow these steps:\n\n1. **Assess your profile**: Identify your strengths and areas for improvement\n2. **Choose your training**: Select the path adapted to your situation\n3. **Build your network**: Participate in professional events\n4. **Create a portfolio**: Showcase your skills and projects\n5. **Apply**: Prepare your CV and interviews`,
      `Avoid these common mistakes:\n\n- Neglecting soft skills in favor of technical skills only\n- Choosing training without checking its recognition\n- Not staying informed about sector developments\n- Applying without personalizing your application\n- Ignoring the importance of professional networking`,
      `To deepen your knowledge, consult:\n\n- [Resource 1]: [description]\n- [Resource 2]: [description]\n- [Resource 3]: [description]\n\nThese resources will help you progress and stay up to date in your field.`
    ],
    ar: [
      `سوق العمل يتطور بسرعة وهذه المهنة مطلوبة بشكل خاص في عام 2025. الشركات تواجه تحديات التوظيف وتبحث عن ملفات مؤهلة. الفرص عديدة، سواء في الشركات، كعامل حر، أو في القطاع العام.`,
      `المحترف في هذا المجال مسؤول عن [تحديد المسؤوليات الرئيسية]. يعمل بالتعاون مع [الفرق/الأطراف المعنية] ويجب أن يظهر [الصفات الأساسية]. المهنة تتطلب مزيجاً من المهارات التقنية والعلائقية.`,
      `للتفوق في هذه المهنة، عدة مهارات أساسية:\n\n- **المهارات التقنية**: [قائمة المهارات التقنية]\n- **المهارات الناعمة**: [قائمة المهارات السلوكية]\n- **المعرفة العملية**: [المهارات العملية]\n\nيمكن تطوير هذه المهارات من خلال التدريب المستمر والخبرة الميدانية.`,
      `عدة مسارات تؤدي إلى هذه المهنة:\n\n1. **التدريب الأولي**: [المسارات الأكاديمية]\n2. **التدريب المستمر**: [التدريبات المهنية]\n3. **إعادة التوجيه**: [مسارات إعادة التوجيه]\n4. **التعلم الذاتي**: [الموارد عبر الإنترنت]\n\nكل مسار له مزاياه ويمكن تكييفه حسب وضعك.`,
      `الرواتب تختلف حسب الخبرة والموقع:\n\n- **مبتدئ**: [نطاق الراتب]\n- **خبير**: [نطاق الراتب]\n- **كبير**: [نطاق الراتب]\n\nالفرص عديدة في [القطاعات المعنية] وآفاق التطور هي [وصف الآفاق].`,
      `للبدء في هذه المهنة، اتبع هذه الخطوات:\n\n1. **قيم ملفك**: حدد نقاط قوتك ومجالات التحسين\n2. **اختر تدريبك**: اختر المسار المناسب لوضعك\n3. **ابن شبكتك**: شارك في الأحداث المهنية\n4. **أنشئ محفظة أعمال**: أبرز مهاراتك ومشاريعك\n5. **تقدم بطلب**: جهز سيرتك الذاتية ومقابلاتك`,
      `تجنب هذه الأخطاء الشائعة:\n\n- إهمال المهارات الناعمة لصالح المهارات التقنية فقط\n- اختيار تدريب دون التحقق من اعتماده\n- عدم البقاء على اطلاع بتطورات القطاع\n- التقديم دون تخصيص طلبك\n- تجاهل أهمية الشبكة المهنية`,
      `لتعميق معرفتك، راجع:\n\n- [الموارد 1]: [الوصف]\n- [الموارد 2]: [الوصف]\n- [الموارد 3]: [الوصف]\n\nهذه الموارد ستساعدك على التقدم والبقاء محدثاً في مجالك.`
    ]
  };
  
  return contents[lang]?.[index] || contents.fr[index] || '';
}

function generateOrientationContent(section, index, lang) {
  // Contenu pour articles d'orientation
  return generateMetierContent(section, index, lang); // Utilise le même template pour l'instant
}

function generateCompetencesContent(section, index, lang) {
  // Contenu pour articles sur les compétences
  return generateMetierContent(section, index, lang);
}

function generateConseilsContent(section, index, lang) {
  // Contenu pour articles de conseils
  return generateMetierContent(section, index, lang);
}

function generateFuturContent(section, index, lang) {
  // Contenu pour articles sur le futur du travail
  return generateMetierContent(section, index, lang);
}

function generateDefaultContent(article, lang) {
  const title = lang === 'fr' ? article.title_fr : lang === 'en' ? article.title_en : article.title_ar;
  return `---
title: "${title}"
date: "${article.date}"
description: "${lang === 'fr' ? article.description_fr : lang === 'en' ? article.description_en : article.description_ar}"
image: "/assets/blog/default-${article.category}.svg"
keywords:
  - "${article.category}"
  - "orientation professionnelle"
  - "2025"
slug: "${lang === 'fr' ? article.slug_fr : lang === 'en' ? article.slug_en : article.slug_ar}"
---

# ${title}

[Contenu à générer - 900-1400 mots]

## FAQ

**Question 1 ?**
Réponse...

**Question 2 ?**
Réponse...

**Question 3 ?**
Réponse...

**Question 4 ?**
Réponse...

**Question 5 ?**
Réponse...

## Conclusion

Découvrez votre profil professionnel avec notre [test d'orientation gratuit](https://quizorientation.online/quiz).
`;
}

function addInternalLinks(article, lang) {
  // Générer 2 liens internes vers d'autres articles
  const links = {
    fr: `\n## Articles connexes\n\nPour approfondir vos connaissances, consultez également :\n\n- [Comment booster son employabilité en 2025](/blog/booster-employabilite-2025)\n- [Top 10 soft skills demandées en entreprise](/blog/top-10-soft-skills-entreprise-2025)\n\n`,
    en: `\n## Related Articles\n\nTo deepen your knowledge, also consult:\n\n- [How to Boost Your Employability in 2025](/blog/boost-employability-2025)\n- [Top 10 Soft Skills in Demand in Companies](/blog/top-10-soft-skills-companies-2025)\n\n`,
    ar: `\n## مقالات ذات صلة\n\nلتعميق معرفتك، راجع أيضاً:\n\n- [كيف تعزز قابليتك للتوظيف في 2025](/blog/تعزيز-قابلية-التوظيف-2025)\n- [أفضل 10 مهارات ناعمة مطلوبة في الشركات](/blog/أفضل-10-مهارات-ناعمة-2025)\n\n`
  };
  return links[lang] || links.fr;
}

function addExternalLink(lang) {
  const links = {
    fr: `Pour plus d'informations sur les formations et les métiers, consultez les ressources officielles du [Ministère du Travail](https://travail-emploi.gouv.fr) et de [France Compétences](https://www.francecompetences.fr).\n\n`,
    en: `For more information on training and professions, consult the official resources of the [Ministry of Labor](https://www.service-public.fr) and [France Compétences](https://www.francecompetences.fr).\n\n`,
    ar: `لمزيد من المعلومات حول التدريبات والمهن، راجع الموارد الرسمية لوزارة العمل وفرنسا للكفاءات.\n\n`
  };
  return links[lang] || links.fr;
}

function generateFAQ(article, lang) {
  const faqs = {
    fr: `## FAQ : Questions fréquentes\n\n**Quelle est la meilleure façon de commencer dans ce domaine ?**\n\nLa meilleure approche dépend de votre situation. Si vous êtes étudiant, privilégiez une formation académique. Pour une reconversion, les bootcamps ou formations intensives peuvent être plus adaptés. L'essentiel est de pratiquer régulièrement et de construire un portfolio solide.\n\n**Combien de temps faut-il pour maîtriser les compétences nécessaires ?**\n\nCela varie selon votre investissement et votre parcours. Avec une formation intensive, comptez 6 mois à 1 an pour les bases. Pour une maîtrise complète, prévoyez 2-3 ans de pratique régulière.\n\n**Quels sont les débouchés réels de ce métier ?**\n\nLes débouchés sont nombreux et variés. Vous pouvez travailler en entreprise, en agence, en freelance, ou créer votre propre activité. Les secteurs qui recrutent le plus sont [secteurs selon l'article].\n\n**Faut-il un diplôme spécifique ?**\n\nUn diplôme peut faciliter l'accès à certaines entreprises, mais le secteur privilégie souvent les compétences et le portfolio. De nombreux professionnels réussissent sans diplôme formel grâce à l'autoformation et l'expérience.\n\n**Comment savoir si ce métier me correspond ?**\n\nPour découvrir si ce métier correspond à votre profil, passez notre [test d'orientation professionnelle gratuit](https://quizorientation.online/quiz). Vous obtiendrez des recommandations personnalisées basées sur vos intérêts et compétences.\n\n`,
    en: `## FAQ: Frequently Asked Questions\n\n**What is the best way to start in this field?**\n\nThe best approach depends on your situation. If you're a student, prioritize academic training. For a career change, bootcamps or intensive training may be more suitable. The essential is to practice regularly and build a solid portfolio.\n\n**How long does it take to master the necessary skills?**\n\nThis varies according to your investment and your path. With intensive training, count 6 months to 1 year for the basics. For complete mastery, plan 2-3 years of regular practice.\n\n**What are the real career opportunities in this profession?**\n\nOpportunities are numerous and varied. You can work in a company, agency, as a freelancer, or create your own business. The sectors that recruit the most are [sectors according to article].\n\n**Do you need a specific degree?**\n\nA degree can facilitate access to certain companies, but the sector often prioritizes skills and portfolio. Many professionals succeed without a formal degree thanks to self-training and experience.\n\n**How to know if this profession suits me?**\n\nTo discover if this profession matches your profile, take our [free career orientation test](https://quizorientation.online/quiz). You'll get personalized recommendations based on your interests and skills.\n\n`,
    ar: `## الأسئلة الشائعة\n\n**ما هي أفضل طريقة للبدء في هذا المجال؟**\n\nأفضل نهج يعتمد على وضعك. إذا كنت طالباً، ركز على التدريب الأكاديمي. لإعادة التوجيه، قد تكون bootcamps أو التدريبات المكثفة أكثر ملاءمة. الأساسي هو الممارسة بانتظام وبناء محفظة أعمال صلبة.\n\n**كم من الوقت يستغرق إتقان المهارات الضرورية؟**\n\nهذا يختلف حسب استثمارك ومسارك. مع تدريب مكثف، احسب 6 أشهر إلى سنة للأساسيات. للإتقان الكامل، خطط لسنتين إلى 3 سنوات من الممارسة المنتظمة.\n\n**ما هي الفرص المهنية الحقيقية لهذه المهنة؟**\n\nالفرص عديدة ومتنوعة. يمكنك العمل في شركة، وكالة، كعامل حر، أو إنشاء نشاطك الخاص. القطاعات التي توظف أكثر هي [القطاعات حسب المقال].\n\n**هل تحتاج شهادة محددة؟**\n\nالشهادة يمكنها تسهيل الوصول إلى بعض الشركات، لكن القطاع غالباً ما يفضل المهارات ومحفظة الأعمال. العديد من المحترفين ينجحون بدون شهادة رسمية بفضل التعلم الذاتي والخبرة.\n\n**كيف أعرف إذا كانت هذه المهنة تناسبني؟**\n\nلاكتشاف ما إذا كانت هذه المهنة تطابق ملفك، اجتز [اختبار التوجيه المهني المجاني](https://quizorientation.online/quiz). ستحصل على توصيات مخصصة بناءً على اهتماماتك ومهاراتك.\n\n`
  };
  return faqs[lang] || faqs.fr;
}

function generateConclusion(lang) {
  const conclusions = {
    fr: `## Conclusion : votre avenir professionnel vous attend\n\nCe domaine offre de nombreuses opportunités pour ceux qui sont prêts à investir dans leur formation et leur développement professionnel. L'essentiel est de commencer, de pratiquer régulièrement et de rester curieux face aux évolutions du secteur.\n\n**Prêt à découvrir votre profil professionnel ?** [Passez notre test d'orientation gratuit](https://quizorientation.online/quiz) et obtenez des recommandations personnalisées pour votre carrière.\n\n`,
    en: `## Conclusion: Your Professional Future Awaits\n\nThis field offers many opportunities for those ready to invest in their training and professional development. The essential is to start, practice regularly, and stay curious about sector developments.\n\n**Ready to discover your professional profile?** [Take our free orientation test](https://quizorientation.online/quiz) and get personalized recommendations for your career.\n\n`,
    ar: `## الخلاصة: مستقبلك المهني ينتظرك\n\nهذا المجال يقدم فرصاً عديدة لمن هم مستعدون للاستثمار في تدريبهم وتطويرهم المهني. الأساسي هو البدء، الممارسة بانتظام، والبقاء فضولياً تجاه تطورات القطاع.\n\n**هل أنت مستعد لاكتشاف ملفك المهني؟** [اجتز اختبار التوجيه المجاني](https://quizorientation.online/quiz) واحصل على توصيات مخصصة لمسيرتك.\n\n`
  };
  return conclusions[lang] || conclusions.fr;
}

// Liste des articles (sans l'article 01 déjà créé)
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
  },
  {
    id: 3,
    title_fr: "Infirmier en 2025 : parcours, débouchés, salaires et formations",
    slug_fr: "infirmier-2025-parcours-debouches-salaires",
    description_fr: "Guide complet sur le métier d'infirmier en 2025 : parcours de formation, débouchés professionnels, salaires, spécialisations. Tout savoir sur cette profession essentielle.",
    title_en: "Nurse in 2025: Career Path, Opportunities, Salaries and Training",
    slug_en: "nurse-2025-career-opportunities-salaries",
    description_en: "Complete guide on the nursing profession in 2025: training path, career opportunities, salaries, specializations. Everything about this essential profession.",
    title_ar: "الممرض في 2025: المسار المهني والفرص والرواتب والتدريب",
    slug_ar: "الممرض-2025",
    category: "métiers",
    date: "2025-01-17"
  },
  {
    id: 4,
    title_fr: "Ingénieur IA : pourquoi c'est le métier du futur en 2025",
    slug_fr: "ingenieur-ia-metier-futur-2025",
    description_fr: "Découvrez pourquoi ingénieur IA est le métier du futur en 2025 : formations, compétences, salaires, opportunités. Guide complet pour devenir ingénieur en intelligence artificielle.",
    title_en: "AI Engineer: Why It's the Job of the Future in 2025",
    slug_en: "ai-engineer-future-job-2025",
    description_en: "Discover why AI engineer is the job of the future in 2025: training, skills, salaries, opportunities. Complete guide to become an artificial intelligence engineer.",
    title_ar: "مهندس الذكاء الاصطناعي: لماذا هي مهنة المستقبل في 2025",
    slug_ar: "مهندس-الذكاء-الاصطناعي-2025",
    category: "métiers",
    date: "2025-01-18"
  },
  {
    id: 5,
    title_fr: "Gestionnaire RH : fiche métier complète, compétences et salaire 2025",
    slug_fr: "gestionnaire-rh-fiche-metier-2025",
    description_fr: "Fiche métier complète gestionnaire RH en 2025 : missions, compétences, formations, salaires, évolution de carrière. Tout savoir sur les ressources humaines.",
    title_en: "HR Manager: Complete Job Description, Skills and Salary 2025",
    slug_en: "hr-manager-job-description-2025",
    description_en: "Complete HR manager job description in 2025: missions, skills, training, salaries, career evolution. Everything about human resources.",
    title_ar: "مدير الموارد البشرية: وصف الوظيفة الكامل والمهارات والراتب 2025",
    slug_ar: "مدير-الموارد-البشرية-2025",
    category: "métiers",
    date: "2025-01-19"
  },
  {
    id: 6,
    title_fr: "Agent immobilier : comment réussir en 2025, formation et conseils",
    slug_fr: "agent-immobilier-reussir-2025",
    description_fr: "Guide complet pour réussir comme agent immobilier en 2025 : formation obligatoire, compétences, techniques de vente, salaires. Conseils pratiques pour débuter.",
    title_en: "Real Estate Agent: How to Succeed in 2025, Training and Tips",
    slug_en: "real-estate-agent-succeed-2025",
    description_en: "Complete guide to succeed as a real estate agent in 2025: mandatory training, skills, sales techniques, salaries. Practical tips to get started.",
    title_ar: "وكيل عقاري: كيف تنجح في 2025، التدريب والنصائح",
    slug_ar: "وكيل-عقاري-2025",
    category: "métiers",
    date: "2025-01-20"
  },
  {
    id: 7,
    title_fr: "Technicien en réseaux et cybersécurité : parcours complet et formations 2025",
    slug_fr: "technicien-reseaux-cybersecurite-2025",
    description_fr: "Guide complet technicien réseaux et cybersécurité en 2025 : formations, certifications, compétences, salaires. Tout sur les métiers de la sécurité informatique.",
    title_en: "Network and Cybersecurity Technician: Complete Career Path and Training 2025",
    slug_en: "network-cybersecurity-technician-2025",
    description_en: "Complete guide network and cybersecurity technician in 2025: training, certifications, skills, salaries. Everything about IT security professions.",
    title_ar: "فني الشبكات والأمن السيبراني: المسار المهني الكامل والتدريب 2025",
    slug_ar: "فني-الشبكات-الأمن-2025",
    category: "métiers",
    date: "2025-01-21"
  },
  {
    id: 8,
    title_fr: "Assistant(e) administratif(ve) : compétences essentielles et débouchés 2025",
    slug_fr: "assistant-administratif-competences-2025",
    description_fr: "Guide complet assistant administratif en 2025 : compétences essentielles, formations, missions, salaires, débouchés. Tout savoir sur ce métier polyvalent.",
    title_en: "Administrative Assistant: Essential Skills and Opportunities 2025",
    slug_en: "administrative-assistant-skills-2025",
    description_en: "Complete guide administrative assistant in 2025: essential skills, training, missions, salaries, opportunities. Everything about this versatile profession.",
    title_ar: "مساعد إداري: المهارات الأساسية والفرص 2025",
    slug_ar: "مساعد-إداري-2025",
    category: "métiers",
    date: "2025-01-22"
  },
  {
    id: 9,
    title_fr: "Community Manager : guide complet du débutant à l'expert en 2025",
    slug_fr: "community-manager-guide-complet-2025",
    description_fr: "Guide complet Community Manager en 2025 : compétences, formations, outils, stratégies, salaires. Devenir expert en gestion de communautés en ligne.",
    title_en: "Community Manager: Complete Guide from Beginner to Expert in 2025",
    slug_en: "community-manager-complete-guide-2025",
    description_en: "Complete Community Manager guide in 2025: skills, training, tools, strategies, salaries. Become an expert in online community management.",
    title_ar: "مدير المجتمع: دليل شامل من المبتدئ إلى الخبير في 2025",
    slug_ar: "مدير-المجتمع-2025",
    category: "métiers",
    date: "2025-01-23"
  },
  {
    id: 10,
    title_fr: "Métiers du BTP : ceux qui recrutent le plus en 2025",
    slug_fr: "metiers-btp-recrutent-2025",
    description_fr: "Guide complet métiers BTP qui recrutent en 2025 : formations, salaires, compétences, débouchés. Découvrez les opportunités dans le bâtiment et travaux publics.",
    title_en: "Construction Jobs: The Most Recruited in 2025",
    slug_en: "construction-jobs-recruiting-2025",
    description_en: "Complete guide construction jobs recruiting in 2025: training, salaries, skills, opportunities. Discover opportunities in construction and public works.",
    title_ar: "مهن البناء: الأكثر توظيفاً في 2025",
    slug_ar: "مهن-البناء-2025",
    category: "métiers",
    date: "2025-01-24"
  },
  {
    id: 11,
    title_fr: "Comment choisir sa filière après le bac : guide complet orientation 2025",
    slug_fr: "choisir-filiere-apres-bac-2025",
    description_fr: "Guide complet pour choisir sa filière après le bac en 2025 : critères de choix, erreurs à éviter, conseils pratiques. Bien s'orienter après le baccalauréat.",
    title_en: "How to Choose Your Field After High School: Complete Orientation Guide 2025",
    slug_en: "choose-field-after-high-school-2025",
    description_en: "Complete guide to choose your field after high school in 2025: selection criteria, mistakes to avoid, practical advice. Properly orient yourself after graduation.",
    title_ar: "كيف تختار تخصصك بعد البكالوريا: دليل التوجيه الشامل 2025",
    slug_ar: "اختيار-التخصص-بعد-البكالوريا-2025",
    category: "orientation",
    date: "2025-01-25"
  },
  {
    id: 12,
    title_fr: "Erreurs d'orientation à éviter : guide complet pour bien s'orienter",
    slug_fr: "erreurs-orientation-eviter-2025",
    description_fr: "Guide complet erreurs d'orientation à éviter : les pièges courants, comment les éviter, conseils pratiques. Bien s'orienter sans se tromper.",
    title_en: "Orientation Mistakes to Avoid: Complete Guide to Proper Guidance",
    slug_en: "orientation-mistakes-avoid-2025",
    description_en: "Complete guide orientation mistakes to avoid: common pitfalls, how to avoid them, practical advice. Properly orient yourself without mistakes.",
    title_ar: "أخطاء التوجيه التي يجب تجنبها: دليل شامل للتوجيه الصحيح",
    slug_ar: "أخطاء-التوجيه-2025",
    category: "orientation",
    date: "2025-01-26"
  },
  {
    id: 13,
    title_fr: "Comment réussir un entretien d'admission : conseils et techniques 2025",
    slug_fr: "reussir-entretien-admission-2025",
    description_fr: "Guide complet pour réussir un entretien d'admission en 2025 : préparation, questions fréquentes, techniques, erreurs à éviter. Décrocher votre admission.",
    title_en: "How to Succeed in an Admission Interview: Tips and Techniques 2025",
    slug_en: "succeed-admission-interview-2025",
    description_en: "Complete guide to succeed in an admission interview in 2025: preparation, common questions, techniques, mistakes to avoid. Get your admission.",
    title_ar: "كيف تنجح في مقابلة القبول: نصائح وتقنيات 2025",
    slug_ar: "مقابلة-القبول-2025",
    category: "orientation",
    date: "2025-01-27"
  },
  {
    id: 14,
    title_fr: "Comment réussir son premier stage : guide complet étudiant 2025",
    slug_fr: "reussir-premier-stage-2025",
    description_fr: "Guide complet pour réussir son premier stage en 2025 : préparation, comportement, missions, valorisation. Faire de votre stage un tremplin professionnel.",
    title_en: "How to Succeed in Your First Internship: Complete Student Guide 2025",
    slug_en: "succeed-first-internship-2025",
    description_en: "Complete guide to succeed in your first internship in 2025: preparation, behavior, missions, valorization. Make your internship a professional springboard.",
    title_ar: "كيف تنجح في تدريبك الأول: دليل الطالب الشامل 2025",
    slug_ar: "النجاح-في-التدريب-الأول-2025",
    category: "orientation",
    date: "2025-01-28"
  },
  {
    id: 15,
    title_fr: "Étudier ou travailler : comment prendre la bonne décision en 2025",
    slug_fr: "etudier-ou-travailler-decision-2025",
    description_fr: "Guide complet étudier ou travailler en 2025 : critères de décision, avantages et inconvénients, alternatives. Prendre la bonne décision pour votre avenir.",
    title_en: "Study or Work: How to Make the Right Decision in 2025",
    slug_en: "study-or-work-decision-2025",
    description_en: "Complete guide study or work in 2025: decision criteria, advantages and disadvantages, alternatives. Make the right decision for your future.",
    title_ar: "الدراسة أو العمل: كيف تتخذ القرار الصحيح في 2025",
    slug_ar: "الدراسة-أو-العمل-2025",
    category: "orientation",
    date: "2025-01-29"
  },
  {
    id: 16,
    title_fr: "Top 10 soft skills demandées en entreprise en 2025",
    slug_fr: "top-10-soft-skills-entreprise-2025",
    description_fr: "Guide complet top 10 soft skills demandées en entreprise en 2025 : définition, importance, comment les développer. Les compétences comportementales essentielles.",
    title_en: "Top 10 Soft Skills in Demand in Companies in 2025",
    slug_en: "top-10-soft-skills-companies-2025",
    description_en: "Complete guide top 10 soft skills in demand in companies in 2025: definition, importance, how to develop them. Essential behavioral skills.",
    title_ar: "أفضل 10 مهارات ناعمة مطلوبة في الشركات في 2025",
    slug_ar: "أفضل-10-مهارات-ناعمة-2025",
    category: "compétences",
    date: "2025-01-30"
  },
  {
    id: 17,
    title_fr: "Compétences digitales indispensables pour les jeunes diplômés en 2025",
    slug_fr: "competences-digitales-jeunes-diplomes-2025",
    description_fr: "Guide complet compétences digitales pour jeunes diplômés en 2025 : outils, formations, valorisation. Les compétences numériques essentielles pour décrocher un emploi.",
    title_en: "Essential Digital Skills for Young Graduates in 2025",
    slug_en: "essential-digital-skills-graduates-2025",
    description_en: "Complete guide digital skills for young graduates in 2025: tools, training, valorization. Essential digital skills to land a job.",
    title_ar: "المهارات الرقمية الأساسية للخريجين الشباب في 2025",
    slug_ar: "المهارات-الرقمية-الخريجين-2025",
    category: "compétences",
    date: "2025-01-31"
  },
  {
    id: 18,
    title_fr: "Comment améliorer sa communication professionnelle en 2025",
    slug_fr: "ameliorer-communication-professionnelle-2025",
    description_fr: "Guide complet améliorer sa communication professionnelle en 2025 : techniques, outils, erreurs à éviter. Maîtriser l'art de communiquer efficacement au travail.",
    title_en: "How to Improve Your Professional Communication in 2025",
    slug_en: "improve-professional-communication-2025",
    description_en: "Complete guide improve your professional communication in 2025: techniques, tools, mistakes to avoid. Master the art of effective communication at work.",
    title_ar: "كيف تحسن تواصلك المهني في 2025",
    slug_ar: "تحسين-التواصل-المهني-2025",
    category: "compétences",
    date: "2025-02-01"
  },
  {
    id: 19,
    title_fr: "Comment rédiger un CV parfait : guide complet avec modèles 2025",
    slug_fr: "rediger-cv-parfait-modeles-2025",
    description_fr: "Guide complet rédiger un CV parfait en 2025 : structure, contenu, erreurs à éviter, modèles. Créer un CV qui attire les recruteurs.",
    title_en: "How to Write a Perfect CV: Complete Guide with Templates 2025",
    slug_en: "write-perfect-cv-templates-2025",
    description_en: "Complete guide write a perfect CV in 2025: structure, content, mistakes to avoid, templates. Create a CV that attracts recruiters.",
    title_ar: "كيف تكتب سيرة ذاتية مثالية: دليل شامل مع نماذج 2025",
    slug_ar: "كتابة-سيرة-ذاتية-مثالية-2025",
    category: "conseils",
    date: "2025-02-02"
  },
  {
    id: 20,
    title_fr: "Lettre de motivation : guide complet avec exemples pratiques 2025",
    slug_fr: "lettre-motivation-guide-exemples-2025",
    description_fr: "Guide complet lettre de motivation en 2025 : structure, contenu, exemples, erreurs à éviter. Rédiger une lettre de motivation efficace.",
    title_en: "Cover Letter: Complete Guide with Practical Examples 2025",
    slug_en: "cover-letter-guide-examples-2025",
    description_en: "Complete guide cover letter in 2025: structure, content, examples, mistakes to avoid. Write an effective cover letter.",
    title_ar: "رسالة التحفيز: دليل شامل مع أمثلة عملية 2025",
    slug_ar: "رسالة-التحفيز-2025",
    category: "conseils",
    date: "2025-02-03"
  },
  {
    id: 21,
    title_fr: "Comment décrocher un job sans expérience : stratégies efficaces 2025",
    slug_fr: "decrocher-job-sans-experience-2025",
    description_fr: "Guide complet décrocher un job sans expérience en 2025 : stratégies, techniques, valorisation des compétences. Trouver un emploi quand on est débutant.",
    title_en: "How to Land a Job Without Experience: Effective Strategies 2025",
    slug_en: "land-job-without-experience-2025",
    description_en: "Complete guide land a job without experience in 2025: strategies, techniques, skill valorization. Find a job when you're a beginner.",
    title_ar: "كيف تحصل على وظيفة بدون خبرة: استراتيجيات فعالة 2025",
    slug_ar: "الحصول-على-وظيفة-بدون-خبرة-2025",
    category: "conseils",
    date: "2025-02-04"
  },
  {
    id: 22,
    title_fr: "Comment préparer un entretien d'embauche : guide complet 2025",
    slug_fr: "preparer-entretien-embauche-2025",
    description_fr: "Guide complet préparer un entretien d'embauche en 2025 : préparation, questions fréquentes, techniques, erreurs à éviter. Réussir votre entretien.",
    title_en: "How to Prepare for a Job Interview: Complete Guide 2025",
    slug_en: "prepare-job-interview-2025",
    description_en: "Complete guide prepare for a job interview in 2025: preparation, common questions, techniques, mistakes to avoid. Succeed in your interview.",
    title_ar: "كيف تحضر لمقابلة عمل: دليل شامل 2025",
    slug_ar: "تحضير-مقابلة-عمل-2025",
    category: "conseils",
    date: "2025-02-05"
  },
  {
    id: 23,
    title_fr: "Comment booster son employabilité en 2025 : stratégies efficaces",
    slug_fr: "booster-employabilite-2025",
    description_fr: "Guide complet booster son employabilité en 2025 : stratégies, compétences, formations, réseautage. Renforcer votre valeur sur le marché du travail.",
    title_en: "How to Boost Your Employability in 2025: Effective Strategies",
    slug_en: "boost-employability-2025",
    description_en: "Complete guide boost your employability in 2025: strategies, skills, training, networking. Strengthen your value in the job market.",
    title_ar: "كيف تعزز قابليتك للتوظيف في 2025: استراتيجيات فعالة",
    slug_ar: "تعزيز-قابلية-التوظيف-2025",
    category: "conseils",
    date: "2025-02-06"
  },
  {
    id: 24,
    title_fr: "Les métiers qui vont disparaître d'ici 2030 : analyse et alternatives",
    slug_fr: "metiers-disparaitre-2030",
    description_fr: "Analyse complète métiers qui vont disparaître d'ici 2030 : causes, secteurs concernés, alternatives, reconversion. Anticiper les changements du marché du travail.",
    title_en: "Jobs That Will Disappear by 2030: Analysis and Alternatives",
    slug_en: "jobs-disappear-2030",
    description_en: "Complete analysis jobs that will disappear by 2030: causes, concerned sectors, alternatives, career change. Anticipate job market changes.",
    title_ar: "المهن التي ستختفي بحلول 2030: تحليل وبدائل",
    slug_ar: "مهن-ستختفي-2030",
    category: "futur",
    date: "2025-02-07"
  },
  {
    id: 25,
    title_fr: "Les métiers qui vont exploser grâce à l'IA en 2025-2030",
    slug_fr: "metiers-exploser-ia-2025-2030",
    description_fr: "Guide complet métiers qui vont exploser grâce à l'IA en 2025-2030 : opportunités, compétences, formations. Les carrières de demain dans l'intelligence artificielle.",
    title_en: "Jobs That Will Explode Thanks to AI in 2025-2030",
    slug_en: "jobs-explode-ai-2025-2030",
    description_en: "Complete guide jobs that will explode thanks to AI in 2025-2030: opportunities, skills, training. Tomorrow's careers in artificial intelligence.",
    title_ar: "المهن التي ستنفجر بفضل الذكاء الاصطناعي في 2025-2030",
    slug_ar: "مهن-تنفجر-الذكاء-الاصطناعي-2025",
    category: "futur",
    date: "2025-02-08"
  },
  {
    id: 26,
    title_fr: "Les secteurs qui recrutent le plus au Maroc en 2025",
    slug_fr: "secteurs-recrutent-maroc-2025",
    description_fr: "Guide complet secteurs qui recrutent le plus au Maroc en 2025 : opportunités, salaires, compétences recherchées. Le marché de l'emploi marocain en 2025.",
    title_en: "Sectors Recruiting the Most in Morocco in 2025",
    slug_en: "sectors-recruiting-morocco-2025",
    description_en: "Complete guide sectors recruiting the most in Morocco in 2025: opportunities, salaries, sought-after skills. The Moroccan job market in 2025.",
    title_ar: "القطاعات التي توظف أكثر في المغرب في 2025",
    slug_ar: "القطاعات-التوظيف-المغرب-2025",
    category: "futur",
    date: "2025-02-09"
  },
  {
    id: 27,
    title_fr: "Comment découvrir son potentiel professionnel : guide complet",
    slug_fr: "decouvrir-potentiel-professionnel",
    description_fr: "Guide complet découvrir son potentiel professionnel : méthodes, outils, tests, conseils. Identifier vos talents et construire votre projet professionnel.",
    title_en: "How to Discover Your Professional Potential: Complete Guide",
    slug_en: "discover-professional-potential",
    description_en: "Complete guide discover your professional potential: methods, tools, tests, advice. Identify your talents and build your professional project.",
    title_ar: "كيف تكتشف إمكانياتك المهنية: دليل شامل",
    slug_ar: "اكتشاف-الإمكانيات-المهنية",
    category: "orientation",
    date: "2025-02-10"
  },
  {
    id: 28,
    title_fr: "Test d'orientation professionnelle : comment ça marche en 2025",
    slug_fr: "test-orientation-professionnelle-2025",
    description_fr: "Guide complet test d'orientation professionnelle en 2025 : fonctionnement, fiabilité, interprétation des résultats. Comprendre les tests d'orientation.",
    title_en: "Career Orientation Test: How It Works in 2025",
    slug_en: "career-orientation-test-2025",
    description_en: "Complete guide career orientation test in 2025: functioning, reliability, result interpretation. Understand orientation tests.",
    title_ar: "اختبار التوجيه المهني: كيف يعمل في 2025",
    slug_ar: "اختبار-التوجيه-المهني-2025",
    category: "orientation",
    date: "2025-02-11"
  },
  {
    id: 29,
    title_fr: "Comment surmonter le stress lié à l'avenir professionnel : guide pratique",
    slug_fr: "surmonter-stress-avenir-professionnel",
    description_fr: "Guide complet surmonter le stress professionnel en 2025 : causes, techniques, conseils pratiques. Gérer l'anxiété liée à l'orientation et à l'emploi.",
    title_en: "How to Overcome Stress Related to Professional Future: Practical Guide",
    slug_en: "overcome-stress-professional-future",
    description_en: "Complete guide overcome professional stress in 2025: causes, techniques, practical advice. Manage anxiety related to orientation and employment.",
    title_ar: "كيف تتغلب على التوتر المرتبط بالمستقبل المهني: دليل عملي",
    slug_ar: "التغلب-على-التوتر-المهني",
    category: "orientation",
    date: "2025-02-12"
  },
  {
    id: 30,
    title_fr: "Comment définir son projet professionnel de A à Z : méthode complète",
    slug_fr: "definir-projet-professionnel-a-z",
    description_fr: "Guide complet définir son projet professionnel de A à Z en 2025 : méthode, étapes, outils, exemples. Construire un projet professionnel solide et réalisable.",
    title_en: "How to Define Your Professional Project from A to Z: Complete Method",
    slug_en: "define-professional-project-a-z",
    description_en: "Complete guide define your professional project from A to Z in 2025: method, steps, tools, examples. Build a solid and achievable professional project.",
    title_ar: "كيف تحدد مشروعك المهني من الألف إلى الياء: طريقة شاملة",
    slug_ar: "تحديد-المشروع-المهني",
    category: "orientation",
    date: "2025-02-13"
  }
];

// Fonction principale
function generateAllArticles() {
  const baseDir = path.join(__dirname, '..', 'public', 'articles-seo');
  
  articles.forEach(article => {
    const articleDir = path.join(baseDir, `article-${String(article.id).padStart(2, '0')}`);
    
    // Générer les fichiers markdown pour les 3 langues
    ['fr', 'en', 'ar'].forEach(lang => {
      const content = generateFullContent(article, lang);
      const filePath = path.join(articleDir, `${lang}.md`);
      fs.writeFileSync(filePath, content, 'utf-8');
    });
    
    console.log(`✅ Article ${article.id} généré: ${article.title_fr}`);
  });
  
  console.log(`\n🎉 ${articles.length} articles générés avec succès !`);
}

// Exécuter
generateAllArticles();









