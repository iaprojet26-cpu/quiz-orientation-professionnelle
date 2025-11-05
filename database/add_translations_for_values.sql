-- ============================================
-- AJOUT DES COLONNES DE TRADUCTION POUR LES VALEURS
-- ============================================
-- Ce script ajoute des colonnes pour traduire niveau_etudes, competences, formations
-- Exécutez ce script dans Supabase SQL Editor

-- ============================================
-- Ajouter les colonnes de traduction pour niveau_etudes
-- ============================================
ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS niveau_etudes_en TEXT,
ADD COLUMN IF NOT EXISTS niveau_etudes_ar TEXT;

COMMENT ON COLUMN jobs.niveau_etudes IS 'Niveau d''études en français';
COMMENT ON COLUMN jobs.niveau_etudes_en IS 'Niveau d''études en anglais';
COMMENT ON COLUMN jobs.niveau_etudes_ar IS 'Niveau d''études en arabe';

-- ============================================
-- Ajouter les colonnes de traduction pour competences (array)
-- ============================================
-- Note: Les compétences sont des arrays, on va créer des colonnes JSONB pour les traductions
ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS competences_en TEXT[],
ADD COLUMN IF NOT EXISTS competences_ar TEXT[];

COMMENT ON COLUMN jobs.competences IS 'Compétences en français (array)';
COMMENT ON COLUMN jobs.competences_en IS 'Compétences en anglais (array)';
COMMENT ON COLUMN jobs.competences_ar IS 'Compétences en arabe (array)';

-- ============================================
-- Ajouter les colonnes de traduction pour formations (array)
-- ============================================
ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS formations_en TEXT[],
ADD COLUMN IF NOT EXISTS formations_ar TEXT[];

COMMENT ON COLUMN jobs.formations IS 'Formations en français (array)';
COMMENT ON COLUMN jobs.formations_en IS 'Formations en anglais (array)';
COMMENT ON COLUMN jobs.formations_ar IS 'Formations en arabe (array)';

-- ============================================
-- FIN DU SCRIPT
-- ============================================
-- Après avoir exécuté ce script, vous devrez remplir les traductions
-- avec le script fill_translations_for_values.sql
-- ============================================

