import { useMemo, useState } from 'react'
import { createCareerPath, updateCareerPath } from '../services/adminService'

function CareerPathEditor({ item, onClose, onSave }) {
  const isEditing = !!item
  const translations = useMemo(() => {
    const rows = item?.career_path_translations || []
    return {
      fr: rows.find((r) => r.language === 'fr') || {},
      en: rows.find((r) => r.language === 'en') || {},
      ar: rows.find((r) => r.language === 'ar') || {}
    }
  }, [item])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    slug: item?.slug || '',
    level_group: item?.level_group || '',
    salary_min_monthly: item?.salary_min_monthly || '',
    salary_max_monthly: item?.salary_max_monthly || '',
    active: item?.active !== false,
    title_fr: translations.fr.title || '',
    short_description_fr: translations.fr.short_description || '',
    long_description_fr: translations.fr.long_description || '',
    skills_fr: (translations.fr.skills || []).join(', '),
    education_paths_fr: (translations.fr.education_paths || []).join(', '),
    opportunities_summary_fr: translations.fr.opportunities_summary || '',
    title_en: translations.en.title || '',
    short_description_en: translations.en.short_description || '',
    long_description_en: translations.en.long_description || '',
    skills_en: (translations.en.skills || []).join(', '),
    education_paths_en: (translations.en.education_paths || []).join(', '),
    opportunities_summary_en: translations.en.opportunities_summary || '',
    title_ar: translations.ar.title || '',
    short_description_ar: translations.ar.short_description || '',
    long_description_ar: translations.ar.long_description || '',
    skills_ar: (translations.ar.skills || []).join(', '),
    education_paths_ar: (translations.ar.education_paths || []).join(', '),
    opportunities_summary_ar: translations.ar.opportunities_summary || ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!formData.slug || !formData.title_fr || !formData.short_description_fr) {
      setError('Champs obligatoires: slug, titre FR, description courte FR.')
      return
    }
    setLoading(true)
    try {
      if (isEditing) await updateCareerPath(item.id, formData)
      else await createCareerPath(formData)
      onSave()
    } catch (err) {
      setError(err.message || 'Erreur lors de la sauvegarde')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{isEditing ? '✏️ Modifier Career Path' : '➕ Nouveau Career Path'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕ Fermer</button>
          </div>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <input name="slug" value={formData.slug} onChange={handleChange} required placeholder="slug-metier" className="px-4 py-2 border rounded-lg" />
              <input name="level_group" value={formData.level_group} onChange={handleChange} placeholder="junior / mid / senior" className="px-4 py-2 border rounded-lg" />
              <input name="salary_min_monthly" value={formData.salary_min_monthly} onChange={handleChange} placeholder="3000" className="px-4 py-2 border rounded-lg" />
              <input name="salary_max_monthly" value={formData.salary_max_monthly} onChange={handleChange} placeholder="8000" className="px-4 py-2 border rounded-lg" />
            </div>
            <label className="flex items-center gap-2"><input type="checkbox" name="active" checked={formData.active} onChange={handleChange} /> Actif</label>

            {['fr', 'en', 'ar'].map((lang) => (
              <div key={lang} className="border-t pt-4">
                <h3 className="font-semibold mb-3 uppercase">{lang}</h3>
                <div className="space-y-3">
                  <input name={`title_${lang}`} value={formData[`title_${lang}`]} onChange={handleChange} placeholder={`Titre ${lang.toUpperCase()}`} className="w-full px-4 py-2 border rounded-lg" dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                  <textarea name={`short_description_${lang}`} value={formData[`short_description_${lang}`]} onChange={handleChange} placeholder="Description courte" className="w-full px-4 py-2 border rounded-lg" rows="2" dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                  <textarea name={`long_description_${lang}`} value={formData[`long_description_${lang}`]} onChange={handleChange} placeholder="Description longue" className="w-full px-4 py-2 border rounded-lg" rows="4" dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                  <input name={`skills_${lang}`} value={formData[`skills_${lang}`]} onChange={handleChange} placeholder="Skills (comma separated)" className="w-full px-4 py-2 border rounded-lg" />
                  <input name={`education_paths_${lang}`} value={formData[`education_paths_${lang}`]} onChange={handleChange} placeholder="Education paths (comma separated)" className="w-full px-4 py-2 border rounded-lg" />
                  <textarea name={`opportunities_summary_${lang}`} value={formData[`opportunities_summary_${lang}`]} onChange={handleChange} placeholder="Resume opportunites" className="w-full px-4 py-2 border rounded-lg" rows="2" dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                </div>
              </div>
            ))}

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button type="button" onClick={onClose} className="px-5 py-2 border rounded-lg">Annuler</button>
              <button type="submit" disabled={loading} className="px-5 py-2 bg-primary-600 text-white rounded-lg">
                {loading ? 'Sauvegarde...' : isEditing ? 'Mettre a jour' : 'Creer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CareerPathEditor
