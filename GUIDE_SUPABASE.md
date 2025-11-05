# 🎯 Guide Complet : Créer les Tables dans Supabase

## 📋 Étape 1 : Accéder à Supabase SQL Editor

1. **Ouvrez votre navigateur** et allez sur [app.supabase.com](https://app.supabase.com)
2. **Connectez-vous** avec votre compte
3. **Sélectionnez votre projet** (celui avec l'URL dans votre `.env.local`)
4. Dans le menu de gauche, cliquez sur **"SQL Editor"** (icône avec `</>`)
5. Vous verrez une interface avec un éditeur de code SQL

---

## 🗄️ Étape 2 : Créer les Tables (Schéma)

### Instructions :

1. Dans l'éditeur SQL, cliquez sur **"New query"** (ou utilisez le bouton +)
2. **Copiez TOUT le contenu** du fichier `database/schema.sql` (depuis votre projet local)
3. **Collez-le** dans l'éditeur SQL de Supabase
4. Cliquez sur le bouton **"Run"** (ou appuyez sur `Ctrl+Enter` / `Cmd+Enter`)
5. **Attendez quelques secondes** - vous devriez voir un message de succès en bas

### ✅ Vérification :

Après avoir exécuté le script, vous devriez voir :
- ✅ Message "Success. No rows returned"
- Aucune erreur rouge

### 🔍 Si vous voyez une erreur :

- **"relation already exists"** → C'est normal si vous avez déjà exécuté le script, ignorez
- **Erreur de syntaxe** → Vérifiez que vous avez copié TOUT le contenu du fichier

---

## 📊 Étape 3 : Vérifier que les Tables sont Créées

1. Dans le menu de gauche, cliquez sur **"Table Editor"** (icône avec une table)
2. Vous devriez voir **5 tables** :
   - ✅ `questions`
   - ✅ `options`
   - ✅ `profiles`
   - ✅ `jobs`
   - ✅ `quiz_attempts`

Si vous ne voyez pas toutes les tables, retournez à l'Étape 2.

---

## 📝 Étape 4 : Ajouter les Données Initiales

### Partie A : Profils (5 profils)

1. Dans **SQL Editor**, créez une **nouvelle requête** (New query)
2. **Copiez-collez** ce code :

```sql
-- Insérer les profils professionnels
INSERT INTO profiles (nom, description, criteres, couleur, icone) VALUES
('Profil Créatif', 'Vous êtes attiré par l''innovation, l''art et la création. Vous aimez exprimer vos idées et travailler sur des projets originaux.', '{"creatif": 15, "communication": 10, "flexibilite": 8}', '#8B5CF6', '🎨'),
('Profil Technique', 'Vous excellez dans la résolution de problèmes complexes, la logique et les technologies. Vous êtes méthodique et précis.', '{"technique": 15, "logique": 12, "precision": 10}', '#06B6D4', '💻'),
('Profil Social', 'Vous avez un fort intérêt pour aider les autres, communiquer et travailler en équipe. Vous êtes empathique et à l''écoute.', '{"social": 15, "communication": 12, "empathie": 10}', '#10B981', '🤝'),
('Profil Organisationnel', 'Vous êtes organisé, aimez gérer des projets et diriger des équipes. Vous avez le sens des responsabilités.', '{"organisation": 15, "leadership": 12, "gestion": 10}', '#F59E0B', '📊'),
('Profil Entrepreneurial', 'Vous êtes indépendant, aimez prendre des risques calculés et créer votre propre voie. Vous êtes visionnaire.', '{"entrepreneuriat": 15, "leadership": 10, "creatif": 8}', '#EF4444', '🚀');
```

3. Cliquez sur **"Run"**
4. Vous devriez voir : ✅ "Success. 5 rows inserted"

---

### Partie B : Questions (12 questions)

1. Créez une **nouvelle requête**
2. **Copiez-collez** ce code :

```sql
-- Insérer les questions
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
```

3. Cliquez sur **"Run"**
4. Vous devriez voir : ✅ "Success. 12 rows inserted"

---

### Partie C : Options de Réponse (Partie 1 - Questions 1-3)

⚠️ **IMPORTANT** : Les options doivent être liées aux questions par leur UUID. 
Nous allons utiliser une méthode qui fonctionne avec les IDs automatiques.

1. Créez une **nouvelle requête**
2. **Copiez-collez** ce code (qui insère les options pour les 3 premières questions) :

```sql
-- Options pour Question 1: Quel type d'activité vous attire le plus ?
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
```

3. Cliquez sur **"Run"**
4. Vous devriez voir : ✅ "Success. 5 rows inserted"

---

### Partie D : Options pour les Autres Questions

⚠️ **NOTE** : Le fichier `database/seed_data.sql` complet contient toutes les options. 
Pour gagner du temps, je vais créer un script SQL complet que vous pouvez exécuter en une fois.

---

## 🚀 Option Rapide : Script Complet

Au lieu d'exécuter chaque partie séparément, vous pouvez utiliser le fichier `database/seed_data_complete.sql` que je vais créer, qui contient TOUT en une fois.

---

## ✅ Étape 5 : Vérifier les Données

1. Allez dans **"Table Editor"**
2. Cliquez sur chaque table pour vérifier :
   - **profiles** : 5 lignes
   - **questions** : 12 lignes
   - **options** : 60 lignes (5 par question)
   - **jobs** : 25 lignes (5 par profil)

---

## 🧪 Étape 6 : Tester la Connexion

1. Retournez dans votre projet local
2. Redémarrez le serveur de développement :
   ```bash
   npm run dev
   ```
3. Ouvrez votre application dans le navigateur
4. Ouvrez la console (F12) et regardez les messages
5. Si vous voyez "Utilisation des données mock", c'est que Supabase n'est pas encore configuré
6. Si les données sont chargées depuis Supabase, vous verrez les requêtes dans la console

---

## ❓ Problèmes Courants

### "relation does not exist"
→ Les tables n'ont pas été créées. Ré-exécutez `schema.sql`

### "permission denied"
→ Les politiques RLS ne sont pas correctes. Vérifiez que les politiques ont été créées dans `schema.sql`

### Les données ne s'affichent pas
→ Vérifiez que :
1. Les tables contiennent des données (Table Editor)
2. Le fichier `.env.local` est correct
3. Le serveur a été redémarré après modification de `.env.local`

---

## 📞 Besoin d'aide ?

Si vous rencontrez un problème, copiez le message d'erreur exact et je vous aiderai à le résoudre !

