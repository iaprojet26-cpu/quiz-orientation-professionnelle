-- ============================================
-- AJOUT DU SUPPORT MULTILINGUE POUR LES QUESTIONS ET OPTIONS
-- ============================================
-- Ce script ajoute des colonnes pour stocker les traductions
-- Exécutez ce script dans Supabase SQL Editor

-- ============================================
-- 1. Ajouter les colonnes de traduction aux questions
-- ============================================
ALTER TABLE questions 
ADD COLUMN IF NOT EXISTS texte_en TEXT,
ADD COLUMN IF NOT EXISTS texte_ar TEXT;

-- Commentaire pour documenter
COMMENT ON COLUMN questions.texte IS 'Texte de la question en français (langue par défaut)';
COMMENT ON COLUMN questions.texte_en IS 'Texte de la question en anglais';
COMMENT ON COLUMN questions.texte_ar IS 'Texte de la question en arabe';

-- ============================================
-- 2. Ajouter les colonnes de traduction aux options
-- ============================================
ALTER TABLE options 
ADD COLUMN IF NOT EXISTS texte_en TEXT,
ADD COLUMN IF NOT EXISTS texte_ar TEXT;

-- Commentaire pour documenter
COMMENT ON COLUMN options.texte IS 'Texte de l''option en français (langue par défaut)';
COMMENT ON COLUMN options.texte_en IS 'Texte de l''option en anglais';
COMMENT ON COLUMN options.texte_ar IS 'Texte de l''option en arabe';

-- ============================================
-- 3. Ajouter les colonnes de traduction aux profils
-- ============================================
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS nom_en TEXT,
ADD COLUMN IF NOT EXISTS nom_ar TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS description_ar TEXT;

-- Commentaire pour documenter
COMMENT ON COLUMN profiles.nom IS 'Nom du profil en français (langue par défaut)';
COMMENT ON COLUMN profiles.nom_en IS 'Nom du profil en anglais';
COMMENT ON COLUMN profiles.nom_ar IS 'Nom du profil en arabe';
COMMENT ON COLUMN profiles.description IS 'Description du profil en français (langue par défaut)';
COMMENT ON COLUMN profiles.description_en IS 'Description du profil en anglais';
COMMENT ON COLUMN profiles.description_ar IS 'Description du profil en arabe';

-- ============================================
-- 4. Ajouter les colonnes de traduction aux métiers (jobs)
-- ============================================
ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS nom_en TEXT,
ADD COLUMN IF NOT EXISTS nom_ar TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS description_ar TEXT;

-- Commentaire pour documenter
COMMENT ON COLUMN jobs.nom IS 'Nom du métier en français (langue par défaut)';
COMMENT ON COLUMN jobs.nom_en IS 'Nom du métier en anglais';
COMMENT ON COLUMN jobs.nom_ar IS 'Nom du métier en arabe';
COMMENT ON COLUMN jobs.description IS 'Description du métier en français (langue par défaut)';
COMMENT ON COLUMN jobs.description_en IS 'Description du métier en anglais';
COMMENT ON COLUMN jobs.description_ar IS 'Description du métier en arabe';

-- ============================================
-- FIN DU SCRIPT
-- ============================================
-- Après avoir exécuté ce script, vous devrez :
-- 1. Mettre à jour les données existantes avec les traductions
-- 2. Modifier le service quizService.js pour charger les traductions selon la langue
-- ============================================

