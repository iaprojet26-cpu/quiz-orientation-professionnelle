# Quiz d'Orientation Professionnelle

Application interactive de quiz pour découvrir son profil professionnel et les métiers correspondants.

## 🚀 Technologies

- **Frontend**: React + Vite
- **Backend**: Netlify Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS

## 📦 Installation

```bash
npm install
```

## 🛠️ Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 📝 Configuration

1. Créer un fichier `.env.local` à la racine du projet :
```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase
```

## 🏗️ Structure du projet

```
APP ADS/
├── src/
│   ├── components/     # Composants React
│   ├── lib/           # Configuration Supabase
│   ├── services/      # Services API
│   ├── utils/         # Utilitaires
│   └── App.jsx        # Composant principal
├── netlify/
│   └── functions/     # Netlify Serverless Functions
└── database/         # Schémas SQL Supabase
```

## 📊 Base de données

Les schémas SQL pour Supabase sont dans le dossier `database/`.

## 🚢 Déploiement

Le projet est configuré pour être déployé sur Netlify automatiquement.

