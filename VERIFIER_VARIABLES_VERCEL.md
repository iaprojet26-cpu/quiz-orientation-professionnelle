# ✅ Vérifier que les Variables d'Environnement sont Bien Chargées sur Vercel

## 🔍 Problème : "Supabase non configuré"

Si vous voyez ce message dans la console, cela signifie que les variables d'environnement ne sont **pas chargées correctement**.

---

## 📋 Étape 1 : Vérifier les Variables dans Vercel

1. **Allez sur Vercel** → Votre projet
2. **Settings** → **Environment Variables**
3. **Vérifiez que ces variables existent** :
   - ✅ `VITE_SUPABASE_URL`
   - ✅ `VITE_SUPABASE_ANON_KEY`

4. **Pour chaque variable, vérifiez** :
   - ✅ Le nom est **exactement** correct (sensible à la casse)
   - ✅ La valeur est **complète** (pas tronquée)
   - ✅ L'environnement est **Production** (et Preview si vous voulez)

---

## 🔄 Étape 2 : Redéployer SANS Cache

**IMPORTANT** : Après avoir ajouté/modifié des variables, vous DEVEZ redéployer :

1. **Deployments** → Trouvez le dernier déploiement
2. Cliquez sur les **3 points** (⋯)
3. **Redeploy**
4. **DÉCOCHEZ** "Use existing Build Cache" ⚠️
5. Cliquez sur **Redeploy**

---

## 🧪 Étape 3 : Vérifier dans la Console

Après le redéploiement :

1. **Ouvrez votre site** sur Vercel
2. **Ouvrez la console** (F12 → Console)
3. **Rechargez la page** (F5)
4. **Vérifiez les messages** :

### ✅ Si c'est bon :
- Vous ne devriez **PAS** voir : `Supabase non configuré`
- Vous devriez voir des logs normaux

### ❌ Si c'est mauvais :
- Vous voyez : `Supabase non configuré - utilisation des données mock uniquement`
- **Solution** : Les variables ne sont pas chargées → Vérifiez l'étape 1 et 2

---

## 🔍 Étape 4 : Vérifier les Logs de Build

Dans Vercel :

1. **Deployments** → Cliquez sur le dernier déploiement
2. **Build Logs**
3. **Cherchez** des messages comme :
   - `VITE_SUPABASE_URL` (devrait apparaître dans les logs)
   - Des erreurs liées aux variables

---

## 🐛 Dépannage

### Problème : Variables configurées mais toujours "Supabase non configuré"

**Solutions** :
1. ✅ Vérifiez que les noms sont **exactement** : `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
2. ✅ Vérifiez qu'elles sont dans l'environnement **Production**
3. ✅ **Redéployez SANS cache** (étape 2)
4. ✅ Vérifiez qu'il n'y a pas d'espaces avant/après les valeurs
5. ✅ Vérifiez que les valeurs sont complètes (pas tronquées)

### Problème : Les variables apparaissent dans les logs mais pas dans l'app

**Solution** :
- Les variables sont peut-être dans le mauvais environnement
- Vérifiez qu'elles sont dans **Production** ET **Preview**

---

## 📝 Checklist

- [ ] Variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` existent dans Vercel
- [ ] Variables sont dans l'environnement **Production**
- [ ] Noms des variables sont **exactement** corrects (sensible à la casse)
- [ ] Valeurs sont complètes (pas tronquées)
- [ ] Projet redéployé **SANS cache** après configuration
- [ ] Console ne montre plus "Supabase non configuré"
- [ ] Site fonctionne correctement

---

## 🎯 Test Rapide

1. Ouvrez la console (F12)
2. Tapez : `console.log(import.meta.env.VITE_SUPABASE_URL)`
3. Si ça affiche `undefined` → Variables pas chargées
4. Si ça affiche votre URL → Variables chargées ✅

---

*Dernière mise à jour : Décembre 2025*

