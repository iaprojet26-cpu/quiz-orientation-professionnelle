# 🔧 Guide : Configuration des Variables d'Environnement sur Vercel

## 📋 Liste des Variables Nécessaires

Voici toutes les variables d'environnement à configurer sur Vercel :

### Variables Obligatoires
1. `VITE_SUPABASE_URL` - URL de votre projet Supabase
2. `VITE_SUPABASE_ANON_KEY` - Clé anonyme Supabase

### Variables Optionnelles (mais recommandées)
3. `VITE_GA_MEASUREMENT_ID` - ID Google Analytics (défaut: G-0K73VG7X9Z)
4. `VITE_ADMIN_PASSWORD` - Mot de passe admin (défaut: admin123)
5. `VITE_MONETAG_ENABLED` - Activer Monetag (true/false)
6. `VITE_MONETAG_SITE_ID` - ID du site Monetag
7. `VITE_MONETAG_OWNER_VERIFICATION` - Code de vérification Monetag

---

## 🚀 Méthode 1 : Via l'Interface Web Vercel (Recommandé)

### Étape 1 : Accéder aux Paramètres du Projet

1. **Connectez-vous** à [vercel.com](https://vercel.com)
2. **Sélectionnez votre projet** `quiz-orientation-professionnelle`
3. Cliquez sur l'onglet **"Settings"** (Paramètres) en haut
4. Dans le menu de gauche, cliquez sur **"Environment Variables"** (Variables d'environnement)

### Étape 2 : Ajouter les Variables

Pour chaque variable, suivez ces étapes :

1. Cliquez sur le bouton **"Add New"** ou **"Add"**
2. Remplissez les champs :
   - **Key** : Le nom de la variable (ex: `VITE_SUPABASE_URL`)
   - **Value** : La valeur de la variable
   - **Environment** : Sélectionnez les environnements où appliquer :
     - ✅ **Production** (obligatoire)
     - ✅ **Preview** (recommandé pour tester)
     - ✅ **Development** (optionnel)
3. Cliquez sur **"Save"**

### Étape 3 : Ajouter Toutes les Variables

Répétez l'étape 2 pour chaque variable :

#### 1. VITE_SUPABASE_URL
```
Key: VITE_SUPABASE_URL
Value: https://xxxxx.supabase.co
Environment: Production, Preview
```

#### 2. VITE_SUPABASE_ANON_KEY
```
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environment: Production, Preview
```

#### 3. VITE_GA_MEASUREMENT_ID (Optionnel)
```
Key: VITE_GA_MEASUREMENT_ID
Value: G-0K73VG7X9Z
Environment: Production, Preview
```

#### 4. VITE_ADMIN_PASSWORD (Optionnel mais recommandé)
```
Key: VITE_ADMIN_PASSWORD
Value: VotreMotDePasseSecurise2025!
Environment: Production, Preview
```

#### 5. VITE_MONETAG_ENABLED (Optionnel)
```
Key: VITE_MONETAG_ENABLED
Value: true
Environment: Production, Preview
```

#### 6. VITE_MONETAG_SITE_ID (Optionnel - si Monetag activé)
```
Key: VITE_MONETAG_SITE_ID
Value: VotreSiteIDMonetag
Environment: Production, Preview
```

#### 7. VITE_MONETAG_OWNER_VERIFICATION (Optionnel - si Monetag activé)
```
Key: VITE_MONETAG_OWNER_VERIFICATION
Value: 1670db72de09a5c49b5cb6475cd93b5b
Environment: Production, Preview
```

### Étape 4 : Redéployer

Après avoir ajouté toutes les variables :

1. Allez dans l'onglet **"Deployments"** (Déploiements)
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Sélectionnez **"Redeploy"** (Redéployer)
4. Vérifiez que **"Use existing Build Cache"** est **décoché**
5. Cliquez sur **"Redeploy"**

---

## 💻 Méthode 2 : Via Vercel CLI (Avancé)

Si vous préférez utiliser la ligne de commande :

### Installation de Vercel CLI

```bash
npm install -g vercel
```

### Connexion

```bash
vercel login
```

### Ajouter les Variables

```bash
# Supabase
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production

# Google Analytics
vercel env add VITE_GA_MEASUREMENT_ID production

# Admin Password
vercel env add VITE_ADMIN_PASSWORD production

# Monetag (si activé)
vercel env add VITE_MONETAG_ENABLED production
vercel env add VITE_MONETAG_SITE_ID production
vercel env add VITE_MONETAG_OWNER_VERIFICATION production
```

À chaque commande, Vercel vous demandera de saisir la valeur.

### Redéployer

```bash
vercel --prod
```

---

## 🔍 Où Trouver les Valeurs ?

### Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous et sélectionnez votre projet
3. Allez dans **Settings** → **API**
4. Vous trouverez :
   - **Project URL** → C'est votre `VITE_SUPABASE_URL`
   - **anon public** key → C'est votre `VITE_SUPABASE_ANON_KEY`

### Google Analytics

1. Allez sur [analytics.google.com](https://analytics.google.com)
2. Sélectionnez votre propriété
3. Allez dans **Admin** → **Data Streams**
4. Cliquez sur votre stream web
5. L'**Measurement ID** est au format `G-XXXXXXXXXX`

### Monetag

1. Allez sur votre dashboard Monetag
2. Dans les paramètres du site, vous trouverez :
   - **Site ID** → `VITE_MONETAG_SITE_ID`
   - **Owner Verification** → `VITE_MONETAG_OWNER_VERIFICATION`

---

## ✅ Vérification

Après avoir configuré les variables et redéployé :

1. **Visitez votre site** sur Vercel
2. **Ouvrez la console** du navigateur (F12)
3. **Vérifiez qu'il n'y a pas d'erreurs** liées aux variables manquantes
4. **Testez les fonctionnalités** :
   - ✅ Le quiz fonctionne
   - ✅ Les articles s'affichent
   - ✅ Google Analytics fonctionne (vérifier dans Network)
   - ✅ Monetag fonctionne (si activé)

---

## 🔒 Sécurité

### Bonnes Pratiques

1. **Ne partagez JAMAIS** vos variables d'environnement publiquement
2. **Utilisez des mots de passe forts** pour `VITE_ADMIN_PASSWORD`
3. **Ne commitez JAMAIS** les fichiers `.env` dans Git
4. **Utilisez des valeurs différentes** pour Production et Development si nécessaire
5. **Régénérez les clés** si elles sont compromises

### Variables Sensibles

Les variables suivantes sont **sensibles** et doivent être protégées :
- `VITE_SUPABASE_ANON_KEY` (bien que publique, ne doit pas être exposée inutilement)
- `VITE_ADMIN_PASSWORD` (très sensible)
- `VITE_MONETAG_OWNER_VERIFICATION` (sensible)

---

## 🐛 Dépannage

### Problème : Variables non chargées

**Symptômes** :
- Erreurs dans la console : `VITE_SUPABASE_URL is undefined`
- Le site ne fonctionne pas correctement

**Solutions** :
1. Vérifiez que les noms des variables sont **exactement** corrects (sensible à la casse)
2. Vérifiez que les variables sont ajoutées pour l'environnement **Production**
3. **Redéployez** après avoir ajouté les variables
4. Vérifiez que vous n'avez pas d'espaces avant/après les valeurs

### Problème : Build échoue

**Solutions** :
1. Vérifiez les logs de build dans Vercel
2. Vérifiez que toutes les variables obligatoires sont présentes
3. Testez le build en local : `npm run build`

### Problème : Variables différentes entre environnements

**Solution** :
- Vous pouvez avoir des valeurs différentes pour Production, Preview et Development
- Assurez-vous de configurer les bonnes valeurs pour chaque environnement

---

## 📝 Checklist

Avant de déployer, vérifiez :

- [ ] `VITE_SUPABASE_URL` est configuré
- [ ] `VITE_SUPABASE_ANON_KEY` est configuré
- [ ] `VITE_GA_MEASUREMENT_ID` est configuré (si utilisé)
- [ ] `VITE_ADMIN_PASSWORD` est configuré avec un mot de passe fort
- [ ] Variables Monetag configurées (si Monetag est activé)
- [ ] Toutes les variables sont dans l'environnement **Production**
- [ ] Le site a été redéployé après l'ajout des variables
- [ ] Le site fonctionne correctement en production

---

## 🎉 C'est Prêt !

Une fois toutes les variables configurées et le site redéployé, votre application devrait fonctionner parfaitement sur Vercel !

**Besoin d'aide ?** Consultez la [documentation Vercel](https://vercel.com/docs/concepts/projects/environment-variables)

---

*Dernière mise à jour : Décembre 2025*

