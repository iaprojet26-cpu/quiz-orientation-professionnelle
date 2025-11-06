import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

function APropos() {
  const { t, i18n } = useTranslation()
  const language = i18n.language || 'fr'

  const content = {
    fr: {
      title: "À Propos",
      h1: "À Propos de QuizOrientation",
      intro: "QuizOrientation est une plateforme innovante dédiée à l'orientation professionnelle. Notre mission est d'aider chaque individu à découvrir son profil professionnel unique et à trouver la carrière qui lui correspond vraiment.",
      
      section1: {
        title: "Notre Mission",
        content: "Dans un monde professionnel en constante évolution, choisir sa voie peut être un défi. QuizOrientation a été créé pour simplifier ce processus en offrant un outil d'auto-évaluation gratuit et accessible à tous. Nous croyons que chaque personne possède un profil professionnel unique, et notre quiz d'orientation permet de le révéler en analysant vos intérêts, compétences et préférences de travail. Notre objectif est de vous guider vers des métiers qui correspondent à votre personnalité et à vos aspirations."
      },
      
      section2: {
        title: "Comment Ça Fonctionne",
        content: "Notre quiz d'orientation professionnelle est basé sur une méthodologie éprouvée qui analyse cinq dimensions clés de votre profil : créativité, compétences techniques, relations sociales, organisation et entrepreneuriat. En répondant à une série de questions simples et intuitives, notre algorithme identifie votre profil dominant parmi cinq profils distincts. Chaque profil est ensuite associé à cinq métiers recommandés, avec des descriptions détaillées, les niveaux d'études requis, les compétences clés et les formations possibles. Les résultats sont instantanés et personnalisés."
      },
      
      section3: {
        title: "Nos Valeurs",
        content: "Chez QuizOrientation, nous valorisons l'accessibilité, la transparence et l'innovation. Notre service est entièrement gratuit et accessible à tous, sans condition. Nous croyons en la transparence totale : vos données sont utilisées uniquement pour générer vos résultats et ne sont jamais vendues à des tiers. Nous innovons constamment pour améliorer notre algorithme et enrichir notre base de données de métiers et de formations. Notre engagement est de vous fournir des informations fiables et à jour pour vous aider dans vos choix de carrière."
      },
      
      section4: {
        title: "Pour Qui ?",
        content: "QuizOrientation s'adresse à tous ceux qui s'interrogent sur leur avenir professionnel : étudiants en quête d'orientation, personnes en reconversion professionnelle, salariés souhaitant évoluer dans leur carrière, ou simplement curieux de découvrir leur profil professionnel. Que vous soyez au début de votre parcours ou à un tournant de votre vie professionnelle, notre quiz peut vous apporter des éclairages précieux sur les métiers qui pourraient vous correspondre."
      },
      
      section5: {
        title: "Notre Équipe",
        content: "QuizOrientation est développé par une équipe passionnée par l'orientation professionnelle et les nouvelles technologies. Nous combinons expertise en psychologie du travail, connaissance du marché de l'emploi et compétences techniques pour créer un outil à la fois simple et puissant. Notre équipe travaille continuellement à améliorer l'expérience utilisateur et à enrichir notre base de connaissances sur les métiers et les formations."
      },
      
      section6: {
        title: "Notre Engagement",
        content: "Nous nous engageons à maintenir QuizOrientation gratuit et accessible à tous. Nous nous engageons également à protéger vos données personnelles et à respecter votre vie privée. Nous nous engageons à fournir des informations fiables et régulièrement mises à jour sur les métiers et les formations. Enfin, nous nous engageons à écouter vos retours et à améliorer continuellement notre service pour mieux répondre à vos besoins."
      },
      
      section7: {
        title: "Contact",
        content: "Vous avez des questions, des suggestions ou des retours à nous faire ? Nous serions ravis d'avoir de vos nouvelles ! N'hésitez pas à nous contacter à l'adresse contact@quizorientation.online. Nous nous efforçons de répondre à toutes les demandes dans les meilleurs délais."
      }
    },
    en: {
      title: "About Us",
      h1: "About QuizOrientation",
      intro: "QuizOrientation is an innovative platform dedicated to career orientation. Our mission is to help each individual discover their unique professional profile and find the career that truly suits them.",
      section1: { title: "Our Mission", content: "In a constantly evolving professional world, choosing your path can be a challenge. QuizOrientation was created to simplify this process by offering a free and accessible self-assessment tool for everyone." },
      section2: { title: "How It Works", content: "Our career orientation quiz is based on a proven methodology that analyzes five key dimensions of your profile: creativity, technical skills, social relations, organization and entrepreneurship." },
      section3: { title: "Our Values", content: "At QuizOrientation, we value accessibility, transparency and innovation. Our service is completely free and accessible to all, without conditions." },
      section4: { title: "For Whom?", content: "QuizOrientation is aimed at everyone who questions their professional future: students seeking orientation, people in career transition, employees wishing to evolve in their career, or simply curious to discover their professional profile." },
      section5: { title: "Our Team", content: "QuizOrientation is developed by a team passionate about career orientation and new technologies. We combine expertise in work psychology, knowledge of the job market and technical skills." },
      section6: { title: "Our Commitment", content: "We are committed to keeping QuizOrientation free and accessible to all. We are also committed to protecting your personal data and respecting your privacy." },
      section7: { title: "Contact", content: "Do you have questions, suggestions or feedback for us? We would be delighted to hear from you! Feel free to contact us at contact@quizorientation.online." }
    },
    ar: {
      title: "من نحن",
      h1: "حول QuizOrientation",
      intro: "QuizOrientation هي منصة مبتكرة مخصصة للتوجيه المهني. مهمتنا هي مساعدة كل فرد على اكتشاف ملفه المهني الفريد والعثور على المهنة التي تناسبه حقًا.",
      section1: { title: "مهمتنا", content: "في عالم مهني يتطور باستمرار، يمكن أن يكون اختيار مسارك تحديًا. تم إنشاء QuizOrientation لتبسيط هذه العملية من خلال تقديم أداة تقييم ذاتي مجانية ومتاحة للجميع." },
      section2: { title: "كيف يعمل", content: "يعتمد اختبار التوجيه المهني لدينا على منهجية مثبتة تحلل خمسة أبعاد رئيسية لملفك: الإبداع، المهارات التقنية، العلاقات الاجتماعية، التنظيم والريادة." },
      section3: { title: "قيمنا", content: "في QuizOrientation، نقدر إمكانية الوصول والشفافية والابتكار. خدمتنا مجانية تمامًا ومتاحة للجميع، دون شروط." },
      section4: { title: "لمن؟", content: "QuizOrientation موجهة لكل من يتساءل عن مستقبله المهني: الطلاب الباحثين عن التوجيه، الأشخاص في مرحلة انتقال مهني، الموظفون الراغبون في التطور في مسيرتهم المهنية." },
      section5: { title: "فريقنا", content: "تم تطوير QuizOrientation من قبل فريق شغوف بالتوجيه المهني والتقنيات الجديدة. نجمع بين الخبرة في علم نفس العمل ومعرفة سوق العمل والمهارات التقنية." },
      section6: { title: "التزامنا", content: "نلتزم بالحفاظ على QuizOrientation مجانيًا ومتاحًا للجميع. نلتزم أيضًا بحماية بياناتك الشخصية واحترام خصوصيتك." },
      section7: { title: "الاتصال", content: "هل لديك أسئلة أو اقتراحات أو ملاحظات؟ سنكون سعداء للغاية بسماع منك! لا تتردد في الاتصال بنا على contact@quizorientation.online." }
    }
  }

  const pageContent = content[language] || content.fr

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead 
        page="legal" 
        customTitle={`${pageContent.title} | QuizOrientation`}
        customDescription={`Découvrez QuizOrientation : notre mission, nos valeurs et notre engagement pour vous aider à trouver votre voie professionnelle.`}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-6">
            {pageContent.h1}
          </h1>
          
          <div className={`prose max-w-none text-gray-700 ${language === 'ar' ? 'rtl' : ''}`}>
            <p className="mb-6 text-sm">
              {pageContent.intro}
            </p>
            
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <section key={num} className="mb-8">
                <h2 className="text-xl font-bold text-primary-900 mb-4">
                  {pageContent[`section${num}`].title}
                </h2>
                <p className="mb-4 text-sm">
                  {pageContent[`section${num}`].content}
                </p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}

export default APropos

