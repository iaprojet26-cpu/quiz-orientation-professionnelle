# 📊 Guide : Configuration Google Analytics 4

## ✅ Google Analytics 4 Intégré

Google Analytics 4 a été intégré dans l'application pour suivre les performances et les interactions des utilisateurs.

---

## 🔧 Configuration

### 1. Obtenir votre ID de Mesure Google Analytics

1. Allez sur [Google Analytics](https://analytics.google.com/)
2. Créez un compte ou connectez-vous
3. Créez une propriété pour votre site
4. Copiez votre **ID de mesure** (format : `G-XXXXXXXXXX`)

### 2. Configurer dans l'Application

#### Option 1 : Variable d'environnement (Recommandé)

1. Créez ou modifiez le fichier `.env.local` à la racine du projet
2. Ajoutez la ligne suivante :

```env
VITE_GA_MEASUREMENT_ID=G-VOTRE_ID_ICI
```

3. Redémarrez le serveur de développement

#### Option 2 : Modification directe dans `index.html`

1. Ouvrez `index.html`
2. Remplacez `G-XXXXXXXXXX` par votre ID de mesure (2 occurrences)
3. Sauvegardez

---

## 📈 Événements Trackés

L'application track automatiquement les événements suivants :

### Quiz
- **`quiz_start`** : Quand l'utilisateur commence le quiz
- **`quiz_question`** : À chaque réponse à une question
- **`quiz_complete`** : Quand le quiz est complété (avec nom du profil)

### Blog
- **`article_view`** : Quand un article de blog est consulté

### Contact
- **`contact_form_submit`** : Quand le formulaire de contact est soumis

---

## 🔍 Vérification

### En Local

1. Ouvrez la console du navigateur (F12)
2. Allez dans l'onglet **Network**
3. Filtrez par `gtag` ou `collect`
4. Vous devriez voir des requêtes vers Google Analytics

### En Production

1. Allez sur Google Analytics
2. **Temps réel** > **Vue d'ensemble**
3. Visitez votre site
4. Vous devriez voir votre visite apparaître dans les 30 secondes

---

## 📊 Tableaux de Bord Recommandés

Créez des tableaux de bord dans Google Analytics pour suivre :

1. **Performance du Quiz**
   - Nombre de quiz commencés
   - Taux de complétion
   - Profils les plus populaires

2. **Contenu du Blog**
   - Articles les plus lus
   - Temps de lecture moyen
   - Taux de rebond

3. **Trafic**
   - Sources de trafic
   - Pages les plus visitées
   - Taux de conversion

---

## ⚠️ Important

- **Respect de la vie privée** : Informez les utilisateurs dans votre politique de confidentialité que vous utilisez Google Analytics
- **RGPD** : Pour l'UE, vous devrez peut-être demander le consentement avant de charger GA
- **Performance** : Google Analytics est chargé de manière asynchrone pour ne pas ralentir le site

---

## 🚀 Prochaines Étapes

1. ✅ Configurer votre ID de mesure
2. ✅ Tester en local
3. ✅ Vérifier en production
4. ✅ Créer des tableaux de bord personnalisés
5. ✅ Configurer des objectifs de conversion

---

**Date :** 2025-11-06

