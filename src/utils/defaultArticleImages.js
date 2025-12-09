/**
 * Système d'images par défaut par catégorie pour les articles de blog
 * Améliore le SEO, l'engagement et le trafic organique
 */

// Mapping des catégories vers les images par défaut
const categoryImages = {
  // Orientation professionnelle
  'orientation': '/assets/blog/default-orientation.svg',
  'profils': '/assets/blog/default-profils.svg',
  
  // Compétences et développement
  'competences': '/assets/blog/default-competences.svg',
  'compétences': '/assets/blog/default-competences.svg',
  'soft-skills': '/assets/blog/default-soft-skills.svg',
  'développement': '/assets/blog/default-developpement.svg',
  'formation': '/assets/blog/default-formation.svg',
  
  // Métiers et carrière
  'metiers': '/assets/blog/default-metiers.svg',
  'carrière': '/assets/blog/default-carriere.svg',
  'emploi': '/assets/blog/default-emploi.svg',
  'reconversion': '/assets/blog/default-reconversion.svg',
  'transition': '/assets/blog/default-transition.svg',
  
  // RH et recrutement
  'rh': '/assets/blog/default-rh.svg',
  'recrutement': '/assets/blog/default-recrutement.svg',
  'marche-travail': '/assets/blog/default-marche-travail.svg',
  'employabilite': '/assets/blog/default-employabilite.svg',
  
  // Tech et innovation
  'it': '/assets/blog/default-it.svg',
  'ia': '/assets/blog/default-ia.svg',
  'tech': '/assets/blog/default-tech.svg',
  'innovation': '/assets/blog/default-innovation.svg',
  
  // Management et leadership
  'management': '/assets/blog/default-management.svg',
  'leadership': '/assets/blog/default-leadership.svg',
  'entrepreneuriat': '/assets/blog/default-entrepreneuriat.svg',
  
  // Bien-être et productivité
  'bien-être': '/assets/blog/default-bien-etre.svg',
  'bien-etre': '/assets/blog/default-bien-etre.svg',
  'productivite': '/assets/blog/default-productivite.svg',
  
  // Réseau et partenariats
  'réseau': '/assets/blog/default-reseau.svg',
  'partenariats': '/assets/blog/default-partenariats.svg',
  'branding': '/assets/blog/default-branding.svg',
  
  // Divers
  'télétravail': '/assets/blog/default-teletravail.svg',
  'diversite': '/assets/blog/default-diversite.svg',
  'insertion': '/assets/blog/default-insertion.svg',
  'planification': '/assets/blog/default-planification.svg',
  'inspiration': '/assets/blog/default-inspiration.svg',
  'tendances': '/assets/blog/default-tendances.svg',
  'retraite': '/assets/blog/default-retraite.svg',
}

// Image par défaut générique (fallback)
const DEFAULT_IMAGE = '/assets/blog/default-generic.svg'

/**
 * Obtient l'image par défaut pour une catégorie donnée
 * @param {string} category - Catégorie de l'article
 * @returns {string} Chemin vers l'image par défaut
 */
export const getDefaultArticleImage = (category) => {
  // Si pas de catégorie, retourner l'image générique
  if (!category || typeof category !== 'string') {
    return DEFAULT_IMAGE
  }
  
  // Normaliser la catégorie (minuscules, sans accents pour certaines)
  const normalizedCategory = category.toLowerCase().trim()
  
  // Chercher une correspondance exacte
  if (categoryImages[normalizedCategory]) {
    return categoryImages[normalizedCategory]
  }
  
  // Chercher une correspondance partielle (pour gérer les variations)
  const matchingKey = Object.keys(categoryImages).find(key => 
    normalizedCategory.includes(key) || key.includes(normalizedCategory)
  )
  
  if (matchingKey) {
    return categoryImages[matchingKey]
  }
  
  // Fallback sur l'image générique
  return DEFAULT_IMAGE
}

/**
 * Génère un alt text SEO-friendly pour une image d'article
 * @param {string|object} title - Titre de l'article (string ou objet multilingue)
 * @param {string} category - Catégorie de l'article
 * @returns {string} Alt text optimisé pour le SEO
 */
export const generateImageAltText = (title, category) => {
  // Gérer les titres multilingues (objets) ou strings
  const titleText = typeof title === 'string' ? title : (title?.fr || title?.en || title?.ar || 'Article')
  
  if (!titleText) return 'Illustration article de blog'
  
  // Créer un alt text descriptif avec le titre et la catégorie
  const categoryLabel = category ? ` - ${category}` : ''
  return `${titleText}${categoryLabel} - QuizOrientation`
}

export default {
  getDefaultArticleImage,
  generateImageAltText,
  DEFAULT_IMAGE
}

