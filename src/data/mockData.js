// Données mock pour tester l'application en local
export const mockQuestions = [
  {
    id: 1,
    texte: "Quel type d'activité vous attire le plus ?",
    categorie: "centres_interet",
    options: [
      { id: 1, texte: "Créer et concevoir des solutions originales", score: { creatif: 3, technique: 1 } },
      { id: 2, texte: "Analyser et résoudre des problèmes complexes", score: { technique: 3, logique: 2 } },
      { id: 3, texte: "Aider et conseiller les autres", score: { social: 3, communication: 2 } },
      { id: 4, texte: "Organiser et gérer des équipes ou projets", score: { organisation: 3, leadership: 2 } },
      { id: 5, texte: "Créer ma propre entreprise ou projet", score: { entrepreneuriat: 3, leadership: 2 } },
    ]
  },
  {
    id: 2,
    texte: "Dans quel environnement préféreriez-vous travailler ?",
    categorie: "centres_interet",
    options: [
      { id: 6, texte: "Un studio ou atelier créatif", score: { creatif: 3, autonomie: 2 } },
      { id: 7, texte: "Un bureau avec des outils technologiques", score: { technique: 3, organisation: 1 } },
      { id: 8, texte: "Sur le terrain, en contact avec les gens", score: { social: 3, communication: 2 } },
      { id: 9, texte: "Un bureau avec vue sur l'équipe", score: { organisation: 3, leadership: 2 } },
      { id: 10, texte: "N'importe où, tant que je suis indépendant", score: { entrepreneuriat: 3, autonomie: 2 } },
    ]
  },
  {
    id: 3,
    texte: "Quel sujet vous passionne le plus ?",
    categorie: "centres_interet",
    options: [
      { id: 11, texte: "L'art, le design, la créativité", score: { creatif: 3 } },
      { id: 12, texte: "Les sciences, la technologie, l'innovation", score: { technique: 3, logique: 2 } },
      { id: 13, texte: "Les relations humaines, la psychologie", score: { social: 3, empathie: 2 } },
      { id: 14, texte: "La gestion, l'organisation, la stratégie", score: { organisation: 3, leadership: 2 } },
      { id: 15, texte: "L'entrepreneuriat, les affaires", score: { entrepreneuriat: 3 } },
    ]
  },
  {
    id: 4,
    texte: "Quelle est votre principale force ?",
    categorie: "competences",
    options: [
      { id: 16, texte: "Mon imagination et ma créativité", score: { creatif: 3 } },
      { id: 17, texte: "Ma logique et ma capacité d'analyse", score: { technique: 3, logique: 3 } },
      { id: 18, texte: "Mon empathie et ma capacité d'écoute", score: { social: 3, empathie: 3 } },
      { id: 19, texte: "Mon sens de l'organisation", score: { organisation: 3 } },
      { id: 20, texte: "Ma capacité à prendre des initiatives", score: { entrepreneuriat: 3, leadership: 2 } },
    ]
  },
  {
    id: 5,
    texte: "Comment abordez-vous un nouveau projet ?",
    categorie: "competences",
    options: [
      { id: 21, texte: "Je laisse libre cours à ma créativité", score: { creatif: 3, flexibilite: 2 } },
      { id: 22, texte: "Je l'analyse méthodiquement", score: { technique: 3, logique: 2 } },
      { id: 23, texte: "Je consulte les personnes concernées", score: { social: 3, communication: 2 } },
      { id: 24, texte: "Je planifie et organise les étapes", score: { organisation: 3 } },
      { id: 25, texte: "Je me lance directement avec enthousiasme", score: { entrepreneuriat: 3 } },
    ]
  },
  {
    id: 6,
    texte: "Quel type de problème aimez-vous résoudre ?",
    categorie: "competences",
    options: [
      { id: 26, texte: "Les défis créatifs et esthétiques", score: { creatif: 3 } },
      { id: 27, texte: "Les problèmes techniques complexes", score: { technique: 3, logique: 3 } },
      { id: 28, texte: "Les problèmes relationnels et humains", score: { social: 3, empathie: 2 } },
      { id: 29, texte: "Les problèmes d'organisation et de gestion", score: { organisation: 3 } },
      { id: 30, texte: "Les défis business et commerciaux", score: { entrepreneuriat: 3 } },
    ]
  },
  {
    id: 7,
    texte: "Préférez-vous travailler :",
    categorie: "preferences_travail",
    options: [
      { id: 31, texte: "En autonomie, sur mes projets", score: { creatif: 2, autonomie: 3 } },
      { id: 32, texte: "En équipe technique", score: { technique: 2, communication: 2 } },
      { id: 33, texte: "En contact direct avec les clients/utilisateurs", score: { social: 3, communication: 3 } },
      { id: 34, texte: "En équipe avec un rôle de coordination", score: { organisation: 3, leadership: 3 } },
      { id: 35, texte: "Seul, en tant qu'indépendant", score: { entrepreneuriat: 3, autonomie: 3 } },
    ]
  },
  {
    id: 8,
    texte: "Quel type d'horaire vous convient le mieux ?",
    categorie: "preferences_travail",
    options: [
      { id: 36, texte: "Horaires flexibles, selon l'inspiration", score: { creatif: 2, flexibilite: 3 } },
      { id: 37, texte: "Horaires réguliers et structurés", score: { technique: 1, organisation: 2 } },
      { id: 38, texte: "Horaires adaptés aux besoins des autres", score: { social: 2, empathie: 2 } },
      { id: 39, texte: "Horaires variés selon les projets", score: { organisation: 2, leadership: 1 } },
      { id: 40, texte: "Horaires que je définis moi-même", score: { entrepreneuriat: 3, autonomie: 3 } },
    ]
  },
  {
    id: 9,
    texte: "Comment préférez-vous communiquer ?",
    categorie: "preferences_travail",
    options: [
      { id: 41, texte: "Par l'expression visuelle et créative", score: { creatif: 3 } },
      { id: 42, texte: "Par des documents techniques précis", score: { technique: 2, logique: 2 } },
      { id: 43, texte: "Par des conversations en face à face", score: { social: 3, communication: 3 } },
      { id: 44, texte: "Par des réunions et présentations structurées", score: { organisation: 2, leadership: 2 } },
      { id: 45, texte: "Par des réseaux et partenariats", score: { entrepreneuriat: 2, communication: 2 } },
    ]
  },
  {
    id: 10,
    texte: "Quel est votre objectif professionnel principal ?",
    categorie: "objectifs_professionnels",
    options: [
      { id: 46, texte: "Exprimer ma créativité et créer des œuvres", score: { creatif: 3 } },
      { id: 47, texte: "Maîtriser des compétences techniques pointues", score: { technique: 3 } },
      { id: 48, texte: "Aider et avoir un impact positif sur les autres", score: { social: 3, empathie: 2 } },
      { id: 49, texte: "Gérer et diriger une équipe ou un projet", score: { organisation: 3, leadership: 3 } },
      { id: 50, texte: "Créer ma propre entreprise et être indépendant", score: { entrepreneuriat: 3, leadership: 2 } },
    ]
  },
  {
    id: 11,
    texte: "Qu'est-ce qui vous motive le plus dans une carrière ?",
    categorie: "objectifs_professionnels",
    options: [
      { id: 51, texte: "La liberté créative et l'innovation", score: { creatif: 3, flexibilite: 2 } },
      { id: 52, texte: "La résolution de problèmes complexes", score: { technique: 3, logique: 2 } },
      { id: 53, texte: "Le contact humain et l'aide aux autres", score: { social: 3, empathie: 3 } },
      { id: 54, texte: "La progression et la responsabilité", score: { organisation: 3, leadership: 2 } },
      { id: 55, texte: "L'indépendance et la réussite financière", score: { entrepreneuriat: 3 } },
    ]
  },
  {
    id: 12,
    texte: "Comment envisagez-vous votre évolution professionnelle ?",
    categorie: "objectifs_professionnels",
    options: [
      { id: 56, texte: "Développer mon portfolio créatif", score: { creatif: 3 } },
      { id: 57, texte: "Devenir expert dans mon domaine technique", score: { technique: 3 } },
      { id: 58, texte: "Évoluer vers des rôles de conseil et d'accompagnement", score: { social: 3, communication: 2 } },
      { id: 59, texte: "Accéder à des postes de management", score: { organisation: 3, leadership: 3 } },
      { id: 60, texte: "Créer et développer ma propre entreprise", score: { entrepreneuriat: 3, leadership: 2 } },
    ]
  },
]

export const mockProfiles = [
  {
    id: 1,
    nom: "Profil Créatif",
    description: "Vous êtes attiré par l'innovation, l'art et la création. Vous aimez exprimer vos idées et travailler sur des projets originaux.",
    criteres: { creatif: 15, communication: 10, flexibilite: 8 },
    couleur: "#8B5CF6",
    icone: "🎨"
  },
  {
    id: 2,
    nom: "Profil Technique",
    description: "Vous excellez dans la résolution de problèmes complexes, la logique et les technologies. Vous êtes méthodique et précis.",
    criteres: { technique: 15, logique: 12, precision: 10 },
    couleur: "#06B6D4",
    icone: "💻"
  },
  {
    id: 3,
    nom: "Profil Social",
    description: "Vous avez un fort intérêt pour aider les autres, communiquer et travailler en équipe. Vous êtes empathique et à l'écoute.",
    criteres: { social: 15, communication: 12, empathie: 10 },
    couleur: "#10B981",
    icone: "🤝"
  },
  {
    id: 4,
    nom: "Profil Organisationnel",
    description: "Vous êtes organisé, aimez gérer des projets et diriger des équipes. Vous avez le sens des responsabilités.",
    criteres: { organisation: 15, leadership: 12, gestion: 10 },
    couleur: "#F59E0B",
    icone: "📊"
  },
  {
    id: 5,
    nom: "Profil Entrepreneurial",
    description: "Vous êtes indépendant, aimez prendre des risques calculés et créer votre propre voie. Vous êtes visionnaire.",
    criteres: { entrepreneuriat: 15, leadership: 10, creatif: 8 },
    couleur: "#EF4444",
    icone: "🚀"
  },
]

export const mockJobs = {
  1: [ // Profil Créatif
    {
      id: 1,
      nom: "Graphiste",
      description: "Création visuelle pour la communication, le marketing et les médias. Vous travaillez sur des projets variés allant de l'identité visuelle aux supports marketing.",
      niveau_etudes: "Bac+2 à Bac+5",
      competences: ["Créativité", "Maîtrise des logiciels graphiques", "Sens esthétique", "Communication visuelle"],
      formations: ["BTS Design Graphique", "École d'art", "Formation en ligne (Adobe Creative Suite)", "Licence Arts Appliqués"]
    },
    {
      id: 2,
      nom: "Développeur Frontend",
      description: "Création d'interfaces utilisateur interactives et esthétiques. Vous combinez créativité et technique pour créer des expériences utilisateur exceptionnelles.",
      niveau_etudes: "Bac+2 à Bac+5",
      competences: ["HTML/CSS/JavaScript", "Frameworks React/Vue", "Design UI/UX", "Créativité"],
      formations: ["Bootcamp développement web", "Formation en ligne (FreeCodeCamp, Udemy)", "École d'ingénieur", "Autoformation"]
    },
    {
      id: 3,
      nom: "Architecte d'intérieur",
      description: "Conception et aménagement d'espaces intérieurs fonctionnels et esthétiques. Vous créez des environnements qui allient beauté et praticité.",
      niveau_etudes: "Bac+3 à Bac+5",
      competences: ["Créativité", "Sens spatial", "Maîtrise des logiciels 3D", "Communication"],
      formations: ["École d'architecture", "BTS Design d'espace", "Formation continue", "Master Design"]
    },
    {
      id: 4,
      nom: "Photographe",
      description: "Création d'images artistiques ou commerciales. Vous capturez des moments et des émotions à travers l'objectif.",
      niveau_etudes: "Variable",
      competences: ["Technique photographique", "Sens artistique", "Post-production", "Communication"],
      formations: ["École de photographie", "Formation professionnelle", "Autoformation", "Workshops"]
    },
    {
      id: 5,
      nom: "Concepteur-rédacteur",
      description: "Création de contenus créatifs pour la publicité et la communication. Vous imaginez des campagnes qui marquent les esprits.",
      niveau_etudes: "Bac+3 à Bac+5",
      competences: ["Créativité", "Rédaction", "Marketing", "Communication"],
      formations: ["École de communication", "Formation en publicité", "Master Marketing", "Formation continue"]
    },
  ],
  2: [ // Profil Technique
    {
      id: 6,
      nom: "Ingénieur Logiciel",
      description: "Conception et développement de systèmes informatiques complexes. Vous créez des solutions technologiques innovantes.",
      niveau_etudes: "Bac+5",
      competences: ["Programmation", "Architecture logicielle", "Algorithmes", "Résolution de problèmes"],
      formations: ["École d'ingénieur", "Master Informatique", "Formation continue", "Certifications professionnelles"]
    },
    {
      id: 7,
      nom: "Data Analyst",
      description: "Analyse de données pour aider à la prise de décision. Vous transformez les données en insights actionnables.",
      niveau_etudes: "Bac+3 à Bac+5",
      competences: ["Statistiques", "SQL", "Python/R", "Visualisation de données"],
      formations: ["Licence/Master Mathématiques/Statistiques", "Formation Data Science en ligne", "Certification Google Data Analytics", "Bootcamp Data"]
    },
    {
      id: 8,
      nom: "Ingénieur Système",
      description: "Administration et optimisation des infrastructures informatiques. Vous garantissez la performance et la sécurité des systèmes.",
      niveau_etudes: "Bac+5",
      competences: ["Réseaux", "Sécurité", "Linux/Windows", "Virtualisation"],
      formations: ["École d'ingénieur", "Master Informatique", "Certifications (Cisco, Microsoft)", "Formation continue"]
    },
    {
      id: 9,
      nom: "Développeur Backend",
      description: "Développement de la logique serveur et des API. Vous créez les fondations robustes des applications.",
      niveau_etudes: "Bac+2 à Bac+5",
      competences: ["Programmation", "Bases de données", "API", "Architecture"],
      formations: ["Formation en développement", "École d'ingénieur", "Bootcamp", "Autoformation"]
    },
    {
      id: 10,
      nom: "Cybersécurité",
      description: "Protection des systèmes et données contre les cybermenaces. Vous êtes le gardien de la sécurité numérique.",
      niveau_etudes: "Bac+3 à Bac+5",
      competences: ["Sécurité réseau", "Ethical hacking", "Analyse de risques", "Conformité"],
      formations: ["Master Cybersécurité", "Certifications (CEH, CISSP)", "Formation continue", "École spécialisée"]
    },
  ],
  3: [ // Profil Social
    {
      id: 11,
      nom: "Psychologue",
      description: "Accompagnement et soutien des personnes en difficulté. Vous aidez les autres à mieux se comprendre et à surmonter leurs défis.",
      niveau_etudes: "Bac+5",
      competences: ["Écoute active", "Empathie", "Analyse psychologique", "Communication"],
      formations: ["Master Psychologie", "Formation continue", "Spécialisation (clinique, sociale, etc.)", "Doctorat"]
    },
    {
      id: 12,
      nom: "Éducateur Spécialisé",
      description: "Accompagnement de personnes en difficulté sociale ou familiale. Vous contribuez à leur insertion et leur épanouissement.",
      niveau_etudes: "Bac+3",
      competences: ["Patience", "Communication", "Empathie", "Gestion de conflits"],
      formations: ["DEES (Diplôme d'État)", "Formation continue", "Stages pratiques", "Formation professionnelle"]
    },
    {
      id: 13,
      nom: "Conseiller d'orientation",
      description: "Accompagnement des jeunes dans leur choix d'orientation scolaire et professionnelle. Vous les aidez à découvrir leur voie.",
      niveau_etudes: "Bac+3 à Bac+5",
      competences: ["Écoute", "Connaissance des métiers", "Communication", "Empathie"],
      formations: ["Master Psychologie", "Formation spécialisée orientation", "Certification", "Formation continue"]
    },
    {
      id: 14,
      nom: "Infirmier",
      description: "Soins et accompagnement des patients. Vous apportez réconfort et soins de qualité aux personnes malades.",
      niveau_etudes: "Bac+3",
      competences: ["Soins médicaux", "Empathie", "Résistance au stress", "Communication"],
      formations: ["IFSI (Institut de Formation)", "Formation continue", "Spécialisations", "Formation professionnelle"]
    },
    {
      id: 15,
      nom: "Assistant Social",
      description: "Accompagnement social et aide aux personnes en difficulté. Vous les guidez dans leurs démarches administratives et sociales.",
      niveau_etudes: "Bac+3",
      competences: ["Écoute", "Connaissance du droit social", "Empathie", "Communication"],
      formations: ["DEASS (Diplôme d'État)", "Formation continue", "Stages pratiques", "Formation professionnelle"]
    },
  ],
  4: [ // Profil Organisationnel
    {
      id: 16,
      nom: "Chef de Projet",
      description: "Gestion et coordination de projets dans différents secteurs. Vous pilotez les projets de A à Z avec méthode et efficacité.",
      niveau_etudes: "Bac+3 à Bac+5",
      competences: ["Organisation", "Leadership", "Gestion budgétaire", "Communication"],
      formations: ["Master Management", "Certification PMP", "Formation en gestion de projet", "MBA"]
    },
    {
      id: 17,
      nom: "Responsable RH",
      description: "Gestion des ressources humaines et développement des talents. Vous êtes le lien entre l'entreprise et ses collaborateurs.",
      niveau_etudes: "Bac+5",
      competences: ["Communication", "Gestion", "Psychologie", "Droit du travail"],
      formations: ["Master RH", "Formation continue", "Certification professionnelle", "MBA"]
    },
    {
      id: 18,
      nom: "Contrôleur de Gestion",
      description: "Analyse financière et pilotage de la performance. Vous aidez l'entreprise à prendre les bonnes décisions stratégiques.",
      niveau_etudes: "Bac+5",
      competences: ["Analyse financière", "Excel", "Stratégie", "Communication"],
      formations: ["Master Finance/Contrôle", "École de commerce", "Formation continue", "Certifications"]
    },
    {
      id: 19,
      nom: "Directeur d'établissement",
      description: "Gestion et direction d'un établissement (école, hôpital, etc.). Vous coordonnez les équipes et garantissez la qualité du service.",
      niveau_etudes: "Bac+5",
      competences: ["Leadership", "Gestion", "Stratégie", "Communication"],
      formations: ["Master Management", "Formation continue", "Certifications", "Expérience professionnelle"]
    },
    {
      id: 20,
      nom: "Responsable Qualité",
      description: "Garantir la qualité des produits et processus. Vous assurez que les standards sont respectés et améliorés en continu.",
      niveau_etudes: "Bac+3 à Bac+5",
      competences: ["Analyse", "Organisation", "Normes qualité", "Communication"],
      formations: ["Formation qualité", "Certifications (ISO, etc.)", "Formation continue", "Master Management"]
    },
  ],
  5: [ // Profil Entrepreneurial
    {
      id: 21,
      nom: "Entrepreneur / Créateur d'entreprise",
      description: "Création et développement de votre propre entreprise. Vous transformez vos idées en réalité et créez votre propre emploi.",
      niveau_etudes: "Variable",
      competences: ["Vision", "Prise de risque", "Leadership", "Résilience"],
      formations: ["Formation entrepreneuriat", "Incubateurs", "Accompagnement (réseaux, mentors)", "MBA"]
    },
    {
      id: 22,
      nom: "Consultant Indépendant",
      description: "Expertise et conseil en freelance dans votre domaine. Vous mettez vos compétences au service de plusieurs clients.",
      niveau_etudes: "Bac+3 minimum",
      competences: ["Expertise technique", "Autonomie", "Communication", "Réseau professionnel"],
      formations: ["Formation continue", "Certifications professionnelles", "Développement réseau", "Autoformation"]
    },
    {
      id: 23,
      nom: "Business Developer",
      description: "Développement commercial et partenariats. Vous créez des opportunités business et développez le chiffre d'affaires.",
      niveau_etudes: "Bac+3 à Bac+5",
      competences: ["Négociation", "Communication", "Réseau", "Stratégie commerciale"],
      formations: ["École de commerce", "Formation commerciale", "Formation continue", "MBA"]
    },
    {
      id: 24,
      nom: "Créateur de contenu",
      description: "Création de contenu pour les réseaux sociaux et les plateformes digitales. Vous monétisez votre créativité et votre audience.",
      niveau_etudes: "Variable",
      competences: ["Créativité", "Communication", "Marketing digital", "Autonomie"],
      formations: ["Autoformation", "Formation en ligne", "Workshops", "Expérience pratique"]
    },
    {
      id: 25,
      nom: "Investisseur / Business Angel",
      description: "Investissement dans des startups et accompagnement d'entrepreneurs. Vous financez et conseillez les projets prometteurs.",
      niveau_etudes: "Variable",
      competences: ["Analyse financière", "Vision stratégique", "Réseau", "Prise de risque"],
      formations: ["Formation en finance", "Réseaux d'investisseurs", "Expérience entrepreneuriale", "MBA"]
    },
  ],
}

