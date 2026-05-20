-- Workflow éditorial Agent IA — toutes les publications admin
-- Exécuter dans Supabase SQL Editor

-- Articles blog
ALTER TABLE blog_articles
  ADD COLUMN IF NOT EXISTS workflow_status TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS ai_source TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS brief_json JSONB,
  ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Métiers
ALTER TABLE jobs
  ADD COLUMN IF NOT EXISTS workflow_status TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS ai_source TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS brief_json JSONB,
  ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Career paths
ALTER TABLE career_paths
  ADD COLUMN IF NOT EXISTS workflow_status TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS ai_source TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS brief_json JSONB,
  ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Opportunities
ALTER TABLE opportunities
  ADD COLUMN IF NOT EXISTS workflow_status TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS ai_source TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS brief_json JSONB,
  ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Study programs
ALTER TABLE study_programs
  ADD COLUMN IF NOT EXISTS workflow_status TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS ai_source TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS brief_json JSONB,
  ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Career guides
ALTER TABLE career_guides
  ADD COLUMN IF NOT EXISTS workflow_status TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS ai_source TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS brief_json JSONB,
  ADD COLUMN IF NOT EXISTS admin_notes TEXT;

COMMENT ON COLUMN blog_articles.workflow_status IS 'manual | idea | brief_ok | draft_ia | review | published';

CREATE INDEX IF NOT EXISTS idx_blog_articles_workflow ON blog_articles(workflow_status);
CREATE INDEX IF NOT EXISTS idx_jobs_workflow ON jobs(workflow_status);
CREATE INDEX IF NOT EXISTS idx_career_paths_workflow ON career_paths(workflow_status);
CREATE INDEX IF NOT EXISTS idx_opportunities_workflow ON opportunities(workflow_status);
CREATE INDEX IF NOT EXISTS idx_study_programs_workflow ON study_programs(workflow_status);
CREATE INDEX IF NOT EXISTS idx_career_guides_workflow ON career_guides(workflow_status);
