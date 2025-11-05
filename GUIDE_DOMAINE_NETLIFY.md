# 🌐 Guide : Connecter quizorientation.online à Netlify

## 📋 Prérequis
- ✅ Compte Netlify créé
- ✅ Compte GitHub créé
- ✅ Nom de domaine : `quizorientation.online`
- ✅ Application fonctionne en local

---

## 🔧 Étape 1 : Initialiser Git et pousser sur GitHub

### 1.1 Initialiser Git
```bash
cd "C:\Users\career center 1\Desktop\apps\APP ADS"
git init
git add .
git commit -m "Initial commit: Quiz d'orientation professionnelle multilingue"
```

### 1.2 Créer le dépôt GitHub
1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"+"** → **"New repository"**
3. Remplissez :
   - **Repository name** : `quiz-orientation-professionnelle`
   - **Description** : "Quiz d'orientation professionnelle multilingue"
   - **Visibility** : Public ou Private
   - ❌ **NE cochez PAS** "Add a README"
4. Cliquez sur **"Create repository"**

### 1.3 Connecter et pousser le code
```bash
# Ajouter le remote (remplacez USERNAME par votre nom GitHub)
git remote add origin https://github.com/VOTRE_USERNAME/quiz-orientation-professionnelle.git

# Renommer la branche
git branch -M main

# Pousser le code
git push -u origin main
```

**Note** : Si GitHub demande une authentification, utilisez un **Personal Access Token** (pas votre mot de passe).

---

## 🚀 Étape 2 : Déployer sur Netlify

### 2.1 Importer depuis GitHub
1. Allez sur [netlify.com](https://www.netlify.com)
2. Connectez-vous
3. Cliquez sur **"Add new site"** → **"Import an existing project"**
4. Cliquez sur **"Deploy with GitHub"**
5. Autorisez Netlify à accéder à GitHub
6. Sélectionnez votre dépôt : `quiz-orientation-professionnelle`

### 2.2 Configurer le build
Netlify détectera automatiquement Vite. Vérifiez :
- **Build command** : `npm run build`
- **Publish directory** : `dist`

### 2.3 Ajouter les variables d'environnement
**IMPORTANT** : Avant de cliquer sur "Deploy", ajoutez vos variables :

1. Cliquez sur **"Show advanced"** → **"New variable"**
2. Ajoutez :
   - **Key** : `VITE_SUPABASE_URL`
     **Value** : Votre URL Supabase (ex: `https://xxxxx.supabase.co`)
   
   - **Key** : `VITE_SUPABASE_ANON_KEY`
     **Value** : Votre clé anonyme Supabase

3. Cliquez sur **"Deploy site"**

### 2.4 Attendre le déploiement
- Le build prend 1-2 minutes
- Une fois terminé, vous aurez une URL temporaire : `https://xxxxx.netlify.app`

---

## 🌐 Étape 3 : Connecter votre domaine quizorientation.online

### 3.1 Ajouter le domaine dans Netlify
1. Dans votre site Netlify, allez dans **"Site settings"**
2. Cliquez sur **"Domain management"** dans le menu de gauche
3. Cliquez sur **"Add custom domain"**
4. Entrez : `quizorientation.online`
5. Cliquez sur **"Verify"**

### 3.2 Configurer les DNS

Netlify vous donnera des instructions pour configurer les DNS. Il y a deux options :

#### Option A : Utiliser Netlify DNS (Recommandé)
1. Dans **"Domain management"**, cliquez sur **"Set up Netlify DNS"**
2. Netlify vous donnera des **nameservers** (ex: `dns1.p01.nsone.net`)
3. Allez sur votre registrar (où vous avez acheté le domaine)
4. Remplacez les nameservers actuels par ceux de Netlify

#### Option B : Configurer les DNS manuellement
Si vous préférez garder vos nameservers actuels, ajoutez ces enregistrements DNS :

**Pour le domaine principal (quizorientation.online) :**
- **Type** : `A` ou `CNAME`
- **Name** : `@` ou `quizorientation.online`
- **Value** : L'adresse IP fournie par Netlify (ex: `75.2.60.5`)

**Pour www.quizorientation.online (optionnel) :**
- **Type** : `CNAME`
- **Name** : `www`
- **Value** : `quizorientation.online` ou l'URL Netlify fournie

### 3.3 Attendre la propagation DNS
- La propagation DNS peut prendre de **quelques minutes à 48 heures**
- Généralement, c'est fait en 1-2 heures
- Vous pouvez vérifier avec : [whatsmydns.net](https://www.whatsmydns.net)

---

## 🔒 Étape 4 : Activer HTTPS (SSL)

### 4.1 Netlify gère automatiquement le SSL
1. Netlify génère automatiquement un certificat SSL via Let's Encrypt
2. Une fois le domaine configuré, le SSL est activé automatiquement
3. Attendez quelques minutes après la configuration DNS

### 4.2 Vérifier le SSL
- Votre site sera accessible en HTTPS : `https://quizorientation.online`
- Le cadenas vert apparaîtra dans le navigateur

---

## 🔄 Étape 5 : Configuration avancée (Optionnel)

### 5.1 Redirection www vers non-www (ou inversement)
Dans **"Domain management"** → **"Domain settings"** :
- Choisissez si vous voulez que `www.quizorientation.online` redirige vers `quizorientation.online`
- Ou l'inverse

### 5.2 Forcer HTTPS
Netlify force automatiquement HTTPS, mais vous pouvez vérifier :
- **Site settings** → **Build & deploy** → **Environment variables**
- Assurez-vous que HTTPS est activé (c'est le cas par défaut)

---

## ✅ Étape 6 : Vérifier que tout fonctionne

### 6.1 Vérifier le site
1. Allez sur `https://quizorientation.online`
2. Testez :
   - ✅ Le site charge correctement
   - ✅ Changement de langue fonctionne
   - ✅ Quiz fonctionne
   - ✅ Résultats s'affichent
   - ✅ Traductions fonctionnent
   - ✅ HTTPS est actif (cadenas vert)

### 6.2 Vérifier les variables d'environnement
- Vérifiez que Supabase fonctionne en production
- Les données doivent se charger depuis Supabase

---

## 🔄 Déploiements automatiques

Désormais, chaque fois que vous poussez du code :
```bash
git add .
git commit -m "Description des changements"
git push
```

Netlify redéploiera automatiquement votre site sur `quizorientation.online` ! 🎉

---

## 🐛 Dépannage

### Problème : Le domaine ne fonctionne pas
- Vérifiez que les DNS sont bien configurés
- Utilisez [whatsmydns.net](https://www.whatsmydns.net) pour vérifier la propagation
- Attendez jusqu'à 48 heures (généralement 1-2 heures)

### Problème : SSL non activé
- Attendez quelques minutes après la configuration DNS
- Netlify génère le certificat automatiquement
- Si après 24h ça ne fonctionne pas, contactez le support Netlify

### Problème : Erreur 404
- Vérifiez que `netlify.toml` contient bien la redirection `/*`
- Redéployez le site

### Problème : Variables d'environnement
- Vérifiez que les noms sont exactement : `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
- Redéployez après avoir ajouté les variables

---

## 📝 Checklist finale

- [ ] Git initialisé et code poussé sur GitHub
- [ ] Site déployé sur Netlify
- [ ] Variables d'environnement configurées
- [ ] Domaine `quizorientation.online` ajouté dans Netlify
- [ ] DNS configurés (nameservers ou enregistrements)
- [ ] SSL activé (cadenas vert)
- [ ] Site accessible sur `https://quizorientation.online`
- [ ] Toutes les fonctionnalités testées

---

## 🎉 C'est prêt !

Votre site est maintenant accessible sur **https://quizorientation.online** ! 🚀

---

## 📞 Support

- [Documentation Netlify - Domaines](https://docs.netlify.com/domains-https/custom-domains/)
- [Support Netlify](https://www.netlify.com/support/)

