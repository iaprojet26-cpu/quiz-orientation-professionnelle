-- ============================================
-- TRADUCTIONS COMPLÈTES DE TOUTES LES COMPÉTENCES
-- ============================================
-- Ce script traduit toutes les compétences (competences_en et competences_ar)
-- pour tous les métiers
-- Exécutez ce script dans Supabase SQL Editor

-- ============================================
-- MÉTIERS POUR LE PROFIL CRÉATIF
-- ============================================

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

-- Architecte d'intérieur
UPDATE jobs 
SET 
  competences_en = ARRAY['Design', 'Space planning', 'Aesthetic sense', 'Creativity'],
  competences_ar = ARRAY['التصميم', 'تخطيط المساحات', 'الحس الجمالي', 'الإبداع']
WHERE nom = 'Architecte d''intérieur';

-- Photographe
UPDATE jobs 
SET 
  competences_en = ARRAY['Photography technique', 'Creativity', 'Aesthetic sense', 'Post-production'],
  competences_ar = ARRAY['تقنية التصوير', 'الإبداع', 'الحس الجمالي', 'ما بعد الإنتاج']
WHERE nom = 'Photographe';

-- Concepteur-rédacteur
UPDATE jobs 
SET 
  competences_en = ARRAY['Creativity', 'Writing', 'Marketing', 'Communication'],
  competences_ar = ARRAY['الإبداع', 'الكتابة', 'التسويق', 'التواصل']
WHERE nom = 'Concepteur-rédacteur';

-- ============================================
-- MÉTIERS POUR LE PROFIL TECHNIQUE
-- ============================================

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

-- Ingénieur Système
UPDATE jobs 
SET 
  competences_en = ARRAY['System administration', 'Networks', 'Security', 'Troubleshooting'],
  competences_ar = ARRAY['إدارة الأنظمة', 'الشبكات', 'الأمان', 'حل المشاكل']
WHERE nom = 'Ingénieur Système';

-- Développeur Backend
UPDATE jobs 
SET 
  competences_en = ARRAY['Backend programming', 'Databases', 'APIs', 'System architecture'],
  competences_ar = ARRAY['برمجة الخادم', 'قواعد البيانات', 'واجهات برمجة التطبيقات', 'هندسة الأنظمة']
WHERE nom = 'Développeur Backend';

-- Cybersécurité
UPDATE jobs 
SET 
  competences_en = ARRAY['Network security', 'Ethical hacking', 'Risk analysis', 'Compliance'],
  competences_ar = ARRAY['أمان الشبكة', 'الاختراق الأخلاقي', 'تحليل المخاطر', 'الامتثال']
WHERE nom = 'Cybersécurité';

-- ============================================
-- MÉTIERS POUR LE PROFIL SOCIAL
-- ============================================

-- Psychologue
UPDATE jobs 
SET 
  competences_en = ARRAY['Active listening', 'Empathy', 'Psychological analysis', 'Communication'],
  competences_ar = ARRAY['الاستماع النشط', 'التعاطف', 'التحليل النفسي', 'التواصل']
WHERE nom = 'Psychologue';

-- Éducateur Spécialisé
UPDATE jobs 
SET 
  competences_en = ARRAY['Patience', 'Communication', 'Empathy', 'Conflict management'],
  competences_ar = ARRAY['الصبر', 'التواصل', 'التعاطف', 'إدارة النزاعات']
WHERE nom = 'Éducateur Spécialisé';

-- Conseiller d'orientation
UPDATE jobs 
SET 
  competences_en = ARRAY['Listening', 'Knowledge of professions', 'Communication', 'Empathy'],
  competences_ar = ARRAY['الاستماع', 'معرفة المهن', 'التواصل', 'التعاطف']
WHERE nom = 'Conseiller d''orientation';

-- Infirmier
UPDATE jobs 
SET 
  competences_en = ARRAY['Medical care', 'Empathy', 'Stress resistance', 'Communication'],
  competences_ar = ARRAY['الرعاية الطبية', 'التعاطف', 'مقاومة الإجهاد', 'التواصل']
WHERE nom = 'Infirmier';

-- Assistant Social
UPDATE jobs 
SET 
  competences_en = ARRAY['Listening', 'Social law knowledge', 'Empathy', 'Communication'],
  competences_ar = ARRAY['الاستماع', 'معرفة القانون الاجتماعي', 'التعاطف', 'التواصل']
WHERE nom = 'Assistant Social';

-- ============================================
-- MÉTIERS POUR LE PROFIL ORGANISATIONNEL
-- ============================================

-- Chef de Projet
UPDATE jobs 
SET 
  competences_en = ARRAY['Organization', 'Leadership', 'Budget management', 'Communication'],
  competences_ar = ARRAY['التنظيم', 'القيادة', 'إدارة الميزانية', 'التواصل']
WHERE nom = 'Chef de Projet';

-- Responsable RH
UPDATE jobs 
SET 
  competences_en = ARRAY['Communication', 'Management', 'Psychology', 'Labor law'],
  competences_ar = ARRAY['التواصل', 'الإدارة', 'علم النفس', 'قانون العمل']
WHERE nom = 'Responsable RH';

-- Contrôleur de Gestion
UPDATE jobs 
SET 
  competences_en = ARRAY['Financial analysis', 'Excel', 'Strategy', 'Communication'],
  competences_ar = ARRAY['التحليل المالي', 'Excel', 'الاستراتيجية', 'التواصل']
WHERE nom = 'Contrôleur de Gestion';

-- Directeur d'établissement
UPDATE jobs 
SET 
  competences_en = ARRAY['Leadership', 'Management', 'Strategy', 'Communication'],
  competences_ar = ARRAY['القيادة', 'الإدارة', 'الاستراتيجية', 'التواصل']
WHERE nom = 'Directeur d''établissement';

-- Responsable Qualité
UPDATE jobs 
SET 
  competences_en = ARRAY['Analysis', 'Organization', 'Quality standards', 'Communication'],
  competences_ar = ARRAY['التحليل', 'التنظيم', 'معايير الجودة', 'التواصل']
WHERE nom = 'Responsable Qualité';

-- ============================================
-- MÉTIERS POUR LE PROFIL ENTREPRENEURIAL
-- ============================================

-- Entrepreneur / Créateur d'entreprise
UPDATE jobs 
SET 
  competences_en = ARRAY['Vision', 'Risk taking', 'Leadership', 'Resilience'],
  competences_ar = ARRAY['الرؤية', 'المخاطرة', 'القيادة', 'المرونة']
WHERE nom = 'Entrepreneur / Créateur d''entreprise';

-- Consultant Indépendant
UPDATE jobs 
SET 
  competences_en = ARRAY['Technical expertise', 'Autonomy', 'Communication', 'Professional network'],
  competences_ar = ARRAY['الخبرة التقنية', 'الاستقلالية', 'التواصل', 'الشبكة المهنية']
WHERE nom = 'Consultant Indépendant';

-- Business Developer
UPDATE jobs 
SET 
  competences_en = ARRAY['Negotiation', 'Communication', 'Network', 'Sales strategy'],
  competences_ar = ARRAY['التفاوض', 'التواصل', 'الشبكة', 'استراتيجية المبيعات']
WHERE nom = 'Business Developer';

-- Créateur de contenu
UPDATE jobs 
SET 
  competences_en = ARRAY['Creativity', 'Communication', 'Digital marketing', 'Autonomy'],
  competences_ar = ARRAY['الإبداع', 'التواصل', 'التسويق الرقمي', 'الاستقلالية']
WHERE nom = 'Créateur de contenu';

-- Investisseur / Business Angel
UPDATE jobs 
SET 
  competences_en = ARRAY['Financial analysis', 'Strategic vision', 'Network', 'Risk taking'],
  competences_ar = ARRAY['التحليل المالي', 'الرؤية الاستراتيجية', 'الشبكة', 'المخاطرة']
WHERE nom = 'Investisseur / Business Angel';

-- ============================================
-- FIN DU SCRIPT
-- ============================================
-- Vérifiez que toutes les compétences sont traduites
-- ============================================

