import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Quiz from './components/Quiz'
import Results from './components/Results'
import LanguageSelector from './components/LanguageSelector'

function App() {
  const { t } = useTranslation()
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizResults, setQuizResults] = useState(null)

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
      <div className="container mx-auto px-4 py-8">
        {/* Sélecteur de langue en haut à droite */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>

        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            {t('header.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t('header.subtitle')}
          </p>
        </header>

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

