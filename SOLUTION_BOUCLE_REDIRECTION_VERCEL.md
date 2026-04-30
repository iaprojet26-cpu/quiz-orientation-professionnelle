# 🔧 Solution Boucle de Redirection Vercel

**Date** : 25 janvier 2026  
**Problème** : Boucle de redirection infinie sur `quizorientation.online/blog`  
**Cause** : Conflit entre les redirects et les rewrites dans `vercel.json`

---

## ✅ Solution Appliquée

### Configuration Simplifiée

J'ai simplifié le fichier `vercel.json` en supprimant **toutes les redirections** qui causaient la boucle :

**Avant** (causait la boucle) :
```json
{
  "rewrites": [...],
  "redirects": [
    {
      "source": "/:path*",
      "has": [{"type": "host", "value": "www.quizorientation.online"}],
      "destination": "https://quizorientation.online/:path*",
      "permanent": true
    }
  ]
}
```

**Après** (configuration minimale) :
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [...]
}
```

---

## 🔍 Pourquoi la Boucle se Produisait

La redirection www → non-www dans `vercel.json` entrait en conflit avec les rewrites, créant une boucle infinie :

1. L'utilisateur accède à `quizorientation.online/blog`
2. La redirection www → non-www pourrait être déclenchée (même sans www)
3. Les rewrites tentent de servir `/index.html`
4. Un conflit se produit → boucle infinie

---

## ✅ Solution : Configuration Minimale

### 1. Rewrites Uniquement pour le SPA

Les **rewrites** sont suffisants pour gérer le SPA React Router :
- Toutes les routes sont réécrites vers `/index.html`
- React Router gère ensuite le routing côté client
- Pas de changement d'URL dans le navigateur

### 2. Redirection www → non-www via Vercel Dashboard

**Au lieu d'utiliser `vercel.json`**, configurez la redirection www → non-www directement dans **Vercel Dashboard** :

1. **Aller sur** [Vercel Dashboard](https://vercel.com/dashboard)
2. **Sélectionner** votre projet
3. **Settings** > **Domains**
4. **Ajouter** `www.quizorientation.online` comme domaine
5. **Configurer** la redirection www → non-www dans les paramètres du domaine

**Avantages** :
- Pas de conflit avec les rewrites
- Configuration plus simple
- Gestion centralisée dans Vercel Dashboard

---

## 🚀 Actions à Faire

### 1. Pousser la Configuration Simplifiée

```bash
# Ajouter le fichier modifié
git add vercel.json

# Commit
git commit -m "fix: Simplification vercel.json - Suppression redirects pour éviter boucle"

# Push
git push origin main
```

### 2. Configurer la Redirection www → non-www dans Vercel Dashboard

1. **Aller sur** [Vercel Dashboard](https://vercel.com/dashboard)
2. **Sélectionner** votre projet `quiz-orientation-professionnelle`
3. **Settings** > **Domains**
4. **Vérifier** que `quizorientation.online` est configuré
5. **Ajouter** `www.quizorientation.online` si ce n'est pas déjà fait
6. **Configurer** la redirection www → non-www dans les paramètres du domaine

### 3. Attendre le Redéploiement

Vercel redéploiera automatiquement après le push (2-5 minutes).

### 4. Tester Après le Déploiement

**Tester en navigation privée** (Ctrl+Shift+N ou Cmd+Shift+N) :

1. **Tester** : `https://quizorientation.online/blog` (sans www)
   - ✅ Devrait fonctionner (pas de boucle, pas d'erreur 404)

2. **Tester** : `https://www.quizorientation.online/blog` (avec www)
   - ✅ Devrait rediriger vers `https://quizorientation.online/blog` (si configuré dans Vercel Dashboard)
   - ✅ Puis charger la page blog (pas d'erreur 404, pas de boucle)

---

## 📊 Configuration Finale

### Fichier `vercel.json` (Minimal)

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/ads.txt",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/plain; charset=utf-8"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        },
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

### Redirection www → non-www

**À configurer dans Vercel Dashboard** (pas dans `vercel.json`) :
- **Settings** > **Domains** > Configurer la redirection

---

## 🐛 Dépannage

### Si la Boucle Persiste

1. **Vérifier que le nouveau `vercel.json` est déployé**
   - Aller dans **Vercel Dashboard** > **Deployments**
   - Vérifier que le dernier déploiement contient le nouveau `vercel.json`

2. **Vider le Cache du Navigateur**
   - Tester en navigation privée
   - Ou vider le cache (Ctrl+Shift+R)

3. **Vérifier les Logs Vercel**
   - **Deployments** > Dernier déploiement > **View Function Logs**
   - Chercher des erreurs

### Si www → non-www ne Fonctionne Pas

1. **Vérifier dans Vercel Dashboard**
   - **Settings** > **Domains**
   - Vérifier que les deux domaines sont configurés
   - Configurer la redirection dans les paramètres du domaine

2. **Attendre la Propagation DNS**
   - La propagation DNS peut prendre jusqu'à 48h
   - Utiliser [whatsmydns.net](https://www.whatsmydns.net) pour vérifier

---

## ✅ Résumé

**Problème** : Boucle de redirection infinie sur `quizorientation.online/blog`  
**Cause** : Conflit entre les redirects et les rewrites dans `vercel.json`  
**Solution** :
1. Configuration minimale dans `vercel.json` (rewrites uniquement)
2. Redirection www → non-www configurée dans Vercel Dashboard

**Action immédiate** : Pousser les modifications et configurer la redirection www → non-www dans Vercel Dashboard.

---

**✅ La configuration est maintenant simplifiée. Il faut pousser les modifications et configurer la redirection www → non-www dans Vercel Dashboard.**
