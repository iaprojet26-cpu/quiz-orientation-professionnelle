-- ============================================
-- DONNÉES COMPLÈTES POUR LE QUIZ
-- ============================================
-- Script complet pour insérer toutes les données
-- À exécuter APRÈS schema.sql
-- ============================================

-- ============================================
-- 1. PROFILS PROFESSIONNELS (5 profils)
-- ============================================
INSERT INTO profiles (nom, description, criteres, couleur, icone) VALUES
('Profil Créatif', 'Vous êtes attiré par l''innovation, l''art et la création. Vous aimez exprimer vos idées et travailler sur des projets originaux.', '{"creatif": 15, "communication": 10, "flexibilite": 8}', '#8B5CF6', '🎨'),
('Profil Technique', 'Vous excellez dans la résolution de problèmes complexes, la logique et les technologies. Vous êtes méthodique et précis.', '{"technique": 15, "logique": 12, "precision": 10}', '#06B6D4', '💻'),
('Profil Social', 'Vous avez un fort intérêt pour aider les autres, communiquer et travailler en équipe. Vous êtes empathique et à l''écoute.', '{"social": 15, "communication": 12, "empathie": 10}', '#10B981', '🤝'),
('Profil Organisationnel', 'Vous êtes organisé, aimez gérer des projets et diriger des équipes. Vous avez le sens des responsabilités.', '{"organisation": 15, "leadership": 12, "gestion": 10}', '#F59E0B', '📊'),
('Profil Entrepreneurial', 'Vous êtes indépendant, aimez prendre des risques calculés et créer votre propre voie. Vous êtes visionnaire.', '{"entrepreneuriat": 15, "leadership": 10, "creatif": 8}', '#EF4444', '🚀');

-- ============================================
-- 2. QUESTIONS (12 questions)
-- ============================================
INSERT INTO questions (texte, categorie, ordre) VALUES
('Quel type d''activité vous attire le plus ?', 'centres_interet', 1),
('Dans quel environnement préféreriez-vous travailler ?', 'centres_interet', 2),
('Quel sujet vous passionne le plus ?', 'centres_interet', 3),
('Quelle est votre principale force ?', 'competences', 4),
('Comment abordez-vous un nouveau projet ?', 'competences', 5),
('Quel type de problème aimez-vous résoudre ?', 'competences', 6),
('Préférez-vous travailler :', 'preferences_travail', 7),
('Quel type d''horaire vous convient le mieux ?', 'preferences_travail', 8),
('Comment préférez-vous communiquer ?', 'preferences_travail', 9),
('Quel est votre objectif professionnel principal ?', 'objectifs_professionnels', 10),
('Qu''est-ce qui vous motive le plus dans une carrière ?', 'objectifs_professionnels', 11),
('Comment envisagez-vous votre évolution professionnelle ?', 'objectifs_professionnels', 12);

-- ============================================
-- 3. OPTIONS POUR TOUTES LES QUESTIONS
-- ============================================

-- Question 1: Quel type d'activité vous attire le plus ?
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Créer et concevoir des solutions originales', '{"creatif": 3, "technique": 1}'::jsonb, 1
FROM questions WHERE texte = 'Quel type d''activité vous attire le plus ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Analyser et résoudre des problèmes complexes', '{"technique": 3, "logique": 2}'::jsonb, 2
FROM questions WHERE texte = 'Quel type d''activité vous attire le plus ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Aider et conseiller les autres', '{"social": 3, "communication": 2}'::jsonb, 3
FROM questions WHERE texte = 'Quel type d''activité vous attire le plus ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Organiser et gérer des équipes ou projets', '{"organisation": 3, "leadership": 2}'::jsonb, 4
FROM questions WHERE texte = 'Quel type d''activité vous attire le plus ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Créer ma propre entreprise ou projet', '{"entrepreneuriat": 3, "leadership": 2}'::jsonb, 5
FROM questions WHERE texte = 'Quel type d''activité vous attire le plus ?';

-- Question 2: Dans quel environnement préféreriez-vous travailler ?
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Un studio ou atelier créatif', '{"creatif": 3, "autonomie": 2}'::jsonb, 1
FROM questions WHERE texte = 'Dans quel environnement préféreriez-vous travailler ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Un bureau avec des outils technologiques', '{"technique": 3, "organisation": 1}'::jsonb, 2
FROM questions WHERE texte = 'Dans quel environnement préféreriez-vous travailler ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Sur le terrain, en contact avec les gens', '{"social": 3, "communication": 2}'::jsonb, 3
FROM questions WHERE texte = 'Dans quel environnement préféreriez-vous travailler ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Un bureau avec vue sur l''équipe', '{"organisation": 3, "leadership": 2}'::jsonb, 4
FROM questions WHERE texte = 'Dans quel environnement préféreriez-vous travailler ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'N''importe où, tant que je suis indépendant', '{"entrepreneuriat": 3, "autonomie": 2}'::jsonb, 5
FROM questions WHERE texte = 'Dans quel environnement préféreriez-vous travailler ?';

-- Question 3: Quel sujet vous passionne le plus ?
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'L''art, le design, la créativité', '{"creatif": 3}'::jsonb, 1
FROM questions WHERE texte = 'Quel sujet vous passionne le plus ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Les sciences, la technologie, l''innovation', '{"technique": 3, "logique": 2}'::jsonb, 2
FROM questions WHERE texte = 'Quel sujet vous passionne le plus ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Les relations humaines, la psychologie', '{"social": 3, "empathie": 2}'::jsonb, 3
FROM questions WHERE texte = 'Quel sujet vous passionne le plus ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'La gestion, l''organisation, la stratégie', '{"organisation": 3, "leadership": 2}'::jsonb, 4
FROM questions WHERE texte = 'Quel sujet vous passionne le plus ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'L''entrepreneuriat, les affaires', '{"entrepreneuriat": 3}'::jsonb, 5
FROM questions WHERE texte = 'Quel sujet vous passionne le plus ?';

-- Question 4: Quelle est votre principale force ?
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Mon imagination et ma créativité', '{"creatif": 3}'::jsonb, 1
FROM questions WHERE texte = 'Quelle est votre principale force ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Ma logique et ma capacité d''analyse', '{"technique": 3, "logique": 3}'::jsonb, 2
FROM questions WHERE texte = 'Quelle est votre principale force ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Mon empathie et ma capacité d''écoute', '{"social": 3, "empathie": 3}'::jsonb, 3
FROM questions WHERE texte = 'Quelle est votre principale force ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Mon sens de l''organisation', '{"organisation": 3}'::jsonb, 4
FROM questions WHERE texte = 'Quelle est votre principale force ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Ma capacité à prendre des initiatives', '{"entrepreneuriat": 3, "leadership": 2}'::jsonb, 5
FROM questions WHERE texte = 'Quelle est votre principale force ?';

-- Question 5: Comment abordez-vous un nouveau projet ?
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Je laisse libre cours à ma créativité', '{"creatif": 3, "flexibilite": 2}'::jsonb, 1
FROM questions WHERE texte = 'Comment abordez-vous un nouveau projet ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Je l''analyse méthodiquement', '{"technique": 3, "logique": 2}'::jsonb, 2
FROM questions WHERE texte = 'Comment abordez-vous un nouveau projet ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Je consulte les personnes concernées', '{"social": 3, "communication": 2}'::jsonb, 3
FROM questions WHERE texte = 'Comment abordez-vous un nouveau projet ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Je planifie et organise les étapes', '{"organisation": 3}'::jsonb, 4
FROM questions WHERE texte = 'Comment abordez-vous un nouveau projet ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Je me lance directement avec enthousiasme', '{"entrepreneuriat": 3}'::jsonb, 5
FROM questions WHERE texte = 'Comment abordez-vous un nouveau projet ?';

-- Question 6: Quel type de problème aimez-vous résoudre ?
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Les défis créatifs et esthétiques', '{"creatif": 3}'::jsonb, 1
FROM questions WHERE texte = 'Quel type de problème aimez-vous résoudre ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Les problèmes techniques complexes', '{"technique": 3, "logique": 3}'::jsonb, 2
FROM questions WHERE texte = 'Quel type de problème aimez-vous résoudre ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Les problèmes relationnels et humains', '{"social": 3, "empathie": 2}'::jsonb, 3
FROM questions WHERE texte = 'Quel type de problème aimez-vous résoudre ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Les problèmes d''organisation et de gestion', '{"organisation": 3}'::jsonb, 4
FROM questions WHERE texte = 'Quel type de problème aimez-vous résoudre ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Les défis business et commerciaux', '{"entrepreneuriat": 3}'::jsonb, 5
FROM questions WHERE texte = 'Quel type de problème aimez-vous résoudre ?';

-- Question 7: Préférez-vous travailler :
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'En autonomie, sur mes projets', '{"creatif": 2, "autonomie": 3}'::jsonb, 1
FROM questions WHERE texte = 'Préférez-vous travailler :';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'En équipe technique', '{"technique": 2, "communication": 2}'::jsonb, 2
FROM questions WHERE texte = 'Préférez-vous travailler :';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'En contact direct avec les clients/utilisateurs', '{"social": 3, "communication": 3}'::jsonb, 3
FROM questions WHERE texte = 'Préférez-vous travailler :';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'En équipe avec un rôle de coordination', '{"organisation": 3, "leadership": 3}'::jsonb, 4
FROM questions WHERE texte = 'Préférez-vous travailler :';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Seul, en tant qu''indépendant', '{"entrepreneuriat": 3, "autonomie": 3}'::jsonb, 5
FROM questions WHERE texte = 'Préférez-vous travailler :';

-- Question 8: Quel type d'horaire vous convient le mieux ?
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Horaires flexibles, selon l''inspiration', '{"creatif": 2, "flexibilite": 3}'::jsonb, 1
FROM questions WHERE texte = 'Quel type d''horaire vous convient le mieux ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Horaires réguliers et structurés', '{"technique": 1, "organisation": 2}'::jsonb, 2
FROM questions WHERE texte = 'Quel type d''horaire vous convient le mieux ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Horaires adaptés aux besoins des autres', '{"social": 2, "empathie": 2}'::jsonb, 3
FROM questions WHERE texte = 'Quel type d''horaire vous convient le mieux ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Horaires variés selon les projets', '{"organisation": 2, "leadership": 1}'::jsonb, 4
FROM questions WHERE texte = 'Quel type d''horaire vous convient le mieux ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Horaires que je définis moi-même', '{"entrepreneuriat": 3, "autonomie": 3}'::jsonb, 5
FROM questions WHERE texte = 'Quel type d''horaire vous convient le mieux ?';

-- Question 9: Comment préférez-vous communiquer ?
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Par l''expression visuelle et créative', '{"creatif": 3}'::jsonb, 1
FROM questions WHERE texte = 'Comment préférez-vous communiquer ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Par des documents techniques précis', '{"technique": 2, "logique": 2}'::jsonb, 2
FROM questions WHERE texte = 'Comment préférez-vous communiquer ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Par des conversations en face à face', '{"social": 3, "communication": 3}'::jsonb, 3
FROM questions WHERE texte = 'Comment préférez-vous communiquer ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Par des réunions et présentations structurées', '{"organisation": 2, "leadership": 2}'::jsonb, 4
FROM questions WHERE texte = 'Comment préférez-vous communiquer ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Par des réseaux et partenariats', '{"entrepreneuriat": 2, "communication": 2}'::jsonb, 5
FROM questions WHERE texte = 'Comment préférez-vous communiquer ?';

-- Question 10: Quel est votre objectif professionnel principal ?
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Exprimer ma créativité et créer des œuvres', '{"creatif": 3}'::jsonb, 1
FROM questions WHERE texte = 'Quel est votre objectif professionnel principal ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Maîtriser des compétences techniques pointues', '{"technique": 3}'::jsonb, 2
FROM questions WHERE texte = 'Quel est votre objectif professionnel principal ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Aider et avoir un impact positif sur les autres', '{"social": 3, "empathie": 2}'::jsonb, 3
FROM questions WHERE texte = 'Quel est votre objectif professionnel principal ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Gérer et diriger une équipe ou un projet', '{"organisation": 3, "leadership": 3}'::jsonb, 4
FROM questions WHERE texte = 'Quel est votre objectif professionnel principal ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Créer ma propre entreprise et être indépendant', '{"entrepreneuriat": 3, "leadership": 2}'::jsonb, 5
FROM questions WHERE texte = 'Quel est votre objectif professionnel principal ?';

-- Question 11: Qu'est-ce qui vous motive le plus dans une carrière ?
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'La liberté créative et l''innovation', '{"creatif": 3, "flexibilite": 2}'::jsonb, 1
FROM questions WHERE texte = 'Qu''est-ce qui vous motive le plus dans une carrière ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'La résolution de problèmes complexes', '{"technique": 3, "logique": 2}'::jsonb, 2
FROM questions WHERE texte = 'Qu''est-ce qui vous motive le plus dans une carrière ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Le contact humain et l''aide aux autres', '{"social": 3, "empathie": 3}'::jsonb, 3
FROM questions WHERE texte = 'Qu''est-ce qui vous motive le plus dans une carrière ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'La progression et la responsabilité', '{"organisation": 3, "leadership": 2}'::jsonb, 4
FROM questions WHERE texte = 'Qu''est-ce qui vous motive le plus dans une carrière ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'L''indépendance et la réussite financière', '{"entrepreneuriat": 3}'::jsonb, 5
FROM questions WHERE texte = 'Qu''est-ce qui vous motive le plus dans une carrière ?';

-- Question 12: Comment envisagez-vous votre évolution professionnelle ?
INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Développer mon portfolio créatif', '{"creatif": 3}'::jsonb, 1
FROM questions WHERE texte = 'Comment envisagez-vous votre évolution professionnelle ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Devenir expert dans mon domaine technique', '{"technique": 3}'::jsonb, 2
FROM questions WHERE texte = 'Comment envisagez-vous votre évolution professionnelle ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Évoluer vers des rôles de conseil et d''accompagnement', '{"social": 3, "communication": 2}'::jsonb, 3
FROM questions WHERE texte = 'Comment envisagez-vous votre évolution professionnelle ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Accéder à des postes de management', '{"organisation": 3, "leadership": 3}'::jsonb, 4
FROM questions WHERE texte = 'Comment envisagez-vous votre évolution professionnelle ?';

INSERT INTO options (question_id, texte, score, ordre)
SELECT id, 'Créer et développer ma propre entreprise', '{"entrepreneuriat": 3, "leadership": 2}'::jsonb, 5
FROM questions WHERE texte = 'Comment envisagez-vous votre évolution professionnelle ?';

-- ============================================
-- 4. MÉTIERS RECOMMANDÉS (25 métiers)
-- ============================================

-- Métiers pour le Profil Créatif (5 métiers)
INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Graphiste', 'Création visuelle pour la communication, le marketing et les médias. Vous travaillez sur des projets variés allant de l''identité visuelle aux supports marketing.', id, 'Bac+2 à Bac+5', ARRAY['Créativité', 'Maîtrise des logiciels graphiques', 'Sens esthétique', 'Communication visuelle'], ARRAY['BTS Design Graphique', 'École d''art', 'Formation en ligne (Adobe Creative Suite)', 'Licence Arts Appliqués']
FROM profiles WHERE nom = 'Profil Créatif';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Développeur Frontend', 'Création d''interfaces utilisateur interactives et esthétiques. Vous combinez créativité et technique pour créer des expériences utilisateur exceptionnelles.', id, 'Bac+2 à Bac+5', ARRAY['HTML/CSS/JavaScript', 'Frameworks React/Vue', 'Design UI/UX', 'Créativité'], ARRAY['Bootcamp développement web', 'Formation en ligne (FreeCodeCamp, Udemy)', 'École d''ingénieur', 'Autoformation']
FROM profiles WHERE nom = 'Profil Créatif';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Architecte d''intérieur', 'Conception et aménagement d''espaces intérieurs fonctionnels et esthétiques. Vous créez des environnements qui allient beauté et praticité.', id, 'Bac+3 à Bac+5', ARRAY['Créativité', 'Sens spatial', 'Maîtrise des logiciels 3D', 'Communication'], ARRAY['École d''architecture', 'BTS Design d''espace', 'Formation continue', 'Master Design']
FROM profiles WHERE nom = 'Profil Créatif';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Photographe', 'Création d''images artistiques ou commerciales. Vous capturez des moments et des émotions à travers l''objectif.', id, 'Variable', ARRAY['Technique photographique', 'Sens artistique', 'Post-production', 'Communication'], ARRAY['École de photographie', 'Formation professionnelle', 'Autoformation', 'Workshops']
FROM profiles WHERE nom = 'Profil Créatif';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Concepteur-rédacteur', 'Création de contenus créatifs pour la publicité et la communication. Vous imaginez des campagnes qui marquent les esprits.', id, 'Bac+3 à Bac+5', ARRAY['Créativité', 'Rédaction', 'Marketing', 'Communication'], ARRAY['École de communication', 'Formation en publicité', 'Master Marketing', 'Formation continue']
FROM profiles WHERE nom = 'Profil Créatif';

-- Métiers pour le Profil Technique (5 métiers)
INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Ingénieur Logiciel', 'Conception et développement de systèmes informatiques complexes. Vous créez des solutions technologiques innovantes.', id, 'Bac+5', ARRAY['Programmation', 'Architecture logicielle', 'Algorithmes', 'Résolution de problèmes'], ARRAY['École d''ingénieur', 'Master Informatique', 'Formation continue', 'Certifications professionnelles']
FROM profiles WHERE nom = 'Profil Technique';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Data Analyst', 'Analyse de données pour aider à la prise de décision. Vous transformez les données en insights actionnables.', id, 'Bac+3 à Bac+5', ARRAY['Statistiques', 'SQL', 'Python/R', 'Visualisation de données'], ARRAY['Licence/Master Mathématiques/Statistiques', 'Formation Data Science en ligne', 'Certification Google Data Analytics', 'Bootcamp Data']
FROM profiles WHERE nom = 'Profil Technique';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Ingénieur Système', 'Administration et optimisation des infrastructures informatiques. Vous garantissez la performance et la sécurité des systèmes.', id, 'Bac+5', ARRAY['Réseaux', 'Sécurité', 'Linux/Windows', 'Virtualisation'], ARRAY['École d''ingénieur', 'Master Informatique', 'Certifications (Cisco, Microsoft)', 'Formation continue']
FROM profiles WHERE nom = 'Profil Technique';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Développeur Backend', 'Développement de la logique serveur et des API. Vous créez les fondations robustes des applications.', id, 'Bac+2 à Bac+5', ARRAY['Programmation', 'Bases de données', 'API', 'Architecture'], ARRAY['Formation en développement', 'École d''ingénieur', 'Bootcamp', 'Autoformation']
FROM profiles WHERE nom = 'Profil Technique';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Cybersécurité', 'Protection des systèmes et données contre les cybermenaces. Vous êtes le gardien de la sécurité numérique.', id, 'Bac+3 à Bac+5', ARRAY['Sécurité réseau', 'Ethical hacking', 'Analyse de risques', 'Conformité'], ARRAY['Master Cybersécurité', 'Certifications (CEH, CISSP)', 'Formation continue', 'École spécialisée']
FROM profiles WHERE nom = 'Profil Technique';

-- Métiers pour le Profil Social (5 métiers)
INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Psychologue', 'Accompagnement et soutien des personnes en difficulté. Vous aidez les autres à mieux se comprendre et à surmonter leurs défis.', id, 'Bac+5', ARRAY['Écoute active', 'Empathie', 'Analyse psychologique', 'Communication'], ARRAY['Master Psychologie', 'Formation continue', 'Spécialisation (clinique, sociale, etc.)', 'Doctorat']
FROM profiles WHERE nom = 'Profil Social';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Éducateur Spécialisé', 'Accompagnement de personnes en difficulté sociale ou familiale. Vous contribuez à leur insertion et leur épanouissement.', id, 'Bac+3', ARRAY['Patience', 'Communication', 'Empathie', 'Gestion de conflits'], ARRAY['DEES (Diplôme d''État)', 'Formation continue', 'Stages pratiques', 'Formation professionnelle']
FROM profiles WHERE nom = 'Profil Social';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Conseiller d''orientation', 'Accompagnement des jeunes dans leur choix d''orientation scolaire et professionnelle. Vous les aidez à découvrir leur voie.', id, 'Bac+3 à Bac+5', ARRAY['Écoute', 'Connaissance des métiers', 'Communication', 'Empathie'], ARRAY['Master Psychologie', 'Formation spécialisée orientation', 'Certification', 'Formation continue']
FROM profiles WHERE nom = 'Profil Social';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Infirmier', 'Soins et accompagnement des patients. Vous apportez réconfort et soins de qualité aux personnes malades.', id, 'Bac+3', ARRAY['Soins médicaux', 'Empathie', 'Résistance au stress', 'Communication'], ARRAY['IFSI (Institut de Formation)', 'Formation continue', 'Spécialisations', 'Formation professionnelle']
FROM profiles WHERE nom = 'Profil Social';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Assistant Social', 'Accompagnement social et aide aux personnes en difficulté. Vous les guidez dans leurs démarches administratives et sociales.', id, 'Bac+3', ARRAY['Écoute', 'Connaissance du droit social', 'Empathie', 'Communication'], ARRAY['DEASS (Diplôme d''État)', 'Formation continue', 'Stages pratiques', 'Formation professionnelle']
FROM profiles WHERE nom = 'Profil Social';

-- Métiers pour le Profil Organisationnel (5 métiers)
INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Chef de Projet', 'Gestion et coordination de projets dans différents secteurs. Vous pilotez les projets de A à Z avec méthode et efficacité.', id, 'Bac+3 à Bac+5', ARRAY['Organisation', 'Leadership', 'Gestion budgétaire', 'Communication'], ARRAY['Master Management', 'Certification PMP', 'Formation en gestion de projet', 'MBA']
FROM profiles WHERE nom = 'Profil Organisationnel';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Responsable RH', 'Gestion des ressources humaines et développement des talents. Vous êtes le lien entre l''entreprise et ses collaborateurs.', id, 'Bac+5', ARRAY['Communication', 'Gestion', 'Psychologie', 'Droit du travail'], ARRAY['Master RH', 'Formation continue', 'Certification professionnelle', 'MBA']
FROM profiles WHERE nom = 'Profil Organisationnel';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Contrôleur de Gestion', 'Analyse financière et pilotage de la performance. Vous aidez l''entreprise à prendre les bonnes décisions stratégiques.', id, 'Bac+5', ARRAY['Analyse financière', 'Excel', 'Stratégie', 'Communication'], ARRAY['Master Finance/Contrôle', 'École de commerce', 'Formation continue', 'Certifications']
FROM profiles WHERE nom = 'Profil Organisationnel';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Directeur d''établissement', 'Gestion et direction d''un établissement (école, hôpital, etc.). Vous coordonnez les équipes et garantissez la qualité du service.', id, 'Bac+5', ARRAY['Leadership', 'Gestion', 'Stratégie', 'Communication'], ARRAY['Master Management', 'Formation continue', 'Certifications', 'Expérience professionnelle']
FROM profiles WHERE nom = 'Profil Organisationnel';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Responsable Qualité', 'Garantir la qualité des produits et processus. Vous assurez que les standards sont respectés et améliorés en continu.', id, 'Bac+3 à Bac+5', ARRAY['Analyse', 'Organisation', 'Normes qualité', 'Communication'], ARRAY['Formation qualité', 'Certifications (ISO, etc.)', 'Formation continue', 'Master Management']
FROM profiles WHERE nom = 'Profil Organisationnel';

-- Métiers pour le Profil Entrepreneurial (5 métiers)
INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Entrepreneur / Créateur d''entreprise', 'Création et développement de votre propre entreprise. Vous transformez vos idées en réalité et créez votre propre emploi.', id, 'Variable', ARRAY['Vision', 'Prise de risque', 'Leadership', 'Résilience'], ARRAY['Formation entrepreneuriat', 'Incubateurs', 'Accompagnement (réseaux, mentors)', 'MBA']
FROM profiles WHERE nom = 'Profil Entrepreneurial';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Consultant Indépendant', 'Expertise et conseil en freelance dans votre domaine. Vous mettez vos compétences au service de plusieurs clients.', id, 'Bac+3 minimum', ARRAY['Expertise technique', 'Autonomie', 'Communication', 'Réseau professionnel'], ARRAY['Formation continue', 'Certifications professionnelles', 'Développement réseau', 'Autoformation']
FROM profiles WHERE nom = 'Profil Entrepreneurial';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Business Developer', 'Développement commercial et partenariats. Vous créez des opportunités business et développez le chiffre d''affaires.', id, 'Bac+3 à Bac+5', ARRAY['Négociation', 'Communication', 'Réseau', 'Stratégie commerciale'], ARRAY['École de commerce', 'Formation commerciale', 'Formation continue', 'MBA']
FROM profiles WHERE nom = 'Profil Entrepreneurial';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Créateur de contenu', 'Création de contenu pour les réseaux sociaux et les plateformes digitales. Vous monétisez votre créativité et votre audience.', id, 'Variable', ARRAY['Créativité', 'Communication', 'Marketing digital', 'Autonomie'], ARRAY['Autoformation', 'Formation en ligne', 'Workshops', 'Expérience pratique']
FROM profiles WHERE nom = 'Profil Entrepreneurial';

INSERT INTO jobs (nom, description, profil_id, niveau_etudes, competences, formations)
SELECT 'Investisseur / Business Angel', 'Investissement dans des startups et accompagnement d''entrepreneurs. Vous financez et conseillez les projets prometteurs.', id, 'Variable', ARRAY['Analyse financière', 'Vision stratégique', 'Réseau', 'Prise de risque'], ARRAY['Formation en finance', 'Réseaux d''investisseurs', 'Expérience entrepreneuriale', 'MBA']
FROM profiles WHERE nom = 'Profil Entrepreneurial';

-- ============================================
-- FIN DU SCRIPT
-- ============================================
-- Vérifiez que vous avez bien :
-- - 5 profils
-- - 12 questions
-- - 60 options (5 par question)
-- - 25 métiers (5 par profil)
-- ============================================

