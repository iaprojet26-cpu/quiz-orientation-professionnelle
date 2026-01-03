import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'
import { trackContactFormSubmit } from '../utils/analytics'

function Contact() {
  const { t, i18n } = useTranslation()
  const language = i18n.language || 'fr'
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Validation simple
    if (!formData.name || !formData.email || !formData.message) {
      setError(language === 'fr' ? 'Veuillez remplir tous les champs obligatoires.' : language === 'en' ? 'Please fill in all required fields.' : 'يرجى ملء جميع الحقول المطلوبة.')
      return
    }

    // Simuler l'envoi (à remplacer par un vrai service d'email)
    try {
      // Ici, vous pouvez intégrer un service comme EmailJS, Formspree, ou une API
      console.log('Formulaire soumis:', formData)
      
      // Tracker l'envoi du formulaire
      trackContactFormSubmit()
      
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Réinitialiser après 5 secondes
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(language === 'fr' ? 'Une erreur est survenue. Veuillez réessayer.' : language === 'en' ? 'An error occurred. Please try again.' : 'حدث خطأ. يرجى المحاولة مرة أخرى.')
    }
  }

  const content = {
    fr: {
      title: "Contact",
      h1: "Contactez-Nous",
      intro: "Vous avez une question, une suggestion ou besoin d'aide ? N'hésitez pas à nous contacter. Nous répondons à toutes les demandes dans les meilleurs délais.",
      name: "Nom *",
      email: "Email *",
      subject: "Sujet",
      message: "Message *",
      submit: "Envoyer",
      success: "Merci ! Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.",
      error: "Une erreur est survenue. Veuillez réessayer."
    },
    en: {
      title: "Contact",
      h1: "Contact Us",
      intro: "Do you have a question, suggestion or need help? Feel free to contact us. We respond to all requests as soon as possible.",
      name: "Name *",
      email: "Email *",
      subject: "Subject",
      message: "Message *",
      submit: "Send",
      success: "Thank you! Your message has been sent. We will respond as soon as possible.",
      error: "An error occurred. Please try again."
    },
    ar: {
      title: "اتصل بنا",
      h1: "اتصل بنا",
      intro: "هل لديك سؤال أو اقتراح أو تحتاج إلى مساعدة؟ لا تتردد في الاتصال بنا. نرد على جميع الطلبات في أقرب وقت ممكن.",
      name: "الاسم *",
      email: "البريد الإلكتروني *",
      subject: "الموضوع",
      message: "الرسالة *",
      submit: "إرسال",
      success: "شكرًا لك! تم إرسال رسالتك. سنرد في أقرب وقت ممكن.",
      error: "حدث خطأ. يرجى المحاولة مرة أخرى."
    }
  }

  const pageContent = content[language] || content.fr

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead 
        page="legal" 
        customTitle={`${pageContent.title} | QuizOrientation`}
        customDescription={`Contactez QuizOrientation. Posez vos questions, partagez vos suggestions ou demandez de l'aide. Nous répondons rapidement.`}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-6">
            {pageContent.h1}
          </h1>
          
          <div className={`prose max-w-none text-gray-700 mb-8 ${language === 'ar' ? 'rtl' : ''}`}>
            <p className="mb-6 text-base leading-relaxed">
              {pageContent.intro}
            </p>
            <p className="text-base mb-4">
              <strong>Email :</strong> <a href="mailto:contact@quizorientation.online" className="text-primary-600 hover:underline">contact@quizorientation.online</a>
            </p>
            <div className="bg-primary-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold text-primary-900 mb-3">
                {language === 'fr' ? 'Pourquoi nous contacter ?' : language === 'en' ? 'Why contact us?' : 'لماذا تتصل بنا؟'}
              </h2>
              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                {language === 'fr' 
                  ? 'Notre équipe est à votre disposition pour répondre à toutes vos questions concernant l\'orientation professionnelle, notre quiz d\'orientation, les métiers d\'avenir, ou toute autre demande. Que vous soyez étudiant, parent, enseignant ou professionnel en reconversion, nous sommes là pour vous accompagner dans votre démarche d\'orientation. Nous répondons généralement sous 24-48 heures et nous nous efforçons de fournir des réponses complètes et personnalisées à chaque demande.'
                  : language === 'en'
                  ? 'Our team is available to answer all your questions about career orientation, our orientation quiz, future careers, or any other request. Whether you are a student, parent, teacher, or professional in career transition, we are here to support you in your orientation process. We usually respond within 24-48 hours and strive to provide complete and personalized answers to each request.'
                  : 'فريقنا متاح للإجابة على جميع أسئلتك حول التوجيه المهني، اختبار التوجيه لدينا، المهن المستقبلية، أو أي طلب آخر. سواء كنت طالبًا أو ولي أمر أو معلمًا أو محترفًا في مرحلة انتقال مهني، نحن هنا لدعمك في عملية التوجيه الخاصة بك. عادة ما نرد خلال 24-48 ساعة ونسعى جاهدين لتقديم إجابات كاملة ومخصصة لكل طلب.'}
              </p>
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                {language === 'fr' ? 'Types de demandes que nous traitons :' : language === 'en' ? 'Types of requests we handle:' : 'أنواع الطلبات التي نتعامل معها:'}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
                <li>{language === 'fr' ? 'Questions sur le fonctionnement du quiz d\'orientation' : language === 'en' ? 'Questions about how the orientation quiz works' : 'أسئلة حول كيفية عمل اختبار التوجيه'}</li>
                <li>{language === 'fr' ? 'Conseils personnalisés sur l\'orientation professionnelle' : language === 'en' ? 'Personalized advice on career orientation' : 'نصائح مخصصة حول التوجيه المهني'}</li>
                <li>{language === 'fr' ? 'Informations sur les métiers et les formations' : language === 'en' ? 'Information about careers and training' : 'معلومات حول المهن والتدريب'}</li>
                <li>{language === 'fr' ? 'Partenariats et collaborations' : language === 'en' ? 'Partnerships and collaborations' : 'الشراكات والتعاون'}</li>
                <li>{language === 'fr' ? 'Signaler un problème technique' : language === 'en' ? 'Report a technical issue' : 'الإبلاغ عن مشكلة تقنية'}</li>
                <li>{language === 'fr' ? 'Suggestions d\'amélioration' : language === 'en' ? 'Improvement suggestions' : 'اقتراحات للتحسين'}</li>
              </ul>
            </div>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg mb-6">
              {pageContent.success}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {pageContent.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {pageContent.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {pageContent.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {pageContent.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                {pageContent.submit}
              </button>
            </form>
          )}
        </article>
      </div>
    </div>
  )
}

export default Contact

