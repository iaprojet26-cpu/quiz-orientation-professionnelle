const fs = require('fs')
const path = require('path')

// Articles CV à créer
const cvArticles = [
  {
    id: 41,
    slug_fr: 'cv-sans-experience',
    slug_en: 'cv-without-experience',
    slug_ar: 'cv-bila-khibra',
    title_fr: 'Comment faire un CV quand on n\'a pas d\'expérience',
    title_en: 'How to Make a CV When You Have No Experience',
    title_ar: 'كيفية إنشاء سيرة ذاتية بدون خبرة',
    category: 'cv',
    keywords_fr: ['CV étudiant', 'premier CV', 'CV sans expérience', 'conseils CV', 'CV débutant'],
    keywords_en: ['student CV', 'first CV', 'CV without experience', 'CV tips', 'beginner CV'],
    keywords_ar: ['سيرة ذاتية طالب', 'أول سيرة ذاتية', 'سيرة ذاتية بدون خبرة', 'نصائح السيرة الذاتية', 'سيرة ذاتية مبتدئ']
  },
  {
    id: 42,
    slug_fr: 'erreurs-cv-etudiant',
    slug_en: 'student-cv-mistakes',
    slug_ar: 'akhta-cv-talib',
    title_fr: 'CV étudiant : erreurs à éviter absolument',
    title_en: 'Student CV: Mistakes to Absolutely Avoid',
    title_ar: 'السيرة الذاتية للطالب: أخطاء يجب تجنبها تمامًا',
    category: 'cv',
    keywords_fr: ['erreurs CV', 'CV étudiant', 'conseils CV', 'CV professionnel', 'erreurs à éviter'],
    keywords_en: ['CV mistakes', 'student CV', 'CV tips', 'professional CV', 'mistakes to avoid'],
    keywords_ar: ['أخطاء السيرة الذاتية', 'سيرة ذاتية طالب', 'نصائح السيرة الذاتية', 'سيرة ذاتية مهنية', 'أخطاء يجب تجنبها']
  },
  {
    id: 43,
    slug_fr: 'competences-cv-2024',
    slug_en: 'cv-skills-2024',
    slug_ar: 'maharat-cv-2024',
    title_fr: 'Quelles compétences mettre sur un CV en 2024',
    title_en: 'What Skills to Put on a CV in 2024',
    title_ar: 'ما هي المهارات التي يجب وضعها في السيرة الذاتية لعام 2024',
    category: 'cv',
    keywords_fr: ['compétences CV', 'soft skills', 'compétences techniques', 'CV moderne', 'compétences 2024'],
    keywords_en: ['CV skills', 'soft skills', 'technical skills', 'modern CV', 'skills 2024'],
    keywords_ar: ['مهارات السيرة الذاتية', 'المهارات الشخصية', 'المهارات التقنية', 'سيرة ذاتية حديثة', 'مهارات 2024']
  },
  {
    id: 44,
    slug_fr: 'objectif-professionnel-exemples',
    slug_en: 'professional-objective-examples',
    slug_ar: 'hadaf-mihani-amthila',
    title_fr: 'Objectif professionnel : exemples concrets et efficaces',
    title_en: 'Professional Objective: Concrete and Effective Examples',
    title_ar: 'الهدف المهني: أمثلة ملموسة وفعالة',
    category: 'cv',
    keywords_fr: ['objectif professionnel', 'exemples CV', 'rédaction CV', 'accroche CV', 'objectif CV'],
    keywords_en: ['professional objective', 'CV examples', 'CV writing', 'CV hook', 'CV objective'],
    keywords_ar: ['الهدف المهني', 'أمثلة السيرة الذاتية', 'كتابة السيرة الذاتية', 'جذب السيرة الذاتية', 'هدف السيرة الذاتية']
  },
  {
    id: 45,
    slug_fr: 'cv-orientation-profil',
    slug_en: 'cv-orientation-profile',
    slug_ar: 'cv-tawjih-malaf',
    title_fr: 'CV et orientation : comment aligner votre CV avec votre profil',
    title_en: 'CV and Orientation: How to Align Your CV with Your Profile',
    title_ar: 'السيرة الذاتية والتوجيه: كيفية محاذاة سيرتك الذاتية مع ملفك',
    category: 'cv',
    keywords_fr: ['orientation professionnelle', 'profil CV', 'CV personnalisé', 'quiz orientation', 'aligner CV'],
    keywords_en: ['career orientation', 'CV profile', 'personalized CV', 'orientation quiz', 'align CV'],
    keywords_ar: ['التوجيه المهني', 'ملف السيرة الذاتية', 'سيرة ذاتية مخصصة', 'اختبار التوجيه', 'محاذاة السيرة الذاتية']
  }
]

// Fonction pour créer la structure d'un article
function createArticleStructure(article) {
  const articleNum = article.id.toString().padStart(2, '0')
  const articleDir = path.join(__dirname, '..', 'public', 'articles-seo', `article-${articleNum}`)
  
  // Créer le dossier
  if (!fs.existsSync(articleDir)) {
    fs.mkdirSync(articleDir, { recursive: true })
  }

  // Metadata
  const metadata = {
    slug_fr: article.slug_fr,
    slug_en: article.slug_en,
    slug_ar: article.slug_ar,
    title_fr: article.title_fr,
    title_en: article.title_en,
    title_ar: article.title_ar,
    description_fr: `Guide complet sur ${article.title_fr.toLowerCase()}. Conseils pratiques et exemples pour créer un CV professionnel.`,
    description_en: `Complete guide on ${article.title_en.toLowerCase()}. Practical tips and examples to create a professional CV.`,
    description_ar: `دليل شامل حول ${article.title_ar}. نصائح عملية وأمثلة لإنشاء سيرة ذاتية مهنية.`,
    category: article.category,
    keywords_fr: article.keywords_fr,
    keywords_en: article.keywords_en,
    keywords_ar: article.keywords_ar,
    date: new Date().toISOString().split('T')[0],
    image: `/assets/blog/default-cv.svg`
  }

  // Schema JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": metadata.title_fr,
    "description": metadata.description_fr,
    "author": {
      "@type": "Organization",
      "name": "QuizOrientation"
    },
    "publisher": {
      "@type": "Organization",
      "name": "QuizOrientation"
    },
    "datePublished": metadata.date,
    "dateModified": metadata.date
  }

  // Contenu markdown (template)
  const markdownTemplate = (lang, title, slug) => `---
title: ${title}
description: ${lang === 'fr' ? metadata.description_fr : lang === 'en' ? metadata.description_en : metadata.description_ar}
date: ${metadata.date}
category: ${metadata.category}
keywords: ${lang === 'fr' ? metadata.keywords_fr.join(', ') : lang === 'en' ? metadata.keywords_en.join(', ') : metadata.keywords_ar.join(', ')}
image: ${metadata.image}
---

# ${title}

> **Note**: ${lang === 'fr' 
  ? 'Cet article est en cours de rédaction. Le contenu complet sera disponible prochainement.'
  : lang === 'en'
  ? 'This article is currently being written. The full content will be available soon.'
  : 'هذا المقال قيد الكتابة. المحتوى الكامل سيكون متاحًا قريبًا.'
}

## Introduction

${lang === 'fr' 
  ? 'Découvrez comment créer un CV professionnel et efficace. Cet article vous guidera étape par étape pour optimiser votre CV.'
  : lang === 'en'
  ? 'Discover how to create a professional and effective CV. This article will guide you step by step to optimize your CV.'
  : 'اكتشف كيفية إنشاء سيرة ذاتية مهنية وفعالة. سيرشدك هذا المقال خطوة بخطوة لتحسين سيرتك الذاتية.'
}

${lang === 'fr' 
  ? `## Contenu à venir

Le contenu complet de cet article sera ajouté prochainement avec :
- Conseils pratiques
- Exemples concrets
- Astuces professionnelles
- Liens vers notre outil CV

## En attendant

N'hésitez pas à utiliser notre [outil de création de CV](/cv) pour structurer votre CV professionnel.

Découvrez également votre [profil d'orientation](/) pour aligner votre CV avec vos compétences et aspirations.
`
  : lang === 'en'
  ? `## Coming Content

The full content of this article will be added soon with:
- Practical tips
- Concrete examples
- Professional tips
- Links to our CV tool

## In the meantime

Feel free to use our [CV creation tool](/cv) to structure your professional CV.

Also discover your [orientation profile](/) to align your CV with your skills and aspirations.
`
  : `## المحتوى القادم

سيتم إضافة المحتوى الكامل لهذا المقال قريبًا مع:
- نصائح عملية
- أمثلة ملموسة
- نصائح مهنية
- روابط لأداة السيرة الذاتية

## في الوقت الحالي

لا تتردد في استخدام [أداة إنشاء السيرة الذاتية](/cv) لتنظيم سيرتك الذاتية المهنية.

اكتشف أيضًا [ملف التوجيه الخاص بك](/) لمحاذاة سيرتك الذاتية مع مهاراتك وتطلعاتك.
`
}
`

  // Écrire les fichiers
  fs.writeFileSync(
    path.join(articleDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2),
    'utf-8'
  )

  fs.writeFileSync(
    path.join(articleDir, 'schema.json'),
    JSON.stringify(schema, null, 2),
    'utf-8'
  )

  // Créer les fichiers markdown pour les 3 langues
  fs.writeFileSync(
    path.join(articleDir, 'fr.md'),
    markdownTemplate('fr', article.title_fr, article.slug_fr),
    'utf-8'
  )

  fs.writeFileSync(
    path.join(articleDir, 'en.md'),
    markdownTemplate('en', article.title_en, article.slug_en),
    'utf-8'
  )

  fs.writeFileSync(
    path.join(articleDir, 'ar.md'),
    markdownTemplate('ar', article.title_ar, article.slug_ar),
    'utf-8'
  )

  console.log(`✅ Article ${articleNum} créé : ${article.title_fr}`)
}

// Générer tous les articles
console.log('🚀 Génération des 5 articles CV...\n')
cvArticles.forEach(article => {
  createArticleStructure(article)
})

console.log('\n✨ Tous les articles CV ont été créés avec succès !')
console.log('📝 Note: Les articles contiennent des templates. Le contenu complet devra être ajouté manuellement.')


