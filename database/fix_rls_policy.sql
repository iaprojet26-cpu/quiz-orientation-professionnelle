-- ============================================
-- CORRECTION DE LA POLITIQUE RLS POUR quiz_attempts
-- ============================================
-- Cette erreur apparaît lors de la sauvegarde des tentatives de quiz
-- Exécutez ce script dans Supabase SQL Editor

-- Supprimer l'ancienne politique si elle existe
DROP POLICY IF EXISTS "Public insert access for quiz_attempts" ON quiz_attempts;

-- Créer une nouvelle politique qui permet l'insertion publique
CREATE POLICY "Public insert access for quiz_attempts" ON quiz_attempts
    FOR INSERT 
    WITH CHECK (true);

-- Vérifier que la politique est bien créée
SELECT * FROM pg_policies WHERE tablename = 'quiz_attempts';

-- ============================================
-- FIN DU SCRIPT
-- ============================================

