import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  isAdminAuthenticated,
  logoutAdmin,
  getAllArticlesAdmin,
  deleteArticle,
  generateSitemap,
  getAllJobsAdmin,
  deleteJob,
  getAllCareerPathsAdmin,
  deleteCareerPath,
  getAllOpportunitiesAdmin,
  deleteOpportunity,
  getAllStudyProgramsAdmin,
  deleteStudyProgram,
  getAllCareerGuidesAdmin,
  deleteCareerGuide
} from '../services/adminService'
import ArticleEditor from '../components/ArticleEditor'
import JobEditor from '../components/JobEditor'
import CareerPathEditor from '../components/CareerPathEditor'
import OpportunityEditor from '../components/OpportunityEditor'
import StudyProgramEditor from '../components/StudyProgramEditor'
import CareerGuideEditor from '../components/CareerGuideEditor'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('articles')
  const [articles, setArticles] = useState([])
  const [jobs, setJobs] = useState([])
  const [careerPaths, setCareerPaths] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [studyPrograms, setStudyPrograms] = useState([])
  const [careerGuides, setCareerGuides] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingArticle, setEditingArticle] = useState(null)
  const [editingJob, setEditingJob] = useState(null)
  const [editingCareerPath, setEditingCareerPath] = useState(null)
  const [editingOpportunity, setEditingOpportunity] = useState(null)
  const [editingStudyProgram, setEditingStudyProgram] = useState(null)
  const [editingCareerGuide, setEditingCareerGuide] = useState(null)
  const [showEditor, setShowEditor] = useState(false)
  const [sitemapGenerating, setSitemapGenerating] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Vérifier l'authentification
    if (!isAdminAuthenticated()) {
      navigate('/admin/login')
      return
    }

    if (activeTab === 'articles') loadArticles()
    else if (activeTab === 'jobs') loadJobs()
    else if (activeTab === 'careerPaths') loadCareerPaths()
    else if (activeTab === 'opportunities') loadOpportunities()
    else if (activeTab === 'studyPrograms') loadStudyPrograms()
    else loadCareerGuides()
  }, [navigate, activeTab])

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

  const loadJobs = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllJobsAdmin()
      setJobs(data)
      
      if (data.length === 0) {
        setError('Aucun métier trouvé. Assurez-vous que la table jobs existe dans Supabase et contient des données.')
      }
    } catch (error) {
      console.error('Erreur lors du chargement des métiers:', error)
      setError(`Erreur : ${error.message || 'Impossible de charger les métiers. Vérifiez que Supabase est configuré et que la table jobs existe.'}`)
    } finally {
      setLoading(false)
    }
  }

  const loadCareerPaths = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllCareerPathsAdmin()
      setCareerPaths(data)
      if (data.length === 0) {
        setError('Aucun career path trouvé. Exécutez database/hub_schema.sql dans Supabase SQL Editor.')
      }
    } catch (error) {
      setError(`Erreur : ${error.message || 'Impossible de charger les career paths.'}`)
    } finally {
      setLoading(false)
    }
  }

  const loadOpportunities = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllOpportunitiesAdmin()
      setOpportunities(data)
      if (data.length === 0) {
        setError('Aucune opportunité trouvée. Exécutez database/hub_schema.sql dans Supabase SQL Editor.')
      }
    } catch (error) {
      setError(`Erreur : ${error.message || 'Impossible de charger les opportunités.'}`)
    } finally {
      setLoading(false)
    }
  }

  const loadStudyPrograms = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllStudyProgramsAdmin()
      setStudyPrograms(data)
      if (data.length === 0) {
        setError('Aucun study program trouvé.')
      }
    } catch (error) {
      setError(`Erreur : ${error.message || 'Impossible de charger les study programs.'}`)
    } finally {
      setLoading(false)
    }
  }

  const loadCareerGuides = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllCareerGuidesAdmin()
      setCareerGuides(data)
      if (data.length === 0) {
        setError('Aucun career guide trouvé.')
      }
    } catch (error) {
      setError(`Erreur : ${error.message || 'Impossible de charger les career guides.'}`)
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
    setEditingJob(null)
    setShowEditor(true)
  }

  const handleEditArticle = (article) => {
    setEditingArticle(article)
    setEditingJob(null)
    setShowEditor(true)
  }

  const handleNewJob = () => {
    setEditingJob(null)
    setEditingArticle(null)
    setShowEditor(true)
  }

  const handleEditJob = (job) => {
    setEditingJob(job)
    setEditingArticle(null)
    setShowEditor(true)
  }

  const handleNewCareerPath = () => {
    setEditingCareerPath(null)
    setEditingArticle(null)
    setEditingJob(null)
    setEditingOpportunity(null)
    setShowEditor(true)
  }

  const handleEditCareerPath = (careerPath) => {
    setEditingCareerPath(careerPath)
    setEditingArticle(null)
    setEditingJob(null)
    setEditingOpportunity(null)
    setShowEditor(true)
  }

  const handleNewOpportunity = () => {
    setEditingOpportunity(null)
    setEditingArticle(null)
    setEditingJob(null)
    setEditingCareerPath(null)
    setEditingStudyProgram(null)
    setEditingCareerGuide(null)
    setShowEditor(true)
  }

  const handleEditOpportunity = (opportunity) => {
    setEditingOpportunity(opportunity)
    setEditingArticle(null)
    setEditingJob(null)
    setEditingCareerPath(null)
    setEditingStudyProgram(null)
    setEditingCareerGuide(null)
    setShowEditor(true)
  }

  const handleNewStudyProgram = () => {
    setEditingStudyProgram(null)
    setEditingArticle(null)
    setEditingJob(null)
    setEditingCareerPath(null)
    setEditingOpportunity(null)
    setEditingCareerGuide(null)
    setShowEditor(true)
  }

  const handleEditStudyProgram = (program) => {
    setEditingStudyProgram(program)
    setEditingArticle(null)
    setEditingJob(null)
    setEditingCareerPath(null)
    setEditingOpportunity(null)
    setEditingCareerGuide(null)
    setShowEditor(true)
  }

  const handleNewCareerGuide = () => {
    setEditingCareerGuide(null)
    setEditingArticle(null)
    setEditingJob(null)
    setEditingCareerPath(null)
    setEditingOpportunity(null)
    setEditingStudyProgram(null)
    setShowEditor(true)
  }

  const handleEditCareerGuide = (guide) => {
    setEditingCareerGuide(guide)
    setEditingArticle(null)
    setEditingJob(null)
    setEditingCareerPath(null)
    setEditingOpportunity(null)
    setEditingStudyProgram(null)
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

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce métier ?')) {
      return
    }

    try {
      const success = await deleteJob(id)
      if (success) {
        loadJobs()
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleDeleteCareerPath = async (id) => {
    if (!window.confirm('Supprimer ce career path ?')) return
    const success = await deleteCareerPath(id)
    if (success) loadCareerPaths()
    else alert('Erreur lors de la suppression')
  }

  const handleDeleteOpportunity = async (id) => {
    if (!window.confirm('Supprimer cette opportunité ?')) return
    const success = await deleteOpportunity(id)
    if (success) loadOpportunities()
    else alert('Erreur lors de la suppression')
  }

  const handleDeleteStudyProgram = async (id) => {
    if (!window.confirm('Supprimer ce study program ?')) return
    const success = await deleteStudyProgram(id)
    if (success) loadStudyPrograms()
    else alert('Erreur lors de la suppression')
  }

  const handleDeleteCareerGuide = async (id) => {
    if (!window.confirm('Supprimer ce career guide ?')) return
    const success = await deleteCareerGuide(id)
    if (success) loadCareerGuides()
    else alert('Erreur lors de la suppression')
  }

  const handleEditorClose = () => {
    setShowEditor(false)
    setEditingArticle(null)
    setEditingJob(null)
    // Recharger la liste selon l'onglet actif
    if (activeTab === 'articles') loadArticles()
    else if (activeTab === 'jobs') loadJobs()
    else if (activeTab === 'careerPaths') loadCareerPaths()
    else if (activeTab === 'opportunities') loadOpportunities()
    else if (activeTab === 'studyPrograms') loadStudyPrograms()
    else loadCareerGuides()
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
    if (activeTab === 'articles') {
      return (
        <ArticleEditor
          article={editingArticle}
          onClose={handleEditorClose}
          onSave={handleEditorClose}
        />
      )
    } else if (activeTab === 'jobs') {
      return (
        <JobEditor
          job={editingJob}
          onClose={handleEditorClose}
          onSave={handleEditorClose}
        />
      )
    } else if (activeTab === 'careerPaths') {
      return <CareerPathEditor item={editingCareerPath} onClose={handleEditorClose} onSave={handleEditorClose} />
    } else if (activeTab === 'opportunities') {
      return <OpportunityEditor item={editingOpportunity} onClose={handleEditorClose} onSave={handleEditorClose} />
    } else if (activeTab === 'studyPrograms') {
      return <StudyProgramEditor item={editingStudyProgram} onClose={handleEditorClose} onSave={handleEditorClose} />
    }
    return <CareerGuideEditor item={editingCareerGuide} onClose={handleEditorClose} onSave={handleEditorClose} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              ⚙️ Administration
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
        {/* Onglets */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => {
                setActiveTab('articles')
                loadArticles()
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'articles'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📝 Articles ({articles.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('jobs')
                loadJobs()
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              💼 Métiers ({jobs.length})
            </button>
            <button onClick={() => { setActiveTab('careerPaths'); loadCareerPaths() }} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'careerPaths' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              🧭 Career Paths ({careerPaths.length})
            </button>
            <button onClick={() => { setActiveTab('opportunities'); loadOpportunities() }} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'opportunities' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              🎯 Opportunities ({opportunities.length})
            </button>
            <button onClick={() => { setActiveTab('studyPrograms'); loadStudyPrograms() }} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'studyPrograms' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              🎓 Study Programs ({studyPrograms.length})
            </button>
            <button onClick={() => { setActiveTab('careerGuides'); loadCareerGuides() }} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'careerGuides' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              📘 Career Guides ({careerGuides.length})
            </button>
          </nav>
        </div>

        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {activeTab === 'articles' 
              ? `Liste des Articles (${articles.length})`
              : activeTab === 'jobs'
              ? `Liste des Métiers (${jobs.length})`
              : activeTab === 'careerPaths'
              ? `Liste des Career Paths (${careerPaths.length})`
              : activeTab === 'opportunities'
              ? `Liste des Opportunities (${opportunities.length})`
              : activeTab === 'studyPrograms'
              ? `Liste des Study Programs (${studyPrograms.length})`
              : `Liste des Career Guides (${careerGuides.length})`
            }
          </h2>
          <button
            onClick={
              activeTab === 'articles'
                ? handleNewArticle
                : activeTab === 'jobs'
                ? handleNewJob
                : activeTab === 'careerPaths'
                ? handleNewCareerPath
                : activeTab === 'opportunities'
                ? handleNewOpportunity
                : activeTab === 'studyPrograms'
                ? handleNewStudyProgram
                : handleNewCareerGuide
            }
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            + {activeTab === 'articles' ? 'Nouvel Article' : activeTab === 'jobs' ? 'Nouveau Métier' : activeTab === 'careerPaths' ? 'Nouveau Career Path' : activeTab === 'opportunities' ? 'Nouvelle Opportunity' : activeTab === 'studyPrograms' ? 'Nouveau Study Program' : 'Nouveau Career Guide'}
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

        {/* Liste des articles ou métiers */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        ) : activeTab === 'articles' ? (
          articles.length === 0 ? (
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
          )
        ) : activeTab === 'jobs' ? (
          jobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">Aucun métier pour le moment.</p>
              <button
                onClick={handleNewJob}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Créer le premier métier
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profil
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Niveau d'études
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {job.nom}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {job.profiles?.nom || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{job.niveau_etudes}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.actif !== false
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {job.actif !== false ? '✅ Actif' : '⏸️ Inactif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditJob(job)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
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
          )
        ) : activeTab === 'careerPaths' ? (
          careerPaths.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center"><p className="text-gray-600">Aucun career path.</p></div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre FR</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {careerPaths.map((cp) => {
                    const trFr = (cp.career_path_translations || []).find((t) => t.language === 'fr')
                    return (
                      <tr key={cp.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">{cp.slug}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{trFr?.title || '-'}</td>
                        <td className="px-6 py-4 text-sm">{cp.active ? '✅ Actif' : '⏸️ Inactif'}</td>
                        <td className="px-6 py-4 text-right text-sm"><button onClick={() => handleEditCareerPath(cp)} className="text-primary-600 hover:text-primary-900 mr-4">✏️ Modifier</button><button onClick={() => handleDeleteCareerPath(cp.id)} className="text-red-600 hover:text-red-900">🗑️ Supprimer</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : activeTab === 'opportunities' ? (
          opportunities.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center"><p className="text-gray-600">Aucune opportunité.</p></div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre FR</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {opportunities.map((op) => {
                    const trFr = (op.opportunity_translations || []).find((t) => t.language === 'fr')
                    return (
                      <tr key={op.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">{op.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{trFr?.title || '-'}</td>
                        <td className="px-6 py-4 text-sm">{op.is_active ? '✅ Active' : '⏸️ Inactive'}</td>
                        <td className="px-6 py-4 text-right text-sm"><button onClick={() => handleEditOpportunity(op)} className="text-primary-600 hover:text-primary-900 mr-4">✏️ Modifier</button><button onClick={() => handleDeleteOpportunity(op.id)} className="text-red-600 hover:text-red-900">🗑️ Supprimer</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : activeTab === 'studyPrograms' ? (
          studyPrograms.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center"><p className="text-gray-600">Aucun study program.</p></div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Institution</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre FR</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studyPrograms.map((sp) => {
                    const trFr = (sp.study_program_translations || []).find((t) => t.language === 'fr')
                    return (
                      <tr key={sp.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{sp.slug}</td>
                        <td className="px-6 py-4 text-sm">{sp.institution_name}</td>
                        <td className="px-6 py-4 text-sm">{trFr?.title || '-'}</td>
                        <td className="px-6 py-4 text-sm">{sp.is_active ? '✅ Active' : '⏸️ Inactive'}</td>
                        <td className="px-6 py-4 text-right text-sm"><button onClick={() => handleEditStudyProgram(sp)} className="text-primary-600 hover:text-primary-900 mr-4">✏️ Modifier</button><button onClick={() => handleDeleteStudyProgram(sp.id)} className="text-red-600 hover:text-red-900">🗑️ Supprimer</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : (
          careerGuides.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center"><p className="text-gray-600">Aucun career guide.</p></div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categorie</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre FR</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {careerGuides.map((cg) => {
                    const trFr = (cg.career_guide_translations || []).find((t) => t.language === 'fr')
                    return (
                      <tr key={cg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{cg.slug}</td>
                        <td className="px-6 py-4 text-sm">{cg.category}</td>
                        <td className="px-6 py-4 text-sm">{trFr?.title || '-'}</td>
                        <td className="px-6 py-4 text-sm">{cg.is_published ? '✅ Publie' : '⏳ Brouillon'}</td>
                        <td className="px-6 py-4 text-right text-sm"><button onClick={() => handleEditCareerGuide(cg)} className="text-primary-600 hover:text-primary-900 mr-4">✏️ Modifier</button><button onClick={() => handleDeleteCareerGuide(cg.id)} className="text-red-600 hover:text-red-900">🗑️ Supprimer</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        )}
      </main>
    </div>
  )
}

export default AdminDashboard

