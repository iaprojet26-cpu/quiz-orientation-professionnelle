import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Quiz from './components/Quiz'
import Results from './components/Results'
import LanguageSelector from './components/LanguageSelector'
import SEOHead from './components/SEOHead'
import { getHomepageContent } from './services/seoService'

function App() {
  const { t, i18n } = useTranslation()
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizResults, setQuizResults] = useState(null)
  const [seoContent, setSeoContent] = useState(getHomepageContent(i18n.language || 'fr'))
  
  // Mettre à jour le contenu SEO quand la langue change
  useEffect(() => {
    setSeoContent(getHomepageContent(i18n.language || 'fr'))
  }, [i18n.language])

  const handleQuizComplete = (results) => {
    setQuizResults(results)
    setQuizCompleted(true)
  }

  const handleRestart = () => {
    setQuizCompleted(false)
    setQuizResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Gestion des meta tags SEO dynamiques */}
      <SEOHead 
        page={quizCompleted ? 'result' : 'homepage'} 
        profileName={quizResults?.profile?.nom || ''} 
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Sélecteur de langue en haut à droite */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>

        {!quizCompleted && (
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              {seoContent.h1}
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
              {t('header.subtitle')}
            </p>
            
            {/* Contenu SEO supplémentaire - Multilingue */}
            <div className={`max-w-3xl mx-auto mt-8 text-left space-y-4 text-gray-700 ${i18n.language === 'ar' ? 'rtl' : ''}`}>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="mb-4">
                  {seoContent.intro1}
                </p>
                <p className="mb-4">
                  {seoContent.intro2}
                </p>
                <h2 className="text-2xl font-bold text-primary-900 mb-3 mt-6">{seoContent.whyTitle}</h2>
                <p className="mb-4">
                  {seoContent.whyText}
                </p>
                <h2 className="text-2xl font-bold text-primary-900 mb-3 mt-6">{seoContent.howTitle}</h2>
                <p>
                  {seoContent.howText}
                </p>
              </div>
            </div>
          </header>
        )}

        {!quizCompleted ? (
          <Quiz onComplete={handleQuizComplete} />
        ) : (
          <Results results={quizResults} onRestart={handleRestart} />
        )}
      </div>
    </div>
  )
}

export default App

