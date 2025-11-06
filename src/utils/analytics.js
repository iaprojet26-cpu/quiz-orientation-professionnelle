/**
 * Google Analytics 4 - Service d'analytics
 * ID de mesure : G-0K73VG7X9Z
 */

// ID de mesure Google Analytics
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-0K73VG7X9Z'

/**
 * Initialise Google Analytics
 */
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    console.warn('Google Analytics non configuré')
    return
  }

  // Charger le script Google Analytics
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script1)

  // Initialiser gtag
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  })
}

/**
 * Enregistre un événement
 * @param {string} eventName - Nom de l'événement
 * @param {object} eventParams - Paramètres de l'événement
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

/**
 * Enregistre une page vue
 * @param {string} path - Chemin de la page
 * @param {string} title - Titre de la page
 */
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    })
  }
}

/**
 * Événements spécifiques pour le quiz
 */
export const trackQuizStart = () => {
  trackEvent('quiz_start', {
    event_category: 'Quiz',
    event_label: 'Quiz Started',
  })
}

export const trackQuizComplete = (profileName) => {
  trackEvent('quiz_complete', {
    event_category: 'Quiz',
    event_label: 'Quiz Completed',
    profile_name: profileName,
  })
}

export const trackQuizQuestion = (questionNumber, totalQuestions) => {
  trackEvent('quiz_question', {
    event_category: 'Quiz',
    event_label: `Question ${questionNumber}`,
    value: questionNumber,
    total_questions: totalQuestions,
  })
}

export const trackArticleView = (articleTitle) => {
  trackEvent('article_view', {
    event_category: 'Blog',
    event_label: articleTitle,
  })
}

export const trackContactFormSubmit = () => {
  trackEvent('contact_form_submit', {
    event_category: 'Contact',
    event_label: 'Contact Form Submitted',
  })
}

