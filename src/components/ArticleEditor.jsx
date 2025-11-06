import { useState, useEffect } from 'react'
import { createArticle, updateArticle, getArticleById } from '../services/adminService'

function ArticleEditor({ article, onClose, onSave }) {
  const isEditing = !!article
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    slug: '',
    title_fr: '',
    title_en: '',
    title_ar: '',
    description_fr: '',
    description_en: '',
    description_ar: '',
    content_fr: '',
    content_en: '',
    content_ar: '',
    image: '',
    keywords_fr: '',
    keywords_en: '',
    keywords_ar: '',
    category: 'orientation',
    published: false
  })

  useEffect(() => {
    if (article) {
      setFormData({
        slug: article.slug || '',
        title_fr: article.title_fr || '',
        title_en: article.title_en || '',
        title_ar: article.title_ar || '',
        description_fr: article.description_fr || '',
        description_en: article.description_en || '',
        description_ar: article.description_ar || '',
        content_fr: article.content_fr || '',
        content_en: article.content_en || '',
        content_ar: article.content_ar || '',
        image: article.image || '',
        keywords_fr: (article.keywords_fr || []).join(', '),
        keywords_en: (article.keywords_en || []).join(', '),
        keywords_ar: (article.keywords_ar || []).join(', '),
        category: article.category || 'orientation',
        published: article.published || false
      })
    }
  }, [article])

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
      // Préparer les données
      const articleData = {
        ...formData,
        keywords_fr: formData.keywords_fr.split(',').map(k => k.trim()).filter(k => k),
        keywords_en: formData.keywords_en.split(',').map(k => k.trim()).filter(k => k),
        keywords_ar: formData.keywords_ar.split(',').map(k => k.trim()).filter(k => k)
      }

      if (isEditing) {
        await updateArticle(article.id, articleData)
      } else {
        await createArticle(articleData)
      }

      onSave()
    } catch (err) {
      console.error('Erreur:', err)
      setError(err.message || 'Erreur lors de la sauvegarde')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? '✏️ Modifier l\'article' : '➕ Nouvel article'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕ Fermer
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                  placeholder="exemple-article"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="orientation">Orientation</option>
                  <option value="metiers">Métiers</option>
                  <option value="formations">Formations</option>
                  <option value="conseils">Conseils</option>
                </select>
              </div>
            </div>

            {/* Titres multilingues */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Titres</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre (FR) *
                  </label>
                  <input
                    type="text"
                    name="title_fr"
                    value={formData.title_fr}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre (EN)
                    </label>
                    <input
                      type="text"
                      name="title_en"
                      value={formData.title_en}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre (AR)
                    </label>
                    <input
                      type="text"
                      name="title_ar"
                      value={formData.title_ar}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Descriptions multilingues */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Descriptions</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (FR) *
                  </label>
                  <textarea
                    name="description_fr"
                    value={formData.description_fr}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (EN)
                    </label>
                    <textarea
                      name="description_en"
                      value={formData.description_en}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (AR)
                    </label>
                    <textarea
                      name="description_ar"
                      value={formData.description_ar}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu Markdown multilingue */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contenu Markdown</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenu (FR) *
                  </label>
                  <textarea
                    name="content_fr"
                    value={formData.content_fr}
                    onChange={handleChange}
                    rows="15"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                    required
                    placeholder="# Titre&#10;&#10;Contenu de l'article en Markdown..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenu (EN)
                    </label>
                    <textarea
                      name="content_en"
                      value={formData.content_en}
                      onChange={handleChange}
                      rows="15"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                      placeholder="# Title&#10;&#10;Article content in Markdown..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenu (AR)
                    </label>
                    <textarea
                      name="content_ar"
                      value={formData.content_ar}
                      onChange={handleChange}
                      rows="15"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                      dir="rtl"
                      placeholder="# العنوان&#10;&#10;محتوى المقال..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mots-clés et image */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mots-clés (FR) (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    name="keywords_fr"
                    value={formData.keywords_fr}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="orientation, métier, carrière"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image (URL)
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="/assets/blog/image.webp"
                  />
                </div>
              </div>
            </div>

            {/* Statut */}
            <div className="border-t pt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Publier l'article
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="border-t pt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Sauvegarde...' : isEditing ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ArticleEditor

