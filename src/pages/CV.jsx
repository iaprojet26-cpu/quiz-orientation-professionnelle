import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'
import { Link } from 'react-router-dom'
import CVForm from '../components/CVBuilder/CVForm'
import CVPreview from '../components/CVBuilder/CVPreview'
import CVArticles from '../components/CVBuilder/CVArticles'
import JobPlatforms from '../components/CVBuilder/JobPlatforms'

function CV() {
  const { t, i18n } = useTranslation()
  const language = i18n.language || 'fr'
  const [showPreview, setShowPreview] = useState(false)
  const [cvData, setCvData] = useState(null)

  const handleFormComplete = (data) => {
    setCvData(data)
    setShowPreview(true)
  }

  const handleBackToForm = () => {
    setShowPreview(false)
    setCvData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead 
        page="cv"
        customTitle={t('cv.seo.title', { defaultValue: 'Créer un CV efficace selon ton profil | QuizOrientation' })}
        customDescription={t('cv.seo.description', { defaultValue: 'Créez un CV professionnel adapté à votre profil. Outil gratuit de structuration de CV avec conseils et exemples.' })}
      />
      
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Section Hero */}
        <section className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            {t('cv.hero.title', { defaultValue: 'Créer un CV efficace selon ton profil' })}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t('cv.hero.subtitle', { defaultValue: 'Structurez votre CV professionnel avec notre outil gratuit. Alignez votre CV avec votre profil d\'orientation pour maximiser vos chances.' })}
          </p>
        </section>

        {/* Section Outil CV */}
        <section className="mb-12">
          <div className="relative min-h-[400px]">
            {!showPreview ? (
              <div 
                key="form"
                className="animate-fadeIn"
              >
                <CVForm onComplete={handleFormComplete} />
              </div>
            ) : (
              <div 
                key="preview"
                className="animate-fadeIn"
              >
                <CVPreview 
                  formData={cvData} 
                  onEdit={handleBackToForm}
                />
              </div>
            )}
          </div>
        </section>

        {/* Section Articles CV */}
        <CVArticles />

        {/* Section Liens Emploi */}
        <JobPlatforms />

        {/* Disclaimer légal */}
        <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-8">
          <p className="text-sm text-gray-700">
            {t('cv.disclaimer', { defaultValue: '⚠️ Cet outil aide à structurer un CV mais ne remplace pas un accompagnement professionnel.' })}
          </p>
        </section>
      </main>
    </div>
  )
}

export default CV

