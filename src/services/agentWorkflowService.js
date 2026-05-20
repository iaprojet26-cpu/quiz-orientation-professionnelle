/**
 * File Agent IA unifiée — articles, métiers, career paths, opportunities, study programs, career guides
 */
import { supabase } from '../lib/supabase'
import {
  createArticle,
  updateArticleWorkflow,
  publishArticleFromQueue,
  deleteArticle,
  getAllArticlesAdmin,
  createJob,
  updateJob,
  deleteJob,
  getAllJobsAdmin,
  getAllProfiles,
  createCareerPath,
  updateCareerPath,
  deleteCareerPath,
  getAllCareerPathsAdmin,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getAllOpportunitiesAdmin,
  createStudyProgram,
  updateStudyProgram,
  deleteStudyProgram,
  getAllStudyProgramsAdmin,
  createCareerGuide,
  updateCareerGuide,
  deleteCareerGuide,
  getAllCareerGuidesAdmin
} from './adminService'

export const AGENT_CONTENT_TYPES = [
  { id: 'article', label: 'Article blog', icon: '📝' },
  { id: 'job', label: 'Métier', icon: '💼' },
  { id: 'career_path', label: 'Career Path', icon: '🧭' },
  { id: 'opportunity', label: 'Opportunity', icon: '🎯' },
  { id: 'study_program', label: 'Study Program', icon: '🎓' },
  { id: 'career_guide', label: 'Career Guide', icon: '📘' }
]

export const AGENT_RUBRIQUES = {
  article: [
    { id: 'orientation', label: 'Orientation' },
    { id: 'métiers', label: 'Métiers' },
    { id: 'conseils', label: 'Conseils emploi' },
    { id: 'compétences', label: 'Compétences' },
    { id: 'futur', label: 'Futur / tendances' }
  ],
  job: [{ id: 'métiers-maroc', label: 'Métiers au Maroc' }],
  career_path: [{ id: 'parcours', label: 'Parcours professionnels' }],
  opportunity: [{ id: 'emploi', label: 'Emploi / stage' }, { id: 'bourse', label: 'Bourses / appels' }],
  study_program: [{ id: 'formation', label: 'Formations Maroc' }],
  career_guide: [
    { id: 'career-choice', label: 'Choix de carrière' },
    { id: 'cv', label: 'CV' },
    { id: 'interview', label: 'Entretien' },
    { id: 'skills', label: 'Compétences' }
  ]
}

const slugify = (text) =>
  (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const trFr = (translations, field = 'title') => {
  const t = (translations || []).find((x) => x.language === 'fr')
  return t?.[field] || ''
}

const isAgentDraft = (row) =>
  row?.ai_source === 'claude' ||
  (row?.workflow_status && !['manual', 'published'].includes(row.workflow_status))

/** @returns {Promise<Array<{contentType, id, title, slug, workflow_status, brief_json, raw, humanizeText, category}>>} */
export const getAgentQueueAll = async () => {
  if (!supabase) return []

  const items = []

  try {
    const { data: articles } = await supabase
      .from('blog_articles')
      .select('*')
      .eq('published', false)
      .order('updated_at', { ascending: false })

    for (const a of articles || []) {
      if (!isAgentDraft(a)) continue
      items.push({
        contentType: 'article',
        id: a.id,
        title: a.title_fr,
        slug: a.slug,
        workflow_status: a.workflow_status || 'idea',
        brief_json: a.brief_json,
        raw: a,
        humanizeText: a.content_fr,
        category: a.category
      })
    }
  } catch (e) {
    console.warn('Queue articles:', e)
  }

  try {
    const { data: jobs } = await supabase
      .from('jobs')
      .select('*')
      .eq('actif', false)
      .order('updated_at', { ascending: false })

    for (const j of jobs || []) {
      if (!isAgentDraft(j)) continue
      items.push({
        contentType: 'job',
        id: j.id,
        title: j.nom,
        slug: slugify(j.nom),
        workflow_status: j.workflow_status || 'idea',
        brief_json: j.brief_json,
        raw: j,
        humanizeText: j.description,
        category: j.brief_json?.category
      })
    }
  } catch (e) {
    console.warn('Queue jobs:', e)
  }

  try {
    const paths = await getAllCareerPathsAdmin()
    for (const p of paths || []) {
      if (p.active === true && !isAgentDraft(p)) continue
      items.push({
        contentType: 'career_path',
        id: p.id,
        title: trFr(p.career_path_translations),
        slug: p.slug,
        workflow_status: p.workflow_status || 'idea',
        brief_json: p.brief_json,
        raw: p,
        humanizeText: trFr(p.career_path_translations, 'long_description'),
        category: p.level_group
      })
    }
  } catch (e) {
    console.warn('Queue career paths:', e)
  }

  try {
    const opps = await getAllOpportunitiesAdmin()
    for (const o of opps || []) {
      if (o.is_active !== false && !isAgentDraft(o)) continue
      items.push({
        contentType: 'opportunity',
        id: o.id,
        title: trFr(o.opportunity_translations),
        slug: o.id?.slice(0, 8),
        workflow_status: o.workflow_status || 'idea',
        brief_json: o.brief_json,
        raw: o,
        humanizeText: trFr(o.opportunity_translations, 'description'),
        category: o.type
      })
    }
  } catch (e) {
    console.warn('Queue opportunities:', e)
  }

  try {
    const programs = await getAllStudyProgramsAdmin()
    for (const sp of programs || []) {
      if (sp.is_active !== false && !isAgentDraft(sp)) continue
      items.push({
        contentType: 'study_program',
        id: sp.id,
        title: trFr(sp.study_program_translations),
        slug: sp.slug,
        workflow_status: sp.workflow_status || 'idea',
        brief_json: sp.brief_json,
        raw: sp,
        humanizeText: trFr(sp.study_program_translations, 'description'),
        category: sp.degree_level
      })
    }
  } catch (e) {
    console.warn('Queue study programs:', e)
  }

  try {
    const guides = await getAllCareerGuidesAdmin()
    for (const g of guides || []) {
      if (g.is_published !== false && !isAgentDraft(g)) continue
      items.push({
        contentType: 'career_guide',
        id: g.id,
        title: trFr(g.career_guide_translations),
        slug: g.slug,
        workflow_status: g.workflow_status || 'idea',
        brief_json: g.brief_json,
        raw: g,
        humanizeText: trFr(g.career_guide_translations, 'body_markdown'),
        category: g.category
      })
    }
  } catch (e) {
    console.warn('Queue career guides:', e)
  }

  return items.sort((a, b) => {
    const order = { idea: 0, brief_ok: 1, draft_ia: 2, review: 3 }
    return (order[a.workflow_status] ?? 9) - (order[b.workflow_status] ?? 9)
  })
}

export const getExistingTitlesForType = async (contentType) => {
  switch (contentType) {
    case 'article':
      return (await getAllArticlesAdmin()).map((a) => a.title_fr).filter(Boolean)
    case 'job':
      return (await getAllJobsAdmin()).map((j) => j.nom).filter(Boolean)
    case 'career_path':
      return (await getAllCareerPathsAdmin()).map((p) => trFr(p.career_path_translations)).filter(Boolean)
    case 'opportunity':
      return (await getAllOpportunitiesAdmin()).map((o) => trFr(o.opportunity_translations)).filter(Boolean)
    case 'study_program':
      return (await getAllStudyProgramsAdmin()).map((s) => trFr(s.study_program_translations)).filter(Boolean)
    case 'career_guide':
      return (await getAllCareerGuidesAdmin()).map((g) => trFr(g.career_guide_translations)).filter(Boolean)
    default:
      return []
  }
}

const workflowPatch = (topic) => ({
  workflow_status: 'idea',
  ai_source: 'claude',
  brief_json: topic,
  admin_notes: topic.whyNow || ''
})

export const createDraftFromTopic = async (contentType, topic, rubrique) => {
  const base = workflowPatch(topic)

  switch (contentType) {
    case 'article':
      return createArticle({
        title_fr: topic.title,
        description_fr: topic.angle || topic.title,
        content_fr: `## ${topic.title}\n\n*Brouillon — brief à valider puis génération IA.*\n\n${topic.whyNow || ''}`,
        category: topic.category || rubrique,
        keywords_fr: topic.keyword ? [topic.keyword] : [],
        published: false,
        ...base
      })

    case 'job': {
      const profiles = await getAllProfiles()
      const profilId = profiles[0]?.id || null
      return createJob({
        nom: topic.title,
        description: topic.angle || topic.title,
        profil_id: profilId,
        niveau_etudes: 'À préciser',
        competences: [],
        formations: [],
        actif: false,
        ...base
      })
    }

    case 'career_path':
      return createCareerPath({
        slug: slugify(topic.title),
        level_group: rubrique,
        active: false,
        title_fr: topic.title,
        short_description_fr: topic.angle || topic.title,
        long_description_fr: `*Brouillon IA*\n\n${topic.whyNow || ''}`,
        skills_fr: '',
        education_paths_fr: '',
        opportunities_summary_fr: '',
        workflow_status: base.workflow_status,
        ai_source: base.ai_source,
        brief_json: base.brief_json,
        admin_notes: base.admin_notes
      })

    case 'opportunity':
      return createOpportunity({
        type: rubrique === 'bourse' ? 'scholarship' : 'job',
        company_name: 'À préciser',
        city: 'Casablanca',
        country: 'Morocco',
        is_active: false,
        title_fr: topic.title,
        description_fr: topic.angle || topic.title,
        requirements_fr: '',
        application_steps_fr: '',
        workflow_status: base.workflow_status,
        ai_source: base.ai_source,
        brief_json: base.brief_json,
        admin_notes: base.admin_notes
      })

    case 'study_program':
      return createStudyProgram({
        slug: slugify(topic.title),
        institution_name: 'À préciser',
        city: 'Maroc',
        degree_level: 'Licence',
        is_active: false,
        title_fr: topic.title,
        description_fr: topic.angle || topic.title,
        admission_requirements_fr: '',
        outcomes_fr: '',
        workflow_status: base.workflow_status,
        ai_source: base.ai_source,
        brief_json: base.brief_json,
        admin_notes: base.admin_notes
      })

    case 'career_guide':
      return createCareerGuide({
        slug: slugify(topic.title),
        category: ['career-choice', 'cv', 'interview', 'skills', 'international'].includes(rubrique)
          ? rubrique
          : 'skills',
        is_published: false,
        title_fr: topic.title,
        summary_fr: topic.angle || topic.title,
        body_markdown_fr: `## ${topic.title}\n\n*Brouillon IA*\n\n${topic.whyNow || ''}`,
        workflow_status: base.workflow_status,
        ai_source: base.ai_source,
        brief_json: base.brief_json,
        admin_notes: base.admin_notes
      })

    default:
      throw new Error(`Type inconnu: ${contentType}`)
  }
}

export const updateWorkflowItem = async (contentType, id, patch) => {
  if (!supabase) return null

  const tableMap = {
    article: 'blog_articles',
    job: 'jobs',
    career_path: 'career_paths',
    opportunity: 'opportunities',
    study_program: 'study_programs',
    career_guide: 'career_guides'
  }

  const table = tableMap[contentType]
  if (!table) throw new Error(`Type inconnu: ${contentType}`)

  if (contentType === 'article') {
    return updateArticleWorkflow(id, patch)
  }

  const { data, error } = await supabase.from(table).update(patch).eq('id', id).select().single()
  if (error) throw error
  return data
}

/** Applique le brouillon IA selon le type */
export const applyDraftFromAI = async (item, draft) => {
  const { contentType, id, raw } = item

  switch (contentType) {
    case 'article':
      return updateArticleWorkflow(id, {
        workflow_status: 'draft_ia',
        ai_source: 'claude',
        title_fr: draft.title_fr || raw.title_fr,
        description_fr: draft.description_fr || raw.description_fr,
        slug: draft.slug || raw.slug,
        content_fr: draft.content_fr || '',
        keywords_fr: draft.keywords_fr || raw.keywords_fr
      })

    case 'job':
      return updateJob(id, {
        workflow_status: 'draft_ia',
        ai_source: 'claude',
        nom: draft.nom || draft.title_fr || raw.nom,
        description: draft.description || draft.content_fr || '',
        description_en: draft.description_en || '',
        description_ar: draft.description_ar || '',
        niveau_etudes: draft.niveau_etudes || raw.niveau_etudes,
        competences: draft.competences || [],
        formations: draft.formations || [],
        salaire_median: draft.salaire_median || raw.salaire_median,
        actif: false,
        brief_json: draft
      })

    case 'career_path': {
      await updateWorkflowItem('career_path', id, { workflow_status: 'draft_ia', ai_source: 'claude', brief_json: draft })
      const slug = draft.slug || draft.slug_fr || raw.slug
      return updateCareerPath(id, {
        slug,
        active: false,
        title_fr: draft.title_fr || item.title,
        short_description_fr: draft.short_description_fr || draft.description_fr || '',
        long_description_fr: draft.long_description_fr || draft.content_fr || '',
        skills_fr: Array.isArray(draft.skills_fr) ? draft.skills_fr.join(', ') : (draft.skills_fr || ''),
        education_paths_fr: Array.isArray(draft.education_paths_fr) ? draft.education_paths_fr.join(', ') : (draft.education_paths_fr || ''),
        opportunities_summary_fr: draft.opportunities_summary_fr || ''
      })
    }

    case 'opportunity': {
      await updateWorkflowItem('opportunity', id, { workflow_status: 'draft_ia', ai_source: 'claude', brief_json: draft })
      return updateOpportunity(id, {
        type: draft.type || raw.type || 'job',
        company_name: draft.company_name || raw.company_name,
        city: draft.city || raw.city || 'Casablanca',
        is_active: false,
        title_fr: draft.title_fr || item.title,
        description_fr: draft.description_fr || draft.content_fr || '',
        requirements_fr: Array.isArray(draft.requirements_fr) ? draft.requirements_fr.join(', ') : (draft.requirements_fr || ''),
        application_steps_fr: Array.isArray(draft.application_steps_fr) ? draft.application_steps_fr.join(', ') : (draft.application_steps_fr || '')
      })
    }

    case 'study_program': {
      await updateWorkflowItem('study_program', id, { workflow_status: 'draft_ia', ai_source: 'claude', brief_json: draft })
      return updateStudyProgram(id, {
        slug: draft.slug || draft.slug_fr || raw.slug,
        institution_name: draft.institution_name || raw.institution_name || 'Maroc',
        city: draft.city || raw.city,
        degree_level: draft.degree_level || raw.degree_level,
        is_active: false,
        title_fr: draft.title_fr || item.title,
        description_fr: draft.description_fr || draft.content_fr || '',
        admission_requirements_fr: Array.isArray(draft.admission_requirements_fr) ? draft.admission_requirements_fr.join(', ') : (draft.admission_requirements_fr || ''),
        outcomes_fr: Array.isArray(draft.outcomes_fr) ? draft.outcomes_fr.join(', ') : (draft.outcomes_fr || '')
      })
    }

    case 'career_guide': {
      await updateWorkflowItem('career_guide', id, { workflow_status: 'draft_ia', ai_source: 'claude', brief_json: draft })
      return updateCareerGuide(id, {
        slug: draft.slug || draft.slug_fr || raw.slug,
        category: draft.category || raw.category || 'skills',
        is_published: false,
        title_fr: draft.title_fr || item.title,
        summary_fr: draft.summary_fr || draft.description_fr || '',
        body_markdown_fr: draft.body_markdown_fr || draft.content_fr || ''
      })
    }

    default:
      throw new Error(`Type inconnu: ${contentType}`)
  }
}

export const applyHumanize = async (item, content) => {
  const { contentType, id } = item

  switch (contentType) {
    case 'article':
      return updateArticleWorkflow(id, { workflow_status: 'review', content_fr: content })
    case 'job':
      return updateJob(id, { workflow_status: 'review', description: content, actif: false })
    case 'career_path':
      await updateWorkflowItem('career_path', id, { workflow_status: 'review', ai_source: 'claude' })
      return updateCareerPath(id, {
        active: false,
        long_description_fr: content,
        title_fr: item.title,
        short_description_fr: trFr(item.raw.career_path_translations, 'short_description') || item.title
      })
    case 'opportunity':
      await updateWorkflowItem('opportunity', id, { workflow_status: 'review', ai_source: 'claude' })
      return updateOpportunity(id, {
        is_active: false,
        description_fr: content,
        title_fr: item.title
      })
    case 'study_program':
      await updateWorkflowItem('study_program', id, { workflow_status: 'review', ai_source: 'claude' })
      return updateStudyProgram(id, {
        is_active: false,
        description_fr: content,
        title_fr: item.title,
        slug: item.slug
      })
    case 'career_guide':
      await updateWorkflowItem('career_guide', id, { workflow_status: 'review', ai_source: 'claude' })
      return updateCareerGuide(id, {
        is_published: false,
        body_markdown_fr: content,
        title_fr: item.title,
        slug: item.slug,
        summary_fr: trFr(item.raw.career_guide_translations, 'summary') || item.title
      })
    default:
      throw new Error(`Type inconnu: ${contentType}`)
  }
}

export const publishWorkflowItem = async (item) => {
  const { contentType, id } = item

  switch (contentType) {
    case 'article':
      return publishArticleFromQueue(id)
    case 'job':
      return updateJob(id, { actif: true, workflow_status: 'published', ai_source: 'claude' })
    case 'career_path':
      await updateWorkflowItem('career_path', id, { workflow_status: 'published', active: true })
      return updateCareerPath(id, {
        active: true,
        slug: item.slug,
        title_fr: item.title,
        short_description_fr: trFr(item.raw.career_path_translations, 'short_description') || item.title,
        long_description_fr: trFr(item.raw.career_path_translations, 'long_description') || ''
      })
    case 'opportunity':
      await updateWorkflowItem('opportunity', id, { workflow_status: 'published', is_active: true })
      return updateOpportunity(id, { is_active: true, title_fr: item.title, description_fr: trFr(item.raw.opportunity_translations, 'description') })
    case 'study_program':
      await updateWorkflowItem('study_program', id, { workflow_status: 'published', is_active: true })
      return updateStudyProgram(id, { is_active: true, slug: item.slug, title_fr: item.title, description_fr: trFr(item.raw.study_program_translations, 'description') })
    case 'career_guide':
      await updateWorkflowItem('career_guide', id, { workflow_status: 'published' })
      return updateCareerGuide(id, {
        is_published: true,
        slug: item.slug,
        title_fr: item.title,
        summary_fr: trFr(item.raw.career_guide_translations, 'summary'),
        body_markdown_fr: trFr(item.raw.career_guide_translations, 'body_markdown')
      })
    default:
      throw new Error(`Type inconnu: ${contentType}`)
  }
}

export const deleteWorkflowItem = async (contentType, id) => {
  switch (contentType) {
    case 'article':
      return deleteArticle(id)
    case 'job':
      return deleteJob(id)
    case 'career_path':
      return deleteCareerPath(id)
    case 'opportunity':
      return deleteOpportunity(id)
    case 'study_program':
      return deleteStudyProgram(id)
    case 'career_guide':
      return deleteCareerGuide(id)
    default:
      throw new Error(`Type inconnu: ${contentType}`)
  }
}

export const getTypeLabel = (contentType) =>
  AGENT_CONTENT_TYPES.find((t) => t.id === contentType)?.label || contentType
