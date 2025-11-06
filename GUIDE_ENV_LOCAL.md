# 📝 Guide : Configuration de .env.local

## ✅ Variable VITE_ADMIN_PASSWORD Ajoutée

La variable `VITE_ADMIN_PASSWORD` a été ajoutée à votre fichier `.env.local`.

---

## 🔐 Configuration du Mot de Passe Admin

### Option 1 : Modifier le Mot de Passe (Recommandé)

1. **Ouvrez le fichier `.env.local`** à la racine du projet
2. **Trouvez la ligne** : `VITE_ADMIN_PASSWORD=admin123`
3. **Remplacez** `admin123` par votre mot de passe sécurisé
4. **Sauvegardez** le fichier

**Exemple :**
```env
VITE_ADMIN_PASSWORD=MonMotDePasseSecurise2025!
```

### Option 2 : Via PowerShell

```powershell
# Remplacer le mot de passe
(Get-Content .env.local) -replace 'VITE_ADMIN_PASSWORD=.*', 'VITE_ADMIN_PASSWORD=votre_nouveau_mot_de_passe' | Set-Content .env.local
```

---

## 📋 Contenu du Fichier .env.local

Votre fichier `.env.local` devrait contenir :

```env
# Supabase Configuration
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase

# Admin Password
VITE_ADMIN_PASSWORD=admin123
```

---

## ⚠️ Important

1. **Ne commitez JAMAIS** `.env.local` dans Git (déjà dans `.gitignore`)
2. **Utilisez un mot de passe fort** en production
3. **Redémarrez le serveur** après modification :
   ```bash
   # Arrêtez le serveur (Ctrl+C)
   # Puis relancez :
   npm run dev
   ```

---

## 🚀 Configuration en Production (Netlify)

Pour la production, ajoutez la variable dans Netlify :

1. Allez sur [app.netlify.com](https://app.netlify.com)
2. Sélectionnez votre site
3. Allez dans **Site settings** > **Environment variables**
4. Cliquez sur **Add variable**
5. Ajoutez :
   - **Key** : `VITE_ADMIN_PASSWORD`
   - **Value** : Votre mot de passe sécurisé
6. Cliquez sur **Save**
7. **Redéployez** le site

---

## 🧪 Test

1. **Redémarrez le serveur** si nécessaire
2. **Allez sur** : `http://localhost:3000/admin/login`
3. **Entrez le mot de passe** configuré dans `.env.local`
4. **Vous devriez être connecté** et redirigé vers `/admin`

---

## 🔒 Sécurité

**Recommandations :**
- Utilisez au moins 12 caractères
- Mélangez majuscules, minuscules, chiffres et symboles
- Changez le mot de passe régulièrement
- Ne partagez jamais le mot de passe

**Exemple de mot de passe fort :**
```
QuizAdmin2025!@#Orientation
```

---

**Date :** 2025-11-06

