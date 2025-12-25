import { useTranslation } from 'react-i18next'
import OptimizedImage from '../../OptimizedImage'

/**
 * Template 3 - Minimaliste avec bordures colorées
 */
function Template3({ structuredCV, language }) {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* En-tête minimaliste */}
      <div className="border-l-4 border-green-500 p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Photo */}
          <div className="flex-shrink-0">
            {structuredCV.personalInfo.photo ? (
              <OptimizedImage 
                src={structuredCV.personalInfo.photo} 
                alt={structuredCV.personalInfo.fullName}
                className="w-28 h-28 object-cover rounded-lg border-2 border-green-500"
                lazy={false}
              />
            ) : (
              <div className="w-28 h-28 bg-gray-100 rounded-lg border-2 border-green-500 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
            )}
          </div>
          
          {/* Informations */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {structuredCV.personalInfo.fullName || t('cv.preview.name_placeholder', { defaultValue: 'Nom Prénom' })}
            </h1>
            {structuredCV.cvTitle && (
              <p className="text-lg text-gray-600 mb-4">
                {structuredCV.cvTitle}
              </p>
            )}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start text-sm text-gray-600">
              {structuredCV.personalInfo.email && <span>{structuredCV.personalInfo.email}</span>}
              {structuredCV.personalInfo.phone && <span>• {structuredCV.personalInfo.phone}</span>}
              {structuredCV.personalInfo.city && (
                <span>• {structuredCV.personalInfo.city}{structuredCV.personalInfo.neighborhood && `, ${structuredCV.personalInfo.neighborhood}`}</span>
              )}
              {structuredCV.personalInfo.linkedin && (
                <span>• <a href={structuredCV.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">LinkedIn</a></span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-8 space-y-6">
        {structuredCV.profile && (
          <section className="border-l-4 border-green-500 pl-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {language === 'fr' ? 'Profil' : language === 'en' ? 'Profile' : 'الملف الشخصي'}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {structuredCV.profile}
            </p>
          </section>
        )}

        {structuredCV.diplomas && structuredCV.diplomas.length > 0 && (
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {language === 'fr' ? 'Formation' : language === 'en' ? 'Education' : 'التعليم'}
            </h2>
            <div className="space-y-3">
              {structuredCV.diplomas.map((diploma, index) => (
                <div key={index}>
                  <p className="font-semibold text-gray-800">{diploma.diploma}</p>
                  <p className="text-sm text-gray-600">{diploma.institution} | {diploma.year}</p>
                  {diploma.mention && <p className="text-xs text-gray-500">Mention: {diploma.mention}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {structuredCV.professionalExperiences && structuredCV.professionalExperiences.length > 0 && (
          <section className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {language === 'fr' ? 'Expériences' : language === 'en' ? 'Experience' : 'الخبرات'}
            </h2>
            <div className="space-y-3">
              {structuredCV.professionalExperiences.map((exp, index) => (
                <div key={index}>
                  <p className="font-semibold text-gray-800">{exp.position} - {exp.company}</p>
                  <p className="text-sm text-gray-600">{exp.period} | {exp.city}</p>
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
            <section className="border-l-4 border-orange-500 pl-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
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
            <section className="border-l-4 border-red-500 pl-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
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
          <section className="border-l-4 border-yellow-500 pl-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
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

export default Template3

