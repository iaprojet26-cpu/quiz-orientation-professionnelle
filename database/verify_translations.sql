-- ============================================
-- SCRIPT DE VÉRIFICATION DES TRADUCTIONS
-- ============================================
-- Exécutez ce script dans Supabase SQL Editor pour vérifier
-- que les colonnes et traductions sont bien présentes

-- ============================================
-- 1. Vérifier les colonnes de traduction
-- ============================================
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'questions'
  AND column_name IN ('texte', 'texte_en', 'texte_ar')
ORDER BY column_name;

-- ============================================
-- 2. Vérifier les questions avec traductions
-- ============================================
SELECT 
  id,
  texte AS "Texte FR",
  texte_en AS "Texte EN",
  texte_ar AS "Texte AR",
  CASE 
    WHEN texte_en IS NOT NULL AND texte_en != '' THEN '✅'
    ELSE '❌'
  END AS "EN présent",
  CASE 
    WHEN texte_ar IS NOT NULL AND texte_ar != '' THEN '✅'
    ELSE '❌'
  END AS "AR présent"
FROM questions
ORDER BY ordre
LIMIT 5;

-- ============================================
-- 3. Vérifier les options avec traductions
-- ============================================
SELECT 
  o.id,
  o.texte AS "Texte FR",
  o.texte_en AS "Texte EN",
  o.texte_ar AS "Texte AR",
  q.texte AS "Question"
FROM options o
JOIN questions q ON o.question_id = q.id
WHERE q.ordre = 1
ORDER BY o.ordre
LIMIT 5;

-- ============================================
-- 4. Vérifier les profils avec traductions
-- ============================================
SELECT 
  id,
  nom AS "Nom FR",
  nom_en AS "Nom EN",
  nom_ar AS "Nom AR",
  CASE 
    WHEN nom_en IS NOT NULL AND nom_en != '' THEN '✅'
    ELSE '❌'
  END AS "EN présent",
  CASE 
    WHEN nom_ar IS NOT NULL AND nom_ar != '' THEN '✅'
    ELSE '❌'
  END AS "AR présent"
FROM profiles;

-- ============================================
-- 5. Compter les traductions disponibles
-- ============================================
SELECT 
  'Questions EN' AS type,
  COUNT(*) AS total,
  COUNT(texte_en) FILTER (WHERE texte_en IS NOT NULL AND texte_en != '') AS traduites
FROM questions
UNION ALL
SELECT 
  'Questions AR' AS type,
  COUNT(*) AS total,
  COUNT(texte_ar) FILTER (WHERE texte_ar IS NOT NULL AND texte_ar != '') AS traduites
FROM questions
UNION ALL
SELECT 
  'Options EN' AS type,
  COUNT(*) AS total,
  COUNT(texte_en) FILTER (WHERE texte_en IS NOT NULL AND texte_en != '') AS traduites
FROM options
UNION ALL
SELECT 
  'Options AR' AS type,
  COUNT(*) AS total,
  COUNT(texte_ar) FILTER (WHERE texte_ar IS NOT NULL AND texte_ar != '') AS traduites
FROM options;

-- ============================================
-- FIN DU SCRIPT
-- ============================================
-- Si vous voyez des ❌, cela signifie que les traductions
-- ne sont pas encore remplies pour ces éléments
-- ============================================

