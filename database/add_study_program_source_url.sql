-- Add optional registration URL for study programs
ALTER TABLE public.study_programs
ADD COLUMN IF NOT EXISTS source_url TEXT;
