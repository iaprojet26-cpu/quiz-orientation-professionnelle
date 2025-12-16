# 🚀 Comment Pousser les Commits sur GitHub Manuellement

## ⚠️ Problème Actuel

Vous avez **1 commit local** qui n'a pas été poussé sur GitHub :
- `8bd81d6 fix: améliorer fallback BlogArticle - afficher article même si markdown ne charge pas`

Vercel se connecte à GitHub, donc il ne peut pas voir les commits locaux.

---

## ✅ Solution : Pousser les Commits

### Méthode 1 : Via la Ligne de Commande (si authentification fonctionne)

```bash
git push origin main
```

### Méthode 2 : Via GitHub Desktop

1. Ouvrez **GitHub Desktop**
2. Vous devriez voir le commit non poussé
3. Cliquez sur **"Push origin"** ou **"Push"**

### Méthode 3 : Via l'Interface Web GitHub

1. Allez sur [github.com](https://github.com)
2. Ouvrez votre dépôt : `iaprojet26-cpu/quiz-orientation-professionnelle`
3. Vérifiez la branche `main`
4. Si le commit n'est pas là, vous devrez le pousser via une autre méthode

### Méthode 4 : Créer un Personal Access Token

Si vous avez un problème d'authentification :

1. Allez sur GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Cliquez sur **"Generate new token"**
3. Donnez-lui un nom (ex: "Vercel Push")
4. Sélectionnez la permission **`repo`** (toutes les permissions repo)
5. Cliquez sur **"Generate token"**
6. **Copiez le token** (vous ne pourrez plus le voir après)
7. Utilisez-le comme mot de passe lors du `git push`

---

## 🔍 Vérifier que les Commits sont Poussés

Après avoir poussé :

1. Allez sur GitHub : `https://github.com/iaprojet26-cpu/quiz-orientation-professionnelle`
2. Vérifiez que le dernier commit est : `8bd81d6 fix: améliorer fallback BlogArticle...`
3. Si c'est le cas, Vercel devrait détecter automatiquement le nouveau commit et redéployer

---

## ⏱️ Attendre le Déploiement Vercel

1. Vercel détecte automatiquement les nouveaux commits sur GitHub
2. Le déploiement prend généralement **1-3 minutes**
3. Vous pouvez voir le statut dans Vercel → **Deployments**

---

## 🎯 Vérification Finale

Une fois le déploiement terminé sur Vercel :

1. Vérifiez que le commit affiché est : `8bd81d6` (ou plus récent)
2. Testez un article du blog
3. Ouvrez la console (F12) et regardez les logs de debug
4. Les logs devraient montrer : `🚀 Début chargement article`, `📚 Appel getArticleBySlug...`, etc.

---

*Dernière mise à jour : Décembre 2025*

