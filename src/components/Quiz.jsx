import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n/config'
import Question from './Question'
import { mockQuestions, mockProfiles, mockJobs } from '../data/mockData'
import { 
  loadQuestionsFromSupabase, 
  loadProfilesFromSupabase, 
  loadJobsFromSupabase,
  saveQuizAttempt 
} from '../services/quizService'
import { trackQuizStart, trackQuizQuestion, trackQuizComplete } from '../utils/analytics'

function Quiz({ onComplete }) {
  const { t } = useTranslation()
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [profiles, setProfiles] = useState(mockProfiles)

  const loadProfiles = async () => {
    const loadedProfiles = await loadProfilesFromSupabase()
    setProfiles(loadedProfiles)
  }

  const loadQuestions = async () => {
    try {
      setLoading(true)
      
      // Essayer de charger depuis Supabase
      let loadedQuestions = await loadQuestionsFromSupabase()
      
      // Si Supabase n'est pas disponible ou vide, utiliser les données mock
      if (!loadedQuestions || loadedQuestions.length === 0) {
        console.log('Utilisation des données mock')
        loadedQuestions = mockQuestions
          .sort(() => Math.random() - 0.5)
          .slice(0, 12)
      }
      
      setQuestions(loadedQuestions)
      setError(null)
    } catch (err) {
      console.error('Erreur:', err)
      // En cas d'erreur, utiliser les données mock
      const selectedQuestions = mockQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 12)
      setQuestions(selectedQuestions)
      setError(null)
    } finally {
      setLoading(false)
    }
  }

  // Charger les questions et profils au montage
  useEffect(() => {
    loadQuestions()
    loadProfiles()
    // Tracker le début du quiz
    trackQuizStart()
  }, [])

  // Recharger les questions et profils quand la langue change
  useEffect(() => {
    console.log('🔄 Changement de langue détecté:', i18n.language)
    // Réinitialiser les réponses pour forcer le rechargement
    setAnswers({})
    setCurrentQuestionIndex(0)
    loadQuestions()
    loadProfiles()
  }, [i18n.language])

  const handleAnswer = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId
    })
    // Tracker la réponse à la question
    trackQuizQuestion(currentQuestionIndex + 1, questions.length)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleComplete = async () => {
    // Calculer les scores et déterminer le profil
    const scores = calculateScores(answers, questions)
    const profile = determineProfile(scores)
    
    // Charger les métiers pour ce profil (depuis Supabase ou mock)
    let jobs = []
    try {
      jobs = await loadJobsFromSupabase(profile.id)
      if (!jobs || jobs.length === 0) {
        // Fallback sur mock si Supabase ne retourne rien
        jobs = mockJobs[profile.id] || []
      }
    } catch (err) {
      console.error('Erreur chargement métiers:', err)
      jobs = mockJobs[profile.id] || []
    }
    
    // Sauvegarder la tentative (optionnel, silencieux si échec)
    try {
      await saveQuizAttempt(answers, scores, profile.id)
    } catch (err) {
      console.warn('Impossible de sauvegarder la tentative:', err)
    }
    
    // Tracker la complétion du quiz
    trackQuizComplete(profile?.nom || 'Unknown')
    
    onComplete({
      answers,
      scores,
      profile,
      jobs
    })
  }

  const calculateScores = (answers, questions) => {
    const scores = {}
    
    // Parcourir toutes les réponses
    Object.entries(answers).forEach(([questionId, optionId]) => {
      // Gérer à la fois les IDs numériques (mock) et UUIDs (Supabase)
      const question = questions.find(q => 
        q.id === questionId || q.id === parseInt(questionId) || String(q.id) === String(questionId)
      )
      if (!question) return
      
      // Gérer à la fois les IDs numériques (mock) et UUIDs (Supabase)
      const selectedOption = question.options.find(opt => 
        opt.id === optionId || opt.id === parseInt(optionId) || String(opt.id) === String(optionId)
      )
      if (!selectedOption || !selectedOption.score) return
      
      // Ajouter les scores de cette option
      Object.entries(selectedOption.score).forEach(([key, value]) => {
        scores[key] = (scores[key] || 0) + value
      })
    })
    
    return scores
  }

  const determineProfile = (scores) => {
    let bestMatch = null
    let bestScore = 0
    
    profiles.forEach(profile => {
      let matchScore = 0
      
      // Calculer le score de correspondance avec ce profil
      Object.entries(profile.criteres).forEach(([criter, poids]) => {
        const userScore = scores[criter] || 0
        // Score pondéré : plus le critère est important (poids) et plus l'utilisateur a ce trait, meilleur est le match
        matchScore += userScore * (poids / 15) // Normaliser le poids
      })
      
      if (matchScore > bestScore) {
        bestScore = matchScore
        bestMatch = profile
      }
    })
    
    return bestMatch
  }

  if (loading) {
    return (
      <div className="card max-w-3xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{t('quiz.loading')}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card max-w-3xl mx-auto text-center py-12">
        <p className="text-red-600 mb-4">{t('quiz.error')}</p>
        <button 
          onClick={loadQuestions} 
          className="btn-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label={t('common.retry')}
        >
          {t('common.retry')}
        </button>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="card max-w-3xl mx-auto text-center py-12">
        <p className="text-gray-600">{t('quiz.no_questions')}</p>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const canProceed = answers[currentQuestion.id] !== undefined

  return (
    <div className="card max-w-3xl mx-auto">
      {/* Barre de progression */}
      <div className="mb-6" role="progressbar" aria-valuenow={currentQuestionIndex + 1} aria-valuemin={1} aria-valuemax={questions.length} aria-label={`Question ${currentQuestionIndex + 1} sur ${questions.length}`}>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{t('quiz.question_count', { current: currentQuestionIndex + 1, total: questions.length })}</span>
          <span>{t('quiz.progress', { percent: Math.round(progress) })}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2" aria-hidden="true">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question actuelle */}
      <Question
        question={currentQuestion}
        selectedAnswer={answers[currentQuestion.id]}
        onAnswer={handleAnswer}
      />

      {/* Navigation */}
      <div className="flex justify-between mt-6" role="navigation" aria-label="Navigation du quiz">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`btn-secondary focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={t('common.previous')}
          aria-disabled={currentQuestionIndex === 0}
        >
          {t('common.previous')}
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`btn-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={currentQuestionIndex === questions.length - 1 ? t('common.finish') : t('common.next')}
          aria-disabled={!canProceed}
        >
          {currentQuestionIndex === questions.length - 1 ? t('common.finish') : t('common.next')}
        </button>
      </div>
    </div>
  )
}

export default Quiz

