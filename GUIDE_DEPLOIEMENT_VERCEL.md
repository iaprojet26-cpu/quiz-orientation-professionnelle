# 🚀 Guide de Déploiement sur Vercel

**Date** : 25 janvier 2026  
**Plateforme** : Vercel  
**Problème résolu** : Erreur 404 sur `/blog` avec www

---

## ✅ Configuration Appliquée

### Fichier `vercel.json` créé ✅

Le fichier `vercel.json` a été créé à la racine du projet avec :

1. **Rewrites** : Toutes les routes sont réécrites vers `/index.html` pour gérer le SPA React Router
2. **Redirects** :
   - Redirection www → non-www pour tous les chemins
   - Redirection `/blog/` → `/blog` (sans trailing slash)
   - Redirection `/fr/` → `/`
   - Correction URL arabe incorrecte
3. **Headers** : Headers de sécurité et configuration pour `ads.txt`

---

## 📋 Configuration du Fichier vercel.json

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.quizorientation.online"
        }
      ],
      "destination": "https://quizorientation.online/:path*",
      "permanent": true
    },
    {
      "source": "/blog/",
      "destination": "/blog",
      "permanent": true
    },
    {
      "source": "/fr/",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/ar/blog/2025-القطاعات-التوظيف-المغرب",
      "destination": "/ar/blog/القطاعات-التوظيف-المغرب-2025",
      "permanent": true
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

---

## 🚀 Déploiement sur Vercel

### Option 1 : Déploiement via GitHub (Recommandé)

1. **Aller sur** [Vercel Dashboard](https://vercel.com/dashboard)
2. **Cliquer sur** "Add New Project"
3. **Importer depuis GitHub** :
   - Sélectionner votre dépôt `quiz-orientation-professionnelle`
   - Autoriser Vercel à accéder à votre compte GitHub si nécessaire

4. **Configurer le projet** :
   - **Framework Preset** : Vite (détecté automatiquement)
   - **Root Directory** : `./` (racine)
   - **Build Command** : `npm run build` (détecté automatiquement)
   - **Output Directory** : `dist` (détecté automatiquement)

5. **Ajouter les variables d'environnement** :
   - **VITE_SUPABASE_URL** : Votre URL Supabase
   - **VITE_SUPABASE_ANON_KEY** : Votre clé anonyme Supabase

6. **Cliquer sur** "Deploy"

### Option 2 : Déploiement via CLI Vercel

```bash
# Installer Vercel CLI (si pas déjà installé)
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Ajouter les variables d'environnement
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

---

## 🌐 Configuration du Domaine Personnalisé

### 1. Ajouter le Domaine dans Vercel

1. **Dans Vercel Dashboard** :
   - Aller dans **Settings** > **Domains**
   - Cliquer sur **"Add Domain"**
   - Entrer : `quizorientation.online`
   - Suivre les instructions pour configurer les DNS

### 2. Configuration DNS

**Pour un domaine sur Vercel**, vous devez ajouter les enregistrements DNS suivants :

- **Type A** : `@` → `76.76.21.21` (ou l'IP fournie par Vercel)
- **Type CNAME** : `www` → `cname.vercel-dns.com` (ou le CNAME fourni par Vercel)

**Note** : Vercel fournira les valeurs exactes à utiliser dans le dashboard.

### 3. Redirection www → non-www

**La redirection www → non-www est déjà configurée dans `vercel.json`** :

```json
{
  "source": "/:path*",
  "has": [
    {
      "type": "host",
      "value": "www.quizorientation.online"
    }
  ],
  "destination": "https://quizorientation.online/:path*",
  "permanent": true
}
```

Cette configuration redirige automatiquement toutes les URLs avec `www.` vers la version sans `www.`.

---

## ✅ Vérifications Après Déploiement

### 1. Vérifier le Déploiement

1. **Dans Vercel Dashboard** :
   - Aller dans **Deployments**
   - Vérifier que le dernier déploiement est "Ready" (vert)
   - Vérifier qu'il n'y a pas d'erreurs dans les logs

### 2. Tester les URLs

**Tester en navigation privée** (Ctrl+Shift+N ou Cmd+Shift+N) :

1. **Tester** : `https://quizorientation.online/blog` (sans www)
   - ✅ Devrait fonctionner (pas d'erreur 404)

2. **Tester** : `https://www.quizorientation.online/blog` (avec www)
   - ✅ Devrait rediriger vers `https://quizorientation.online/blog`
   - ✅ Puis charger la page blog (pas d'erreur 404)

3. **Tester** : `https://quizorientation.online/` (homepage)
   - ✅ Devrait fonctionner

4. **Tester** : `https://quizorientation.online/en/` (page anglaise)
   - ✅ Devrait fonctionner

5. **Tester** : `https://quizorientation.online/ar/` (page arabe)
   - ✅ Devrait fonctionner

### 3. Vérifier les Redirections

**Dans Vercel Dashboard** :

1. **Settings** > **Domains**
   - Vérifier que `quizorientation.online` est configuré
   - Vérifier que `www.quizorientation.online` est configuré (si nécessaire)

2. **Deployments** > Dernier déploiement > **View Function Logs**
   - Vérifier qu'il n'y a pas d'erreurs
   - Vérifier que les rewrites fonctionnent

---

## 🔄 Déploiements Automatiques

**Vercel déploie automatiquement** à chaque push sur GitHub :

1. **Pousser les modifications** :
   ```bash
   git add .
   git commit -m "fix: Configuration Vercel - Ajout vercel.json pour résoudre 404 /blog"
   git push origin main
   ```

2. **Vercel détecte automatiquement** le push et redéploie

3. **Vérifier le déploiement** dans Vercel Dashboard

---

## 🐛 Dépannage

### Problème : Erreur 404 sur `/blog` persiste

**Solutions** :

1. **Vérifier que `vercel.json` est à la racine du projet**
   - Le fichier doit être dans le même dossier que `package.json`

2. **Vérifier que le fichier est commité dans Git**
   ```bash
   git status
   # Vérifier que vercel.json est listé
   ```

3. **Vérifier les logs de déploiement Vercel**
   - Aller dans **Deployments** > Dernier déploiement > **View Function Logs**
   - Chercher des erreurs concernant `vercel.json`

4. **Vider le cache Vercel**
   - Dans Vercel Dashboard, redéployer manuellement
   - Ou attendre quelques minutes pour la propagation

### Problème : Redirection www → non-www ne fonctionne pas

**Solutions** :

1. **Vérifier la configuration DNS**
   - Vérifier que les enregistrements DNS sont corrects
   - Attendre jusqu'à 48h pour la propagation DNS

2. **Vérifier dans Vercel Dashboard**
   - **Settings** > **Domains**
   - Vérifier que les deux domaines (www et non-www) sont configurés

3. **Vérifier la syntaxe dans `vercel.json`**
   - Vérifier que la redirection www → non-www est bien présente
   - Vérifier la syntaxe JSON (pas d'erreurs)

### Problème : Variables d'environnement non chargées

**Solutions** :

1. **Vérifier dans Vercel Dashboard**
   - **Settings** > **Environment Variables**
   - Vérifier que `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont présentes

2. **Redéployer après avoir ajouté les variables**
   - Les variables doivent être ajoutées avant le déploiement
   - Ou redéployer manuellement après les avoir ajoutées

---

## 📊 Checklist de Déploiement

### Avant le Déploiement
- [ ] Le fichier `vercel.json` est créé à la racine du projet
- [ ] Le projet fonctionne en local (`npm run dev`)
- [ ] Le build fonctionne en local (`npm run build`)
- [ ] Tous les fichiers sont commités dans Git
- [ ] Le code est poussé sur GitHub

### Configuration Vercel
- [ ] Le projet est importé dans Vercel Dashboard
- [ ] Les variables d'environnement sont configurées
- [ ] Le domaine personnalisé est configuré
- [ ] Les DNS sont configurés correctement

### Après le Déploiement
- [ ] Le déploiement est réussi (statut "Ready")
- [ ] `https://quizorientation.online/blog` fonctionne (sans www)
- [ ] `https://www.quizorientation.online/blog` fonctionne (avec www, redirige)
- [ ] Toutes les routes fonctionnent correctement
- [ ] Les redirections fonctionnent comme prévu

---

## 📞 Support Vercel

Si le problème persiste :

1. **Vérifier la documentation Vercel** :
   - [Documentation Vercel - Redirects](https://vercel.com/docs/redirects)
   - [Documentation Vercel - Rewrites](https://vercel.com/docs/edge-network/rewrites)

2. **Contacter le support Vercel** :
   - [Support Vercel](https://vercel.com/support)
   - Fournir les logs de déploiement et le fichier `vercel.json`

---

## ✅ Résumé

**Problème** : Erreur 404 sur `https://www.quizorientation.online/blog`  
**Solution** : Création du fichier `vercel.json` avec :
- Rewrites pour gérer le SPA React Router
- Redirects pour www → non-www
- Redirects pour normaliser les URLs
- Headers de sécurité

**Action immédiate** : Pousser les modifications vers Git, Vercel redéploiera automatiquement.

---

**✅ Le fichier `vercel.json` est prêt. Il faut maintenant pousser les modifications vers Git pour que Vercel les déploie automatiquement.**
