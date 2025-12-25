import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

/**
 * Composant Formulaire CV multi-étapes
 * 6 étapes : Informations générales, Compétences techniques, Soft skills, Expériences, Centres d'intérêt, Objectif
 */
function CVForm({ onComplete }) {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Template sélectionné
    template: 'template1', // template1, template2, template3, template4
    
    // Étape 1 : Coordonnées et Photo
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    neighborhood: '',
    linkedin: '',
    photo: null,
    photoPreview: null,
    
    // Étape 2 : Titre et Profil
    cvTitle: '', // Titre du CV (ex: "Lauréat de l'EMI – Ingénieur d'État")
    profile: '', // Message d'Accroche/Profil (3-4 lignes)
    
    // Étape 3 : Formation Diplômante (plusieurs diplômes possibles)
    diplomas: [], // Array de {level, diploma, institution, year, mention, pfeSubject}
    
    // Étape 4 : Formation Certifiante
    certifications: [], // Array de {name, organization, date, link}
    
    // Étape 5 : Expérience Professionnelle
    professionalExperiences: [], // Array de {type, position, company, city, period, missions: []}
    
    // Étape 6 : Expérience Extra-professionnelle
    extraProfessional: {
      projects: [], // {name, type, role, ranking, date}
      associations: [], // {organization, role, period}
      activities: [] // {activity, description}
    },
    
    // Étape 7 : Compétences Techniques (Hard Skills)
    technicalSkills: [],
    customTechnicalSkills: [], // Compétences personnalisées
    
    // Étape 8 : Compétences Informatiques
    itSkills: [],
    customItSkills: [], // Compétences informatiques personnalisées
    
    // Étape 9 : Compétences Managériales (Soft Skills)
    softSkills: [],
    
    // Étape 10 : Compétences Linguistiques
    languages: {
      arabic: { level: 'native', classical: false },
      french: { level: 'professional' },
      english: { level: '', score: '' } // A1-C2 ou TOEIC/TOEFL
    },
    
    // Étape 11 : Centres d'intérêt
    interests: ''
  })

  const totalSteps = 11

  // Options pour les champs select
  const educationLevels = [
    { value: 'bac', label: t('cv.form.education.bac', { defaultValue: 'Baccalauréat' }) },
    { value: 'bac+2', label: t('cv.form.education.bac2', { defaultValue: 'Bac+2 (DUT, BTS)' }) },
    { value: 'bac+3', label: t('cv.form.education.bac3', { defaultValue: 'Bac+3 (Licence)' }) },
    { value: 'bac+5', label: t('cv.form.education.bac5', { defaultValue: 'Bac+5 (Master)' }) },
    { value: 'bac+8', label: t('cv.form.education.bac8', { defaultValue: 'Bac+8 (Doctorat)' }) }
  ]

  const targetDomains = [
    { value: 'tech', label: t('cv.form.domain.tech', { defaultValue: 'Technologie / Informatique' }) },
    { value: 'commerce', label: t('cv.form.domain.commerce', { defaultValue: 'Commerce / Marketing' }) },
    { value: 'sante', label: t('cv.form.domain.sante', { defaultValue: 'Santé / Social' }) },
    { value: 'education', label: t('cv.form.domain.education', { defaultValue: 'Éducation / Formation' }) },
    { value: 'art', label: t('cv.form.domain.art', { defaultValue: 'Art / Design' }) },
    { value: 'autre', label: t('cv.form.domain.autre', { defaultValue: 'Autre' }) }
  ]

  const technicalSkillsOptions = [
    'Microsoft Office', 'Excel', 'PowerPoint', 'Word',
    'Photoshop', 'Illustrator', 'InDesign',
    'HTML/CSS', 'JavaScript', 'Python', 'Java', 'C++',
    'Gestion de projet', 'CRM', 'ERP', 'Réseaux sociaux',
    'Langues étrangères', 'Comptabilité', 'Marketing digital'
  ]

  const softSkillsOptions = [
    t('cv.form.soft_skills.communication', { defaultValue: 'Communication' }),
    t('cv.form.soft_skills.leadership', { defaultValue: 'Leadership' }),
    t('cv.form.soft_skills.creativity', { defaultValue: 'Créativité' }),
    t('cv.form.soft_skills.teamwork', { defaultValue: 'Travail d\'équipe' }),
    t('cv.form.soft_skills.adaptability', { defaultValue: 'Adaptabilité' }),
    t('cv.form.soft_skills.problem_solving', { defaultValue: 'Résolution de problèmes' }),
    t('cv.form.soft_skills.organization', { defaultValue: 'Organisation' }),
    t('cv.form.soft_skills.autonomy', { defaultValue: 'Autonomie' })
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Vérifier la taille (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert(t('cv.form.photo_size_error', { defaultValue: 'La photo ne doit pas dépasser 2MB' }))
        return
      }
      // Vérifier le type
      if (!file.type.startsWith('image/')) {
        alert(t('cv.form.photo_type_error', { defaultValue: 'Veuillez sélectionner une image' }))
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: file,
          photoPreview: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photo: null,
      photoPreview: null
    }))
  }

  const handleArrayToggle = (field, value) => {
    setFormData(prev => {
      const currentArray = prev[field] || []
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      return {
        ...prev,
        [field]: newArray
      }
    })
  }

  // Gestion des compétences personnalisées
  const [customSkillInput, setCustomSkillInput] = useState('')
  const [customItSkillInput, setCustomItSkillInput] = useState('')

  const handleAddCustomTechnicalSkill = () => {
    if (customSkillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        customTechnicalSkills: [...(prev.customTechnicalSkills || []), customSkillInput.trim()]
      }))
      setCustomSkillInput('')
    }
  }

  const handleRemoveCustomTechnicalSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      customTechnicalSkills: (prev.customTechnicalSkills || []).filter((_, i) => i !== index)
    }))
  }

  const handleAddCustomItSkill = () => {
    if (customItSkillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        customItSkills: [...(prev.customItSkills || []), customItSkillInput.trim()]
      }))
      setCustomItSkillInput('')
    }
  }

  const handleRemoveCustomItSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      customItSkills: (prev.customItSkills || []).filter((_, i) => i !== index)
    }))
  }

  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        type: 'stage',
        position: '',
        company: '',
        period: '',
        description: ''
      }]
    }))
  }

  const handleExperienceChange = (index, field, value) => {
    setFormData(prev => {
      const newExperiences = [...prev.experiences]
      newExperiences[index] = {
        ...newExperiences[index],
        [field]: value
      }
      return {
        ...prev,
        experiences: newExperiences
      }
    })
  }

  const handleRemoveExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }))
  }

  // Gestion des diplômes
  const handleAddDiploma = () => {
    setFormData(prev => ({
      ...prev,
      diplomas: [...(prev.diplomas || []), {
        level: '',
        diploma: '',
        institution: '',
        year: '',
        mention: '',
        pfeSubject: ''
      }]
    }))
  }

  const handleDiplomaChange = (index, field, value) => {
    setFormData(prev => {
      const newDiplomas = [...(prev.diplomas || [])]
      newDiplomas[index] = { ...newDiplomas[index], [field]: value }
      return { ...prev, diplomas: newDiplomas }
    })
  }

  const handleRemoveDiploma = (index) => {
    setFormData(prev => ({
      ...prev,
      diplomas: (prev.diplomas || []).filter((_, i) => i !== index)
    }))
  }

  // Gestion des certifications
  const handleAddCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), {
        name: '',
        organization: '',
        date: '',
        link: ''
      }]
    }))
  }

  const handleCertificationChange = (index, field, value) => {
    setFormData(prev => {
      const newCertifications = [...(prev.certifications || [])]
      newCertifications[index] = { ...newCertifications[index], [field]: value }
      return { ...prev, certifications: newCertifications }
    })
  }

  const handleRemoveCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== index)
    }))
  }

  // Gestion des expériences professionnelles
  const handleAddProfessionalExperience = () => {
    setFormData(prev => ({
      ...prev,
      professionalExperiences: [...(prev.professionalExperiences || []), {
        type: 'stage',
        position: '',
        company: '',
        city: '',
        period: '',
        missions: []
      }]
    }))
  }

  const handleProfessionalExperienceChange = (index, field, value) => {
    setFormData(prev => {
      const newExperiences = [...(prev.professionalExperiences || [])]
      newExperiences[index] = { ...newExperiences[index], [field]: value }
      return { ...prev, professionalExperiences: newExperiences }
    })
  }

  const handleAddMission = (expIndex) => {
    setFormData(prev => {
      const newExperiences = [...(prev.professionalExperiences || [])]
      if (!newExperiences[expIndex].missions) {
        newExperiences[expIndex].missions = []
      }
      newExperiences[expIndex].missions.push('')
      return { ...prev, professionalExperiences: newExperiences }
    })
  }

  const handleMissionChange = (expIndex, missionIndex, value) => {
    setFormData(prev => {
      const newExperiences = [...(prev.professionalExperiences || [])]
      newExperiences[expIndex].missions[missionIndex] = value
      return { ...prev, professionalExperiences: newExperiences }
    })
  }

  const handleRemoveMission = (expIndex, missionIndex) => {
    setFormData(prev => {
      const newExperiences = [...(prev.professionalExperiences || [])]
      newExperiences[expIndex].missions = newExperiences[expIndex].missions.filter((_, i) => i !== missionIndex)
      return { ...prev, professionalExperiences: newExperiences }
    })
  }

  const handleRemoveProfessionalExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      professionalExperiences: (prev.professionalExperiences || []).filter((_, i) => i !== index)
    }))
  }

  // Gestion des expériences extra-professionnelles
  const handleAddProject = () => {
    setFormData(prev => ({
      ...prev,
      extraProfessional: {
        ...prev.extraProfessional,
        projects: [...(prev.extraProfessional?.projects || []), {
          name: '',
          type: '',
          role: '',
          ranking: '',
          date: ''
        }]
      }
    }))
  }

  const handleProjectChange = (index, field, value) => {
    setFormData(prev => {
      const newProjects = [...(prev.extraProfessional?.projects || [])]
      newProjects[index] = { ...newProjects[index], [field]: value }
      return {
        ...prev,
        extraProfessional: { ...prev.extraProfessional, projects: newProjects }
      }
    })
  }

  const handleRemoveProject = (index) => {
    setFormData(prev => ({
      ...prev,
      extraProfessional: {
        ...prev.extraProfessional,
        projects: (prev.extraProfessional?.projects || []).filter((_, i) => i !== index)
      }
    }))
  }

  const handleAddAssociation = () => {
    setFormData(prev => ({
      ...prev,
      extraProfessional: {
        ...prev.extraProfessional,
        associations: [...(prev.extraProfessional?.associations || []), {
          organization: '',
          role: '',
          period: ''
        }]
      }
    }))
  }

  const handleAssociationChange = (index, field, value) => {
    setFormData(prev => {
      const newAssociations = [...(prev.extraProfessional?.associations || [])]
      newAssociations[index] = { ...newAssociations[index], [field]: value }
      return {
        ...prev,
        extraProfessional: { ...prev.extraProfessional, associations: newAssociations }
      }
    })
  }

  const handleRemoveAssociation = (index) => {
    setFormData(prev => ({
      ...prev,
      extraProfessional: {
        ...prev.extraProfessional,
        associations: (prev.extraProfessional?.associations || []).filter((_, i) => i !== index)
      }
    }))
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.city
      case 2:
        return formData.cvTitle.trim().length > 0 && formData.profile.trim().length > 50
      case 3:
        return formData.diplomas.length > 0 // Au moins un diplôme
      case 4:
        return true // Certifications optionnelles
      case 5:
        return true // Expériences professionnelles optionnelles
      case 6:
        return true // Expériences extra-professionnelles optionnelles
      case 7:
        return (formData.technicalSkills && formData.technicalSkills.length > 0) || 
               (formData.customTechnicalSkills && formData.customTechnicalSkills.length > 0)
      case 8:
        return (formData.itSkills && formData.itSkills.length > 0) || 
               (formData.customItSkills && formData.customItSkills.length > 0)
      case 9:
        return formData.softSkills.length > 0
      case 10:
        return true // Langues (au moins l'arabe est native)
      case 11:
        return true // Centres d'intérêt optionnels
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (onComplete) {
      // Combiner les compétences sélectionnées et personnalisées
      const finalFormData = {
        ...formData,
        technicalSkills: [
          ...(formData.technicalSkills || []),
          ...(formData.customTechnicalSkills || [])
        ],
        itSkills: [
          ...(formData.itSkills || []),
          ...(formData.customItSkills || [])
        ]
      }
      onComplete(finalFormData)
    }
  }

  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fadeIn">
      {/* Barre de progression */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span aria-live="polite" aria-atomic="true">
            {t('cv.form.step', { defaultValue: 'Étape' })} {currentStep} / {totalSteps}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            aria-label={`${t('cv.form.step', { defaultValue: 'Étape' })} ${currentStep} ${t('cv.form.of', { defaultValue: 'sur' })} ${totalSteps}`}
          />
        </div>
      </div>

      {/* Étape 1 : Sélection du template et Informations générales */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-fadeIn" role="region" aria-labelledby="step1-title">
          {/* Sélection du template */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t('cv.form.template_selection', { defaultValue: 'Choisissez un modèle de CV' })}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Template 1 - Moderne */}
              <label className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                formData.template === 'template1'
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300'
              }`}>
                <input
                  type="radio"
                  name="template"
                  value="template1"
                  checked={formData.template === 'template1'}
                  onChange={(e) => handleInputChange('template', e.target.value)}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="w-full h-24 bg-gradient-to-r from-primary-600 to-primary-700 rounded mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MODERNE</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Moderne</p>
                </div>
              </label>

              {/* Template 2 - Classique */}
              <label className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                formData.template === 'template2'
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300'
              }`}>
                <input
                  type="radio"
                  name="template"
                  value="template2"
                  checked={formData.template === 'template2'}
                  onChange={(e) => handleInputChange('template', e.target.value)}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="w-full h-24 bg-gray-800 rounded mb-2 flex items-center justify-center">
                    <div className="w-1/4 h-full bg-primary-600 rounded-l"></div>
                    <div className="flex-1"></div>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Classique</p>
                </div>
              </label>

              {/* Template 3 - Minimaliste */}
              <label className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                formData.template === 'template3'
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300'
              }`}>
                <input
                  type="radio"
                  name="template"
                  value="template3"
                  checked={formData.template === 'template3'}
                  onChange={(e) => handleInputChange('template', e.target.value)}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="w-full h-24 bg-white border-l-4 border-green-500 rounded mb-2 flex items-center justify-center">
                    <span className="text-gray-600 text-xs font-bold">MINIMALISTE</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Minimaliste</p>
                </div>
              </label>

              {/* Template 4 - Créatif */}
              <label className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                formData.template === 'template4'
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300'
              }`}>
                <input
                  type="radio"
                  name="template"
                  value="template4"
                  checked={formData.template === 'template4'}
                  onChange={(e) => handleInputChange('template', e.target.value)}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="w-full h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">CRÉATIF</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Créatif</p>
                </div>
              </label>
            </div>
          </div>

          <h2 id="step1-title" className="text-2xl font-bold text-gray-800 mb-6">
            {t('cv.form.step1.title', { defaultValue: 'Informations générales' })}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('cv.form.firstName', { defaultValue: 'Prénom' })} *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('cv.form.lastName', { defaultValue: 'Nom' })} *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('cv.form.email', { defaultValue: 'Email' })} *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('cv.form.phone', { defaultValue: 'Téléphone' })} *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder={t('cv.form.phone_placeholder', { defaultValue: '+212 6XX XXX XXX' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Coordonnées supplémentaires */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('cv.form.city', { defaultValue: 'Ville' })} *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder={t('cv.form.city_placeholder', { defaultValue: 'Ex: Casablanca' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('cv.form.neighborhood', { defaultValue: 'Quartier' })}
                <span className="text-xs text-gray-500 ml-1">
                  ({t('cv.form.optional', { defaultValue: 'optionnel' })})
                </span>
              </label>
              <input
                type="text"
                value={formData.neighborhood}
                onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                placeholder={t('cv.form.neighborhood_placeholder', { defaultValue: 'Ex: Maarif (pour la mobilité)' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('cv.form.linkedin', { defaultValue: 'Profil LinkedIn' })}
                <span className="text-xs text-gray-500 ml-1">
                  ({t('cv.form.optional', { defaultValue: 'optionnel' })})
                </span>
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                placeholder={t('cv.form.linkedin_placeholder', { defaultValue: 'https://linkedin.com/in/votre-profil' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t('cv.form.linkedin_hint', { defaultValue: 'Conseil 2025 : Vérifiez que votre lien LinkedIn est personnalisé (sans chiffres inutiles à la fin)' })}
              </p>
            </div>
          </div>

          {/* Upload Photo */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('cv.form.photo', { defaultValue: 'Photo professionnelle (optionnel)' })}
            </label>
            <p className="text-xs text-gray-500 mb-2">
              {t('cv.form.photo_advice', { defaultValue: 'Format : Portrait de face, fond neutre, tenue professionnelle. Au Maroc, la photo reste d\'usage courant pour humaniser le profil.' })}
            </p>
            <div className="flex items-center gap-4">
              {formData.photoPreview ? (
                <div className="relative">
                  <img 
                    src={formData.photoPreview} 
                    alt="Photo CV" 
                    className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    title={t('cv.form.remove_photo', { defaultValue: 'Supprimer la photo' })}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">📷</span>
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors text-sm font-medium"
                >
                  {formData.photoPreview 
                    ? t('cv.form.change_photo', { defaultValue: 'Changer la photo' })
                    : t('cv.form.add_photo', { defaultValue: 'Ajouter une photo' })
                  }
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  {t('cv.form.photo_hint', { defaultValue: 'Format JPG/PNG, max 2MB' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Étape 2 : Titre du CV et Message d'Accroche */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('cv.form.step2.title', { defaultValue: 'Titre du CV et Profil' })}
          </h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('cv.form.cvTitle', { defaultValue: 'Titre du CV' })} *
            </label>
            <p className="text-xs text-gray-500 mb-2">
              {t('cv.form.cvTitle_hint', { defaultValue: 'L\'intitulé exact du poste visé ou de votre diplôme phare. Ex: "Lauréat de l\'EMI – Ingénieur d\'État en Génie Civil"' })}
            </p>
            <input
              type="text"
              value={formData.cvTitle}
              onChange={(e) => handleInputChange('cvTitle', e.target.value)}
              placeholder={t('cv.form.cvTitle_placeholder', { defaultValue: 'Ex: Lauréat de l\'EMI – Ingénieur d\'État en Génie Civil' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('cv.form.profile', { defaultValue: 'Message d\'Accroche / Profil' })} *
            </label>
            <p className="text-xs text-gray-500 mb-2">
              {t('cv.form.profile_hint', { defaultValue: 'Un paragraphe de 3 à 4 lignes résumant votre formation, votre expertise majeure et votre valeur ajoutée.' })}
            </p>
            <textarea
              value={formData.profile}
              onChange={(e) => handleInputChange('profile', e.target.value)}
              rows={6}
              placeholder={t('cv.form.profile_placeholder', { defaultValue: 'Ex: Jeune diplômé de l\'ENCG passionné par l\'analyse de données, doté d\'une première expérience en audit chez [Cabinet X]. Orienté résultats et prêt à intégrer vos équipes finance.' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.profile.length} {t('cv.form.characters', { defaultValue: 'caractères' })} 
              {formData.profile.length < 50 && (
                <span className="text-red-500 ml-2">
                  ({t('cv.form.minimum_50', { defaultValue: 'Minimum 50 caractères' })})
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Étape 3 : Formation Diplômante */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {t('cv.form.step3.title', { defaultValue: 'Formation Diplômante' })}
            </h2>
            <button
              type="button"
              onClick={handleAddDiploma}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
            >
              + {t('cv.form.add_diploma', { defaultValue: 'Ajouter un diplôme' })}
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            {t('cv.form.step3.description', { defaultValue: 'Vos diplômes d\'État ou d\'écoles classés du plus récent au plus ancien. Mentionnez l\'institution, l\'année, la mention et le sujet du PFE.' })}
          </p>
          
          {(!formData.diplomas || formData.diplomas.length === 0) ? (
            <p className="text-gray-500 text-center py-8">
              {t('cv.form.no_diploma', { defaultValue: 'Aucun diplôme ajouté. Cliquez sur "Ajouter un diplôme" pour commencer.' })}
            </p>
          ) : (
            <div className="space-y-4">
              {formData.diplomas.map((diploma, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-800">
                      {t('cv.form.diploma', { defaultValue: 'Diplôme' })} {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleRemoveDiploma(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      {t('cv.form.remove', { defaultValue: 'Supprimer' })}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.diploma_level', { defaultValue: 'Niveau' })} *
                      </label>
                      <select
                        value={diploma.level || ''}
                        onChange={(e) => handleDiplomaChange(index, 'level', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">{t('cv.form.select', { defaultValue: 'Sélectionner...' })}</option>
                        {educationLevels.map(level => (
                          <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.diploma_name', { defaultValue: 'Diplôme' })} *
                      </label>
                      <input
                        type="text"
                        value={diploma.diploma || ''}
                        onChange={(e) => handleDiplomaChange(index, 'diploma', e.target.value)}
                        placeholder={t('cv.form.diploma_name_placeholder', { defaultValue: 'Ex: Ingénieur d\'État en Génie Civil' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.institution', { defaultValue: 'Institution' })} *
                      </label>
                      <input
                        type="text"
                        value={diploma.institution || ''}
                        onChange={(e) => handleDiplomaChange(index, 'institution', e.target.value)}
                        placeholder={t('cv.form.institution_placeholder', { defaultValue: 'Ex: École Mohammadia d\'Ingénieurs (EMI)' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.year', { defaultValue: 'Année d\'obtention' })}
                      </label>
                      <input
                        type="text"
                        value={diploma.year || ''}
                        onChange={(e) => handleDiplomaChange(index, 'year', e.target.value)}
                        placeholder={t('cv.form.year_placeholder', { defaultValue: 'Ex: 2024' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.mention', { defaultValue: 'Mention' })}
                      </label>
                      <input
                        type="text"
                        value={diploma.mention || ''}
                        onChange={(e) => handleDiplomaChange(index, 'mention', e.target.value)}
                        placeholder={t('cv.form.mention_placeholder', { defaultValue: 'Ex: Bien, Assez Bien, Très Bien' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.pfe_subject', { defaultValue: 'Sujet du PFE' })}
                      </label>
                      <input
                        type="text"
                        value={diploma.pfeSubject || ''}
                        onChange={(e) => handleDiplomaChange(index, 'pfeSubject', e.target.value)}
                        placeholder={t('cv.form.pfe_subject_placeholder', { defaultValue: 'Ex: Conception d\'un système de gestion...' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Étape 4 : Formation Certifiante */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {t('cv.form.step4.title', { defaultValue: 'Formation Certifiante' })}
            </h2>
            <button
              type="button"
              onClick={handleAddCertification}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
            >
              + {t('cv.form.add_certification', { defaultValue: 'Ajouter une certification' })}
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            {t('cv.form.step4.description', { defaultValue: 'Certifications obtenues hors cursus universitaire (Coursera, Google Ads, Microsoft, Lean Six Sigma, etc.). Elles prouvent votre autonomie et votre volonté d\'apprentissage continu.' })}
          </p>
          
          {(!formData.certifications || formData.certifications.length === 0) ? (
            <p className="text-gray-500 text-center py-8">
              {t('cv.form.no_certification', { defaultValue: 'Aucune certification ajoutée. (Optionnel)' })}
            </p>
          ) : (
            <div className="space-y-4">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-800">
                      {t('cv.form.certification', { defaultValue: 'Certification' })} {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      {t('cv.form.remove', { defaultValue: 'Supprimer' })}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.cert_name', { defaultValue: 'Nom de la certification' })} *
                      </label>
                      <input
                        type="text"
                        value={cert.name || ''}
                        onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                        placeholder={t('cv.form.cert_name_placeholder', { defaultValue: 'Ex: Google Ads Certification' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.organization', { defaultValue: 'Organisme' })} *
                      </label>
                      <input
                        type="text"
                        value={cert.organization || ''}
                        onChange={(e) => handleCertificationChange(index, 'organization', e.target.value)}
                        placeholder={t('cv.form.organization_placeholder', { defaultValue: 'Ex: Google, Coursera, Microsoft' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.cert_date', { defaultValue: 'Date d\'obtention' })}
                      </label>
                      <input
                        type="text"
                        value={cert.date || ''}
                        onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                        placeholder={t('cv.form.cert_date_placeholder', { defaultValue: 'Ex: Janvier 2024' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.cert_link', { defaultValue: 'Lien (optionnel)' })}
                      </label>
                      <input
                        type="url"
                        value={cert.link || ''}
                        onChange={(e) => handleCertificationChange(index, 'link', e.target.value)}
                        placeholder={t('cv.form.cert_link_placeholder', { defaultValue: 'https://...' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Étape 5 : Expériences Professionnelles */}
      {currentStep === 5 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {t('cv.form.step5.title', { defaultValue: 'Expériences Professionnelles' })}
            </h2>
            <button
              type="button"
              onClick={handleAddProfessionalExperience}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
            >
              + {t('cv.form.add_experience', { defaultValue: 'Ajouter une expérience' })}
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            {t('cv.form.step5.description', { defaultValue: 'Stages (PFE, observation, technique) et premiers emplois/CDD. Indiquez les missions avec les résultats obtenus.' })}
          </p>
          
          {(!formData.professionalExperiences || formData.professionalExperiences.length === 0) ? (
            <p className="text-gray-500 text-center py-8">
              {t('cv.form.no_experience', { defaultValue: 'Aucune expérience ajoutée. (Optionnel)' })}
            </p>
          ) : (
            <div className="space-y-4">
              {formData.professionalExperiences.map((exp, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-800">
                      {t('cv.form.experience', { defaultValue: 'Expérience' })} {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleRemoveProfessionalExperience(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      {t('cv.form.remove', { defaultValue: 'Supprimer' })}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.experience_type', { defaultValue: 'Type' })}
                      </label>
                      <select
                        value={exp.type || 'stage'}
                        onChange={(e) => handleProfessionalExperienceChange(index, 'type', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="pfe">{t('cv.form.type.pfe', { defaultValue: 'Stage PFE' })}</option>
                        <option value="stage">{t('cv.form.type.stage', { defaultValue: 'Stage' })}</option>
                        <option value="observation">{t('cv.form.type.observation', { defaultValue: 'Stage d\'observation' })}</option>
                        <option value="technique">{t('cv.form.type.technique', { defaultValue: 'Stage technique' })}</option>
                        <option value="cdd">{t('cv.form.type.cdd', { defaultValue: 'CDD' })}</option>
                        <option value="cdi">{t('cv.form.type.cdi', { defaultValue: 'CDI' })}</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.position', { defaultValue: 'Poste' })} *
                      </label>
                      <input
                        type="text"
                        value={exp.position || ''}
                        onChange={(e) => handleProfessionalExperienceChange(index, 'position', e.target.value)}
                        placeholder={t('cv.form.position_placeholder', { defaultValue: 'Ex: Stagiaire en Marketing Digital' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.company', { defaultValue: 'Entreprise' })} *
                      </label>
                      <input
                        type="text"
                        value={exp.company || ''}
                        onChange={(e) => handleProfessionalExperienceChange(index, 'company', e.target.value)}
                        placeholder={t('cv.form.company_placeholder', { defaultValue: 'Ex: Cabinet X' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.city', { defaultValue: 'Ville' })}
                      </label>
                      <input
                        type="text"
                        value={exp.city || ''}
                        onChange={(e) => handleProfessionalExperienceChange(index, 'city', e.target.value)}
                        placeholder={t('cv.form.city_placeholder', { defaultValue: 'Ex: Casablanca' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('cv.form.period', { defaultValue: 'Période' })}
                      </label>
                      <input
                        type="text"
                        value={exp.period || ''}
                        onChange={(e) => handleProfessionalExperienceChange(index, 'period', e.target.value)}
                        placeholder={t('cv.form.period_placeholder', { defaultValue: 'Ex: Jan 2023 - Juin 2023' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  
                  {/* Missions avec résultats */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {t('cv.form.missions', { defaultValue: 'Missions (3-4 puces avec résultats obtenus)' })}
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddMission(index)}
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        + {t('cv.form.add_mission', { defaultValue: 'Ajouter une mission' })}
                      </button>
                    </div>
                    {(!exp.missions || exp.missions.length === 0) ? (
                      <p className="text-gray-400 text-sm italic">
                        {t('cv.form.no_mission', { defaultValue: 'Aucune mission ajoutée' })}
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {exp.missions.map((mission, missionIndex) => (
                          <div key={missionIndex} className="flex gap-2 items-start">
                            <span className="text-primary-600 mt-2">•</span>
                            <input
                              type="text"
                              value={mission}
                              onChange={(e) => handleMissionChange(index, missionIndex, e.target.value)}
                              placeholder={t('cv.form.mission_placeholder', { defaultValue: 'Ex: Analyse des données clients → +15% de conversion' })}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveMission(index, missionIndex)}
                              className="text-red-600 hover:text-red-700 text-sm mt-2"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Étape 6 : Expériences Extra-professionnelles */}
      {currentStep === 6 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('cv.form.step6.title', { defaultValue: 'Expériences Extra-professionnelles' })}
          </h2>
          
          {/* Projets et Compétitions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {t('cv.form.projects_competitions', { defaultValue: 'Projets et Compétitions' })}
              </h3>
              <button
                type="button"
                onClick={handleAddProject}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
              >
                + {t('cv.form.add_project', { defaultValue: 'Ajouter' })}
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {t('cv.form.projects_hint', { defaultValue: 'Hackathons, compétitions d\'entrepreneuriat (Enactus, Injaz), challenges techniques. Indiquez votre rôle et le classement obtenu.' })}
            </p>
            
            {(!formData.extraProfessional?.projects || formData.extraProfessional.projects.length === 0) ? (
              <p className="text-gray-400 text-sm italic text-center py-4">
                {t('cv.form.no_project', { defaultValue: 'Aucun projet ajouté. (Optionnel)' })}
              </p>
            ) : (
              <div className="space-y-3">
                {formData.extraProfessional.projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800">
                        {t('cv.form.project', { defaultValue: 'Projet' })} {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        {t('cv.form.remove', { defaultValue: 'Supprimer' })}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('cv.form.project_name', { defaultValue: 'Nom du projet / Compétition' })}
                        </label>
                        <input
                          type="text"
                          value={project.name || ''}
                          onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                          placeholder={t('cv.form.project_name_placeholder', { defaultValue: 'Ex: Hackathon Tech 2024' })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('cv.form.project_type', { defaultValue: 'Type' })}
                        </label>
                        <select
                          value={project.type || ''}
                          onChange={(e) => handleProjectChange(index, 'type', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">{t('cv.form.select', { defaultValue: 'Sélectionner...' })}</option>
                          <option value="hackathon">{t('cv.form.type.hackathon', { defaultValue: 'Hackathon' })}</option>
                          <option value="enactus">{t('cv.form.type.enactus', { defaultValue: 'Enactus' })}</option>
                          <option value="injaz">{t('cv.form.type.injaz', { defaultValue: 'Injaz' })}</option>
                          <option value="challenge">{t('cv.form.type.challenge', { defaultValue: 'Challenge technique' })}</option>
                          <option value="other">{t('cv.form.type.other', { defaultValue: 'Autre' })}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('cv.form.role', { defaultValue: 'Votre rôle' })}
                        </label>
                        <input
                          type="text"
                          value={project.role || ''}
                          onChange={(e) => handleProjectChange(index, 'role', e.target.value)}
                          placeholder={t('cv.form.role_placeholder', { defaultValue: 'Ex: Développeur Frontend' })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('cv.form.ranking', { defaultValue: 'Classement' })}
                        </label>
                        <input
                          type="text"
                          value={project.ranking || ''}
                          onChange={(e) => handleProjectChange(index, 'ranking', e.target.value)}
                          placeholder={t('cv.form.ranking_placeholder', { defaultValue: 'Ex: 1er prix, Finaliste' })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('cv.form.date', { defaultValue: 'Date' })}
                        </label>
                        <input
                          type="text"
                          value={project.date || ''}
                          onChange={(e) => handleProjectChange(index, 'date', e.target.value)}
                          placeholder={t('cv.form.date_placeholder', { defaultValue: 'Ex: Mars 2024' })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Associations et Bénévolat */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {t('cv.form.associations', { defaultValue: 'Associations et Bénévolat' })}
              </h3>
              <button
                type="button"
                onClick={handleAddAssociation}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
              >
                + {t('cv.form.add_association', { defaultValue: 'Ajouter' })}
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {t('cv.form.associations_hint', { defaultValue: 'Implication dans des clubs d\'école ou ONG. Cela démontre votre esprit de citoyenneté et vos valeurs humaines.' })}
            </p>
            
            {(!formData.extraProfessional?.associations || formData.extraProfessional.associations.length === 0) ? (
              <p className="text-gray-400 text-sm italic text-center py-4">
                {t('cv.form.no_association', { defaultValue: 'Aucune association ajoutée. (Optionnel)' })}
              </p>
            ) : (
              <div className="space-y-3">
                {formData.extraProfessional.associations.map((assoc, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800">
                        {t('cv.form.association', { defaultValue: 'Association' })} {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveAssociation(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        {t('cv.form.remove', { defaultValue: 'Supprimer' })}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('cv.form.organization', { defaultValue: 'Organisation' })}
                        </label>
                        <input
                          type="text"
                          value={assoc.organization || ''}
                          onChange={(e) => handleAssociationChange(index, 'organization', e.target.value)}
                          placeholder={t('cv.form.organization_placeholder', { defaultValue: 'Ex: Club Entrepreneuriat' })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('cv.form.role', { defaultValue: 'Rôle' })}
                        </label>
                        <input
                          type="text"
                          value={assoc.role || ''}
                          onChange={(e) => handleAssociationChange(index, 'role', e.target.value)}
                          placeholder={t('cv.form.role_placeholder', { defaultValue: 'Ex: Trésorier, Membre actif' })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('cv.form.period', { defaultValue: 'Période' })}
                        </label>
                        <input
                          type="text"
                          value={assoc.period || ''}
                          onChange={(e) => handleAssociationChange(index, 'period', e.target.value)}
                          placeholder={t('cv.form.period_placeholder', { defaultValue: 'Ex: 2023-2024' })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Étape 7 : Compétences Techniques (Hard Skills) */}
      {currentStep === 7 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('cv.form.step7.title', { defaultValue: 'Compétences Techniques (Hard Skills)' })}
          </h2>
          <p className="text-gray-600 mb-4">
            {t('cv.form.step7.description', { defaultValue: 'Savoirs spécifiques liés à votre métier (ex: Normes comptables marocaines, calcul de structure, droit du travail, techniques de vente)' })}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {technicalSkillsOptions.map(skill => (
              <label
                key={skill}
                className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  (formData.technicalSkills || []).includes(skill)
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={(formData.technicalSkills || []).includes(skill)}
                  onChange={() => handleArrayToggle('technicalSkills', skill)}
                  className="mr-2 w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{skill}</span>
              </label>
            ))}
          </div>

          {/* Compétences personnalisées */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('cv.form.custom_skills', { defaultValue: 'Ajouter des compétences personnalisées' })}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {t('cv.form.custom_skills_hint', { defaultValue: 'Ajoutez des compétences spécifiques à votre domaine (ex: Normes comptables marocaines, calcul de structure, droit du travail)' })}
            </p>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddCustomTechnicalSkill()
                  }
                }}
                placeholder={t('cv.form.custom_skill_placeholder', { defaultValue: 'Ex: Normes comptables marocaines' })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddCustomTechnicalSkill}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                {t('cv.form.add', { defaultValue: 'Ajouter' })}
              </button>
            </div>

            {/* Liste des compétences personnalisées */}
            {formData.customTechnicalSkills && formData.customTechnicalSkills.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {t('cv.form.custom_skills_added', { defaultValue: 'Compétences ajoutées :' })}
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.customTechnicalSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm border border-primary-200"
                    >
                      <span>• {skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomTechnicalSkill(index)}
                        className="text-primary-700 hover:text-primary-900 font-bold ml-1"
                        title={t('cv.form.remove', { defaultValue: 'Supprimer' })}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Étape 8 : Compétences Informatiques */}
      {currentStep === 8 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('cv.form.step8.title', { defaultValue: 'Compétences Informatiques' })}
          </h2>
          <p className="text-gray-600 mb-4">
            {t('cv.form.step8.description', { defaultValue: 'Maîtrise des logiciels bureautiques (Pack Office, surtout Excel) et des outils métiers (ERP comme SAP, logiciels de design comme Canva/Adobe, ou de programmation)' })}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {['Microsoft Office', 'Excel', 'Word', 'PowerPoint', 'Outlook', 'SAP', 'ERP', 'Canva', 'Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'HTML/CSS', 'JavaScript', 'Python', 'Java', 'Git', 'MySQL', 'MongoDB'].map(skill => (
              <label
                key={skill}
                className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  (formData.itSkills || []).includes(skill)
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={(formData.itSkills || []).includes(skill)}
                  onChange={() => handleArrayToggle('itSkills', skill)}
                  className="mr-2 w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{skill}</span>
              </label>
            ))}
          </div>

          {/* Compétences informatiques personnalisées */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('cv.form.custom_it_skills', { defaultValue: 'Ajouter des compétences informatiques personnalisées' })}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {t('cv.form.custom_it_skills_hint', { defaultValue: 'Ajoutez des logiciels ou outils spécifiques à votre domaine' })}
            </p>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={customItSkillInput}
                onChange={(e) => setCustomItSkillInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddCustomItSkill()
                  }
                }}
                placeholder={t('cv.form.custom_it_skill_placeholder', { defaultValue: 'Ex: Tableau, Power BI, Salesforce' })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddCustomItSkill}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                {t('cv.form.add', { defaultValue: 'Ajouter' })}
              </button>
            </div>

            {/* Liste des compétences informatiques personnalisées */}
            {formData.customItSkills && formData.customItSkills.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {t('cv.form.custom_skills_added', { defaultValue: 'Compétences ajoutées :' })}
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.customItSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm border border-blue-200"
                    >
                      <span>• {skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomItSkill(index)}
                        className="text-blue-700 hover:text-blue-900 font-bold ml-1"
                        title={t('cv.form.remove', { defaultValue: 'Supprimer' })}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Étape 9 : Compétences Managériales (Soft Skills) */}
      {currentStep === 9 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('cv.form.step9.title', { defaultValue: 'Compétences Managériales (Soft Skills)' })}
          </h2>
          <p className="text-gray-600 mb-4">
            {t('cv.form.step9.description', { defaultValue: 'Capacités comportementales. En 2025, privilégiez : Esprit d\'équipe, gestion du stress, résolution de problèmes, et leadership' })}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {softSkillsOptions.map(skill => (
              <label
                key={skill}
                className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  (formData.softSkills || []).includes(skill)
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={(formData.softSkills || []).includes(skill)}
                  onChange={() => handleArrayToggle('softSkills', skill)}
                  className="mr-2 w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{skill}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Étape 10 : Compétences Linguistiques */}
      {currentStep === 10 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('cv.form.step10.title', { defaultValue: 'Compétences Linguistiques' })}
          </h2>
          
          <div className="space-y-6">
            {/* Arabe */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('cv.form.arabic', { defaultValue: 'Arabe' })}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {t('cv.form.level', { defaultValue: 'Niveau' })}
                  </label>
                  <select
                    value={formData.languages?.arabic?.level || 'native'}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      languages: {
                        ...prev.languages,
                        arabic: { ...prev.languages?.arabic, level: e.target.value }
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="native">{t('cv.form.native', { defaultValue: 'Langue maternelle' })}</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.languages?.arabic?.classical || false}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      languages: {
                        ...prev.languages,
                        arabic: { ...prev.languages?.arabic, classical: e.target.checked }
                      }
                    }))}
                    className="mr-2 w-4 h-4 text-primary-600"
                  />
                  <label className="text-sm text-gray-700">
                    {t('cv.form.classical_arabic', { defaultValue: 'Maîtrise de l\'Arabe classique' })}
                  </label>
                </div>
              </div>
            </div>

            {/* Français */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('cv.form.french', { defaultValue: 'Français' })}
              </label>
              <select
                value={formData.languages?.french?.level || 'professional'}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  languages: {
                    ...prev.languages,
                    french: { level: e.target.value }
                  }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="professional">{t('cv.form.professional', { defaultValue: 'Professionnel' })}</option>
                <option value="fluent">{t('cv.form.fluent', { defaultValue: 'Courant' })}</option>
                <option value="intermediate">{t('cv.form.intermediate', { defaultValue: 'Intermédiaire' })}</option>
              </select>
            </div>

            {/* Anglais */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('cv.form.english', { defaultValue: 'Anglais' })}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {t('cv.form.level', { defaultValue: 'Niveau' })}
                  </label>
                  <select
                    value={formData.languages?.english?.level || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      languages: {
                        ...prev.languages,
                        english: { ...prev.languages?.english, level: e.target.value }
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('cv.form.select', { defaultValue: 'Sélectionner...' })}</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {t('cv.form.score', { defaultValue: 'Score TOEIC/TOEFL (optionnel)' })}
                  </label>
                  <input
                    type="text"
                    value={formData.languages?.english?.score || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      languages: {
                        ...prev.languages,
                        english: { ...prev.languages?.english, score: e.target.value }
                      }
                    }))}
                    placeholder={t('cv.form.score_placeholder', { defaultValue: 'Ex: TOEIC 850' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Étape 11 : Centres d'intérêt */}
      {currentStep === 11 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('cv.form.step11.title', { defaultValue: 'Loisirs et Centres d\'intérêt' })}
          </h2>
          <p className="text-gray-600 mb-4">
            {t('cv.form.step11.description', { defaultValue: 'Vos passions réelles. Soyez spécifique pour susciter la curiosité (ex: "Course à pied - Participation au Marathon de Casablanca" plutôt que juste "Sport")' })}
          </p>
          
          <textarea
            value={formData.interests || ''}
            onChange={(e) => handleInputChange('interests', e.target.value)}
            rows={6}
            placeholder={t('cv.form.interests_placeholder', { defaultValue: 'Ex: Course à pied - Participation au Marathon de Casablanca 2024\nLecture thématique - Intérêt pour la littérature entrepreneuriale\nVoyage - Exploration de 15 pays en Europe et Afrique' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      )}

      {/* Boutons de navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 min-h-[44px] ${
            currentStep === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover-lift focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
          }`}
          aria-label={t('common.previous', { defaultValue: 'Étape précédente' })}
          aria-disabled={currentStep === 1}
        >
          {t('common.previous', { defaultValue: 'Précédent' })}
        </button>
        
        <button
          onClick={handleNext}
          disabled={!validateStep(currentStep)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 min-h-[44px] ${
            validateStep(currentStep)
              ? 'bg-primary-600 text-white hover:bg-primary-700 hover-lift focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
          }`}
          aria-label={
            currentStep === totalSteps
              ? t('cv.form.submit', { defaultValue: 'Générer mon CV' })
              : t('common.next', { defaultValue: 'Étape suivante' })
          }
          aria-disabled={!validateStep(currentStep)}
        >
          {currentStep === totalSteps
            ? t('cv.form.submit', { defaultValue: 'Générer mon CV' })
            : t('common.next', { defaultValue: 'Suivant' })
          }
        </button>
      </div>
    </div>
  )
}

export default CVForm

