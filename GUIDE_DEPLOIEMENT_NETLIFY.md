# 🚀 Guide de Déploiement sur Netlify

## 📋 Prérequis
- ✅ Compte Netlify créé
- ✅ Compte GitHub créé
- ✅ Application fonctionne en local
- ✅ Variables d'environnement Supabase configurées

---

## 🔧 Étape 1 : Préparer le projet pour Git

### 1.1 Vérifier que vous êtes dans le bon dossier
```bash
cd "C:\Users\career center 1\Desktop\apps\APP ADS"
```

### 1.2 Initialiser Git (si pas déjà fait)
```bash
git init
```

### 1.3 Créer un fichier .gitignore (si pas déjà fait)
Le fichier `.gitignore` devrait déjà exister et contenir :
```
node_modules/
dist/
.env.local
.env
.DS_Store
```

### 1.4 Ajouter tous les fichiers
```bash
git add .
```

### 1.5 Créer le premier commit
```bash
git commit -m "Initial commit: Quiz d'orientation professionnelle avec support multilingue"
```

---

## 📦 Étape 2 : Créer le dépôt GitHub

### 2.1 Créer un nouveau dépôt sur GitHub
1. Allez sur [github.com](https://github.com)
2. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
3. Remplissez :
   - **Repository name** : `quiz-orientation-professionnelle` (ou un nom de votre choix)
   - **Description** : "Quiz d'orientation professionnelle multilingue (FR/EN/AR)"
   - **Visibility** : Public ou Private (votre choix)
   - ❌ **NE cochez PAS** "Add a README file" (vous avez déjà des fichiers)
4. Cliquez sur **"Create repository"**

### 2.2 Connecter votre projet local à GitHub
GitHub vous donnera des commandes. Utilisez celles-ci :

```bash
# Ajouter le remote GitHub (remplacez USERNAME et REPO_NAME)
git remote add origin https://github.com/VOTRE_USERNAME/quiz-orientation-professionnelle.git

# Renommer la branche principale en 'main' (si nécessaire)
git branch -M main

# Pousser le code sur GitHub
git push -u origin main
```

**Note** : Si GitHub vous demande de vous authentifier :
- Utilisez un **Personal Access Token** (pas votre mot de passe)
- Créez-en un : Settings → Developer settings → Personal access tokens → Tokens (classic)
- Donnez-lui les permissions : `repo` (toutes les permissions repo)

---

## 🌐 Étape 3 : Déployer sur Netlify

### 3.1 Se connecter à Netlify
1. Allez sur [netlify.com](https://www.netlify.com)
2. Connectez-vous avec votre compte

### 3.2 Importer depuis GitHub
1. Cliquez sur **"Add new site"** → **"Import an existing project"**
2. Cliquez sur **"Deploy with GitHub"**
3. Autorisez Netlify à accéder à votre compte GitHub (si demandé)
4. Sélectionnez votre dépôt : `quiz-orientation-professionnelle`

### 3.3 Configurer le build
Netlify détectera automatiquement Vite. Vérifiez que les paramètres sont :
- **Build command** : `npm run build`
- **Publish directory** : `dist`
- **Base directory** : (laisser vide)

### 3.4 Ajouter les variables d'environnement
**IMPORTANT** : Avant de cliquer sur "Deploy", ajoutez vos variables d'environnement :

1. Cliquez sur **"Show advanced"** → **"New variable"**
2. Ajoutez ces deux variables :
   - **Key** : `VITE_SUPABASE_URL`
     **Value** : Votre URL Supabase (ex: `https://xxxxx.supabase.co`)
   
   - **Key** : `VITE_SUPABASE_ANON_KEY`
     **Value** : Votre clé anonyme Supabase

3. Cliquez sur **"Deploy site"**

---

## ✅ Étape 4 : Vérifier le déploiement

### 4.1 Attendre la fin du build
- Le build prend généralement 1-2 minutes
- Vous verrez les logs en temps réel

### 4.2 Vérifier que tout fonctionne
1. Une fois le build terminé, cliquez sur l'URL générée (ex: `https://xxxxx.netlify.app`)
2. Testez l'application :
   - ✅ Changement de langue
   - ✅ Quiz fonctionne
   - ✅ Résultats s'affichent
   - ✅ Traductions fonctionnent

### 4.3 Personnaliser le nom du site (optionnel)
1. Allez dans **Site settings** → **Change site name**
2. Choisissez un nom personnalisé (ex: `quiz-orientation.netlify.app`)

---

## 🔄 Étape 5 : Déploiements automatiques

### Configuration automatique
Netlify est maintenant connecté à GitHub. Chaque fois que vous poussez du code :
```bash
git add .
git commit -m "Description de vos changements"
git push
```

Netlify redéploiera automatiquement votre site ! 🎉

---

## 🐛 Dépannage

### Problème : Build échoue
- Vérifiez les logs dans Netlify
- Vérifiez que `npm run build` fonctionne en local
- Vérifiez que toutes les dépendances sont dans `package.json`

### Problème : Variables d'environnement non chargées
- Vérifiez que les noms sont exactement : `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
- Redéployez après avoir ajouté les variables

### Problème : 404 sur certaines routes
- Vérifiez que `netlify.toml` contient bien la redirection `/*`

### Problème : Traductions ne fonctionnent pas
- Vérifiez que les fichiers JSON de traduction sont bien dans le dépôt
- Vérifiez que Supabase est accessible depuis Internet (pas seulement local)

---

## 📝 Checklist finale

Avant de déployer, vérifiez :
- [ ] Le projet fonctionne en local (`npm run dev`)
- [ ] Le build fonctionne en local (`npm run build`)
- [ ] Le fichier `.env.local` n'est PAS dans Git (dans `.gitignore`)
- [ ] Tous les fichiers sont commités
- [ ] Le code est poussé sur GitHub
- [ ] Les variables d'environnement sont configurées dans Netlify
- [ ] Le site est accessible et fonctionne

---

## 🎉 C'est prêt !

Votre application est maintenant déployée sur Netlify ! Partagez l'URL avec vos utilisateurs.

**URL de votre site** : `https://votre-site.netlify.app`

---

## 📚 Ressources utiles

- [Documentation Netlify](https://docs.netlify.com/)
- [Documentation Vite](https://vitejs.dev/)
- [Documentation Supabase](https://supabase.com/docs)

