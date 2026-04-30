import { useMemo, useState } from 'react'
import { createOpportunity, updateOpportunity } from '../services/adminService'

function OpportunityEditor({ item, onClose, onSave }) {
  const isEditing = !!item
  const translations = useMemo(() => {
    const rows = item?.opportunity_translations || []
    return {
      fr: rows.find((r) => r.language === 'fr') || {},
      en: rows.find((r) => r.language === 'en') || {},
      ar: rows.find((r) => r.language === 'ar') || {}
    }
  }, [item])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    type: item?.type || 'internship',
    company_name: item?.company_name || '',
    city: item?.city || '',
    country: item?.country || 'Morocco',
    source_url: item?.source_url || '',
    application_deadline: item?.application_deadline || '',
    is_remote: !!item?.is_remote,
    is_active: item?.is_active !== false,
    title_fr: translations.fr.title || '',
    description_fr: translations.fr.description || '',
    requirements_fr: (translations.fr.requirements || []).join(', '),
    application_steps_fr: (translations.fr.application_steps || []).join(', '),
    title_en: translations.en.title || '',
    description_en: translations.en.description || '',
    requirements_en: (translations.en.requirements || []).join(', '),
    application_steps_en: (translations.en.application_steps || []).join(', '),
    title_ar: translations.ar.title || '',
    description_ar: translations.ar.description || '',
    requirements_ar: (translations.ar.requirements || []).join(', '),
    application_steps_ar: (translations.ar.application_steps || []).join(', ')
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!formData.title_fr || !formData.description_fr) {
      setError('Champs obligatoires: titre FR et description FR.')
      return
    }
    setLoading(true)
    try {
      if (isEditing) await updateOpportunity(item.id, formData)
      else await createOpportunity(formData)
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
            <h2 className="text-2xl font-bold text-gray-900">{isEditing ? '✏️ Modifier Opportunity' : '➕ Nouvelle Opportunity'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕ Fermer</button>
          </div>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <select name="type" value={formData.type} onChange={handleChange} className="px-4 py-2 border rounded-lg">
                <option value="job">job</option>
                <option value="internship">internship</option>
                <option value="scholarship">scholarship</option>
                <option value="call">call</option>
              </select>
              <input name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Company" className="px-4 py-2 border rounded-lg" />
              <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="px-4 py-2 border rounded-lg" />
              <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="px-4 py-2 border rounded-lg" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="source_url" value={formData.source_url} onChange={handleChange} placeholder="https://..." className="px-4 py-2 border rounded-lg" />
              <input type="date" name="application_deadline" value={formData.application_deadline} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            </div>
            <div className="flex gap-5">
              <label className="flex items-center gap-2"><input type="checkbox" name="is_remote" checked={formData.is_remote} onChange={handleChange} /> Remote</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} /> Active</label>
            </div>

            {['fr', 'en', 'ar'].map((lang) => (
              <div key={lang} className="border-t pt-4">
                <h3 className="font-semibold mb-3 uppercase">{lang}</h3>
                <div className="space-y-3">
                  <input name={`title_${lang}`} value={formData[`title_${lang}`]} onChange={handleChange} placeholder={`Titre ${lang.toUpperCase()}`} className="w-full px-4 py-2 border rounded-lg" dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                  <textarea name={`description_${lang}`} value={formData[`description_${lang}`]} onChange={handleChange} placeholder="Description" className="w-full px-4 py-2 border rounded-lg" rows="3" dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                  <input name={`requirements_${lang}`} value={formData[`requirements_${lang}`]} onChange={handleChange} placeholder="Requirements (comma separated)" className="w-full px-4 py-2 border rounded-lg" />
                  <input name={`application_steps_${lang}`} value={formData[`application_steps_${lang}`]} onChange={handleChange} placeholder="Application steps (comma separated)" className="w-full px-4 py-2 border rounded-lg" />
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

export default OpportunityEditor
