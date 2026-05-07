import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'this', 'that', 'are', 'you', 'your', 'from', 'have', 'has', 'will', 'our',
  'les', 'des', 'pour', 'avec', 'dans', 'une', 'vous', 'votre', 'vos', 'est', 'sur', 'aux', 'par', 'plus',
  'من', 'على', 'في', 'إلى', 'عن', 'مع', 'هذا', 'هذه', 'التي', 'الذي', 'و', 'او'
])

function normalizeWords(input) {
  return (input || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
}

function AtsScoreTool() {
  const { i18n } = useTranslation()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'
  const langPrefix = language === 'fr' ? '' : `/${language}`

  const [cvText, setCvText] = useState('')
  const [jobText, setJobText] = useState('')
  const [computed, setComputed] = useState(null)

  const text = {
    fr: {
      h1: 'ATS CV Score',
      intro: 'Comparez rapidement votre CV avec une offre et identifiez les mots-cles manquants.',
      cvLabel: 'Texte de votre CV',
      jobLabel: "Description de l'offre",
      action: 'Analyser la compatibilite',
      score: 'Score ATS estime',
      matched: 'Mots-cles trouves',
      missing: 'Mots-cles a ajouter',
      tips: 'Conseils rapides',
      tipList: [
        'Ajoutez les competences techniques presentes dans l offre.',
        'Utilisez les memes termes que le recruteur quand c est pertinent.',
        'Quantifiez vos resultats (ex: +20% de performance).'
      ]
    },
    en: {
      h1: 'ATS CV Score',
      intro: 'Quickly compare your resume with a job description and detect missing keywords.',
      cvLabel: 'Your resume text',
      jobLabel: 'Job description text',
      action: 'Analyze compatibility',
      score: 'Estimated ATS score',
      matched: 'Matched keywords',
      missing: 'Missing keywords',
      tips: 'Quick tips',
      tipList: [
        'Add technical skills explicitly mentioned in the job post.',
        'Reuse recruiter wording where it fits your experience.',
        'Quantify outcomes (e.g. improved performance by 20%).'
      ]
    },
    ar: {
      h1: 'درجة ATS للسيرة الذاتية',
      intro: 'قارن بسرعة بين سيرتك الذاتية ووصف الوظيفة وحدد الكلمات المفتاحية الناقصة.',
      cvLabel: 'نص السيرة الذاتية',
      jobLabel: 'نص عرض العمل',
      action: 'تحليل التوافق',
      score: 'درجة ATS المتوقعة',
      matched: 'الكلمات المفتاحية المطابقة',
      missing: 'الكلمات المفتاحية الناقصة',
      tips: 'نصائح سريعة',
      tipList: [
        'أضف المهارات التقنية المذكورة في العرض بشكل واضح.',
        'استخدم نفس المصطلحات المستعملة في وصف الوظيفة عند الحاجة.',
        'قدّم نتائج رقمية واضحة في خبراتك.'
      ]
    }
  }[language]

  const analyze = () => {
    const cv = new Set(normalizeWords(cvText))
    const jobWords = normalizeWords(jobText)
    const uniqueJob = [...new Set(jobWords)]
    const matched = uniqueJob.filter((w) => cv.has(w))
    const missing = uniqueJob.filter((w) => !cv.has(w)).slice(0, 20)
    const score = uniqueJob.length ? Math.round((matched.length / uniqueJob.length) * 100) : 0
    setComputed({ score, matched: matched.slice(0, 25), missing })
  }

  const scoreColor = useMemo(() => {
    if (!computed) return 'text-gray-700'
    if (computed.score >= 75) return 'text-green-700'
    if (computed.score >= 50) return 'text-yellow-700'
    return 'text-red-700'
  }, [computed])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead page="legal" customTitle={`${text.h1} | QuizOrientation`} customDescription="Free ATS resume score checker with keyword gap analysis." />
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-3">{text.h1}</h1>
        <p className="text-gray-700 mb-6">{text.intro}</p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-5">
            <label className="block font-semibold text-gray-800 mb-2">{text.cvLabel}</label>
            <textarea value={cvText} onChange={(e) => setCvText(e.target.value)} rows="12" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="bg-white rounded-lg shadow-md p-5">
            <label className="block font-semibold text-gray-800 mb-2">{text.jobLabel}</label>
            <textarea value={jobText} onChange={(e) => setJobText(e.target.value)} rows="12" className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        <button onClick={analyze} className="bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold mb-6">
          {text.action}
        </button>

        {computed && (
          <section className="grid lg:grid-cols-3 gap-5">
            <article className="bg-white rounded-lg shadow-md p-5">
              <h2 className="text-lg font-bold text-primary-900 mb-2">{text.score}</h2>
              <p className={`text-4xl font-extrabold ${scoreColor}`}>{computed.score}%</p>
            </article>
            <article className="bg-white rounded-lg shadow-md p-5">
              <h2 className="text-lg font-bold text-primary-900 mb-2">{text.matched}</h2>
              <p className="text-gray-700 text-sm">{computed.matched.join(', ') || '-'}</p>
            </article>
            <article className="bg-white rounded-lg shadow-md p-5">
              <h2 className="text-lg font-bold text-primary-900 mb-2">{text.missing}</h2>
              <p className="text-gray-700 text-sm">{computed.missing.join(', ') || '-'}</p>
            </article>
          </section>
        )}

        <section className="mt-6 bg-white rounded-lg shadow-md p-5">
          <h2 className="text-lg font-bold text-primary-900 mb-2">{text.tips}</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {text.tipList.map((tip) => <li key={tip}>{tip}</li>)}
          </ul>
          <Link to={`${langPrefix}/free-tools`} className="inline-block mt-4 text-primary-700 hover:underline font-semibold">
            {language === 'ar' ? 'العودة إلى الأدوات المجانية' : language === 'en' ? 'Back to Free Tools' : 'Retour aux outils gratuits'}
          </Link>
        </section>
      </main>
    </div>
  )
}

export default AtsScoreTool
