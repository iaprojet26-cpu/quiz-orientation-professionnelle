# 🔐 Instructions pour pousser le code sur GitHub

## Méthode recommandée : Utiliser le token manuellement

### Option 1 : Via la ligne de commande (PowerShell)

1. Ouvrez PowerShell dans le dossier du projet :
```powershell
cd "C:\Users\career center 1\Desktop\apps\APP ADS"
```

2. Exécutez cette commande :
```powershell
git push -u origin main
```

3. Quand Git vous demande :
   - **Username** : `iaprojet26-cpu`
   - **Password** : Collez votre token GitHub (créez-en un sur https://github.com/settings/tokens avec la permission `repo`)

### Option 2 : Vérifier les permissions du token

Assurez-vous que votre token a bien les permissions :
1. Allez sur : https://github.com/settings/tokens
2. Cliquez sur votre token "Netlify Deployment"
3. Vérifiez que la permission **`repo`** est cochée (toutes les sous-permissions)
4. Si ce n'est pas le cas, créez un nouveau token avec toutes les permissions `repo`

### Option 3 : Utiliser GitHub Desktop (Plus simple)

1. Téléchargez [GitHub Desktop](https://desktop.github.com/)
2. Installez et ouvrez GitHub Desktop
3. Cliquez sur "File" → "Add Local Repository"
4. Sélectionnez le dossier : `C:\Users\career center 1\Desktop\apps\APP ADS`
5. GitHub Desktop détectera automatiquement le dépôt
6. Cliquez sur "Publish repository" en haut
7. Vérifiez que le dépôt est : `iaprojet26-cpu/quiz-orientation-professionnelle`
8. Cliquez sur "Publish repository"

---

## Vérification après le push

Une fois le code poussé, allez sur :
https://github.com/iaprojet26-cpu/quiz-orientation-professionnelle

Vous devriez voir tous vos fichiers ! ✅


