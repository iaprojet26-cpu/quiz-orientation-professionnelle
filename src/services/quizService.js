import { supabase } from '../lib/supabase'
import { mockQuestions, mockProfiles, mockJobs } from '../data/mockData'
import i18n from '../i18n/config'

// Test de connexion Supabase
export const testSupabaseConnection = async () => {
  if (!supabase) return false
  
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('id')
      .limit(1)
    
    return !error && data !== null
  } catch (err) {
    console.error('Erreur de connexion Supabase:', err)
    return false
  }
}

// Fonction helper pour obtenir le texte traduit
const getTranslatedText = (item, field, language) => {
  // Si la langue est française, retourner directement le champ français
  if (language === 'fr') {
    return item[field]
  }
  
  // Pour les autres langues, chercher la colonne traduite
  const translatedField = `${field}_${language}`
  
  // Si la colonne de traduction existe et n'est pas vide, l'utiliser
  if (item[translatedField] && item[translatedField].trim() !== '') {
    return item[translatedField]
  }
  
  // Sinon, fallback sur le texte français
  return item[field]
}

// Charger les questions depuis Supabase avec support multilingue
export const loadQuestionsFromSupabase = async () => {
  if (!supabase) {
    console.log('Supabase non disponible, utilisation des données mock')
    return null
  }

  try {
    // Obtenir la langue actuelle (normaliser pour gérer les variantes comme 'en-US' -> 'en')
    let currentLanguage = i18n.language || 'fr'
    // Normaliser la langue (enlever les variantes comme -US, -GB, etc.)
    if (currentLanguage.includes('-')) {
      currentLanguage = currentLanguage.split('-')[0]
    }
    // S'assurer que c'est une langue supportée
    if (!['fr', 'en', 'ar'].includes(currentLanguage)) {
      currentLanguage = 'fr'
    }
    
    console.log('🌍 Chargement des questions en langue:', currentLanguage)

    // Charger les questions actives avec leurs traductions si disponibles
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select(`id, texte, texte_en, texte_ar, categorie, ordre`)
      .eq('actif', true)
      .order('ordre', { ascending: true })

    if (questionsError) {
      console.error('Erreur lors du chargement des questions:', questionsError)
      throw questionsError
    }

    console.log('✅ Questions chargées:', questions.length)

    // Pour chaque question, charger les options avec traductions
    const questionsWithOptions = await Promise.all(
      questions.map(async (question) => {
        const { data: options, error: optionsError } = await supabase
          .from('options')
          .select(`id, texte, texte_en, texte_ar, score, ordre`)
          .eq('question_id', question.id)
          .order('ordre', { ascending: true })

        if (optionsError) {
          console.error('Erreur lors du chargement des options:', optionsError)
          throw optionsError
        }

        const translatedQuestionText = getTranslatedText(question, 'texte', currentLanguage)
        console.log(`📝 Question traduite: "${question.texte}" → "${translatedQuestionText}"`)

        return {
          id: question.id,
          // Utiliser la traduction si disponible, sinon le texte français
          texte: translatedQuestionText,
          categorie: question.categorie,
          options: options.map(opt => {
            const translatedOptionText = getTranslatedText(opt, 'texte', currentLanguage)
            return {
              id: opt.id,
              // Utiliser la traduction si disponible, sinon le texte français
              texte: translatedOptionText,
              score: opt.score,
            }
          })
        }
      })
    )

    // Sélectionner 10-12 questions aléatoirement
    const selectedQuestions = questionsWithOptions
      .sort(() => Math.random() - 0.5)
      .slice(0, 12)

    return selectedQuestions
  } catch (error) {
    console.error('Erreur lors du chargement des questions:', error)
    return null
  }
}

// Charger les profils depuis Supabase avec support multilingue
export const loadProfilesFromSupabase = async () => {
  if (!supabase) {
    return mockProfiles
  }

  try {
    // Obtenir la langue actuelle (normaliser)
    let currentLanguage = i18n.language || 'fr'
    if (currentLanguage.includes('-')) {
      currentLanguage = currentLanguage.split('-')[0]
    }
    if (!['fr', 'en', 'ar'].includes(currentLanguage)) {
      currentLanguage = 'fr'
    }

    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('nom', { ascending: true })

    if (error) throw error

    return profiles.map(profile => ({
      id: profile.id,
      // Utiliser la traduction si disponible, sinon le texte français
      nom: getTranslatedText(profile, 'nom', currentLanguage),
      description: getTranslatedText(profile, 'description', currentLanguage),
      criteres: profile.criteres,
      couleur: profile.couleur,
      icone: profile.icone,
    }))
  } catch (error) {
    console.error('Erreur lors du chargement des profils:', error)
    return mockProfiles
  }
}

// Charger les métiers pour un profil depuis Supabase avec support multilingue
export const loadJobsFromSupabase = async (profileId) => {
  if (!supabase) {
    return mockJobs[profileId] || []
  }

  try {
    // Obtenir la langue actuelle (normaliser)
    let currentLanguage = i18n.language || 'fr'
    if (currentLanguage.includes('-')) {
      currentLanguage = currentLanguage.split('-')[0]
    }
    if (!['fr', 'en', 'ar'].includes(currentLanguage)) {
      currentLanguage = 'fr'
    }

    console.log('🔍 Chargement des métiers pour le profil:', profileId, 'en langue:', currentLanguage)
    
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('profil_id', profileId)
      .eq('actif', true)
    
    console.log('📊 Métiers chargés depuis Supabase:', jobs?.length || 0)

    if (error) throw error

    return jobs.map(job => {
      const translatedNom = getTranslatedText(job, 'nom', currentLanguage)
      const translatedDescription = getTranslatedText(job, 'description', currentLanguage)
      
      console.log(`📝 Métier traduit: "${job.nom}" → "${translatedNom}"`)
      
      return {
        id: job.id,
        // Utiliser la traduction si disponible, sinon le texte français
        nom: translatedNom,
        description: translatedDescription,
      // Utiliser la traduction pour niveau_etudes si disponible
      niveau_etudes: getTranslatedText(job, 'niveau_etudes', currentLanguage),
      // Utiliser la traduction pour competences si disponible
      competences: (currentLanguage === 'fr' 
        ? job.competences 
        : (currentLanguage === 'en' 
          ? (job.competences_en && job.competences_en.length > 0 ? job.competences_en : job.competences)
          : (job.competences_ar && job.competences_ar.length > 0 ? job.competences_ar : job.competences)
        )
      ) || [],
      // Utiliser la traduction pour formations si disponible
      formations: (currentLanguage === 'fr' 
        ? job.formations 
        : (currentLanguage === 'en' 
          ? (job.formations_en && job.formations_en.length > 0 ? job.formations_en : job.formations)
          : (job.formations_ar && job.formations_ar.length > 0 ? job.formations_ar : job.formations)
        )
      ) || [],
      }
    })
  } catch (error) {
    console.error('Erreur lors du chargement des métiers:', error)
    return mockJobs[profileId] || []
  }
}

// Sauvegarder une tentative de quiz (optionnel)
export const saveQuizAttempt = async (answers, scores, profileId) => {
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        reponses: answers,
        scores: scores,
        profile_id: profileId,
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    return null
  }
}

