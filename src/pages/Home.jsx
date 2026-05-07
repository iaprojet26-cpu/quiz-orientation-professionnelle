import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Quiz from '../components/Quiz'
import Results from '../components/Results'
import SEOHead from '../components/SEOHead'
import { getHomepageContent } from '../services/seoService'
import { getRecentArticles } from '../services/blogService'
import {
  getCareerMatchingContent,
  getHubOverviewCounts,
  getOpportunities,
  getCareerGuides
} from '../services/hubService'
import { Link } from 'react-router-dom'
import OptimizedImage from '../components/OptimizedImage'

function Home() {
  const { t, i18n } = useTranslation()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  const langPrefix = language === 'fr' ? '' : `/${language}`
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizResults, setQuizResults] = useState(null)
  const [seoContent, setSeoContent] = useState(getHomepageContent(i18n.language || 'fr'))
  const [recentArticles, setRecentArticles] = useState([])
  const [loadingArticles, setLoadingArticles] = useState(true)
  const [personalized, setPersonalized] = useState({
    careerPaths: [],
    opportunities: [],
    studyPrograms: [],
    careerGuides: []
  })
  const [loadingPersonalized, setLoadingPersonalized] = useState(false)
  const [hubCounts, setHubCounts] = useState({
    careerPaths: 0,
    opportunities: 0,
    studyPrograms: 0,
    careerGuides: 0
  })
  const [opportunityHighlights, setOpportunityHighlights] = useState([])
  const [guideHighlights, setGuideHighlights] = useState([])
  const [loadingHubHighlights, setLoadingHubHighlights] = useState(true)
  
  // Mettre à jour le contenu SEO quand la langue change
  useEffect(() => {
    setSeoContent(getHomepageContent(i18n.language || 'fr'))
  }, [i18n.language])

  // Charger les articles uniquement quand ils sont visibles (Intersection Observer)
  useEffect(() => {
    // Charger les articles même après le quiz pour avoir du contenu visible

    // Ne charger les articles qu'après un délai et seulement si la section est visible
    const loadRecentArticles = () => {
      // Vérifier si la section articles existe
      const articlesSection = document.querySelector('[data-articles-section]')
      if (!articlesSection) {
        // Si la section n'existe pas encore, attendre un peu plus
        setTimeout(() => loadRecentArticles(), 500)
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.disconnect()
            setLoadingArticles(true)
            // Utiliser requestIdleCallback pour charger sans bloquer
            const load = () => {
              getRecentArticles(3, i18n.language || 'fr')
                .then((articles) => {
                  setRecentArticles(articles)
                })
                .catch((error) => {
                  console.error('Erreur chargement articles:', error)
                  setRecentArticles([])
                })
                .finally(() => {
                  setLoadingArticles(false)
                })
            }
            
            if ('requestIdleCallback' in window) {
              requestIdleCallback(load, { timeout: 2000 })
            } else {
              setTimeout(load, 1000)
            }
          }
        },
        { rootMargin: '300px' } // Commencer à charger 300px avant que la section soit visible
      )
      
      observer.observe(articlesSection)
    }

    // Délai initial pour ne pas bloquer le rendu
    setTimeout(() => loadRecentArticles(), 2000)
  }, [i18n.language, quizCompleted])

  useEffect(() => {
    const loadPersonalized = async () => {
      if (!quizCompleted || !quizResults?.profile?.id) {
        setPersonalized({ careerPaths: [], opportunities: [], studyPrograms: [], careerGuides: [] })
        return
      }
      setLoadingPersonalized(true)
      const data = await getCareerMatchingContent({
        profileId: quizResults.profile.id,
        profileName: quizResults.profile.nom,
        lang: language
      })
      setPersonalized(data)
      setLoadingPersonalized(false)
    }
    loadPersonalized()
  }, [quizCompleted, quizResults?.profile?.id, quizResults?.profile?.nom, language])

  useEffect(() => {
    const loadCounts = async () => {
      const counts = await getHubOverviewCounts()
      setHubCounts(counts)
    }
    loadCounts()
  }, [])

  useEffect(() => {
    const loadHubHighlights = async () => {
      setLoadingHubHighlights(true)
      const [opps, guides] = await Promise.all([
        getOpportunities(language),
        getCareerGuides(language)
      ])
      setOpportunityHighlights((opps || []).slice(0, 3))
      setGuideHighlights((guides || []).slice(0, 3))
      setLoadingHubHighlights(false)
    }
    loadHubHighlights()
  }, [language])

  const handleQuizComplete = (results) => {
    setQuizResults(results)
    setQuizCompleted(true)
  }

  const handleRestart = () => {
    setQuizCompleted(false)
    setQuizResults(null)
  }

  const intentCards = [
    {
      key: 'student',
      title: language === 'fr' ? 'Je suis étudiant(e)' : language === 'en' ? 'I am a student' : 'أنا طالب/طالبة',
      desc: language === 'fr'
        ? 'Explorez les métiers et formations selon votre profil.'
        : language === 'en'
        ? 'Explore careers and training paths based on your profile.'
        : 'اكتشف المهن ومسارات التكوين حسب ملفك.',
      link: `${langPrefix}/study-in-morocco`,
      cta: language === 'fr' ? 'Voir les formations' : language === 'en' ? 'View study programs' : 'عرض برامج التكوين',
      icon: '🎓',
      iconBg: 'bg-blue-100'
    },
    {
      key: 'graduate',
      title: language === 'fr' ? 'Jeune diplômé(e)' : language === 'en' ? 'Recent graduate' : 'خريج/خريجة حديث(ة)',
      desc: language === 'fr'
        ? 'Accédez rapidement aux opportunités et outils CV.'
        : language === 'en'
        ? 'Access opportunities and CV tools quickly.'
        : 'احصل بسرعة على الفرص وأدوات السيرة الذاتية.',
      link: `${langPrefix}/opportunities`,
      cta: language === 'fr' ? 'Voir les opportunités' : language === 'en' ? 'Explore opportunities' : 'استكشف الفرص',
      icon: '💼',
      iconBg: 'bg-emerald-100'
    },
    {
      key: 'career-shift',
      title: language === 'fr' ? 'Reconversion pro' : language === 'en' ? 'Career transition' : 'إعادة توجيه مهني',
      desc: language === 'fr'
        ? 'Suivez des guides pratiques pour changer de voie.'
        : language === 'en'
        ? 'Follow practical guides to switch careers.'
        : 'اتبع أدلة عملية لتغيير المسار المهني.',
      link: `${langPrefix}/career-guides`,
      cta: language === 'fr' ? 'Voir les guides' : language === 'en' ? 'Open career guides' : 'عرض الأدلة',
      icon: '🔄',
      iconBg: 'bg-amber-100'
    }
  ]

  const quickActionsByIntent = [
    {
      key: 'student-actions',
      title: language === 'fr' ? 'Parcours étudiant' : language === 'en' ? 'Student path' : 'مسار الطالب',
      actions: [
        {
          label: language === 'fr' ? 'Faire le quiz' : language === 'en' ? 'Take the quiz' : 'ابدأ الاختبار',
          link: `${langPrefix}/`
        },
        {
          label: language === 'fr' ? 'Explorer les formations' : language === 'en' ? 'Explore study programs' : 'استكشف برامج التكوين',
          link: `${langPrefix}/study-in-morocco`
        },
        {
          label: language === 'fr' ? 'Voir les métiers' : language === 'en' ? 'View career paths' : 'استكشف المسارات المهنية',
          link: `${langPrefix}/career-paths`
        }
      ]
    },
    {
      key: 'graduate-actions',
      title: language === 'fr' ? 'Parcours jeune diplômé' : language === 'en' ? 'Graduate path' : 'مسار الخريج الحديث',
      actions: [
        {
          label: language === 'fr' ? 'Trouver des opportunités' : language === 'en' ? 'Find opportunities' : 'ابحث عن الفرص',
          link: `${langPrefix}/opportunities`
        },
        {
          label: language === 'fr' ? 'Optimiser mon CV' : language === 'en' ? 'Optimize my CV' : 'حسن سيرتي الذاتية',
          link: `${langPrefix}/cv`
        },
        {
          label: language === 'fr' ? 'Vérifier ATS CV Score' : language === 'en' ? 'Check ATS CV score' : 'افحص درجة ATS',
          link: `${langPrefix}/tools/ats-score`
        }
      ]
    },
    {
      key: 'switch-actions',
      title: language === 'fr' ? 'Parcours reconversion' : language === 'en' ? 'Career switch path' : 'مسار إعادة التوجيه',
      actions: [
        {
          label: language === 'fr' ? 'Lire les guides carrière' : language === 'en' ? 'Read career guides' : 'اقرأ الأدلة المهنية',
          link: `${langPrefix}/career-guides`
        },
        {
          label: language === 'fr' ? 'Générer une lettre' : language === 'en' ? 'Generate a cover letter' : 'أنشئ رسالة تحفيز',
          link: `${langPrefix}/tools/cover-letter`
        },
        {
          label: language === 'fr' ? 'Preparation entretien' : language === 'en' ? 'Interview preparation' : 'تحضير المقابلة',
          link: `${langPrefix}/tools/interview-prep`
        }
      ]
    }
  ]

  const homepageStructuredData = useMemo(() => {
    const faq = {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: language === 'fr' ? 'Le quiz est-il gratuit ?' : language === 'en' ? 'Is the quiz free?' : 'هل الاختبار مجاني؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: language === 'fr'
              ? 'Oui, le quiz et les outils principaux sont gratuits.'
              : language === 'en'
              ? 'Yes, the quiz and core tools are free.'
              : 'نعم، الاختبار والأدوات الأساسية مجانية.'
          }
        },
        {
          '@type': 'Question',
          name: language === 'fr'
            ? 'Comment améliorer mon CV rapidement ?'
            : language === 'en'
            ? 'How can I improve my resume quickly?'
            : 'كيف أحسن سيرتي الذاتية بسرعة؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: language === 'fr'
              ? 'Utilisez le CV Builder puis ATS CV Score pour aligner votre CV avec l’offre.'
              : language === 'en'
              ? 'Use CV Builder then ATS CV Score to align with job descriptions.'
              : 'استخدم منشئ السيرة الذاتية ثم درجة ATS لمواءمة السيرة مع العرض.'
          }
        },
        {
          '@type': 'Question',
          name: language === 'fr'
            ? 'Le site est-il utile pour une carrière internationale ?'
            : language === 'en'
            ? 'Is this platform useful for international careers?'
            : 'هل المنصة مفيدة للمسارات الدولية؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: language === 'fr'
              ? 'Oui, nous proposons des opportunités et des guides FR/EN/AR avec une approche internationale.'
              : language === 'en'
              ? 'Yes, we provide FR/EN/AR opportunities and guides with an international angle.'
              : 'نعم، نوفر فرصا وأدلة بثلاث لغات مع بعد دولي.'
          }
        }
      ]
    }

    const organization = {
      '@type': 'Organization',
      name: 'QuizOrientation',
      url: 'https://quizorientation.online',
      email: 'oocopcmcsm@gmail.com',
      sameAs: ['https://quizorientation.online'],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'oocopcmcsm@gmail.com',
          availableLanguage: ['French', 'English', 'Arabic']
        }
      ]
    }

    return [faq, organization]
  }, [language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Gestion des meta tags SEO dynamiques */}
      <SEOHead 
        page={quizCompleted ? 'result' : 'homepage'} 
        profileName={quizResults?.profile?.nom || ''} 
        extraSchema={!quizCompleted ? homepageStructuredData : []}
      />
      
      <main id="main-content" className="container mx-auto px-4 py-8">

        {!quizCompleted && (
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              {seoContent.h1}
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
              {t('header.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Link to={`${langPrefix}/`} className="bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold">
                {language === 'fr' ? 'Faire le quiz maintenant' : language === 'en' ? 'Take the quiz now' : 'ابدأ الاختبار الآن'}
              </Link>
              <Link to={`${langPrefix}/opportunities`} className="bg-white text-primary-700 px-5 py-3 rounded-lg font-semibold border border-primary-200">
                {language === 'fr' ? 'Voir les opportunités' : language === 'en' ? 'Explore opportunities' : 'استكشف الفرص'}
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-primary-100">
                <p className="text-2xl font-extrabold text-primary-900">{hubCounts.careerPaths}</p>
                <p className="text-gray-600 text-sm">Career Paths</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-primary-100">
                <p className="text-2xl font-extrabold text-primary-900">{hubCounts.opportunities}</p>
                <p className="text-gray-600 text-sm">Opportunities</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-primary-100">
                <p className="text-2xl font-extrabold text-primary-900">{hubCounts.studyPrograms}</p>
                <p className="text-gray-600 text-sm">Study Programs</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-primary-100">
                <p className="text-2xl font-extrabold text-primary-900">{hubCounts.careerGuides}</p>
                <p className="text-gray-600 text-sm">Career Guides</p>
              </div>
            </div>
            
            <div className={`max-w-3xl mx-auto mt-8 text-left text-gray-700 ${i18n.language === 'ar' ? 'rtl' : ''}`}>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="mb-3 font-medium text-gray-800">
                  {language === 'fr'
                    ? 'Trouvez une orientation claire en quelques minutes avec un quiz simple et pratique.'
                    : language === 'en'
                    ? 'Find a clear career direction in minutes with a simple, practical quiz.'
                    : 'احصل على توجيه مهني واضح خلال دقائق عبر اختبار بسيط وعملي.'}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                  <li>
                    {language === 'fr'
                      ? 'Un profil professionnel personnalisé'
                      : language === 'en'
                      ? 'A personalized career profile'
                      : 'ملف مهني مخصص'}
                  </li>
                  <li>
                    {language === 'fr'
                      ? 'Des métiers recommandés selon vos réponses'
                      : language === 'en'
                      ? 'Career recommendations based on your answers'
                      : 'مهن مقترحة بناء على إجاباتك'}
                  </li>
                  <li>
                    {language === 'fr'
                      ? 'Des formations et actions concrètes pour avancer'
                      : language === 'en'
                      ? 'Training and practical next steps'
                      : 'تكوين وخطوات عملية للتقدم'}
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  {language === 'fr'
                    ? 'Quiz gratuit, rapide (2 min), sans inscription obligatoire.'
                    : language === 'en'
                    ? 'Free quiz, fast (2 minutes), no mandatory sign-up.'
                    : 'اختبار مجاني وسريع (دقيقتان) وبدون تسجيل إلزامي.'}
                </p>
              </div>
            </div>
          </header>
        )}

        {!quizCompleted ? (
          <Quiz onComplete={handleQuizComplete} />
        ) : (
          <Results results={quizResults} onRestart={handleRestart} />
        )}

        {!quizCompleted && (
          <section className="mt-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-3xl font-bold text-primary-900 mb-6">
                {language === 'fr' ? 'Comment commencer en 3 étapes' : language === 'en' ? 'How to start in 3 steps' : 'كيف تبدأ في 3 خطوات'}
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                <article className="border border-primary-100 rounded-lg p-5">
                  <h3 className="font-bold text-primary-900 mb-2">1. {language === 'fr' ? 'Faire le quiz' : language === 'en' ? 'Take the quiz' : 'قم بالاختبار'}</h3>
                  <p className="text-gray-700 text-sm">{language === 'fr' ? 'Obtenez un profil clair en quelques minutes.' : language === 'en' ? 'Get a clear profile in minutes.' : 'احصل على ملف واضح خلال دقائق.'}</p>
                </article>
                <article className="border border-primary-100 rounded-lg p-5">
                  <h3 className="font-bold text-primary-900 mb-2">2. {language === 'fr' ? 'Lire vos recommandations' : language === 'en' ? 'Review recommendations' : 'راجع توصياتك'}</h3>
                  <p className="text-gray-700 text-sm">{language === 'fr' ? 'Découvrez des métiers, des guides et des formations adaptés.' : language === 'en' ? 'Discover relevant careers, guides and programs.' : 'اكتشف المهن والأدلة والتكوينات المناسبة.'}</p>
                </article>
                <article className="border border-primary-100 rounded-lg p-5">
                  <h3 className="font-bold text-primary-900 mb-2">3. {language === 'fr' ? 'Passer à l’action' : language === 'en' ? 'Take action' : 'ابدأ التنفيذ'}</h3>
                  <p className="text-gray-700 text-sm">{language === 'fr' ? 'Utilisez nos outils CV, lettre et préparation à l’entretien.' : language === 'en' ? 'Use CV, cover letter and interview prep tools.' : 'استخدم أدوات السيرة الذاتية ورسالة التحفيز والتحضير للمقابلة.'}</p>
                </article>
              </div>
            </div>
          </section>
        )}

        {!quizCompleted && (
          <section className="mt-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-2">
                {language === 'fr' ? 'Commencer selon votre situation' : language === 'en' ? 'Start from your situation' : 'ابدأ حسب وضعيتك'}
              </h2>
              <p className="text-gray-700 mb-6">
                {language === 'fr'
                  ? 'Choisissez votre profil de départ pour accéder rapidement au bon contenu.'
                  : language === 'en'
                  ? 'Choose your starting profile to reach the right content faster.'
                  : 'اختر وضعيتك للانتقال بسرعة إلى المحتوى المناسب.'}
              </p>
              <div className="grid md:grid-cols-3 gap-5">
                {intentCards.map((card) => (
                  <article key={card.key} className="border border-primary-100 rounded-lg p-4">
                    <div className={`h-24 mb-3 rounded-lg flex items-center justify-center text-4xl ${card.iconBg}`}>
                      <span role="img" aria-label={card.title}>{card.icon}</span>
                    </div>
                    <h3 className="font-bold text-primary-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-700 mb-3">{card.desc}</p>
                    <Link to={card.link} className="text-primary-700 hover:underline font-semibold">
                      {card.cta}
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {!quizCompleted && (
          <section className="mt-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-2">
                {language === 'fr' ? 'Actions rapides selon votre objectif' : language === 'en' ? 'Quick actions by your goal' : 'إجراءات سريعة حسب هدفك'}
              </h2>
              <p className="text-gray-700 mb-6">
                {language === 'fr'
                  ? 'Passez directement à la bonne action pour gagner du temps.'
                  : language === 'en'
                  ? 'Jump to the right action and save time.'
                  : 'انتقل مباشرة إلى الإجراء المناسب لتوفير الوقت.'}
              </p>
              <div className="grid md:grid-cols-3 gap-5">
                {quickActionsByIntent.map((group) => (
                  <article key={group.key} className="border border-primary-100 rounded-lg p-4">
                    <h3 className="font-bold text-primary-900 mb-3">{group.title}</h3>
                    <div className="flex flex-col gap-2">
                      {group.actions.map((action) => (
                        <Link
                          key={`${group.key}-${action.link}`}
                          to={action.link}
                          className="bg-primary-50 hover:bg-primary-100 rounded-lg px-3 py-2 text-primary-900 font-medium text-sm"
                        >
                          {action.label}
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {quizCompleted && (
          <section className="mt-10 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-3">
                {language === 'fr' ? 'Recommandé pour vous' : language === 'en' ? 'Recommended for you' : 'موصى به لك'}
              </h2>
              <p className="text-gray-700 mb-5">
                {language === 'fr'
                  ? 'Sélection personnalisée basée sur votre profil quiz.'
                  : language === 'en'
                  ? 'Personalized selection based on your quiz profile.'
                  : 'اختيارات مخصصة بناء على نتيجة الاختبار.'}
              </p>
              {loadingPersonalized ? (
                <p className="text-gray-600">Chargement...</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {personalized.careerPaths.length > 0 && <Link to={`${langPrefix}/career-paths`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Career Paths ({personalized.careerPaths.length})</Link>}
                  {personalized.opportunities.length > 0 && <Link to={`${langPrefix}/opportunities`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Opportunities ({personalized.opportunities.length})</Link>}
                  {personalized.studyPrograms.length > 0 && <Link to={`${langPrefix}/study-in-morocco`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Study in Morocco ({personalized.studyPrograms.length})</Link>}
                  {personalized.careerGuides.length > 0 && <Link to={`${langPrefix}/career-guides`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Career Guides ({personalized.careerGuides.length})</Link>}
                  <Link
                    to={`${langPrefix}/career-matching?profile_id=${encodeURIComponent(quizResults?.profile?.id || '')}&profile_name=${encodeURIComponent(quizResults?.profile?.nom || '')}`}
                    className="bg-white border border-primary-200 hover:bg-primary-50 rounded-lg p-4 font-semibold text-primary-900"
                  >
                    {language === 'fr' ? 'Voir le matching detaille' : language === 'en' ? 'Open detailed matching' : 'عرض المطابقة التفصيلية'}
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}


        {/* Section Articles Récents - Toujours affichée en bas de page (même après quiz) */}
        <section className="mt-16 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-3">
              {i18n.language === 'fr'
                ? "Hub d'orientation, formation et employabilité"
                : i18n.language === 'en'
                ? 'Career, Training and Employability Hub'
                : 'منصة التوجيه والتكوين وقابلية التوظيف'}
            </h2>
            <p className="text-gray-700 mb-6">
              {i18n.language === 'fr'
                ? 'Découvrez les rubriques stratégiques pour passer du quiz à un plan d’action concret.'
                : i18n.language === 'en'
                ? 'Explore strategic sections to turn quiz insights into a practical action plan.'
                : 'اكتشف الأقسام الاستراتيجية لتحويل نتائج الاختبار إلى خطة عملية.'}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to={`${langPrefix}/career-paths`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Career Paths</Link>
              <Link to={`${langPrefix}/opportunities`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Opportunities</Link>
              <Link to={`${langPrefix}/study-in-morocco`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Study in Morocco</Link>
              <Link to={`${langPrefix}/career-guides`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Career Guides</Link>
              <Link to={`${langPrefix}/career-matching`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Career Matching</Link>
              <Link to={`${langPrefix}/free-tools`} className="bg-primary-50 hover:bg-primary-100 rounded-lg p-4 font-semibold text-primary-900">Free Tools</Link>
            </div>
          </div>
        </section>

        <section className="mt-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              {language === 'fr' ? 'FAQ orientation et employabilité' : language === 'en' ? 'Career FAQ' : 'الأسئلة الشائعة حول التوجيه المهني'}
            </h2>
            <div className="space-y-4 text-gray-700">
              <details className="border border-primary-100 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">{language === 'fr' ? 'Le quiz est-il gratuit ?' : language === 'en' ? 'Is the quiz free?' : 'هل الاختبار مجاني؟'}</summary>
                <p className="mt-2">{language === 'fr' ? 'Oui, le quiz et les outils principaux sont gratuits.' : language === 'en' ? 'Yes, the quiz and core tools are free.' : 'نعم، الاختبار والأدوات الأساسية مجانية.'}</p>
              </details>
              <details className="border border-primary-100 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">{language === 'fr' ? 'Comment améliorer mon CV rapidement ?' : language === 'en' ? 'How can I improve my resume quickly?' : 'كيف أحسن سيرتي الذاتية بسرعة؟'}</summary>
                <p className="mt-2">{language === 'fr' ? 'Utilisez le CV Builder puis ATS CV Score pour aligner votre CV avec l’offre.' : language === 'en' ? 'Use CV Builder then ATS CV Score to align with job descriptions.' : 'استخدم منشئ السيرة الذاتية ثم درجة ATS لمواءمة السيرة مع العرض.'}</p>
              </details>
              <details className="border border-primary-100 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">{language === 'fr' ? 'Le site est-il utile pour une carrière internationale ?' : language === 'en' ? 'Is this platform useful for international careers?' : 'هل المنصة مفيدة للمسارات الدولية؟'}</summary>
                <p className="mt-2">{language === 'fr' ? 'Oui, nous proposons des opportunités et des guides FR/EN/AR avec une approche internationale.' : language === 'en' ? 'Yes, we provide FR/EN/AR opportunities and guides with an international angle.' : 'نعم، نوفر فرصا وأدلة بثلاث لغات مع بعد دولي.'}</p>
              </details>
            </div>
          </div>
        </section>

        <section className="mt-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-2">
              {language === 'fr' ? 'À la une : opportunités et guides' : language === 'en' ? 'Featured: opportunities and guides' : 'المميز: الفرص والأدلة'}
            </h2>
            <p className="text-gray-700 mb-6">
              {language === 'fr'
                ? 'Des contenus utiles et actionnables pour passer de l’orientation à l’employabilité.'
                : language === 'en'
                ? 'Practical content to move from orientation to employability.'
                : 'محتوى عملي للانتقال من التوجيه إلى قابلية التوظيف.'}
            </p>

            {loadingHubHighlights ? (
              <p className="text-gray-600">Chargement...</p>
            ) : (
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary-900">Opportunities</h3>
                    <Link to={`${langPrefix}/opportunities`} className="text-primary-700 hover:underline font-semibold">
                      {language === 'fr' ? 'Voir tout' : language === 'en' ? 'View all' : 'عرض الكل'}
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {opportunityHighlights.length > 0 ? opportunityHighlights.map((item) => (
                      <article key={item.id} className="border border-primary-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">{item.companyName} - {item.city}</p>
                        <p className="font-semibold text-primary-900 mb-1">{item.title}</p>
                        <p className="text-sm text-gray-700 line-clamp-2">{item.description || '-'}</p>
                      </article>
                    )) : <p className="text-gray-600 text-sm">-</p>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary-900">Career Guides</h3>
                    <Link to={`${langPrefix}/career-guides`} className="text-primary-700 hover:underline font-semibold">
                      {language === 'fr' ? 'Voir tout' : language === 'en' ? 'View all' : 'عرض الكل'}
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {guideHighlights.length > 0 ? guideHighlights.map((item) => (
                      <article key={item.id} className="border border-primary-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">{item.category || 'Guide'}</p>
                        <p className="font-semibold text-primary-900 mb-1">{item.title}</p>
                        <p className="text-sm text-gray-700 line-clamp-2">{item.summary || '-'}</p>
                      </article>
                    )) : <p className="text-gray-600 text-sm">-</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-12 max-w-6xl mx-auto">
          <div className="bg-primary-900 text-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-3">
              {language === 'fr' ? 'Transparence et qualité éditoriale' : language === 'en' ? 'Editorial quality and transparency' : 'الجودة التحريرية والشفافية'}
            </h2>
            <p className="text-primary-100 mb-5">
              {language === 'fr'
                ? 'Nous publions du contenu utile, vérifié et mis à jour régulièrement pour aider les étudiants et jeunes actifs.'
                : language === 'en'
                ? 'We publish practical, reviewed and regularly updated content for students and job seekers.'
                : 'ننشر محتوى عمليا ومراجعا ويتم تحديثه بانتظام للطلاب والباحثين عن العمل.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to={`${langPrefix}/politique-editoriale`} className="bg-white text-primary-900 px-4 py-2 rounded-lg font-semibold">
                {language === 'fr' ? 'Politique éditoriale' : language === 'en' ? 'Editorial policy' : 'السياسة التحريرية'}
              </Link>
              <Link to={`${langPrefix}/a-propos`} className="bg-white text-primary-900 px-4 py-2 rounded-lg font-semibold">
                {language === 'fr' ? 'À propos' : language === 'en' ? 'About us' : 'من نحن'}
              </Link>
              <Link to={`${langPrefix}/contact`} className="bg-white text-primary-900 px-4 py-2 rounded-lg font-semibold">
                {language === 'fr' ? 'Contact' : language === 'en' ? 'Contact' : 'اتصل بنا'}
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              {language === 'fr' ? 'Impact de la plateforme' : language === 'en' ? 'Platform impact' : 'تأثير المنصة'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-primary-100 rounded-lg p-4">
                <p className="text-2xl font-extrabold text-primary-900">{hubCounts.careerPaths}+</p>
                <p className="text-sm text-gray-600">{language === 'fr' ? 'fiches métiers' : language === 'en' ? 'career path cards' : 'بطاقات مهنية'}</p>
              </div>
              <div className="border border-primary-100 rounded-lg p-4">
                <p className="text-2xl font-extrabold text-primary-900">{hubCounts.opportunities}+</p>
                <p className="text-sm text-gray-600">{language === 'fr' ? 'opportunités publiées' : language === 'en' ? 'published opportunities' : 'فرص منشورة'}</p>
              </div>
              <div className="border border-primary-100 rounded-lg p-4">
                <p className="text-2xl font-extrabold text-primary-900">{hubCounts.studyPrograms}+</p>
                <p className="text-sm text-gray-600">{language === 'fr' ? 'programmes de formation' : language === 'en' ? 'study programs' : 'برامج تكوين'}</p>
              </div>
              <div className="border border-primary-100 rounded-lg p-4">
                <p className="text-2xl font-extrabold text-primary-900">{hubCounts.careerGuides}+</p>
                <p className="text-sm text-gray-600">{language === 'fr' ? 'guides pratiques' : language === 'en' ? 'practical guides' : 'أدلة عملية'}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 mb-8 max-w-6xl mx-auto" data-articles-section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-primary-900">
                {t('blog.recent_articles', { defaultValue: 'Articles Récents' })}
              </h2>
              <Link
                to="/blog"
                className="text-primary-600 hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                aria-label={t('blog.view_all', { defaultValue: 'Voir tous les articles' })}
              >
                {t('blog.view_all', { defaultValue: 'Voir tous les articles' })} →
              </Link>
            </div>
            
            {loadingArticles ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement des articles...</p>
              </div>
            ) : recentArticles.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {recentArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/blog/${article.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label={`Lire l'article: ${article.title}`}
                  >
                    <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                      {article.image ? (
                        <OptimizedImage
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          lazy={true}
                        />
                      ) : (
                        <span className="text-5xl">📚</span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-gray-500 mb-2">
                        {new Date(article.date).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : i18n.language === 'en' ? 'en-US' : 'ar-MA')}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-600 mb-4">Aucun article disponible pour le moment.</p>
                <Link
                  to="/blog"
                  className="text-primary-600 hover:underline font-semibold"
                >
                  Voir le blog →
                </Link>
              </div>
            )}
          </section>
      </main>
    </div>
  )
}

export default Home

