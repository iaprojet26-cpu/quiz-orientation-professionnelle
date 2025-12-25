import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

/**
 * Composant pour afficher les articles SEO sur les CV
 */
function CVArticles() {
  const { t, i18n } = useTranslation()
  const language = i18n.language || 'fr'

  const articles = {
    fr: [
      {
        id: 1,
        title: 'Comment faire un CV quand on n\'a pas d\'expérience',
        slug: 'cv-sans-experience',
        excerpt: 'Découvrez comment créer un CV efficace même sans expérience professionnelle. Mettez en avant vos compétences, formations et projets personnels.',
        keywords: ['CV étudiant', 'premier CV', 'CV sans expérience', 'conseils CV']
      },
      {
        id: 2,
        title: 'CV étudiant : erreurs à éviter absolument',
        slug: 'erreurs-cv-etudiant',
        excerpt: 'Les 10 erreurs les plus courantes dans les CV étudiants et comment les éviter. Apprenez à créer un CV professionnel qui sort du lot.',
        keywords: ['erreurs CV', 'CV étudiant', 'conseils CV', 'CV professionnel']
      },
      {
        id: 3,
        title: 'Quelles compétences mettre sur un CV en 2024',
        slug: 'competences-cv-2024',
        excerpt: 'Guide complet des compétences à mettre sur votre CV selon votre domaine. Compétences techniques et soft skills essentielles.',
        keywords: ['compétences CV', 'soft skills', 'compétences techniques', 'CV moderne']
      },
      {
        id: 4,
        title: 'Objectif professionnel : exemples concrets et efficaces',
        slug: 'objectif-professionnel-exemples',
        excerpt: 'Découvrez comment rédiger un objectif professionnel percutant avec des exemples concrets adaptés à différents profils et secteurs.',
        keywords: ['objectif professionnel', 'exemples CV', 'rédaction CV', 'accroche CV']
      },
      {
        id: 5,
        title: 'CV et orientation : comment aligner votre CV avec votre profil',
        slug: 'cv-orientation-profil',
        excerpt: 'Apprenez à aligner votre CV avec votre profil d\'orientation professionnelle pour maximiser vos chances de décrocher le poste idéal.',
        keywords: ['orientation professionnelle', 'profil CV', 'CV personnalisé', 'quiz orientation']
      }
    ],
    en: [
      {
        id: 1,
        title: 'How to Make a CV When You Have No Experience',
        slug: 'cv-without-experience',
        excerpt: 'Discover how to create an effective CV even without professional experience. Highlight your skills, education and personal projects.',
        keywords: ['student CV', 'first CV', 'CV without experience', 'CV tips']
      },
      {
        id: 2,
        title: 'Student CV: Mistakes to Absolutely Avoid',
        slug: 'student-cv-mistakes',
        excerpt: 'The 10 most common mistakes in student CVs and how to avoid them. Learn to create a professional CV that stands out.',
        keywords: ['CV mistakes', 'student CV', 'CV tips', 'professional CV']
      },
      {
        id: 3,
        title: 'What Skills to Put on a CV in 2024',
        slug: 'cv-skills-2024',
        excerpt: 'Complete guide to skills to put on your CV according to your field. Essential technical and soft skills.',
        keywords: ['CV skills', 'soft skills', 'technical skills', 'modern CV']
      },
      {
        id: 4,
        title: 'Professional Objective: Concrete and Effective Examples',
        slug: 'professional-objective-examples',
        excerpt: 'Discover how to write a compelling professional objective with concrete examples adapted to different profiles and sectors.',
        keywords: ['professional objective', 'CV examples', 'CV writing', 'CV hook']
      },
      {
        id: 5,
        title: 'CV and Orientation: How to Align Your CV with Your Profile',
        slug: 'cv-orientation-profile',
        excerpt: 'Learn to align your CV with your professional orientation profile to maximize your chances of landing your ideal job.',
        keywords: ['career orientation', 'CV profile', 'personalized CV', 'orientation quiz']
      }
    ],
    ar: [
      {
        id: 1,
        title: 'كيفية إنشاء سيرة ذاتية بدون خبرة',
        slug: 'cv-bila-khibra',
        excerpt: 'اكتشف كيفية إنشاء سيرة ذاتية فعالة حتى بدون خبرة مهنية. أبرز مهاراتك وتكويناتك ومشاريعك الشخصية.',
        keywords: ['سيرة ذاتية طالب', 'أول سيرة ذاتية', 'سيرة ذاتية بدون خبرة', 'نصائح السيرة الذاتية']
      },
      {
        id: 2,
        title: 'السيرة الذاتية للطالب: أخطاء يجب تجنبها تمامًا',
        slug: 'akhta-cv-talib',
        excerpt: 'الأخطاء العشرة الأكثر شيوعًا في السير الذاتية للطلاب وكيفية تجنبها. تعلم إنشاء سيرة ذاتية مهنية تبرز.',
        keywords: ['أخطاء السيرة الذاتية', 'سيرة ذاتية طالب', 'نصائح السيرة الذاتية', 'سيرة ذاتية مهنية']
      },
      {
        id: 3,
        title: 'ما هي المهارات التي يجب وضعها في السيرة الذاتية لعام 2024',
        slug: 'maharat-cv-2024',
        excerpt: 'دليل شامل للمهارات التي يجب وضعها في سيرتك الذاتية حسب مجالك. المهارات التقنية والشخصية الأساسية.',
        keywords: ['مهارات السيرة الذاتية', 'المهارات الشخصية', 'المهارات التقنية', 'سيرة ذاتية حديثة']
      },
      {
        id: 4,
        title: 'الهدف المهني: أمثلة ملموسة وفعالة',
        slug: 'hadaf-mihani-amthila',
        excerpt: 'اكتشف كيفية كتابة هدف مهني مقنع بأمثلة ملموسة مناسبة لملفات وقطاعات مختلفة.',
        keywords: ['الهدف المهني', 'أمثلة السيرة الذاتية', 'كتابة السيرة الذاتية', 'جذب السيرة الذاتية']
      },
      {
        id: 5,
        title: 'السيرة الذاتية والتوجيه: كيفية محاذاة سيرتك الذاتية مع ملفك',
        slug: 'cv-tawjih-malaf',
        excerpt: 'تعلم محاذاة سيرتك الذاتية مع ملف التوجيه المهني الخاص بك لتعظيم فرصك في الحصول على الوظيفة المثالية.',
        keywords: ['التوجيه المهني', 'ملف السيرة الذاتية', 'سيرة ذاتية مخصصة', 'اختبار التوجيه']
      }
    ]
  }

  const currentArticles = articles[language] || articles.fr
  const langPrefix = ['fr', 'en', 'ar'].includes(language) ? `/${language}` : ''

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary-900 mb-4">
          {t('cv.articles.title', { defaultValue: 'Articles et conseils CV' })}
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          {t('cv.articles.subtitle', { 
            defaultValue: 'Découvrez nos guides pratiques pour créer un CV professionnel et efficace qui vous démarque.' 
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentArticles.map((article, index) => (
          <article
            key={article.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover-lift transition-all duration-300 animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              {/* Liens internes */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Link
                  to={`${langPrefix}/cv`}
                  className="text-xs px-3 py-1 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
                >
                  {t('cv.articles.tool_link', { defaultValue: 'Outil CV' })}
                </Link>
                <Link
                  to={`${langPrefix}/`}
                  className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {t('cv.articles.quiz_link', { defaultValue: 'Quiz Orientation' })}
                </Link>
              </div>

              <Link
                to={`${langPrefix}/blog/${article.slug}`}
                className="inline-block text-primary-600 font-semibold hover:text-primary-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                aria-label={`${t('cv.articles.read_more', { defaultValue: 'Lire la suite' })}: ${article.title}`}
              >
                {t('cv.articles.read_more', { defaultValue: 'Lire la suite →' })}
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* CTA vers le quiz */}
      <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">
          {t('cv.articles.cta_title', { 
            defaultValue: 'Optimisez votre CV avec votre profil d\'orientation' 
          })}
        </h3>
        <p className="text-lg mb-6 opacity-90">
          {t('cv.articles.cta_text', { 
            defaultValue: 'Découvrez votre profil professionnel et alignez votre CV pour maximiser vos chances de succès.' 
          })}
        </p>
        <Link
          to={`${langPrefix}/`}
          className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 hover-lift transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 min-h-[44px] flex items-center justify-center"
          aria-label={t('cv.articles.cta_button', { defaultValue: 'Découvrir mon profil d\'orientation' })}
        >
          {t('cv.articles.cta_button', { defaultValue: 'Découvrir mon profil' })}
        </Link>
      </div>
    </section>
  )
}

export default CVArticles


