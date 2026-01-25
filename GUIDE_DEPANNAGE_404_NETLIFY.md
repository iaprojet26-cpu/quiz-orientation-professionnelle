# 🔧 Guide de Dépannage 404 - Netlify (Basé sur la Documentation Vercel)

**Date** : 25 janvier 2026  
**Problème** : `https://www.quizorientation.online/blog` retourne toujours une erreur 404  
**Plateforme** : Netlify (pas Vercel, mais les principes sont similaires)

---

## 🔍 Vérifications Étape par Étape (Inspirées de la Documentation Vercel)

### 1. ✅ Vérifier l'URL du Déploiement

**Problème possible** : L'URL contient une faute de frappe ou un chemin incorrect.

**Vérifications** :
- ✅ URL testée : `https://www.quizorientation.online/blog`
- ✅ URL correcte : `https://quizorientation.online/blog` (sans www devrait fonctionner)
- ⚠️ **Action** : Tester les deux URLs en navigation privée

**Test** :
```bash
# Tester sans www (devrait fonctionner)
https://quizorientation.online/blog

# Tester avec www (devrait rediriger puis fonctionner)
https://www.quizorientation.online/blog
```

---

### 2. ✅ Vérifier l'Existence du Déploiement

**Problème possible** : Le déploiement n'existe pas ou a été supprimé.

**Vérifications dans Netlify Dashboard** :

1. **Aller sur** [Netlify Dashboard](https://app.netlify.com)
2. **Sélectionner** votre site `quizorientation.online`
3. **Onglet "Deploys"** :
   - ✅ Vérifier qu'il y a des déploiements récents
   - ✅ Vérifier que le dernier déploiement est "Published" (vert)
   - ✅ Vérifier la date/heure du dernier déploiement
   - ⚠️ Si le dernier déploiement est ancien, déclencher un nouveau déploiement

**Action** :
- Si pas de déploiement récent → Déclencher un déploiement manuel
- Si le déploiement a échoué → Vérifier les logs et corriger les erreurs

---

### 3. ✅ Examiner les Logs de Déploiement

**Problème possible** : Le déploiement existe mais contient des erreurs.

**Vérifications dans Netlify Dashboard** :

1. **Deploys** > Dernier déploiement > **Cliquer sur "View deploy log"**
2. **Chercher** :
   - ❌ Erreurs de build
   - ❌ Warnings concernant le fichier `_redirects`
   - ❌ Messages indiquant que des fichiers ne sont pas copiés
   - ✅ Confirmation que le build a réussi

**Erreurs courantes** :
- `_redirects file not found` → Le fichier n'est pas copié dans `dist/`
- `Build failed` → Erreur dans le code ou la configuration
- `Publish directory not found` → Le dossier `dist/` n'existe pas

**Action** :
- Si erreurs trouvées → Les corriger et redéployer
- Si pas d'erreurs → Passer à l'étape suivante

---

### 4. ✅ Vérifier les Permissions et la Configuration

**Problème possible** : Problème de permissions ou de configuration Netlify.

**Vérifications dans Netlify Dashboard** :

1. **Site settings** > **Build & deploy** > **Build settings** :
   - ✅ Build command : `npm run build`
   - ✅ Publish directory : `dist`
   - ✅ Base directory : (vide)

2. **Site settings** > **Redirects** :
   - ✅ Vérifier que les redirections sont bien présentes
   - ✅ Vérifier qu'il n'y a pas de conflits
   - ⚠️ Si les redirections ne sont pas là, le fichier `_redirects` n'a pas été copié

3. **Site settings** > **Domain management** :
   - ✅ Vérifier que `quizorientation.online` est configuré
   - ✅ Vérifier que `www.quizorientation.online` est configuré (si nécessaire)

**Action** :
- Si les redirections ne sont pas dans Netlify Dashboard → Vérifier que `_redirects` est dans `dist/`
- Si problème de domaine → Vérifier la configuration DNS

---

### 5. ✅ Contacter le Support (Si Rien ne Fonctionne)

**Si toutes les étapes précédentes ont été vérifiées sans succès** :

1. **Aller sur** [Netlify Support](https://www.netlify.com/support/)
2. **Créer un ticket** avec :
   - L'URL du problème : `https://www.quizorientation.online/blog`
   - Le message d'erreur : 404 NOT_FOUND
   - Les fichiers `_redirects` et `netlify.toml`
   - Les logs de build
   - Les captures d'écran de Netlify Dashboard > Redirects

---

## 🔧 Solutions Spécifiques à Netlify

### Solution 1 : Vérifier que le Fichier _redirects est dans dist/

**Le problème le plus probable** : Le fichier `_redirects` n'est pas copié dans `dist/` lors du build.

**Vérification** :

1. **Dans Netlify Dashboard** :
   - **Deploys** > Dernier déploiement > **"Browse published files"**
   - Chercher le fichier `_redirects` dans les fichiers déployés
   - Si le fichier n'est pas là → Il n'a pas été copié

2. **Si le fichier n'est pas là** :
   - Vérifier que `public/_redirects` existe dans votre dépôt Git
   - Vérifier que Vite copie bien les fichiers de `public/` vers `dist/`
   - Utiliser les redirections dans `netlify.toml` comme backup

**Action** :
- Si le fichier n'est pas dans `dist/` → Utiliser uniquement `netlify.toml` pour les redirections

---

### Solution 2 : Vérifier les Redirections dans Netlify Dashboard

**Dans Netlify Dashboard** :

1. **Site settings** > **Redirects**
2. **Vérifier** que les redirections suivantes sont présentes :
   - `https://www.quizorientation.online/blog` → `https://quizorientation.online/blog` (301)
   - `/blog` → `/index.html` (200)

3. **Si elles ne sont pas là** :
   - Les ajouter manuellement dans le dashboard
   - Ou vérifier que le fichier `_redirects` est bien dans `dist/`

**Action** :
- Si les redirections ne sont pas dans le dashboard → Les ajouter manuellement
- Si elles sont là mais ne fonctionnent pas → Vérifier l'ordre des redirections

---

### Solution 3 : Utiliser Uniquement netlify.toml

**Si le fichier `_redirects` ne fonctionne pas**, on peut utiliser uniquement `netlify.toml` :

Les redirections sont déjà ajoutées dans `netlify.toml` :
- Redirection www → non-www pour `/blog`
- Redirection SPA pour `/blog`

**Action** :
- Vérifier que les redirections dans `netlify.toml` sont correctes
- Si nécessaire, supprimer le fichier `_redirects` et utiliser uniquement `netlify.toml`

---

### Solution 4 : Vider le Cache Netlify

**Le cache Netlify peut causer des problèmes** :

1. **Dans Netlify Dashboard** :
   - **Site settings** > **Build & deploy**
   - **Cliquer sur** "Clear cache and retry deploy"
   - **Attendre** le nouveau déploiement (2-5 minutes)

**Action** :
- Vider le cache après chaque modification importante
- Tester en navigation privée après avoir vidé le cache

---

## 📊 Checklist Complète de Vérification

### Git
- [ ] Les modifications sont committées (`git status` ne montre pas de modifications)
- [ ] Le push a réussi (`git log origin/main` montre le dernier commit)
- [ ] Le dernier commit contient les modifications des redirections

### Build Local
- [ ] Le build local fonctionne (`npm run build`)
- [ ] Le fichier `dist/_redirects` existe après le build local
- [ ] Le contenu de `dist/_redirects` est correct

### Netlify
- [ ] Le dernier déploiement est récent (moins de 10 minutes)
- [ ] Le statut du déploiement est "Published" (vert)
- [ ] Le commit du déploiement correspond au dernier commit Git
- [ ] Le cache Netlify a été vidé
- [ ] Les redirections sont visibles dans Netlify Dashboard > Redirects
- [ ] Le fichier `_redirects` est présent dans les fichiers déployés
- [ ] Les logs de build Netlify ne montrent pas d'erreurs

### Test
- [ ] Test en navigation privée effectué
- [ ] Cache du navigateur vidé (Ctrl+Shift+R)
- [ ] `https://quizorientation.online/blog` fonctionne (sans www)
- [ ] `https://www.quizorientation.online/blog` fonctionne (avec www)

---

## 🚀 Actions Immédiates

### 1. Vérifier dans Netlify Dashboard

1. **Site settings** > **Redirects**
   - Vérifier que les redirections sont bien présentes
   - Si elles ne sont pas là → Les ajouter manuellement

2. **Deploys** > Dernier déploiement
   - Vérifier les logs de build
   - Chercher des erreurs ou des warnings

3. **Deploys** > Dernier déploiement > **"Browse published files"**
   - Chercher le fichier `_redirects` dans les fichiers déployés
   - Si le fichier n'est pas là → Utiliser uniquement `netlify.toml`

### 2. Vider le Cache Netlify

1. **Site settings** > **Build & deploy**
2. **Cliquer sur** "Clear cache and retry deploy"
3. **Attendre** le nouveau déploiement (2-5 minutes)

### 3. Tester en Navigation Privée

**Tester en navigation privée** (Ctrl+Shift+N ou Cmd+Shift+N) :

1. **Tester** : `https://quizorientation.online/blog` (sans www)
   - ✅ Devrait fonctionner

2. **Tester** : `https://www.quizorientation.online/blog` (avec www)
   - ✅ Devrait rediriger vers `https://quizorientation.online/blog`
   - ✅ Puis charger la page blog (pas d'erreur 404)

---

## 📞 Support Netlify

Si le problème persiste après toutes ces vérifications :

1. **Vérifier les logs de build Netlify** pour voir s'il y a des erreurs
2. **Vérifier dans Netlify Dashboard** > **Redirects** que les redirections sont bien présentes
3. **Contacter le support Netlify** avec :
   - L'URL du problème : `https://www.quizorientation.online/blog`
   - Le message d'erreur : 404 NOT_FOUND
   - Les fichiers `_redirects` et `netlify.toml`
   - Les logs de build
   - Les captures d'écran de Netlify Dashboard > Redirects

---

## ✅ Résumé

**Problème** : `https://www.quizorientation.online/blog` retourne toujours une erreur 404  
**Vérifications** :
1. URL du déploiement (pas de faute de frappe)
2. Existence du déploiement (déploiement récent et réussi)
3. Logs de déploiement (pas d'erreurs)
4. Permissions et configuration (redirections présentes dans Netlify Dashboard)
5. Support (si rien ne fonctionne)

**Action immédiate** : Vérifier dans Netlify Dashboard que les redirections sont bien présentes et que le fichier `_redirects` est dans les fichiers déployés.

---

**✅ Ce guide est basé sur les principes de dépannage de la documentation Vercel, adaptés spécifiquement à Netlify.**
