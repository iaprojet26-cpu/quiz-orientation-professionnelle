# Guide de Test Local - Nouveaux Articles

## 🚀 Démarrage du Serveur

### 1. Ouvrir un terminal dans le dossier du projet

```bash
cd "C:\Users\career center 1\Desktop\apps\APP ADS"
```

### 2. Installer les dépendances (si nécessaire)

```bash
npm install
```

### 3. Démarrer le serveur de développement

```bash
npm run dev
```

### 4. Attendre le message de confirmation

Vous devriez voir quelque chose comme :
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## 🔗 Liens pour Tester

### Page Blog (Liste des articles)
```
http://localhost:3000/blog
http://localhost:3000/fr/blog
http://localhost:3000/en/blog
http://localhost:3000/ar/blog
```

### Nouveaux Articles (Article 46)
- **FR** : `http://localhost:3000/fr/blog/competences-plus-recherchees-2026`
- **EN** : `http://localhost:3000/en/blog/most-in-demand-skills-2026`
- **AR** : `http://localhost:3000/ar/blog/المهارات-الأكثر-طلبا-2026`

### Nouveaux Articles (Article 47)
- **FR** : `http://localhost:3000/fr/blog/reconversion-professionnelle-2026`
- **EN** : `http://localhost:3000/en/blog/career-change-2026`
- **AR** : `http://localhost:3000/ar/blog/إعادة-التوجيه-المهني-2026`

### Nouveaux Articles (Article 48)
- **FR** : `http://localhost:3000/fr/blog/metiers-forte-croissance-2026-2030`
- **EN** : `http://localhost:3000/en/blog/high-growth-careers-2026-2030`
- **AR** : `http://localhost:3000/ar/blog/المهن-عالية-النمو-2026-2030`

### Nouveaux Articles (Article 49)
- **FR** : `http://localhost:3000/fr/blog/ameliorer-employabilite-2026`
- **EN** : `http://localhost:3000/en/blog/improve-employability-2026`
- **AR** : `http://localhost:3000/ar/blog/تحسين-القابلية-للتوظيف-2026`

### Nouveaux Articles (Article 50)
- **FR** : `http://localhost:3000/fr/blog/impact-ia-emploi-2026`
- **EN** : `http://localhost:3000/en/blog/ai-impact-employment-2026`
- **AR** : `http://localhost:3000/ar/blog/تأثير-الذكاء-الاصطناعي-التوظيف-2026`

## 🐛 Dépannage

### Problème : Le serveur ne démarre pas

**Solution 1** : Vérifier que le port 3000 n'est pas utilisé
```bash
netstat -ano | findstr :3000
```

Si le port est utilisé, tuez le processus ou changez le port dans `vite.config.js`

**Solution 2** : Vérifier les erreurs dans le terminal
- Regardez les messages d'erreur dans le terminal
- Vérifiez que `node_modules` existe
- Réinstallez les dépendances : `npm install`

### Problème : Les articles ne s'affichent pas

**Vérifications** :
1. Les fichiers existent dans `public/articles-seo/article-46` à `article-50`
2. Les fichiers `metadata.json` sont valides (format JSON)
3. Les fichiers `.md` existent pour chaque langue (fr.md, en.md, ar.md)

**Test** : Ouvrez directement un fichier metadata
```
http://localhost:3000/articles-seo/article-46/metadata.json
```

### Problème : Erreur 404 sur les articles

**Causes possibles** :
- Le slug dans `metadata.json` ne correspond pas à l'URL
- Le fichier markdown n'existe pas pour la langue demandée
- Le serveur n'a pas rechargé les nouveaux fichiers

**Solution** :
1. Redémarrez le serveur (`Ctrl+C` puis `npm run dev`)
2. Vérifiez les slugs dans `metadata.json`
3. Vérifiez que les fichiers `.md` existent

### Problème : Erreur dans la console du navigateur

**Ouvrez la console** (F12) et vérifiez :
- Erreurs de chargement de fichiers
- Erreurs JavaScript
- Erreurs de réseau (404, 500, etc.)

## ✅ Checklist de Test

- [ ] Le serveur démarre sans erreur
- [ ] La page `/blog` s'affiche
- [ ] Les 5 nouveaux articles apparaissent dans la liste
- [ ] Chaque article s'ouvre correctement (pas d'erreur 404)
- [ ] Le contenu markdown s'affiche correctement
- [ ] Les liens internes fonctionnent (test d'orientation, CV builder, etc.)
- [ ] Les versions EN et AR fonctionnent
- [ ] Pas d'erreurs dans la console du navigateur (F12)

## 📝 Notes

- Le serveur Vite recharge automatiquement les modifications
- Si vous modifiez les fichiers, attendez quelques secondes pour le rechargement
- Les fichiers dans `public/` sont servis directement par Vite
- Les articles sont chargés depuis `public/articles-seo/`


