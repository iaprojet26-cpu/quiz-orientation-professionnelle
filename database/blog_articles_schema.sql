-- ============================================
-- TABLE BLOG_ARTICLES POUR SUPABASE
-- ============================================

-- Table: blog_articles
-- Stocke les articles de blog avec support multilingue
CREATE TABLE IF NOT EXISTS blog_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  
  -- Titres multilingues
  title_fr TEXT NOT NULL,
  title_en TEXT,
  title_ar TEXT,
  
  -- Descriptions multilingues
  description_fr TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  
  -- Contenu Markdown multilingue
  content_fr TEXT NOT NULL,
  content_en TEXT,
  content_ar TEXT,
  
  -- Métadonnées
  image TEXT,
  keywords_fr TEXT[],
  keywords_en TEXT[],
  keywords_ar TEXT[],
  category TEXT DEFAULT 'orientation',
  
  -- Statut
  published BOOLEAN DEFAULT false,
  
  -- Dates
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published ON blog_articles(published);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published_at ON blog_articles(published_at DESC);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_blog_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Supprimer le trigger s'il existe déjà, puis le recréer
DROP TRIGGER IF EXISTS update_blog_articles_updated_at ON blog_articles;

CREATE TRIGGER update_blog_articles_updated_at
  BEFORE UPDATE ON blog_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_articles_updated_at();

-- Activation de Row Level Security (RLS)
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes si elles existent
DROP POLICY IF EXISTS "Public read access for published articles" ON blog_articles;
DROP POLICY IF EXISTS "Admin full access" ON blog_articles;

-- Politique RLS: Lecture publique pour les articles publiés
CREATE POLICY "Public read access for published articles" ON blog_articles
  FOR SELECT USING (published = true);

-- Politique RLS: Écriture uniquement pour les admins (via service role key)
-- Note: Pour l'admin, on utilisera le service role key côté serveur (Netlify Functions)
-- ou une authentification personnalisée

-- Pour le développement, on peut créer une politique temporaire
-- À SUPPRIMER EN PRODUCTION et utiliser uniquement le service role key
CREATE POLICY "Admin full access" ON blog_articles
  FOR ALL USING (true)
  WITH CHECK (true);

-- Commentaire sur la table
COMMENT ON TABLE blog_articles IS 'Articles de blog avec support multilingue (FR, EN, AR)';

