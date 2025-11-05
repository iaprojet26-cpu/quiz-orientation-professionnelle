# Guide de Configuration Supabase

## ✅ Étape 1 : Vérifier votre projet Supabase

1. Allez sur [app.supabase.com](https://app.supabase.com)
2. Ouvrez votre projet
3. Vérifiez que vous avez les informations dans `.env.local` :
   - `VITE_SUPABASE_URL` ✅
   - `VITE_SUPABASE_ANON_KEY` ✅

## 📊 Étape 2 : Créer les tables dans Supabase

1. Dans votre projet Supabase, allez dans **SQL Editor** (menu de gauche)
2. Cliquez sur **New Query**
3. Copiez-collez **TOUT** le contenu du fichier `database/schema.sql`
4. Cliquez sur **Run** (ou Ctrl+Enter)
5. Vérifiez qu'il n'y a pas d'erreurs
6. Allez dans **Table Editor** pour vérifier que les tables sont créées :
   - ✅ `questions`
   - ✅ `options`
   - ✅ `profiles`
   - ✅ `jobs`
   - ✅ `quiz_attempts`

## 📝 Étape 3 : Ajouter les données initiales

1. Toujours dans **SQL Editor**, créez une nouvelle requête
2. Copiez-collez **TOUT** le contenu du fichier `database/seed_data.sql`
3. Cliquez sur **Run**
4. Vérifiez qu'il n'y a pas d'erreurs
5. Vérifiez dans **Table Editor** que les données sont présentes :
   - ✅ Des questions dans `questions`
   - ✅ Des options dans `options`
   - ✅ Des profils dans `profiles`
   - ✅ Des métiers dans `jobs`

## 🔒 Étape 4 : Vérifier les politiques RLS (Row Level Security)

Les politiques sont déjà définies dans `schema.sql`, mais vérifiez :

1. Allez dans **Authentication** > **Policies**
2. Vérifiez que les tables ont les bonnes politiques :
   - `questions` : Lecture publique ✅
   - `options` : Lecture publique ✅
   - `profiles` : Lecture publique ✅
   - `jobs` : Lecture publique ✅
   - `quiz_attempts` : Insertion publique ✅

## 🧪 Étape 5 : Tester la connexion

1. Redémarrez votre serveur de développement :
   ```bash
   npm run dev
   ```
2. Ouvrez la console du navigateur (F12)
3. Testez le quiz
4. Si Supabase est bien configuré, vous verrez les données chargées depuis Supabase
5. Si Supabase n'est pas configuré, l'application utilisera automatiquement les données mock

## ⚠️ Dépannage

### Erreur : "relation does not exist"
→ Les tables n'ont pas été créées. Ré-exécutez `schema.sql`

### Erreur : "permission denied"
→ Les politiques RLS ne sont pas correctes. Vérifiez les politiques dans Supabase

### L'application utilise toujours les données mock
→ Vérifiez :
1. Que `.env.local` contient les bonnes valeurs
2. Que le serveur a été redémarré après modification de `.env.local`
3. Que les tables existent et contiennent des données

## 📞 Support

Si vous rencontrez des problèmes, vérifiez :
- Les logs dans la console du navigateur (F12)
- Les logs dans le terminal où tourne `npm run dev`
- Les logs dans Supabase Dashboard > Logs

