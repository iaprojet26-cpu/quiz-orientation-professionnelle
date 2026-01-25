# 📝 Instructions pour Pousser et Déployer les Corrections

**Date** : 25 janvier 2026  
**Objectif** : Déployer les corrections pour résoudre l'erreur 404 sur `/blog`

---

## ✅ Corrections Appliquées (Prêtes à Déployer)

### 1. Redirections dans `public/_redirects` ✅
- Redirection explicite `/blog /index.html  200` (ligne 51)
- Redirection www → non-www (ligne 6)
- Redirection SPA catch-all `/*  /index.html  200` (ligne 55)

### 2. Redirections dans `netlify.toml` ✅
- Configuration vérifiée et optimisée

---

## 🚀 Instructions pour Pousser les Modifications

### Étape 1 : Vérifier l'État Git

**Dans votre terminal (Git Bash, PowerShell, ou terminal IDE)** :

```bash
# Vérifier l'état
git status
```

**Vous devriez voir** :
- `M public/_redirects` (modifié)
- `M netlify.toml` (modifié)
- D'autres fichiers modifiés

### Étape 2 : Supprimer le Verrouillage Git (si nécessaire)

**Si vous voyez une erreur "Permission denied" ou "index.lock"** :

```bash
# Windows PowerShell
Remove-Item ".git/index.lock" -Force -ErrorAction SilentlyContinue

# Ou Git Bash
rm -f .git/index.lock
```

### Étape 3 : Ajouter les Fichiers

```bash
# Ajouter tous les fichiers modifiés
git add .

# Vérifier que les fichiers sont bien ajoutés
git status
```

### Étape 4 : Commit

```bash
# Commit avec un message descriptif
git commit -m "fix: Corrections redirections /blog - Ajout redirection explicite et configuration netlify.toml"
```

### Étape 5 : Push

```bash
# Push vers le dépôt distant
git push origin main
```

**Si vous voyez une erreur d'authentification** :
- Vérifier que vous êtes connecté à GitHub
- Utiliser un token d'accès personnel si nécessaire

---

## ⏳ Après le Push

### 1. Attendre le Déploiement Netlify (2-5 minutes)

1. **Aller sur** [Netlify Dashboard](https://app.netlify.com)
2. **Sélectionner** votre site `quizorientation.online`
3. **Onglet "Deploys"** :
   - Attendre que le nouveau déploiement apparaisse
   - Vérifier que le statut passe à "Building" puis "Published" (vert)

### 2. Vider le Cache Netlify

**Une fois le déploiement terminé** :

1. **Dans Netlify Dashboard**, aller dans **Site settings** > **Build & deploy**
2. **Cliquer sur** "Clear cache and retry deploy"
3. **Attendre** le nouveau déploiement (2-5 minutes)

### 3. Tester les URLs

**Tester en navigation privée** (Ctrl+Shift+N ou Cmd+Shift+N) :

1. **Tester** : `https://quizorientation.online/blog` (sans www)
   - ✅ Devrait fonctionner

2. **Tester** : `https://www.quizorientation.online/blog` (avec www)
   - ✅ Devrait rediriger vers `https://quizorientation.online/blog`
   - ✅ Puis charger la page blog (pas d'erreur 404)

3. **Vérifier dans les outils développeur** (F12) :
   - Onglet "Network" → Vérifier les redirections
   - Onglet "Console" → Vérifier qu'il n'y a pas d'erreurs

---

## 🐛 Dépannage

### Problème : "Permission denied" lors du git add

**Solution** :
```bash
# Fermer tous les clients Git (GitHub Desktop, VS Code, etc.)
# Attendre 5-10 secondes
# Réessayer les commandes
```

### Problème : "Unable to access" lors du git push

**Solution** :
- Vérifier que vous êtes connecté à GitHub
- Utiliser un token d'accès personnel si nécessaire
- Vérifier les permissions du dépôt

### Problème : Le déploiement Netlify ne se déclenche pas

**Solution** :
1. Vérifier que Netlify est connecté à votre dépôt Git
2. Vérifier que le webhook Git est configuré
3. Déclencher un déploiement manuel dans Netlify Dashboard

### Problème : L'erreur 404 persiste après le déploiement

**Solution** :
1. Vider le cache Netlify
2. Vider le cache du navigateur (Ctrl+Shift+R)
3. Tester en navigation privée
4. Attendre 5-10 minutes pour la propagation

---

## ✅ Checklist Finale

- [ ] Les modifications sont committées dans Git
- [ ] Le push vers le dépôt distant a réussi
- [ ] Le déploiement Netlify est terminé et réussi
- [ ] Le cache Netlify a été vidé
- [ ] Test en navigation privée effectué
- [ ] `https://quizorientation.online/blog` fonctionne (sans www)
- [ ] `https://www.quizorientation.online/blog` fonctionne (avec www)

---

## 📞 Support

Si le problème persiste après toutes ces étapes :

1. **Vérifier dans Netlify Dashboard** > **Site settings** > **Redirects** que les redirections sont bien présentes
2. **Vérifier les logs de déploiement** dans Netlify pour voir s'il y a des erreurs
3. **Contacter le support Netlify** si nécessaire

---

**✅ Les corrections sont prêtes. Il faut maintenant pousser les modifications vers Git et attendre le déploiement Netlify.**
