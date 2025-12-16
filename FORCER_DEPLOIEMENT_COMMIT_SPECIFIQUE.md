# 🎯 Forcer le Déploiement du Bon Commit sur Vercel

## ⚠️ Problème

Vercel déploie toujours l'ancien commit `a149372` au lieu du nouveau `8bd81d6`.

---

## ✅ Solution : Déployer depuis le Commit Spécifique

### Étape 1 : Vérifier le Commit sur GitHub

1. Allez sur : `https://github.com/iaprojet26-cpu/quiz-orientation-professionnelle/commits/main`
2. Vérifiez que le **premier commit** (le plus récent) est : `8bd81d6 fix: améliorer fallback BlogArticle...`
3. Si c'est le cas ✅, passez à l'étape 2

### Étape 2 : Forcer le Déploiement depuis le Bon Commit

**Sur Vercel :**

1. **Deployments** → Cliquez sur **"Deploy"** en haut à droite (bouton vert)
2. Dans la popup qui s'ouvre :
   - **Source** : Sélectionnez **"GitHub"**
   - **Repository** : `iaprojet26-cpu/quiz-orientation-professionnelle`
   - **Branch** : `main`
   - **Commit** : Cliquez sur le champ et sélectionnez **`8bd81d6`** (ou laissez "Latest" si c'est le dernier)
3. **Décochez** "Use existing Build Cache"
4. Cliquez sur **"Deploy"**

### Étape 3 : Vérifier le Déploiement

1. Attendez 2-3 minutes
2. Dans **Build Logs**, vérifiez la ligne :
   ```
   Cloning github.com/... (Branch: main, Commit: 8bd81d6)
   ```
3. Si vous voyez `8bd81d6` ✅, c'est le bon commit !

---

## 🔄 Alternative : Vérifier les Paramètres Git

Si le déploiement automatique ne fonctionne pas :

1. **Settings** → **Git**
2. Vérifiez que :
   - ✅ Le dépôt est bien connecté
   - ✅ "Automatic deployments" est activé
   - ✅ La branche `main` est surveillée
3. Si nécessaire, **déconnectez et reconnectez** le dépôt GitHub

---

## 🐛 Si ça ne Fonctionne Toujours Pas

### Option 1 : Reconnecter le Dépôt

1. **Settings** → **Git**
2. Cliquez sur **"Disconnect"** (ou les 3 points)
3. Cliquez sur **"Connect Git Repository"**
4. Sélectionnez à nouveau votre dépôt
5. Vercel va redéployer automatiquement

### Option 2 : Vérifier les Webhooks GitHub

1. Allez sur GitHub → Votre dépôt → **Settings** → **Webhooks**
2. Vérifiez qu'il y a un webhook Vercel
3. Si ce n'est pas le cas, Vercel devrait le créer automatiquement lors de la reconnexion

---

## ⏱️ Timeline Attendu

1. **0-30 secondes** : Vercel détecte le nouveau commit
2. **30s-2min** : Build en cours
3. **2-3 minutes** : Déploiement terminé

---

## ✅ Vérification Finale

Une fois le déploiement terminé :

1. **Deployments** → Vérifiez que le commit affiché est `8bd81d6`
2. **Build Logs** → Vérifiez que la ligne de clonage montre `Commit: 8bd81d6`
3. **Testez le site** → Les articles devraient maintenant fonctionner

---

*Le commit `8bd81d6` contient tous les correctifs pour les articles du blog !*

