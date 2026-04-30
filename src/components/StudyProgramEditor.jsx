import { useMemo, useState } from 'react'
import { createStudyProgram, updateStudyProgram } from '../services/adminService'

function StudyProgramEditor({ item, onClose, onSave }) {
  const isEditing = !!item
  const translations = useMemo(() => {
    const rows = item?.study_program_translations || []
    return {
      fr: rows.find((r) => r.language === 'fr') || {},
      en: rows.find((r) => r.language === 'en') || {},
      ar: rows.find((r) => r.language === 'ar') || {}
    }
  }, [item])

  const [formData, setFormData] = useState({
    slug: item?.slug || '',
    institution_name: item?.institution_name || '',
    city: item?.city || '',
    degree_level: item?.degree_level || '',
    duration_months: item?.duration_months || '',
    is_active: item?.is_active !== false,
    title_fr: translations.fr.title || '',
    description_fr: translations.fr.description || '',
    admission_requirements_fr: (translations.fr.admission_requirements || []).join(', '),
    outcomes_fr: (translations.fr.outcomes || []).join(', '),
    title_en: translations.en.title || '',
    description_en: translations.en.description || '',
    admission_requirements_en: (translations.en.admission_requirements || []).join(', '),
    outcomes_en: (translations.en.outcomes || []).join(', '),
    title_ar: translations.ar.title || '',
    description_ar: translations.ar.description || '',
    admission_requirements_ar: (translations.ar.admission_requirements || []).join(', '),
    outcomes_ar: (translations.ar.outcomes || []).join(', ')
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.slug || !formData.institution_name || !formData.title_fr || !formData.description_fr) {
      setError('Champs obligatoires: slug, institution, titre FR, description FR.')
      return
    }
    setLoading(true)
    setError('')
    try {
      if (isEditing) await updateStudyProgram(item.id, formData)
      else await createStudyProgram(formData)
      onSave()
    } catch (err) {
      setError(err.message || 'Erreur sauvegarde')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{isEditing ? '✏️ Modifier Study Program' : '➕ Nouveau Study Program'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕ Fermer</button>
          </div>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-3 gap-4">
              <input name="slug" value={formData.slug} onChange={handleChange} placeholder="slug-programme" className="px-4 py-2 border rounded-lg" />
              <input name="institution_name" value={formData.institution_name} onChange={handleChange} placeholder="Institution" className="px-4 py-2 border rounded-lg" />
              <input name="city" value={formData.city} onChange={handleChange} placeholder="Ville" className="px-4 py-2 border rounded-lg" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="degree_level" value={formData.degree_level} onChange={handleChange} placeholder="Niveau diplome" className="px-4 py-2 border rounded-lg" />
              <input name="duration_months" value={formData.duration_months} onChange={handleChange} placeholder="Duree (mois)" className="px-4 py-2 border rounded-lg" />
            </div>
            <label className="flex items-center gap-2"><input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} /> Actif</label>

            {['fr', 'en', 'ar'].map((lang) => (
              <div key={lang} className="border-t pt-4 space-y-3">
                <h3 className="font-semibold uppercase">{lang}</h3>
                <input name={`title_${lang}`} value={formData[`title_${lang}`]} onChange={handleChange} placeholder={`Titre ${lang}`} className="w-full px-4 py-2 border rounded-lg" dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                <textarea name={`description_${lang}`} value={formData[`description_${lang}`]} onChange={handleChange} placeholder="Description" rows="3" className="w-full px-4 py-2 border rounded-lg" dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                <input name={`admission_requirements_${lang}`} value={formData[`admission_requirements_${lang}`]} onChange={handleChange} placeholder="Conditions admission (virgules)" className="w-full px-4 py-2 border rounded-lg" />
                <input name={`outcomes_${lang}`} value={formData[`outcomes_${lang}`]} onChange={handleChange} placeholder="Debouches (virgules)" className="w-full px-4 py-2 border rounded-lg" />
              </div>
            ))}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button type="button" onClick={onClose} className="px-5 py-2 border rounded-lg">Annuler</button>
              <button type="submit" disabled={loading} className="px-5 py-2 bg-primary-600 text-white rounded-lg">{loading ? 'Sauvegarde...' : 'Sauvegarder'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StudyProgramEditor
