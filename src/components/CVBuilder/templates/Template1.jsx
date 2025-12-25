import { useTranslation } from 'react-i18next'
import OptimizedImage from '../../OptimizedImage'

/**
 * Template 1 - Moderne avec gradient bleu
 */
function Template1({ structuredCV, language }) {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* En-tête CV avec photo */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Photo */}
          <div className="flex-shrink-0">
            {structuredCV.personalInfo.photo ? (
              <OptimizedImage 
                src={structuredCV.personalInfo.photo} 
                alt={structuredCV.personalInfo.fullName}
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
                lazy={false}
              />
            ) : (
              <div className="w-32 h-32 bg-white/20 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-5xl">👤</span>
              </div>
            )}
          </div>
          
          {/* Informations personnelles */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {structuredCV.personalInfo.fullName || t('cv.preview.name_placeholder', { defaultValue: 'Nom Prénom' })}
            </h1>
            {structuredCV.cvTitle && (
              <p className="text-xl text-primary-100 mb-4">
                {structuredCV.cvTitle}
              </p>
            )}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
              {structuredCV.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span>{structuredCV.personalInfo.email}</span>
                </div>
              )}
              {structuredCV.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>{structuredCV.personalInfo.phone}</span>
                </div>
              )}
              {(structuredCV.personalInfo.city || structuredCV.personalInfo.neighborhood) && (
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>
                    {structuredCV.personalInfo.city}
                    {structuredCV.personalInfo.neighborhood && ` (${structuredCV.personalInfo.neighborhood})`}
                  </span>
                </div>
              )}
              {structuredCV.personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <span>💼</span>
                  <a 
                    href={structuredCV.personalInfo.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-primary-100"
                  >
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu CV */}
      <div className="p-8 space-y-8">
        {/* Message d'Accroche / Profil */}
        {structuredCV.profile && (
          <section>
            <h2 className="text-xl font-bold text-primary-700 mb-3 pb-2 border-b-2 border-primary-200">
              {language === 'fr' ? 'Profil' : language === 'en' ? 'Profile' : 'الملف الشخصي'}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {structuredCV.profile}
            </p>
          </section>
        )}

        {/* Formation Diplômante */}
        {structuredCV.diplomas && structuredCV.diplomas.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary-700 mb-3 pb-2 border-b-2 border-primary-200">
              {language === 'fr' ? 'Formation Diplômante' : language === 'en' ? 'Diploma Education' : 'التعليم الدبلومي'}
            </h2>
            <div className="space-y-4">
              {structuredCV.diplomas.map((diploma, index) => (
                <div key={index} className="border-l-4 border-primary-400 pl-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <div>
                      {diploma.level && (
                        <p className="font-semibold text-gray-800">
                          {diploma.level}
                          {diploma.diploma && ` - ${diploma.diploma}`}
                        </p>
                      )}
                      {diploma.institution && (
                        <p className="text-primary-600 font-medium">
                          {diploma.institution}
                        </p>
                      )}
                    </div>
                    {diploma.year && (
                      <span className="text-sm text-gray-500 mt-1 md:mt-0">
                        {diploma.year}
                      </span>
                    )}
                  </div>
                  {diploma.mention && (
                    <p className="text-sm text-gray-600">
                      {language === 'fr' ? 'Mention : ' : language === 'en' ? 'Mention : ' : 'الإشارة : '}
                      <span className="font-medium">{diploma.mention}</span>
                    </p>
                  )}
                  {diploma.pfeSubject && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">
                        {language === 'fr' ? 'PFE : ' : language === 'en' ? 'Final Project : ' : 'مشروع نهاية الدراسة : '}
                      </span>
                      {diploma.pfeSubject}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formation Certifiante */}
        {structuredCV.certifications && structuredCV.certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary-700 mb-3 pb-2 border-b-2 border-primary-200">
              {language === 'fr' ? 'Formation Certifiante' : language === 'en' ? 'Certifications' : 'الشهادات'}
            </h2>
            <div className="space-y-4">
              {structuredCV.certifications.map((cert, index) => (
                <div key={index} className="border-l-4 border-blue-300 pl-4">
                  <p className="text-gray-800 font-semibold">
                    {cert.name} ({cert.date})
                  </p>
                  <p className="text-gray-700 text-sm">
                    {cert.organization}
                  </p>
                  {cert.link && (
                    <p className="text-gray-600 text-xs">
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {t('cv.preview.view_certificate', { defaultValue: 'Voir le certificat' })}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Expériences professionnelles */}
        {structuredCV.professionalExperiences && structuredCV.professionalExperiences.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary-700 mb-3 pb-2 border-b-2 border-primary-200">
              {language === 'fr' ? 'Expériences Professionnelles' : language === 'en' ? 'Professional Experience' : 'الخبرات المهنية'}
            </h2>
            <div className="space-y-4">
              {structuredCV.professionalExperiences.map((exp, index) => (
                <div key={index} className="border-l-4 border-green-300 pl-4">
                  <p className="text-gray-800 font-semibold">
                    {exp.position} {exp.company && `chez ${exp.company}`} {exp.city && `(${exp.city})`}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {exp.period} {exp.type && `(${exp.type})`}
                  </p>
                  {exp.missions && exp.missions.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
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

        {/* Expériences Extra-professionnelles */}
        {(structuredCV.extraProfessional?.projects?.length > 0 || structuredCV.extraProfessional?.associations?.length > 0) && (
          <section>
            <h2 className="text-xl font-bold text-primary-700 mb-3 pb-2 border-b-2 border-primary-200">
              {language === 'fr' ? 'Expériences Extra-professionnelles' : language === 'en' ? 'Extracurricular Experience' : 'الخبرات اللامنهجية'}
            </h2>
            {structuredCV.extraProfessional?.projects?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {language === 'fr' ? 'Projets et Compétitions' : language === 'en' ? 'Projects and Competitions' : 'المشاريع والمسابقات'}
                </h3>
                <div className="space-y-2">
                  {structuredCV.extraProfessional.projects.map((project, index) => (
                    <div key={index} className="border-l-2 border-purple-200 pl-3">
                      <p className="text-gray-800 font-medium">{project.name} {project.type && `(${project.type})`}</p>
                      <p className="text-gray-700 text-sm">{project.role} {project.date && `- ${project.date}`}</p>
                      {project.ranking && <p className="text-gray-600 text-xs">{t('cv.preview.ranking', { defaultValue: 'Classement' })} : {project.ranking}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {structuredCV.extraProfessional?.associations?.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {language === 'fr' ? 'Associations et Bénévolat' : language === 'en' ? 'Associations and Volunteering' : 'الجمعيات والتطوع'}
                </h3>
                <div className="space-y-2">
                  {structuredCV.extraProfessional.associations.map((assoc, index) => (
                    <div key={index} className="border-l-2 border-purple-200 pl-3">
                      <p className="text-gray-800 font-medium">{assoc.organization}</p>
                      <p className="text-gray-700 text-sm">{assoc.role} {assoc.period && `- ${assoc.period}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Compétences Techniques */}
        {structuredCV.technicalSkills && structuredCV.technicalSkills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary-700 mb-3 pb-2 border-b-2 border-primary-200">
              {language === 'fr' ? 'Compétences Techniques (Hard Skills)' : language === 'en' ? 'Technical Skills (Hard Skills)' : 'المهارات التقنية'}
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {structuredCV.technicalSkills.map((skill, index) => (
                <li key={index} className="leading-relaxed">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Compétences Informatiques */}
        {structuredCV.itSkills && structuredCV.itSkills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary-700 mb-3 pb-2 border-b-2 border-primary-200">
              {language === 'fr' ? 'Compétences Informatiques' : language === 'en' ? 'IT Skills' : 'المهارات المعلوماتية'}
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {structuredCV.itSkills.map((skill, index) => (
                <li key={index} className="leading-relaxed">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Compétences Managériales */}
        {structuredCV.softSkills && structuredCV.softSkills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary-700 mb-3 pb-2 border-b-2 border-primary-200">
              {language === 'fr' ? 'Compétences Managériales (Soft Skills)' : language === 'en' ? 'Managerial Skills (Soft Skills)' : 'المهارات الإدارية'}
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {structuredCV.softSkills.map((skill, index) => (
                <li key={index} className="leading-relaxed">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Compétences Linguistiques */}
        {(structuredCV.languages?.arabic || structuredCV.languages?.french || structuredCV.languages?.english) && (
          <section>
            <h2 className="text-xl font-bold text-primary-700 mb-3 pb-2 border-b-2 border-primary-200">
              {language === 'fr' ? 'Compétences Linguistiques' : language === 'en' ? 'Language Skills' : 'المهارات اللغوية'}
            </h2>
            <div className="space-y-2">
              {structuredCV.languages.arabic && (
                <p className="text-gray-700">
                  <span className="font-semibold">{t('cv.form.arabic', { defaultValue: 'Arabe' })}</span> : {structuredCV.languages.arabic.level}
                  {structuredCV.languages.arabic.classical && ` (${t('cv.form.classical_arabic', { defaultValue: 'Arabe classique' })})`}
                </p>
              )}
              {structuredCV.languages.french && (
                <p className="text-gray-700">
                  <span className="font-semibold">{t('cv.form.french', { defaultValue: 'Français' })}</span> : {structuredCV.languages.french.level}
                </p>
              )}
              {structuredCV.languages.english && (
                <p className="text-gray-700">
                  <span className="font-semibold">{t('cv.form.english', { defaultValue: 'Anglais' })}</span> : {structuredCV.languages.english.level}
                  {structuredCV.languages.english.score && ` (${structuredCV.languages.english.score})`}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Centres d'intérêt */}
        {structuredCV.interests && (
          <section>
            <h2 className="text-xl font-bold text-primary-700 mb-3 pb-2 border-b-2 border-primary-200">
              {language === 'fr' ? 'Loisirs et Centres d\'Intérêt' : language === 'en' ? 'Hobbies and Interests' : 'الهوايات والاهتمامات'}
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

export default Template1

