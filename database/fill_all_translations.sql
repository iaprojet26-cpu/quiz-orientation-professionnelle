-- ============================================
-- REMPLIR TOUTES LES TRADUCTIONS
-- ============================================
-- Ce script remplit toutes les traductions EN et AR
-- pour les 12 questions et toutes leurs options
-- Exécutez ce script dans Supabase SQL Editor

-- ============================================
-- 1. TRADUCTIONS DES QUESTIONS (12 questions)
-- ============================================

UPDATE questions 
SET 
  texte_en = 'What type of activity attracts you the most?',
  texte_ar = 'ما نوع النشاط الذي يجذبك أكثر؟'
WHERE texte = 'Quel type d''activité vous attire le plus ?';

UPDATE questions 
SET 
  texte_en = 'In which environment would you prefer to work?',
  texte_ar = 'في أي بيئة تفضل العمل؟'
WHERE texte = 'Dans quel environnement préféreriez-vous travailler ?';

UPDATE questions 
SET 
  texte_en = 'What subject interests you the most?',
  texte_ar = 'ما الموضوع الذي يثير اهتمامك أكثر؟'
WHERE texte = 'Quel sujet vous passionne le plus ?';

UPDATE questions 
SET 
  texte_en = 'What is your main strength?',
  texte_ar = 'ما هي قوتك الرئيسية؟'
WHERE texte = 'Quelle est votre principale force ?';

UPDATE questions 
SET 
  texte_en = 'How do you approach a new project?',
  texte_ar = 'كيف تتعامل مع مشروع جديد؟'
WHERE texte = 'Comment abordez-vous un nouveau projet ?';

UPDATE questions 
SET 
  texte_en = 'What type of problem do you like to solve?',
  texte_ar = 'ما نوع المشكلة التي تحب حلها؟'
WHERE texte = 'Quel type de problème aimez-vous résoudre ?';

UPDATE questions 
SET 
  texte_en = 'Do you prefer to work:',
  texte_ar = 'هل تفضل العمل:'
WHERE texte = 'Préférez-vous travailler :';

UPDATE questions 
SET 
  texte_en = 'What type of schedule suits you best?',
  texte_ar = 'ما نوع الجدول الذي يناسبك أكثر؟'
WHERE texte = 'Quel type d''horaire vous convient le mieux ?';

UPDATE questions 
SET 
  texte_en = 'How do you prefer to communicate?',
  texte_ar = 'كيف تفضل التواصل؟'
WHERE texte = 'Comment préférez-vous communiquer ?';

UPDATE questions 
SET 
  texte_en = 'What is your main professional goal?',
  texte_ar = 'ما هو هدفك المهني الرئيسي؟'
WHERE texte = 'Quel est votre objectif professionnel principal ?';

UPDATE questions 
SET 
  texte_en = 'What motivates you most in a career?',
  texte_ar = 'ما الذي يحفزك أكثر في مسيرتك المهنية؟'
WHERE texte = 'Qu''est-ce qui vous motive le plus dans une carrière ?';

UPDATE questions 
SET 
  texte_en = 'How do you envision your professional development?',
  texte_ar = 'كيف تتوقع تطورك المهني؟'
WHERE texte = 'Comment envisagez-vous votre évolution professionnelle ?';

-- ============================================
-- 2. TRADUCTIONS DES OPTIONS (60 options - toutes)
-- ============================================

-- Options pour Question 1: Quel type d'activité vous attire le plus ?
UPDATE options SET texte_en = 'Create and design original solutions', texte_ar = 'إنشاء وتصميم حلول مبتكرة' WHERE texte = 'Créer et concevoir des solutions originales';
UPDATE options SET texte_en = 'Analyze and solve complex problems', texte_ar = 'تحليل وحل المشاكل المعقدة' WHERE texte = 'Analyser et résoudre des problèmes complexes';
UPDATE options SET texte_en = 'Help and advise others', texte_ar = 'مساعدة ونصيحة الآخرين' WHERE texte = 'Aider et conseiller les autres';
UPDATE options SET texte_en = 'Organize and manage teams or projects', texte_ar = 'تنظيم وإدارة الفرق أو المشاريع' WHERE texte = 'Organiser et gérer des équipes ou projets';
UPDATE options SET texte_en = 'Create my own business or project', texte_ar = 'إنشاء عملي أو مشروعي الخاص' WHERE texte = 'Créer ma propre entreprise ou projet';

-- Options pour Question 2: Dans quel environnement préféreriez-vous travailler ?
UPDATE options SET texte_en = 'A creative studio or workshop', texte_ar = 'استوديو أو ورشة إبداعية' WHERE texte = 'Un studio ou atelier créatif';
UPDATE options SET texte_en = 'An office with technological tools', texte_ar = 'مكتب مع أدوات تقنية' WHERE texte = 'Un bureau avec des outils technologiques';
UPDATE options SET texte_en = 'In the field, in contact with people', texte_ar = 'في الميدان، على اتصال مع الناس' WHERE texte = 'Sur le terrain, en contact avec les gens';
UPDATE options SET texte_en = 'An office with a view of the team', texte_ar = 'مكتب مع إطلالة على الفريق' WHERE texte = 'Un bureau avec vue sur l''équipe';
UPDATE options SET texte_en = 'Anywhere, as long as I am independent', texte_ar = 'في أي مكان، طالما أنني مستقل' WHERE texte = 'N''importe où, tant que je suis indépendant';

-- Options pour Question 3: Quel sujet vous passionne le plus ?
UPDATE options SET texte_en = 'Art, design, creativity', texte_ar = 'الفن والتصميم والإبداع' WHERE texte = 'L''art, le design, la créativité';
UPDATE options SET texte_en = 'Sciences, technology, innovation', texte_ar = 'العلوم والتكنولوجيا والابتكار' WHERE texte = 'Les sciences, la technologie, l''innovation';
UPDATE options SET texte_en = 'Human relationships, psychology', texte_ar = 'العلاقات الإنسانية وعلم النفس' WHERE texte = 'Les relations humaines, la psychologie';
UPDATE options SET texte_en = 'Management, organization, strategy', texte_ar = 'الإدارة والتنظيم والاستراتيجية' WHERE texte = 'La gestion, l''organisation, la stratégie';
UPDATE options SET texte_en = 'Entrepreneurship, business', texte_ar = 'ريادة الأعمال والأعمال' WHERE texte = 'L''entrepreneuriat, les affaires';

-- Options pour Question 4: Quelle est votre principale force ?
UPDATE options SET texte_en = 'My imagination and creativity', texte_ar = 'خيالي وإبداعي' WHERE texte = 'Mon imagination et ma créativité';
UPDATE options SET texte_en = 'My logic and analytical skills', texte_ar = 'منطقي ومهاراتي التحليلية' WHERE texte = 'Ma logique et ma capacité d''analyse';
UPDATE options SET texte_en = 'My empathy and listening skills', texte_ar = 'تعاطفي ومهاراتي في الاستماع' WHERE texte = 'Mon empathie et ma capacité d''écoute';
UPDATE options SET texte_en = 'My organizational skills', texte_ar = 'مهاراتي التنظيمية' WHERE texte = 'Mon sens de l''organisation';
UPDATE options SET texte_en = 'My ability to take initiatives', texte_ar = 'قدرتي على اتخاذ المبادرات' WHERE texte = 'Ma capacité à prendre des initiatives';

-- Options pour Question 5: Comment abordez-vous un nouveau projet ?
UPDATE options SET texte_en = 'I let my creativity flow freely', texte_ar = 'أترك إبداعي يتدفق بحرية' WHERE texte = 'Je laisse libre cours à ma créativité';
UPDATE options SET texte_en = 'I analyze it methodically', texte_ar = 'أحلله بشكل منهجي' WHERE texte = 'Je l''analyse méthodiquement';
UPDATE options SET texte_en = 'I consult the people concerned', texte_ar = 'أستشير الأشخاص المعنيين' WHERE texte = 'Je consulte les personnes concernées';
UPDATE options SET texte_en = 'I plan and organize the steps', texte_ar = 'أخطط وأنظم الخطوات' WHERE texte = 'Je planifie et organise les étapes';
UPDATE options SET texte_en = 'I dive in directly with enthusiasm', texte_ar = 'أغوص مباشرة بحماس' WHERE texte = 'Je me lance directement avec enthousiasme';

-- Options pour Question 6: Quel type de problème aimez-vous résoudre ?
UPDATE options SET texte_en = 'Creative and aesthetic challenges', texte_ar = 'التحديات الإبداعية والجمالية' WHERE texte = 'Les défis créatifs et esthétiques';
UPDATE options SET texte_en = 'Complex technical problems', texte_ar = 'المشاكل التقنية المعقدة' WHERE texte = 'Les problèmes techniques complexes';
UPDATE options SET texte_en = 'Relational and human problems', texte_ar = 'المشاكل العلائقية والإنسانية' WHERE texte = 'Les problèmes relationnels et humains';
UPDATE options SET texte_en = 'Organizational and management problems', texte_ar = 'مشاكل التنظيم والإدارة' WHERE texte = 'Les problèmes d''organisation et de gestion';
UPDATE options SET texte_en = 'Business and commercial challenges', texte_ar = 'التحديات التجارية والأعمال' WHERE texte = 'Les défis business et commerciaux';

-- Options pour Question 7: Préférez-vous travailler :
UPDATE options SET texte_en = 'Independently, on my projects', texte_ar = 'باستقلالية، على مشاريعي' WHERE texte = 'En autonomie, sur mes projets';
UPDATE options SET texte_en = 'In a technical team', texte_ar = 'في فريق تقني' WHERE texte = 'En équipe technique';
UPDATE options SET texte_en = 'In direct contact with clients/users', texte_ar = 'على اتصال مباشر مع العملاء/المستخدمين' WHERE texte = 'En contact direct avec les clients/utilisateurs';
UPDATE options SET texte_en = 'In a team with a coordination role', texte_ar = 'في فريق مع دور التنسيق' WHERE texte = 'En équipe avec un rôle de coordination';
UPDATE options SET texte_en = 'Alone, as an independent', texte_ar = 'وحدي، كمستقل' WHERE texte = 'Seul, en tant qu''indépendant';

-- Options pour Question 8: Quel type d'horaire vous convient le mieux ?
UPDATE options SET texte_en = 'Flexible hours, according to inspiration', texte_ar = 'ساعات مرنة، حسب الإلهام' WHERE texte = 'Horaires flexibles, selon l''inspiration';
UPDATE options SET texte_en = 'Regular and structured hours', texte_ar = 'ساعات منتظمة ومنظمة' WHERE texte = 'Horaires réguliers et structurés';
UPDATE options SET texte_en = 'Hours adapted to others'' needs', texte_ar = 'ساعات مكيفة مع احتياجات الآخرين' WHERE texte = 'Horaires adaptés aux besoins des autres';
UPDATE options SET texte_en = 'Varied hours according to projects', texte_ar = 'ساعات متنوعة حسب المشاريع' WHERE texte = 'Horaires variés selon les projets';
UPDATE options SET texte_en = 'Hours I define myself', texte_ar = 'ساعات أحددها بنفسي' WHERE texte = 'Horaires que je définis moi-même';

-- Options pour Question 9: Comment préférez-vous communiquer ?
UPDATE options SET texte_en = 'Through visual and creative expression', texte_ar = 'من خلال التعبير البصري والإبداعي' WHERE texte = 'Par l''expression visuelle et créative';
UPDATE options SET texte_en = 'Through precise technical documents', texte_ar = 'من خلال الوثائق التقنية الدقيقة' WHERE texte = 'Par des documents techniques précis';
UPDATE options SET texte_en = 'Through face-to-face conversations', texte_ar = 'من خلال المحادثات وجهًا لوجه' WHERE texte = 'Par des conversations en face à face';
UPDATE options SET texte_en = 'Through structured meetings and presentations', texte_ar = 'من خلال الاجتماعات والعروض التقديمية المنظمة' WHERE texte = 'Par des réunions et présentations structurées';
UPDATE options SET texte_en = 'Through networks and partnerships', texte_ar = 'من خلال الشبكات والشراكات' WHERE texte = 'Par des réseaux et partenariats';

-- Options pour Question 10: Quel est votre objectif professionnel principal ?
UPDATE options SET texte_en = 'Express my creativity and create works', texte_ar = 'التعبير عن إبداعي وإنشاء أعمال' WHERE texte = 'Exprimer ma créativité et créer des œuvres';
UPDATE options SET texte_en = 'Master advanced technical skills', texte_ar = 'إتقان المهارات التقنية المتقدمة' WHERE texte = 'Maîtriser des compétences techniques pointues';
UPDATE options SET texte_en = 'Help and have a positive impact on others', texte_ar = 'مساعدة الآخرين والتأثير الإيجابي عليهم' WHERE texte = 'Aider et avoir un impact positif sur les autres';
UPDATE options SET texte_en = 'Manage and lead a team or project', texte_ar = 'إدارة وقيادة فريق أو مشروع' WHERE texte = 'Gérer et diriger une équipe ou un projet';
UPDATE options SET texte_en = 'Create my own business and be independent', texte_ar = 'إنشاء عملي الخاص وأن أكون مستقلاً' WHERE texte = 'Créer ma propre entreprise et être indépendant';

-- Options pour Question 11: Qu'est-ce qui vous motive le plus dans une carrière ?
UPDATE options SET texte_en = 'Creative freedom and innovation', texte_ar = 'الحرية الإبداعية والابتكار' WHERE texte = 'La liberté créative et l''innovation';
UPDATE options SET texte_en = 'Solving complex problems', texte_ar = 'حل المشاكل المعقدة' WHERE texte = 'La résolution de problèmes complexes';
UPDATE options SET texte_en = 'Human contact and helping others', texte_ar = 'الاتصال البشري ومساعدة الآخرين' WHERE texte = 'Le contact humain et l''aide aux autres';
UPDATE options SET texte_en = 'Progression and responsibility', texte_ar = 'التقدم والمسؤولية' WHERE texte = 'La progression et la responsabilité';
UPDATE options SET texte_en = 'Independence and financial success', texte_ar = 'الاستقلالية والنجاح المالي' WHERE texte = 'L''indépendance et la réussite financière';

-- Options pour Question 12: Comment envisagez-vous votre évolution professionnelle ?
UPDATE options SET texte_en = 'Develop my creative portfolio', texte_ar = 'تطوير محفظتي الإبداعية' WHERE texte = 'Développer mon portfolio créatif';
UPDATE options SET texte_en = 'Become an expert in my technical field', texte_ar = 'أن أصبح خبيراً في مجالي التقني' WHERE texte = 'Devenir expert dans mon domaine technique';
UPDATE options SET texte_en = 'Evolve towards consulting and support roles', texte_ar = 'التطور نحو أدوار الاستشارة والدعم' WHERE texte = 'Évoluer vers des rôles de conseil et d''accompagnement';
UPDATE options SET texte_en = 'Access management positions', texte_ar = 'الوصول إلى مناصب الإدارة' WHERE texte = 'Accéder à des postes de management';
UPDATE options SET texte_en = 'Create and develop my own business', texte_ar = 'إنشاء وتطوير عملي الخاص' WHERE texte = 'Créer et développer ma propre entreprise';

-- ============================================
-- 3. TRADUCTIONS DES PROFILS (5 profils)
-- ============================================

UPDATE profiles 
SET 
  nom_en = 'Creative Profile',
  nom_ar = 'الملف الإبداعي',
  description_en = 'You are attracted to innovation, art and creation. You like to express your ideas and work on original projects.',
  description_ar = 'أنت منجذب إلى الابتكار والفن والإبداع. تحب التعبير عن أفكارك والعمل على مشاريع أصلية.'
WHERE nom = 'Profil Créatif';

UPDATE profiles 
SET 
  nom_en = 'Technical Profile',
  nom_ar = 'الملف التقني',
  description_en = 'You excel at solving complex problems, logic and technology. You are methodical and precise.',
  description_ar = 'أنت تتقن حل المشاكل المعقدة والمنطق والتكنولوجيا. أنت منهجي ودقيق.'
WHERE nom = 'Profil Technique';

UPDATE profiles 
SET 
  nom_en = 'Social Profile',
  nom_ar = 'الملف الاجتماعي',
  description_en = 'You have a strong interest in helping others, communicating and working in teams. You are empathetic and a good listener.',
  description_ar = 'لديك اهتمام قوي بمساعدة الآخرين والتواصل والعمل في فرق. أنت متعاطف ومستمع جيد.'
WHERE nom = 'Profil Social';

UPDATE profiles 
SET 
  nom_en = 'Organizational Profile',
  nom_ar = 'الملف التنظيمي',
  description_en = 'You are organized, like to manage projects and lead teams. You have a sense of responsibility.',
  description_ar = 'أنت منظم، تحب إدارة المشاريع وقيادة الفرق. لديك حس المسؤولية.'
WHERE nom = 'Profil Organisationnel';

UPDATE profiles 
SET 
  nom_en = 'Entrepreneurial Profile',
  nom_ar = 'الملف الريادي',
  description_en = 'You are independent, like to take calculated risks and create your own path. You are visionary.',
  description_ar = 'أنت مستقل، تحب المخاطرة المدروسة وخلق طريقك الخاص. أنت رؤيوي.'
WHERE nom = 'Profil Entrepreneurial';

-- ============================================
-- 4. TRADUCTIONS DES MÉTIERS (25 métiers - exemples pour les 5 premiers)
-- ============================================

-- Métiers pour le Profil Créatif
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
-- FIN DU SCRIPT
-- ============================================
-- Après avoir exécuté ce script, vérifiez avec verify_translations.sql
-- Vous devriez voir des ✅ au lieu de ❌
-- ============================================

