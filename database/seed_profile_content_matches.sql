-- ============================================
-- SEED: PROFILE CONTENT MATCHING
-- Relie automatiquement les profils quiz aux contenus Hub
-- ============================================

BEGIN;

-- Optionnel: nettoyer les anciens mappings pour repartir proprement
-- Commente cette ligne si tu veux conserver l'existant
DELETE FROM profile_content_matches;

-- 1) Récupérer les profils existants
WITH profiles_src AS (
  SELECT
    id AS profile_id,
    nom,
    LOWER(
      REGEXP_REPLACE(
        TRANSLATE(nom, 'àâäáãåçèéêëìíîïñòóôöõùúûüýÿ', 'aaaaaaceeeeiiiinooooouuuuyy'),
        '[^a-z0-9]+',
        '-',
        'g'
      )
    ) AS profile_slug
  FROM profiles
),

-- 2) Contenus actifs/publies
career_paths_src AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn
  FROM career_paths
  WHERE active = true
),
opportunities_src AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn
  FROM opportunities
  WHERE is_active = true
),
study_programs_src AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn
  FROM study_programs
  WHERE is_active = true
),
career_guides_src AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY COALESCE(published_at, created_at) DESC) AS rn
  FROM career_guides
  WHERE is_published = true
),

-- 3) Générer 2 recommandations de chaque type par profil (si dispo)
generated_matches AS (
  SELECT
    p.profile_id::text AS profile_slug,
    cp.id AS career_path_id,
    NULL::uuid AS opportunity_id,
    NULL::uuid AS study_program_id,
    NULL::uuid AS career_guide_id,
    10 - cp.rn AS score_weight
  FROM profiles_src p
  JOIN career_paths_src cp ON cp.rn <= 2

  UNION ALL

  SELECT
    p.profile_id::text AS profile_slug,
    NULL::uuid AS career_path_id,
    o.id AS opportunity_id,
    NULL::uuid AS study_program_id,
    NULL::uuid AS career_guide_id,
    8 - o.rn AS score_weight
  FROM profiles_src p
  JOIN opportunities_src o ON o.rn <= 2

  UNION ALL

  SELECT
    p.profile_id::text AS profile_slug,
    NULL::uuid AS career_path_id,
    NULL::uuid AS opportunity_id,
    sp.id AS study_program_id,
    NULL::uuid AS career_guide_id,
    7 - sp.rn AS score_weight
  FROM profiles_src p
  JOIN study_programs_src sp ON sp.rn <= 2

  UNION ALL

  SELECT
    p.profile_id::text AS profile_slug,
    NULL::uuid AS career_path_id,
    NULL::uuid AS opportunity_id,
    NULL::uuid AS study_program_id,
    cg.id AS career_guide_id,
    9 - cg.rn AS score_weight
  FROM profiles_src p
  JOIN career_guides_src cg ON cg.rn <= 2
)

INSERT INTO profile_content_matches (
  profile_slug,
  career_path_id,
  opportunity_id,
  study_program_id,
  career_guide_id,
  score_weight
)
SELECT
  profile_slug,
  career_path_id,
  opportunity_id,
  study_program_id,
  career_guide_id,
  GREATEST(score_weight, 1)
FROM generated_matches;

COMMIT;

-- Vérification rapide
-- SELECT profile_slug, COUNT(*) AS total_matches
-- FROM profile_content_matches
-- GROUP BY profile_slug
-- ORDER BY total_matches DESC;
