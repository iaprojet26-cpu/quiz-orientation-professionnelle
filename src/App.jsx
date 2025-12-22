import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home' // Home doit être chargé immédiatement (page principale)
import { isAdminAuthenticated } from './services/adminService'
import { useTranslation } from 'react-i18next'

// Lazy loading pour les pages secondaires uniquement
const BlogList = lazy(() => import('./pages/BlogList'))
const BlogArticle = lazy(() => import('./pages/BlogArticle'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'))
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'))
const APropos = lazy(() => import('./pages/APropos'))
const Contact = lazy(() => import('./pages/Contact'))
const TopMetiersFutur = lazy(() => import('./pages/TopMetiersFutur'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

// Composant de chargement minimal
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Chargement...</p>
    </div>
  </div>
)

// Composant pour protéger la route admin
function ProtectedAdminRoute({ children }) {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

function App() {
  const { i18n } = useTranslation()
  const location = useLocation()

  // Détecter le préfixe de langue dans l'URL
  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean)
    if (pathParts.length > 0 && ['fr', 'en', 'ar'].includes(pathParts[0])) {
      const lang = pathParts[0]
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang)
      }
    }
  }, [location.pathname, i18n])

  return (
    <>
      <Header />
      <Routes>
        {/* Routes principales */}
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Navigate to="/" replace />} />
        <Route path="/fr" element={<Navigate to="/" replace />} />
        <Route 
          path="/blog" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <BlogList />
            </Suspense>
          } 
        />
        <Route 
          path="/blog/:slug" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <BlogArticle />
            </Suspense>
          } 
        />
        <Route 
          path="/mentions-legales" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <MentionsLegales />
            </Suspense>
          } 
        />
        <Route 
          path="/politique-confidentialite" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PolitiqueConfidentialite />
            </Suspense>
          } 
        />
        <Route 
          path="/a-propos" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <APropos />
            </Suspense>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Contact />
            </Suspense>
          } 
        />
        <Route 
          path="/top-metiers-futur" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <TopMetiersFutur />
            </Suspense>
          } 
        />
        <Route 
          path="/admin/login" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AdminLogin />
            </Suspense>
          } 
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            </Suspense>
          }
        />
        {/* Support des préfixes de langue pour le SEO */}
        <Route path="/:lang" element={<Home />} />
        <Route 
          path="/:lang/blog" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <BlogList />
            </Suspense>
          } 
        />
        <Route 
          path="/:lang/blog/:slug" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <BlogArticle />
            </Suspense>
          } 
        />
        <Route 
          path="/:lang/mentions-legales" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <MentionsLegales />
            </Suspense>
          } 
        />
        <Route 
          path="/:lang/politique-confidentialite" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PolitiqueConfidentialite />
            </Suspense>
          } 
        />
        <Route 
          path="/:lang/a-propos" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <APropos />
            </Suspense>
          } 
        />
        <Route 
          path="/:lang/contact" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Contact />
            </Suspense>
          } 
        />
        <Route 
          path="/:lang/top-metiers-futur" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <TopMetiersFutur />
            </Suspense>
          } 
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App

