-- ============================================
-- TRADUCTIONS COMPLÈTES DE TOUTES LES FORMATIONS
-- ============================================
-- Ce script traduit toutes les formations (formations_en et formations_ar)
-- pour tous les métiers
-- Exécutez ce script dans Supabase SQL Editor

-- ============================================
-- MÉTIERS POUR LE PROFIL CRÉATIF
-- ============================================

-- Graphiste
UPDATE jobs 
SET 
  formations_en = ARRAY['BTS Graphic Design', 'Art School', 'Online training (Adobe Creative Suite)', 'Applied Arts License'],
  formations_ar = ARRAY['BTS التصميم الجرافيكي', 'مدرسة الفنون', 'التدريب عبر الإنترنت (Adobe Creative Suite)', 'رخصة الفنون التطبيقية']
WHERE nom = 'Graphiste';

-- Développeur Frontend
UPDATE jobs 
SET 
  formations_en = ARRAY['Web Development Bootcamp', 'Online training (FreeCodeCamp, Udemy)', 'Engineering School', 'Self-taught'],
  formations_ar = ARRAY['معسكر تطوير الويب', 'التدريب عبر الإنترنت (FreeCodeCamp, Udemy)', 'مدرسة الهندسة', 'التعلم الذاتي']
WHERE nom = 'Développeur Frontend';

-- Architecte d'intérieur
UPDATE jobs 
SET 
  formations_en = ARRAY['Interior Architecture School', 'Applied Arts License', 'Professional training', 'Continuing education'],
  formations_ar = ARRAY['مدرسة العمارة الداخلية', 'رخصة الفنون التطبيقية', 'التدريب المهني', 'التعليم المستمر']
WHERE nom = 'Architecte d''intérieur';

-- Photographe
UPDATE jobs 
SET 
  formations_en = ARRAY['Photography School', 'Professional training', 'Workshops', 'Self-taught'],
  formations_ar = ARRAY['مدرسة التصوير', 'التدريب المهني', 'ورش العمل', 'التعلم الذاتي']
WHERE nom = 'Photographe';

-- Concepteur-rédacteur
UPDATE jobs 
SET 
  formations_en = ARRAY['Communication School', 'Marketing License', 'Online training', 'Professional experience'],
  formations_ar = ARRAY['مدرسة التواصل', 'رخصة التسويق', 'التدريب عبر الإنترنت', 'الخبرة المهنية']
WHERE nom = 'Concepteur-rédacteur';

-- ============================================
-- MÉTIERS POUR LE PROFIL TECHNIQUE
-- ============================================

-- Ingénieur Logiciel
UPDATE jobs 
SET 
  formations_en = ARRAY['Engineering School', 'Master in Computer Science', 'Continuing education', 'Professional certifications'],
  formations_ar = ARRAY['مدرسة الهندسة', 'ماجستير في علوم الحاسوب', 'التعليم المستمر', 'الشهادات المهنية']
WHERE nom = 'Ingénieur Logiciel';

-- Data Analyst
UPDATE jobs 
SET 
  formations_en = ARRAY['Master Data Science', 'Statistics License', 'Online training (Coursera, edX)', 'Professional certifications'],
  formations_ar = ARRAY['ماجستير علوم البيانات', 'رخصة الإحصاء', 'التدريب عبر الإنترنت (Coursera, edX)', 'الشهادات المهنية']
WHERE nom = 'Data Analyst';

-- Ingénieur Système
UPDATE jobs 
SET 
  formations_en = ARRAY['Engineering School', 'IT License', 'Professional certifications (Cisco, Microsoft)', 'Continuing education'],
  formations_ar = ARRAY['مدرسة الهندسة', 'رخصة تكنولوجيا المعلومات', 'الشهادات المهنية (Cisco, Microsoft)', 'التعليم المستمر']
WHERE nom = 'Ingénieur Système';

-- Développeur Backend
UPDATE jobs 
SET 
  formations_en = ARRAY['Engineering School', 'Web Development Bootcamp', 'Online training', 'Self-taught'],
  formations_ar = ARRAY['مدرسة الهندسة', 'معسكر تطوير الويب', 'التدريب عبر الإنترنت', 'التعلم الذاتي']
WHERE nom = 'Développeur Backend';

-- Cybersécurité
UPDATE jobs 
SET 
  formations_en = ARRAY['Master Cybersecurity', 'Certifications (CEH, CISSP)', 'Continuing education', 'Specialized School'],
  formations_ar = ARRAY['ماجستير الأمن السيبراني', 'الشهادات (CEH, CISSP)', 'التعليم المستمر', 'مدرسة متخصصة']
WHERE nom = 'Cybersécurité';

-- ============================================
-- MÉTIERS POUR LE PROFIL SOCIAL
-- ============================================

-- Psychologue
UPDATE jobs 
SET 
  formations_en = ARRAY['Master Psychology', 'Continuing education', 'Specialization (clinical, social, etc.)', 'Doctorate'],
  formations_ar = ARRAY['ماجستير علم النفس', 'التعليم المستمر', 'التخصص (سريري، اجتماعي، إلخ)', 'الدكتوراه']
WHERE nom = 'Psychologue';

-- Éducateur Spécialisé
UPDATE jobs 
SET 
  formations_en = ARRAY['DEES (State Diploma)', 'Continuing education', 'Practical internships', 'Professional training'],
  formations_ar = ARRAY['DEES (الدبلوم الوطني)', 'التعليم المستمر', 'التداريب العملية', 'التدريب المهني']
WHERE nom = 'Éducateur Spécialisé';

-- Conseiller d'orientation
UPDATE jobs 
SET 
  formations_en = ARRAY['Master Psychology', 'Specialized orientation training', 'Certification', 'Continuing education'],
  formations_ar = ARRAY['ماجستير علم النفس', 'التدريب المتخصص في التوجيه', 'الشهادة', 'التعليم المستمر']
WHERE nom = 'Conseiller d''orientation';

-- Infirmier
UPDATE jobs 
SET 
  formations_en = ARRAY['IFSI (Training Institute)', 'Continuing education', 'Specializations', 'Professional training'],
  formations_ar = ARRAY['IFSI (معهد التدريب)', 'التعليم المستمر', 'التخصصات', 'التدريب المهني']
WHERE nom = 'Infirmier';

-- Assistant Social
UPDATE jobs 
SET 
  formations_en = ARRAY['DEASS (State Diploma)', 'Continuing education', 'Practical internships', 'Professional training'],
  formations_ar = ARRAY['DEASS (الدبلوم الوطني)', 'التعليم المستمر', 'التداريب العملية', 'التدريب المهني']
WHERE nom = 'Assistant Social';

-- ============================================
-- MÉTIERS POUR LE PROFIL ORGANISATIONNEL
-- ============================================

-- Chef de Projet
UPDATE jobs 
SET 
  formations_en = ARRAY['Master Management', 'PMP Certification', 'Project management training', 'MBA'],
  formations_ar = ARRAY['ماجستير الإدارة', 'شهادة PMP', 'التدريب في إدارة المشاريع', 'MBA']
WHERE nom = 'Chef de Projet';

-- Responsable RH
UPDATE jobs 
SET 
  formations_en = ARRAY['Master HR', 'Continuing education', 'Professional certification', 'MBA'],
  formations_ar = ARRAY['ماجستير الموارد البشرية', 'التعليم المستمر', 'الشهادة المهنية', 'MBA']
WHERE nom = 'Responsable RH';

-- Contrôleur de Gestion
UPDATE jobs 
SET 
  formations_en = ARRAY['Master Finance/Control', 'Business School', 'Continuing education', 'Certifications'],
  formations_ar = ARRAY['ماجستير المالية/الرقابة', 'مدرسة الأعمال', 'التعليم المستمر', 'الشهادات']
WHERE nom = 'Contrôleur de Gestion';

-- Directeur d'établissement
UPDATE jobs 
SET 
  formations_en = ARRAY['Master Management', 'Continuing education', 'Certifications', 'Professional experience'],
  formations_ar = ARRAY['ماجستير الإدارة', 'التعليم المستمر', 'الشهادات', 'الخبرة المهنية']
WHERE nom = 'Directeur d''établissement';

-- Responsable Qualité
UPDATE jobs 
SET 
  formations_en = ARRAY['Quality training', 'Certifications (ISO, etc.)', 'Continuing education', 'Master Management'],
  formations_ar = ARRAY['التدريب في الجودة', 'الشهادات (ISO، إلخ)', 'التعليم المستمر', 'ماجستير الإدارة']
WHERE nom = 'Responsable Qualité';

-- ============================================
-- MÉTIERS POUR LE PROFIL ENTREPRENEURIAL
-- ============================================

-- Entrepreneur / Créateur d'entreprise
UPDATE jobs 
SET 
  formations_en = ARRAY['Entrepreneurship training', 'Incubators', 'Support (networks, mentors)', 'MBA'],
  formations_ar = ARRAY['التدريب في ريادة الأعمال', 'الحاضنات', 'الدعم (الشبكات، المرشدون)', 'MBA']
WHERE nom = 'Entrepreneur / Créateur d''entreprise';

-- Consultant Indépendant
UPDATE jobs 
SET 
  formations_en = ARRAY['Continuing education', 'Professional certifications', 'Network development', 'Self-taught'],
  formations_ar = ARRAY['التعليم المستمر', 'الشهادات المهنية', 'تطوير الشبكة', 'التعلم الذاتي']
WHERE nom = 'Consultant Indépendant';

-- Business Developer
UPDATE jobs 
SET 
  formations_en = ARRAY['Business School', 'Sales training', 'Continuing education', 'MBA'],
  formations_ar = ARRAY['مدرسة الأعمال', 'التدريب في المبيعات', 'التعليم المستمر', 'MBA']
WHERE nom = 'Business Developer';

-- Créateur de contenu
UPDATE jobs 
SET 
  formations_en = ARRAY['Self-taught', 'Online training', 'Workshops', 'Practical experience'],
  formations_ar = ARRAY['التعلم الذاتي', 'التدريب عبر الإنترنت', 'ورش العمل', 'الخبرة العملية']
WHERE nom = 'Créateur de contenu';

-- Investisseur / Business Angel
UPDATE jobs 
SET 
  formations_en = ARRAY['Finance training', 'Investor networks', 'Entrepreneurial experience', 'MBA'],
  formations_ar = ARRAY['التدريب في المالية', 'شبكات المستثمرين', 'الخبرة الريادية', 'MBA']
WHERE nom = 'Investisseur / Business Angel';

-- ============================================
-- FIN DU SCRIPT
-- ============================================
-- Vérifiez que toutes les formations sont traduites
-- ============================================

