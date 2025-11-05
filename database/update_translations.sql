-- ============================================
-- MISE À JOUR DES TRADUCTIONS DANS SUPABASE
-- ============================================
-- Ce script met à jour les questions, options, profils et métiers avec les traductions
-- Exécutez ce script APRÈS avoir exécuté add_multilingual_support.sql

-- ============================================
-- 1. Mettre à jour les traductions des QUESTIONS
-- ============================================

-- Question 1: Quel type d'activité vous attire le plus ?
UPDATE questions 
SET 
  texte_en = 'What type of activity attracts you the most?',
  texte_ar = 'ما نوع النشاط الذي يجذبك أكثر؟'
WHERE texte = 'Quel type d''activité vous attire le plus ?';

-- Question 2: Dans quel environnement préféreriez-vous travailler ?
UPDATE questions 
SET 
  texte_en = 'In which environment would you prefer to work?',
  texte_ar = 'في أي بيئة تفضل العمل؟'
WHERE texte = 'Dans quel environnement préféreriez-vous travailler ?';

-- Question 3: Quel sujet vous passionne le plus ?
UPDATE questions 
SET 
  texte_en = 'What subject interests you the most?',
  texte_ar = 'ما الموضوع الذي يثير اهتمامك أكثر؟'
WHERE texte = 'Quel sujet vous passionne le plus ?';

-- Question 4: Quelle est votre principale force ?
UPDATE questions 
SET 
  texte_en = 'What is your main strength?',
  texte_ar = 'ما هي قوتك الرئيسية؟'
WHERE texte = 'Quelle est votre principale force ?';

-- Question 5: Comment abordez-vous un nouveau projet ?
UPDATE questions 
SET 
  texte_en = 'How do you approach a new project?',
  texte_ar = 'كيف تتعامل مع مشروع جديد؟'
WHERE texte = 'Comment abordez-vous un nouveau projet ?';

-- Question 6: Quel type de problème aimez-vous résoudre ?
UPDATE questions 
SET 
  texte_en = 'What type of problem do you like to solve?',
  texte_ar = 'ما نوع المشكلة التي تحب حلها؟'
WHERE texte = 'Quel type de problème aimez-vous résoudre ?';

-- Question 7: Préférez-vous travailler :
UPDATE questions 
SET 
  texte_en = 'Do you prefer to work:',
  texte_ar = 'هل تفضل العمل:'
WHERE texte = 'Préférez-vous travailler :';

-- Question 8: Quel type d'horaire vous convient le mieux ?
UPDATE questions 
SET 
  texte_en = 'What type of schedule suits you best?',
  texte_ar = 'ما نوع الجدول الذي يناسبك أكثر؟'
WHERE texte = 'Quel type d''horaire vous convient le mieux ?';

-- Question 9: Comment préférez-vous communiquer ?
UPDATE questions 
SET 
  texte_en = 'How do you prefer to communicate?',
  texte_ar = 'كيف تفضل التواصل؟'
WHERE texte = 'Comment préférez-vous communiquer ?';

-- Question 10: Quel est votre objectif professionnel principal ?
UPDATE questions 
SET 
  texte_en = 'What is your main professional goal?',
  texte_ar = 'ما هو هدفك المهني الرئيسي؟'
WHERE texte = 'Quel est votre objectif professionnel principal ?';

-- Question 11: Qu'est-ce qui vous motive le plus dans une carrière ?
UPDATE questions 
SET 
  texte_en = 'What motivates you most in a career?',
  texte_ar = 'ما الذي يحفزك أكثر في مسيرتك المهنية؟'
WHERE texte = 'Qu''est-ce qui vous motive le plus dans une carrière ?';

-- Question 12: Comment envisagez-vous votre évolution professionnelle ?
UPDATE questions 
SET 
  texte_en = 'How do you envision your professional development?',
  texte_ar = 'كيف تتوقع تطورك المهني؟'
WHERE texte = 'Comment envisagez-vous votre évolution professionnelle ?';

-- ============================================
-- 2. Mettre à jour les traductions des OPTIONS
-- ============================================
-- Note: Il y a beaucoup d'options, voici quelques exemples
-- Vous pouvez continuer pour toutes les options

-- Options pour Question 1
UPDATE options 
SET 
  texte_en = 'Create and design original solutions',
  texte_ar = 'إنشاء وتصميم حلول مبتكرة'
WHERE texte = 'Créer et concevoir des solutions originales';

UPDATE options 
SET 
  texte_en = 'Analyze and solve complex problems',
  texte_ar = 'تحليل وحل المشاكل المعقدة'
WHERE texte = 'Analyser et résoudre des problèmes complexes';

UPDATE options 
SET 
  texte_en = 'Help and advise others',
  texte_ar = 'مساعدة ونصيحة الآخرين'
WHERE texte = 'Aider et conseiller les autres';

UPDATE options 
SET 
  texte_en = 'Organize and manage teams or projects',
  texte_ar = 'تنظيم وإدارة الفرق أو المشاريع'
WHERE texte = 'Organiser et gérer des équipes ou projets';

UPDATE options 
SET 
  texte_en = 'Create my own business or project',
  texte_ar = 'إنشاء عملي أو مشروعي الخاص'
WHERE texte = 'Créer ma propre entreprise ou projet';

-- ============================================
-- 3. Mettre à jour les traductions des PROFILS
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
-- 4. Mettre à jour les traductions des MÉTIERS (exemples)
-- ============================================
-- Note: Il y a beaucoup de métiers, voici quelques exemples

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

-- ============================================
-- FIN DU SCRIPT
-- ============================================
-- Note: Ce script contient seulement quelques exemples
-- Vous pouvez continuer à ajouter les traductions pour toutes les options et métiers
-- ============================================

