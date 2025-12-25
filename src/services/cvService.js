/**
 * Service pour structurer et formater les données CV
 */

/**
 * Structurer les données CV en format lisible
 * @param {Object} formData - Données du formulaire
 * @param {string} language - Langue (fr, en, ar)
 * @returns {Object} CV structuré
 */
export const structureCV = (formData, language = 'fr') => {
  const translations = {
    fr: {
      personalInfo: 'Informations personnelles',
      cvTitle: 'Titre du CV',
      profile: 'Profil',
      diplomas: 'Formation Diplômante',
      certifications: 'Formation Certifiante',
      technicalSkills: 'Compétences techniques',
      itSkills: 'Compétences informatiques',
      softSkills: 'Compétences managériales',
      languages: 'Compétences linguistiques',
      professionalExperience: 'Expériences professionnelles',
      extraProfessional: 'Expériences extra-professionnelles',
      interests: 'Centres d\'intérêt'
    },
    en: {
      personalInfo: 'Personal Information',
      cvTitle: 'CV Title',
      profile: 'Profile',
      diplomas: 'Diploma Education',
      certifications: 'Certifying Education',
      technicalSkills: 'Technical Skills',
      itSkills: 'IT Skills',
      softSkills: 'Managerial Skills',
      languages: 'Language Skills',
      professionalExperience: 'Professional Experience',
      extraProfessional: 'Extra-professional Experience',
      interests: 'Interests'
    },
    ar: {
      personalInfo: 'المعلومات الشخصية',
      cvTitle: 'عنوان السيرة الذاتية',
      profile: 'الملف الشخصي',
      diplomas: 'التعليم الدبلومي',
      certifications: 'التعليم المعتمد',
      technicalSkills: 'المهارات التقنية',
      itSkills: 'المهارات المعلوماتية',
      softSkills: 'المهارات الإدارية',
      languages: 'المهارات اللغوية',
      professionalExperience: 'الخبرات المهنية',
      extraProfessional: 'الخبرات خارج المهنية',
      interests: 'الاهتمامات'
    }
  }

  const t = translations[language] || translations.fr

  // Mapper les niveaux d'étude
  const educationMap = {
    fr: {
      bac: 'Baccalauréat',
      'bac+2': 'Bac+2 (DUT, BTS)',
      'bac+3': 'Bac+3 (Licence)',
      'bac+5': 'Bac+5 (Master)',
      'bac+8': 'Bac+8 (Doctorat)'
    },
    en: {
      bac: 'High School Diploma',
      'bac+2': 'Associate Degree (DUT, BTS)',
      'bac+3': 'Bachelor\'s Degree',
      'bac+5': 'Master\'s Degree',
      'bac+8': 'Doctorate'
    },
    ar: {
      bac: 'البكالوريا',
      'bac+2': 'باك+2 (DUT, BTS)',
      'bac+3': 'باك+3 (الإجازة)',
      'bac+5': 'باك+5 (الماجستير)',
      'bac+8': 'باك+8 (الدكتوراه)'
    }
  }

  const eduMap = educationMap[language] || educationMap.fr

  // Mapper les types d'expérience
  const typeMap = {
    fr: {
      pfe: 'Stage PFE',
      stage: 'Stage',
      observation: 'Stage d\'observation',
      technique: 'Stage technique',
      cdd: 'CDD',
      cdi: 'CDI'
    },
    en: {
      pfe: 'PFE Internship',
      stage: 'Internship',
      observation: 'Observation Internship',
      technique: 'Technical Internship',
      cdd: 'Fixed-term Contract',
      cdi: 'Permanent Contract'
    },
    ar: {
      pfe: 'تدريب نهاية الدراسة',
      stage: 'التدريب',
      observation: 'تدريب الملاحظة',
      technique: 'التدريب التقني',
      cdd: 'عقد محدد المدة',
      cdi: 'عقد غير محدد المدة'
    }
  }

  const tMap = typeMap[language] || typeMap.fr

  // Mapper les niveaux de langue
  const languageLevelMap = {
    fr: {
      native: 'Langue maternelle',
      professional: 'Professionnel',
      fluent: 'Courant',
      intermediate: 'Intermédiaire',
      A1: 'A1 (Débutant)',
      A2: 'A2 (Élémentaire)',
      B1: 'B1 (Intermédiaire)',
      B2: 'B2 (Avancé)',
      C1: 'C1 (Autonome)',
      C2: 'C2 (Maîtrise)'
    },
    en: {
      native: 'Native',
      professional: 'Professional',
      fluent: 'Fluent',
      intermediate: 'Intermediate',
      A1: 'A1 (Beginner)',
      A2: 'A2 (Elementary)',
      B1: 'B1 (Intermediate)',
      B2: 'B2 (Advanced)',
      C1: 'C1 (Proficient)',
      C2: 'C2 (Mastery)'
    },
    ar: {
      native: 'اللغة الأم',
      professional: 'مهني',
      fluent: 'طلاقة',
      intermediate: 'متوسط',
      A1: 'A1 (مبتدئ)',
      A2: 'A2 (ابتدائي)',
      B1: 'B1 (متوسط)',
      B2: 'B2 (متقدم)',
      C1: 'C1 (كفء)',
      C2: 'C2 (إتقان)'
    }
  }

  const langMap = languageLevelMap[language] || languageLevelMap.fr

  return {
    personalInfo: {
      fullName: `${formData.firstName || ''} ${formData.lastName || ''}`.trim(),
      email: formData.email || '',
      phone: formData.phone || '',
      city: formData.city || '',
      neighborhood: formData.neighborhood || '',
      linkedin: formData.linkedin || '',
      photo: formData.photoPreview || null
    },
    cvTitle: formData.cvTitle || '',
    profile: formData.profile || '',
    diplomas: (formData.diplomas || []).map(diploma => ({
      level: eduMap[diploma.level] || diploma.level || '',
      diploma: diploma.diploma || '',
      institution: diploma.institution || '',
      year: diploma.year || '',
      mention: diploma.mention || '',
      pfeSubject: diploma.pfeSubject || ''
    })),
    certifications: (formData.certifications || []).map(cert => ({
      name: cert.name || '',
      organization: cert.organization || '',
      date: cert.date || '',
      link: cert.link || ''
    })),
    professionalExperiences: (formData.professionalExperiences || []).map(exp => ({
      type: tMap[exp.type] || exp.type || '',
      position: exp.position || '',
      company: exp.company || '',
      city: exp.city || '',
      period: exp.period || '',
      missions: exp.missions || []
    })),
    extraProfessional: {
      projects: (formData.extraProfessional?.projects || []).map(project => ({
        name: project.name || '',
        type: project.type || '',
        role: project.role || '',
        ranking: project.ranking || '',
        date: project.date || ''
      })),
      associations: (formData.extraProfessional?.associations || []).map(assoc => ({
        organization: assoc.organization || '',
        role: assoc.role || '',
        period: assoc.period || ''
      }))
    },
    technicalSkills: formData.technicalSkills || [],
    itSkills: formData.itSkills || [],
    softSkills: formData.softSkills || [],
    languages: {
      arabic: {
        level: langMap[formData.languages?.arabic?.level || 'native'] || formData.languages?.arabic?.level || '',
        classical: formData.languages?.arabic?.classical || false
      },
      french: {
        level: langMap[formData.languages?.french?.level || 'professional'] || formData.languages?.french?.level || ''
      },
      english: {
        level: langMap[formData.languages?.english?.level || ''] || formData.languages?.english?.level || '',
        score: formData.languages?.english?.score || ''
      }
    },
    interests: formData.interests || ''
  }
}

/**
 * Générer un message d'amélioration basé sur le profil
 * @param {Object} cvData - Données CV structurées
 * @param {string} language - Langue
 * @returns {string} Message d'amélioration
 */
export const generateImprovementMessage = (cvData, language = 'fr') => {
  const messages = {
    fr: {
      noTitle: '💡 Conseil : Ajoutez un titre de CV clair et accrocheur.',
      noProfile: '💡 Conseil : Rédigez un message d\'accroche de 3-4 lignes pour votre profil.',
      noDiploma: '💡 Conseil : Ajoutez au moins un diplôme avec les détails (institution, année, mention).',
      noExperience: '💡 Conseil : Ajoutez vos stages ou expériences professionnelles avec des missions concrètes.',
      fewSkills: '💡 Conseil : Développez vos compétences techniques, informatiques et managériales.',
      good: '✅ Votre CV est bien structuré ! Pensez à l\'aligner avec votre profil d\'orientation.',
      excellent: '🌟 Excellent ! Votre CV est complet. Découvrez votre profil d\'orientation pour l\'optimiser davantage.'
    },
    en: {
      noTitle: '💡 Tip: Add a clear and catchy CV title.',
      noProfile: '💡 Tip: Write a 3-4 line catchy message for your profile.',
      noDiploma: '💡 Tip: Add at least one diploma with details (institution, year, mention).',
      noExperience: '💡 Tip: Add your internships or professional experiences with concrete missions.',
      fewSkills: '💡 Tip: Develop your technical, IT and managerial skills.',
      good: '✅ Your CV is well structured! Consider aligning it with your orientation profile.',
      excellent: '🌟 Excellent! Your CV is complete. Discover your orientation profile to optimize it further.'
    },
    ar: {
      noTitle: '💡 نصيحة: أضف عنوان سيرة ذاتية واضح وجذاب.',
      noProfile: '💡 نصيحة: اكتب رسالة جذابة من 3-4 أسطر لملفك الشخصي.',
      noDiploma: '💡 نصيحة: أضف دبلوم واحد على الأقل مع التفاصيل (المؤسسة، السنة، الإشارة).',
      noExperience: '💡 نصيحة: أضف تدريباتك أو خبراتك المهنية مع مهام ملموسة.',
      fewSkills: '💡 نصيحة: طور مهاراتك التقنية والمعلوماتية والإدارية.',
      good: '✅ سيرتك الذاتية منظمة جيدًا! فكر في محاذاتها مع ملف التوجيه الخاص بك.',
      excellent: '🌟 ممتاز! سيرتك الذاتية كاملة. اكتشف ملف التوجيه الخاص بك لتحسينها أكثر.'
    }
  }

  const msg = messages[language] || messages.fr
  const { cvTitle, profile, diplomas, professionalExperiences, technicalSkills, itSkills, softSkills } = cvData

  // Logique de scoring
  let score = 0
  let tips = []

  if (cvTitle && cvTitle.trim().length > 0) {
    score += 1
  } else {
    tips.push(msg.noTitle)
  }

  if (profile && profile.trim().length > 50) {
    score += 1
  } else {
    tips.push(msg.noProfile)
  }

  if (diplomas && diplomas.length > 0) {
    score += 1
  } else {
    tips.push(msg.noDiploma)
  }

  if (professionalExperiences && professionalExperiences.length > 0) {
    score += 1
  } else {
    tips.push(msg.noExperience)
  }

  const totalSkills = (technicalSkills?.length || 0) + (itSkills?.length || 0) + (softSkills?.length || 0)
  if (totalSkills >= 5) {
    score += 1
  } else {
    tips.push(msg.fewSkills)
  }

  // Message final
  if (score >= 4) {
    return msg.excellent
  } else if (score >= 2) {
    return msg.good
  } else {
    return tips.length > 0 ? tips.join(' ') : msg.good
  }
}

/**
 * Formater le CV en texte lisible
 * @param {Object} structuredCV - CV structuré
 * @param {string} language - Langue
 * @returns {string} CV formaté en texte
 */
export const formatCVAsText = (structuredCV, language = 'fr') => {
  const labels = {
    fr: {
      personalInfo: 'INFORMATIONS PERSONNELLES',
      cvTitle: 'TITRE DU CV',
      profile: 'PROFIL',
      diplomas: 'FORMATION DIPLÔMANTE',
      certifications: 'FORMATION CERTIFIANTE',
      technicalSkills: 'COMPÉTENCES TECHNIQUES',
      itSkills: 'COMPÉTENCES INFORMATIQUES',
      softSkills: 'COMPÉTENCES MANAGÉRIALES',
      languages: 'COMPÉTENCES LINGUISTIQUES',
      professionalExperience: 'EXPÉRIENCES PROFESSIONNELLES',
      extraProfessional: 'EXPÉRIENCES EXTRA-PROFESSIONNELLES',
      interests: 'CENTRES D\'INTÉRÊT',
      email: 'Email',
      phone: 'Téléphone',
      city: 'Ville',
      linkedin: 'LinkedIn'
    },
    en: {
      personalInfo: 'PERSONAL INFORMATION',
      cvTitle: 'CV TITLE',
      profile: 'PROFILE',
      diplomas: 'DIPLOMA EDUCATION',
      certifications: 'CERTIFYING EDUCATION',
      technicalSkills: 'TECHNICAL SKILLS',
      itSkills: 'IT SKILLS',
      softSkills: 'MANAGERIAL SKILLS',
      languages: 'LANGUAGE SKILLS',
      professionalExperience: 'PROFESSIONAL EXPERIENCE',
      extraProfessional: 'EXTRA-PROFESSIONAL EXPERIENCE',
      interests: 'INTERESTS',
      email: 'Email',
      phone: 'Phone',
      city: 'City',
      linkedin: 'LinkedIn'
    },
    ar: {
      personalInfo: 'المعلومات الشخصية',
      cvTitle: 'عنوان السيرة الذاتية',
      profile: 'الملف الشخصي',
      diplomas: 'التعليم الدبلومي',
      certifications: 'التعليم المعتمد',
      technicalSkills: 'المهارات التقنية',
      itSkills: 'المهارات المعلوماتية',
      softSkills: 'المهارات الإدارية',
      languages: 'المهارات اللغوية',
      professionalExperience: 'الخبرات المهنية',
      extraProfessional: 'الخبرات خارج المهنية',
      interests: 'الاهتمامات',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      city: 'المدينة',
      linkedin: 'LinkedIn'
    }
  }

  const t = labels[language] || labels.fr
  let text = ''

  // Informations personnelles
  text += `\n${t.personalInfo}\n`
  text += `${'='.repeat(50)}\n\n`
  text += `${structuredCV.personalInfo.fullName}\n`
  if (structuredCV.cvTitle) {
    text += `${t.cvTitle}: ${structuredCV.cvTitle}\n`
  }
  if (structuredCV.personalInfo.email) {
    text += `${t.email}: ${structuredCV.personalInfo.email}\n`
  }
  if (structuredCV.personalInfo.phone) {
    text += `${t.phone}: ${structuredCV.personalInfo.phone}\n`
  }
  if (structuredCV.personalInfo.city) {
    const location = structuredCV.personalInfo.neighborhood 
      ? `${structuredCV.personalInfo.city}, ${structuredCV.personalInfo.neighborhood}`
      : structuredCV.personalInfo.city
    text += `${t.city}: ${location}\n`
  }
  if (structuredCV.personalInfo.linkedin) {
    text += `${t.linkedin}: ${structuredCV.personalInfo.linkedin}\n`
  }

  // Profil / Message d'accroche
  if (structuredCV.profile) {
    text += `\n${t.profile}\n`
    text += `${'='.repeat(50)}\n\n`
    text += `${structuredCV.profile}\n`
  }

  // Formation Diplômante
  if (structuredCV.diplomas && structuredCV.diplomas.length > 0) {
    text += `\n${t.diplomas}\n`
    text += `${'='.repeat(50)}\n\n`
    structuredCV.diplomas.forEach((diploma, index) => {
      text += `${index + 1}. `
      if (diploma.level) text += `${diploma.level}`
      if (diploma.diploma) text += ` - ${diploma.diploma}`
      if (diploma.institution) text += ` (${diploma.institution})`
      if (diploma.year) text += ` - ${diploma.year}`
      if (diploma.mention) text += ` - Mention: ${diploma.mention}`
      if (diploma.pfeSubject) text += `\n   PFE: ${diploma.pfeSubject}`
      text += '\n'
    })
  }

  // Formation Certifiante
  if (structuredCV.certifications && structuredCV.certifications.length > 0) {
    text += `\n${t.certifications}\n`
    text += `${'='.repeat(50)}\n\n`
    structuredCV.certifications.forEach((cert, index) => {
      text += `${index + 1}. ${cert.name}`
      if (cert.organization) text += ` - ${cert.organization}`
      if (cert.date) text += ` (${cert.date})`
      if (cert.link) text += ` - ${cert.link}`
      text += '\n'
    })
  }

  // Compétences techniques
  if (structuredCV.technicalSkills && structuredCV.technicalSkills.length > 0) {
    text += `\n${t.technicalSkills}\n`
    text += `${'='.repeat(50)}\n\n`
    text += `${structuredCV.technicalSkills.join(', ')}\n`
  }

  // Compétences informatiques
  if (structuredCV.itSkills && structuredCV.itSkills.length > 0) {
    text += `\n${t.itSkills}\n`
    text += `${'='.repeat(50)}\n\n`
    text += `${structuredCV.itSkills.join(', ')}\n`
  }

  // Compétences managériales
  if (structuredCV.softSkills && structuredCV.softSkills.length > 0) {
    text += `\n${t.softSkills}\n`
    text += `${'='.repeat(50)}\n\n`
    text += `${structuredCV.softSkills.join(', ')}\n`
  }

  // Compétences linguistiques
  if (structuredCV.languages) {
    text += `\n${t.languages}\n`
    text += `${'='.repeat(50)}\n\n`
    if (structuredCV.languages.arabic) {
      text += `Arabe: ${structuredCV.languages.arabic.level}`
      if (structuredCV.languages.arabic.classical) {
        text += ' (Arabe classique)'
      }
      text += '\n'
    }
    if (structuredCV.languages.french) {
      text += `Français: ${structuredCV.languages.french.level}\n`
    }
    if (structuredCV.languages.english) {
      text += `Anglais: ${structuredCV.languages.english.level}`
      if (structuredCV.languages.english.score) {
        text += ` (${structuredCV.languages.english.score})`
      }
      text += '\n'
    }
  }

  // Expériences professionnelles
  if (structuredCV.professionalExperiences && structuredCV.professionalExperiences.length > 0) {
    text += `\n${t.professionalExperience}\n`
    text += `${'='.repeat(50)}\n\n`
    structuredCV.professionalExperiences.forEach((exp, index) => {
      text += `${index + 1}. ${exp.position || exp.type}\n`
      if (exp.company) {
        text += `   ${exp.company}`
        if (exp.city) text += ` - ${exp.city}`
        text += '\n'
      }
      if (exp.period) {
        text += `   ${exp.period}\n`
      }
      if (exp.missions && exp.missions.length > 0) {
        exp.missions.forEach(mission => {
          text += `   • ${mission}\n`
        })
      }
      text += '\n'
    })
  }

  // Expériences extra-professionnelles
  if (structuredCV.extraProfessional) {
    const hasProjects = structuredCV.extraProfessional.projects && structuredCV.extraProfessional.projects.length > 0
    const hasAssociations = structuredCV.extraProfessional.associations && structuredCV.extraProfessional.associations.length > 0
    
    if (hasProjects || hasAssociations) {
      text += `\n${t.extraProfessional}\n`
      text += `${'='.repeat(50)}\n\n`
      
      if (hasProjects) {
        text += `${language === 'fr' ? 'Projets et Compétitions' : language === 'en' ? 'Projects and Competitions' : 'المشاريع والمسابقات'}\n`
        structuredCV.extraProfessional.projects.forEach((project, index) => {
          text += `${index + 1}. ${project.name}`
          if (project.type) text += ` (${project.type})`
          if (project.role) text += ` - Rôle: ${project.role}`
          if (project.ranking) text += ` - ${project.ranking}`
          if (project.date) text += ` (${project.date})`
          text += '\n'
        })
        text += '\n'
      }
      
      if (hasAssociations) {
        text += `${language === 'fr' ? 'Associations et Bénévolat' : language === 'en' ? 'Associations and Volunteering' : 'الجمعيات والتطوع'}\n`
        structuredCV.extraProfessional.associations.forEach((assoc, index) => {
          text += `${index + 1}. ${assoc.organization}`
          if (assoc.role) text += ` - ${assoc.role}`
          if (assoc.period) text += ` (${assoc.period})`
          text += '\n'
        })
      }
    }
  }

  // Centres d'intérêt
  if (structuredCV.interests) {
    text += `\n${t.interests}\n`
    text += `${'='.repeat(50)}\n\n`
    text += `${structuredCV.interests}\n`
  }

  return text.trim()
}

/**
 * Générer un document Word (.docx) à partir du CV structuré
 * @param {Object} structuredCV - CV structuré
 * @param {string} language - Langue
 * @returns {Promise<Blob>} Document Word en format Blob
 */
export const generateWordDocument = async (structuredCV, language = 'fr') => {
  const docx = await import('docx')
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, WidthType, Table, TableRow, TableCell, BorderStyle, ShadingType } = docx

  const labels = {
    fr: {
      personalInfo: 'INFORMATIONS PERSONNELLES',
      cvTitle: 'TITRE DU CV',
      profile: 'PROFIL',
      diplomas: 'FORMATION DIPLÔMANTE',
      certifications: 'FORMATION CERTIFIANTE',
      technicalSkills: 'COMPÉTENCES TECHNIQUES',
      itSkills: 'COMPÉTENCES INFORMATIQUES',
      softSkills: 'COMPÉTENCES MANAGÉRIALES',
      languages: 'COMPÉTENCES LINGUISTIQUES',
      professionalExperience: 'EXPÉRIENCES PROFESSIONNELLES',
      extraProfessional: 'EXPÉRIENCES EXTRA-PROFESSIONNELLES',
      interests: 'CENTRES D\'INTÉRÊT',
      projects: 'Projets et Compétitions',
      associations: 'Associations et Bénévolat'
    },
    en: {
      personalInfo: 'PERSONAL INFORMATION',
      cvTitle: 'CV TITLE',
      profile: 'PROFILE',
      diplomas: 'DIPLOMA EDUCATION',
      certifications: 'CERTIFYING EDUCATION',
      technicalSkills: 'TECHNICAL SKILLS',
      itSkills: 'IT SKILLS',
      softSkills: 'MANAGERIAL SKILLS',
      languages: 'LANGUAGE SKILLS',
      professionalExperience: 'PROFESSIONAL EXPERIENCE',
      extraProfessional: 'EXTRA-PROFESSIONAL EXPERIENCE',
      interests: 'INTERESTS',
      projects: 'Projects and Competitions',
      associations: 'Associations and Volunteering'
    },
    ar: {
      personalInfo: 'المعلومات الشخصية',
      cvTitle: 'عنوان السيرة الذاتية',
      profile: 'الملف الشخصي',
      diplomas: 'التعليم الدبلومي',
      certifications: 'التعليم المعتمد',
      technicalSkills: 'المهارات التقنية',
      itSkills: 'المهارات المعلوماتية',
      softSkills: 'المهارات الإدارية',
      languages: 'المهارات اللغوية',
      professionalExperience: 'الخبرات المهنية',
      extraProfessional: 'الخبرات خارج المهنية',
      interests: 'الاهتمامات',
      projects: 'المشاريع والمسابقات',
      associations: 'الجمعيات والتطوع'
    }
  }

  const t = labels[language] || labels.fr

  const children = []

  // En-tête avec nom et titre (avec couleur)
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: structuredCV.personalInfo.fullName || '',
          bold: true,
          size: 32,
          color: '1e40af' // Bleu foncé
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    })
  )

  if (structuredCV.cvTitle) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: structuredCV.cvTitle,
            bold: true,
            size: 24,
            color: '3b82f6' // Bleu
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 }
      })
    )
  }

  // Informations de contact
  const contactInfo = []
  if (structuredCV.personalInfo.email) contactInfo.push(structuredCV.personalInfo.email)
  if (structuredCV.personalInfo.phone) contactInfo.push(structuredCV.personalInfo.phone)
  if (structuredCV.personalInfo.city) {
    const location = structuredCV.personalInfo.neighborhood 
      ? `${structuredCV.personalInfo.city}, ${structuredCV.personalInfo.neighborhood}`
      : structuredCV.personalInfo.city
    contactInfo.push(location)
  }
  if (structuredCV.personalInfo.linkedin) contactInfo.push(structuredCV.personalInfo.linkedin)

  if (contactInfo.length > 0) {
    children.push(
      new Paragraph({
        text: contactInfo.join(' | '),
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      })
    )
  }

  // Profil / Message d'accroche
  if (structuredCV.profile) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: t.profile,
            bold: true,
            size: 22,
            color: '1e40af' // Bleu foncé
          })
        ],
        spacing: { before: 200, after: 200 }
      })
    )
    children.push(
      new Paragraph({
        text: structuredCV.profile,
        spacing: { after: 300 }
      })
    )
  }

  // Formation Diplômante
  if (structuredCV.diplomas && structuredCV.diplomas.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: t.diplomas,
            bold: true,
            size: 22,
            color: '1e40af' // Bleu foncé
          })
        ],
        spacing: { before: 200, after: 200 }
      })
    )
    structuredCV.diplomas.forEach((diploma) => {
      const diplomaText = [
        diploma.level,
        diploma.diploma,
        diploma.institution,
        diploma.year
      ].filter(Boolean).join(' - ')
      
      children.push(
        new Paragraph({
          text: diplomaText,
          spacing: { after: 100 }
        })
      )
      
      if (diploma.mention) {
        children.push(
          new Paragraph({
            text: `${language === 'fr' ? 'Mention : ' : language === 'en' ? 'Mention : ' : 'الإشارة : '}${diploma.mention}`,
            spacing: { after: 100 }
          })
        )
      }
      
      if (diploma.pfeSubject) {
        children.push(
          new Paragraph({
            text: `${language === 'fr' ? 'PFE : ' : language === 'en' ? 'Final Project : ' : 'مشروع نهاية الدراسة : '}${diploma.pfeSubject}`,
            spacing: { after: 200 }
          })
        )
      }
    })
  }

  // Formation Certifiante
  if (structuredCV.certifications && structuredCV.certifications.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: t.certifications,
            bold: true,
            size: 22,
            color: '1e40af'
          })
        ],
        spacing: { before: 200, after: 200 }
      })
    )
    structuredCV.certifications.forEach((cert) => {
      const certText = [
        cert.name,
        cert.organization,
        cert.date
      ].filter(Boolean).join(' - ')
      
      children.push(
        new Paragraph({
          text: certText,
          spacing: { after: 100 }
        })
      )
    })
    children.push(new Paragraph({ text: '', spacing: { after: 200 } }))
  }

  // Expériences Professionnelles
  if (structuredCV.professionalExperiences && structuredCV.professionalExperiences.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: t.professionalExperience,
            bold: true,
            size: 22,
            color: '1e40af'
          })
        ],
        spacing: { before: 200, after: 200 }
      })
    )
    structuredCV.professionalExperiences.forEach((exp) => {
      children.push(
        new Paragraph({
          text: exp.position || exp.type,
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 100 }
        })
      )
      
      const companyInfo = [exp.company, exp.city, exp.period].filter(Boolean).join(' - ')
      if (companyInfo) {
        children.push(
          new Paragraph({
            text: companyInfo,
            spacing: { after: 100 }
          })
        )
      }
      
      if (exp.missions && exp.missions.length > 0) {
        exp.missions.forEach(mission => {
          children.push(
            new Paragraph({
              text: `• ${mission}`,
              spacing: { after: 50 },
              indent: { left: 400 }
            })
          )
        })
      }
      
      children.push(new Paragraph({ text: '', spacing: { after: 200 } }))
    })
  }

  // Expériences Extra-professionnelles
  if (structuredCV.extraProfessional) {
    const hasProjects = structuredCV.extraProfessional.projects && structuredCV.extraProfessional.projects.length > 0
    const hasAssociations = structuredCV.extraProfessional.associations && structuredCV.extraProfessional.associations.length > 0
    
      if (hasProjects || hasAssociations) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: t.extraProfessional,
              bold: true,
              size: 22,
              color: '1e40af'
            })
          ],
          spacing: { before: 200, after: 200 }
        })
      )
      
      if (hasProjects) {
        children.push(
          new Paragraph({
            text: t.projects,
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 }
          })
        )
        structuredCV.extraProfessional.projects.forEach((project) => {
          const projectText = [
            project.name,
            project.type,
            project.role,
            project.ranking
          ].filter(Boolean).join(' - ')
          
          children.push(
            new Paragraph({
              text: projectText,
              spacing: { after: 100 }
            })
          )
        })
      }
      
      if (hasAssociations) {
        children.push(
          new Paragraph({
            text: t.associations,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 }
          })
        )
        structuredCV.extraProfessional.associations.forEach((assoc) => {
          const assocText = [
            assoc.organization,
            assoc.role,
            assoc.period
          ].filter(Boolean).join(' - ')
          
          children.push(
            new Paragraph({
              text: assocText,
              spacing: { after: 100 }
            })
          )
        })
      }
      
      children.push(new Paragraph({ text: '', spacing: { after: 200 } }))
    }
  }

  // Compétences Techniques
  if (structuredCV.technicalSkills && structuredCV.technicalSkills.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: t.technicalSkills,
            bold: true,
            size: 22,
            color: '1e40af'
          })
        ],
        spacing: { before: 200, after: 200 }
      })
    )
    children.push(
      new Paragraph({
        text: structuredCV.technicalSkills.join(', '),
        spacing: { after: 300 }
      })
    )
  }

  // Compétences Informatiques
  if (structuredCV.itSkills && structuredCV.itSkills.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: t.itSkills,
            bold: true,
            size: 22,
            color: '1e40af'
          })
        ],
        spacing: { before: 200, after: 200 }
      })
    )
    children.push(
      new Paragraph({
        text: structuredCV.itSkills.join(', '),
        spacing: { after: 300 }
      })
    )
  }

  // Compétences Managériales
  if (structuredCV.softSkills && structuredCV.softSkills.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: t.softSkills,
            bold: true,
            size: 22,
            color: '1e40af'
          })
        ],
        spacing: { before: 200, after: 200 }
      })
    )
    children.push(
      new Paragraph({
        text: structuredCV.softSkills.join(', '),
        spacing: { after: 300 }
      })
    )
  }

  // Compétences Linguistiques
  if (structuredCV.languages) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: t.languages,
            bold: true,
            size: 22,
            color: '1e40af'
          })
        ],
        spacing: { before: 200, after: 200 }
      })
    )
    
    if (structuredCV.languages.arabic) {
      let arabicText = `${language === 'fr' ? 'Arabe : ' : language === 'en' ? 'Arabic : ' : 'العربية : '}${structuredCV.languages.arabic.level}`
      if (structuredCV.languages.arabic.classical) {
        arabicText += ` (${language === 'fr' ? 'Arabe classique' : language === 'en' ? 'Classical Arabic' : 'العربية الكلاسيكية'})`
      }
      children.push(
        new Paragraph({
          text: arabicText,
          spacing: { after: 100 }
        })
      )
    }
    
    if (structuredCV.languages.french) {
      children.push(
        new Paragraph({
          text: `${language === 'fr' ? 'Français : ' : language === 'en' ? 'French : ' : 'الفرنسية : '}${structuredCV.languages.french.level}`,
          spacing: { after: 100 }
        })
      )
    }
    
    if (structuredCV.languages.english) {
      let englishText = `${language === 'fr' ? 'Anglais : ' : language === 'en' ? 'English : ' : 'الإنجليزية : '}${structuredCV.languages.english.level}`
      if (structuredCV.languages.english.score) {
        englishText += ` (${structuredCV.languages.english.score})`
      }
      children.push(
        new Paragraph({
          text: englishText,
          spacing: { after: 100 }
        })
      )
    }
    
    children.push(new Paragraph({ text: '', spacing: { after: 300 } }))
  }

  // Centres d'intérêt
  if (structuredCV.interests) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: t.interests,
            bold: true,
            size: 22,
            color: '1e40af'
          })
        ],
        spacing: { before: 200, after: 200 }
      })
    )
    children.push(
      new Paragraph({
        text: structuredCV.interests,
        spacing: { after: 200 }
      })
    )
  }

  // Créer le document
  const doc = new Document({
    sections: [{
      properties: {},
      children: children
    }]
  })

  // Générer le blob
  const blob = await Packer.toBlob(doc)
  return blob
}

/**
 * Télécharger le CV en format Word
 * @param {Object} structuredCV - CV structuré
 * @param {string} language - Langue
 * @param {string} fileName - Nom du fichier (optionnel)
 */
export const downloadWordCV = async (structuredCV, language = 'fr', fileName = null) => {
  const { saveAs } = await import('file-saver')
  
  try {
    const blob = await generateWordDocument(structuredCV, language)
    const name = fileName || `${structuredCV.personalInfo.fullName.replace(/\s+/g, '_')}_CV.docx` || 'CV.docx'
    saveAs(blob, name)
  } catch (error) {
    console.error('Erreur lors de la génération du document Word:', error)
    throw error
  }
}

/**
 * Générer un PDF à partir du rendu HTML du CV (avec design visuel complet)
 * @param {HTMLElement} cvElement - Élément DOM du CV à convertir
 * @param {string} fileName - Nom du fichier
 */
export const generatePDFFromHTML = async (cvElement, fileName = 'CV.pdf') => {
  const html2canvas = (await import('html2canvas')).default
  const jsPDF = (await import('jspdf')).jsPDF
  const { saveAs } = await import('file-saver')
  
  try {
    // Options pour html2canvas
    const canvas = await html2canvas(cvElement, {
      scale: 2, // Qualité élevée
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: cvElement.scrollWidth,
      height: cvElement.scrollHeight
    })

    const imgData = canvas.toDataURL('image/png')
    
    // Calculer les dimensions du PDF (A4)
    const pdfWidth = 210 // mm (A4 width)
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width // Conserver le ratio
    
    const pdf = new jsPDF({
      orientation: pdfHeight > 297 ? 'portrait' : 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    // Si le contenu est plus grand qu'une page A4, on découpe en plusieurs pages
    const pageHeight = 297 // mm (A4 height)
    let heightLeft = pdfHeight
    let position = 0

    // Première page
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight)
    heightLeft -= pageHeight

    // Pages supplémentaires si nécessaire
    while (heightLeft > 0) {
      position = heightLeft - pdfHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight)
      heightLeft -= pageHeight
    }

    // Télécharger le PDF
    pdf.save(fileName)
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error)
    throw error
  }
}

/**
 * Télécharger le CV en format PDF (avec design visuel)
 * @param {HTMLElement} cvElement - Élément DOM du CV
 * @param {string} fullName - Nom complet pour le nom de fichier
 */
export const downloadPDFCV = async (cvElement, fullName = 'CV') => {
  try {
    const fileName = `${fullName.replace(/\s+/g, '_')}_CV.pdf`
    await generatePDFFromHTML(cvElement, fileName)
  } catch (error) {
    console.error('Erreur lors du téléchargement du PDF:', error)
    throw error
  }
}
