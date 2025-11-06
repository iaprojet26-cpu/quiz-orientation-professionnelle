import { useState, useEffect } from 'react'
import { createJob, updateJob, getJobById, getAllProfiles } from '../services/adminService'

function JobEditor({ job, onClose, onSave }) {
  const isEditing = !!job
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [profiles, setProfiles] = useState([])
  
  const [formData, setFormData] = useState({
    nom: '',
    nom_en: '',
    nom_ar: '',
    description: '',
    description_en: '',
    description_ar: '',
    profil_id: '',
    niveau_etudes: '',
    niveau_etudes_en: '',
    niveau_etudes_ar: '',
    competences: '',
    competences_en: '',
    competences_ar: '',
    formations: '',
    formations_en: '',
    formations_ar: '',
    salaire_median: '',
    actif: true
  })

  useEffect(() => {
    // Charger les profils
    const loadProfiles = async () => {
      const profilesData = await getAllProfiles()
      setProfiles(profilesData)
    }
    loadProfiles()

    // Si on édite, charger les données du métier
    if (job) {
      const loadJob = async () => {
        const jobData = await getJobById(job.id)
        if (jobData) {
          setFormData({
            nom: jobData.nom || '',
            nom_en: jobData.nom_en || '',
            nom_ar: jobData.nom_ar || '',
            description: jobData.description || '',
            description_en: jobData.description_en || '',
            description_ar: jobData.description_ar || '',
            profil_id: jobData.profil_id || '',
            niveau_etudes: jobData.niveau_etudes || '',
            niveau_etudes_en: jobData.niveau_etudes_en || '',
            niveau_etudes_ar: jobData.niveau_etudes_ar || '',
            competences: Array.isArray(jobData.competences) ? jobData.competences.join(', ') : (jobData.competences || ''),
            competences_en: Array.isArray(jobData.competences_en) ? jobData.competences_en.join(', ') : (jobData.competences_en || ''),
            competences_ar: Array.isArray(jobData.competences_ar) ? jobData.competences_ar.join(', ') : (jobData.competences_ar || ''),
            formations: Array.isArray(jobData.formations) ? jobData.formations.join(', ') : (jobData.formations || ''),
            formations_en: Array.isArray(jobData.formations_en) ? jobData.formations_en.join(', ') : (jobData.formations_en || ''),
            formations_ar: Array.isArray(jobData.formations_ar) ? jobData.formations_ar.join(', ') : (jobData.formations_ar || ''),
            salaire_median: jobData.salaire_median || '',
            actif: jobData.actif !== false
          })
        }
      }
      loadJob()
    }
  }, [job])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validation
      if (!formData.nom || !formData.description || !formData.profil_id) {
        setError('Veuillez remplir tous les champs obligatoires (nom, description, profil)')
        setLoading(false)
        return
      }

      if (isEditing) {
        await updateJob(job.id, formData)
      } else {
        await createJob(formData)
      }

      onSave()
    } catch (err) {
      console.error('Erreur:', err)
      setError(err.message || 'Une erreur est survenue lors de la sauvegarde')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? '✏️ Modifier le Métier' : '➕ Nouveau Métier'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕ Fermer
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profil (obligatoire) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profil associé <span className="text-red-500">*</span>
              </label>
              <select
                name="profil_id"
                value={formData.profil_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Sélectionner un profil</option>
                {profiles.map(profile => (
                  <option key={profile.id} value={profile.id}>
                    {profile.nom} {profile.nom_en ? `(${profile.nom_en})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Nom (FR) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du métier (FR) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: Développeur Web"
              />
            </div>

            {/* Nom (EN) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du métier (EN)
              </label>
              <input
                type="text"
                name="nom_en"
                value={formData.nom_en}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: Web Developer"
              />
            </div>

            {/* Nom (AR) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du métier (AR)
              </label>
              <input
                type="text"
                name="nom_ar"
                value={formData.nom_ar}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: مطور ويب"
              />
            </div>

            {/* Description (FR) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (FR) <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Description détaillée du métier..."
              />
            </div>

            {/* Description (EN) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (EN)
              </label>
              <textarea
                name="description_en"
                value={formData.description_en}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Detailed job description..."
              />
            </div>

            {/* Description (AR) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (AR)
              </label>
              <textarea
                name="description_ar"
                value={formData.description_ar}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="وصف تفصيلي للمهنة..."
              />
            </div>

            {/* Niveau d'études */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau d'études (FR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="niveau_etudes"
                  value={formData.niveau_etudes}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: Bac+5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau d'études (EN)
                </label>
                <input
                  type="text"
                  name="niveau_etudes_en"
                  value={formData.niveau_etudes_en}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: Master's degree"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau d'études (AR)
                </label>
                <input
                  type="text"
                  name="niveau_etudes_ar"
                  value={formData.niveau_etudes_ar}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: درجة الماجستير"
                />
              </div>
            </div>

            {/* Compétences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compétences (FR) - Séparées par des virgules
              </label>
              <input
                type="text"
                name="competences"
                value={formData.competences}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: JavaScript, React, Node.js"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compétences (EN)
                </label>
                <input
                  type="text"
                  name="competences_en"
                  value={formData.competences_en}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: JavaScript, React, Node.js"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compétences (AR)
                </label>
                <input
                  type="text"
                  name="competences_ar"
                  value={formData.competences_ar}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: JavaScript, React, Node.js"
                />
              </div>
            </div>

            {/* Formations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Formations (FR) - Séparées par des virgules
              </label>
              <input
                type="text"
                name="formations"
                value={formData.formations}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: École d'ingénieur, Bootcamp, Formation en ligne"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formations (EN)
                </label>
                <input
                  type="text"
                  name="formations_en"
                  value={formData.formations_en}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: Engineering School, Bootcamp, Online Training"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formations (AR)
                </label>
                <input
                  type="text"
                  name="formations_ar"
                  value={formData.formations_ar}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: مدرسة هندسية، معسكر تدريبي، تدريب عبر الإنترنت"
                />
              </div>
            </div>

            {/* Salaire médian */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salaire médian (optionnel)
              </label>
              <input
                type="text"
                name="salaire_median"
                value={formData.salaire_median}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: 3500-5000€/mois"
              />
            </div>

            {/* Actif */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="actif"
                checked={formData.actif}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Métier actif (visible dans le quiz)
              </label>
            </div>

            {/* Boutons */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Enregistrement...' : isEditing ? 'Mettre à jour' : 'Créer le métier'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JobEditor

