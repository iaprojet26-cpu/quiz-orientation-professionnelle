import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

function PolitiqueConfidentialite() {
  const { t, i18n } = useTranslation()
  const language = i18n.language || 'fr'

  const content = {
    fr: {
      title: "Politique de Confidentialité",
      h1: "Politique de Confidentialité",
      intro: "La présente politique de confidentialité décrit la manière dont quizorientation collecte, utilise et protège les informations que vous nous fournissez lorsque vous utilisez notre site web quizorientation.online.",
      
      section1: {
        title: "1. Collecte des Données Personnelles",
        content: "Lors de votre utilisation du site quizorientation.online, nous pouvons collecter les informations suivantes : les réponses que vous fournissez lors du quiz d'orientation professionnelle, votre profil professionnel généré, les données de navigation (adresse IP, type de navigateur, pages visitées), et toute autre information que vous choisissez de nous communiquer via les formulaires de contact. Ces données sont collectées de manière volontaire lorsque vous utilisez nos services."
      },
      
      section2: {
        title: "2. Utilisation des Données",
        content: "Les données personnelles collectées sont utilisées exclusivement aux fins suivantes : générer votre profil professionnel personnalisé basé sur vos réponses au quiz, vous proposer des recommandations de métiers et de formations adaptées à votre profil, améliorer nos services et l'expérience utilisateur, répondre à vos demandes de contact, et envoyer des communications relatives à nos services (uniquement avec votre consentement). Nous ne vendons, ne louons ni ne partageons vos données personnelles à des tiers à des fins commerciales."
      },
      
      section3: {
        title: "3. Conservation des Données",
        content: "Vos données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées. Les données de quiz sont conservées pour vous permettre de consulter vos résultats à tout moment. Vous pouvez demander la suppression de vos données à tout moment en nous contactant à l'adresse contact@quizorientation.online. Les données seront supprimées dans un délai de 30 jours maximum après votre demande."
      },
      
      section4: {
        title: "4. Vos Droits",
        content: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles : droit d'accès à vos données personnelles, droit de rectification des données inexactes, droit à l'effacement de vos données, droit à la limitation du traitement, droit à la portabilité de vos données, droit d'opposition au traitement de vos données. Pour exercer ces droits, vous pouvez nous contacter à l'adresse contact@quizorientation.online. Nous nous engageons à répondre à votre demande dans un délai d'un mois."
      },
      
      section5: {
        title: "5. Sécurité des Données",
        content: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte, destruction ou altération. Nos données sont hébergées sur des serveurs sécurisés et nous utilisons des protocoles de chiffrement pour protéger les transmissions de données. Cependant, aucune méthode de transmission sur Internet n'est totalement sécurisée et nous ne pouvons garantir une sécurité absolue."
      },
      
      section6: {
        title: "6. Cookies et Publicités",
        content: "Le site quizorientation.online utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil. Nous utilisons des cookies techniques nécessaires au fonctionnement du site, des cookies analytiques pour comprendre comment les visiteurs utilisent notre site, et des cookies de préférences pour mémoriser vos choix (comme la langue sélectionnée). Notre site utilise également Google AdSense pour afficher des publicités. Google AdSense utilise des cookies pour personnaliser les publicités en fonction de vos visites sur notre site et d'autres sites web. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site et l'affichage des publicités. Pour en savoir plus sur l'utilisation des cookies par Google AdSense, consultez la politique de confidentialité de Google : https://policies.google.com/privacy."
      },
      
      section7: {
        title: "7. Liens vers d'Autres Sites",
        content: "Notre site peut contenir des liens vers d'autres sites web. Nous ne sommes pas responsables des pratiques de confidentialité ou du contenu de ces sites externes. Nous vous encourageons à lire les politiques de confidentialité de tout site que vous visitez via nos liens."
      },
      
      section8: {
        title: "8. Modifications de la Politique",
        content: "Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement cette page pour rester informé de la manière dont nous protégeons vos données."
      },
      
      section9: {
        title: "9. Contact",
        content: "Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter à l'adresse suivante : contact@quizorientation.online. Nous nous engageons à répondre à vos demandes dans les meilleurs délais."
      }
    },
    en: {
      title: "Privacy Policy",
      h1: "Privacy Policy",
      intro: "This privacy policy describes how quizorientation collects, uses and protects the information you provide to us when you use our website quizorientation.online.",
      section1: { title: "1. Collection of Personal Data", content: "When you use the quizorientation.online website, we may collect the following information: the answers you provide during the career orientation quiz, your generated professional profile, navigation data (IP address, browser type, pages visited), and any other information you choose to provide to us through contact forms." },
      section2: { title: "2. Use of Data", content: "The personal data collected is used exclusively for the following purposes: generating your personalized professional profile based on your quiz answers, providing you with job and training recommendations tailored to your profile, improving our services and user experience, responding to your contact requests, and sending communications related to our services (only with your consent)." },
      section3: { title: "3. Data Retention", content: "Your personal data is retained only for the duration necessary for the purposes for which it was collected. Quiz data is retained to allow you to consult your results at any time. You can request deletion of your data at any time by contacting us at contact@quizorientation.online." },
      section4: { title: "4. Your Rights", content: "In accordance with the General Data Protection Regulation (GDPR), you have the following rights regarding your personal data: right of access, right to rectification, right to erasure, right to restriction of processing, right to data portability, right to object to processing." },
      section5: { title: "5. Data Security", content: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, destruction or alteration. Our data is hosted on secure servers and we use encryption protocols to protect data transmissions." },
      section6: { title: "6. Cookies and Advertising", content: "The quizorientation.online website uses cookies to improve your browsing experience. We use technical cookies necessary for the site's operation, analytical cookies to understand how visitors use our site, and preference cookies to remember your choices (such as the selected language). Our site also uses Google AdSense to display advertisements. Google AdSense uses cookies to personalize ads based on your visits to our site and other websites. You can configure your browser to refuse cookies, but this may affect some site features and ad display. To learn more about Google AdSense's use of cookies, visit Google's privacy policy: https://policies.google.com/privacy." },
      section7: { title: "7. Links to Other Sites", content: "Our site may contain links to other websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any site you visit via our links." },
      section8: { title: "8. Policy Changes", content: "We reserve the right to modify this privacy policy at any time. Any changes will be published on this page with an update date. We encourage you to regularly consult this page to stay informed about how we protect your data." },
      section9: { title: "9. Contact", content: "For any questions regarding this privacy policy or to exercise your rights, you can contact us at the following address: contact@quizorientation.online." }
    },
    ar: {
      title: "سياسة الخصوصية",
      h1: "سياسة الخصوصية",
      intro: "تصف سياسة الخصوصية هذه كيفية جمع quizorientation واستخدامه وحماية المعلومات التي تقدمها لنا عند استخدام موقعنا الإلكتروني quizorientation.online.",
      section1: { title: "1. جمع البيانات الشخصية", content: "عند استخدام موقع quizorientation.online، قد نجمع المعلومات التالية: الإجابات التي تقدمها أثناء اختبار التوجيه المهني، ملفك المهني المولد، بيانات التنقل (عنوان IP، نوع المتصفح، الصفحات التي تمت زيارتها)." },
      section2: { title: "2. استخدام البيانات", content: "يتم استخدام البيانات الشخصية المجمعة حصريًا للأغراض التالية: إنشاء ملفك المهني الشخصي بناءً على إجاباتك في الاختبار، تقديم توصيات المهن والتدريب المناسبة لملفك." },
      section3: { title: "3. الاحتفاظ بالبيانات", content: "يتم الاحتفاظ ببياناتك الشخصية فقط للمدة اللازمة للأغراض التي تم جمعها من أجلها. يمكنك طلب حذف بياناتك في أي وقت عن طريق الاتصال بنا على contact@quizorientation.online." },
      section4: { title: "4. حقوقك", content: "وفقًا للائحة العامة لحماية البيانات (RGPD)، لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية: حق الوصول، حق التصحيح، حق الحذف، حق تقييد المعالجة، حق نقل البيانات، حق الاعتراض على المعالجة." },
      section5: { title: "5. أمان البيانات", content: "ننفذ تدابير تقنية وتنظيمية مناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو الفقدان أو التدمير أو التغيير." },
      section6: { title: "6. ملفات تعريف الارتباط والإعلانات", content: "يستخدم موقع quizorientation.online ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك. نستخدم ملفات تعريف الارتباط التقنية الضرورية لتشغيل الموقع وملفات تعريف الارتباط التحليلية لفهم كيفية استخدام الزوار لموقعنا. يستخدم موقعنا أيضًا Google AdSense لعرض الإعلانات. يستخدم Google AdSense ملفات تعريف الارتباط لتخصيص الإعلانات بناءً على زياراتك لموقعنا ومواقع الويب الأخرى. يمكنك تكوين متصفحك لرفض ملفات تعريف الارتباط، ولكن قد يؤثر ذلك على بعض ميزات الموقع وعرض الإعلانات." },
      section7: { title: "7. الروابط إلى مواقع أخرى", content: "قد يحتوي موقعنا على روابط لمواقع إلكترونية أخرى. نحن لسنا مسؤولين عن ممارسات الخصوصية أو محتوى هذه المواقع الخارجية." },
      section8: { title: "8. تغييرات السياسة", content: "نحتفظ بالحق في تعديل سياسة الخصوصية هذه في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة مع تاريخ التحديث." },
      section9: { title: "9. الاتصال", content: "لأي أسئلة تتعلق بهذه سياسة الخصوصية أو لممارسة حقوقك، يمكنك الاتصال بنا على العنوان التالي: contact@quizorientation.online." }
    }
  }

  const pageContent = content[language] || content.fr

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead 
        page="legal" 
        customTitle={`${pageContent.title} | QuizOrientation`}
        customDescription={`${pageContent.title} de quizorientation.online. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.`}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-6">
            {pageContent.h1}
          </h1>
          
          <div className={`prose max-w-none text-gray-700 ${language === 'ar' ? 'rtl' : ''}`}>
            <p className="mb-6 text-base leading-relaxed">
              {pageContent.intro}
            </p>
            
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <section key={num} className="mb-8">
                <h2 className="text-xl font-bold text-primary-900 mb-4">
                  {pageContent[`section${num}`].title}
                </h2>
                <p className="mb-4 text-base leading-relaxed">
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

export default PolitiqueConfidentialite

