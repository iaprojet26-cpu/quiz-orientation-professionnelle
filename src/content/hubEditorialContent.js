/**
 * Contenu éditorial statique (visible sans API) pour renforcer E-E-A-T et valeur informative AdSense.
 */
export const opportunitiesEditorial = {
  fr: {
    missionTitle: 'Comment utiliser cette page d’opportunités',
    mission:
      'Cette rubrique ne se limite pas à lister des offres : chaque opportunité est accompagnée de conseils de candidature, de prérequis et de liens vers nos guides et outils gratuits (CV, lettre, préparation entretien). Notre objectif est de vous aider à passer de l’orientation à une candidature concrète sur le marché marocain et international.',
    marketTitle: 'Marché de l’emploi au Maroc : ce qu’il faut savoir en 2025–2026',
    marketPoints: [
      'Les secteurs qui recrutent le plus : numérique (cloud, cybersécurité, data), BPO, industrie, tourisme et services.',
      'Les recruteurs valorisent les soft skills (communication, autonomie, adaptabilité) autant que le diplôme.',
      'Les stages et premiers emplois sont souvent un tremplin : préparez un CV ciblé et une lettre courte adaptée au poste.',
      'Les certifications professionnelles (cloud, gestion de projet, marketing digital) peuvent compenser un manque d’expérience.'
    ],
    applyTitle: 'Conseils pour postuler efficacement',
    applySteps: [
      'Lisez l’intitulé du poste et repérez 5 mots-clés à reprendre dans votre CV (outil ATS disponible sur le site).',
      'Personnalisez votre lettre de motivation en 3 paragraphes : motivation, compétences, disponibilité.',
      'Préparez 3 exemples concrets (projet, stage, association) pour l’entretien.',
      'Relisez votre profil LinkedIn et alignez-le avec le secteur visé.'
    ],
    resourcesTitle: 'Ressources complémentaires',
    links: [
      { label: 'Créer un CV professionnel', path: '/cv' },
      { label: 'Score ATS de votre CV', path: '/tools/ats-score' },
      { label: 'Lettre de motivation', path: '/tools/cover-letter' },
      { label: 'Préparation entretien', path: '/tools/interview-prep' },
      { label: 'Articles employabilité', path: '/blog' },
      { label: 'Politique éditoriale', path: '/politique-editoriale' }
    ]
  },
  en: {
    missionTitle: 'How to use this opportunities page',
    mission:
      'This section is more than a job list: each opportunity includes application tips, requirements, and links to our free guides and tools (CV, cover letter, interview prep). Our goal is to help you move from career orientation to a concrete application in Morocco and internationally.',
    marketTitle: 'Morocco job market: key facts for 2025–2026',
    marketPoints: [
      'Top hiring sectors: digital (cloud, cybersecurity, data), BPO, industry, tourism and services.',
      'Recruiters value soft skills (communication, autonomy, adaptability) as much as degrees.',
      'Internships and entry-level roles are often a springboard: prepare a targeted CV and short tailored cover letter.',
      'Professional certifications (cloud, project management, digital marketing) can offset limited experience.'
    ],
    applyTitle: 'Tips to apply effectively',
    applySteps: [
      'Read the job title and pick 5 keywords to mirror in your CV (ATS tool available on site).',
      'Customize your cover letter in 3 paragraphs: motivation, skills, availability.',
      'Prepare 3 concrete examples (project, internship, association) for the interview.',
      'Review your LinkedIn profile and align it with the target sector.'
    ],
    resourcesTitle: 'Related resources',
    links: [
      { label: 'Build a professional CV', path: '/cv' },
      { label: 'ATS CV score', path: '/tools/ats-score' },
      { label: 'Cover letter tool', path: '/tools/cover-letter' },
      { label: 'Interview preparation', path: '/tools/interview-prep' },
      { label: 'Employability articles', path: '/blog' },
      { label: 'Editorial policy', path: '/politique-editoriale' }
    ]
  },
  ar: {
    missionTitle: 'كيفية استخدام صفحة الفرص',
    mission:
      'هذا القسم ليس مجرد قائمة عروض: كل فرصة مصحوبة بنصائح التقديم والمتطلبات وروابط لأدلتنا وأدواتنا المجانية. هدفنا مساعدتك على الانتقال من التوجيه المهني إلى تقديم طلب ملموس في السوق المغربي والدولي.',
    marketTitle: 'سوق العمل في المغرب: ما يجب معرفته 2025–2026',
    marketPoints: [
      'القطاعات الأكثر توظيفا: الرقمي، BPO، الصناعة، السياحة والخدمات.',
      'أصحاب العمل يقدرون المهارات الناعمة بقدر الشهادات.',
      'التدريبات والوظائف الأولى غالبا نقطة انطلاق: جهز سيرة ذاتية ورسالة تحفيز موجهة.',
      'الشهادات المهنية يمكن أن تعوض نقص الخبرة.'
    ],
    applyTitle: 'نصائح للتقديم بفعالية',
    applySteps: [
      'اقرأ المسمى الوظيفي وحدد كلمات مفتاحية لإدراجها في السيرة الذاتية.',
      'خصص رسالة التحفيز في ثلاث فقرات: الدافع، المهارات، التوفر.',
      'جهز ثلاثة أمثلة ملموسة للمقابلة.',
      'راجع ملف LinkedIn ووائمه مع القطاع المستهدف.'
    ],
    resourcesTitle: 'موارد مكملة',
    links: [
      { label: 'إنشاء سيرة ذاتية', path: '/cv' },
      { label: 'درجة ATS', path: '/tools/ats-score' },
      { label: 'رسالة تحفيز', path: '/tools/cover-letter' },
      { label: 'تحضير المقابلة', path: '/tools/interview-prep' },
      { label: 'مقالات التوظيف', path: '/blog' },
      { label: 'السياسة التحريرية', path: '/politique-editoriale' }
    ]
  }
}

export const studyEditorial = {
  fr: {
    missionTitle: 'Orientation des études au Maroc',
    mission:
      'QuizOrientation vous aide à choisir une formation alignée avec votre profil professionnel et le marché de l’emploi. Nous présentons des parcours académiques et professionnalisants avec conditions d’admission, débouchés et liens vers nos guides carrière.',
    chooseTitle: 'Comment choisir sa formation',
    choosePoints: [
      'Croisez vos résultats de quiz avec les filières qui recrutent (ingénierie, commerce, santé, digital, etc.).',
      'Vérifiez les accréditations de l’établissement et les partenariats entreprises.',
      'Comparez la durée, les frais, les stages et les débouchés réels au Maroc.',
      'Préparez un dossier solide : relevés, lettre de motivation, éventuellement entretien.'
    ],
    sectorsTitle: 'Filières porteuses au Maroc',
    sectors:
      'Les domaines en croissance incluent l’informatique et la data, l’ingénierie, la logistique, le tourisme durable, la santé et les énergies renouvelables. Une spécialisation courte (bootcamp, licence pro) peut accélérer l’insertion si elle est complétée par des projets concrets et un CV structuré.',
    resourcesTitle: 'Aller plus loin',
    links: [
      { label: 'Parcours métiers', path: '/career-paths' },
      { label: 'Quiz d’orientation', path: '/' },
      { label: 'Guides carrière', path: '/career-guides' },
      { label: 'Blog orientation', path: '/blog' },
      { label: 'À propos', path: '/a-propos' }
    ]
  },
  en: {
    missionTitle: 'Study guidance in Morocco',
    mission:
      'QuizOrientation helps you choose training aligned with your career profile and the job market. We present academic and professional programs with admission requirements, outcomes, and links to our career guides.',
    chooseTitle: 'How to choose your program',
    choosePoints: [
      'Match your quiz results with in-demand fields (engineering, business, health, digital, etc.).',
      'Check institution accreditation and company partnerships.',
      'Compare duration, fees, internships and real outcomes in Morocco.',
      'Prepare a strong application: transcripts, motivation letter, possible interview.'
    ],
    sectorsTitle: 'Growing fields in Morocco',
    sectors:
      'Growing areas include IT and data, engineering, logistics, sustainable tourism, healthcare and renewable energy. A short specialization can speed up employability when combined with concrete projects and a structured CV.',
    resourcesTitle: 'Go further',
    links: [
      { label: 'Career paths', path: '/career-paths' },
      { label: 'Orientation quiz', path: '/' },
      { label: 'Career guides', path: '/career-guides' },
      { label: 'Orientation blog', path: '/blog' },
      { label: 'About us', path: '/a-propos' }
    ]
  },
  ar: {
    missionTitle: 'توجيه الدراسة في المغرب',
    mission:
      'يساعدك QuizOrientation على اختيار تكوين متوافق مع ملفك المهني وسوق العمل. نعرض مسارات أكاديمية ومهنية مع شروط القبول والآفاق وروابط لأدلة المسار المهني.',
    chooseTitle: 'كيف تختار تكوينك',
    choosePoints: [
      'قارن نتائج الاختبار مع الشعب المطلوبة.',
      'تحقق من اعتماد المؤسسة وشراكاتها مع الشركات.',
      'قارن المدة والتكاليف والتدريبات وفرص التوظيف.',
      'جهز ملفا قويا: كشوف النقاط ورسالة تحفيز ومقابلة إن لزم.'
    ],
    sectorsTitle: 'تخصصات واعدة في المغرب',
    sectors:
      'من المجالات النامية: المعلوميات والبيانات، الهندسة، اللوجستيك، السياحة المستدامة، الصحة والطاقات المتجددة. التخصص القصير يمكن أن يسرع الإدماج مع مشاريع ملموسة وسيرة منظمة.',
    resourcesTitle: 'المتابعة',
    links: [
      { label: 'المسارات المهنية', path: '/career-paths' },
      { label: 'اختبار التوجيه', path: '/' },
      { label: 'أدلة المسار', path: '/career-guides' },
      { label: 'مدونة التوجيه', path: '/blog' },
      { label: 'من نحن', path: '/a-propos' }
    ]
  }
}

export const blogFeaturedTopics = {
  fr: [
    { title: 'Orientation après le bac', slug: 'choisir-filiere-apres-bac-2025' },
    { title: 'Métiers d’avenir 2025–2030', slug: 'metiers-davenir-2025-2030' },
    { title: 'Soft skills et employabilité', slug: 'soft-skills-competences-professionnelles-essentielles' },
    { title: 'Reconversion professionnelle', slug: 'reconversion-professionnelle-guide-complet' }
  ],
  en: [
    { title: 'Career orientation guide', slug: 'guide-complet-orientation-professionnelle-2025' },
    { title: 'Future jobs 2025–2030', slug: 'metiers-davenir-2025-2030' },
    { title: 'Essential soft skills', slug: 'soft-skills-competences-professionnelles-essentielles' },
    { title: 'Career change guide', slug: 'reconversion-professionnelle-guide-complet' }
  ],
  ar: [
    { title: 'التوجيه المهني', slug: 'guide-complet-orientation-professionnelle-2025' },
    { title: 'مهن المستقبل', slug: 'metiers-davenir-2025-2030' },
    { title: 'المهارات الناعمة', slug: 'soft-skills-competences-professionnelles-essentielles' },
    { title: 'إعادة التوجيه', slug: 'reconversion-professionnelle-guide-complet' }
  ]
}
