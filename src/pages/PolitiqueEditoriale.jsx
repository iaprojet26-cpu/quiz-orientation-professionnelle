import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

function PolitiqueEditoriale() {
  const { i18n } = useTranslation()
  const language = i18n.language || 'fr'

  const content = {
    fr: {
      title: 'Politique Editoriale',
      h1: 'Politique Editoriale',
      intro:
        "Cette page explique comment nous preparons les contenus publies sur QuizOrientation. Notre objectif est de proposer des informations utiles, verifiables et actionnables pour l'orientation professionnelle.",
      sections: [
        {
          title: '1. Objectif des contenus',
          text: "Nos articles sont rediges pour aider les etudiants, jeunes diplomes et personnes en reconversion a mieux comprendre les metiers, les competences attendues et les parcours de formation."
        },
        {
          title: '2. Processus de redaction',
          text: 'Chaque article suit un processus simple: identification du besoin utilisateur, recherche, redaction pedagogique, relecture interne et mise a jour periodique.'
        },
        {
          title: '3. Verification des informations',
          text: "Nous verifions les informations avant publication. Quand cela est possible, nous nous appuyons sur des sources publiques reconnues (institutions, observatoires, sites officiels d'orientation et d'emploi)."
        },
        {
          title: '4. Mises a jour',
          text: "Les pages sont mises a jour pour rester pertinentes. La date de publication ou de mise a jour est affichee sur les contenus afin d'indiquer leur fraicheur."
        },
        {
          title: '5. Neutralite et transparence',
          text: "Nous evitons les promesses irrealistes et presentons des conseils pratiques avec leurs limites. Les contenus ont une vocation informative et ne remplacent pas un accompagnement personnalise."
        },
        {
          title: '6. Signaler une erreur',
          text: 'Si vous constatez une information inexacte, contactez-nous a contact@quizorientation.online. Nous analysons chaque signalement et corrigeons rapidement si necessaire.'
        }
      ]
    },
    en: {
      title: 'Editorial Policy',
      h1: 'Editorial Policy',
      intro:
        'This page explains how we produce content on QuizOrientation. Our goal is to provide useful, verifiable and actionable career guidance.',
      sections: [
        {
          title: '1. Content objective',
          text: 'Our articles are designed to help students, graduates and career changers better understand jobs, required skills and training pathways.'
        },
        {
          title: '2. Writing process',
          text: 'Each article follows a clear process: user need identification, research, educational writing, internal review and periodic updates.'
        },
        {
          title: '3. Information verification',
          text: 'We verify information before publication and rely on trusted public sources whenever possible (official institutions and labor market references).'
        },
        {
          title: '4. Updates',
          text: 'Pages are updated to stay relevant. Publication or update dates are displayed to help readers assess freshness.'
        },
        {
          title: '5. Neutrality and transparency',
          text: 'We avoid unrealistic promises and provide practical guidance with clear limits. Our content is informational and does not replace personalized counseling.'
        },
        {
          title: '6. Report an issue',
          text: 'If you find inaccurate information, contact us at contact@quizorientation.online. We review and correct content when needed.'
        }
      ]
    },
    ar: {
      title: 'السياسة التحريرية',
      h1: 'السياسة التحريرية',
      intro:
        'توضح هذه الصفحة كيف نقوم بإعداد المحتوى في QuizOrientation. هدفنا هو تقديم معلومات مفيدة وقابلة للتحقق وتطبيقية في التوجيه المهني.',
      sections: [
        {
          title: '1. هدف المحتوى',
          text: 'نكتب مقالاتنا لمساعدة الطلاب والخريجين ومن هم في إعادة التوجيه المهني على فهم المهن والمهارات المطلوبة ومسارات التكوين.'
        },
        {
          title: '2. منهجية الكتابة',
          text: 'كل مقال يمر بخطوات واضحة: تحديد حاجة المستخدم، البحث، الكتابة المبسطة، المراجعة الداخلية، ثم التحديث الدوري.'
        },
        {
          title: '3. التحقق من المعلومات',
          text: 'نراجع المعلومات قبل النشر ونعتمد قدر الإمكان على مصادر عمومية موثوقة مثل المؤسسات الرسمية ومراجع سوق الشغل.'
        },
        {
          title: '4. التحديث',
          text: 'نقوم بتحديث الصفحات بانتظام للحفاظ على دقة المحتوى، مع إظهار تاريخ النشر أو آخر تحديث.'
        },
        {
          title: '5. الحياد والشفافية',
          text: 'نتجنب الوعود غير الواقعية ونقدم نصائح عملية مع توضيح حدودها. المحتوى معلوماتي ولا يعوض المواكبة الفردية.'
        },
        {
          title: '6. التبليغ عن خطأ',
          text: 'إذا وجدت معلومة غير دقيقة، راسلنا على contact@quizorientation.online. نقوم بمراجعة التصحيحات بسرعة.'
        }
      ]
    }
  }

  const pageContent = content[language] || content.fr

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead
        page="legal"
        customTitle={`${pageContent.title} | QuizOrientation`}
        customDescription="Methodologie de redaction, verification et mise a jour des contenus QuizOrientation."
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-6">{pageContent.h1}</h1>
          <p className={`mb-6 text-base leading-relaxed text-gray-700 ${language === 'ar' ? 'rtl' : ''}`}>
            {pageContent.intro}
          </p>

          <div className={language === 'ar' ? 'rtl' : ''}>
            {pageContent.sections.map((section) => (
              <section key={section.title} className="mb-7">
                <h2 className="text-xl font-bold text-primary-900 mb-3">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">{section.text}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}

export default PolitiqueEditoriale
