import { useTranslation } from 'react-i18next'
import OptimizedImage from '../../OptimizedImage'

/**
 * Template 2 - Classique avec barre latérale
 */
function Template2({ structuredCV, language }) {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
      {/* Barre latérale */}
      <div className="w-1/4 bg-gray-800 text-white p-6">
        {/* Photo */}
        <div className="mb-6 flex justify-center">
          {structuredCV.personalInfo.photo ? (
            <OptimizedImage 
              src={structuredCV.personalInfo.photo} 
              alt={structuredCV.personalInfo.fullName}
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
              lazy={false}
            />
          ) : (
            <div className="w-32 h-32 bg-gray-700 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-5xl">👤</span>
            </div>
          )}
        </div>

        {/* Nom et titre */}
        <h1 className="text-2xl font-bold mb-2 text-center">
          {structuredCV.personalInfo.fullName || t('cv.preview.name_placeholder', { defaultValue: 'Nom Prénom' })}
        </h1>
        {structuredCV.cvTitle && (
          <p className="text-sm text-gray-300 mb-6 text-center">
            {structuredCV.cvTitle}
          </p>
        )}

        {/* Contact */}
        <div className="space-y-3 text-sm">
          {structuredCV.personalInfo.email && (
            <div>
              <p className="text-gray-400 text-xs mb-1">Email</p>
              <p className="break-words">{structuredCV.personalInfo.email}</p>
            </div>
          )}
          {structuredCV.personalInfo.phone && (
            <div>
              <p className="text-gray-400 text-xs mb-1">Téléphone</p>
              <p>{structuredCV.personalInfo.phone}</p>
            </div>
          )}
          {(structuredCV.personalInfo.city || structuredCV.personalInfo.neighborhood) && (
            <div>
              <p className="text-gray-400 text-xs mb-1">Localisation</p>
              <p>
                {structuredCV.personalInfo.city}
                {structuredCV.personalInfo.neighborhood && `, ${structuredCV.personalInfo.neighborhood}`}
              </p>
            </div>
          )}
          {structuredCV.personalInfo.linkedin && (
            <div>
              <p className="text-gray-400 text-xs mb-1">LinkedIn</p>
              <a 
                href={structuredCV.personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline break-words"
              >
                {structuredCV.personalInfo.linkedin}
              </a>
            </div>
          )}
        </div>

        {/* Compétences Techniques */}
        {structuredCV.technicalSkills && structuredCV.technicalSkills.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-3 border-b border-gray-600 pb-2">
              {language === 'fr' ? 'Compétences Techniques' : language === 'en' ? 'Technical Skills' : 'المهارات التقنية'}
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {structuredCV.technicalSkills.slice(0, 5).map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Compétences Informatiques */}
        {structuredCV.itSkills && structuredCV.itSkills.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-3 border-b border-gray-600 pb-2">
              {language === 'fr' ? 'Compétences IT' : language === 'en' ? 'IT Skills' : 'المهارات المعلوماتية'}
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {structuredCV.itSkills.slice(0, 5).map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Langues */}
        {(structuredCV.languages?.arabic || structuredCV.languages?.french || structuredCV.languages?.english) && (
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-3 border-b border-gray-600 pb-2">
              {language === 'fr' ? 'Langues' : language === 'en' ? 'Languages' : 'اللغات'}
            </h3>
            <div className="space-y-2 text-sm">
              {structuredCV.languages.arabic && (
                <p>{t('cv.form.arabic', { defaultValue: 'Arabe' })} : {structuredCV.languages.arabic.level}</p>
              )}
              {structuredCV.languages.french && (
                <p>{t('cv.form.french', { defaultValue: 'Français' })} : {structuredCV.languages.french.level}</p>
              )}
              {structuredCV.languages.english && (
                <p>{t('cv.form.english', { defaultValue: 'Anglais' })} : {structuredCV.languages.english.level}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-8 space-y-6">
        {/* Profil */}
        {structuredCV.profile && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-300">
              {language === 'fr' ? 'Profil' : language === 'en' ? 'Profile' : 'الملف الشخصي'}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {structuredCV.profile}
            </p>
          </section>
        )}

        {/* Formation */}
        {structuredCV.diplomas && structuredCV.diplomas.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-300">
              {language === 'fr' ? 'Formation' : language === 'en' ? 'Education' : 'التعليم'}
            </h2>
            <div className="space-y-4">
              {structuredCV.diplomas.map((diploma, index) => (
                <div key={index}>
                  <p className="font-semibold text-gray-800">
                    {diploma.diploma} - {diploma.institution}
                  </p>
                  <p className="text-sm text-gray-600">
                    {diploma.year} {diploma.mention && `| ${diploma.mention}`}
                  </p>
                  {diploma.pfeSubject && (
                    <p className="text-sm text-gray-600 mt-1">
                      PFE : {diploma.pfeSubject}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {structuredCV.certifications && structuredCV.certifications.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-300">
              {language === 'fr' ? 'Certifications' : language === 'en' ? 'Certifications' : 'الشهادات'}
            </h2>
            <div className="space-y-2">
              {structuredCV.certifications.map((cert, index) => (
                <div key={index}>
                  <p className="font-semibold text-gray-800">{cert.name}</p>
                  <p className="text-sm text-gray-600">{cert.organization} - {cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Expériences */}
        {structuredCV.professionalExperiences && structuredCV.professionalExperiences.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-300">
              {language === 'fr' ? 'Expériences Professionnelles' : language === 'en' ? 'Professional Experience' : 'الخبرات المهنية'}
            </h2>
            <div className="space-y-4">
              {structuredCV.professionalExperiences.map((exp, index) => (
                <div key={index}>
                  <p className="font-semibold text-gray-800">
                    {exp.position} - {exp.company}
                  </p>
                  <p className="text-sm text-gray-600">{exp.period} | {exp.city}</p>
                  {exp.missions && exp.missions.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
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

        {/* Expériences Extra */}
        {(structuredCV.extraProfessional?.projects?.length > 0 || structuredCV.extraProfessional?.associations?.length > 0) && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-300">
              {language === 'fr' ? 'Expériences Extra-professionnelles' : language === 'en' ? 'Extracurricular' : 'الخبرات اللامنهجية'}
            </h2>
            {structuredCV.extraProfessional?.projects?.length > 0 && (
              <div className="mb-4">
                {structuredCV.extraProfessional.projects.map((project, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-semibold text-gray-800">{project.name}</p>
                    <p className="text-sm text-gray-600">{project.role} - {project.date}</p>
                  </div>
                ))}
              </div>
            )}
            {structuredCV.extraProfessional?.associations?.length > 0 && (
              <div>
                {structuredCV.extraProfessional.associations.map((assoc, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-semibold text-gray-800">{assoc.organization}</p>
                    <p className="text-sm text-gray-600">{assoc.role} - {assoc.period}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Centres d'intérêt */}
        {structuredCV.interests && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-300">
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

export default Template2

