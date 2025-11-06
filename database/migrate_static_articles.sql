-- ============================================
-- MIGRATION : Articles Statiques vers Supabase
-- ============================================
-- Ce script migre les articles statiques existants vers la table blog_articles
-- Exécutez ce script dans Supabase SQL Editor après avoir créé la table blog_articles

-- Article 1 : Comment Choisir Sa Voie Professionnelle
INSERT INTO blog_articles (
  slug,
  title_fr, title_en, title_ar,
  description_fr, description_en, description_ar,
  content_fr, content_en, content_ar,
  image,
  keywords_fr, keywords_en, keywords_ar,
  category,
  published,
  published_at
) VALUES (
  'comment-choisir-sa-voie-professionnelle',
  'Comment Choisir Sa Voie Professionnelle : Guide Complet 2025',
  'How to Choose Your Career Path: Complete Guide 2025',
  'كيف تختار مسارك المهني: دليل شامل 2025',
  'Découvrez comment choisir votre voie professionnelle avec notre guide complet. Tests d''orientation, conseils pratiques et étapes clés pour trouver le métier qui vous correspond.',
  'Discover how to choose your career path with our complete guide. Orientation tests, practical advice and key steps to find the career that suits you.',
  'اكتشف كيفية اختيار مسارك المهني مع دليلنا الشامل. اختبارات التوجيه، النصائح العملية والخطوات الرئيسية للعثور على المهنة التي تناسبك.',
  '# Comment Choisir Sa Voie Professionnelle : Guide Complet 2025

Choisir sa voie professionnelle est l''une des décisions les plus importantes de la vie. Que vous soyez étudiant, en reconversion ou en quête de sens, ce guide vous accompagne étape par étape.

## Pourquoi Cette Décision Est-Elle Si Importante ?

Votre choix de carrière influence directement votre qualité de vie, votre épanouissement personnel et votre bien-être financier. Une bonne orientation professionnelle vous permet de :

- Trouver un métier qui correspond à vos valeurs et intérêts
- Développer vos compétences naturelles
- Atteindre vos objectifs personnels et professionnels
- Maintenir un équilibre entre vie professionnelle et personnelle

## Les 5 Étapes Clés pour Choisir Votre Voie

### 1. Connaître Vos Forces et Faiblesses

Commencez par faire un bilan de vos compétences, intérêts et valeurs. Posez-vous les questions suivantes :

- Quelles sont mes compétences naturelles ?
- Qu''est-ce qui me passionne vraiment ?
- Quelles sont mes valeurs fondamentales ?
- Dans quel environnement de travail je me sens le mieux ?

### 2. Explorer Différents Secteurs

Ne vous limitez pas aux métiers que vous connaissez déjà. Explorez :

- Les secteurs en croissance (numérique, environnement, santé)
- Les métiers émergents
- Les professions traditionnelles qui évoluent
- Les opportunités à l''international

### 3. Tester Votre Profil Professionnel

Utilisez des outils d''orientation comme notre **quiz d''orientation professionnelle** pour identifier votre profil :

- **Profil Créatif** : Innovation, art, design
- **Profil Technique** : Logique, technologie, résolution de problèmes
- **Profil Social** : Communication, aide aux autres, travail d''équipe
- **Profil Organisationnel** : Gestion, leadership, planification
- **Profil Entrepreneurial** : Autonomie, prise de risque, vision

### 4. Rechercher des Informations Concrètes

Une fois que vous avez identifié des pistes, approfondissez :

- Niveau d''études requis
- Compétences nécessaires
- Formations disponibles
- Débouchés et salaires
- Perspectives d''évolution

### 5. Prendre une Décision Éclairée

Après avoir exploré toutes les options, prenez une décision basée sur :

- Vos intérêts personnels
- Vos compétences
- Les opportunités du marché
- Vos contraintes personnelles

## Les Outils à Votre Disposition

### Tests d''Orientation Professionnelle

Notre quiz d''orientation vous aide à identifier votre profil professionnel en 10 minutes. Les résultats incluent :

- Votre profil professionnel personnalisé
- 5 métiers recommandés
- Descriptions détaillées
- Compétences clés nécessaires
- Formations possibles

### Conseils d''Orientation

N''hésitez pas à consulter :

- Des conseillers d''orientation
- Des professionnels du secteur qui vous intéresse
- Des forums et communautés en ligne
- Des salons professionnels

## Conclusion

Choisir sa voie professionnelle est un processus qui demande du temps et de la réflexion. En suivant ces étapes et en utilisant les outils disponibles, vous pouvez prendre une décision éclairée qui correspond à votre personnalité et vos aspirations.

**Prêt à découvrir votre profil professionnel ?** [Faites notre quiz d''orientation gratuit](/)',
  '', -- content_en (à remplir plus tard)
  '', -- content_ar (à remplir plus tard)
  '/assets/blog/choisir-metier.webp',
  ARRAY['choisir voie professionnelle', 'orientation professionnelle', 'test métier', 'reconversion professionnelle', 'choix carrière'],
  ARRAY['choose career path', 'career orientation', 'career test'],
  ARRAY['اختيار المسار المهني', 'التوجيه المهني', 'اختبار المهنة'],
  'orientation',
  true,
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Article 2 : 5 Profils Professionnels
INSERT INTO blog_articles (
  slug,
  title_fr, title_en, title_ar,
  description_fr, description_en, description_ar,
  content_fr,
  image,
  keywords_fr, keywords_en, keywords_ar,
  category,
  published,
  published_at
) VALUES (
  '5-profils-professionnels-qui-vous-correspondent',
  '5 Profils Professionnels Qui Vous Correspondent : Lequel Êtes-Vous ?',
  '5 Professional Profiles That Match You: Which One Are You?',
  '5 ملفات مهنية تناسبك: أيهم أنت؟',
  'Découvrez les 5 profils professionnels : Créatif, Technique, Social, Organisationnel et Entrepreneurial. Identifiez votre profil et les métiers associés.',
  'Discover the 5 professional profiles: Creative, Technical, Social, Organizational and Entrepreneurial. Identify your profile and associated careers.',
  'اكتشف الملفات المهنية الخمسة: الإبداعي، التقني، الاجتماعي، التنظيمي والريادي. حدد ملفك والمهن المرتبطة به.',
  '# 5 Profils Professionnels Qui Vous Correspondent : Lequel Êtes-Vous ?

Chaque personne possède un profil professionnel unique qui influence ses choix de carrière. Dans cet article, nous détaillons les 5 profils principaux.

## 1. Le Profil Créatif 🎨

Attiré par l''innovation, l''art et la création. Vous aimez exprimer vos idées et travailler sur des projets originaux.

**Métiers associés :**
- Designer graphique
- Architecte
- Photographe
- Rédacteur créatif
- Artiste

## 2. Le Profil Technique 🔧

Expert en résolution de problèmes complexes, la logique et les technologies. Vous êtes méthodique et précis.

**Métiers associés :**
- Développeur web
- Ingénieur
- Analyste de données
- Technicien informatique
- Mathématicien

## 3. Le Profil Social 👥

Fort intérêt pour aider les autres, communiquer et travailler en équipe. Vous êtes empathique et à l''écoute.

**Métiers associés :**
- Enseignant
- Psychologue
- Médecin
- Assistant social
- Coach

## 4. Le Profil Organisationnel 📊

Organisé, aimez gérer des projets et diriger des équipes. Vous avez le sens des responsabilités.

**Métiers associés :**
- Manager
- Chef de projet
- Responsable RH
- Comptable
- Consultant

## 5. Le Profil Entrepreneurial 🚀

Indépendant, aimez prendre des risques calculés et créer votre propre voie. Vous êtes visionnaire.

**Métiers associés :**
- Entrepreneur
- Consultant indépendant
- Investisseur
- Business Developer
- Créateur de startup

## Comment Identifier Votre Profil ?

Faites notre [quiz d''orientation professionnelle](/) pour découvrir votre profil en 10 minutes !',
  '/assets/blog/profils-professionnels.webp',
  ARRAY['profil professionnel', 'profil créatif', 'profil technique', 'test personnalité professionnelle', 'métiers par profil'],
  ARRAY['professional profile', 'creative profile', 'technical profile', 'personality career test'],
  ARRAY['الملف المهني', 'الملف الإبداعي', 'الملف التقني'],
  'profils',
  true,
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Article 3 : Métiers d'Avenir
INSERT INTO blog_articles (
  slug,
  title_fr, title_en, title_ar,
  description_fr, description_en, description_ar,
  content_fr,
  image,
  keywords_fr, keywords_en, keywords_ar,
  category,
  published,
  published_at
) VALUES (
  'metiers-davenir-2025-2030',
  'Les Métiers d''Avenir 2025-2030 : Secteurs Porteurs et Opportunités',
  'Future Jobs 2025-2030: Growing Sectors and Opportunities',
  'مهن المستقبل 2025-2030: القطاعات النامية والفرص',
  'Découvrez les métiers d''avenir pour 2025-2030. Secteurs en croissance, compétences recherchées et formations pour se préparer aux emplois de demain.',
  'Discover future jobs for 2025-2030. Growing sectors, sought-after skills and training to prepare for tomorrow''s jobs.',
  'اكتشف مهن المستقبل لعام 2025-2030. القطاعات النامية، المهارات المطلوبة والتدريب للاستعداد لوظائف الغد.',
  '# Les Métiers d''Avenir 2025-2030 : Secteurs Porteurs et Opportunités

Le marché du travail évolue rapidement avec les nouvelles technologies et les changements sociétaux. Découvrez les métiers d''avenir pour les années 2025-2030.

## Secteurs en Croissance

### 1. Numérique et Technologie 💻

- Développeur full-stack
- Expert en cybersécurité
- Data Scientist
- Spécialiste IA/ML
- Développeur mobile

### 2. Environnement et Développement Durable 🌱

- Ingénieur en énergies renouvelables
- Consultant en RSE
- Spécialiste en gestion des déchets
- Expert en biodiversité
- Urbaniste durable

### 3. Santé et Bien-être 🏥

- Infirmier spécialisé
- Ergothérapeute
- Nutritionniste
- Coach sportif
- Télémédecin

### 4. Services à la Personne 👨‍👩‍👧

- Aide à domicile
- Assistant de vie
- Éducateur spécialisé
- Animateur social
- Conseiller en insertion

## Compétences Recherchées

- Maîtrise du numérique
- Capacité d''adaptation
- Communication
- Créativité
- Résolution de problèmes
- Travail en équipe

## Comment Se Préparer ?

1. **Formation continue** : Restez à jour avec les nouvelles technologies
2. **Développez vos soft skills** : Communication, créativité, adaptabilité
3. **Réseau professionnel** : Participez à des événements et rencontres
4. **Expérience pratique** : Stages, projets personnels, bénévolat

**Prêt à découvrir votre profil professionnel ?** [Faites notre quiz d''orientation](/)',
  '/assets/blog/metiers-avenir.webp',
  ARRAY['métiers d''avenir', 'emplois 2025', 'secteurs porteurs', 'métiers en croissance', 'carrières prometteuses'],
  ARRAY['future jobs', 'jobs 2025', 'growing sectors'],
  ARRAY['مهن المستقبل', 'وظائف 2025', 'القطاعات النامية'],
  'metiers',
  true,
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

