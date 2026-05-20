/**
 * API Vercel — Agent IA rédaction
 * Providers: gemini (recommandé gratuit) | anthropic (Claude)
 * Variables: GEMINI_API_KEY + AI_PROVIDER=gemini  OU  ANTHROPIC_API_KEY
 */

const SITE_CONTEXT = `QuizOrientation (quizorientation.online) — orientation professionnelle au Maroc.
Public: lycéens, étudiants, jeunes diplômés, reconversion.
Ton: pédagogique, concret, pas de promesses irréalistes. Mentionner le contexte marocain (OFPPT, villes, marché emploi).
Liens internes à suggérer: /, /blog, /quiz, /cv, /study-in-morocco, /opportunities, /career-guides, /free-tools.
Pas de "Contenu à compléter". Pas de liens France Compétences sauf si pertinent.`

const CONTENT_META = {
  article: {
    label: 'article de blog SEO',
    suggestHint: 'articles orientation / métiers / conseils emploi',
    briefSchema: '{"title_fr":"...","description_fr":"...","slug_fr":"...","category":"...","keywords_fr":["..."],"h2":["..."],"internalLinks":["/blog/..."],"faqQuestions":["..."]}',
    draftSchema: '{"title_fr":"...","description_fr":"...","slug":"...","category":"...","keywords_fr":["..."],"content_fr":"markdown corps sans front matter"}'
  },
  job: {
    label: 'fiche métier QuizOrientation',
    suggestHint: 'métiers porteurs au Maroc, salaires réalistes, formations OFPPT/université',
    briefSchema: '{"nom":"...","niveau_etudes":"Bac+X","angle":"...","competences":["..."],"formations":["..."],"keyword":"..."}',
    draftSchema: '{"nom":"...","description":"markdown 500-800 mots FR","niveau_etudes":"...","competences":["..."],"formations":["..."],"salaire_median":"fourchette MAD"}'
  },
  career_path: {
    label: 'career path (parcours professionnel)',
    suggestHint: 'parcours par niveau (Bac, Bac+2, Bac+5), salaires min/max Maroc',
    briefSchema: '{"title_fr":"...","slug_fr":"...","level_group":"...","short_description_fr":"...","skills":["..."],"education_paths":["..."]}',
    draftSchema: '{"title_fr":"...","slug":"...","short_description_fr":"...","long_description_fr":"markdown","skills_fr":["..."],"education_paths_fr":["..."],"opportunities_summary_fr":"..."}'
  },
  opportunity: {
    label: 'opportunité (emploi, stage, bourse ou appel)',
    suggestHint: 'offres types au Maroc, deadlines, étapes candidature',
    briefSchema: '{"title_fr":"...","type":"job|internship|scholarship|call","company_name":"...","city":"...","requirements":["..."]}',
    draftSchema: '{"title_fr":"...","type":"job","description_fr":"markdown","requirements_fr":["..."],"application_steps_fr":["..."],"company_name":"...","city":"..."}'
  },
  study_program: {
    label: 'programme d\'études au Maroc',
    suggestHint: 'formations universitaires/OFPPT, admission, débouchés',
    briefSchema: '{"title_fr":"...","slug_fr":"...","institution_name":"...","degree_level":"...","city":"..."}',
    draftSchema: '{"title_fr":"...","slug":"...","institution_name":"...","degree_level":"...","city":"...","description_fr":"markdown","admission_requirements_fr":["..."],"outcomes_fr":["..."]}'
  },
  career_guide: {
    label: 'guide carrière (CV, entretien, choix métier)',
    suggestHint: 'guides pratiques jeunes Marocains',
    briefSchema: '{"title_fr":"...","slug_fr":"...","category":"career-choice|cv|interview|skills","summary_fr":"...","h2":["..."]}',
    draftSchema: '{"title_fr":"...","slug":"...","category":"skills","summary_fr":"...","body_markdown_fr":"markdown avec ## sections"}'
  }
}

function resolveProvider() {
  const forced = (process.env.AI_PROVIDER || 'gemini').trim().toLowerCase()
  const hasGemini = !!(process.env.GEMINI_API_KEY || '').trim()
  const hasAnthropic = !!(process.env.ANTHROPIC_API_KEY || '').trim()

  // Par défaut : Gemini uniquement (évite Claude sans crédits)
  if (forced !== 'anthropic') {
    if (hasGemini) return { id: 'gemini', apiKey: process.env.GEMINI_API_KEY.trim() }
    return null
  }

  if (hasAnthropic) return { id: 'anthropic', apiKey: process.env.ANTHROPIC_API_KEY.trim() }
  if (hasGemini) return { id: 'gemini', apiKey: process.env.GEMINI_API_KEY.trim() }
  return null
}

function getModelName(providerId) {
  if (providerId === 'gemini') {
    return process.env.GEMINI_MODEL || 'gemini-1.5-flash'
  }
  return process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514'
}

function extractErrorMessage(errText) {
  try {
    const parsed = JSON.parse(errText)
    return (
      parsed?.error?.message ||
      parsed?.message ||
      (Array.isArray(parsed?.error?.details) ? parsed.error.details[0]?.message : '') ||
      ''
    )
  } catch {
    return errText.slice(0, 300)
  }
}

function parseApiError(status, errText, providerId) {
  const msg = extractErrorMessage(errText)
  const raw = msg || errText.slice(0, 300)

  if (providerId === 'Claude') {
    if (/credit balance|purchase credits/i.test(raw)) {
      return 'Crédits Anthropic épuisés. Utilisez GEMINI_API_KEY sur Vercel (AI_PROVIDER=gemini).'
    }
    return raw || `Erreur Claude API (${status})`
  }

  // Erreurs Gemini (ne plus afficher le message Anthropic par erreur)
  if (/API key not valid|API_KEY_INVALID|PERMISSION_DENIED/i.test(raw + errText)) {
    return 'Clé Gemini invalide : recréez une clé sur aistudio.google.com/apikey et mettez à jour GEMINI_API_KEY sur Vercel, puis Redeploy.'
  }
  if (/quota|rate limit|RESOURCE_EXHAUSTED|429/i.test(raw + errText)) {
    return 'Quota Gemini gratuit atteint (limite par minute ou par jour). Attendez 5–15 min, faites une seule action à la fois, ou consultez aistudio.google.com → usage.'
  }
  if (/billing|enable.*api/i.test(raw + errText)) {
    return 'API Gemini : vérifiez que la clé AI Studio est active (aistudio.google.com/apikey). Si besoin, créez une nouvelle clé gratuite.'
  }
  if (/not found|NOT_FOUND|model/i.test(raw + errText)) {
    return `Modèle Gemini indisponible. Ajoutez sur Vercel : GEMINI_MODEL=gemini-1.5-flash puis Redeploy. Détail : ${raw}`
  }
  return raw || `Erreur Gemini API (${status})`
}

async function callGeminiOnce(apiKey, model, system, user, maxTokens) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: user }] }],
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: 0.7
      }
    })
  })
  return res
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function callGemini(apiKey, system, user, maxTokens = 4096) {
  const primary = getModelName('gemini')
  const fallbacks = [primary, 'gemini-1.5-flash', 'gemini-2.0-flash'].filter(
    (m, i, arr) => arr.indexOf(m) === i
  )

  let lastError = 'Erreur Gemini inconnue'
  for (const model of fallbacks) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const res = await callGeminiOnce(apiKey, model, system, user, maxTokens)
      if (res.ok) {
        const data = await res.json()
        const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || ''
        if (!text.trim()) {
          lastError = 'Réponse Gemini vide. Réessayez.'
          break
        }
        return text.trim()
      }
      const errText = await res.text()
      lastError = parseApiError(res.status, errText, 'Gemini')
      const isRateLimit = res.status === 429 || /quota|rate limit|RESOURCE_EXHAUSTED/i.test(errText + lastError)
      if (isRateLimit && attempt < 2) {
        await sleep(4000 * (attempt + 1))
        continue
      }
      if (!/not found|NOT_FOUND|404/i.test(errText + lastError)) {
        throw new Error(lastError)
      }
      break
    }
  }
  throw new Error(lastError)
}

async function callClaude(apiKey, system, user, maxTokens = 4096) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: getModelName('anthropic'),
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }]
    })
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(parseApiError(res.status, errText, 'Claude'))
  }

  const data = await res.json()
  const text = data.content?.find((b) => b.type === 'text')?.text || ''
  return text.trim()
}

async function callLLM(provider, system, user, maxTokens) {
  if (provider.id === 'gemini') return callGemini(provider.apiKey, system, user, maxTokens)
  return callClaude(provider.apiKey, system, user, maxTokens)
}

function checkAuth(body) {
  const configured = (process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || '').trim()
  const provided = (body?.adminPassword || '').trim()
  if (!configured || provided !== configured) {
    return false
  }
  return true
}

function parseJsonFromText(text) {
  const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/)
  if (!match) throw new Error('Réponse IA sans JSON valide')
  return JSON.parse(match[0])
}

function getMeta(contentType) {
  return CONTENT_META[contentType] || CONTENT_META.article
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const provider = resolveProvider()
  if (!provider) {
    const hasAnthropicOnly =
      !!(process.env.ANTHROPIC_API_KEY || '').trim() && !(process.env.GEMINI_API_KEY || '').trim()
    return res.status(503).json({
      error: hasAnthropicOnly
        ? 'GEMINI_API_KEY manquante sur Vercel. Ajoutez votre clé Google AI Studio (GEMINI_API_KEY) + AI_PROVIDER=gemini, puis Redeploy. Vous pouvez supprimer ANTHROPIC_API_KEY.'
        : 'GEMINI_API_KEY manquante. Vercel → Settings → Environment Variables → GEMINI_API_KEY + AI_PROVIDER=gemini → Redeploy.'
    })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'JSON invalide' })
    }
  }

  if (!checkAuth(body)) {
    return res.status(401).json({ error: 'Non autorisé' })
  }

  const { action } = body
  const contentType = body.contentType || 'article'
  const meta = getMeta(contentType)

  try {
    if (action === 'ping') {
      const hasGemini = !!(process.env.GEMINI_API_KEY || '').trim()
      const hasAnthropic = !!(process.env.ANTHROPIC_API_KEY || '').trim()
      const hasAdmin = !!((process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || '').trim())
      const active = resolveProvider()
      return res.status(200).json({
        ok: !!active && hasAdmin,
        provider: active?.id || null,
        llmConfigured: !!active,
        geminiConfigured: hasGemini,
        anthropicConfigured: hasAnthropic,
        adminPasswordConfigured: hasAdmin,
        model: active ? getModelName(active.id) : null
      })
    }

    if (action === 'suggest_topics') {
      const count = Math.min(Number(body.count) || 5, 8)
      const rubrique = body.rubrique || 'orientation'
      const user = `Propose ${count} idées de contenu pour un ${meta.label} (rubrique: "${rubrique}").
Contexte: ${meta.suggestHint}.
Évite les doublons avec: ${(body.existingTitles || []).slice(0, 15).join(' | ') || 'aucun'}.
Réponds UNIQUEMENT en JSON array:
[{"title":"...","category":"...","angle":"...","keyword":"...","whyNow":"..."}]`

      const text = await callLLM(provider, SITE_CONTEXT, user, 2048)
      const topics = parseJsonFromText(text)
      return res.status(200).json({ topics, provider: provider.id })
    }

    if (action === 'generate_brief') {
      const { title, category, angle } = body
      const user = `Crée un brief éditorial JSON pour ce ${meta.label}:
Titre: ${title}
Catégorie / rubrique: ${category}
Angle: ${angle || 'Maroc 2025'}
Format JSON:
${meta.briefSchema}`

      const text = await callLLM(provider, SITE_CONTEXT, user, 2048)
      const brief = parseJsonFromText(text)
      return res.status(200).json({ brief, provider: provider.id })
    }

    if (action === 'generate_article') {
      const { title, category, brief } = body
      const briefStr = brief ? JSON.stringify(brief, null, 2) : ''
      const user = `Rédige le contenu complet en français pour ce ${meta.label}.
Titre: ${title}
Catégorie: ${category}
Brief: ${briefStr}

${contentType === 'article' ? 'Structure article blog: markdown ## H2, ## FAQ, conclusion avec liens relatifs. 800-1100 mots.' : 'Contenu structuré markdown, concret Maroc.'}
Réponds en JSON:
${meta.draftSchema}`

      const text = await callLLM(provider, SITE_CONTEXT, user, 8192)
      const article = parseJsonFromText(text)
      return res.status(200).json({ article, provider: provider.id })
    }

    if (action === 'humanize') {
      const { content_fr, instructions } = body
      const user = `Réécris ce texte pour le rendre plus naturel, précis et adapté au Maroc. Garde le markdown et la structure.
Instructions: ${instructions || 'Fluidité, exemples concrets, pas de remplissage.'}

Texte:
${content_fr}

Réponds UNIQUEMENT avec le markdown du corps (pas de front matter).`

      const text = await callLLM(provider, SITE_CONTEXT, user, 8192)
      return res.status(200).json({ content_fr: text, provider: provider.id })
    }

    return res.status(400).json({ error: 'Action inconnue' })
  } catch (e) {
    console.error('ai-agent error:', provider?.id, e)
    return res.status(500).json({
      error: e.message || 'Erreur serveur',
      provider: provider?.id || null
    })
  }
}
