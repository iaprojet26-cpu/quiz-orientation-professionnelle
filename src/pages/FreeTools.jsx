import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

function FreeTools() {
  const { i18n } = useTranslation()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  const langPrefix = language === 'fr' ? '' : `/${language}`

  const text = {
    fr: {
      h1: 'Outils gratuits',
      intro: 'CV builder, outils de preparation et ressources gratuites pour renforcer votre employabilite.',
      cta: 'Construire mon CV',
      toolsTitle: 'Boite a outils employabilite',
      tools: [
        {
          title: 'CV Builder',
          desc: 'Creez un CV propre et telechargeable en quelques minutes.',
          link: '/cv',
          cta: 'Ouvrir le CV Builder'
        },
        {
          title: 'Generateur de lettre de motivation',
          desc: 'Generez une lettre adaptee a l offre et a votre profil.',
          link: '/tools/cover-letter',
          cta: 'Ouvrir le generateur'
        },
        {
          title: 'Preparation entretien',
          desc: 'Entrainez-vous avec des questions types et des reponses structurees.',
          link: '/tools/interview-prep',
          cta: 'Ouvrir l outil'
        },
        {
          title: 'ATS CV Score',
          desc: 'Comparez votre CV a une offre et identifiez les mots-cles manquants.',
          link: '/tools/ats-score',
          cta: 'Analyser mon CV'
        }
      ],
      linksTitle: 'Explorer aussi',
      links: [
        { label: 'Career Paths', link: '/career-paths' },
        { label: 'Opportunities', link: '/opportunities' },
        { label: 'Study in Morocco', link: '/study-in-morocco' },
        { label: 'Career Matching', link: '/career-matching' },
        { label: 'Blog', link: '/blog' }
      ]
    },
    en: {
      h1: 'Free Tools',
      intro: 'CV builder, preparation tools and free resources to improve your employability.',
      cta: 'Build my CV',
      toolsTitle: 'Employability toolbox',
      tools: [
        {
          title: 'CV Builder',
          desc: 'Create a clean downloadable resume in minutes.',
          link: '/cv',
          cta: 'Open CV Builder'
        },
        {
          title: 'Cover letter generator',
          desc: 'Generate role-specific cover letters based on your profile.',
          link: '/tools/cover-letter',
          cta: 'Open generator'
        },
        {
          title: 'Interview practice',
          desc: 'Practice common questions with structured answer templates.',
          link: '/tools/interview-prep',
          cta: 'Open tool'
        },
        {
          title: 'ATS CV Score',
          desc: 'Compare your resume with a job description and detect missing keywords.',
          link: '/tools/ats-score',
          cta: 'Analyze my resume'
        }
      ],
      linksTitle: 'Explore also',
      links: [
        { label: 'Career Paths', link: '/career-paths' },
        { label: 'Opportunities', link: '/opportunities' },
        { label: 'Study in Morocco', link: '/study-in-morocco' },
        { label: 'Career Matching', link: '/career-matching' },
        { label: 'Blog', link: '/blog' }
      ]
    },
    ar: {
      h1: 'أدوات مجانية',
      intro: 'منشئ السيرة الذاتية وأدوات التحضير وموارد مجانية لتعزيز فرص التوظيف.',
      cta: 'إنشاء سيرتي الذاتية',
      toolsTitle: 'حزمة أدوات التوظيف',
      tools: [
        {
          title: 'منشئ السيرة الذاتية',
          desc: 'أنشئ سيرة ذاتية احترافية قابلة للتحميل خلال دقائق.',
          link: '/cv',
          cta: 'فتح منشئ السيرة الذاتية'
        },
        {
          title: 'مولد رسالة التحفيز',
          desc: 'إنشاء رسالة مناسبة للمنصب وملفك الشخصي.',
          link: '/tools/cover-letter',
          cta: 'فتح الأداة'
        },
        {
          title: 'التحضير للمقابلات',
          desc: 'تدرب على الأسئلة الشائعة بإجابات منظمة.',
          link: '/tools/interview-prep',
          cta: 'فتح الأداة'
        },
        {
          title: 'درجة ATS للسيرة الذاتية',
          desc: 'قارن سيرتك الذاتية بوصف الوظيفة وحدد الكلمات المفتاحية الناقصة.',
          link: '/tools/ats-score',
          cta: 'تحليل سيرتي الذاتية'
        }
      ],
      linksTitle: 'استكشف أيضا',
      links: [
        { label: 'المسارات المهنية', link: '/career-paths' },
        { label: 'الفرص', link: '/opportunities' },
        { label: 'الدراسة في المغرب', link: '/study-in-morocco' },
        { label: 'مطابقة المسار المهني', link: '/career-matching' },
        { label: 'المدونة', link: '/blog' }
      ]
    }
  }[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead
        page="legal"
        customTitle={`${text.h1} | QuizOrientation`}
        customDescription="Outils gratuits pour CV, orientation et preparation carriere."
      />
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">{text.h1}</h1>
        <p className="text-gray-700 mb-8">{text.intro}</p>

        <Link to={`${langPrefix}/cv`} className="inline-block bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold mb-8">
          {text.cta}
        </Link>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">{text.toolsTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {text.tools.map((tool) => (
              <article key={tool.title} className="bg-white rounded-lg shadow-md p-5 border border-primary-100">
                <h3 className="text-lg font-bold text-primary-900 mb-2">{tool.title}</h3>
                <p className="text-gray-700 mb-4">{tool.desc}</p>
                <Link to={`${langPrefix}${tool.link}`} className="text-primary-700 hover:underline font-semibold">
                  {tool.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary-900 mb-4">{text.linksTitle}</h2>
          <div className="flex flex-wrap gap-3">
            {text.links.map((item) => (
              <Link
                key={item.label}
                to={`${langPrefix}${item.link}`}
                className="bg-white border border-primary-200 hover:bg-primary-50 text-primary-800 px-4 py-2 rounded-lg font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default FreeTools
