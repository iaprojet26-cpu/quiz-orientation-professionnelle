# Configuration Monetag - Monétisation

## 📋 Prérequis

1. Avoir un compte Monetag actif
2. Avoir téléchargé le fichier `sw.js` depuis votre dashboard Monetag
3. Avoir votre Site ID Monetag

## 🔧 Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
# Monetag - Monétisation
VITE_MONETAG_ENABLED=true
VITE_MONETAG_SITE_ID=votre_site_id_monetag
VITE_MONETAG_OWNER_VERIFICATION=votre_code_verification_proprietaire
```

**Important :**
- `VITE_MONETAG_ENABLED` : Doit être `true` pour activer Monetag
- `VITE_MONETAG_SITE_ID` : Votre identifiant de site fourni par Monetag
- `VITE_MONETAG_OWNER_VERIFICATION` : Un code secret pour vérifier que vous êtes le propriétaire

### 2. Fichier Service Worker

Remplacez le fichier `public/sw.js` par le fichier téléchargé depuis votre compte Monetag.

**Étapes :**
1. Téléchargez `sw.js` depuis votre dashboard Monetag
2. Remplacez `public/sw.js` par ce fichier
3. Vérifiez que le fichier est bien dans le dossier `public/`

### 3. Vérification du propriétaire

Le système vérifie automatiquement :
- ✅ Que les variables d'environnement sont configurées
- ✅ Que le domaine correspond (`quizorientation.online` en production)
- ✅ Que le code de vérification est présent

## 🚀 Activation

Une fois configuré :

1. **En local :** Testez avec `npm run dev`
2. **En production :** 
   - Ajoutez les variables d'environnement dans Netlify (Settings > Environment variables)
   - Déployez le projet
   - Vérifiez dans la console du navigateur que Monetag s'initialise

## 🔍 Vérification

Ouvrez la console du navigateur (F12) et vérifiez les messages :
- ✅ `Monetag: Service Worker enregistré avec succès`
- ✅ `Monetag: Initialisé avec succès`

Si vous voyez :
- ⚠️ `Monetag: Désactivé (propriétaire non vérifié...)` → Vérifiez vos variables d'environnement
- ❌ `Monetag: Erreur...` → Vérifiez que le fichier `sw.js` est correct

## 🛡️ Sécurité

- Les variables d'environnement ne sont jamais exposées dans le code client
- Seul le propriétaire avec les bonnes variables peut activer Monetag
- Le domaine est vérifié en production

## 📝 Notes

- Le service worker s'enregistre automatiquement si le propriétaire est vérifié
- Le script Monetag se charge de manière asynchrone
- En cas de problème, vous pouvez désactiver en mettant `VITE_MONETAG_ENABLED=false`

