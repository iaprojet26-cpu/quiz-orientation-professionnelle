-- ============================================
-- INITIAL HUB CONTENT (FR / EN / AR)
-- Starter dataset to launch the platform quickly
-- ============================================

BEGIN;

-- --------------------------------------------
-- 1) CAREER PATHS
-- --------------------------------------------
WITH inserted AS (
  INSERT INTO career_paths (slug, level_group, salary_min_monthly, salary_max_monthly, active)
  VALUES
    ('developpeur-web', 'junior-mid', 7000, 18000, true),
    ('data-analyst', 'junior-mid', 8000, 20000, true),
    ('ux-ui-designer', 'junior-mid', 7000, 17000, true),
    ('digital-marketing-specialist', 'junior-mid', 6500, 16000, true),
    ('cybersecurity-analyst', 'mid-senior', 10000, 26000, true),
    ('project-manager', 'mid-senior', 9000, 24000, true)
  ON CONFLICT (slug) DO UPDATE
    SET active = EXCLUDED.active,
        updated_at = NOW()
  RETURNING id, slug
)
INSERT INTO career_path_translations (
  career_path_id, language, title, short_description, long_description, skills, education_paths, opportunities_summary
)
SELECT i.id, t.language::lang_code, t.title, t.short_description, t.long_description, t.skills, t.education_paths, t.opportunities_summary
FROM inserted i
JOIN (
  VALUES
  ('developpeur-web','fr','Developpeur Web','Conception et developpement de sites et applications web.','Le developpeur web cree des interfaces et des services backend robustes, teste le code et collabore avec designers et product managers.', ARRAY['JavaScript','React','Node.js','Git']::text[], ARRAY['Licence informatique','Bootcamp web','Auto-formation structuree']::text[], 'Forte demande locale et internationale en freelance et CDI.'),
  ('developpeur-web','en','Web Developer','Design and development of websites and web applications.','Web developers build frontend and backend features, maintain code quality and collaborate with design and product teams.', ARRAY['JavaScript','React','Node.js','Git']::text[], ARRAY['Computer science degree','Web bootcamp','Structured self-learning']::text[], 'High demand in local and international markets.'),
  ('developpeur-web','ar','مطور ويب','تصميم وتطوير مواقع وتطبيقات الويب.','يقوم مطور الويب ببناء الواجهات والخدمات الخلفية مع اختبار الكود والعمل مع فرق التصميم والمنتج.', ARRAY['JavaScript','React','Node.js','Git']::text[], ARRAY['إجازة في الإعلاميات','Bootcamp','تعلم ذاتي منظم']::text[], 'طلب مرتفع محليا ودوليا.'),

  ('data-analyst','fr','Data Analyst','Analyse de donnees pour la prise de decision.','Le data analyst collecte, nettoie et interprete les donnees pour produire des tableaux de bord et recommandations actionnables.', ARRAY['SQL','Excel','Power BI','Python']::text[], ARRAY['Licence stats/informatique','Formation BI','Certifications data']::text[], 'Opportunites croissantes dans finance, e-commerce et telecom.'),
  ('data-analyst','en','Data Analyst','Data analysis for informed decision-making.','Data analysts collect, clean and interpret data to deliver dashboards and business recommendations.', ARRAY['SQL','Excel','Power BI','Python']::text[], ARRAY['Stats/CS degree','BI training','Data certifications']::text[], 'Growing demand across finance, e-commerce and telecom.'),
  ('data-analyst','ar','محلل بيانات','تحليل البيانات لدعم اتخاذ القرار.','يجمع محلل البيانات المعطيات وينظفها ويحللها لإنتاج لوحات قيادة وتوصيات عملية.', ARRAY['SQL','Excel','Power BI','Python']::text[], ARRAY['إجازة إحصاء/إعلاميات','تكوين BI','شهادات بيانات']::text[], 'فرص متزايدة في المالية والتجارة الإلكترونية والاتصالات.'),

  ('ux-ui-designer','fr','UX/UI Designer','Conception d experiences et interfaces utilisateur.','Le designer UX/UI analyse les besoins, cree des prototypes et ameliore la qualite d usage des produits digitaux.', ARRAY['Figma','Research','Wireframing','Design system']::text[], ARRAY['Design digital','Formation UX','Portfolio projets']::text[], 'Bonne insertion en startup, agence et entreprises produit.'),
  ('ux-ui-designer','en','UX/UI Designer','User experience and interface design.','UX/UI designers research user needs, prototype interfaces and improve digital product usability.', ARRAY['Figma','Research','Wireframing','Design systems']::text[], ARRAY['Digital design degree','UX training','Project portfolio']::text[], 'Strong hiring in startups, agencies and product teams.'),
  ('ux-ui-designer','ar','مصمم UX/UI','تصميم تجربة المستخدم والواجهات.','يقوم مصمم UX/UI بدراسة احتياجات المستخدمين وبناء نماذج أولية وتحسين جودة الاستخدام.', ARRAY['Figma','Research','Wireframing','Design systems']::text[], ARRAY['تكوين تصميم رقمي','دورات UX','ملف أعمال']::text[], 'فرص جيدة في الشركات الناشئة والوكالات.'),

  ('digital-marketing-specialist','fr','Specialiste Marketing Digital','Acquisition et croissance via canaux numeriques.','Ce profil pilote SEO, campagnes social ads et contenus pour augmenter trafic qualifie et conversion.', ARRAY['SEO','Google Ads','Analytics','Content']::text[], ARRAY['Marketing/communication','Certifications Google','Formation growth']::text[], 'Metier en forte croissance dans tous les secteurs.'),
  ('digital-marketing-specialist','en','Digital Marketing Specialist','Growth and acquisition through digital channels.','This role manages SEO, paid ads and content strategy to increase qualified traffic and conversions.', ARRAY['SEO','Google Ads','Analytics','Content']::text[], ARRAY['Marketing degree','Google certifications','Growth training']::text[], 'Fast-growing role across industries.'),
  ('digital-marketing-specialist','ar','أخصائي تسويق رقمي','اكتساب العملاء والنمو عبر القنوات الرقمية.','يدير هذا الدور SEO والإعلانات المدفوعة واستراتيجية المحتوى لزيادة الزيارات والتحويل.', ARRAY['SEO','Google Ads','Analytics','Content']::text[], ARRAY['إجازة تسويق/تواصل','شهادات Google','تكوين Growth']::text[], 'مهنة متنامية في مختلف القطاعات.'),

  ('cybersecurity-analyst','fr','Analyste Cybersecurite','Protection des systemes et reponse aux incidents.','L analyste cybersecurite surveille les menaces, realise des audits et met en place des controles de securite.', ARRAY['Network security','SIEM','Risk management','Incident response']::text[], ARRAY['Ingenierie informatique','Certif Security+','Certif CEH']::text[], 'Demande elevee avec perspectives internationales.'),
  ('cybersecurity-analyst','en','Cybersecurity Analyst','System protection and incident response.','Cybersecurity analysts monitor threats, assess vulnerabilities and implement security controls.', ARRAY['Network security','SIEM','Risk management','Incident response']::text[], ARRAY['Computer engineering','Security+','CEH certification']::text[], 'High demand with strong international opportunities.'),
  ('cybersecurity-analyst','ar','محلل أمن سيبراني','حماية الأنظمة والاستجابة للحوادث.','يراقب محلل الأمن السيبراني التهديدات ويقيّم الثغرات ويطبق ضوابط الحماية.', ARRAY['Network security','SIEM','Risk management','Incident response']::text[], ARRAY['هندسة معلوماتية','Security+','CEH']::text[], 'طلب قوي وفرص دولية مهمة.'),

  ('project-manager','fr','Chef de Projet','Pilotage de projets et coordination equipes.','Le chef de projet definit le planning, coordonne les parties prenantes et assure la livraison selon objectifs.', ARRAY['Planning','Communication','Risk tracking','Leadership']::text[], ARRAY['Management','Ingenierie','Certif PMP/Prince2']::text[], 'Role central dans IT, industrie et services.'),
  ('project-manager','en','Project Manager','Project delivery and team coordination.','Project managers define scope and timelines, align stakeholders and ensure successful delivery.', ARRAY['Planning','Communication','Risk tracking','Leadership']::text[], ARRAY['Management degree','Engineering','PMP/Prince2']::text[], 'Key role in IT, industry and services.'),
  ('project-manager','ar','مدير مشروع','قيادة المشاريع وتنسيق الفرق.','يحدد مدير المشروع نطاق العمل والجدول الزمني وينسق الأطراف المعنية لضمان التسليم.', ARRAY['Planning','Communication','Risk tracking','Leadership']::text[], ARRAY['تكوين إدارة','هندسة','PMP/Prince2']::text[], 'دور محوري في التكنولوجيا والصناعة والخدمات.')
) AS t(slug, language, title, short_description, long_description, skills, education_paths, opportunities_summary)
ON t.slug = i.slug
ON CONFLICT (career_path_id, language) DO UPDATE
SET title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    long_description = EXCLUDED.long_description,
    skills = EXCLUDED.skills,
    education_paths = EXCLUDED.education_paths,
    opportunities_summary = EXCLUDED.opportunities_summary;

-- --------------------------------------------
-- 2) OPPORTUNITIES
-- --------------------------------------------
WITH inserted AS (
  INSERT INTO opportunities (type, company_name, city, country, source_url, application_deadline, is_remote, is_active)
  VALUES
    ('internship','Atlas Digital','Casablanca','Morocco','https://example.com/apply/intern-data', CURRENT_DATE + INTERVAL '45 days', false, true),
    ('job','Nova Tech','Rabat','Morocco','https://example.com/apply/web-dev', CURRENT_DATE + INTERVAL '30 days', true, true),
    ('scholarship','Future Skills Fund','Rabat','Morocco','https://example.com/apply/scholarship', CURRENT_DATE + INTERVAL '60 days', true, true),
    ('call','Youth Innovation Program','Casablanca','Morocco','https://example.com/apply/call-innovation', CURRENT_DATE + INTERVAL '20 days', false, true),
    ('job','MENA Data Solutions','Tanger','Morocco','https://example.com/apply/data-analyst', CURRENT_DATE + INTERVAL '25 days', true, true),
    ('internship','Creative Studio Hub','Marrakech','Morocco','https://example.com/apply/ux-intern', CURRENT_DATE + INTERVAL '35 days', false, true)
  RETURNING id, type, company_name
)
INSERT INTO opportunity_translations (
  opportunity_id, language, title, description, requirements, application_steps
)
SELECT i.id, t.language::lang_code, t.title, t.description, t.requirements, t.application_steps
FROM inserted i
JOIN (
  VALUES
  ('Atlas Digital','fr','Stage Data Analyst Junior','Stage de 3 mois pour assister l equipe data sur des dashboards et rapports.', ARRAY['SQL de base','Excel','Esprit analytique']::text[], ARRAY['Envoyer CV','Court test SQL','Entretien RH']::text[]),
  ('Atlas Digital','en','Junior Data Analyst Internship','3-month internship to support the data team with dashboards and reporting.', ARRAY['Basic SQL','Excel','Analytical mindset']::text[], ARRAY['Submit CV','SQL mini test','HR interview']::text[]),
  ('Atlas Digital','ar','تدريب محلل بيانات مبتدئ','تدريب لمدة 3 أشهر لدعم فريق البيانات في إعداد اللوحات والتقارير.', ARRAY['أساسيات SQL','Excel','تفكير تحليلي']::text[], ARRAY['إرسال السيرة الذاتية','اختبار SQL','مقابلة الموارد البشرية']::text[]),

  ('Nova Tech','fr','Developpeur Web Frontend','Poste junior/mid pour developper des interfaces React performantes.', ARRAY['React','JavaScript','API REST']::text[], ARRAY['Deposer CV','Exercice technique','Entretien equipe']::text[]),
  ('Nova Tech','en','Frontend Web Developer','Junior/mid role to build high-performance React interfaces.', ARRAY['React','JavaScript','REST APIs']::text[], ARRAY['Submit CV','Technical assignment','Team interview']::text[]),
  ('Nova Tech','ar','مطور ويب واجهات أمامية','منصب مبتدئ/متوسط لتطوير واجهات React عالية الأداء.', ARRAY['React','JavaScript','REST APIs']::text[], ARRAY['إيداع السيرة الذاتية','تمرين تقني','مقابلة الفريق']::text[]),

  ('Future Skills Fund','fr','Bourse Formation Data & IA','Bourse partielle pour parcours certifiant en data analyse et IA appliquee.', ARRAY['Motivation','Projet personnel','Niveau bac+2 minimum']::text[], ARRAY['Formulaire en ligne','Lettre motivation','Entretien']::text[]),
  ('Future Skills Fund','en','Data & AI Training Scholarship','Partial scholarship for a certified track in data analysis and applied AI.', ARRAY['Motivation','Personal project','Minimum 2-year degree']::text[], ARRAY['Online form','Motivation letter','Interview']::text[]),
  ('Future Skills Fund','ar','منحة تكوين في البيانات والذكاء الاصطناعي','منحة جزئية لمسار معتمد في تحليل البيانات والذكاء الاصطناعي التطبيقي.', ARRAY['تحفيز قوي','مشروع شخصي','حد أدنى Bac+2']::text[], ARRAY['استمارة إلكترونية','رسالة تحفيزية','مقابلة']::text[]),

  ('Youth Innovation Program','fr','Appel a Candidatures: Innovation Jeunes','Programme d accompagnement pour projets a impact social et employabilite.', ARRAY['Projet clair','Equipe engagee','Impact mesurable']::text[], ARRAY['Soumettre dossier','Pitch en ligne','Selection finale']::text[]),
  ('Youth Innovation Program','en','Call for Applications: Youth Innovation','Support program for projects with social impact and employability outcomes.', ARRAY['Clear project','Committed team','Measurable impact']::text[], ARRAY['Submit proposal','Online pitch','Final selection']::text[]),
  ('Youth Innovation Program','ar','دعوة للترشيح: ابتكار الشباب','برنامج مواكبة لمشاريع ذات أثر اجتماعي وقابلية تشغيل.', ARRAY['مشروع واضح','فريق ملتزم','أثر قابل للقياس']::text[], ARRAY['إرسال الملف','عرض Pitch','الانتقاء النهائي']::text[]),

  ('MENA Data Solutions','fr','Data Analyst Junior','Analyse des donnees business et suivi KPI pour equipes commerciales.', ARRAY['SQL','Power BI','Communication']::text[], ARRAY['CV + portfolio','Entretien technique','Validation RH']::text[]),
  ('MENA Data Solutions','en','Junior Data Analyst','Business data analysis and KPI tracking for sales teams.', ARRAY['SQL','Power BI','Communication']::text[], ARRAY['CV + portfolio','Technical interview','HR validation']::text[]),
  ('MENA Data Solutions','ar','محلل بيانات مبتدئ','تحليل بيانات الأعمال وتتبع مؤشرات الأداء لفرق المبيعات.', ARRAY['SQL','Power BI','Communication']::text[], ARRAY['السيرة الذاتية + أعمال','مقابلة تقنية','اعتماد الموارد البشرية']::text[]),

  ('Creative Studio Hub','fr','Stage UX/UI Designer','Stage pour participer a la recherche utilisateur et prototypage Figma.', ARRAY['Figma','Curiosite UX','Travail en equipe']::text[], ARRAY['Envoyer portfolio','Mini cas pratique','Entretien']::text[]),
  ('Creative Studio Hub','en','UX/UI Designer Internship','Internship focused on user research and Figma prototyping.', ARRAY['Figma','UX curiosity','Teamwork']::text[], ARRAY['Send portfolio','Mini case','Interview']::text[]),
  ('Creative Studio Hub','ar','تدريب مصمم UX/UI','تدريب للمساهمة في بحث المستخدمين وبناء النماذج الأولية على Figma.', ARRAY['Figma','فضول UX','العمل الجماعي']::text[], ARRAY['إرسال Portfolio','حالة تطبيقية','مقابلة']::text[])
) AS t(company_name, language, title, description, requirements, application_steps)
ON t.company_name = i.company_name
ON CONFLICT (opportunity_id, language) DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    requirements = EXCLUDED.requirements,
    application_steps = EXCLUDED.application_steps;

-- --------------------------------------------
-- 3) STUDY PROGRAMS
-- --------------------------------------------
WITH inserted AS (
  INSERT INTO study_programs (slug, institution_name, city, degree_level, duration_months, is_active)
  VALUES
    ('licence-informatique','Universite Hassan II','Casablanca','Licence',36,true),
    ('master-data-science','Universite Mohammed V','Rabat','Master',24,true),
    ('formation-ux-ui-bootcamp','Digital Skills Academy','Casablanca','Certification',6,true),
    ('technicien-reseaux-cyber','Institut TechnoPro','Marrakech','Technicien specialise',24,true),
    ('mba-marketing-digital','Business School Maghreb','Rabat','MBA',18,true)
  ON CONFLICT (slug) DO UPDATE
    SET is_active = EXCLUDED.is_active,
        updated_at = NOW()
  RETURNING id, slug
)
INSERT INTO study_program_translations (
  study_program_id, language, title, description, admission_requirements, outcomes
)
SELECT i.id, t.language::lang_code, t.title, t.description, t.admission_requirements, t.outcomes
FROM inserted i
JOIN (
  VALUES
  ('licence-informatique','fr','Licence Informatique','Formation de base en programmation, algorithmique et systemes.', ARRAY['Baccalaureat scientifique','Dossier admission']::text[], ARRAY['Developpeur junior','Support IT','Poursuite Master']::text[]),
  ('licence-informatique','en','Computer Science Bachelor','Core training in programming, algorithms and systems.', ARRAY['Science baccalaureate','Admission file']::text[], ARRAY['Junior developer','IT support','Master pathway']::text[]),
  ('licence-informatique','ar','إجازة في الإعلاميات','تكوين أساسي في البرمجة والخوارزميات والأنظمة.', ARRAY['باكالوريا علمية','ملف ترشيح']::text[], ARRAY['مطور مبتدئ','دعم تقني','متابعة الماستر']::text[]),

  ('master-data-science','fr','Master Data Science','Parcours avance en statistiques, machine learning et data engineering.', ARRAY['Licence scientifique','Bon niveau en maths']::text[], ARRAY['Data Analyst','Data Scientist junior','Consultant BI']::text[]),
  ('master-data-science','en','Master in Data Science','Advanced program in statistics, machine learning and data engineering.', ARRAY['Scientific bachelor','Strong math background']::text[], ARRAY['Data Analyst','Junior Data Scientist','BI Consultant']::text[]),
  ('master-data-science','ar','ماستر علوم البيانات','مسار متقدم في الإحصاء والتعلم الآلي وهندسة البيانات.', ARRAY['إجازة علمية','مستوى جيد في الرياضيات']::text[], ARRAY['محلل بيانات','عالم بيانات مبتدئ','مستشار BI']::text[]),

  ('formation-ux-ui-bootcamp','fr','Bootcamp UX/UI','Formation intensive orientee portfolio et projets reels.', ARRAY['Niveau bac minimum','Motivation']::text[], ARRAY['UX/UI Junior','Freelance design','Stage produit']::text[]),
  ('formation-ux-ui-bootcamp','en','UX/UI Bootcamp','Intensive practical training with portfolio-driven projects.', ARRAY['High school level','Motivation']::text[], ARRAY['Junior UX/UI','Design freelancer','Product internship']::text[]),
  ('formation-ux-ui-bootcamp','ar','معسكر UX/UI','تكوين مكثف عملي مبني على مشاريع وملف أعمال.', ARRAY['مستوى بكالوريا','تحفيز']::text[], ARRAY['مصمم UX/UI مبتدئ','عمل حر','تدريب منتج']::text[]),

  ('technicien-reseaux-cyber','fr','Technicien Reseaux & Cyber','Programme professionnalisant pour administration reseaux et securite.', ARRAY['Bac technique/scientifique','Selection dossier']::text[], ARRAY['Technicien reseaux','Support securite','Admin systemes junior']::text[]),
  ('technicien-reseaux-cyber','en','Network & Cyber Technician','Career-oriented training in network administration and security basics.', ARRAY['Technical/science baccalaureate','File selection']::text[], ARRAY['Network technician','Security support','Junior sysadmin']::text[]),
  ('technicien-reseaux-cyber','ar','تقني شبكات وأمن سيبراني','تكوين مهني في إدارة الشبكات وأساسيات الأمن المعلوماتي.', ARRAY['باكالوريا تقنية/علمية','انتقاء ملف']::text[], ARRAY['تقني شبكات','دعم أمني','مسير نظم مبتدئ']::text[]),

  ('mba-marketing-digital','fr','MBA Marketing Digital','Programme managerial pour strategie digitale et performance acquisition.', ARRAY['Diplome Bac+3 minimum','Experience souhaitee']::text[], ARRAY['Responsable marketing digital','Growth manager','Chef de projet acquisition']::text[]),
  ('mba-marketing-digital','en','Digital Marketing MBA','Management-focused program in digital strategy and acquisition performance.', ARRAY['Minimum 3-year degree','Experience preferred']::text[], ARRAY['Digital marketing manager','Growth manager','Acquisition lead']::text[]),
  ('mba-marketing-digital','ar','MBA التسويق الرقمي','برنامج إداري في الاستراتيجية الرقمية وأداء الاكتساب.', ARRAY['Bac+3 على الأقل','خبرة مفضلة']::text[], ARRAY['مسؤول تسويق رقمي','مدير نمو','مسؤول اكتساب']::text[])
) AS t(slug, language, title, description, admission_requirements, outcomes)
ON t.slug = i.slug
ON CONFLICT (study_program_id, language) DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    admission_requirements = EXCLUDED.admission_requirements,
    outcomes = EXCLUDED.outcomes;

-- --------------------------------------------
-- 4) CAREER GUIDES
-- --------------------------------------------
WITH inserted AS (
  INSERT INTO career_guides (slug, category, reading_minutes, is_published, published_at)
  VALUES
    ('comment-choisir-sa-carriere', 'career-choice', 8, true, NOW()),
    ('reussir-son-entretien-emploi', 'interview', 7, true, NOW()),
    ('cv-qui-attire-les-recruteurs', 'cv', 6, true, NOW()),
    ('developper-soft-skills-cle', 'skills', 6, true, NOW()),
    ('trouver-opportunites-internationales', 'international', 9, true, NOW())
  ON CONFLICT (slug) DO UPDATE
    SET is_published = EXCLUDED.is_published,
        published_at = COALESCE(career_guides.published_at, EXCLUDED.published_at),
        updated_at = NOW()
  RETURNING id, slug
)
INSERT INTO career_guide_translations (
  career_guide_id, language, title, summary, body_markdown, seo_title, seo_description
)
SELECT i.id, t.language::lang_code, t.title, t.summary, t.body_markdown, t.seo_title, t.seo_description
FROM inserted i
JOIN (
  VALUES
  ('comment-choisir-sa-carriere','fr','Comment choisir sa carriere','Methode simple pour clarifier vos options et passer a l action.','# 1. Identifier vos forces\nListez vos competences et centres d interet.\n\n# 2. Explorer les metiers\nComparez missions, salaires et debouches.\n\n# 3. Tester rapidement\nFaites des mini projets, stages et entretiens metiers.\n\n# 4. Construire un plan\nFixez un objectif 90 jours avec actions hebdomadaires.','Comment choisir sa carriere en 4 etapes','Guide pratique pour choisir sa voie professionnelle et agir rapidement.'),
  ('comment-choisir-sa-carriere','en','How to choose your career','A practical framework to decide and move forward with confidence.','# 1. Map your strengths\nList your skills and interests.\n\n# 2. Explore roles\nCompare responsibilities, salaries and growth.\n\n# 3. Run small tests\nTry mini projects, internships and informational interviews.\n\n# 4. Build a 90-day plan\nSet weekly actions and milestones.','How to choose your career in 4 steps','A practical career decision guide for students and young professionals.'),
  ('comment-choisir-sa-carriere','ar','كيف تختار مسارك المهني','منهج عملي لاتخاذ قرار مهني واضح والبدء في التنفيذ.','# 1. حدد نقاط قوتك\nاكتب مهاراتك واهتماماتك.\n\n# 2. استكشف المهن\nقارن المهام والرواتب وآفاق التطور.\n\n# 3. جرّب بشكل سريع\nمشاريع صغيرة وتداريب ومقابلات مهنية.\n\n# 4. ضع خطة 90 يوما\nأهداف أسبوعية قابلة للقياس.','كيف تختار مسارك المهني في 4 خطوات','دليل عملي للطلاب والخريجين لاختيار المسار المهني.'),

  ('reussir-son-entretien-emploi','fr','Reussir son entretien d emploi','Preparation, structure de reponse et erreurs a eviter.','# Avant l entretien\nRecherchez entreprise et poste.\n\n# Pendant\nUtilisez la methode STAR.\n\n# Apres\nEnvoyez un message de suivi professionnel.','Reussir son entretien d emploi','Conseils pratiques pour preparer et reussir un entretien.'),
  ('reussir-son-entretien-emploi','en','Ace your job interview','Preparation checklist, response structure and follow-up.','# Before\nResearch the role and company.\n\n# During\nUse the STAR method for answers.\n\n# After\nSend a concise thank-you follow-up.','Ace your job interview','Interview preparation guide with practical examples.'),
  ('reussir-son-entretien-emploi','ar','النجاح في مقابلة العمل','خطوات التحضير وبناء الأجوبة وتفادي الأخطاء الشائعة.','# قبل المقابلة\nابحث عن الشركة والوظيفة.\n\n# أثناء المقابلة\nاستخدم منهج STAR.\n\n# بعد المقابلة\nأرسل رسالة متابعة مختصرة.','النجاح في مقابلة العمل','دليل عملي للتحضير الجيد لمقابلات العمل.'),

  ('cv-qui-attire-les-recruteurs','fr','CV qui attire les recruteurs','Structure claire, mots cles et adaptation par offre.','# Structure\nTitre, resume, experiences, competences, formation.\n\n# Personnalisation\nAdaptez le CV a chaque offre.\n\n# Validation\nRelisez et quantifiez vos resultats.','CV qui attire les recruteurs','Comment faire un CV clair, impactant et adapte.'),
  ('cv-qui-attire-les-recruteurs','en','CV that attracts recruiters','Clear structure, relevant keywords and role-specific customization.','# Structure\nHeadline, summary, experience, skills, education.\n\n# Tailor\nAdjust for each application.\n\n# Validate\nProofread and quantify outcomes.','CV that attracts recruiters','Build a clear and effective CV recruiters notice.'),
  ('cv-qui-attire-les-recruteurs','ar','سيرة ذاتية تجذب المجندين','بنية واضحة وكلمات مفتاحية وتخصيص حسب العرض.','# البنية\nعنوان، ملخص، خبرات، مهارات، تكوين.\n\n# التخصيص\nعدّل السيرة لكل عرض.\n\n# المراجعة\nتدقيق لغوي ونتائج رقمية.','سيرة ذاتية تجذب المجندين','خطوات عملية لإعداد سيرة ذاتية قوية.'),

  ('developper-soft-skills-cle','fr','Developper les soft skills cle','Communication, autonomie, gestion du temps et esprit equipe.','# Soft skills prioritaires\nCommunication, adaptabilite, gestion du stress.\n\n# Plan action\nChoisissez 2 competences et travaillez-les 30 jours.','Developper les soft skills cle','Guide actionnable pour renforcer ses competences humaines.'),
  ('developper-soft-skills-cle','en','Build key soft skills','Communication, ownership, time management and teamwork.','# Priority skills\nCommunication, adaptability, stress management.\n\n# Action plan\nPick 2 skills and train for 30 days.','Build key soft skills','Actionable guide to improve high-impact soft skills.'),
  ('developper-soft-skills-cle','ar','تطوير المهارات الناعمة الأساسية','التواصل وتحمل المسؤولية وتدبير الوقت والعمل الجماعي.','# المهارات ذات الأولوية\nالتواصل، التكيف، إدارة الضغط.\n\n# خطة عمل\nاختر مهارتين واشتغل عليهما لمدة 30 يوما.','تطوير المهارات الناعمة الأساسية','دليل عملي لتقوية المهارات السلوكية.'),

  ('trouver-opportunites-internationales','fr','Trouver des opportunites internationales','Strategie pour identifier stages, jobs et bourses a l international.','# Recherche ciblee\nUtilisez plateformes specialisees.\n\n# Positionnement\nOptimisez CV/LinkedIn en anglais.\n\n# Candidature\nPlanifiez un pipeline hebdomadaire.','Trouver des opportunites internationales','Comment preparer une candidature internationale solide.'),
  ('trouver-opportunites-internationales','en','Find international opportunities','A strategy to target internships, jobs and scholarships abroad.','# Targeted search\nUse niche and global platforms.\n\n# Positioning\nOptimize CV/LinkedIn in English.\n\n# Applications\nManage a weekly pipeline.','Find international opportunities','Practical plan to prepare strong international applications.'),
  ('trouver-opportunites-internationales','ar','إيجاد فرص دولية','استراتيجية للعثور على تدريب ووظائف ومنح خارج المغرب.','# بحث موجه\nاستخدم منصات متخصصة ودولية.\n\n# التموضع\nحسّن السيرة وLinkedIn بالإنجليزية.\n\n# الترشح\nأنشئ مسارا أسبوعيا للطلبات.','إيجاد فرص دولية','خطة عملية لبناء ترشيح دولي قوي.')
) AS t(slug, language, title, summary, body_markdown, seo_title, seo_description)
ON t.slug = i.slug
ON CONFLICT (career_guide_id, language) DO UPDATE
SET title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    body_markdown = EXCLUDED.body_markdown,
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description;

COMMIT;

-- --------------------------------------------
-- Optional: run next to refresh profile mapping
--   database/seed_profile_content_matches.sql
-- --------------------------------------------
