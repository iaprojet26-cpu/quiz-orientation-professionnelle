# 📄 Guide du Sitemap.xml

## ✅ Fichier créé

Le fichier `sitemap.xml` a été créé dans le dossier `public/` et sera automatiquement copié à la racine de votre site lors du build sur Netlify.

## 📍 Emplacement

- **Fichier source** : `public/sitemap.xml`
- **URL publique** : `https://quizorientation.online/sitemap.xml`
- **Fichier robots.txt** : `public/robots.txt` (créé aussi pour le SEO)

## 🔍 Vérification

Une fois déployé, vous pouvez vérifier que le sitemap est accessible :
- Ouvrez : `https://quizorientation.online/sitemap.xml`
- Il devrait afficher le contenu XML

## 🔄 Mise à jour du sitemap

### Méthode 1 : Mise à jour manuelle

1. Ouvrez `public/sitemap.xml`
2. Modifiez la date dans `<lastmod>` avec la date du jour au format `YYYY-MM-DD`
3. Commitez et poussez sur GitHub
4. Netlify redéploiera automatiquement

### Méthode 2 : Script automatique (optionnel)

Pour générer automatiquement le sitemap avec la date du jour, vous pouvez créer un script :

```javascript
// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

const today = new Date().toISOString().split('T')[0];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <url>
    <loc>https://quizorientation.online</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="https://quizorientation.online" />
    <xhtml:link rel="alternate" hreflang="en" href="https://quizorientation.online" />
    <xhtml:link rel="alternate" hreflang="ar" href="https://quizorientation.online" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://quizorientation.online" />
  </url>
  
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('✅ Sitemap généré avec la date:', today);
```

## 📊 Soumettre à Google Search Console

1. Connectez-vous à [Google Search Console](https://search.google.com/search-console)
2. Ajoutez votre propriété `quizorientation.online` si ce n'est pas déjà fait
3. Allez dans "Sitemaps" dans le menu de gauche
4. Entrez : `sitemap.xml`
5. Cliquez sur "Soumettre"

## 🔗 Structure du sitemap

Le sitemap actuel inclut :
- ✅ **Page d'accueil** : `https://quizorientation.online`
  - Priority : 1.0 (page principale)
  - Changefreq : weekly (mise à jour hebdomadaire)
  - Variantes linguistiques : FR, EN, AR

## 📝 Notes importantes

- Le sitemap respecte le **protocole standard de Google Search Console**
- Les variantes linguistiques (`hreflang`) sont incluses pour le SEO multilingue
- Le fichier sera automatiquement accessible après le prochain déploiement sur Netlify
- Le `robots.txt` pointe vers le sitemap pour faciliter la découverte par les robots

## ✅ Prochaines étapes

1. ✅ Sitemap créé
2. ✅ robots.txt créé
3. ⏳ Déployer sur Netlify (automatique au prochain push)
4. ⏳ Soumettre le sitemap à Google Search Console
5. ⏳ Vérifier l'indexation dans Google Search Console

