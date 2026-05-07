import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

function CoverLetterTool() {
  const { i18n } = useTranslation()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'

  const [form, setForm] = useState({
    fullName: '',
    jobTitle: '',
    company: '',
    strengths: ''
  })
  const [result, setResult] = useState('')

  const text = {
    fr: {
      h1: 'Generateur de lettre de motivation',
      intro: "Creez rapidement une lettre de motivation personnalisee pour votre candidature.",
      labels: { fullName: 'Nom complet', jobTitle: 'Poste vise', company: 'Entreprise', strengths: 'Points forts' },
      button: 'Generer la lettre',
      output: 'Lettre generee'
    },
    en: {
      h1: 'Cover letter generator',
      intro: 'Quickly create a personalized cover letter for your job application.',
      labels: { fullName: 'Full name', jobTitle: 'Target role', company: 'Company', strengths: 'Key strengths' },
      button: 'Generate letter',
      output: 'Generated letter'
    },
    ar: {
      h1: 'مولد رسالة التحفيز',
      intro: 'أنشئ بسرعة رسالة تحفيز مخصصة لطلب التوظيف.',
      labels: { fullName: 'الاسم الكامل', jobTitle: 'المنصب المستهدف', company: 'الشركة', strengths: 'نقاط القوة' },
      button: 'إنشاء الرسالة',
      output: 'الرسالة المولدة'
    }
  }[language]

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const generate = () => {
    if (language === 'fr') {
      setResult(`Madame, Monsieur,\n\nJe souhaite vous proposer ma candidature au poste de ${form.jobTitle || '[poste]' } chez ${form.company || '[entreprise]'}. Je m'appelle ${form.fullName || '[nom]'} et je suis motive(e) a contribuer concretement a vos objectifs.\n\nMes principaux atouts sont: ${form.strengths || '[vos points forts]'}. Je suis convaincu(e) que ce profil correspond a vos attentes et a la dynamique de votre equipe.\n\nJe reste a votre disposition pour un entretien.\n\nCordialement,\n${form.fullName || '[nom]'}`)
    } else if (language === 'en') {
      setResult(`Dear Hiring Team,\n\nI am writing to apply for the ${form.jobTitle || '[role]'} position at ${form.company || '[company]'}. My name is ${form.fullName || '[name]'} and I am highly motivated to contribute to your team.\n\nMy key strengths include: ${form.strengths || '[your strengths]'}. I believe this profile aligns well with your expectations and the role requirements.\n\nI would be glad to discuss my application in an interview.\n\nSincerely,\n${form.fullName || '[name]'}`)
    } else {
      setResult(`السادة المحترمون،\n\nأتقدم بطلبي لشغل منصب ${form.jobTitle || '[المنصب]'} لدى ${form.company || '[الشركة]'}. اسمي ${form.fullName || '[الاسم]'} وأنا متحمس(ة) للمساهمة في فريقكم.\n\nمن أهم نقاط قوتي: ${form.strengths || '[نقاط قوتك]'}. أعتقد أن هذا الملف ينسجم مع متطلبات المنصب وأهداف الشركة.\n\nيشرفني مناقشة طلبي خلال مقابلة.\n\nمع خالص التقدير،\n${form.fullName || '[الاسم]'}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead page="legal" customTitle={`${text.h1} | QuizOrientation`} customDescription="Free cover letter generator for job applications." />
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-3">{text.h1}</h1>
        <p className="text-gray-700 mb-6">{text.intro}</p>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <input name="fullName" value={form.fullName} onChange={onChange} placeholder={text.labels.fullName} className="w-full border rounded-lg px-4 py-2" />
          <input name="jobTitle" value={form.jobTitle} onChange={onChange} placeholder={text.labels.jobTitle} className="w-full border rounded-lg px-4 py-2" />
          <input name="company" value={form.company} onChange={onChange} placeholder={text.labels.company} className="w-full border rounded-lg px-4 py-2" />
          <textarea name="strengths" value={form.strengths} onChange={onChange} placeholder={text.labels.strengths} className="w-full border rounded-lg px-4 py-2" rows="3" />
          <button onClick={generate} className="bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold">{text.button}</button>
        </div>
        {result && (
          <section className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-3">{text.output}</h2>
            <pre className="whitespace-pre-wrap text-gray-700 font-sans">{result}</pre>
          </section>
        )}
      </main>
    </div>
  )
}

export default CoverLetterTool
