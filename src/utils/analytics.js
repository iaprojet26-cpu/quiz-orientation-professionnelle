/**
 * Google Analytics 4 - Service d'analytics
 * ID de mesure : G-0K73VG7X9Z
 */

// ID de mesure Google Analytics
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-0K73VG7X9Z'

/**
 * Initialise Google Analytics (chargement différé pour ne pas bloquer le rendu)
 */
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    console.warn('Google Analytics non configuré')
    return
  }

  // Utiliser requestIdleCallback pour charger après le rendu critique
  const loadGA = () => {
    // Initialiser gtag d'abord (sans charger le script externe)
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    })

    // Charger le script Google Analytics de manière non bloquante
    const script1 = document.createElement('script')
    script1.async = true
    script1.defer = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    // Ajouter en bas du body plutôt que dans le head
    if (document.body) {
      document.body.appendChild(script1)
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(script1)
      })
    }
  }

  // Attendre que la page soit complètement chargée
  if (document.readyState === 'complete') {
    // Utiliser requestIdleCallback si disponible
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadGA, { timeout: 3000 })
    } else {
      setTimeout(loadGA, 3000)
    }
  } else {
    window.addEventListener('load', () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadGA, { timeout: 3000 })
      } else {
        setTimeout(loadGA, 3000)
      }
    })
  }
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

