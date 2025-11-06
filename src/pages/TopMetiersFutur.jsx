import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

function TopMetiersFutur() {
  const { t, i18n } = useTranslation()
  const language = i18n.language || 'fr'

  // Métiers du futur avec descriptions SEO
  const metiers = {
    fr: [
      {
        titre: "Développeur Intelligence Artificielle",
        description: "Spécialiste de l'IA et du machine learning, ce métier est en pleine expansion. Les entreprises recherchent des experts capables de créer des systèmes intelligents pour automatiser les processus et améliorer l'expérience utilisateur.",
        competences: ["Python", "Machine Learning", "Deep Learning", "Big Data"],
        formation: "Master en Intelligence Artificielle, École d'ingénieurs spécialisée"
      },
      {
        titre: "Expert en Cybersécurité",
        description: "Avec la digitalisation croissante, la protection des données devient cruciale. Les experts en cybersécurité sont très recherchés pour protéger les systèmes informatiques contre les cyberattaques.",
        competences: ["Sécurité réseau", "Ethical Hacking", "Cryptographie", "Analyse de risques"],
        formation: "Master en Cybersécurité, Certifications (CISSP, CEH)"
      },
      {
        titre: "Data Analyst / Data Scientist",
        description: "Les entreprises génèrent d'énormes quantités de données. Les data analysts transforment ces données en insights actionnables pour prendre des décisions stratégiques.",
        competences: ["SQL", "Python", "Tableau", "Statistiques", "Visualisation de données"],
        formation: "Master en Data Science, École de commerce avec spécialisation data"
      },
      {
        titre: "Spécialiste en Marketing Digital",
        description: "Le marketing digital évolue constamment avec les nouvelles plateformes et technologies. Les spécialistes maîtrisent le SEO, les réseaux sociaux, l'email marketing et l'analyse de performance.",
        competences: ["SEO/SEA", "Réseaux sociaux", "Google Analytics", "Content Marketing"],
        formation: "Master en Marketing Digital, École de communication"
      },
      {
        titre: "Consultant en Transformation Digitale",
        description: "Les entreprises ont besoin d'accompagnement pour leur transformation numérique. Ce métier combine expertise technique et conseil stratégique.",
        competences: ["Stratégie digitale", "Gestion de projet", "Change management", "Technologies émergentes"],
        formation: "MBA, École de commerce, Certifications agiles"
      },
      {
        titre: "Ingénieur Cloud / DevOps",
        description: "Avec la migration vers le cloud, les ingénieurs DevOps sont essentiels pour gérer l'infrastructure, l'automatisation et la continuité des services.",
        competences: ["AWS/Azure/GCP", "Docker", "Kubernetes", "CI/CD", "Infrastructure as Code"],
        formation: "École d'ingénieurs, Certifications cloud (AWS, Azure)"
      },
      {
        titre: "Designer UX/UI",
        description: "L'expérience utilisateur est au cœur de la réussite des produits digitaux. Les designers UX/UI créent des interfaces intuitives et engageantes.",
        competences: ["Design thinking", "Prototypage", "Figma", "User research", "Accessibilité"],
        formation: "École de design, Master en UX Design, Bootcamps spécialisés"
      },
      {
        titre: "Spécialiste en Développement Durable",
        description: "La transition écologique crée de nouveaux métiers. Les spécialistes en RSE, énergies renouvelables et économie circulaire sont de plus en plus demandés.",
        competences: ["RSE", "Bilan carbone", "Énergies renouvelables", "Économie circulaire"],
        formation: "Master en Développement Durable, École d'ingénieurs environnement"
      }
    ],
    en: [
      {
        titre: "AI Developer",
        description: "Specialist in AI and machine learning, this career is rapidly expanding. Companies are looking for experts capable of creating intelligent systems to automate processes and improve user experience.",
        competences: ["Python", "Machine Learning", "Deep Learning", "Big Data"],
        formation: "Master's in Artificial Intelligence, Specialized Engineering School"
      },
      {
        titre: "Cybersecurity Expert",
        description: "With growing digitalization, data protection becomes crucial. Cybersecurity experts are highly sought after to protect IT systems against cyberattacks.",
        competences: ["Network Security", "Ethical Hacking", "Cryptography", "Risk Analysis"],
        formation: "Master's in Cybersecurity, Certifications (CISSP, CEH)"
      },
      {
        titre: "Data Analyst / Data Scientist",
        description: "Companies generate enormous amounts of data. Data analysts transform this data into actionable insights for strategic decision-making.",
        competences: ["SQL", "Python", "Tableau", "Statistics", "Data Visualization"],
        formation: "Master's in Data Science, Business School with data specialization"
      },
      {
        titre: "Digital Marketing Specialist",
        description: "Digital marketing constantly evolves with new platforms and technologies. Specialists master SEO, social media, email marketing, and performance analysis.",
        competences: ["SEO/SEA", "Social Media", "Google Analytics", "Content Marketing"],
        formation: "Master's in Digital Marketing, Communication School"
      },
      {
        titre: "Digital Transformation Consultant",
        description: "Companies need support for their digital transformation. This career combines technical expertise and strategic consulting.",
        competences: ["Digital Strategy", "Project Management", "Change Management", "Emerging Technologies"],
        formation: "MBA, Business School, Agile Certifications"
      },
      {
        titre: "Cloud Engineer / DevOps",
        description: "With migration to the cloud, DevOps engineers are essential for managing infrastructure, automation, and service continuity.",
        competences: ["AWS/Azure/GCP", "Docker", "Kubernetes", "CI/CD", "Infrastructure as Code"],
        formation: "Engineering School, Cloud Certifications (AWS, Azure)"
      },
      {
        titre: "UX/UI Designer",
        description: "User experience is at the heart of digital product success. UX/UI designers create intuitive and engaging interfaces.",
        competences: ["Design Thinking", "Prototyping", "Figma", "User Research", "Accessibility"],
        formation: "Design School, Master's in UX Design, Specialized Bootcamps"
      },
      {
        titre: "Sustainability Specialist",
        description: "The ecological transition creates new careers. Specialists in CSR, renewable energy, and circular economy are increasingly in demand.",
        competences: ["CSR", "Carbon Footprint", "Renewable Energy", "Circular Economy"],
        formation: "Master's in Sustainable Development, Environmental Engineering School"
      }
    ],
    ar: [
      {
        titre: "مطور الذكاء الاصطناعي",
        description: "متخصص في الذكاء الاصطناعي والتعلم الآلي، هذه المهنة في توسع مستمر. تبحث الشركات عن خبراء قادرين على إنشاء أنظمة ذكية لأتمتة العمليات وتحسين تجربة المستخدم.",
        competences: ["Python", "Machine Learning", "Deep Learning", "Big Data"],
        formation: "ماجستير في الذكاء الاصطناعي، مدرسة هندسية متخصصة"
      },
      {
        titre: "خبير الأمن السيبراني",
        description: "مع الترقيم المتزايد، أصبحت حماية البيانات أمراً حاسماً. يبحث عن خبراء الأمن السيبراني لحماية الأنظمة المعلوماتية من الهجمات السيبرانية.",
        competences: ["أمن الشبكات", "الاختراق الأخلاقي", "التشفير", "تحليل المخاطر"],
        formation: "ماجستير في الأمن السيبراني، شهادات (CISSP, CEH)"
      },
      {
        titre: "محلل البيانات / عالم البيانات",
        description: "تولد الشركات كميات هائلة من البيانات. يحول محللو البيانات هذه البيانات إلى رؤى قابلة للتنفيذ لاتخاذ قرارات استراتيجية.",
        competences: ["SQL", "Python", "Tableau", "الإحصاء", "تصور البيانات"],
        formation: "ماجستير في علوم البيانات، كلية إدارة الأعمال مع تخصص في البيانات"
      },
      {
        titre: "متخصص في التسويق الرقمي",
        description: "يتطور التسويق الرقمي باستمرار مع المنصات والتقنيات الجديدة. يتقن المتخصصون SEO، وسائل التواصل الاجتماعي، التسويق عبر البريد الإلكتروني، وتحليل الأداء.",
        competences: ["SEO/SEA", "وسائل التواصل الاجتماعي", "Google Analytics", "تسويق المحتوى"],
        formation: "ماجستير في التسويق الرقمي، مدرسة الاتصال"
      },
      {
        titre: "استشاري التحول الرقمي",
        description: "تحتاج الشركات إلى الدعم لتحولها الرقمي. تجمع هذه المهنة بين الخبرة التقنية والاستشارة الاستراتيجية.",
        competences: ["الاستراتيجية الرقمية", "إدارة المشاريع", "إدارة التغيير", "التقنيات الناشئة"],
        formation: "MBA، كلية إدارة الأعمال، شهادات Agile"
      },
      {
        titre: "مهندس السحابة / DevOps",
        description: "مع الهجرة إلى السحابة، يعتبر مهندسو DevOps ضروريين لإدارة البنية التحتية والأتمتة واستمرارية الخدمات.",
        competences: ["AWS/Azure/GCP", "Docker", "Kubernetes", "CI/CD", "Infrastructure as Code"],
        formation: "مدرسة هندسية، شهادات السحابة (AWS, Azure)"
      },
      {
        titre: "مصمم UX/UI",
        description: "تجربة المستخدم في قلب نجاح المنتجات الرقمية. ينشئ مصممو UX/UI واجهات بديهية وجذابة.",
        competences: ["التفكير التصميمي", "النمذجة", "Figma", "بحوث المستخدم", "إمكانية الوصول"],
        formation: "مدرسة التصميم، ماجستير في تصميم UX، معسكرات تدريبية متخصصة"
      },
      {
        titre: "متخصص في التنمية المستدامة",
        description: "ينشئ التحول البيئي مهناً جديدة. المتخصصون في المسؤولية الاجتماعية للشركات، والطاقات المتجددة، والاقتصاد الدائري مطلوبون بشكل متزايد.",
        competences: ["المسؤولية الاجتماعية للشركات", "البصمة الكربونية", "الطاقات المتجددة", "الاقتصاد الدائري"],
        formation: "ماجستير في التنمية المستدامة، مدرسة هندسية بيئية"
      }
    ]
  }

  const metiersList = metiers[language] || metiers.fr

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <SEOHead 
        page="top-metiers" 
        customTitle={language === 'fr' ? 'Top Métiers du Futur 2025-2030 | QuizOrientation' : language === 'en' ? 'Top Future Careers 2025-2030 | QuizOrientation' : 'أفضل المهن المستقبلية 2025-2030 | QuizOrientation'}
        customDescription={language === 'fr' ? 'Découvrez les métiers d\'avenir les plus prometteurs pour 2025-2030. Intelligence Artificielle, Cybersécurité, Data Science, Marketing Digital et plus encore. Trouvez votre voie professionnelle.' : language === 'en' ? 'Discover the most promising future careers for 2025-2030. Artificial Intelligence, Cybersecurity, Data Science, Digital Marketing and more. Find your career path.' : 'اكتشف المهن المستقبلية الأكثر وعداً لعام 2025-2030. الذكاء الاصطناعي، الأمن السيبراني، علوم البيانات، التسويق الرقمي والمزيد. اعثر على مسارك المهني.'}
      />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            {language === 'fr' ? 'Top Métiers du Futur 2025-2030' : language === 'en' ? 'Top Future Careers 2025-2030' : 'أفضل المهن المستقبلية 2025-2030'}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
            {language === 'fr' ? 'Découvrez les métiers les plus prometteurs pour les prochaines années. Ces professions sont en forte croissance et offrent d\'excellentes perspectives d\'emploi.' : language === 'en' ? 'Discover the most promising careers for the coming years. These professions are experiencing strong growth and offer excellent job prospects.' : 'اكتشف المهن الأكثر وعداً للسنوات القادمة. هذه المهن تشهد نمواً قوياً وتوفر آفاقاً وظيفية ممتازة.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link to="/" className="btn-primary">
              {language === 'fr' ? '🎯 Faire le test d\'orientation' : language === 'en' ? '🎯 Take the orientation test' : '🎯 قم باختبار التوجيه'}
            </Link>
            <Link to="/blog" className="btn-secondary">
              {language === 'fr' ? '📚 Lire nos articles' : language === 'en' ? '📚 Read our articles' : '📚 اقرأ مقالاتنا'}
            </Link>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {metiersList.map((metier, index) => (
            <div key={index} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '💼'}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-primary-900 mb-3">
                    {metier.titre}
                  </h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {metier.description}
                  </p>
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'fr' ? 'Compétences clés :' : language === 'en' ? 'Key Skills:' : 'المهارات الأساسية:'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {metier.competences.map((comp, i) => (
                        <span key={i} className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'fr' ? 'Formation recommandée :' : language === 'en' ? 'Recommended Training:' : 'التدريب الموصى به:'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {metier.formation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'fr' ? 'Trouvez Votre Métier Idéal' : language === 'en' ? 'Find Your Ideal Career' : 'اعثر على مهنتك المثالية'}
          </h2>
          <p className="text-xl mb-6 opacity-90">
            {language === 'fr' ? 'Notre test d\'orientation gratuit vous aide à identifier le métier qui correspond à votre profil.' : language === 'en' ? 'Our free orientation test helps you identify the career that matches your profile.' : 'يساعدك اختبار التوجيه المجاني لدينا على تحديد المهنة التي تطابق ملفك الشخصي.'}
          </p>
          <Link to="/" className="btn-secondary bg-white text-primary-700 hover:bg-gray-100 inline-block">
            {language === 'fr' ? '🚀 Commencer le quiz maintenant' : language === 'en' ? '🚀 Start the quiz now' : '🚀 ابدأ الاختبار الآن'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopMetiersFutur

