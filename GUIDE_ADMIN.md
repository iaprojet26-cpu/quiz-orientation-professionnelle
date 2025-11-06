# 🔐 Guide d'Administration - Gestion des Articles de Blog

## ✅ Système Admin Implémenté

Un système d'administration complet a été créé pour gérer les articles de blog.

---

## 📋 Configuration Initiale

### 1. Créer la Table dans Supabase

1. Allez sur [app.supabase.com](https://app.supabase.com)
2. Ouvrez votre projet
3. Allez dans **SQL Editor**
4. Créez une nouvelle requête
5. **Copiez-collez** le contenu de `database/blog_articles_schema.sql`
6. Cliquez sur **Run**

✅ La table `blog_articles` sera créée avec :
- Support multilingue (FR, EN, AR)
- Champs pour titre, description, contenu Markdown
- Mots-clés, catégories, images
- Statut de publication
- Dates de création et mise à jour

### 2. Configurer le Mot de Passe Admin

1. Créez ou modifiez le fichier `.env.local` à la racine du projet
2. Ajoutez la ligne suivante :

```env
VITE_ADMIN_PASSWORD=votre_mot_de_passe_securise
```

**⚠️ Important :**
- Utilisez un mot de passe fort
- Ne partagez jamais ce mot de passe
- En production, configurez-le dans Netlify (Environment Variables)

---

## 🚀 Utilisation de l'Interface Admin

### Accès à l'Admin

**URL :** `http://localhost:3000/admin/login` (en local)
**URL :** `https://quizorientation.online/admin/login` (en production)

### Connexion

1. Entrez le mot de passe configuré dans `.env.local`
2. Cliquez sur "Se connecter"
3. Vous serez redirigé vers le tableau de bord

### Tableau de Bord (`/admin`)

Le tableau de bord affiche :
- Liste de tous les articles (publiés et brouillons)
- Statut de chaque article (✅ Publié / ⏳ Brouillon)
- Date de création
- Actions : Modifier / Supprimer

### Créer un Nouvel Article

1. Cliquez sur **"+ Nouvel Article"**
2. Remplissez le formulaire :
   - **Slug** : URL-friendly (ex: `mon-article`)
   - **Titres** : FR (obligatoire), EN, AR (optionnels)
   - **Descriptions** : FR (obligatoire), EN, AR (optionnels)
   - **Contenu Markdown** : FR (obligatoire), EN, AR (optionnels)
   - **Image** : URL de l'image
   - **Mots-clés** : Séparés par des virgules
   - **Catégorie** : Orientation, Métiers, Formations, Conseils
   - **Publier** : Cochez pour publier immédiatement
3. Cliquez sur **"Créer"**

### Modifier un Article

1. Dans la liste, cliquez sur **"✏️ Modifier"**
2. Modifiez les champs souhaités
3. Cliquez sur **"Mettre à jour"**

### Supprimer un Article

1. Dans la liste, cliquez sur **"🗑️ Supprimer"**
2. Confirmez la suppression

### Générer le Sitemap

1. Cliquez sur **"🔄 Générer Sitemap"**
2. Le sitemap XML sera généré automatiquement
3. Il sera téléchargé automatiquement
4. Remplacez le fichier `public/sitemap.xml` par le nouveau fichier

---

## 📝 Format du Contenu Markdown

Le contenu des articles utilise le format Markdown standard :

```markdown
# Titre Principal

## Sous-titre

**Texte en gras**

*Texte en italique*

- Liste à puces
- Item 2

1. Liste numérotée
2. Item 2

[Lien](https://example.com)

![Image](/path/to/image.jpg)
```

---

## 🔒 Sécurité

### Authentification

- Mot de passe stocké dans variable d'environnement
- Session valide 24 heures
- Déconnexion automatique après expiration

### Accès Restreint

- Route `/admin` protégée
- Redirection automatique vers `/admin/login` si non authentifié
- Les articles non publiés ne sont pas visibles publiquement

### En Production

1. Configurez `VITE_ADMIN_PASSWORD` dans Netlify :
   - Allez dans **Site settings** > **Environment variables**
   - Ajoutez `VITE_ADMIN_PASSWORD` avec votre mot de passe
   - Redéployez le site

2. **Recommandation** : Changez le mot de passe régulièrement

---

## 🎯 Fonctionnalités

### ✅ Implémenté

- ✅ Authentification par mot de passe
- ✅ CRUD complet (Create, Read, Update, Delete)
- ✅ Support multilingue (FR, EN, AR)
- ✅ Éditeur Markdown
- ✅ Gestion du statut (publié/brouillon)
- ✅ Génération automatique du sitemap
- ✅ Interface intuitive

### 🔄 Automatique

- **Sitemap** : Généré dynamiquement depuis Supabase
- **Slug** : Généré automatiquement depuis le titre si non fourni
- **Dates** : `published_at` défini automatiquement lors de la publication

---

## 📊 Structure de la Table

```sql
blog_articles
├── id (UUID)
├── slug (TEXT, UNIQUE)
├── title_fr, title_en, title_ar
├── description_fr, description_en, description_ar
├── content_fr, content_en, content_ar (Markdown)
├── image (TEXT)
├── keywords_fr, keywords_en, keywords_ar (TEXT[])
├── category (TEXT)
├── published (BOOLEAN)
├── published_at (TIMESTAMP)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

---

## 🧪 Test en Local

1. **Créer la table** dans Supabase (voir étape 1)
2. **Configurer le mot de passe** dans `.env.local`
3. **Démarrer le serveur** : `npm run dev`
4. **Accéder à** : `http://localhost:3000/admin/login`
5. **Se connecter** avec le mot de passe
6. **Créer un premier article** pour tester

---

## 🚀 Déploiement

Après avoir testé en local :

1. **Pousser le code** sur GitHub
2. **Configurer** `VITE_ADMIN_PASSWORD` dans Netlify
3. **Vérifier** que la table `blog_articles` existe dans Supabase
4. **Tester** l'accès admin en production

---

**Date de création :** 2025-11-06
**Dernière mise à jour :** 2025-11-06

