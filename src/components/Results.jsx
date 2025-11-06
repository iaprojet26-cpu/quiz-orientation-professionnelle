import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n/config'
import { loadProfilesFromSupabase, loadJobsFromSupabase } from '../services/quizService'
import { getResultPageSEO } from '../services/seoService'
import ShareButtons from './ShareButtons'

function Results({ results, onRestart }) {
  const { t, i18n } = useTranslation()
  const [jobs, setJobs] = useState(results?.jobs || [])
  const [profile, setProfile] = useState(results?.profile)
  const [seoResult, setSeoResult] = useState(getResultPageSEO(i18n.language || 'fr', profile?.nom || ''))
  
  // Mettre à jour le contenu SEO quand la langue ou le profil change
  useEffect(() => {
    setSeoResult(getResultPageSEO(i18n.language || 'fr', profile?.nom || ''))
  }, [i18n.language, profile?.nom])

  // Recharger les traductions quand la langue change
  useEffect(() => {
    if (results?.profile?.id) {
      const reloadTranslations = async () => {
        console.log('🔄 Rechargement des traductions pour la langue:', i18n.language)
        const updatedProfiles = await loadProfilesFromSupabase()
        const updatedProfile = updatedProfiles.find(p => p.id === results.profile.id)
        if (updatedProfile) {
          console.log('✅ Profil traduit:', updatedProfile.nom)
          setProfile(updatedProfile)
        }
        
        const updatedJobs = await loadJobsFromSupabase(results.profile.id)
        if (updatedJobs.length > 0) {
          console.log('✅ Métiers traduits:', updatedJobs.length)
          setJobs(updatedJobs)
        }
      }
      reloadTranslations()
    }
  }, [i18n.language, results?.profile?.id])
  
  // Extraire toutes les formations uniques de tous les métiers
  const allFormations = [...new Set(jobs.flatMap(job => job.formations || []))]
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profil */}
      <div className="card text-center" style={{ borderTop: `4px solid ${profile?.couleur || '#0ea5e9'}` }}>
        <div className="text-6xl mb-4">{profile?.icone || '🎯'}</div>
        <h1 className="text-3xl font-bold text-primary-900 mb-4">
          {seoResult.h1 || `Félicitations ! Votre Profil : ${profile?.nom || ''}`}
        </h1>
        <h2 className="text-2xl font-semibold mb-3" style={{ color: profile?.couleur }}>
          {profile?.nom || 'Profil en cours de calcul...'}
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
          {profile?.description || ''}
        </p>
        
        <button onClick={onRestart} className="btn-primary">
          {t('common.restart')}
        </button>
      </div>

      {/* Métiers recommandés */}
      {jobs.length > 0 && (
        <div className="card">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {t('results.recommended_jobs')}
          </h3>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div key={job.id || index} className="border-l-4 pl-4 py-2" style={{ borderColor: profile?.couleur }}>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{job.nom}</h4>
                <p className="text-gray-700 mb-3">{job.description}</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">{t('results.studies_level')} </span>
                    <span className="text-gray-600">{job.niveau_etudes}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">{t('results.key_skills')} </span>
                    <span className="text-gray-600">{job.competences?.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formations recommandées */}
      {allFormations.length > 0 && (
        <div className="card">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('results.recommended_formations')}
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {allFormations.map((formation, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                <span className="text-primary-600">✓</span>
                <span className="text-gray-700">{formation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Partage social */}
      <div className="card">
        <ShareButtons results={results} />
      </div>
    </div>
  )
}

export default Results

