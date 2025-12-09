import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home' // Home doit être chargé immédiatement (page principale)
import { isAdminAuthenticated } from './services/adminService'

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
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/top-metiers-futur" element={<TopMetiersFutur />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App

