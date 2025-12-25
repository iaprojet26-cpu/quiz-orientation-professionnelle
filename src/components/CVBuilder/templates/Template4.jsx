import { useTranslation } from 'react-i18next'
import OptimizedImage from '../../OptimizedImage'

/**
 * Template 4 - Créatif avec sections colorées
 */
function Template4({ structuredCV, language }) {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* En-tête créatif */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Photo */}
          <div className="flex-shrink-0">
            {structuredCV.personalInfo.photo ? (
              <OptimizedImage 
                src={structuredCV.personalInfo.photo} 
                alt={structuredCV.personalInfo.fullName}
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl"
                lazy={false}
              />
            ) : (
              <div className="w-32 h-32 bg-white/20 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                <span className="text-5xl">👤</span>
              </div>
            )}
          </div>
          
          {/* Informations */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
              {structuredCV.personalInfo.fullName || t('cv.preview.name_placeholder', { defaultValue: 'Nom Prénom' })}
            </h1>
            {structuredCV.cvTitle && (
              <p className="text-xl text-white/90 mb-4">
                {structuredCV.cvTitle}
              </p>
            )}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              {structuredCV.personalInfo.email && <span>📧 {structuredCV.personalInfo.email}</span>}
              {structuredCV.personalInfo.phone && <span>📱 {structuredCV.personalInfo.phone}</span>}
              {structuredCV.personalInfo.city && <span>📍 {structuredCV.personalInfo.city}</span>}
              {structuredCV.personalInfo.linkedin && (
                <span>💼 <a href={structuredCV.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a></span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu avec sections colorées */}
      <div className="p-8 space-y-6">
        {structuredCV.profile && (
          <section className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
            <h2 className="text-xl font-bold text-purple-800 mb-3">
              {language === 'fr' ? 'Profil' : language === 'en' ? 'Profile' : 'الملف الشخصي'}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {structuredCV.profile}
            </p>
          </section>
        )}

        {structuredCV.diplomas && structuredCV.diplomas.length > 0 && (
          <section className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
            <h2 className="text-xl font-bold text-blue-800 mb-3">
              {language === 'fr' ? 'Formation' : language === 'en' ? 'Education' : 'التعليم'}
            </h2>
            <div className="space-y-3">
              {structuredCV.diplomas.map((diploma, index) => (
                <div key={index} className="bg-white rounded p-3">
                  <p className="font-semibold text-gray-800">{diploma.diploma}</p>
                  <p className="text-sm text-gray-600">{diploma.institution} | {diploma.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {structuredCV.professionalExperiences && structuredCV.professionalExperiences.length > 0 && (
          <section className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-green-800 mb-3">
              {language === 'fr' ? 'Expériences' : language === 'en' ? 'Experience' : 'الخبرات'}
            </h2>
            <div className="space-y-3">
              {structuredCV.professionalExperiences.map((exp, index) => (
                <div key={index} className="bg-white rounded p-3">
                  <p className="font-semibold text-gray-800">{exp.position} - {exp.company}</p>
                  <p className="text-sm text-gray-600">{exp.period}</p>
                  {exp.missions && exp.missions.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                      {exp.missions.map((mission, mIndex) => (
                        <li key={mIndex}>{mission}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {structuredCV.technicalSkills && structuredCV.technicalSkills.length > 0 && (
            <section className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
              <h2 className="text-lg font-bold text-orange-800 mb-3">
                {language === 'fr' ? 'Compétences Techniques' : language === 'en' ? 'Technical Skills' : 'المهارات التقنية'}
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {structuredCV.technicalSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {structuredCV.itSkills && structuredCV.itSkills.length > 0 && (
            <section className="bg-pink-50 rounded-lg p-6 border-l-4 border-pink-500">
              <h2 className="text-lg font-bold text-pink-800 mb-3">
                {language === 'fr' ? 'Compétences IT' : language === 'en' ? 'IT Skills' : 'المهارات المعلوماتية'}
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {structuredCV.itSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {structuredCV.interests && (
          <section className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
            <h2 className="text-xl font-bold text-yellow-800 mb-3">
              {language === 'fr' ? 'Centres d\'intérêt' : language === 'en' ? 'Interests' : 'الاهتمامات'}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {structuredCV.interests}
            </p>
          </section>
        )}
      </div>
    </div>
  )
}

export default Template4

