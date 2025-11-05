# 🚀 Guide Complet : Déploiement de quizorientation.online sur Netlify

## 📋 Informations
- **Nom de domaine** : `quizorientation.online`
- **Plateforme** : Netlify
- **Code source** : GitHub
- **État actuel** : Rien n'est fait sur Git pour le moment

---

## ÉTAPE 1 : Préparer le projet Git

### 1.1 Vérifier que vous êtes dans le bon dossier
```bash
cd "C:\Users\career center 1\Desktop\apps\APP ADS"
```

### 1.2 Initialiser Git
```bash
git init
```

### 1.3 Vérifier que .gitignore est présent
Le fichier `.gitignore` devrait déjà exister. Vérifiez qu'il contient :
```
node_modules/
dist/
.env.local
.env
```

### 1.4 Ajouter tous les fichiers au dépôt Git
```bash
git add .
```

### 1.5 Créer le premier commit
```bash
git commit -m "Initial commit: Quiz d'orientation professionnelle multilingue (FR/EN/AR)"
```

✅ **Vérification** : Vous devriez voir un message comme "Initial commit created"

---

## ÉTAPE 2 : Créer le dépôt sur GitHub

### 2.1 Aller sur GitHub
1. Ouvrez votre navigateur
2. Allez sur [github.com](https://github.com)
3. Connectez-vous avec votre compte

### 2.2 Créer un nouveau dépôt
1. Cliquez sur le bouton **"+"** en haut à droite
2. Cliquez sur **"New repository"**

### 2.3 Remplir les informations
- **Repository name** : `quiz-orientation-professionnelle`
  (ou un autre nom de votre choix, sans espaces)
  
- **Description** : `Quiz d'orientation professionnelle multilingue avec support FR/EN/AR`

- **Visibility** : 
  - Choisissez **Public** (gratuit, visible par tous)
  - Ou **Private** (visible uniquement par vous)

- ❌ **NE cochez PAS** :
  - "Add a README file"
  - "Add .gitignore"
  - "Choose a license"

4. Cliquez sur **"Create repository"** (bouton vert en bas)

### 2.4 GitHub vous affichera des instructions
Vous verrez une page avec des commandes. **Ne les exécutez pas encore**, on va les faire ensemble.

---

## ÉTAPE 3 : Connecter votre projet local à GitHub

### 3.1 Ajouter le remote GitHub
GitHub vous donnera une URL. Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub réel.

```bash
git remote add origin https://github.com/VOTRE_USERNAME/quiz-orientation-professionnelle.git
```

**Exemple** : Si votre username est `john`, la commande sera :
```bash
git remote add origin https://github.com/john/quiz-orientation-professionnelle.git
```

### 3.2 Renommer la branche principale
```bash
git branch -M main
```

### 3.3 Pousser le code sur GitHub
```bash
git push -u origin main
```

### 3.4 Authentification GitHub
GitHub vous demandera de vous authentifier. Vous avez 2 options :

#### Option A : Personal Access Token (Recommandé)
1. Allez sur : [github.com/settings/tokens](https://github.com/settings/tokens)
2. Cliquez sur **"Generate new token"** → **"Generate new token (classic)"**
3. Donnez un nom : `Netlify Deployment`
4. Cochez la permission : **`repo`** (toutes les permissions repo)
5. Cliquez sur **"Generate token"** en bas
6. **COPIEZ le token** (vous ne le reverrez plus jamais !)
7. Dans le terminal, quand GitHub demande votre mot de passe, collez le **token** (pas votre mot de passe)

#### Option B : GitHub CLI
Installez GitHub CLI et connectez-vous avec `gh auth login`

### 3.5 Vérifier que ça a fonctionné
1. Rafraîchissez la page GitHub de votre dépôt
2. Vous devriez voir tous vos fichiers ! ✅

---

## ÉTAPE 4 : Déployer sur Netlify

### 4.1 Se connecter à Netlify
1. Ouvrez votre navigateur
2. Allez sur [netlify.com](https://www.netlify.com)
3. Connectez-vous avec votre compte

### 4.2 Importer depuis GitHub
1. Cliquez sur **"Add new site"** (bouton en haut à droite)
2. Cliquez sur **"Import an existing project"**

### 4.3 Connecter à GitHub
1. Cliquez sur **"Deploy with GitHub"**
2. Si c'est la première fois, autorisez Netlify à accéder à votre compte GitHub
3. Sélectionnez votre dépôt : `quiz-orientation-professionnelle`

### 4.4 Configurer le build
Netlify détectera automatiquement Vite. Vérifiez que c'est correct :

- **Build command** : `npm run build`
- **Publish directory** : `dist`

(Si ce n'est pas automatique, modifiez-le)

### 4.5 ⚠️ IMPORTANT : Ajouter les variables d'environnement

**AVANT de cliquer sur "Deploy"**, ajoutez vos variables Supabase :

1. Cliquez sur **"Show advanced"** pour voir les options avancées
2. Cliquez sur **"New variable"** pour ajouter une variable
3. Ajoutez la première variable :
   - **Key** : `VITE_SUPABASE_URL`
   - **Value** : Votre URL Supabase (ex: `https://xxxxx.supabase.co`)
   - Cliquez sur **"Add variable"**
4. Ajoutez la deuxième variable :
   - **Key** : `VITE_SUPABASE_ANON_KEY`
   - **Value** : Votre clé anonyme Supabase
   - Cliquez sur **"Add variable"**

### 4.6 Déployer
1. Cliquez sur **"Deploy site"** (bouton vert en bas)
2. Attendez 1-2 minutes pendant le build
3. Une fois terminé, vous verrez une URL temporaire : `https://xxxxx.netlify.app`

✅ **Vérification** : Cliquez sur l'URL et testez que le site fonctionne (même sans domaine personnalisé)

---

## ÉTAPE 5 : Connecter votre domaine quizorientation.online

### 5.1 Aller dans les paramètres du domaine
1. Dans votre site Netlify, cliquez sur **"Site settings"**
2. Dans le menu de gauche, cliquez sur **"Domain management"**

### 5.2 Ajouter le domaine personnalisé
1. Cliquez sur **"Add custom domain"** (bouton en haut)
2. Entrez votre domaine : `quizorientation.online`
3. Cliquez sur **"Verify"**
4. Cliquez sur **"Yes, add domain"**

### 5.3 Netlify vous donnera des instructions DNS

Netlify va vous dire comment configurer vos DNS. Vous avez 2 options :

#### OPTION A : Utiliser Netlify DNS (⭐ RECOMMANDÉ - Plus simple)

1. Dans **"Domain management"**, cliquez sur **"Set up Netlify DNS"**
2. Netlify vous donnera des **nameservers**, par exemple :
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
3. **COPIEZ ces nameservers**
4. Allez sur votre registrar (là où vous avez acheté le domaine quizorientation.online)
5. Trouvez la section **"DNS"** ou **"Nameservers"**
6. Remplacez les nameservers actuels par ceux de Netlify
7. Sauvegardez

**Avantages** :
- Netlify gère tout automatiquement
- SSL activé automatiquement
- Plus simple à configurer

#### OPTION B : Configurer les DNS manuellement

Si vous préférez garder vos nameservers actuels :

1. Netlify vous donnera une adresse IP ou une URL
2. Allez sur votre registrar (là où vous avez acheté le domaine)
3. Trouvez la section **"DNS Records"** ou **"DNS Management"**
4. Ajoutez/modifiez ces enregistrements :

**Pour le domaine principal :**
- **Type** : `A` ou `CNAME`
- **Name** : `@` ou `quizorientation.online` (selon votre registrar)
- **Value** : L'adresse IP fournie par Netlify (ex: `75.2.60.5`)
- **TTL** : `3600` (ou laisser par défaut)

**Pour www.quizorientation.online (optionnel) :**
- **Type** : `CNAME`
- **Name** : `www`
- **Value** : `quizorientation.online` ou l'URL Netlify fournie
- **TTL** : `3600`

### 5.4 Attendre la propagation DNS
- La propagation DNS peut prendre **1-2 heures** (maximum 48h)
- Vous pouvez vérifier avec : [whatsmydns.net](https://www.whatsmydns.net/#A/quizorientation.online)
- Tapez votre domaine et vérifiez que les DNS pointent vers Netlify

### 5.5 SSL automatique
- Netlify génère automatiquement un certificat SSL (Let's Encrypt)
- Une fois les DNS propagés, le SSL est activé automatiquement
- Attendez quelques minutes après la propagation DNS

---

## ÉTAPE 6 : Vérifier que tout fonctionne

### 6.1 Tester le site
1. Allez sur `https://quizorientation.online`
2. Testez toutes les fonctionnalités :
   - ✅ Le site charge correctement
   - ✅ Changement de langue fonctionne (FR/EN/AR)
   - ✅ Quiz fonctionne
   - ✅ Résultats s'affichent
   - ✅ Traductions fonctionnent
   - ✅ HTTPS est actif (cadenas vert 🔒)

### 6.2 Vérifier les déploiements automatiques
1. Faites un petit changement dans votre code
2. Poussez sur GitHub :
   ```bash
   git add .
   git commit -m "Test de déploiement automatique"
   git push
   ```
3. Allez sur Netlify
4. Vous devriez voir un nouveau déploiement en cours automatiquement ! 🎉

---

## 📝 Checklist finale

Avant de considérer que tout est terminé, vérifiez :

- [ ] Git initialisé et premier commit créé
- [ ] Code poussé sur GitHub
- [ ] Site déployé sur Netlify (URL temporaire fonctionne)
- [ ] Variables d'environnement configurées (VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY)
- [ ] Domaine `quizorientation.online` ajouté dans Netlify
- [ ] DNS configurés (nameservers ou enregistrements)
- [ ] DNS propagés (vérifié avec whatsmydns.net)
- [ ] SSL activé (cadenas vert)
- [ ] Site accessible sur `https://quizorientation.online`
- [ ] Toutes les fonctionnalités testées et fonctionnelles

---

## 🐛 Dépannage

### Problème : "fatal: not a git repository"
**Solution** : Vous n'êtes pas dans le bon dossier. Utilisez :
```bash
cd "C:\Users\career center 1\Desktop\apps\APP ADS"
git init
```

### Problème : "Permission denied" lors du push
**Solution** : Utilisez un Personal Access Token au lieu de votre mot de passe GitHub

### Problème : Build échoue sur Netlify
**Solution** : 
- Vérifiez que `npm run build` fonctionne en local
- Vérifiez les logs dans Netlify pour voir l'erreur exacte
- Vérifiez que toutes les dépendances sont dans `package.json`

### Problème : Variables d'environnement ne fonctionnent pas
**Solution** :
- Vérifiez que les noms sont exactement : `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
- Redéployez après avoir ajouté les variables
- Les variables doivent commencer par `VITE_` pour être accessibles dans Vite

### Problème : Le domaine ne fonctionne pas
**Solution** :
- Vérifiez que les DNS sont bien configurés
- Utilisez [whatsmydns.net](https://www.whatsmydns.net) pour vérifier
- Attendez jusqu'à 48 heures (généralement 1-2 heures)

### Problème : SSL non activé
**Solution** :
- Attendez quelques minutes après la configuration DNS
- Netlify génère le certificat automatiquement
- Si après 24h ça ne fonctionne pas, contactez le support Netlify

---

## 🎉 Félicitations !

Votre site est maintenant accessible sur **https://quizorientation.online** ! 🚀

Chaque fois que vous poussez du code sur GitHub, Netlify redéploiera automatiquement votre site.

---

## 📞 Support

- [Documentation Netlify](https://docs.netlify.com/)
- [Documentation GitHub](https://docs.github.com/)
- [Support Netlify](https://www.netlify.com/support/)

