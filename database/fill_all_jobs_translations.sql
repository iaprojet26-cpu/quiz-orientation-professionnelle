-- ============================================
-- TRADUCTIONS COMPLÈTES DE TOUS LES MÉTIERS
-- ============================================
-- Ce script traduit TOUS les 25 métiers (nom et description)
-- Exécutez ce script dans Supabase SQL Editor

-- ============================================
-- MÉTIERS POUR LE PROFIL CRÉATIF (5 métiers)
-- ============================================

UPDATE jobs 
SET 
  nom_en = 'Graphic Designer',
  nom_ar = 'مصمم جرافيك',
  description_en = 'Visual creation for communication, marketing and media. You work on various projects from visual identity to marketing materials.',
  description_ar = 'إنشاء مرئي للتواصل والتسويق والإعلام. تعمل على مشاريع متنوعة من الهوية البصرية إلى مواد التسويق.'
WHERE nom = 'Graphiste';

UPDATE jobs 
SET 
  nom_en = 'Frontend Developer',
  nom_ar = 'مطور واجهات أمامية',
  description_en = 'Creation of interactive and aesthetic user interfaces. You combine creativity and technique to create exceptional user experiences.',
  description_ar = 'إنشاء واجهات مستخدم تفاعلية وجمالية. تجمع بين الإبداع والتقنية لإنشاء تجارب مستخدم استثنائية.'
WHERE nom = 'Développeur Frontend';

UPDATE jobs 
SET 
  nom_en = 'Interior Architect',
  nom_ar = 'مهندس معماري داخلي',
  description_en = 'Design and layout of functional and aesthetic interior spaces. You create environments that combine beauty and practicality.',
  description_ar = 'تصميم وتخطيط المساحات الداخلية الوظيفية والجمالية. تخلق بيئات تجمع بين الجمال والوظيفية.'
WHERE nom = 'Architecte d''intérieur';

UPDATE jobs 
SET 
  nom_en = 'Photographer',
  nom_ar = 'مصور',
  description_en = 'Creation of artistic or commercial images. You capture moments and emotions through the lens.',
  description_ar = 'إنشاء صور فنية أو تجارية. تلتقط اللحظات والعواطف من خلال العدسة.'
WHERE nom = 'Photographe';

UPDATE jobs 
SET 
  nom_en = 'Copywriter',
  nom_ar = 'كاتب إعلانات',
  description_en = 'Creation of creative content for advertising and communication. You imagine campaigns that make an impact.',
  description_ar = 'إنشاء محتوى إبداعي للإعلان والتواصل. تتخيل حملات تترك أثراً.'
WHERE nom = 'Concepteur-rédacteur';

-- ============================================
-- MÉTIERS POUR LE PROFIL TECHNIQUE (5 métiers)
-- ============================================

UPDATE jobs 
SET 
  nom_en = 'Software Engineer',
  nom_ar = 'مهندس برمجيات',
  description_en = 'Design and development of complex computer systems. You create innovative technological solutions.',
  description_ar = 'تصميم وتطوير أنظمة الحاسوب المعقدة. تخلق حلولاً تكنولوجية مبتكرة.'
WHERE nom = 'Ingénieur Logiciel';

UPDATE jobs 
SET 
  nom_en = 'Data Analyst',
  nom_ar = 'محلل بيانات',
  description_en = 'Data analysis to help decision-making. You transform data into actionable insights.',
  description_ar = 'تحليل البيانات لمساعدة اتخاذ القرارات. تحول البيانات إلى رؤى قابلة للتنفيذ.'
WHERE nom = 'Data Analyst';

UPDATE jobs 
SET 
  nom_en = 'Systems Engineer',
  nom_ar = 'مهندس أنظمة',
  description_en = 'Administration and optimization of IT infrastructures. You ensure system performance and security.',
  description_ar = 'إدارة وتحسين البنى التحتية لتكنولوجيا المعلومات. تضمن أداء وأمان الأنظمة.'
WHERE nom = 'Ingénieur Système';

UPDATE jobs 
SET 
  nom_en = 'Backend Developer',
  nom_ar = 'مطور خلفي',
  description_en = 'Development of server logic and APIs. You create the robust foundations of applications.',
  description_ar = 'تطوير منطق الخادم وواجهات برمجة التطبيقات. تخلق الأسس القوية للتطبيقات.'
WHERE nom = 'Développeur Backend';

UPDATE jobs 
SET 
  nom_en = 'Cybersecurity Specialist',
  nom_ar = 'أخصائي الأمن السيبراني',
  description_en = 'Protection of systems and data against cyber threats. You are the guardian of digital security.',
  description_ar = 'حماية الأنظمة والبيانات من التهديدات السيبرانية. أنت حارس الأمن الرقمي.'
WHERE nom = 'Cybersécurité';

-- ============================================
-- MÉTIERS POUR LE PROFIL SOCIAL (5 métiers)
-- ============================================

UPDATE jobs 
SET 
  nom_en = 'Psychologist',
  nom_ar = 'طبيب نفسي',
  description_en = 'Support and assistance to people in difficulty. You help others better understand themselves and overcome their challenges.',
  description_ar = 'الدعم والمساعدة للأشخاص في صعوبة. تساعد الآخرين على فهم أنفسهم بشكل أفضل والتغلب على تحدياتهم.'
WHERE nom = 'Psychologue';

UPDATE jobs 
SET 
  nom_en = 'Specialized Educator',
  nom_ar = 'مربي متخصص',
  description_en = 'Support for people in social or family difficulty. You contribute to their integration and fulfillment.',
  description_ar = 'دعم الأشخاص في صعوبة اجتماعية أو عائلية. تساهم في اندماجهم وتحقيقهم.'
WHERE nom = 'Éducateur Spécialisé';

UPDATE jobs 
SET 
  nom_en = 'Career Counselor',
  nom_ar = 'مستشار مهني',
  description_en = 'Support for young people in their academic and career choices. You help them discover their path.',
  description_ar = 'دعم الشباب في اختياراتهم الأكاديمية والمهنية. تساعدهم على اكتشاف طريقهم.'
WHERE nom = 'Conseiller d''orientation';

UPDATE jobs 
SET 
  nom_en = 'Nurse',
  nom_ar = 'ممرض',
  description_en = 'Care and support for patients. You bring comfort and quality care to sick people.',
  description_ar = 'الرعاية والدعم للمرضى. تجلب الراحة والرعاية الجيدة للأشخاص المرضى.'
WHERE nom = 'Infirmier';

UPDATE jobs 
SET 
  nom_en = 'Social Worker',
  nom_ar = 'عامل اجتماعي',
  description_en = 'Social support and assistance to people in difficulty. You guide them in their administrative and social procedures.',
  description_ar = 'الدعم الاجتماعي والمساعدة للأشخاص في صعوبة. توجههم في إجراءاتهم الإدارية والاجتماعية.'
WHERE nom = 'Assistant Social';

-- ============================================
-- MÉTIERS POUR LE PROFIL ORGANISATIONNEL (5 métiers)
-- ============================================

UPDATE jobs 
SET 
  nom_en = 'Project Manager',
  nom_ar = 'مدير المشروع',
  description_en = 'Management and coordination of projects in different sectors. You manage projects from A to Z with method and efficiency.',
  description_ar = 'إدارة وتنسيق المشاريع في قطاعات مختلفة. تدير المشاريع من الألف إلى الياء بطريقة وفعالية.'
WHERE nom = 'Chef de Projet';

UPDATE jobs 
SET 
  nom_en = 'HR Manager',
  nom_ar = 'مدير الموارد البشرية',
  description_en = 'Human resources management and talent development. You are the link between the company and its employees.',
  description_ar = 'إدارة الموارد البشرية وتطوير المواهب. أنت الرابط بين الشركة وموظفيها.'
WHERE nom = 'Responsable RH';

UPDATE jobs 
SET 
  nom_en = 'Management Controller',
  nom_ar = 'مراقب الإدارة',
  description_en = 'Financial analysis and performance management. You help the company make the right strategic decisions.',
  description_ar = 'التحليل المالي وإدارة الأداء. تساعد الشركة على اتخاذ القرارات الاستراتيجية الصحيحة.'
WHERE nom = 'Contrôleur de Gestion';

UPDATE jobs 
SET 
  nom_en = 'Establishment Director',
  nom_ar = 'مدير المؤسسة',
  description_en = 'Management and direction of an establishment (school, hospital, etc.). You coordinate teams and guarantee service quality.',
  description_ar = 'إدارة وتوجيه مؤسسة (مدرسة، مستشفى، إلخ). تنسق الفرق وتضمن جودة الخدمة.'
WHERE nom = 'Directeur d''établissement';

UPDATE jobs 
SET 
  nom_en = 'Quality Manager',
  nom_ar = 'مدير الجودة',
  description_en = 'Ensure the quality of products and processes. You ensure that standards are respected and continuously improved.',
  description_ar = 'ضمان جودة المنتجات والعمليات. تضمن احترام المعايير وتحسينها باستمرار.'
WHERE nom = 'Responsable Qualité';

-- ============================================
-- MÉTIERS POUR LE PROFIL ENTREPRENEURIAL (5 métiers)
-- ============================================

UPDATE jobs 
SET 
  nom_en = 'Entrepreneur / Business Creator',
  nom_ar = 'رائد أعمال / منشئ شركة',
  description_en = 'Creation and development of your own business. You turn your ideas into reality and create your own job.',
  description_ar = 'إنشاء وتطوير عملك الخاص. تحول أفكارك إلى واقع وتخلق وظيفتك الخاصة.'
WHERE nom = 'Entrepreneur / Créateur d''entreprise';

UPDATE jobs 
SET 
  nom_en = 'Independent Consultant',
  nom_ar = 'مستشار مستقل',
  description_en = 'Expertise and consulting as a freelancer in your field. You put your skills at the service of several clients.',
  description_ar = 'الخبرة والاستشارة كمستقل في مجالك. تضع مهاراتك في خدمة عدة عملاء.'
WHERE nom = 'Consultant Indépendant';

UPDATE jobs 
SET 
  nom_en = 'Business Developer',
  nom_ar = 'مطور الأعمال',
  description_en = 'Business development and partnerships. You create business opportunities and develop revenue.',
  description_ar = 'تطوير الأعمال والشراكات. تخلق فرص الأعمال وتطور الإيرادات.'
WHERE nom = 'Business Developer';

UPDATE jobs 
SET 
  nom_en = 'Content Creator',
  nom_ar = 'منشئ محتوى',
  description_en = 'Content creation for social networks and digital platforms. You monetize your creativity and your audience.',
  description_ar = 'إنشاء المحتوى لشبكات التواصل والمنصات الرقمية. تستفيد من إبداعك وجمهورك.'
WHERE nom = 'Créateur de contenu';

UPDATE jobs 
SET 
  nom_en = 'Investor / Business Angel',
  nom_ar = 'مستثمر / ملاك أعمال',
  description_en = 'Investment in startups and support for entrepreneurs. You finance and advise promising projects.',
  description_ar = 'الاستثمار في الشركات الناشئة ودعم رواد الأعمال. تمول وتنصح المشاريع الواعدة.'
WHERE nom = 'Investisseur / Business Angel';

-- ============================================
-- FIN DU SCRIPT
-- ============================================
-- Vérifiez que tous les métiers sont traduits avec verify_translations.sql
-- ============================================

