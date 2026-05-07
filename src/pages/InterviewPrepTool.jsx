import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

function InterviewPrepTool() {
  const { i18n } = useTranslation()
  let language = i18n.language || 'fr'
  if (language.includes('-')) language = language.split('-')[0]
  if (!['fr', 'en', 'ar'].includes(language)) language = 'fr'

  const [jobTitle, setJobTitle] = useState('')
  const [questions, setQuestions] = useState([])

  const text = {
    fr: {
      h1: 'Preparation entretien',
      intro: 'Generez des questions d entretien et des reponses structures pour vous entrainer.',
      placeholder: 'Ex: Data Analyst',
      button: 'Generer les questions',
      tip: 'Conseil: utilisez la methode STAR (Situation, Tache, Action, Resultat).'
    },
    en: {
      h1: 'Interview preparation',
      intro: 'Generate interview questions and structured answers to practice effectively.',
      placeholder: 'e.g. Data Analyst',
      button: 'Generate questions',
      tip: 'Tip: use the STAR method (Situation, Task, Action, Result).'
    },
    ar: {
      h1: 'التحضير للمقابلات',
      intro: 'أنشئ أسئلة مقابلة وإجابات منظمة للتدرب بفعالية.',
      placeholder: 'مثال: محلل بيانات',
      button: 'إنشاء الأسئلة',
      tip: 'نصيحة: استخدم منهج STAR (الوضعية، المهمة، الإجراء، النتيجة).'
    }
  }[language]

  const generate = () => {
    const role = jobTitle || (language === 'ar' ? 'هذا المنصب' : 'this role')
    const list = [
      { q: language === 'fr' ? `Parlez-moi de vous pour le poste ${role}.` : language === 'en' ? `Tell me about yourself for the ${role} role.` : `عرف بنفسك بالنسبة لمنصب ${role}.` },
      { q: language === 'fr' ? `Pourquoi voulez-vous rejoindre ce poste ${role} ?` : language === 'en' ? `Why do you want this ${role} role?` : `لماذا تريد منصب ${role}؟` },
      { q: language === 'fr' ? 'Donnez un exemple de probleme que vous avez resolu.' : language === 'en' ? 'Share a problem you solved recently.' : 'قدّم مثالا عن مشكلة قمت بحلها.' },
      { q: language === 'fr' ? 'Comment priorisez-vous vos taches sous pression ?' : language === 'en' ? 'How do you prioritize tasks under pressure?' : 'كيف ترتب أولوياتك تحت الضغط؟' },
      { q: language === 'fr' ? 'Quelles sont vos forces et vos axes d amelioration ?' : language === 'en' ? 'What are your strengths and improvement areas?' : 'ما هي نقاط قوتك ومجالات التحسين لديك؟' }
    ]
    setQuestions(list)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead page="legal" customTitle={`${text.h1} | QuizOrientation`} customDescription="Free interview preparation tool with practical questions." />
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-3">{text.h1}</h1>
        <p className="text-gray-700 mb-6">{text.intro}</p>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-3 flex-wrap">
            <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder={text.placeholder} className="flex-1 min-w-[220px] border rounded-lg px-4 py-2" />
            <button onClick={generate} className="bg-primary-600 text-white px-5 py-2 rounded-lg font-semibold">{text.button}</button>
          </div>
          <p className="text-sm text-gray-600 mt-3">{text.tip}</p>
        </div>
        {questions.length > 0 && (
          <section className="mt-6 bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-3 text-gray-700">
              {questions.map((item, idx) => <li key={idx}>• {item.q}</li>)}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}

export default InterviewPrepTool
