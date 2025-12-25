import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { structureCV, generateImprovementMessage, formatCVAsText, downloadWordCV, downloadPDFCV } from '../../services/cvService'
import Template1 from './templates/Template1'
import Template2 from './templates/Template2'
import Template3 from './templates/Template3'
import Template4 from './templates/Template4'

/**
 * Composant pour afficher l'aperçu du CV structuré avec design professionnel
 */
function CVPreview({ formData, onEdit }) {
  const { t, i18n } = useTranslation()
  const language = i18n.language || 'fr'
  const cvRef = useRef(null) // Référence pour l'export PDF
  const langPrefix = ['fr', 'en', 'ar'].includes(language) && language !== 'fr' ? `/${language}` : ''
  
  // Structurer les données CV
  const structuredCV = structureCV(formData, language)
  const improvementMessage = generateImprovementMessage(structuredCV, language)
  
  // Sélectionner le template
  const selectedTemplate = formData.template || 'template1'
  
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'template1':
        return <Template1 structuredCV={structuredCV} language={language} />
      case 'template2':
        return <Template2 structuredCV={structuredCV} language={language} />
      case 'template3':
        return <Template3 structuredCV={structuredCV} language={language} />
      case 'template4':
        return <Template4 structuredCV={structuredCV} language={language} />
      default:
        return <Template1 structuredCV={structuredCV} language={language} />
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec message d'amélioration */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {t('cv.preview.title', { defaultValue: 'Aperçu de votre CV' })}
          </h2>
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 hover-lift transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label={t('cv.preview.edit', { defaultValue: 'Modifier le CV' })}
          >
            {t('cv.preview.edit', { defaultValue: 'Modifier' })}
          </button>
        </div>
        
        {/* Message d'amélioration */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4">
          <p className="text-sm text-gray-700">
            {improvementMessage}
          </p>
        </div>

        {/* CTA vers le quiz */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3">
            {t('cv.preview.cta_text', { 
              defaultValue: '💡 Ton CV est plus efficace quand il est aligné avec ton profil. Découvre ton profil d\'orientation pour optimiser ton CV.' 
            })}
          </p>
          <Link 
            to={`${langPrefix}/`}
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 hover-lift transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={t('cv.preview.cta_quiz', { defaultValue: 'Découvrir mon profil d\'orientation' })}
          >
            {t('cv.preview.cta_quiz', { defaultValue: 'Découvre ton profil d\'orientation' })}
          </Link>
        </div>
      </div>

      {/* CV Professionnel - Template sélectionné */}
      <div ref={cvRef}>
        {renderTemplate()}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onEdit}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 hover-lift transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label={t('cv.preview.back', { defaultValue: 'Retour au formulaire' })}
          >
            {t('cv.preview.back', { defaultValue: 'Modifier le formulaire' })}
          </button>
          <button
            onClick={async () => {
              try {
                await downloadWordCV(structuredCV, language)
              } catch (error) {
                alert(t('cv.preview.export_error', { 
                  defaultValue: 'Erreur lors du téléchargement. Veuillez réessayer.' 
                }))
              }
            }}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 hover-lift transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label={t('cv.preview.export_word', { defaultValue: 'Télécharger en Word' })}
          >
            {t('cv.preview.export_word', { defaultValue: 'Télécharger en Word' })}
          </button>
          <button
            onClick={async () => {
              try {
                if (cvRef.current) {
                  await downloadPDFCV(cvRef.current, structuredCV.personalInfo.fullName)
                } else {
                  alert(t('cv.preview.export_error', { 
                    defaultValue: 'Erreur lors du téléchargement. Veuillez réessayer.' 
                  }))
                }
              } catch (error) {
                alert(t('cv.preview.export_error', { 
                  defaultValue: 'Erreur lors du téléchargement. Veuillez réessayer.' 
                }))
              }
            }}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 hover-lift transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={t('cv.preview.export_pdf', { defaultValue: 'Télécharger en PDF' })}
          >
            {t('cv.preview.export_pdf', { defaultValue: 'Télécharger en PDF' })}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CVPreview
