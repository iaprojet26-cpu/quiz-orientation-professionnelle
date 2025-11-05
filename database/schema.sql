-- ============================================
-- SCHÉMA SUPABASE POUR QUIZ D'ORIENTATION
-- ============================================

-- Table: questions
-- Stocke les questions du quiz
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  texte TEXT NOT NULL,
  categorie TEXT NOT NULL CHECK (categorie IN ('centres_interet', 'competences', 'preferences_travail', 'objectifs_professionnels')),
  ordre INTEGER,
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: options
-- Stocke les options de réponse pour chaque question
CREATE TABLE IF NOT EXISTS options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  texte TEXT NOT NULL,
  score JSONB NOT NULL, -- Format: {"creatif": 3, "technique": 1, ...}
  ordre INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: profiles
-- Définit les différents profils professionnels possibles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  criteres JSONB NOT NULL, -- Critères de scoring pour correspondre à ce profil
  couleur TEXT, -- Couleur pour l'affichage
  icone TEXT, -- Emoji ou icône
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: jobs
-- Métiers recommandés pour chaque profil
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  description TEXT NOT NULL,
  profil_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  niveau_etudes TEXT NOT NULL, -- Ex: "Bac+2", "Bac+5", etc.
  competences TEXT[], -- Array de compétences clés
  formations TEXT[], -- Array de formations possibles
  salaire_median TEXT, -- Optionnel
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: quiz_attempts
-- Historique des tentatives de quiz (optionnel si utilisateur anonyme)
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID, -- NULL si anonyme, sinon UUID de l'utilisateur
  email TEXT, -- Email optionnel pour sauvegarder les résultats
  reponses JSONB NOT NULL, -- Format: {"question_id": "option_id", ...}
  scores JSONB NOT NULL, -- Scores calculés
  profile_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_options_question_id ON options(question_id);
CREATE INDEX IF NOT EXISTS idx_jobs_profil_id ON jobs(profil_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created_at ON quiz_attempts(created_at);
CREATE INDEX IF NOT EXISTS idx_questions_categorie ON questions(categorie);
CREATE INDEX IF NOT EXISTS idx_questions_actif ON questions(actif);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_options_updated_at BEFORE UPDATE ON options
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Activation de Row Level Security (RLS)
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE options ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Politiques RLS: Lecture publique pour questions, options, profiles, jobs
-- Écriture publique pour quiz_attempts (pour permettre les quiz anonymes)
CREATE POLICY "Public read access for questions" ON questions
    FOR SELECT USING (true);

CREATE POLICY "Public read access for options" ON options
    FOR SELECT USING (true);

CREATE POLICY "Public read access for profiles" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Public read access for jobs" ON jobs
    FOR SELECT USING (true);

CREATE POLICY "Public insert access for quiz_attempts" ON quiz_attempts
    FOR INSERT WITH CHECK (true);

