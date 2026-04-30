import { useMemo, useState } from 'react'
import { createCareerGuide, updateCareerGuide } from '../services/adminService'

function CareerGuideEditor({ item, onClose, onSave }) {
  const isEditing = !!item
  const translations = useMemo(() => {
    const rows = item?.career_guide_translations || []
    return {
      fr: rows.find((r) => r.language === 'fr') || {},
      en: rows.find((r) => r.language === 'en') || {},
      ar: rows.find((r) => r.language === 'ar') || {}
    }
  }, [item])

  const [formData, setFormData] = useState({
    slug: item?.slug || '',
    category: item?.category || 'skills',
    reading_minutes: item?.reading_minutes || 6,
    is_published: item?.is_published !== false,
    published_at: item?.published_at ? item.published_at.slice(0, 16) : '',
    title_fr: translations.fr.title || '',
    summary_fr: translations.fr.summary || '',
    body_markdown_fr: translations.fr.body_markdown || '',
    seo_title_fr: translations.fr.seo_title || '',
    seo_description_fr: translations.fr.seo_description || '',
    title_en: translations.en.title || '',
    summary_en: translations.en.summary || '',
    body_markdown_en: translations.en.body_markdown || '',
    seo_title_en: translations.en.seo_title || '',
    seo_description_en: translations.en.seo_description || '',
    title_ar: translations.ar.title || '',
    summary_ar: translations.ar.summary || '',
    body_markdown_ar: translations.ar.body_markdown || '',
    seo_title_ar: translations.ar.seo_title || '',
    seo_description_ar: translations.ar.seo_description || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.slug || !formData.title_fr || !formData.summary_fr) {
      setError('Champs obligatoires: slug, titre FR, resume FR.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const payload = {
        ...formData,
        published_at: formData.published_at ? new Date(formData.published_at).toISOString() : null
      }
      if (isEditing) await updateCareerGuide(item.id, payload)
      else await createCareerGuide(payload)
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
            <h2 className="text-2xl font-bold text-gray-900">{isEditing ? '✏️ Modifier Career Guide' : '➕ Nouveau Career Guide'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕ Fermer</button>
          </div>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-4 gap-4">
              <input name="slug" value={formData.slug} onChange={handleChange} placeholder="slug-guide" className="px-4 py-2 border rounded-lg" />
              <select name="category" value={formData.category} onChange={handleChange} className="px-4 py-2 border rounded-lg">
                <option value="career-choice">career-choice</option>
                <option value="interview">interview</option>
                <option value="cv">cv</option>
                <option value="skills">skills</option>
                <option value="international">international</option>
              </select>
              <input name="reading_minutes" value={formData.reading_minutes} onChange={handleChange} placeholder="Temps lecture" className="px-4 py-2 border rounded-lg" />
              <input type="datetime-local" name="published_at" value={formData.published_at} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            </div>
            <label className="flex items-center gap-2"><input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} /> Publie</label>

            {['fr', 'en', 'ar'].map((lang) => (
              <div key={lang} className="border-t pt-4 space-y-3">
                <h3 className="font-semibold uppercase">{lang}</h3>
                <input name={`title_${lang}`} value={formData[`title_${lang}`]} onChange={handleChange} placeholder={`Titre ${lang}`} className="w-full px-4 py-2 border rounded-lg" dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                <textarea name={`summary_${lang}`} value={formData[`summary_${lang}`]} onChange={handleChange} placeholder="Resume court" rows="2" className="w-full px-4 py-2 border rounded-lg" dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                <textarea name={`body_markdown_${lang}`} value={formData[`body_markdown_${lang}`]} onChange={handleChange} placeholder="Contenu markdown" rows="6" className="w-full px-4 py-2 border rounded-lg font-mono text-sm" dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                <input name={`seo_title_${lang}`} value={formData[`seo_title_${lang}`]} onChange={handleChange} placeholder="SEO title" className="w-full px-4 py-2 border rounded-lg" />
                <textarea name={`seo_description_${lang}`} value={formData[`seo_description_${lang}`]} onChange={handleChange} placeholder="SEO description" rows="2" className="w-full px-4 py-2 border rounded-lg" />
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

export default CareerGuideEditor
