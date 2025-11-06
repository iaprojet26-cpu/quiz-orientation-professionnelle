import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAdminAuthenticated, logoutAdmin, getAllArticlesAdmin, deleteArticle, generateSitemap } from '../services/adminService'
import ArticleEditor from '../components/ArticleEditor'

function AdminDashboard() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingArticle, setEditingArticle] = useState(null)
  const [showEditor, setShowEditor] = useState(false)
  const [sitemapGenerating, setSitemapGenerating] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Vérifier l'authentification
    if (!isAdminAuthenticated()) {
      navigate('/admin/login')
      return
    }

    loadArticles()
  }, [navigate])

  const [error, setError] = useState('')

  const loadArticles = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllArticlesAdmin()
      setArticles(data)
      
      // Vérifier si Supabase est configuré
      if (data.length === 0) {
        setError('Aucun article trouvé. Assurez-vous que la table blog_articles existe dans Supabase et contient des données.')
      }
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error)
      setError(`Erreur : ${error.message || 'Impossible de charger les articles. Vérifiez que Supabase est configuré et que la table blog_articles existe.'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logoutAdmin()
    navigate('/admin/login')
  }

  const handleNewArticle = () => {
    setEditingArticle(null)
    setShowEditor(true)
  }

  const handleEditArticle = (article) => {
    setEditingArticle(article)
    setShowEditor(true)
  }

  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return
    }

    try {
      const success = await deleteArticle(id)
      if (success) {
        loadArticles()
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleEditorClose = () => {
    setShowEditor(false)
    setEditingArticle(null)
    loadArticles() // Recharger la liste
  }

  const handleGenerateSitemap = async () => {
    setSitemapGenerating(true)
    try {
      const sitemap = await generateSitemap()
      if (sitemap) {
        // Télécharger le sitemap
        const blob = new Blob([sitemap], { type: 'application/xml' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'sitemap.xml'
        a.click()
        URL.revokeObjectURL(url)
        alert('Sitemap généré avec succès !')
      } else {
        alert('Erreur lors de la génération du sitemap')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la génération du sitemap')
    } finally {
      setSitemapGenerating(false)
    }
  }

  if (showEditor) {
    return (
      <ArticleEditor
        article={editingArticle}
        onClose={handleEditorClose}
        onSave={handleEditorClose}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              📝 Administration - Articles de Blog
            </h1>
            <div className="flex gap-4">
              <button
                onClick={handleGenerateSitemap}
                disabled={sitemapGenerating}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {sitemapGenerating ? 'Génération...' : '🔄 Générer Sitemap'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Liste des Articles ({articles.length})
          </h2>
          <button
            onClick={handleNewArticle}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            + Nouvel Article
          </button>
        </div>

        {/* Messages d'erreur */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg mb-6">
            <p className="font-semibold mb-2">⚠️ Attention</p>
            <p className="mb-2">{error}</p>
            <div className="text-sm mt-4">
              <p className="font-semibold mb-2">Pour résoudre ce problème :</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Allez sur Supabase SQL Editor</li>
                <li>Exécutez le script <code className="bg-yellow-100 px-2 py-1 rounded">database/blog_articles_schema.sql</code></li>
                <li>Puis exécutez <code className="bg-yellow-100 px-2 py-1 rounded">database/migrate_static_articles.sql</code> pour ajouter les articles existants</li>
                <li>Rechargez cette page</li>
              </ol>
            </div>
          </div>
        )}

        {/* Liste des articles */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">Aucun article pour le moment.</p>
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-4">
                Si vous venez de créer la table, exécutez le script de migration pour ajouter les articles existants.
              </p>
              <a
                href="https://app.supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline text-sm"
              >
                → Ouvrir Supabase SQL Editor
              </a>
            </div>
            <button
              onClick={handleNewArticle}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Créer le premier article
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {article.title_fr}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{article.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          article.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {article.published ? '✅ Publié' : '⏳ Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(article.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditArticle(article)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        🗑️ Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard

