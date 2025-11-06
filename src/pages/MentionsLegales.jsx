import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

function MentionsLegales() {
  const { t, i18n } = useTranslation()
  const language = i18n.language || 'fr'

  const content = {
    fr: {
      title: "Mentions Légales",
      h1: "Mentions Légales",
      intro: "Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site quizorientation.online l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.",
      
      section1: {
        title: "1. Éditeur du Site",
        content: "Le site quizorientation.online est édité par : quizorientation. Directeur de la publication : quizorientation. Contact : contact@quizorientation.online"
      },
      
      section2: {
        title: "2. Hébergement",
        content: "Le site quizorientation.online est hébergé par : Netlify, Inc. Adresse : 44 Montgomery Street, Suite 750, San Francisco, CA 94104, États-Unis. Site web : https://www.netlify.com"
      },
      
      section3: {
        title: "3. Collecte et Traitement des Données",
        content: "Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD) entré en vigueur le 25 mai 2018, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant. Pour exercer ce droit, vous pouvez nous contacter à l'adresse suivante : contact@quizorientation.online. Les données collectées lors de l'utilisation du quiz d'orientation professionnelle sont utilisées uniquement dans le but de générer votre profil professionnel et de vous proposer des recommandations personnalisées. Aucune donnée personnelle n'est vendue à des tiers."
      },
      
      section4: {
        title: "4. Propriété Intellectuelle",
        content: "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse de l'éditeur. Les marques, logos, signes distinctifs et tout autre contenu du site sont protégés par le Code de la propriété intellectuelle et appartiennent à l'éditeur."
      },
      
      section5: {
        title: "5. Responsabilité",
        content: "L'éditeur s'efforce de fournir sur le site quizorientation.online des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. Tous les informations indiquées sur le site quizorientation.online sont données à titre indicatif, et sont susceptibles d'évoluer. Par ailleurs, les renseignements figurant sur le site quizorientation.online ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne."
      },
      
      section6: {
        title: "6. Liens Hypertextes",
        content: "Le site quizorientation.online peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site quizorientation.online. Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l'éditeur. Aucune autorisation ni demande d'information préalable ne peut être exigée par l'éditeur à l'égard d'un site qui souhaite établir un lien vers le site de l'éditeur. Il convient toutefois d'afficher ce site dans une nouvelle fenêtre du navigateur."
      },
      
      section7: {
        title: "7. Cookies",
        content: "Le site quizorientation.online peut être amené à vous demander l'acceptation des cookies pour des besoins de statistiques et d'affichage. Un cookie est une information déposée sur votre disque dur par le serveur du site que vous visitez. Il contient plusieurs données qui sont stockées sur votre ordinateur dans un simple fichier texte auquel un serveur accède pour lire et enregistrer des informations. Certaines parties de ce site ne peuvent être fonctionnelles sans l'acceptation de cookies."
      },
      
      section8: {
        title: "8. Contact",
        content: "Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l'adresse suivante : contact@quizorientation.online."
      }
    },
    en: {
      title: "Legal Notice",
      h1: "Legal Notice",
      intro: "In accordance with the provisions of Law No. 2004-575 of June 21, 2004 on confidence in the digital economy, users of the quizorientation.online website are informed of the identity of the various parties involved in its creation and monitoring.",
      section1: { title: "1. Site Publisher", content: "The quizorientation.online website is published by: quizorientation. Publication director: quizorientation. Contact: contact@quizorientation.online." },
      section2: { title: "2. Hosting", content: "The quizorientation.online website is hosted by: Netlify, Inc. Address: 44 Montgomery Street, Suite 750, San Francisco, CA 94104, United States. Website: https://www.netlify.com" },
      section3: { title: "3. Data Collection and Processing", content: "In accordance with the 'Data Protection Act' of January 6, 1978, as amended, and the General Data Protection Regulation (GDPR) that came into effect on May 25, 2018, you have the right to access, rectify, delete and object to personal data concerning you. To exercise this right, you can contact us at the following address: contact@quizorientation.online. Data collected during the use of the career orientation quiz is used solely for the purpose of generating your professional profile and providing you with personalized recommendations. No personal data is sold to third parties." },
      section4: { title: "4. Intellectual Property", content: "This entire site is subject to French and international legislation on copyright and intellectual property. All reproduction rights are reserved, including for downloadable documents and iconographic and photographic representations. Reproduction of all or part of this site on any electronic medium is strictly prohibited except with express authorization from the publisher." },
      section5: { title: "5. Liability", content: "The publisher strives to provide on the quizorientation.online website information as accurate as possible. However, it cannot be held responsible for omissions, inaccuracies and deficiencies in the update, whether due to itself or to third-party partners who provide this information." },
      section6: { title: "6. Hypertext Links", content: "The quizorientation.online website may contain hypertext links to other sites on the Internet network. Links to these other resources take you away from the quizorientation.online website." },
      section7: { title: "7. Cookies", content: "The quizorientation.online website may ask you to accept cookies for statistical and display purposes. A cookie is information deposited on your hard drive by the server of the site you visit." },
      section9: { title: "8. Contact", content: "For any questions regarding these legal notices, you can contact us at the following address: contact@quizorientation.online." }
    },
    ar: {
      title: "الإشعار القانوني",
      h1: "الإشعار القانوني",
      intro: "وفقًا لأحكام القانون رقم 2004-575 المؤرخ 21 يونيو 2004 بشأن الثقة في الاقتصاد الرقمي، يتم إبلاغ مستخدمي موقع quizorientation.online بهوية الأطراف المختلفة المشاركة في إنشائه ومراقبته.",
      section1: { title: "1. ناشر الموقع", content: "يتم نشر موقع quizorientation.online من قبل: quizorientation. مدير النشر: quizorientation. الاتصال: contact@quizorientation.online." },
      section2: { title: "2. الاستضافة", content: "يتم استضافة موقع quizorientation.online من قبل: Netlify, Inc. العنوان: 44 Montgomery Street, Suite 750, San Francisco, CA 94104, الولايات المتحدة. الموقع الإلكتروني: https://www.netlify.com" },
      section3: { title: "3. جمع البيانات ومعالجتها", content: "وفقًا لقانون 'المعلوماتية والحريات' المؤرخ 6 يناير 1978 المعدل واللائحة العامة لحماية البيانات (RGPD) التي دخلت حيز التنفيذ في 25 مايو 2018، لديك الحق في الوصول والتصحيح والحذف والاعتراض على البيانات الشخصية المتعلقة بك." },
      section4: { title: "4. الملكية الفكرية", content: "يخضع هذا الموقع بالكامل للتشريع الفرنسي والدولي بشأن حق المؤلف والملكية الفكرية. جميع حقوق الاستنساخ محفوظة." },
      section5: { title: "5. المسؤولية", content: "يسعى الناشر إلى توفير معلومات دقيقة قدر الإمكان على موقع quizorientation.online. ومع ذلك، لا يمكن أن يتحمل المسؤولية عن الأخطاء والتناقضات ونقص التحديث." },
      section6: { title: "6. الروابط التشعبية", content: "قد يحتوي موقع quizorientation.online على روابط تشعبية إلى مواقع أخرى على شبكة الإنترنت." },
      section7: { title: "7. ملفات تعريف الارتباط", content: "قد يطلب منك موقع quizorientation.online قبول ملفات تعريف الارتباط لأغراض إحصائية وعرضية." },
      section9: { title: "8. الاتصال", content: "لأي أسئلة تتعلق بهذا الإشعار القانوني، يمكنك الاتصال بنا على العنوان التالي: contact@quizorientation.online." }
    }
  }

  const pageContent = content[language] || content.fr

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead 
        page="legal" 
        customTitle={`${pageContent.title} | QuizOrientation`}
        customDescription={`${pageContent.title} du site quizorientation.online. Informations légales, éditeur, hébergement, propriété intellectuelle.`}
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
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                {pageContent.section1.title}
              </h2>
              <p className="mb-4 text-sm">
                {pageContent.section1.content}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                {pageContent.section2.title}
              </h2>
              <p className="mb-4 text-sm">
                {pageContent.section2.content}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                {pageContent.section3.title}
              </h2>
              <p className="mb-4 text-sm">
                {pageContent.section3.content}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                {pageContent.section4.title}
              </h2>
              <p className="mb-4 text-sm">
                {pageContent.section4.content}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                {pageContent.section5.title}
              </h2>
              <p className="mb-4 text-sm">
                {pageContent.section5.content}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                {pageContent.section6.title}
              </h2>
              <p className="mb-4 text-sm">
                {pageContent.section6.content}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                {pageContent.section7.title}
              </h2>
              <p className="mb-4 text-sm">
                {pageContent.section7.content}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                {pageContent.section8.title}
              </h2>
              <p className="mb-4 text-sm">
                {pageContent.section8.content}
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  )
}

export default MentionsLegales

