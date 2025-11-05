-- ============================================
-- DONNÉES INITIALES POUR LE QUIZ
-- ============================================
-- Ce fichier contient des données d'exemple
-- À exécuter après le schéma.sql

-- ============================================
-- PROFILS PROFESSIONNELS
-- ============================================
INSERT INTO profiles (nom, description, criteres, couleur, icone) VALUES
('Profil Créatif', 'Vous êtes attiré par l''innovation, l''art et la création. Vous aimez exprimer vos idées et travailler sur des projets originaux.', '{"creatif": 15, "communication": 10, "flexibilite": 8}', '#8B5CF6', '🎨'),
('Profil Technique', 'Vous excellez dans la résolution de problèmes complexes, la logique et les technologies. Vous êtes méthodique et précis.', '{"technique": 15, "logique": 12, "precision": 10}', '#06B6D4', '💻'),
('Profil Social', 'Vous avez un fort intérêt pour aider les autres, communiquer et travailler en équipe. Vous êtes empathique et à l''écoute.', '{"social": 15, "communication": 12, "empathie": 10}', '#10B981', '🤝'),
('Profil Organisationnel', 'Vous êtes organisé, aimez gérer des projets et diriger des équipes. Vous avez le sens des responsabilités.', '{"organisation": 15, "leadership": 12, "gestion": 10}', '#F59E0B', '📊'),
('Profil Entrepreneurial', 'Vous êtes indépendant, aimez prendre des risques calculés et créer votre propre voie. Vous êtes visionnaire.', '{"entrepreneuriat": 15, "leadership": 10, "creatif": 8}', '#EF4444', '🚀');

-- ============================================
-- QUESTIONS D'EXEMPLE
-- ============================================
-- Note: Les IDs sont générés automatiquement, donc on doit d'abord insérer les questions
-- puis récupérer leurs IDs pour les options. Pour simplifier, on utilise des sous-requêtes.

-- Questions sur les centres d'intérêt
INSERT INTO questions (texte, categorie, ordre) VALUES
('Quel type d''activité vous attire le plus ?', 'centres_interet', 1),
('Dans quel environnement préféreriez-vous travailler ?', 'centres_interet', 2),
('Quel sujet vous passionne le plus ?', 'centres_interet', 3);

-- Questions sur les compétences
INSERT INTO questions (texte, categorie, ordre) VALUES
('Quelle est votre principale force ?', 'competences', 4),
('Comment abordez-vous un nouveau projet ?', 'competences', 5),
('Quel type de problème aimez-vous résoudre ?', 'competences', 6);

-- Questions sur les préférences de travail
INSERT INTO questions (texte, categorie, ordre) VALUES
('Préférez-vous travailler :', 'preferences_travail', 7),
('Quel type d''horaire vous convient le mieux ?', 'preferences_travail', 8),
('Comment préférez-vous communiquer ?', 'preferences_travail', 9);

-- Questions sur les objectifs professionnels
INSERT INTO questions (texte, categorie, ordre) VALUES
('Quel est votre objectif professionnel principal ?', 'objectifs_professionnels', 10),
('Qu''est-ce qui vous motive le plus dans une carrière ?', 'objectifs_professionnels', 11),
('Comment envisagez-vous votre évolution professionnelle ?', 'objectifs_professionnels', 12);

-- ============================================
-- OPTIONS POUR LES QUESTIONS
-- ============================================
-- Question 1: Quel type d'activité vous attire le plus ?
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Créer et concevoir des solutions originales', '{"creatif": 3, "technique": 1}', 1
FROM questions WHERE texte = 'Quel type d''activité vous attire le plus ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Analyser et résoudre des problèmes complexes', '{"technique": 3, "logique": 2}', 2
FROM questions WHERE texte = 'Quel type d''activité vous attire le plus ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Aider et conseiller les autres', '{"social": 3, "communication": 2}', 3
FROM questions WHERE texte = 'Quel type d''activité vous attire le plus ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Organiser et gérer des équipes ou projets', '{"organisation": 3, "leadership": 2}', 4
FROM questions WHERE texte = 'Quel type d''activité vous attire le plus ?';

-- Ajouter plus d'options pour les autres questions...
-- (Pour l'instant, on a mis un exemple. Les autres seront ajoutées progressivement)

-- ============================================
-- MÉTIERS RECOMMANDÉS
-- ============================================
-- Métiers pour le Profil Créatif
INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 
  'Graphiste',
  'Création visuelle pour la communication, le marketing et les médias',
  id,
  'Bac+2 à Bac+5',
  ARRAY['Créativité', 'Maîtrise des logiciels graphiques', 'Sens esthétique'],
  ARRAY['BTS Design Graphique', 'École d''art', 'Formation en ligne (Adobe Creative Suite)']
FROM profiles WHERE nom = 'Profil Créatif';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 
  'Développeur Frontend',
  'Création d''interfaces utilisateur interactives et esthétiques',
  id,
  'Bac+2 à Bac+5',
  ARRAY['HTML/CSS/JavaScript', 'Frameworks React/Vue', 'Design UI/UX'],
  ARRAY['Bootcamp développement web', 'Formation en ligne (FreeCodeCamp, Udemy)', 'École d''ingénieur']
FROM profiles WHERE nom = 'Profil Créatif';

-- Métiers pour le Profil Technique
INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 
  'Ingénieur Logiciel',
  'Conception et développement de systèmes informatiques complexes',
  id,
  'Bac+5',
  ARRAY['Programmation', 'Architecture logicielle', 'Algorithmes'],
  ARRAY['École d''ingénieur', 'Master Informatique', 'Formation continue']
FROM profiles WHERE nom = 'Profil Technique';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 
  'Data Analyst',
  'Analyse de données pour aider à la prise de décision',
  id,
  'Bac+3 à Bac+5',
  ARRAY['Statistiques', 'SQL', 'Python/R', 'Visualisation de données'],
  ARRAY['Licence/Master Mathématiques/Statistiques', 'Formation Data Science en ligne', 'Certification Google Data Analytics']
FROM profiles WHERE nom = 'Profil Technique';

-- Métiers pour le Profil Social
INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 
  'Psychologue',
  'Accompagnement et soutien des personnes en difficulté',
  id,
  'Bac+5',
  ARRAY['Écoute active', 'Empathie', 'Analyse psychologique'],
  ARRAY['Master Psychologie', 'Formation continue', 'Spécialisation (clinique, sociale, etc.)']
FROM profiles WHERE nom = 'Profil Social';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 
  'Éducateur Spécialisé',
  'Accompagnement de personnes en difficulté sociale ou familiale',
  id,
  'Bac+3',
  ARRAY['Patience', 'Communication', 'Empathie', 'Gestion de conflits'],
  ARRAY['DEES (Diplôme d''État)', 'Formation continue', 'Stages pratiques']
FROM profiles WHERE nom = 'Profil Social';

-- Métiers pour le Profil Organisationnel
INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 
  'Chef de Projet',
  'Gestion et coordination de projets dans différents secteurs',
  id,
  'Bac+3 à Bac+5',
  ARRAY['Organisation', 'Leadership', 'Gestion budgétaire', 'Communication'],
  ARRAY['Master Management', 'Certification PMP', 'Formation en gestion de projet']
FROM profiles WHERE nom = 'Profil Organisationnel';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 
  'Responsable RH',
  'Gestion des ressources humaines et développement des talents',
  id,
  'Bac+5',
  ARRAY['Communication', 'Gestion', 'Psychologie', 'Droit du travail'],
  ARRAY['Master RH', 'Formation continue', 'Certification professionnelle']
FROM profiles WHERE nom = 'Profil Organisationnel';

-- Métiers pour le Profil Entrepreneurial
INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 
  'Entrepreneur / Créateur d''entreprise',
  'Création et développement de votre propre entreprise',
  id,
  'Variable',
  ARRAY['Vision', 'Prise de risque', 'Leadership', 'Résilience'],
  ARRAY['Formation entrepreneuriat', 'Incubateurs', 'Accompagnement (réseaux, mentors)']
FROM profiles WHERE nom = 'Profil Entrepreneurial';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 
  'Consultant Indépendant',
  'Expertise et conseil en freelance dans votre domaine',
  id,
  'Bac+3 minimum',
  ARRAY['Expertise technique', 'Autonomie', 'Communication', 'Réseau professionnel'],
  ARRAY['Formation continue', 'Certifications professionnelles', 'Développement réseau']
FROM profiles WHERE nom = 'Profil Entrepreneurial';

