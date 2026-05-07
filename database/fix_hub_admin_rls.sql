-- Fix RLS write blocking for Hub admin CRUD
-- Run this in Supabase SQL editor (once)

ALTER TABLE public.career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_path_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_program_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_guide_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_content_matches ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write career_paths anon') THEN
    CREATE POLICY "Admin write career_paths anon" ON public.career_paths
      FOR ALL TO anon USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write career_paths authenticated') THEN
    CREATE POLICY "Admin write career_paths authenticated" ON public.career_paths
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write career_path_translations anon') THEN
    CREATE POLICY "Admin write career_path_translations anon" ON public.career_path_translations
      FOR ALL TO anon USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write career_path_translations authenticated') THEN
    CREATE POLICY "Admin write career_path_translations authenticated" ON public.career_path_translations
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write opportunities anon') THEN
    CREATE POLICY "Admin write opportunities anon" ON public.opportunities
      FOR ALL TO anon USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write opportunities authenticated') THEN
    CREATE POLICY "Admin write opportunities authenticated" ON public.opportunities
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write opportunity_translations anon') THEN
    CREATE POLICY "Admin write opportunity_translations anon" ON public.opportunity_translations
      FOR ALL TO anon USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write opportunity_translations authenticated') THEN
    CREATE POLICY "Admin write opportunity_translations authenticated" ON public.opportunity_translations
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write study_programs anon') THEN
    CREATE POLICY "Admin write study_programs anon" ON public.study_programs
      FOR ALL TO anon USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write study_programs authenticated') THEN
    CREATE POLICY "Admin write study_programs authenticated" ON public.study_programs
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write study_program_translations anon') THEN
    CREATE POLICY "Admin write study_program_translations anon" ON public.study_program_translations
      FOR ALL TO anon USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write study_program_translations authenticated') THEN
    CREATE POLICY "Admin write study_program_translations authenticated" ON public.study_program_translations
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write career_guides anon') THEN
    CREATE POLICY "Admin write career_guides anon" ON public.career_guides
      FOR ALL TO anon USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write career_guides authenticated') THEN
    CREATE POLICY "Admin write career_guides authenticated" ON public.career_guides
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write career_guide_translations anon') THEN
    CREATE POLICY "Admin write career_guide_translations anon" ON public.career_guide_translations
      FOR ALL TO anon USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write career_guide_translations authenticated') THEN
    CREATE POLICY "Admin write career_guide_translations authenticated" ON public.career_guide_translations
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write profile_content_matches anon') THEN
    CREATE POLICY "Admin write profile_content_matches anon" ON public.profile_content_matches
      FOR ALL TO anon USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write profile_content_matches authenticated') THEN
    CREATE POLICY "Admin write profile_content_matches authenticated" ON public.profile_content_matches
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;
