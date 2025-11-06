# 📦 Guide : Migration des Articles vers Supabase

## ✅ Problème Résolu

Si vous ne voyez pas les articles dans l'admin, c'est que la table `blog_articles` n'existe pas encore ou est vide dans Supabase.

---

## 🚀 Solution : Migrer les Articles

### Étape 1 : Créer la Table

1. Allez sur [app.supabase.com](https://app.supabase.com)
2. Ouvrez votre projet
3. Allez dans **SQL Editor** (menu de gauche)
4. Cliquez sur **New Query**
5. **Copiez-collez** le contenu de `database/blog_articles_schema.sql`
6. Cliquez sur **Run** (ou Ctrl+Enter)
7. ✅ Vérifiez qu'il n'y a pas d'erreurs

### Étape 2 : Ajouter les Articles Existants

1. Toujours dans **SQL Editor**, créez une nouvelle requête
2. **Copiez-collez** le contenu de `database/migrate_static_articles.sql`
3. Cliquez sur **Run**
4. ✅ Vérifiez qu'il n'y a pas d'erreurs

### Étape 3 : Vérifier

1. Allez dans **Table Editor** (menu de gauche)
2. Sélectionnez la table **blog_articles**
3. ✅ Vous devriez voir 3 articles :
   - Comment Choisir Sa Voie Professionnelle
   - 5 Profils Professionnels Qui Vous Correspondent
   - Les Métiers d'Avenir 2025-2030

### Étape 4 : Recharger l'Admin

1. Retournez sur `http://localhost:3000/admin`
2. Rechargez la page (F5)
3. ✅ Vous devriez maintenant voir les 3 articles dans la liste

---

## 📋 Fichiers SQL à Exécuter

1. **`database/blog_articles_schema.sql`** → Crée la table
2. **`database/migrate_static_articles.sql`** → Ajoute les articles existants

**Ordre d'exécution :**
1. D'abord le schéma (création de la table)
2. Ensuite la migration (ajout des articles)

---

## 🔍 Vérification

### Dans Supabase

1. **Table Editor** > **blog_articles**
2. Vous devriez voir :
   - 3 lignes (articles)
   - Colonnes : id, slug, title_fr, description_fr, content_fr, etc.
   - Statut `published = true` pour tous

### Dans l'Admin

1. Allez sur `/admin`
2. Vous devriez voir :
   - Liste avec 3 articles
   - Statut "✅ Publié" pour chacun
   - Actions : Modifier / Supprimer

---

## ⚠️ Si Ça Ne Fonctionne Pas

### Erreur : "relation does not exist"
→ La table n'a pas été créée. Ré-exécutez `blog_articles_schema.sql`

### Erreur : "duplicate key value violates unique constraint"
→ Les articles existent déjà. C'est normal, le script utilise `ON CONFLICT DO NOTHING`

### Aucun article dans l'admin
→ Vérifiez :
1. Que Supabase est bien configuré dans `.env.local`
2. Que le serveur a été redémarré après modification de `.env.local`
3. Que la table existe et contient des données (Table Editor)

---

## 🎯 Prochaines Étapes

Une fois les articles migrés :

1. ✅ Vous pouvez les voir dans l'admin
2. ✅ Vous pouvez les modifier
3. ✅ Vous pouvez en créer de nouveaux
4. ✅ Ils apparaîtront sur `/blog` et sur la homepage

---

**Date :** 2025-11-06

