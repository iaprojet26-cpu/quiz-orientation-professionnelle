/**
 * Client Agent IA — appels vers /api/ai-agent (Vercel)
 */

const getAdminPassword = () => {
  const fromSession = sessionStorage.getItem('admin_password_for_ai')
  return fromSession || ''
}

export const setAdminPasswordForAI = (password) => {
  if (password) sessionStorage.setItem('admin_password_for_ai', password)
}

export const clearAdminPasswordForAI = () => {
  sessionStorage.removeItem('admin_password_for_ai')
}

async function postAI(action, payload = {}) {
  const adminPassword = getAdminPassword()
  if (!adminPassword) {
    throw new Error('Mot de passe admin requis pour l’Agent IA. Saisissez-le dans l’onglet Agent IA.')
  }

  const res = await fetch('/api/ai-agent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, adminPassword, ...payload })
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || `Erreur ${res.status}`)
  }
  return data
}

export const pingAIAgent = () => postAI('ping')

export const suggestTopics = (rubrique, existingTitles = [], count = 5, contentType = 'article') =>
  postAI('suggest_topics', { rubrique, existingTitles, count, contentType })

export const generateBrief = (title, category, angle, contentType = 'article') =>
  postAI('generate_brief', { title, category, angle, contentType })

export const generateArticleDraft = (title, category, brief, contentType = 'article') =>
  postAI('generate_article', { title, category, brief, contentType })

export const humanizeContent = (content_fr, instructions) =>
  postAI('humanize', { content_fr, instructions })

export const WORKFLOW_LABELS = {
  manual: 'Manuel',
  idea: 'Idée',
  brief_ok: 'Brief validé',
  draft_ia: 'Brouillon IA',
  review: 'Prêt relecture',
  published: 'Publié'
}

export const WORKFLOW_COLORS = {
  manual: 'bg-gray-100 text-gray-800',
  idea: 'bg-yellow-100 text-yellow-800',
  brief_ok: 'bg-blue-100 text-blue-800',
  draft_ia: 'bg-purple-100 text-purple-800',
  review: 'bg-orange-100 text-orange-800',
  published: 'bg-green-100 text-green-800'
}
