-- ============================================
-- HUB ORIENTATION / FORMATION / EMPLOYABILITE
-- Supabase schema for scalable content modules
-- ============================================

-- Languages helper domain
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lang_code') THEN
    CREATE TYPE lang_code AS ENUM ('fr', 'en', 'ar');
  END IF;
END $$;

-- Core career paths
CREATE TABLE IF NOT EXISTS career_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  level_group TEXT,
  salary_min_monthly INTEGER,
  salary_max_monthly INTEGER,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS career_path_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_path_id UUID NOT NULL REFERENCES career_paths(id) ON DELETE CASCADE,
  language lang_code NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT,
  skills TEXT[] DEFAULT '{}',
  education_paths TEXT[] DEFAULT '{}',
  opportunities_summary TEXT,
  UNIQUE(career_path_id, language)
);

-- Opportunities (jobs, internships, scholarships, calls)
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('job', 'internship', 'scholarship', 'call')),
  company_name TEXT,
  city TEXT,
  country TEXT,
  source_url TEXT,
  application_deadline DATE,
  is_remote BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS opportunity_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  language lang_code NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  application_steps TEXT[] DEFAULT '{}',
  UNIQUE(opportunity_id, language)
);

-- Study in Morocco programs
CREATE TABLE IF NOT EXISTS study_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  institution_name TEXT NOT NULL,
  city TEXT,
  degree_level TEXT,
  duration_months INTEGER,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS study_program_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_program_id UUID NOT NULL REFERENCES study_programs(id) ON DELETE CASCADE,
  language lang_code NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  admission_requirements TEXT[] DEFAULT '{}',
  outcomes TEXT[] DEFAULT '{}',
  UNIQUE(study_program_id, language)
);

-- Career guides
CREATE TABLE IF NOT EXISTS career_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('career-choice', 'interview', 'cv', 'skills', 'international')),
  reading_minutes INTEGER DEFAULT 6,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS career_guide_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_guide_id UUID NOT NULL REFERENCES career_guides(id) ON DELETE CASCADE,
  language lang_code NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  body_markdown TEXT NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  UNIQUE(career_guide_id, language)
);

-- Quiz to content matching
CREATE TABLE IF NOT EXISTS profile_content_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_slug TEXT NOT NULL,
  career_path_id UUID REFERENCES career_paths(id) ON DELETE CASCADE,
  study_program_id UUID REFERENCES study_programs(id) ON DELETE CASCADE,
  career_guide_id UUID REFERENCES career_guides(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  score_weight INTEGER NOT NULL DEFAULT 1 CHECK (score_weight BETWEEN 1 AND 10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_career_path_translations_lang ON career_path_translations(language);
CREATE INDEX IF NOT EXISTS idx_opportunity_translations_lang ON opportunity_translations(language);
CREATE INDEX IF NOT EXISTS idx_study_program_translations_lang ON study_program_translations(language);
CREATE INDEX IF NOT EXISTS idx_career_guide_translations_lang ON career_guide_translations(language);
CREATE INDEX IF NOT EXISTS idx_opportunities_deadline ON opportunities(application_deadline);
CREATE INDEX IF NOT EXISTS idx_profile_content_matches_profile ON profile_content_matches(profile_slug);

-- Reuse existing trigger function if present
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_career_paths_updated_at') THEN
      CREATE TRIGGER update_career_paths_updated_at BEFORE UPDATE ON career_paths
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_opportunities_updated_at') THEN
      CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON opportunities
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_study_programs_updated_at') THEN
      CREATE TRIGGER update_study_programs_updated_at BEFORE UPDATE ON study_programs
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_career_guides_updated_at') THEN
      CREATE TRIGGER update_career_guides_updated_at BEFORE UPDATE ON career_guides
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
  END IF;
END $$;

-- RLS
ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_path_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_program_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_guide_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_content_matches ENABLE ROW LEVEL SECURITY;

-- Public read policy (if missing)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read career_paths') THEN
    CREATE POLICY "Public read career_paths" ON career_paths FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read career_path_translations') THEN
    CREATE POLICY "Public read career_path_translations" ON career_path_translations FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read opportunities') THEN
    CREATE POLICY "Public read opportunities" ON opportunities FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read opportunity_translations') THEN
    CREATE POLICY "Public read opportunity_translations" ON opportunity_translations FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read study_programs') THEN
    CREATE POLICY "Public read study_programs" ON study_programs FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read study_program_translations') THEN
    CREATE POLICY "Public read study_program_translations" ON study_program_translations FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read career_guides') THEN
    CREATE POLICY "Public read career_guides" ON career_guides FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read career_guide_translations') THEN
    CREATE POLICY "Public read career_guide_translations" ON career_guide_translations FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read profile_content_matches') THEN
    CREATE POLICY "Public read profile_content_matches" ON profile_content_matches FOR SELECT USING (true);
  END IF;
END $$;
