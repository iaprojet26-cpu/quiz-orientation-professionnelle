import { supabase } from '../lib/supabase'

const normalizeLang = (lang) => {
  let language = lang || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  return language
}

export const getCareerPaths = async (lang = 'fr') => {
  if (!supabase) return []
  const language = normalizeLang(lang)
  try {
    const { data, error } = await supabase
      .from('career_paths')
      .select(`
        id,
        slug,
        level_group,
        salary_min_monthly,
        salary_max_monthly,
        active,
        career_path_translations (
          language,
          title,
          short_description,
          skills,
          education_paths
        )
      `)
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map((item) => {
      const tr = (item.career_path_translations || []).find((row) => row.language === language)
      return {
        id: item.id,
        slug: item.slug,
        levelGroup: item.level_group,
        salaryMin: item.salary_min_monthly,
        salaryMax: item.salary_max_monthly,
        title: tr?.title || item.slug,
        description: tr?.short_description || '',
        skills: tr?.skills || [],
        educationPaths: tr?.education_paths || []
      }
    })
  } catch (error) {
    console.error('Erreur getCareerPaths:', error)
    return []
  }
}

export const getOpportunities = async (lang = 'fr') => {
  if (!supabase) return []
  const language = normalizeLang(lang)
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select(`
        id,
        type,
        company_name,
        city,
        country,
        application_deadline,
        is_remote,
        is_active,
        opportunity_translations (
          language,
          title,
          description,
          requirements
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map((item) => {
      const tr = (item.opportunity_translations || []).find((row) => row.language === language)
      return {
        id: item.id,
        type: item.type,
        companyName: item.company_name,
        city: item.city,
        country: item.country,
        deadline: item.application_deadline,
        isRemote: item.is_remote,
        title: tr?.title || item.type,
        description: tr?.description || '',
        requirements: tr?.requirements || []
      }
    })
  } catch (error) {
    console.error('Erreur getOpportunities:', error)
    return []
  }
}

export const getStudyPrograms = async (lang = 'fr') => {
  if (!supabase) return []
  const language = normalizeLang(lang)
  try {
    const { data, error } = await supabase
      .from('study_programs')
      .select(`
        id,
        slug,
        institution_name,
        city,
        degree_level,
        duration_months,
        is_active,
        study_program_translations (
          language,
          title,
          description,
          admission_requirements
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map((item) => {
      const tr = (item.study_program_translations || []).find((row) => row.language === language)
      return {
        id: item.id,
        slug: item.slug,
        institutionName: item.institution_name,
        city: item.city,
        degreeLevel: item.degree_level,
        durationMonths: item.duration_months,
        title: tr?.title || item.slug,
        description: tr?.description || '',
        admissionRequirements: tr?.admission_requirements || []
      }
    })
  } catch (error) {
    console.error('Erreur getStudyPrograms:', error)
    return []
  }
}

export const getCareerGuides = async (lang = 'fr') => {
  if (!supabase) return []
  const language = normalizeLang(lang)
  try {
    const { data, error } = await supabase
      .from('career_guides')
      .select(`
        id,
        slug,
        category,
        reading_minutes,
        is_published,
        published_at,
        career_guide_translations (
          language,
          title,
          summary
        )
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false, nullsFirst: false })

    if (error) throw error
    return (data || []).map((item) => {
      const tr = (item.career_guide_translations || []).find((row) => row.language === language)
      return {
        id: item.id,
        slug: item.slug,
        category: item.category,
        readingMinutes: item.reading_minutes,
        title: tr?.title || item.slug,
        summary: tr?.summary || ''
      }
    })
  } catch (error) {
    console.error('Erreur getCareerGuides:', error)
    return []
  }
}

export const getCareerMatchingContent = async ({ profileId = '', profileName = '', lang = 'fr' }) => {
  if (!supabase) {
    return { careerPaths: [], opportunities: [], studyPrograms: [], careerGuides: [] }
  }

  const language = normalizeLang(lang)
  const normalizedNameSlug = (profileName || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  try {
    const candidates = [profileId, normalizedNameSlug].filter(Boolean)
    if (candidates.length === 0) {
      return { careerPaths: [], opportunities: [], studyPrograms: [], careerGuides: [] }
    }

    const { data: matches, error } = await supabase
      .from('profile_content_matches')
      .select('career_path_id, opportunity_id, study_program_id, career_guide_id, score_weight')
      .in('profile_slug', candidates)
      .order('score_weight', { ascending: false })

    if (error) throw error

    const careerPathIds = [...new Set((matches || []).map((m) => m.career_path_id).filter(Boolean))]
    const opportunityIds = [...new Set((matches || []).map((m) => m.opportunity_id).filter(Boolean))]
    const studyProgramIds = [...new Set((matches || []).map((m) => m.study_program_id).filter(Boolean))]
    const careerGuideIds = [...new Set((matches || []).map((m) => m.career_guide_id).filter(Boolean))]

    const [careerPaths, opportunities, studyPrograms, careerGuides] = await Promise.all([
      careerPathIds.length ? getCareerPaths(language) : Promise.resolve([]),
      opportunityIds.length ? getOpportunities(language) : Promise.resolve([]),
      studyProgramIds.length ? getStudyPrograms(language) : Promise.resolve([]),
      careerGuideIds.length ? getCareerGuides(language) : Promise.resolve([])
    ])

    return {
      careerPaths: careerPaths.filter((i) => careerPathIds.includes(i.id)),
      opportunities: opportunities.filter((i) => opportunityIds.includes(i.id)),
      studyPrograms: studyPrograms.filter((i) => studyProgramIds.includes(i.id)),
      careerGuides: careerGuides.filter((i) => careerGuideIds.includes(i.id))
    }
  } catch (fetchError) {
    console.error('Erreur getCareerMatchingContent:', fetchError)
    return { careerPaths: [], opportunities: [], studyPrograms: [], careerGuides: [] }
  }
}
