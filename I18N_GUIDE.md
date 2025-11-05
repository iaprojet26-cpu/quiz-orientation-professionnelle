# 🌍 Guide du Système Multilingue

## ✅ Fonctionnalités Implémentées

- ✅ **3 langues supportées** : Français (FR), Anglais (EN), Arabe (AR)
- ✅ **Détection automatique** de la langue du navigateur
- ✅ **Sauvegarde dans localStorage** pour conserver le choix
- ✅ **Support RTL** automatique pour l'arabe
- ✅ **Composant LanguageSelector** avec drapeaux
- ✅ **Traductions intégrées** dans tous les composants

## 📁 Structure des Fichiers

```
src/
├── locales/
│   ├── fr/translation.json    # Traductions françaises
│   ├── en/translation.json    # Traductions anglaises
│   └── ar/translation.json    # Traductions arabes
├── i18n/
│   └── config.js              # Configuration i18next
└── components/
    └── LanguageSelector.jsx    # Composant de sélection de langue
```

## 🎯 Utilisation

### Changer de langue

Le composant `LanguageSelector` est affiché en haut à droite de l'application. Cliquez sur un drapeau pour changer la langue instantanément.

### Utiliser les traductions dans un composant

```jsx
import { useTranslation } from 'react-i18next'

function MonComposant() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('header.title')}</h1>
      <p>{t('header.subtitle')}</p>
    </div>
  )
}
```

### Traductions avec variables

```jsx
// Dans translation.json
{
  "question_count": "Question {{current}} sur {{total}}"
}

// Dans le composant
{t('question_count', { current: 1, total: 12 })}
// Résultat: "Question 1 sur 12"
```

## 📝 Ajouter de Nouvelles Traductions

1. **Ouvrez les 3 fichiers de traduction** :
   - `src/locales/fr/translation.json`
   - `src/locales/en/translation.json`
   - `src/locales/ar/translation.json`

2. **Ajoutez la même clé dans les 3 fichiers** :

```json
// fr/translation.json
{
  "nouvelle_section": {
    "nouveau_texte": "Bonjour"
  }
}

// en/translation.json
{
  "nouvelle_section": {
    "nouveau_texte": "Hello"
  }
}

// ar/translation.json
{
  "nouvelle_section": {
    "nouveau_texte": "مرحبا"
  }
}
```

3. **Utilisez dans votre composant** :
```jsx
{t('nouvelle_section.nouveau_texte')}
```

## 🔄 Support RTL (Right-to-Left)

Le support RTL est **automatique** pour l'arabe :
- Direction du texte inversée
- Alignement à droite
- Marges et paddings inversés
- Bordures ajustées

Les styles RTL sont définis dans `src/index.css` avec la classe `.rtl`.

## 🎨 Personnalisation du LanguageSelector

Le composant `LanguageSelector` peut être personnalisé dans `src/components/LanguageSelector.jsx` :
- Modifier les drapeaux
- Changer les couleurs
- Ajouter d'autres langues

## 🔍 Détection de la Langue

L'ordre de détection est :
1. **localStorage** (si déjà choisi)
2. **Paramètres du navigateur** (langue du système)
3. **Fallback** : Français (fr)

## 📚 Documentation i18next

Pour plus d'informations sur i18next :
- [Documentation officielle](https://www.i18next.com/)
- [React i18next](https://react.i18next.com/)

## ⚠️ Notes Importantes

- Les **questions et réponses** viennent de Supabase et ne sont **pas traduites** (contenu dynamique)
- Les **métiers et formations** viennent de Supabase et ne sont **pas traduites** (contenu dynamique)
- Seuls les **textes de l'interface** sont traduits
- Pour traduire le contenu de Supabase, il faudrait créer des colonnes multilingues dans la base de données

## 🚀 Prochaines Étapes (Optionnel)

Pour traduire le contenu de Supabase :
1. Ajouter des colonnes `texte_fr`, `texte_en`, `texte_ar` dans les tables
2. Modifier les services pour charger la traduction selon la langue
3. Mettre à jour les fichiers de seed avec les traductions

