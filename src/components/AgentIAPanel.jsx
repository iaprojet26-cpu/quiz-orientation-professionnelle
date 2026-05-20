import { useState, useEffect, useCallback } from 'react'
import {
  suggestTopics,
  generateBrief,
  generateArticleDraft,
  humanizeContent,
  pingAIAgent,
  setAdminPasswordForAI,
  WORKFLOW_LABELS,
  WORKFLOW_COLORS
} from '../services/aiAgentService'
import {
  updateArticleWorkflow
} from '../services/adminService'
import {
  AGENT_CONTENT_TYPES,
  AGENT_RUBRIQUES,
  getAgentQueueAll,
  getExistingTitlesForType,
  createDraftFromTopic,
  updateWorkflowItem,
  applyDraftFromAI,
  applyHumanize,
  publishWorkflowItem,
  deleteWorkflowItem,
  getTypeLabel
} from '../services/agentWorkflowService'

function AgentIAPanel({ onEditItem }) {
  const [adminPw, setAdminPw] = useState('')
  const [apiOk, setApiOk] = useState(null)
  const [contentType, setContentType] = useState('article')
  const [rubrique, setRubrique] = useState('orientation')
  const [topics, setTopics] = useState([])
  const [queue, setQueue] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const rubriques = AGENT_RUBRIQUES[contentType] || AGENT_RUBRIQUES.article

  useEffect(() => {
    const first = rubriques[0]?.id
    if (first) setRubrique(first)
  }, [contentType, rubriques])

  const loadQueue = useCallback(async () => {
    const data = await getAgentQueueAll()
    setQueue(data)
  }, [])

  useEffect(() => {
    loadQueue()
  }, [loadQueue])

  const handleSavePassword = () => {
    setAdminPasswordForAI(adminPw)
    setMessage('Mot de passe enregistré pour cette session.')
  }

  const handleTestApi = async () => {
    setError('')
    setLoading(true)
    try {
      handleSavePassword()
      await pingAIAgent()
      setApiOk(true)
      setMessage('API Claude connectée.')
    } catch (e) {
      setApiOk(false)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestTopics = async () => {
    setError('')
    setLoading(true)
    try {
      handleSavePassword()
      const titles = await getExistingTitlesForType(contentType)
      const { topics: list } = await suggestTopics(rubrique, titles, 5, contentType)
      setTopics(list)
      setMessage(`${list.length} idées pour « ${getTypeLabel(contentType)} » — ajoutez à la file.`)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const addTopicToQueue = async (topic) => {
    setError('')
    try {
      await createDraftFromTopic(contentType, topic, rubrique)
      setTopics((prev) => prev.filter((t) => t.title !== topic.title))
      await loadQueue()
      setMessage(`« ${topic.title} » ajouté (${getTypeLabel(contentType)}).`)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleValidateBrief = async (item) => {
    setLoading(true)
    setError('')
    try {
      handleSavePassword()
      const brief = item.brief_json || {}
      const category = item.category || item.raw?.category || rubrique
      const { brief: generated } = await generateBrief(
        item.title,
        category,
        brief.angle || item.raw?.description_fr || item.raw?.description || '',
        item.contentType
      )
      const patch = { workflow_status: 'brief_ok', brief_json: generated }
      if (item.contentType === 'article') {
        await updateArticleWorkflow(item.id, {
          ...patch,
          description_fr: generated.description_fr || item.raw?.description_fr,
          slug: generated.slug_fr || generated.slug || item.slug
        })
      } else {
        await updateWorkflowItem(item.contentType, item.id, patch)
      }
      await loadQueue()
      setMessage('Brief validé.')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateDraft = async (item) => {
    setLoading(true)
    setError('')
    try {
      handleSavePassword()
      const category = item.category || item.raw?.category || rubrique
      const { article: draft } = await generateArticleDraft(
        item.title,
        category,
        item.brief_json,
        item.contentType
      )
      await applyDraftFromAI(item, draft)
      await loadQueue()
      setMessage(`Brouillon IA généré — ouvrez l’éditeur (${getTypeLabel(item.contentType)}).`)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleHumanize = async (item) => {
    const text = item.humanizeText
    if (!text?.trim() || text.length < 80) {
      setError('Pas assez de contenu à humaniser.')
      return
    }
    setLoading(true)
    setError('')
    try {
      handleSavePassword()
      const { content_fr } = await humanizeContent(
        text,
        `Ton QuizOrientation, ${getTypeLabel(item.contentType)}, exemples Maroc.`
      )
      await applyHumanize(item, content_fr)
      await loadQueue()
      setMessage('Contenu humanisé — prêt relecture.')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async (item) => {
    if (!window.confirm(`Publier « ${item.title} » (${getTypeLabel(item.contentType)}) ?`)) return
    try {
      await publishWorkflowItem(item)
      await loadQueue()
      setMessage('Publication validée.')
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm('Supprimer cet élément de la file ?')) return
    await deleteWorkflowItem(item.contentType, item.id)
    await loadQueue()
  }

  const wf = (item) => item.workflow_status || 'manual'
  const typeInfo = AGENT_CONTENT_TYPES.find((t) => t.id === contentType)

  return (
    <div className="space-y-8">
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-indigo-900 mb-2">🤖 Agent IA — Toutes les publications</h2>
        <p className="text-sm text-indigo-800 mb-4">
          Articles, métiers, career paths, opportunities, study programs et career guides.
          <strong> Aucune publication sans validation.</strong> Cadence : 3–4 contenus validés / semaine.
        </p>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Mot de passe admin</label>
            <input
              type="password"
              value={adminPw}
              onChange={(e) => setAdminPw(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
              placeholder="Même mot de passe que la connexion"
            />
          </div>
          <button type="button" onClick={handleTestApi} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50">
            Tester API
          </button>
          {apiOk === true && <span className="text-green-700 text-sm">✓ API OK</span>}
          {apiOk === false && <span className="text-red-700 text-sm">✗ API KO</span>}
        </div>
      </div>

      {message && <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">{message}</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">{error}</div>}

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-900 mb-4">1. Type de publication & idées</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {AGENT_CONTENT_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setContentType(t.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border ${
                contentType === t.id
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <select value={rubrique} onChange={(e) => setRubrique(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            {rubriques.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
          <button type="button" onClick={handleSuggestTopics} disabled={loading} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 disabled:opacity-50">
            {loading ? '…' : `Proposer 5 idées (${typeInfo?.label})`}
          </button>
        </div>
        {topics.length > 0 && (
          <ul className="space-y-3">
            {topics.map((t, i) => (
              <li key={i} className="border rounded-lg p-4 flex justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">{t.title}</p>
                  <p className="text-xs text-gray-500">{t.category} · {t.keyword}</p>
                  <p className="text-sm text-gray-600 mt-1">{t.whyNow}</p>
                </div>
                <button type="button" onClick={() => addTopicToQueue(t)} className="shrink-0 px-3 py-1 bg-green-600 text-white rounded text-sm">
                  + File
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h3 className="font-semibold text-gray-900 p-6 border-b">2. File de validation — tous types ({queue.length})</h3>
        {queue.length === 0 ? (
          <p className="p-6 text-gray-500 text-sm">Aucun brouillon IA en file. Choisissez un type et proposez des idées.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Workflow</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {queue.map((item) => {
                  const typeDef = AGENT_CONTENT_TYPES.find((t) => t.id === item.contentType)
                  return (
                    <tr key={`${item.contentType}-${item.id}`} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-xs font-medium text-gray-600">{typeDef?.icon} {typeDef?.label}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.slug}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${WORKFLOW_COLORS[wf(item)] || WORKFLOW_COLORS.manual}`}>
                          {WORKFLOW_LABELS[wf(item)] || wf(item)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        {wf(item) === 'idea' && (
                          <button type="button" onClick={() => handleValidateBrief(item)} className="text-blue-600 mr-2">Brief IA</button>
                        )}
                        {(wf(item) === 'brief_ok' || wf(item) === 'idea') && (
                          <button type="button" onClick={() => handleGenerateDraft(item)} className="text-purple-600 mr-2">Rédiger IA</button>
                        )}
                        {item.humanizeText?.length > 80 && (
                          <button type="button" onClick={() => handleHumanize(item)} className="text-orange-600 mr-2">Humaniser</button>
                        )}
                        <button type="button" onClick={() => onEditItem(item)} className="text-primary-600 mr-2">✏️</button>
                        <button type="button" onClick={() => handlePublish(item)} className="text-green-700 mr-2 font-semibold">Publier</button>
                        <button type="button" onClick={() => handleDelete(item)} className="text-red-600">🗑️</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-900">
        <p className="font-semibold mb-2">Configuration</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Vercel : <code>ANTHROPIC_API_KEY</code>, <code>ADMIN_PASSWORD</code></li>
          <li>Supabase : exécuter <code>database/ai_agent_workflow.sql</code> (toutes les tables)</li>
        </ul>
      </div>
    </div>
  )
}

export default AgentIAPanel
