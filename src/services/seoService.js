import seoContent from '../../seo-content.json'

/**
 * Service pour gérer le contenu SEO multilingue
 */
export const getSEOContent = (language = 'fr', page = 'homepage') => {
  const lang = ['fr', 'en', 'ar'].includes(language) ? language : 'fr'
  const content = seoContent[lang]

  if (!content) {
    console.warn(`Contenu SEO non trouvé pour la langue: ${lang}`)
    return seoContent.fr[page] || {}
  }

  return content[page] || {}
}

/**
 * Obtenir les meta tags pour la page d'accueil
 */
export const getHomepageSEO = (language = 'fr') => {
  const content = getSEOContent(language, 'homepage')
  return {
    title: content.title || 'Quiz d\'Orientation Professionnelle',
    description: content.meta || 'Découvrez votre profil professionnel',
    h1: content.h1 || 'Découvrez Votre Profil Professionnel',
    cta: content.cta || 'Commencer le Quiz',
    contentHtml: content.content_html || ''
  }
}

/**
 * Obtenir le contenu SEO visible pour la homepage (textes multilingues)
 */
export const getHomepageContent = (language = 'fr') => {
  const lang = ['fr', 'en', 'ar'].includes(language) ? language : 'fr'
  const content = seoContent[lang]?.homepage || seoContent.fr.homepage
  
  // Extraire les textes du content_html pour chaque langue
  const texts = {
    fr: {
      intro1: "Vous vous interrogez sur votre avenir professionnel ? Notre **test d'orientation gratuit** vous aide à identifier votre profil professionnel parmi 5 profils distincts : Créatif, Technique, Social, Organisationnel ou Entrepreneurial. Ce **quiz d'orientation professionnelle** est conçu pour vous aider à **trouver votre métier idéal**.",
      intro2: "En répondant à 10-12 questions simples sur vos centres d'intérêt, compétences et préférences de travail, vous obtiendrez un profil personnalisé accompagné de 5 métiers recommandés, leurs descriptions, niveaux d'études requis et **formations adaptées à votre profil**. Un véritable **bilan d'orientation en ligne** en quelques minutes.",
      whyTitle: "Pourquoi Faire Ce Test d'Orientation Gratuit ?",
      whyText: "Ce **test d'orientation professionnelle** est conçu pour vous guider dans vos choix de carrière. Que vous soyez étudiant, en reconversion ou simplement curieux, découvrez les métiers qui correspondent à votre personnalité et vos aspirations. Notre **quiz d'orientation professionnelle** vous permet d'obtenir un **bilan d'orientation en ligne** complet et personnalisé.",
      howTitle: "Comment Fonctionne Notre Quiz d'Orientation ?",
      howText: "Le **quiz d'orientation professionnelle** prend moins de 10 minutes. Répondez honnêtement aux questions, et notre algorithme analysera vos réponses pour déterminer votre profil professionnel. Les résultats sont instantanés et incluent des recommandations détaillées de métiers et **formations adaptées à votre profil**. Un **bilan d'orientation en ligne** rapide et efficace."
    },
    en: {
      intro1: "Wondering about your professional future? Our **free career orientation test** helps you identify your professional profile among 5 distinct profiles: Creative, Technical, Social, Organizational, or Entrepreneurial. This **professional orientation quiz** is designed to help you **find your ideal career**.",
      intro2: "By answering 10-12 simple questions about your interests, skills, and work preferences, you'll get a personalized profile along with 5 recommended careers, their descriptions, required education levels, and **training programs adapted to your profile**. A complete **online career assessment** in just a few minutes.",
      whyTitle: "Why Take This Free Career Orientation Test?",
      whyText: "This **career orientation test** is designed to guide you in your career choices. Whether you're a student, in career transition, or simply curious, discover the careers that match your personality and aspirations. Our **professional orientation quiz** allows you to get a complete and personalized **online career assessment**.",
      howTitle: "How Does Our Career Orientation Quiz Work?",
      howText: "The **professional orientation quiz** takes less than 10 minutes. Answer honestly, and our algorithm will analyze your responses to determine your professional profile. Results are instant and include detailed career recommendations and **training programs adapted to your profile**. A quick and effective **online career assessment**."
    },
    ar: {
      intro1: "هل تتساءل عن مستقبلك المهني؟ يساعدك اختبار التوجيه المجاني لدينا على تحديد ملفك المهني من بين 5 ملفات متميزة: الإبداعي، التقني، الاجتماعي، التنظيمي، أو الريادي.",
      intro2: "من خلال الإجابة على 10-12 سؤالاً بسيطاً حول اهتماماتك ومهاراتك وتفضيلات العمل، ستحصل على ملف شخصي مع 5 مهن موصى بها، ووصفها، ومستويات التعليم المطلوبة، وبرامج التدريب الممكنة.",
      whyTitle: "لماذا تجري هذا الاختبار؟",
      whyText: "تم تصميم اختبار التوجيه المهني هذا لإرشادك في اختياراتك المهنية. سواء كنت طالباً، في مرحلة انتقال مهني، أو ببساطة فضولياً، اكتشف المهن التي تطابق شخصيتك وتطلعاتك.",
      howTitle: "كيف يعمل؟",
      howText: "يستغرق الاختبار أقل من 10 دقائق. أجب بصدق، وسيحلل خوارزميتنا إجاباتك لتحديد ملفك المهني. النتائج فورية وتشمل توصيات مفصلة."
    }
  }
  
  return {
    h1: content.h1 || '',
    intro1: texts[lang].intro1,
    intro2: texts[lang].intro2,
    whyTitle: texts[lang].whyTitle,
    whyText: texts[lang].whyText,
    howTitle: texts[lang].howTitle,
    howText: texts[lang].howText
  }
}

/**
 * Obtenir les meta tags pour la page de résultats
 */
export const getResultPageSEO = (language = 'fr', profileName = '') => {
  const content = getSEOContent(language, 'result_template')
  return {
    title: content.title?.replace('{{profile}}', profileName) || `Profil: ${profileName}`,
    description: content.meta?.replace('{{profile}}', profileName) || `Découvrez les métiers pour le profil ${profileName}`,
    h1: content.h1?.replace('{{profile}}', profileName) || `Votre Profil: ${profileName}`,
    shareText: content.share_text?.replace('{{profile}}', profileName) || `J'ai découvert mon profil: ${profileName}`
  }
}

/**
 * Obtenir les balises Open Graph
 */
export const getOGTags = (language = 'fr') => {
  const content = getSEOContent(language, 'og')
  return {
    title: content.title || 'Quiz d\'Orientation Professionnelle',
    description: content.description || 'Découvrez votre profil professionnel',
    image: 'https://quizorientation.online/og-image.jpg',
    url: 'https://quizorientation.online',
    type: 'website',
    imageAlt: content.image_alt || 'Quiz d\'orientation professionnelle'
  }
}

/**
 * Obtenir les balises Twitter Card
 */
export const getTwitterTags = (language = 'fr') => {
  const og = getOGTags(language)
  const content = getSEOContent(language, 'og')
  return {
    card: 'summary_large_image',
    title: og.title,
    description: og.description,
    image: og.image,
    tweetText: content.tweet_text || 'Découvrez votre profil professionnel'
  }
}

/**
 * Obtenir le Schema.org JSON-LD pour la homepage
 */
export const getHomepageSchema = (language = 'fr') => {
  const baseUrl = 'https://quizorientation.online'
  const lang = ['fr', 'en', 'ar'].includes(language) ? language : 'fr'
  
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Quiz d'Orientation Professionnelle",
    "description": "Découvrez votre profil professionnel en 10 minutes. Test gratuit avec résultats instantanés et recommandations personnalisées de métiers.",
    "url": baseUrl,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Comment fonctionne le quiz d'orientation professionnelle ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le quiz prend moins de 10 minutes. Répondez honnêtement aux questions, et notre algorithme analysera vos réponses pour déterminer votre profil professionnel. Les résultats sont instantanés."
          }
        },
        {
          "@type": "Question",
          "name": "Le quiz est-il vraiment gratuit ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, le quiz d'orientation professionnelle est entièrement gratuit. Aucun paiement n'est requis pour obtenir vos résultats."
          }
        },
        {
          "@type": "Question",
          "name": "Quels profils professionnels sont disponibles ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Notre quiz identifie 5 profils distincts : Créatif, Technique, Social, Organisationnel et Entrepreneurial. Chaque profil correspond à des métiers et formations spécifiques."
          }
        }
      ]
    }
  }
}

/**
 * Obtenir le Schema.org JSON-LD pour la page de résultats
 */
export const getResultPageSchema = (language = 'fr', profileName = '') => {
  const baseUrl = 'https://quizorientation.online'
  const lang = ['fr', 'en', 'ar'].includes(language) ? language : 'fr'
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Profil Professionnel: ${profileName}`,
    "description": `Découvrez les métiers et formations pour le profil ${profileName}. Résultats personnalisés de votre quiz d'orientation professionnelle.`,
    "url": `${baseUrl}/${lang}/result/${profileName.toLowerCase().replace(/\s+/g, '-')}`,
    "mainEntity": {
      "@type": "ProfilePage",
      "name": profileName
    }
  }
}

/**
 * Obtenir le Schema.org JSON-LD pour un article de blog
 */
export const getArticleSchema = (article) => {
  if (!article) return null
  
  const baseUrl = 'https://quizorientation.online'
  const publishedDate = article.date ? new Date(article.date).toISOString() : new Date().toISOString()
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title || '',
    "description": article.description || '',
    "image": article.image ? `${baseUrl}${article.image}` : `${baseUrl}/og-image.jpg`,
    "datePublished": publishedDate,
    "dateModified": publishedDate,
    "author": {
      "@type": "Organization",
      "name": "QuizOrientation",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "QuizOrientation",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${article.slug}`
    }
  }
}

/**
 * Obtenir les textes CTA
 */
export const getCTATexts = (language = 'fr') => {
  const content = getSEOContent(language, 'cta_texts')
  return content || {
    start_quiz: 'Commencer le Quiz',
    share: 'Partager',
    retake: 'Refaire le Quiz'
  }
}

/**
 * Obtenir les textes de partage social
 */
export const getSocialShareTexts = (language = 'fr', profileName = '') => {
  const content = getSEOContent(language, 'social_share_texts')
  const texts = content || {}
  
  // Remplacer {{profile}} dans les textes
  Object.keys(texts).forEach(key => {
    if (typeof texts[key] === 'string') {
      texts[key] = texts[key].replace('{{profile}}', profileName)
    }
  })
  
  return texts
}

