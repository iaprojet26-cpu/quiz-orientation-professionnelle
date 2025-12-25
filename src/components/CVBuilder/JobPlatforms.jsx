import { useTranslation } from 'react-i18next'

/**
 * Composant pour afficher les liens vers les plateformes d'emploi
 * Tous les liens sont en nofollow et s'ouvrent dans un nouvel onglet
 */
function JobPlatforms() {
  const { t, i18n } = useTranslation()
  const language = i18n.language || 'fr'

  const platforms = {
    fr: [
      {
        name: 'Indeed',
        url: 'https://ma.indeed.com/',
        description: t('cv.job_platforms.indeed_desc', { defaultValue: 'Plateforme internationale avec de nombreuses offres au Maroc' }),
        icon: '💼'
      },
      {
        name: 'LinkedIn Jobs',
        url: 'https://www.linkedin.com/jobs/',
        description: t('cv.job_platforms.linkedin_desc', { defaultValue: 'Réseau professionnel avec des offres ciblées' }),
        icon: '🔗'
      },
      {
        name: 'Anapec',
        url: 'https://www.anapec.org/',
        description: t('cv.job_platforms.anapec_desc', { defaultValue: 'Agence nationale de promotion de l\'emploi et des compétences (Maroc)' }),
        icon: '🇲🇦'
      },
      {
        name: 'Reed',
        url: 'https://www.reed.co.uk/',
        description: t('cv.job_platforms.reed_desc', { defaultValue: 'Plateforme de recrutement avec des opportunités internationales' }),
        icon: '🌍'
      },
      {
        name: 'Bayt.com',
        url: 'https://www.bayt.com/fr/morocco/',
        description: t('cv.job_platforms.bayt_desc', { defaultValue: 'Plateforme d\'emploi leader au Moyen-Orient et en Afrique du Nord' }),
        icon: '🌐'
      },
      {
        name: 'Emploi.ma',
        url: 'https://www.emploi.ma/',
        description: t('cv.job_platforms.emploi_ma_desc', { defaultValue: 'Site d\'emploi spécialisé pour le marché marocain' }),
        icon: '📋'
      },
      {
        name: 'COP SPACE',
        url: 'https://copsm.space/candidature/',
        description: t('cv.job_platforms.copspace_desc', { defaultValue: 'Plateforme de candidature aux offres d\'emploi et de stage avec mise à jour automatique' }),
        icon: '🚀'
      }
    ],
    en: [
      {
        name: 'Indeed',
        url: 'https://ma.indeed.com/',
        description: t('cv.job_platforms.indeed_desc', { defaultValue: 'International platform with many job offers in Morocco' }),
        icon: '💼'
      },
      {
        name: 'LinkedIn Jobs',
        url: 'https://www.linkedin.com/jobs/',
        description: t('cv.job_platforms.linkedin_desc', { defaultValue: 'Professional network with targeted job offers' }),
        icon: '🔗'
      },
      {
        name: 'Anapec',
        url: 'https://www.anapec.org/',
        description: t('cv.job_platforms.anapec_desc', { defaultValue: 'National Agency for Employment and Skills Promotion (Morocco)' }),
        icon: '🇲🇦'
      },
      {
        name: 'Reed',
        url: 'https://www.reed.co.uk/',
        description: t('cv.job_platforms.reed_desc', { defaultValue: 'Recruitment platform with international opportunities' }),
        icon: '🌍'
      },
      {
        name: 'Bayt.com',
        url: 'https://www.bayt.com/en/morocco/',
        description: t('cv.job_platforms.bayt_desc', { defaultValue: 'Leading job platform in the Middle East and North Africa' }),
        icon: '🌐'
      },
      {
        name: 'Emploi.ma',
        url: 'https://www.emploi.ma/',
        description: t('cv.job_platforms.emploi_ma_desc', { defaultValue: 'Job site specialized for the Moroccan market' }),
        icon: '📋'
      },
      {
        name: 'COP SPACE',
        url: 'https://copsm.space/candidature/',
        description: t('cv.job_platforms.copspace_desc', { defaultValue: 'Job and internship application platform with automatic updates' }),
        icon: '🚀'
      }
    ],
    ar: [
      {
        name: 'Indeed',
        url: 'https://ma.indeed.com/',
        description: t('cv.job_platforms.indeed_desc', { defaultValue: 'منصة دولية مع العديد من العروض في المغرب' }),
        icon: '💼'
      },
      {
        name: 'LinkedIn Jobs',
        url: 'https://www.linkedin.com/jobs/',
        description: t('cv.job_platforms.linkedin_desc', { defaultValue: 'شبكة مهنية مع عروض عمل مستهدفة' }),
        icon: '🔗'
      },
      {
        name: 'Anapec',
        url: 'https://www.anapec.org/',
        description: t('cv.job_platforms.anapec_desc', { defaultValue: 'الوكالة الوطنية للنهوض بالتشغيل والكفاءات (المغرب)' }),
        icon: '🇲🇦'
      },
      {
        name: 'Reed',
        url: 'https://www.reed.co.uk/',
        description: t('cv.job_platforms.reed_desc', { defaultValue: 'منصة توظيف مع فرص دولية' }),
        icon: '🌍'
      },
      {
        name: 'Bayt.com',
        url: 'https://www.bayt.com/ar/morocco/',
        description: t('cv.job_platforms.bayt_desc', { defaultValue: 'منصة الوظائف الرائدة في الشرق الأوسط وشمال إفريقيا' }),
        icon: '🌐'
      },
      {
        name: 'Emploi.ma',
        url: 'https://www.emploi.ma/',
        description: t('cv.job_platforms.emploi_ma_desc', { defaultValue: 'موقع وظائف متخصص للسوق المغربي' }),
        icon: '📋'
      },
      {
        name: 'COP SPACE',
        url: 'https://copsm.space/candidature/',
        description: t('cv.job_platforms.copspace_desc', { defaultValue: 'منصة التقديم على الوظائف والتداريب مع تحديث تلقائي' }),
        icon: '🚀'
      }
    ]
  }

  const platformList = platforms[language] || platforms.fr

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-primary-900 mb-6 text-center">
        {t('cv.job_platforms.title', { defaultValue: 'Trouver des offres d\'emploi' })}
      </h2>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <p className="text-center text-gray-700 mb-6 text-lg">
          {t('cv.job_platforms.intro', { 
            defaultValue: 'Une fois votre CV prêt, explorez ces plateformes pour trouver des opportunités qui correspondent à votre profil. Ces liens vous redirigent vers les meilleures plateformes d\'emploi au Maroc et à l\'international.' 
          })}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformList.map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="block p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 hover:border-primary-400 hover:shadow-lg hover-lift transition-all duration-300 group animate-fadeIn focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              style={{ animationDelay: `${index * 0.1}s` }}
              aria-label={`${t('cv.job_platforms.visit', { defaultValue: 'Visiter' })} ${platform.name}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{platform.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {platform.description}
                  </p>
                  <div className="mt-3 flex items-center text-primary-600 text-sm font-medium">
                    <span>{t('cv.job_platforms.visit', { defaultValue: 'Visiter' })}</span>
                    <svg 
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <p className="text-sm text-gray-700">
            <strong className="text-blue-800">
              {t('cv.job_platforms.tip_title', { defaultValue: '💡 Conseil :' })}
            </strong>{' '}
            {t('cv.job_platforms.tip', { 
              defaultValue: 'Créez des alertes emploi sur ces plateformes pour être notifié des nouvelles offres correspondant à votre profil. Personnalisez votre CV selon chaque offre pour maximiser vos chances.' 
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default JobPlatforms

