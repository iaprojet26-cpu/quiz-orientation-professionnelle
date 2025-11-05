-- ============================================
-- REMPLIR LES TRADUCTIONS POUR LES VALEURS
-- ============================================
-- Ce script remplit les traductions pour niveau_etudes, competences, formations
-- Exécutez APRÈS add_translations_for_values.sql

-- ============================================
-- 1. TRADUCTIONS DU NIVEAU D'ÉTUDES
-- ============================================

-- Traduire "Bac+2 à Bac+5"
UPDATE jobs 
SET 
  niveau_etudes_en = 'Bachelor''s degree +2 to +5',
  niveau_etudes_ar = 'بكالوريوس +2 إلى +5'
WHERE niveau_etudes = 'Bac+2 à Bac+5';

-- Traduire "Bac+5"
UPDATE jobs 
SET 
  niveau_etudes_en = 'Master''s degree (Bachelor +5)',
  niveau_etudes_ar = 'درجة الماجستير (بكالوريوس +5)'
WHERE niveau_etudes = 'Bac+5';

-- Traduire "Bac+3"
UPDATE jobs 
SET 
  niveau_etudes_en = 'Bachelor''s degree +3',
  niveau_etudes_ar = 'بكالوريوس +3'
WHERE niveau_etudes = 'Bac+3';

-- Traduire "Bac+3 à Bac+5"
UPDATE jobs 
SET 
  niveau_etudes_en = 'Bachelor''s degree +3 to +5',
  niveau_etudes_ar = 'بكالوريوس +3 إلى +5'
WHERE niveau_etudes = 'Bac+3 à Bac+5';

-- Traduire "Variable"
UPDATE jobs 
SET 
  niveau_etudes_en = 'Variable',
  niveau_etudes_ar = 'متغير'
WHERE niveau_etudes = 'Variable';

-- Traduire "Bac+3 minimum"
UPDATE jobs 
SET 
  niveau_etudes_en = 'Bachelor''s degree +3 minimum',
  niveau_etudes_ar = 'بكالوريوس +3 كحد أدنى'
WHERE niveau_etudes = 'Bac+3 minimum';

-- ============================================
-- 2. TRADUCTIONS DES COMPÉTENCES (Exemples)
-- ============================================
-- Note: Les compétences sont des arrays, donc on doit les mettre à jour pour chaque métier

-- Graphiste
UPDATE jobs 
SET 
  competences_en = ARRAY['Creativity', 'Mastery of graphic software', 'Aesthetic sense', 'Visual communication'],
  competences_ar = ARRAY['الإبداع', 'إتقان برامج التصميم', 'الحس الجمالي', 'التواصل البصري']
WHERE nom = 'Graphiste';

-- Développeur Frontend
UPDATE jobs 
SET 
  competences_en = ARRAY['HTML/CSS/JavaScript', 'React/Vue Frameworks', 'UI/UX Design', 'Creativity'],
  competences_ar = ARRAY['HTML/CSS/JavaScript', 'أطر React/Vue', 'تصميم واجهة المستخدم', 'الإبداع']
WHERE nom = 'Développeur Frontend';

-- Ingénieur Logiciel
UPDATE jobs 
SET 
  competences_en = ARRAY['Programming', 'Software architecture', 'Algorithms', 'Problem solving'],
  competences_ar = ARRAY['البرمجة', 'هندسة البرمجيات', 'الخوارزميات', 'حل المشاكل']
WHERE nom = 'Ingénieur Logiciel';

-- Data Analyst
UPDATE jobs 
SET 
  competences_en = ARRAY['Statistics', 'SQL', 'Python/R', 'Data visualization'],
  competences_ar = ARRAY['الإحصاء', 'SQL', 'Python/R', 'تصور البيانات']
WHERE nom = 'Data Analyst';

-- Psychologue
UPDATE jobs 
SET 
  competences_en = ARRAY['Active listening', 'Empathy', 'Psychological analysis', 'Communication'],
  competences_ar = ARRAY['الاستماع النشط', 'التعاطف', 'التحليل النفسي', 'التواصل']
WHERE nom = 'Psychologue';

-- Chef de Projet
UPDATE jobs 
SET 
  competences_en = ARRAY['Organization', 'Leadership', 'Budget management', 'Communication'],
  competences_ar = ARRAY['التنظيم', 'القيادة', 'إدارة الميزانية', 'التواصل']
WHERE nom = 'Chef de Projet';

-- Entrepreneur
UPDATE jobs 
SET 
  competences_en = ARRAY['Vision', 'Risk taking', 'Leadership', 'Resilience'],
  competences_ar = ARRAY['الرؤية', 'المخاطرة', 'القيادة', 'المرونة']
WHERE nom = 'Entrepreneur / Créateur d''entreprise';

-- ============================================
-- 3. TRADUCTIONS DES FORMATIONS (Exemples)
-- ============================================
-- Note: Les formations sont aussi des arrays

-- Graphiste - Formations
UPDATE jobs 
SET 
  formations_en = ARRAY['BTS Graphic Design', 'Art School', 'Online training (Adobe Creative Suite)', 'Applied Arts License'],
  formations_ar = ARRAY['BTS التصميم الجرافيكي', 'مدرسة الفنون', 'التدريب عبر الإنترنت (Adobe Creative Suite)', 'رخصة الفنون التطبيقية']
WHERE nom = 'Graphiste';

-- Développeur Frontend - Formations
UPDATE jobs 
SET 
  formations_en = ARRAY['Web Development Bootcamp', 'Online training (FreeCodeCamp, Udemy)', 'Engineering School', 'Self-taught'],
  formations_ar = ARRAY['معسكر تطوير الويب', 'التدريب عبر الإنترنت (FreeCodeCamp, Udemy)', 'مدرسة الهندسة', 'التعلم الذاتي']
WHERE nom = 'Développeur Frontend';

-- Ingénieur Logiciel - Formations
UPDATE jobs 
SET 
  formations_en = ARRAY['Engineering School', 'Master in Computer Science', 'Continuing education', 'Professional certifications'],
  formations_ar = ARRAY['مدرسة الهندسة', 'ماجستير في علوم الحاسوب', 'التعليم المستمر', 'الشهادات المهنية']
WHERE nom = 'Ingénieur Logiciel';

-- ============================================
-- FIN DU SCRIPT
-- ============================================
-- Note: Ce script contient des exemples pour quelques métiers
-- Vous pouvez continuer à ajouter les traductions pour tous les métiers
-- ou utiliser Table Editor pour les remplir manuellement
-- ============================================

